#!/usr/bin/env python3
"""
generate_feed.py — My AI Tools Finder
─────────────────────────────────────────────────────────────────────────────
Regenerates feed.xml from ALL article HTML files in /articles/.
Reads each file's <title>, <meta name="description">, canonical URL,
og:image, and article:published_time from the HTML <head>.
Sorts by publish date descending. Emits a valid RSS 2.0 feed.

Run: python .github/scripts/generate_feed.py
"""
import os, re, glob
from pathlib import Path
from datetime import datetime, timezone
from email.utils import format_datetime

ROOT        = Path(__file__).resolve().parent.parent.parent
ARTICLES    = ROOT / "articles"
FEED_FILE   = ROOT / "feed.xml"
SITE        = "https://myaitoolsfinder.com"
FEED_TITLE  = "My AI Tools Finder — Reviews & Guides"
FEED_DESC   = "Honest AI tools reviews, comparisons and workflow guides for solopreneurs, freelancers and creators."
FEED_IMG    = f"{SITE}/og-image.png"
MAX_ITEMS   = 50   # most recent N articles in the feed


def extract_meta(html: str, property_name: str) -> str:
    """Extract content from <meta name|property="x" content="y"> or vice versa."""
    patterns = [
        rf'<meta\s+(?:name|property)="{re.escape(property_name)}"\s+content="([^"]*)"',
        rf'<meta\s+content="([^"]*)"\s+(?:name|property)="{re.escape(property_name)}"',
    ]
    for p in patterns:
        m = re.search(p, html, re.IGNORECASE)
        if m:
            return m.group(1).strip()
    return ""


def extract_title(html: str) -> str:
    m = re.search(r"<title>(.*?)</title>", html, re.IGNORECASE | re.DOTALL)
    if not m:
        return ""
    t = re.sub(r"\s*[—–-]\s*My AI Tools Finder\s*$", "", m.group(1).strip())
    return t.strip()


def extract_canonical(html: str) -> str:
    m = re.search(r'<link\s+rel="canonical"\s+href="([^"]+)"', html, re.IGNORECASE)
    return m.group(1).strip() if m else ""


def parse_date(iso: str) -> datetime | None:
    if not iso:
        return None
    try:
        return datetime.fromisoformat(iso.replace("Z", "+00:00"))
    except Exception:
        return None


def file_mtime(path: Path) -> datetime:
    return datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc)


def rfc2822(dt: datetime) -> str:
    return format_datetime(dt, usegmt=True)


def escape_xml(s: str) -> str:
    return (s.replace("&", "&amp;")
             .replace("<", "&lt;")
             .replace(">", "&gt;")
             .replace('"', "&quot;"))


def build_feed(items: list[dict]) -> str:
    now_str = rfc2822(datetime.now(timezone.utc))
    entries = []
    for item in items[:MAX_ITEMS]:
        pub = rfc2822(item["date"])
        img_tag = f"\n    <enclosure url=\"{escape_xml(item['image'])}\" type=\"image/jpeg\" length=\"0\"/>" if item.get("image") else ""
        entries.append(f"""
  <item>
    <title>{escape_xml(item['title'])}</title>
    <link>{escape_xml(item['url'])}</link>
    <guid isPermaLink="true">{escape_xml(item['url'])}</guid>
    <pubDate>{pub}</pubDate>
    <description>{escape_xml(item['description'])}</description>{img_tag}
  </item>""")

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>{escape_xml(FEED_TITLE)}</title>
    <link>{SITE}</link>
    <description>{escape_xml(FEED_DESC)}</description>
    <language>en-us</language>
    <lastBuildDate>{now_str}</lastBuildDate>
    <atom:link href="{SITE}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>{FEED_IMG}</url>
      <title>{escape_xml(FEED_TITLE)}</title>
      <link>{SITE}</link>
    </image>
{"".join(entries)}
  </channel>
</rss>
"""


def main():
    html_files = sorted(ARTICLES.glob("*.html"))
    # Skip redirect stubs (< 100 lines)
    items = []
    for path in html_files:
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        if len(text.splitlines()) < 80:
            continue  # skip stubs / redirects

        title       = extract_title(text)
        description = extract_meta(text, "description")
        canonical   = extract_canonical(text)
        pub_iso     = extract_meta(text, "article:published_time")
        og_image    = extract_meta(text, "og:image")

        if not title or not canonical:
            continue

        date = parse_date(pub_iso) or file_mtime(path)
        items.append({
            "title":       title,
            "url":         canonical,
            "description": description or title,
            "image":       og_image,
            "date":        date,
            "path":        str(path),
        })

    # Sort by date descending (newest first)
    items.sort(key=lambda x: x["date"], reverse=True)
    print(f"[Feed] {len(items)} articles found. Writing top {min(len(items), MAX_ITEMS)} to feed.xml")

    feed_xml = build_feed(items)
    FEED_FILE.write_text(feed_xml, encoding="utf-8")
    print(f"[Feed] feed.xml written. {len(feed_xml)} bytes.")


if __name__ == "__main__":
    main()
