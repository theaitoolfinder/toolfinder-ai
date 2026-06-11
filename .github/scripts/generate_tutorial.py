#!/usr/bin/env python3
"""
generate_tutorial.py — MyAI ToolsFinder
════════════════════════════════════════════════════════════════════
Detects affiliate tools that do not yet have a tutorial entry and
generates 3-level tutorials (basic / intermediate / advanced) using
Claude AI.  New entries are appended to js/tutorials-data.js.

Triggered by:
  - Push to main when data/affiliate_tools.json changes
  - Manual workflow_dispatch

Required env var: ANTHROPIC_API_KEY
"""

import os, re, json, sys
from pathlib import Path

try:
    import anthropic
except ImportError:
    print("✗ anthropic package not installed — run: pip install anthropic")
    sys.exit(1)

# ── Paths ──────────────────────────────────────────────────────────────────────
ROOT           = Path(__file__).resolve().parent.parent.parent
TUTORIALS_JS   = ROOT / "js"   / "tutorials-data.js"
AFFILIATE_JSON = ROOT / "data" / "affiliate_tools.json"
INDEX_HTML     = ROOT / "index.html"
LOG_PATH       = Path(__file__).resolve().parent / "tutorial_log.json"

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "").strip()
CLOSING_SENTINEL  = "}; // end TUTORIALS_DATA"
SITEMAP_XML       = ROOT / "sitemap.xml"


# ── Slug helpers ───────────────────────────────────────────────────────────────

def slug_from_name(name: str) -> str:
    """'Make.com' → 'make-com',  'Taskade AI' → 'taskade-ai'"""
    s = name.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = s.strip("-")
    return s


def existing_slugs() -> set:
    """Return the set of tool slugs already in tutorials-data.js."""
    content = TUTORIALS_JS.read_text(encoding="utf-8")
    return set(re.findall(r"^\s+'([a-z0-9][a-z0-9-]*)':", content, re.MULTILINE))


# ── Tool info from index.html DEFAULT_TOOLS ────────────────────────────────────

def get_tool_info(tool_name: str) -> dict:
    """
    Parse index.html DEFAULT_TOOLS array to find domain / category / tagline
    for the named tool.  Returns empty strings when not found.
    """
    content = INDEX_HTML.read_text(encoding="utf-8")

    # Match the JS object whose "name" field equals tool_name exactly
    # Objects look like:  {name:"ChatGPT",domain:"...",tag:"...",cat:"..."}
    # We search for a block that starts with { and ends with }, (or }) containing name:
    escaped = re.escape(tool_name)
    pattern = (
        r'\{[^{}]*?'                          # open brace + any non-brace chars
        r'"name"\s*:\s*"' + escaped + r'"'    # "name":"<tool_name>"
        r'[^{}]*?\}'                           # rest of object
    )
    m = re.search(pattern, content, re.DOTALL)
    if not m:
        return {"domain": "", "category": "", "tagline": ""}

    obj = m.group(0)
    def _field(key):
        fm = re.search(r'"' + key + r'"\s*:\s*"([^"]+)"', obj)
        return fm.group(1) if fm else ""

    return {
        "domain":   _field("domain"),
        "category": _field("cat"),
        "tagline":  _field("tag"),
    }


# ── AI tutorial generation ─────────────────────────────────────────────────────

SYSTEM_PROMPT = """\
You are a senior technical writer for MyAI ToolsFinder (myaitoolsfinder.com).
You write practical, step-by-step tutorials for AI tools.
Your audience: marketers, solopreneurs, content creators, and developers.
Style: clear, concise, actionable — no fluff.
HTML elements allowed in step content: <p> <ul> <ol> <li> <strong> <em> <code> <div class="code-box">.
Never include markdown formatting, never use ``` code fences in content fields.
"""

