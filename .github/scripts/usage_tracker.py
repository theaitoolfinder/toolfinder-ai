#!/usr/bin/env python3
"""
usage_tracker.py — shared Anthropic API usage/cost logger for all worker scripts.

Every worker script calls record_usage(worker, model, input_tokens, output_tokens)
once per run (after summing usage across whatever number of Claude calls that run
made). Writes to data/api_usage.json: a rolling log of recent runs (capped, so the
file doesn't grow forever) plus running all-time totals per worker+model — so the
admin dashboard can show both recent activity and cumulative spend.

No third-party dependencies — stdlib json only, safe to import from any script.
"""
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent  # repo root, from .github/scripts/
USAGE_PATH = ROOT / "data" / "api_usage.json"
MAX_LOG_ENTRIES = 500

# $ per million tokens (input, output) — published Anthropic pricing.
# Unknown/future model names just cost $0 in the estimate rather than erroring.
PRICING = {
    "claude-haiku-4-5": (1.00, 5.00),
    "claude-sonnet-4-5": (3.00, 15.00),
    "claude-sonnet-4-6": (3.00, 15.00),
    "claude-opus-4-5": (5.00, 25.00),
    "claude-opus-4-8": (5.00, 25.00),
    "claude-3-5-sonnet-20241022": (3.00, 15.00),
}


def _cost(model: str, input_tokens: int, output_tokens: int) -> float:
    rates = PRICING.get(model)
    if not rates:
        return 0.0
    in_rate, out_rate = rates
    return (input_tokens / 1_000_000) * in_rate + (output_tokens / 1_000_000) * out_rate


def load() -> dict:
    if USAGE_PATH.exists():
        try:
            return json.loads(USAGE_PATH.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {"runs": [], "totals": {}}


def save(data: dict) -> None:
    USAGE_PATH.parent.mkdir(exist_ok=True)
    USAGE_PATH.write_text(json.dumps(data, indent=1), encoding="utf-8")


def record_usage(worker: str, model: str, input_tokens: int, output_tokens: int,
                  requests: int = 1, meta: dict | None = None) -> None:
    """Call once per worker run — not once per API call within that run."""
    if input_tokens == 0 and output_tokens == 0:
        return

    data = load()
    cost = _cost(model, input_tokens, output_tokens)

    entry = {
        "worker": worker,
        "model": model,
        "date": datetime.now(timezone.utc).isoformat(),
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "requests": requests,
        "cost_usd": round(cost, 6),
    }
    if meta:
        entry["meta"] = meta

    data.setdefault("runs", []).append(entry)
    data["runs"] = data["runs"][-MAX_LOG_ENTRIES:]

    totals = data.setdefault("totals", {})
    key = f"{worker}::{model}"
    t = totals.setdefault(key, {
        "worker": worker, "model": model,
        "input_tokens": 0, "output_tokens": 0, "requests": 0, "cost_usd": 0.0,
    })
    t["input_tokens"] += input_tokens
    t["output_tokens"] += output_tokens
    t["requests"] += requests
    t["cost_usd"] = round(t["cost_usd"] + cost, 6)

    data["updated_at"] = datetime.now(timezone.utc).isoformat()
    save(data)

    print(f"[usage] {worker} ({model}): +{input_tokens:,} in / +{output_tokens:,} out tokens, "
          f"~${cost:.4f} this run (all-time for this worker+model: ${t['cost_usd']:.2f})")
