#!/usr/bin/env python3
"""
generate_tool_pages.py — My AI Tools Finder
─────────────────────────────────────────────────────────────────────────────
Builds one static, data-driven landing page per tool at /tools/{slug}.html.

Why: the site had 500+ tools living only inside a single JS array on
index.html — zero individually-crawlable/rankable URLs for queries like
"Writesonic pricing" or "Fireflies.ai alternatives". Competitors
(There's An AI For That, Futurepedia, Toolify) win primarily through
programmatic SEO: one indexable page per tool, built from real structured
data (pricing, rating, category, use cases).

The gated "Should You Actually Use X?" section is the one part of each
page that IS Claude-written (claude-haiku-4-5) — a short story-driven
narrative naming the reader's actual pain point and walking through
whether this specific tool solves it, grounded in the tool's real
jobs/needs/pricing/rating fields (no invented facts, no fabricated
quotes). Everything else on the page (title, pricing, FAQ, alternatives,
related articles) stays pure templated data. Results are cached in
tool_story_cache.json keyed by a hash of each tool's own data, so
re-running this script only pays for tools whose data actually changed —
important both for cost and so this doesn't turn into 521 pages of
LLM output regenerated (and silently drifting) on every run.

Requires ANTHROPIC_API_KEY (same GitHub secret the article generator
already uses). Without it, falls back to a short templated version of
the section so the script still runs end-to-end in dev/CI without the
key — see build_fallback_story().

Re-run any time data/affiliate_tools.json or the TOOLS array changes.

Usage: python .github/scripts/generate_tool_pages.py
"""
import os
import re
import json
import hashlib
from urllib.parse import quote
from pathlib import Path
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parent.parent.parent
INDEX_HTML = ROOT / "index.html"
TUTORIALS_JS = ROOT / "js" / "tutorials-data.js"
ARTICLES_DIR = ROOT / "articles"
TOOLS_DIR = ROOT / "tools"
SITEMAP = ROOT / "sitemap.xml"
STORY_CACHE_PATH = Path(__file__).resolve().parent / "tool_story_cache.json"
BASE = "https://myaitoolsfinder.com"
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "").strip()

TOOLS_DIR.mkdir(exist_ok=True)


# ── 1. Extract TOOLS array from index.html ──────────────────────────────────
def load_tools():
    text = INDEX_HTML.read_text(encoding="utf-8")
    lines = text.split("\n")
    start = next(i for i, l in enumerate(lines) if l.startswith("const TOOLS=["))
    end = next(i for i in range(start, len(lines)) if lines[i].startswith("];"))
    array_text = "\n".join(lines[start:end + 1])
    array_text = array_text[len("const TOOLS="):].rstrip(";\n")
    array_text = re.sub(r"/\*.*?\*/", "", array_text, flags=re.DOTALL)  # strip section comments
    json_text = re.sub(r"([{,])\s*(\w+):", r'\1"\2":', array_text)      # quote bare keys
    json_text = re.sub(r",(\s*[\]}])", r"\1", json_text)                # trailing commas
    return json.loads(json_text)


