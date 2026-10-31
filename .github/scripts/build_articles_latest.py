#!/usr/bin/env python3
"""
build_articles_latest.py — My AI Tools Finder
Writes data/articles-latest.json: the newest public article cards (href, image,
category, title, excerpt, date) pulled from articles.html.

Why: the homepage used to download ALL of articles.html (~500 KB and growing
with every article) just to show 9 cards. This ~4 KB file replaces that.
Run after any change to articles.html.
"""
import html, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
SRC = ROOT / "articles.html"
OUT = ROOT / "data" / "articles-latest.json"
LIMIT = 12

CARD = re.compile(r'<a href="([^"]+)" class="art-card(?P<cls>[^"]*)"[^>]*>(?P<body>.*?)</a>', re.S)


def pick(pattern, body):
    m = re.search(pattern, body, re.S)
    return html.unescape(re.sub(r"<[^>]+>", "", m.group(1))).strip() if m else ""


def main():
    text = SRC.read_text(encoding="utf-8")
    start = text.index('id="art-grid"')
    cards = []
    for m in CARD.finditer(text, start):
        if "exclusive" in m.group("cls"):
            continue
        body = m.group("body")
        img = re.search(r'<img[^>]+src="([^"]+)"', body)
        cards.append({
            "href": m.group(1),
            "img": html.unescape(img.group(1)) if img else "",
            "cat": pick(r'class="art-card-cat"[^>]*>(.*?)</span>', body),
            "title": pick(r'class="art-card-title"[^>]*>(.*?)</div>', body),
            "excerpt": pick(r'class="art-card-excerpt"[^>]*>(.*?)</div>', body),
            "date": pick(r'class="art-card-date"[^>]*>(.*?)</span>', body),
        })
        if len(cards) >= LIMIT:
            break
    cards = [c for c in cards if c["title"] and c["href"]]
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps({"articles": cards}, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"[articles-latest] wrote {len(cards)} cards -> {OUT.name} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
