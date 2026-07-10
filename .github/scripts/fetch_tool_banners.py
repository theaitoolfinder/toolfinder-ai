#!/usr/bin/env python3
"""
fetch_tool_banners.py — My AI Tools Finder
─────────────────────────────────────────────────────────────────────────────
Fetches each tool's own og:image (the marketing banner they already made
for social sharing) so tool pages can show it as a blended brand banner
next to the tool name — no screenshot service, no scraping their whole
site, just the one meta tag they already publish for this exact purpose.

Cached in tool_banner_cache.json keyed by slug, so a re-run only fetches
tools that are new or whose homepage URL changed. A tool with no
og:image (or an unreachable homepage) is cached as banner: null and
retried after BANNER_RETRY_DAYS, not on every run.

Usage: python .github/scripts/fetch_tool_banners.py
"""
import json
import re
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import urljoin

import requests

sys.path.insert(0, str(Path(__file__).resolve().parent))
import generate_tool_pages as g  # reuse load_tools()/slugify()

CACHE_PATH = Path(__file__).resolve().parent / "tool_banner_cache.json"
BANNER_RETRY_DAYS = 14
TIMEOUT = 8
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    )
}

_OG_IMAGE_RE = re.compile(
    r'<meta[^>]+(?:property|name)=["\'](?:og:image(?::secure_url)?|twitter:image)["\'][^>]+content=["\']([^"\']+)["\']',
    re.I,
)
_OG_IMAGE_RE_REV = re.compile(
    r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\'](?:og:image(?::secure_url)?|twitter:image)["\']',
    re.I,
)


def load_cache() -> dict:
    if CACHE_PATH.exists():
        try:
            return json.loads(CACHE_PATH.read_text(encoding="utf-8"))
        except Exception:
            return {}
    return {}


def save_cache(cache: dict) -> None:
    CACHE_PATH.write_text(json.dumps(cache, indent=1), encoding="utf-8")


def extract_og_image(html: str, base_url: str) -> str | None:
    m = _OG_IMAGE_RE.search(html) or _OG_IMAGE_RE_REV.search(html)
    if not m:
        return None
    img = m.group(1).strip()
    if not img:
        return None
    return urljoin(base_url, img)


def fetch_banner(url: str) -> str | None:
    try:
        r = requests.get(url, headers=HEADERS, timeout=TIMEOUT, allow_redirects=True)
        if r.status_code != 200 or not r.text:
            return None
        return extract_og_image(r.text[:200_000], r.url)
    except Exception:
        return None


def main():
    tools = g.load_tools()
    cache = load_cache()
    now = datetime.now(timezone.utc)

    fetched = skipped = failed = 0
    for t in tools:
        slug = g.slugify(t["name"])
        url = (t.get("url") or "").strip()
        if not url:
            continue

        entry = cache.get(slug)
        if entry and entry.get("url") == url:
            if entry.get("banner"):
                skipped += 1
                continue
            checked_at = entry.get("checked_at")
            if checked_at:
                try:
                    age = now - datetime.fromisoformat(checked_at)
                    if age < timedelta(days=BANNER_RETRY_DAYS):
                        skipped += 1
                        continue
                except Exception:
                    pass

        banner = fetch_banner(url)
        cache[slug] = {
            "url": url,
            "banner": banner,
            "checked_at": now.isoformat(),
        }
        if banner:
            fetched += 1
        else:
            failed += 1

    save_cache(cache)
    print(f"[OK] banners fetched: {fetched}, unchanged/skipped: {skipped}, no banner found: {failed}")


if __name__ == "__main__":
    main()