def generate_tutorial_content(tool: dict, info: dict) -> dict:
    """Call Claude to produce a 3-level tutorial.  Returns parsed JSON dict."""
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    prompt = f"""Create a 3-level tutorial for the AI tool **{tool['name']}** (website: {info['domain'] or 'unknown'}).

Category: {info['category'] or (tool.get('categories') or ['AI'])[0]}
Tool description: {info['tagline'] or 'An AI-powered tool'}
Affiliate URL for CTA links: {tool['affiliate_url']}

Return ONLY a valid JSON object — no markdown, no explanation — with this exact schema:

{{
  "tagline": "Short punchy tagline for {tool['name']} under 60 chars",
  "color": "#hexcolor (pick a color that fits the tool brand)",
  "basic": {{
    "title": "Hands-on first-use title (e.g. 'Your First ... with {tool['name']}')",
    "description": "Single-sentence outcome, max 90 chars",
    "duration": "5 min",
    "steps": [
      {{
        "title": "Step title",
        "content": "<p>HTML paragraph(s). Use &lt;strong&gt; for UI labels, &lt;em&gt; for emphasis, &lt;div class=\\"code-box\\"&gt; for examples.</p>",
        "tip": {{"type": "info", "text": "Tip text"}}
      }}
    ]
  }},
  "intermediate": {{
    "title": "Deeper-use title",
    "description": "Single-sentence outcome, max 90 chars",
    "duration": "15 min",
    "steps": [...]
  }},
  "advanced": {{
    "title": "Power-user / API / automation title",
    "description": "Single-sentence outcome, max 90 chars",
    "duration": "30 min",
    "steps": [...]
  }}
}}

Rules:
- basic: exactly 5 steps — complete beginner, no prior tool experience needed
- intermediate: 4–5 steps — builds on basic, unlocks a key power feature
- advanced: 5 steps — automation, API, integrations, or workflow optimisation
- step content: 1–3 HTML paragraphs, be specific about real UI elements / features
- tips: ~50% of steps should have a tip (null for the rest)
  - type "info"    → factual context
  - type "tip"     → best practice or shortcut
  - type "warning" → caution or limitation
  - type "success" → achievement or payoff
- Do NOT use backtick characters (`) anywhere in content or tip text
- Do NOT use ${{}} template syntax in content
"""

    # Model fallback list — mirrors article generator preference order
    MODELS = [
        "claude-sonnet-4-5",
        "claude-3-5-sonnet-20241022",
        "claude-3-5-haiku-20241022",
    ]

    last_err = None
    for model in MODELS:
        try:
            resp = client.messages.create(
                model=model,
                max_tokens=8000,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": prompt}],
            )
            raw = resp.content[0].text.strip()
            # Strip markdown fences aggressively
            raw = re.sub(r"^```(?:json)?\s*\n?", "", raw)
            raw = re.sub(r"\n?```\s*$", "", raw)
            # Find first { ... } block in case of extra prose
            m = re.search(r"\{.*\}", raw, re.DOTALL)
            if m:
                raw = m.group(0)
            result = json.loads(raw)
            print(f"  [Model] {model} ✓")
            return result
        except Exception as e:
            last_err = e
            err_str = str(e).lower()
            if "not_found" in err_str or "model" in err_str:
                print(f"  [Model] {model} not available, trying next…")
                continue
            # Non-model error (JSON parse, network): don't retry with different model
            raise
    raise RuntimeError(f"All models failed. Last error: {last_err}")


# ── JS formatter ───────────────────────────────────────────────────────────────

def _js_str(s: str) -> str:
    """Return a double-quoted JS string literal for simple one-line strings."""
    return json.dumps(s)   # json.dumps produces valid JS string literals


def _template_safe(html: str) -> str:
    """Escape backtick and ${ for use inside a JS template literal."""
    html = html.replace("\\", "\\\\")
    html = html.replace("`", "\\`")
    html = html.replace("${", "\\${")
    return html


def _format_steps(steps: list, indent: str = "        ") -> str:
    """Render a steps array as JS source."""
    items = []
    for step in steps:
        content_safe = _template_safe(step.get("content", ""))
        tip = step.get("tip")
        if tip and isinstance(tip, dict):
            tip_js = f'{{ type: {_js_str(tip["type"])}, text: {_js_str(tip["text"])} }}'
        else:
            tip_js = "null"

        items.append(
            f"{indent}  {{\n"
            f"{indent}    title: {_js_str(step['title'])},\n"
            f"{indent}    content: `{content_safe}`,\n"
            f"{indent}    tip: {tip_js}\n"
            f"{indent}  }}"
        )
    return "[\n" + ",\n".join(items) + f"\n{indent}]"


def build_js_entry(slug: str, tool: dict, info: dict, content: dict) -> str:
    """Return a complete JS entry string to be inserted into tutorials-data.js."""
    category = info.get("category") or (tool.get("categories") or ["AI"])[0]
    domain   = info.get("domain") or ""
    tagline  = content.get("tagline") or info.get("tagline") or ""
    color    = content.get("color", "#5856d6")

    def _level(key: str, indent="      ") -> str:
        lv = content[key]
        steps_js = _format_steps(lv["steps"], indent="        ")
        return (
            f"{indent}{{\n"
            f"{indent}  title: {_js_str(lv['title'])},\n"
            f"{indent}  description: {_js_str(lv['description'])},\n"
            f"{indent}  duration: {_js_str(lv.get('duration', '5 min'))},\n"
            f"{indent}  steps: {steps_js}\n"
            f"{indent}}}"
        )

    return (
        f"\n  /* ── {tool['name']} ── */\n"
        f"  '{slug}': {{\n"
        f"    name: {_js_str(tool['name'])},\n"
        f"    domain: {_js_str(domain)},\n"
        f"    affiliate_url: {_js_str(tool['affiliate_url'])},\n"
        f"    category: {_js_str(category)},\n"
        f"    tagline: {_js_str(tagline)},\n"
        f"    color: {_js_str(color)},\n"
        f"    levels: {{\n"
        f"      basic: {_level('basic')},\n"
        f"      intermediate: {_level('intermediate')},\n"
        f"      advanced: {_level('advanced')}\n"
        f"    }}\n"
        f"  }},"
    )


# ── Log helpers ────────────────────────────────────────────────────────────────

