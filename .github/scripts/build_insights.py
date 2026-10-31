#!/usr/bin/env python3
"""
build_insights.py — My AI Tools Finder
─────────────────────────────────────────────────────────────────────────────
Builds data/insights.json for the Admin → Analytics tab from data the repo
already has (no Google Analytics needed):

  • subscriber growth over time  (from git history of subscribers_db.json)
  • publishing output per week   (article_log.json)
  • API spend per week / worker / article  (api_usage.json)
  • content inventory            (tools, articles, tutorials)

Needs full git history (fetch-depth: 0) for the subscriber timeline; without it
the timeline just contains the current point.
Stdlib only. Usage: python .github/scripts/build_insights.py
"""
import json
import re
import subprocess
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
OUT = ROOT / "data" / "insights.json"
NOW = datetime.now(timezone.utc)


def git(*args) -> str:
    try:
        return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True, timeout=60).stdout
    except Exception:  # noqa: BLE001
        return ""


def week_start(d: datetime) -> str:
    return (d - timedelta(days=d.weekday())).strftime("%Y-%m-%d")


def subscriber_timeline():
    """One point per day: the subscriber count after the last change that day."""
    path = "data/subscribers_db.json"
    log = git("log", "--format=%H\t%cI", "--", path).strip().splitlines()
    by_day = {}
    for line in reversed(log[:400]):                       # oldest → newest
        try:
            sha, iso = line.split("\t")
            raw = git("show", f"{sha}:{path}")
            count = json.loads(raw).get("count")
            if count is not None:
                by_day[iso[:10]] = int(count)
        except Exception:  # noqa: BLE001
            continue
    try:
        cur = json.loads((ROOT / path).read_text()).get("count")
        if cur is not None:
            by_day[NOW.strftime("%Y-%m-%d")] = int(cur)
    except Exception:  # noqa: BLE001
        pass
    return [{"date": d, "count": c} for d, c in sorted(by_day.items())]


def articles_info():
    p = ROOT / ".github" / "scripts" / "article_log.json"
    gen = []
    try:
        gen = json.loads(p.read_text()).get("generated", [])
    except Exception:  # noqa: BLE001
        pass
    weeks = defaultdict(int)
    dates = []
    for e in gen:
        try:
            d = datetime.strptime(e["date"], "%Y-%m-%d").replace(tzinfo=timezone.utc)
            weeks[week_start(d)] += 1
            dates.append(d)
        except Exception:  # noqa: BLE001
            continue
    # real published count = article files that aren't redirect stubs
    real = 0
    for f in (ROOT / "articles").glob("*.html"):
        try:
            if len(f.read_text(encoding="utf-8", errors="ignore").splitlines()) >= 80:
                real += 1
        except Exception:  # noqa: BLE001
            pass
    last = max(dates) if dates else None
    # newest article by file date as a cross-check (log can lag behind the files)
    latest_pub = None
    try:
        feed = (ROOT / "feed.xml").read_text(encoding="utf-8")
        m = re.search(r"<item>.*?<pubDate>([^<]+)</pubDate>", feed, re.S)
        if m:
            from email.utils import parsedate_to_datetime
            latest_pub = parsedate_to_datetime(m.group(1))
    except Exception:  # noqa: BLE001
        pass
    newest = max([x for x in (last, latest_pub) if x], default=None)
    return {
        "total_published": real,
        "per_week": [{"week": w, "count": c} for w, c in sorted(weeks.items())[-12:]],
        "last_date": newest.strftime("%Y-%m-%d") if newest else None,
        "days_since_last": (NOW - newest).days if newest else None,
    }


def spend_info():
    p = ROOT / "data" / "api_usage.json"
    try:
        runs = json.loads(p.read_text()).get("runs", [])
    except Exception:  # noqa: BLE001
        runs = []
    weeks, workers = defaultdict(float), defaultdict(float)
    last30 = 0.0
    art_cost, art_n = 0.0, 0
    for r in runs:
        try:
            d = datetime.fromisoformat(r["date"].replace("Z", "+00:00"))
            c = float(r.get("cost_usd", 0))
        except Exception:  # noqa: BLE001
            continue
        weeks[week_start(d)] += c
        workers[r.get("worker", "?")] += c
        if (NOW - d).days <= 30:
            last30 += c
        if r.get("worker") == "generate_article":
            art_cost += c
            art_n += 1
    return {
        "total_usd": round(sum(workers.values()), 4),
        "last_30d_usd": round(last30, 4),
        "per_article_usd": round(art_cost / art_n, 4) if art_n else None,
        "per_week": [{"week": w, "usd": round(v, 4)} for w, v in sorted(weeks.items())[-12:]],
        "by_worker": {k: round(v, 4) for k, v in sorted(workers.items(), key=lambda kv: -kv[1])},
        "last_call": max((r["date"] for r in runs), default=None),
    }


def inventory():
    tutorials = 0
    try:
        tutorials = len(re.findall(r"^\s{2}'[a-z0-9\-]+':\s*\{", (ROOT / "js" / "tutorials-data.js").read_text(), re.M))
    except Exception:  # noqa: BLE001
        pass
    return {
        "tool_pages": len(list((ROOT / "tools").glob("*.html"))),
        "tutorials": tutorials,
        "affiliate_tools": len(json.loads((ROOT / "data" / "affiliate_tools.json").read_text()).get("tools", []))
        if (ROOT / "data" / "affiliate_tools.json").exists() else 0,
    }


def main():
    data = {
        "generated_at": NOW.isoformat(),
        "subscribers": subscriber_timeline(),
        "articles": articles_info(),
        "spend": spend_info(),
        "inventory": inventory(),
    }
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(data, indent=1), encoding="utf-8")
    subs = data["subscribers"]
    print(f"[insights] subscribers points={len(subs)} now={subs[-1]['count'] if subs else '?'} | "
          f"articles={data['articles']['total_published']} last={data['articles']['last_date']} | "
          f"spend total=${data['spend']['total_usd']}")


if __name__ == "__main__":
    main()