def slugify(name: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", name.lower())
    return s.strip("-")


def join_natural(items, max_items=3):
    """['a','b','c'] -> 'a, b, and c'. Used to turn data arrays into real sentences."""
    items = [i for i in items if i][:max_items]
    if not items:
        return ""
    if len(items) == 1:
        return items[0]
    if len(items) == 2:
        return f"{items[0]} and {items[1]}"
    return ", ".join(items[:-1]) + f", and {items[-1]}"


def parse_count(s):
    """'2.1M' -> 2100000, '320K' -> 320000, '1.4K' -> 1400. Returns None if unparseable."""
    if not s:
        return None
    m = re.match(r"^([\d.]+)\s*([KMB]?)\+?$", str(s).strip(), re.I)
    if not m:
        return None
    num = float(m.group(1))
    mult = {"": 1, "K": 1_000, "M": 1_000_000, "B": 1_000_000_000}[m.group(2).upper()]
    return int(num * mult)


def has_tutorial(slug: str) -> bool:
    if not TUTORIALS_JS.exists():
        return False
    return f"'{slug}':" in TUTORIALS_JS.read_text(encoding="utf-8")


def load_articles_index():
    """Scan articles/*.html once and return a list of real (non-redirect-stub)
    articles with the fields needed to match + display them: title, slug,
    excerpt, and published date. Redirect stubs (noindex + meta-refresh, used
    for the duplicate-article cleanup) are skipped via their literal
    "Redirecting..." title."""
    index = []
    if not ARTICLES_DIR.exists():
        return index
    for f in ARTICLES_DIR.glob("*.html"):
        text = f.read_text(encoding="utf-8", errors="ignore")
        m = re.search(r"<title>([^<]*)</title>", text)
        if not m:
            continue
        title = re.sub(r"\s*—\s*My AI Tools Finder\s*$", "", m.group(1)).strip()
        if not title or title.lower() == "redirecting...":
            continue
        desc_m = re.search(r'<meta name="description" content="([^"]*)"', text)
        date_m = re.search(r'<meta property="article:published_time" content="([^"]*)"', text)
        img_m = re.search(r'<meta property="og:image" content="([^"]*)"', text)
        index.append({
            "slug": f.stem,
            "title": title,
            "excerpt": (desc_m.group(1) if desc_m else "").strip(),
            "date": date_m.group(1) if date_m else "",
            "image": img_m.group(1) if img_m else "",
        })
    index.sort(key=lambda a: a["date"], reverse=True)
    return index


def find_related_articles(name: str, articles_index, limit=3):
    """Articles whose title mentions this tool by name — a simple, honest
    'related content' signal since these articles are literally about it."""
    matches = [a for a in articles_index if name.lower() in a["title"].lower()]
    return matches[:limit]


def esc(s: str) -> str:
    return (s or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SZQYFK19QN"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-SZQYFK19QN');</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{description}">
<meta property="og:type" content="website">
<meta property="og:title" content="{name} Review — Pricing, Features &amp; Alternatives">
<meta property="og:description" content="{description}">
<meta property="og:url" content="{canonical}">
<meta property="og:site_name" content="My AI Tools Finder">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{name} Review — Pricing, Features &amp; Alternatives">
<meta name="twitter:description" content="{description}">
<link rel="canonical" href="{canonical}">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": {name_json},
  "applicationCategory": {cat_json},
  "description": {description_json},
  "url": {tool_url_json}{aggregate_rating}
}}
</script>
{faq_schema}<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%231a56db'/%3E%3Ccircle cx='10' cy='10' r='4' fill='white'/%3E%3Ccircle cx='22' cy='10' r='4' fill='white' opacity='.55'/%3E%3Ccircle cx='10' cy='22' r='4' fill='white' opacity='.55'/%3E%3Ccircle cx='22' cy='22' r='4' fill='white' opacity='.25'/%3E%3Cpath d='M14 10h4M10 14v4M22 14v4M14 22h4' stroke='white' stroke-width='2.2' stroke-linecap='round'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<script src="../js/theme.js"></script>
<style>
:root{{--bg:#f0f6ff;--surface:#fff;--primary:#1a56db;--primary-2:#1e3a8a;--primary-light:#dbeafe;--accent:#d97706;--text:#0d1f3c;--text-2:#1e3a5f;--text-dim:#5c7799;--border:#c9d9f5;--border-soft:#dce9ff;--r:14px;}}
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0;}}
html{{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;}}
body{{font-family:'Poppins',sans-serif;background:var(--bg);color:var(--text);font-size:15px;line-height:1.65;}}
a{{color:inherit;text-decoration:none;}}
nav{{position:fixed;top:0;left:0;right:0;z-index:50;height:64px;background:rgba(255,255,255,.96);backdrop-filter:saturate(140%) blur(10px);border-bottom:1px solid var(--border-soft);display:flex;align-items:center;justify-content:space-between;padding:0 32px;}}
.logo{{display:flex;align-items:center;gap:9px;font-weight:700;font-size:16px;color:var(--text);}}
.logo-mark{{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,var(--primary),var(--primary-2));display:flex;align-items:center;justify-content:center;flex-shrink:0;}}
.nav-links{{display:flex;gap:20px;font-size:13.5px;color:var(--text-2);}}
.nav-links a:hover{{color:var(--primary);}}
.nav-cta{{padding:8px 16px;border-radius:999px;background:var(--primary);color:#fff;font-weight:600;font-size:13px;}}
.wrap{{max-width:820px;margin:0 auto;padding:88px 20px 80px;}}
.breadcrumb{{font-size:12.5px;color:var(--text-dim);margin-bottom:20px;}}
.breadcrumb a{{color:var(--primary);}}
.hero{{display:flex;gap:18px;align-items:flex-start;margin-bottom:20px;}}
.tool-logo{{width:64px;height:64px;border-radius:16px;flex-shrink:0;object-fit:cover;background:var(--surface);border:1px solid var(--border-soft);box-shadow:0 4px 14px rgba(26,86,219,.1);}}
h1{{font-size:clamp(24px,4vw,34px);font-weight:800;letter-spacing:-.02em;line-height:1.15;color:var(--text);margin-bottom:8px;}}
.cat-pill{{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--primary);background:var(--primary-light);padding:4px 11px;border-radius:999px;}}
.ratings-row{{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:16px 0;font-size:13.5px;color:var(--text-2);}}
.stars{{color:#f59e0b;font-size:14px;}}
.pricing-pill{{display:inline-block;font-size:12.5px;font-weight:700;color:#16a34a;background:rgba(22,163,74,.1);border:1.5px solid rgba(22,163,74,.28);padding:5px 12px;border-radius:999px;margin-bottom:22px;}}
.desc{{font-size:16px;color:var(--text-2);line-height:1.75;margin-bottom:28px;}}
.cta-row{{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:36px;}}
.btn-primary{{display:inline-flex;align-items:center;gap:7px;padding:13px 26px;border-radius:12px;background:linear-gradient(135deg,var(--primary),var(--primary-2));color:#fff;font-weight:700;font-size:14.5px;box-shadow:0 6px 20px rgba(26,86,219,.32);}}
.btn-secondary{{display:inline-flex;align-items:center;gap:7px;padding:13px 22px;border-radius:12px;background:var(--surface);color:var(--text);font-weight:600;font-size:14px;border:1.5px solid var(--border);}}
section.block{{margin:32px 0;}}
section.block h2{{font-size:19px;font-weight:700;color:var(--text);margin-bottom:14px;letter-spacing:-.01em;}}
.chip-list{{display:flex;flex-wrap:wrap;gap:8px;}}
.chip{{font-size:13px;color:var(--text-2);background:var(--surface);border:1.5px solid var(--border-soft);padding:7px 14px;border-radius:999px;}}
.faq-item{{border-bottom:1px solid var(--border-soft);padding:16px 0;}}
.faq-item h3{{font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px;}}
.faq-item p{{font-size:14px;color:var(--text-2);line-height:1.7;}}
.alt-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;}}
.alt-card{{display:flex;align-items:center;gap:10px;padding:12px 14px;background:var(--surface);border:1.5px solid var(--border-soft);border-radius:12px;transition:all .15s;}}
.alt-card:hover{{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 6px 16px rgba(26,86,219,.1);}}
.alt-logo{{width:32px;height:32px;border-radius:8px;flex-shrink:0;object-fit:cover;}}
.alt-name{{font-size:13.5px;font-weight:600;color:var(--text);}}
.alt-cat{{font-size:11px;color:var(--text-dim);}}
.related-scroller{{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:4px 2px 10px;margin:0 -20px;padding-left:20px;padding-right:20px;}}
.related-scroller::-webkit-scrollbar{{display:none;}}
.related-item{{flex:0 0 250px;display:flex;flex-direction:column;background:var(--surface);border:1.5px solid var(--border-soft);border-radius:14px;overflow:hidden;scroll-snap-align:start;transition:all .15s;}}
.related-item:hover{{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 8px 20px rgba(26,86,219,.10);}}
.related-item img{{width:100%;height:130px;object-fit:cover;display:block;background:var(--primary-light);}}
.related-item .r-body{{padding:14px 15px;display:flex;flex-direction:column;flex:1;}}
.related-item .r-title{{font-size:13.5px;font-weight:700;color:var(--text);margin-bottom:6px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}}
.related-item .r-excerpt{{font-size:12px;color:var(--text-dim);line-height:1.5;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;margin-bottom:8px;flex:1;}}
.related-item .r-date{{font-size:11px;color:var(--text-dim);font-weight:600;}}
.share-row{{display:flex;gap:8px;flex-wrap:wrap;margin-top:36px;padding-top:24px;border-top:1px solid var(--border-soft);}}
.share-btn{{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;border:1.5px solid var(--border);font-size:12.5px;font-weight:600;color:var(--text-2);text-decoration:none;transition:all .15s;background:none;cursor:pointer;font-family:inherit;}}
.share-btn:hover{{border-color:var(--primary);color:var(--primary);background:var(--primary-light);}}
.verdict-box{{position:relative;border-radius:20px;overflow:hidden;background:var(--surface);border:1.5px solid var(--border-soft);}}
.verdict-content{{padding:28px 26px;transition:filter .3s;filter:blur(7px);user-select:none;pointer-events:none;min-height:180px;}}
.verdict-content h3{{font-size:16px;font-weight:700;color:var(--text);margin:22px 0 8px;}}
.verdict-content h3:first-child{{margin-top:0;}}
.verdict-content p{{font-size:14.5px;color:var(--text-2);line-height:1.75;margin-bottom:6px;}}
.verdict-cta{{display:inline-flex;align-items:center;gap:7px;padding:13px 26px;border-radius:12px;background:linear-gradient(135deg,var(--primary),var(--primary-2));color:#fff;font-weight:700;font-size:14.5px;box-shadow:0 6px 20px rgba(26,86,219,.32);margin-top:18px;}}
.gate-overlay{{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:32px 24px;background:rgba(255,255,255,.82);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);}}
.gate-lock{{width:44px;height:44px;border-radius:50%;background:var(--primary-light);color:var(--primary);display:flex;align-items:center;justify-content:center;margin-bottom:14px;}}
.gate-overlay h3{{font-size:17px;font-weight:800;color:var(--text);margin-bottom:6px;}}
.gate-overlay p{{font-size:13.5px;color:var(--text-2);max-width:360px;margin-bottom:16px;}}
.gate-form-row{{display:flex;gap:8px;width:100%;max-width:360px;flex-wrap:wrap;justify-content:center;}}
.gate-input{{flex:1;min-width:180px;padding:11px 14px;border-radius:10px;border:1.5px solid var(--border);font:14px 'Poppins',sans-serif;outline:none;}}
.gate-btn{{padding:11px 20px;border-radius:10px;background:linear-gradient(135deg,var(--primary),var(--primary-2));color:#fff;border:none;font:700 13.5px 'Poppins',sans-serif;cursor:pointer;white-space:nowrap;}}
.gate-msg{{font-size:12.5px;margin-top:10px;min-height:16px;max-width:360px;}}
footer{{background:var(--surface);border-top:1px solid var(--border-soft);padding:32px 20px;text-align:center;font-size:12.5px;color:var(--text-dim);margin-top:60px;}}
footer a{{color:var(--primary);}}
@media(max-width:600px){{nav{{padding:0 16px;}}.nav-links{{display:none;}}.hero{{flex-direction:column;align-items:flex-start;}}}}
</style>
</head>
<body>
<nav>
  <a href="../index.html" class="logo">
    <div class="logo-mark">
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <circle cx="6" cy="6" r="2.8" fill="white"/>
        <circle cx="14" cy="6" r="2.8" fill="white" opacity="0.55"/>
        <circle cx="6" cy="14" r="2.8" fill="white" opacity="0.55"/>
        <circle cx="14" cy="14" r="2.8" fill="white" opacity="0.25"/>
      </svg>
    </div>
    My AI Tools Finder
  </a>
  <div class="nav-links">
    <a href="../index.html">Directory</a>
    <a href="../articles.html">Articles</a>
    <a href="../about.html">About</a>
  </div>
  <a href="../index.html#newsletter" class="nav-cta">Newsletter</a>
</nav>

<div class="wrap">
  <div class="breadcrumb"><a href="../index.html">Home</a> &rsaquo; <a href="../index.html#tools">AI Tools</a> &rsaquo; <a href="../index.html#tools">{cat}</a> &rsaquo; {name}</div>

  <div class="hero">
    <img class="tool-logo" src="{favicon}" alt="{name}" loading="eager" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain={domain_enc}&sz=128'">
    <div>
      <span class="cat-pill">{cat}</span>
      <h1>{name}</h1>
    </div>
  </div>

  {ratings_row}
  <div><span class="pricing-pill">{pill}</span></div>
  <p class="desc">{tag}</p>

  <div class="cta-row">
    <a class="btn-primary" href="{go_url}" target="_blank" rel="{rel}" onclick="if(window.dataLayer)window.dataLayer.push({{event:'tool_click',tool_name:{name_json},is_affiliate:{is_aff_json},destination:{active_url_json},click_type:'tool_page'}})">Visit {name} &rarr;</a>
    <a class="btn-secondary" href="../prompts.html#{slug}">Free {name} Prompts</a>
    {tutorial_btn}
  </div>

  {jobs_block}
  {needs_block}

  <section class="block">
    <h2>Should You Actually Use {name}?</h2>
    <div class="verdict-box">
      <div class="verdict-content" id="gate-content">
        {story_html}
        <a class="verdict-cta" href="{go_url}" target="_blank" rel="{rel}" onclick="if(window.dataLayer)window.dataLayer.push({{event:'tool_click',tool_name:{name_json},is_affiliate:{is_aff_json},destination:{active_url_json},click_type:'tool_page_gated_cta'}})">Try {name} Free &rarr;</a>
      </div>
      <div class="gate-overlay" id="gate-overlay">
        <div class="gate-lock">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>
        </div>
        <h3>Subscribers Only</h3>
        <p>See exactly how {name} can change your work and whether it's worth trying — free for newsletter subscribers.</p>
        <div class="gate-form-row">
          <input type="email" id="tool-gate-email" class="gate-input" placeholder="your@email.com" onkeydown="if(event.key==='Enter')toolGateSubmit()">
          <button id="tool-gate-btn" class="gate-btn" onclick="toolGateSubmit()">Unlock Free &rarr;</button>
        </div>
        <div id="tool-gate-msg" class="gate-msg"></div>
      </div>
    </div>
  </section>

  <section class="block">
    <h2>Frequently Asked Questions</h2>
    {faq_html}
  </section>

  {related_block}
  {alternatives_block}

  <div class="share-row">
    <a href="https://twitter.com/intent/tweet?text={share_text}&url={canonical_enc}" target="_blank" rel="noopener nofollow" class="share-btn">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.845L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      X / Twitter
    </a>
    <a href="https://www.facebook.com/sharer/sharer.php?u={canonical_enc}" target="_blank" rel="noopener nofollow" class="share-btn">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      Facebook
    </a>
    <a href="https://www.linkedin.com/sharing/share-offsite/?url={canonical_enc}" target="_blank" rel="noopener nofollow" class="share-btn">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      LinkedIn
    </a>
    <a href="https://www.reddit.com/submit?url={canonical_enc}&title={share_text}" target="_blank" rel="noopener nofollow" class="share-btn">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
      Reddit
    </a>
    <button onclick="(function(){{var u=window.location.href;navigator.clipboard?navigator.clipboard.writeText(u).then(function(){{var b=document.getElementById('copy-url-btn');var o=b.innerHTML;b.innerHTML='<svg width=13 height=13 viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><polyline points=\\'20 6 9 17 4 12\\'/></svg> Copied!';setTimeout(function(){{b.innerHTML=o;}},2000);}}):prompt('Copy this URL:',u);}})()" id="copy-url-btn" class="share-btn">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      Copy Link
    </button>
    <a href="../index.html#tools" class="share-btn">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
      Browse Tools
    </a>
  </div>
</div>

<footer>
  <p>&copy; {year} My AI Tools Finder &middot; <a href="../about.html">About</a> &middot; <a href="../index.html">Browse all 500+ AI tools</a></p>
</footer>
<script>
async function sha256(str){{
  const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(str.trim().toLowerCase()));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}}
async function isSubscriber(email){{
  try{{
    const hash=await sha256(email);
    const r=await fetch('/data/subscribers.json?_='+Date.now(),{{cache:'no-store'}});
    if(!r.ok) return null;
    const d=await r.json();
    return Array.isArray(d.hashes)&&d.hashes.includes(hash);
  }}catch(e){{ return null; }}
}}
function grantSubscriberAccess(email){{
  const name=email.split('@')[0].replace(/[._-]/g,' ').replace(/\\b\\w/g,c=>c.toUpperCase());
  try{{
    localStorage.setItem('myai_user_v1', JSON.stringify({{name, email, ts:Date.now()}}));
    localStorage.setItem('pf_sub', String(Date.now()+365*24*60*60*1000));
    localStorage.setItem('pf_email', email);
    localStorage.setItem('tut_subscribed', '1');
  }}catch(e){{}}
}}
function unlockToolGate(){{
  const content=document.getElementById('gate-content');
  const overlay=document.getElementById('gate-overlay');
  if(content){{ content.style.filter='none'; content.style.userSelect='auto'; content.style.pointerEvents='auto'; }}
  if(overlay) overlay.style.display='none';
}}
async function brevoSubscribe(email){{
  try{{
    const fd=new FormData();
    fd.append('EMAIL',email);
    fd.append('email_address_check','');
    fd.append('locale','en');
    const r=await fetch('https://bb0b0867.sibforms.com/v2/serve/MUIFAOGDJeXWoD51BjwMfv68XSaz0v90tEtIP4j7fWleHs6hcXvvW59DvRO_ULI5cVeWpFz--du9WCjUPi-wuhIhngKkkv4OkRXymONeiAKq6NUmSsZaxZEjzXzPwOQPwIAYEnFwUugNyHeTgKFv4i9Kv4nuKKNy3zM4zlwgk6coRZy63tOLzVnlVoVBq5AN2uiZDuQW-rU1Kgz9GQ==',{{method:'POST',body:fd,mode:'cors'}});
    const d=await r.json().catch(()=>null);
    return !!(d&&d.success);
  }}catch(e){{ return false; }}
}}
async function toolGateSubmit(){{
  const email=(document.getElementById('tool-gate-email').value||'').trim().toLowerCase();
  const msgEl=document.getElementById('tool-gate-msg');
  const btn=document.getElementById('tool-gate-btn');
  if(!email||!email.includes('@')){{ msgEl.style.color='#ef4444'; msgEl.textContent='Please enter a valid email address.'; return; }}
  btn.textContent='Checking…'; btn.disabled=true; msgEl.textContent='';
  const already=await isSubscriber(email);
  if(already===true){{
    grantSubscriberAccess(email);
    unlockToolGate();
    return;
  }}
  const ok=await brevoSubscribe(email);
  btn.textContent='Unlock Free →'; btn.disabled=false;
  if(ok){{
    grantSubscriberAccess(email);
    unlockToolGate();
  }} else {{
    msgEl.style.color='#ef4444';
    msgEl.textContent='Could not subscribe — check your connection and try again.';
  }}
}}
document.addEventListener('DOMContentLoaded', async function(){{
  const subExp=parseInt(localStorage.getItem('pf_sub')||'0');
  if(subExp>Date.now()){{ unlockToolGate(); return; }}
  let saved=null;
  try{{ saved=JSON.parse(localStorage.getItem('myai_user_v1')||'null'); }}catch(e){{}}
  if(saved&&saved.email){{
    const result=await isSubscriber(saved.email);
    if(result===true){{ grantSubscriberAccess(saved.email); unlockToolGate(); }}
  }}
}});
</script>
<script src="../js/mobile-nav.js"></script>
<script src="../js/affiliate.js"></script>
</body>
</html>
"""


def story_cache_key(t) -> str:
    """Hash of the fields that actually affect the story's content — if none
    of these changed since the last run, the cached story is still valid."""
    fields = {
        "name": t.get("name"), "cat": t.get("cat"), "tag": t.get("tag"),
        "pill": t.get("pill"), "rating": t.get("rating"), "reviews": t.get("reviews"),
        "users": t.get("users"), "jobs": t.get("jobs"), "needs": t.get("needs"),
    }
    return hashlib.sha256(json.dumps(fields, sort_keys=True).encode()).hexdigest()[:16]


def load_story_cache() -> dict:
    if STORY_CACHE_PATH.exists():
        try:
            return json.loads(STORY_CACHE_PATH.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {}


def save_story_cache(cache: dict):
    STORY_CACHE_PATH.write_text(json.dumps(cache, indent=2, ensure_ascii=False), encoding="utf-8")


def build_fallback_story(t, is_free: bool) -> str:
    """Templated version used when ANTHROPIC_API_KEY isn't set or the API
    call fails. Deliberately plain — the real narrative comes from Claude;
    this just keeps the script runnable without a key."""
    name = t["name"]
    cat = t.get("cat", "AI Tool")
    tag = t.get("tag", "")
    pill = t.get("pill", "")
    rating = t.get("rating")
    reviews = t.get("reviews")
    users = t.get("users")
    jobs_lower = [j.lower() for j in t.get("jobs", [])]
    needs_lower = [n.lower() for n in t.get("needs", [])]

    if jobs_lower:
        impact_lede = f"If you're a {join_natural(jobs_lower)}, {name} is built for exactly this kind of work."
    else:
        impact_lede = f"{name} is built for people doing {cat.lower()} work every day."
    if needs_lower:
        impact_body = (
            f"Right now, {join_natural(needs_lower)} probably eats up real hours in your week. "
            f"{name} takes that off your plate — instead of starting from a blank page or doing it by hand, "
            f"you hand it to {name} and get a usable result back in minutes."
        )
    else:
        impact_body = f"{name} is designed to save you time on the specific tasks it covers, so those hours go back into your actual work."
    impact_html = f'<h3>What Changes For You</h3><p>{esc(impact_lede)}</p><p>{esc(impact_body)}</p>'

    how_text = tag or f"{name} is an AI tool in the {cat} category."
    how_html = f'<h3>How It Actually Works</h3><p>{esc(how_text)}</p>'

    verdict_parts = []
    if rating:
        verdict_parts.append(f"a {rating}/5 rating" + (f" from {reviews} reviews" if reviews else ""))
    if users:
        verdict_parts.append(f"{users} people already using it")
    if pill:
        verdict_parts.append(f"a {pill} plan")
    if verdict_parts:
        verdict_text = (
            f"With {join_natural(verdict_parts)}, {name} has already cleared the bar for a lot of people "
            f"in the same position you're in. The realistic move: try the "
            + ("free tier" if is_free else "trial")
            + " on one real task this week and judge it by whether it actually saves you time — not by the marketing."
        )
    else:
        verdict_text = f"The only real way to know if {name} fits your workflow is to try it on one real task — not a demo, an actual thing you need done this week."
    verdict_html = f'<h3>Is It Worth Trying?</h3><p>{esc(verdict_text)}</p>'

    return impact_html + how_html + verdict_html


def generate_story_with_claude(t, is_free: bool):
    """One short, story-driven 'Should You Actually Use This?' section,
    grounded strictly in this tool's real data fields. Returns HTML
    (<h3>/<p> only) or None on any failure — caller falls back to the
    templated version."""
    try:
        import anthropic
    except ImportError:
        return None
    if not ANTHROPIC_API_KEY:
        return None

    name = t["name"]
    cat = t.get("cat", "AI Tool")
    tag = t.get("tag", "")
    pill = t.get("pill", "")
    rating = t.get("rating")
    reviews = t.get("reviews")
    users = t.get("users")
    jobs = t.get("jobs", [])
    needs = t.get("needs", [])

    facts = "\n".join(filter(None, [
        f"Tool name: {name}",
        f"Category: {cat}",
        f"What it does: {tag}",
        f"Pricing: {pill}" if pill else "",
        f"Rating: {rating}/5" + (f" from {reviews} reviews" if reviews else "") if rating else "",
        f"User base: {users}" if users else "",
        f"Who it's for: {', '.join(jobs)}" if jobs else "",
        f"What it helps with: {', '.join(needs)}" if needs else "",
    ]))

    prompt = (
        f"Write the 'Should You Actually Use {name}?' section for a tool review page. "
        f"This is gated content a subscriber unlocks, so it needs to actually deliver — not "
        f"restate the obvious.\n\n"
        f"REAL DATA — use only these facts, do not invent features, quotes, statistics, or "
        f"outcomes beyond what's listed:\n{facts}\n\n"
        f"Write it as a short story, not a spec sheet. Structure:\n"
        f"1. <h3>What Changes For You</h3> — open with a specific, vivid scene of the exact "
        f"person this tool is for (use the 'Who it's for' / 'What it helps with' fields), caught "
        f"in the actual moment of the pain point this tool solves. Make the reader recognize "
        f"themselves. 2-3 sentences of scene, then 1-2 sentences on what's different after.\n"
        f"2. <h3>How It Actually Works</h3> — plain-language explanation grounded in 'What it "
        f"does', told as the next beat of the story (what the person does now, using this tool, "
        f"instead of the old painful way).\n"
        f"3. <h3>Is It Worth Trying?</h3> — an honest, specific verdict using the real "
        f"rating/users/pricing data. Tell them exactly what to try and how to judge it.\n\n"
        f"Rules: HTML only (<h3>, <p>, <strong>) — no markdown, no preamble. Each section "
        f"1-3 short paragraphs. No invented user names, no fake specific dollar figures or "
        f"percentages that aren't in the data above. Write like a sharp friend, not a brochure. "
        f"Total length: 180-260 words."
    )

    MODELS = ["claude-haiku-4-5", "claude-sonnet-4-5"]
    for model in MODELS:
        try:
            client = anthropic.Anthropic()
            msg = client.messages.create(
                model=model,
                max_tokens=700,
                messages=[{"role": "user", "content": prompt}],
            )
            text = msg.content[0].text.strip()
            if "<h3>" in text:
                return text
        except Exception as e:
            print(f"[WARN] Claude story generation failed for {name} with {model}: {e}")
            continue
    return None


def get_story_html(t, is_free: bool, cache: dict) -> str:
    key = slugify(t["name"])
    data_hash = story_cache_key(t)
    cached = cache.get(key)
    if cached and cached.get("hash") == data_hash:
        return cached["html"]

    html = generate_story_with_claude(t, is_free)
    if html:
        cache[key] = {"hash": data_hash, "html": html}
        return html

    # No API key / call failed — use the fallback, but don't cache it, so
    # the next run (once a key is available) tries Claude again instead of
    # locking in the weaker templated version.
    return build_fallback_story(t, is_free)


def build_page(t, all_tools, tools_by_cat, articles_index, story_cache):
    name = t["name"]
    slug = slugify(name)
    domain = t.get("domain", "")
    cat = t.get("cat", "AI Tool")
    tag = t.get("tag", "")
    pill = t.get("pill", "")
    rating = t.get("rating")
    reviews = t.get("reviews")
    users = t.get("users")
    jobs = t.get("jobs", [])
    needs = t.get("needs", [])
    active_url = (t.get("affiliate_url") or "").strip() or t.get("url", "")
    is_aff = bool((t.get("affiliate_url") or "").strip())
    canonical = f"{BASE}/tools/{slug}.html"
    canonical_enc = quote(canonical, safe="")
    share_text = quote(f"{name} Review: Pricing, Features & Alternatives")
    go_url = "../go.html?url=" + active_url.replace("&", "%26") + "&name=" + name.replace(" ", "%20")
    rel = "sponsored noopener nofollow" if is_aff else "noopener nofollow"

    description = f"{tag} Pricing: {pill}." if pill else tag
    description = description[:300]

    # Ratings row
    ratings_row = ""
    if rating or users:
        parts = []
        if rating:
            stars = "★" * round(rating) + "☆" * (5 - round(rating))
            parts.append(f'<span class="stars">{stars}</span> <strong>{rating}</strong>' + (f" ({esc(str(reviews))})" if reviews else ""))
        if users:
            parts.append(f"<strong>{esc(str(users))}</strong> users")
        ratings_row = '<div class="ratings-row">' + " &middot; ".join(parts) + "</div>"

    # Jobs / needs blocks
    jobs_block = ""
    if jobs:
        chips = "".join(f'<span class="chip">{esc(j)}</span>' for j in jobs[:8])
        jobs_block = f'<section class="block"><h2>Best For</h2><div class="chip-list">{chips}</div></section>'

    needs_block = ""
    if needs:
        chips = "".join(f'<span class="chip">{esc(n)}</span>' for n in needs[:8])
        needs_block = f'<section class="block"><h2>What {esc(name)} Helps You Do</h2><div class="chip-list">{chips}</div></section>'

    # ── Gated "Should You Actually Use This?" content ──────────────────────
    # A short story-driven narrative naming the reader's real pain point and
    # walking through whether this tool solves it — Claude-written when an
    # API key is available (cached by data hash), templated fallback
    # otherwise. See get_story_html() / build_fallback_story().
    is_free = bool(re.search(r"free", pill, re.I)) if pill else False
    story_html = get_story_html(t, is_free, story_cache)

    # Tutorial button
    tutorial_btn = ""
    if has_tutorial(slug):
        tutorial_btn = f'<a class="btn-secondary" href="../tutorials/view.html?tool={slug}&level=basic">Step-by-Step Tutorial</a>'

    # FAQ (schema + visible) — built from real fields, no invented claims
    faq_pairs = [
        (f"Is {name} free to use?",
         (f"{name} offers a free tier ({pill})." if is_free else f"{name}'s pricing is {pill}.") if pill
         else f"Check {name}'s official site for current pricing."),
        (f"What is {name} used for?", tag or f"{name} is an AI tool in the {cat} category."),
    ]
    if jobs:
        faq_pairs.append((f"Who is {name} best for?",
                           f"{name} is popular with " + ", ".join(jobs[:3]) + "."))
    if rating:
        faq_pairs.append((f"What do users say about {name}?",
                           f"{name} has a {rating}/5 rating" + (f" from {reviews} reviews" if reviews else "") + "."))

    faq_html = "".join(
        f'<div class="faq-item"><h3>{esc(q)}</h3><p>{esc(a)}</p></div>' for q, a in faq_pairs
    )
    faq_schema_items = ",\n".join(
        '    {{"@type":"Question","name":{q},"acceptedAnswer":{{"@type":"Answer","text":{a}}}}}'.format(
            q=json.dumps(q), a=json.dumps(a)
        ) for q, a in faq_pairs
    )
    faq_schema = (
        '<script type="application/ld+json">\n'
        '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[\n'
        + faq_schema_items + "\n"
        "]}\n</script>\n"
    )

    # Alternatives — same category, top by trending, excluding self
    same_cat = [o for o in tools_by_cat.get(cat, []) if o["name"] != name]
    same_cat.sort(key=lambda o: o.get("trending", 0), reverse=True)
    alts = same_cat[:4]
    alternatives_block = ""
    if alts:
        cards = []
        for a in alts:
            a_slug = slugify(a["name"])
            a_domain = a.get("domain", "")
            fav = f"https://www.google.com/s2/favicons?domain={a_domain}&sz=64" if a_domain else ""
            cards.append(
                f'<a class="alt-card" href="{a_slug}.html">'
                f'<img class="alt-logo" src="{fav}" alt="{esc(a["name"])}" loading="lazy">'
                f'<div><div class="alt-name">{esc(a["name"])}</div>'
                f'<div class="alt-cat">{esc(a.get("cat",""))}</div></div></a>'
            )
        alternatives_block = (
            f'<section class="block"><h2>Alternatives to {esc(name)}</h2>'
            f'<div class="alt-grid">{"".join(cards)}</div></section>'
        )

    # Related articles — real articles whose title actually mentions this tool
    related = find_related_articles(name, articles_index, limit=6)
    related_block = ""
    if related:
        items = []
        for a in related:
            date_disp = ""
            if a["date"]:
                try:
                    date_disp = datetime.fromisoformat(a["date"].replace("Z", "+00:00")).strftime("%b %d, %Y")
                except ValueError:
                    date_disp = ""
            img = a.get("image", "")
            img_html = (
                f'<img src="{img}" alt="{esc(a["title"])}" loading="lazy" '
                f'onerror="this.style.display=\'none\'">'
            ) if img else ""
            items.append(
                f'<a class="related-item" href="../articles/{a["slug"]}.html">'
                f'{img_html}'
                f'<div class="r-body">'
                f'<div class="r-title">{esc(a["title"])}</div>'
                + (f'<div class="r-excerpt">{esc(a["excerpt"])}</div>' if a["excerpt"] else "")
                + (f'<div class="r-date">{date_disp}</div>' if date_disp else "")
                + '</div></a>'
            )
        related_block = (
            f'<section class="block"><h2>Related Articles</h2>'
            f'<div class="related-scroller">{"".join(items)}</div></section>'
        )

    # aggregateRating schema fragment (only if we have real numeric data)
    aggregate_rating = ""
    review_count = parse_count(reviews)
    if rating and review_count:
        aggregate_rating = (
            f',\n  "aggregateRating": {{"@type": "AggregateRating", '
            f'"ratingValue": {rating}, "reviewCount": {review_count}}}'
        )

    favicon = f"https://www.google.com/s2/favicons?domain={domain}&sz=128" if domain else ""

    return PAGE_TEMPLATE.format(
        title=esc(f"{name} Review 2026: Pricing, Features & Alternatives — My AI Tools Finder"),
        description=esc(description),
        canonical=canonical,
        canonical_enc=canonical_enc,
        share_text=share_text,
        name=esc(name),
        name_json=json.dumps(name),
        cat_json=json.dumps(cat),
        description_json=json.dumps(description),
        tool_url_json=json.dumps(t.get("url", "")),
        aggregate_rating=aggregate_rating,
        faq_schema=faq_schema,
        cat=esc(cat),
        favicon=favicon,
        domain_enc=domain.replace("&", "%26"),
        ratings_row=ratings_row,
        pill=esc(pill),
        tag=esc(tag),
        go_url=go_url,
        rel=rel,
        is_aff_json=json.dumps(is_aff),
        active_url_json=json.dumps(active_url),
        slug=slug,
        tutorial_btn=tutorial_btn,
        jobs_block=jobs_block,
        needs_block=needs_block,
        story_html=story_html,
        faq_html=faq_html,
        related_block=related_block,
        alternatives_block=alternatives_block,
        year=datetime.now(timezone.utc).year,
    )


def update_sitemap(slugs):
    if not SITEMAP.exists():
        return
    text = SITEMAP.read_text(encoding="utf-8")
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    existing = set(re.findall(r"<loc>https://myaitoolsfinder\.com/tools/([a-z0-9-]+)\.html</loc>", text))
    new_slugs = [s for s in slugs if s not in existing]
    if not new_slugs:
        print(f"[sitemap] all {len(slugs)} tool URLs already present")
        return
    entries = "".join(
        f"  <url>\n    <loc>{BASE}/tools/{s}.html</loc>\n    <lastmod>{today}</lastmod>\n"
        f"    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n"
        for s in new_slugs
    )
    text = text.replace("</urlset>", entries + "</urlset>")
    SITEMAP.write_text(text, encoding="utf-8")
    print(f"[sitemap] added {len(new_slugs)} new tool URLs")


def main():
    tools = load_tools()
    print(f"[INFO] Loaded {len(tools)} tools")

    tools_by_cat = {}
    for t in tools:
        tools_by_cat.setdefault(t.get("cat", ""), []).append(t)

    articles_index = load_articles_index()
    print(f"[INFO] Indexed {len(articles_index)} real articles for related-content matching")

    story_cache = load_story_cache()
    if not ANTHROPIC_API_KEY:
        print("[WARN] ANTHROPIC_API_KEY not set — 'Should You Actually Use This?' sections "
              "will use the plain templated fallback instead of Claude-written stories.")

    slugs = []
    seen_slugs = set()
    written = 0
    for t in tools:
        slug = slugify(t["name"])
        if not slug or slug in seen_slugs:
            continue  # skip dupes/blank names defensively
        seen_slugs.add(slug)
        slugs.append(slug)
        html = build_page(t, tools, tools_by_cat, articles_index, story_cache)
        (TOOLS_DIR / f"{slug}.html").write_text(html, encoding="utf-8")
        written += 1
        if written % 25 == 0:
            save_story_cache(story_cache)  # checkpoint periodically during long API runs

    save_story_cache(story_cache)
    print(f"[OK] Wrote {written} tool pages to {TOOLS_DIR}/")
    update_sitemap(slugs)


if __name__ == "__main__":
    main()