def update_sitemap_for_tutorials():
    """Ensure tutorials.html and tutorials/view.html are in sitemap.xml."""
    if not SITEMAP_XML.exists():
        return
    content = SITEMAP_XML.read_text(encoding="utf-8")
    today = __import__("datetime").datetime.utcnow().strftime("%Y-%m-%d")
    entries_to_add = [
        ("https://myaitoolsfinder.com/tutorials.html", "weekly", "0.8"),
        ("https://myaitoolsfinder.com/tutorials/view.html", "weekly", "0.7"),
    ]
    changed = False
    for url, freq, pri in entries_to_add:
        if url not in content:
            entry = (
                f"  <url>\n    <loc>{url}</loc>\n"
                f"    <lastmod>{today}</lastmod>\n"
                f"    <changefreq>{freq}</changefreq>\n"
                f"    <priority>{pri}</priority>\n  </url>"
            )
            content = content.replace("</urlset>", entry + "\n</urlset>")
            changed = True
    if changed:
        SITEMAP_XML.write_text(content, encoding="utf-8")
        print("[sitemap] tutorials pages ensured in sitemap.xml")


def load_log() -> dict:
    if LOG_PATH.exists():
        try:
            return json.loads(LOG_PATH.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {"generated": []}


def save_log(log: dict):
    LOG_PATH.write_text(json.dumps(log, indent=2), encoding="utf-8")


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    if not ANTHROPIC_API_KEY:
        print("⚠  ANTHROPIC_API_KEY not set — skipping tutorial generation.")
        sys.exit(0)

    # Load affiliate tools
    if not AFFILIATE_JSON.exists():
        print("✗ data/affiliate_tools.json not found.")
        sys.exit(1)

    aff_raw   = json.loads(AFFILIATE_JSON.read_text(encoding="utf-8"))
    aff_tools = aff_raw.get("tools", [])
    if not aff_tools:
        print("No affiliate tools found.")
        sys.exit(0)

    # Find tools without a tutorial
    slugs = existing_slugs()
    print(f"[Tutorials] {len(slugs)} existing tutorial(s).")

    to_generate = []
    for tool in aff_tools:
        s = slug_from_name(tool["name"])
        if s not in slugs:
            to_generate.append((s, tool))
            print(f"  → Missing tutorial: {tool['name']} (slug: {s})")

    if not to_generate:
        print("[Tutorials] All affiliate tools already have tutorials. Nothing to do.")
        sys.exit(0)

    print(f"[Tutorials] Generating {len(to_generate)} tutorial(s)…")

    log  = load_log()
    js   = TUTORIALS_JS.read_text(encoding="utf-8")
    added = 0

    for slug, tool in to_generate:
        print(f"\n[Generating] {tool['name']} ({slug})…")
        try:
            info    = get_tool_info(tool["name"])
            # Fill in category from affiliate_tools.json if index.html had no match
            if not info["category"] and tool.get("categories"):
                info["category"] = tool["categories"][0]
            # Derive domain from affiliate URL if index.html had no match
            if not info["domain"] and tool.get("affiliate_url"):
                import urllib.parse
                host = urllib.parse.urlparse(tool["affiliate_url"]).netloc
                # Strip common redirect/tracking prefixes
                for prefix in ("try.", "go.", "get.", "app.", "www."):
                    if host.startswith(prefix):
                        host = host[len(prefix):]
                        break
                info["domain"] = host

            content = generate_tutorial_content(tool, info)
            entry   = build_js_entry(slug, tool, info, content)

            # Insert before the closing sentinel.
            # Ensure the previous last entry has a trailing comma first.
            if CLOSING_SENTINEL in js:
                idx = js.rfind(CLOSING_SENTINEL)
                before = js[:idx].rstrip()
                # If previous entry closes with } (no comma), add one
                if before.endswith("}") and not before.endswith("},"):
                    js = before + ",\n\n" + entry + "\n\n" + js[idx:]
                else:
                    js = js.replace(CLOSING_SENTINEL, entry + "\n\n" + CLOSING_SENTINEL, 1)
            else:
                js = js.rstrip().rstrip("}").rstrip() + entry + "\n\n};\n"

            log["generated"].append({
                "slug": slug,
                "name": tool["name"],
                "generated_at": __import__("datetime").datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
            })
            added += 1
            print(f"  ✓ {tool['name']} tutorial written.")
        except Exception as exc:
            print(f"  ✗ Failed for {tool['name']}: {exc}")
            import traceback; traceback.print_exc()
            continue

    if added:
        TUTORIALS_JS.write_text(js, encoding="utf-8")
        save_log(log)
        print(f"\n[Tutorials] {added} new tutorial(s) added to js/tutorials-data.js")
    else:
        # Generation failed (API error, bad JSON, etc.) — log but don't fail the job
        # so the workflow doesn't go red. It will retry on the next affiliate update.
        print("\n[Tutorials] No tutorials were successfully generated (will retry on next run).")
        sys.exit(0)


if __name__ == "__main__":
    main()
