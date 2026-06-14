#!/usr/bin/env python3
"""
sync_affiliate_links.py — My AI Tools Finder
═══════════════════════════════════════════
Reads data/affiliate_tools.json and patches js/tools-data.js so that
every affiliate partner's entry uses their tracking URL instead of the
plain homepage.

Run automatically via .github/workflows/sync-affiliate-links.yml
whenever data/affiliate_tools.json is pushed.

Can also be run locally:
    python .github/scripts/sync_affiliate_links.py
"""

import json, re, sys
from pathlib import Path

ROOT              = Path(__file__).resolve().parent.parent.parent
AFFILIATE_JSON    = ROOT / "data" / "affiliate_tools.json"
TOOLS_DATA_JS     = ROOT / "js" / "tools-data.js"

# ── Load affiliate tools ───────────────────────────────────────────────────────
if not AFFILIATE_JSON.exists():
    print("[INFO] data/affiliate_tools.json not found — nothing to sync.")
    sys.exit(0)

try:
    data = json.loads(AFFILIATE_JSON.read_text(encoding="utf-8"))
except Exception as e:
    print(f"[ERROR] Could not parse affiliate_tools.json: {e}", file=sys.stderr)
    sys.exit(1)

tools = [t for t in data.get("tools", []) if t.get("name") and t.get("affiliate_url")]
if not tools:
    print("[INFO] No affiliate tools with URLs defined — nothing to sync.")
    sys.exit(0)

# ── Load tools-data.js ────────────────────────────────────────────────────────
if not TOOLS_DATA_JS.exists():
    print(f"[ERROR] {TOOLS_DATA_JS} not found.", file=sys.stderr)
    sys.exit(1)

content = TOOLS_DATA_JS.read_text(encoding="utf-8")
original = content

updated = 0
skipped = 0

for tool in tools:
    name        = tool["name"].strip()
    aff_url     = tool["affiliate_url"].strip().rstrip("/")
    key         = name.lower()

    # Match lines like:  "jasper ai":   "https://...",
    # Key may have 0-N spaces before the colon, then optional spaces + quoted URL
    pattern = re.compile(
        r'("' + re.escape(key) + r'"\s*:\s*)"([^"]+)"',
        re.IGNORECASE
    )

    def replacer(m, url=aff_url):
        return m.group(1) + f'"{url}"'

    new_content, n = pattern.subn(replacer, content)
    if n > 0:
        content = new_content
        updated += n
        print(f"[OK] {name!r} → {aff_url}  ({n} entr{'y' if n==1 else 'ies'} updated)")
    else:
        skipped += 1
        print(f"[SKIP] {name!r} — key not found in tools-data.js (add it manually if needed)")

# ── Write back only if changed ────────────────────────────────────────────────
if content != original:
    TOOLS_DATA_JS.write_text(content, encoding="utf-8")
    print(f"\n[DONE] tools-data.js updated — {updated} URL(s) patched, {skipped} skipped.")
else:
    print("\n[INFO] tools-data.js already up to date — no changes written.")
