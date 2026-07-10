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
data (pricing, rating, category, use cases) rather than AI-generated prose.
That's what this script produces — no LLM calls, just templated real data,
which is also why it doesn't carry the "scaled content abuse" risk that the
article generator's volume did.

Re-run any time data/affiliate_tools.json or the TOOLS array changes —
it's idempotent (regenerates every page fresh each run).

Usage: python .github/scripts/generate_tool_pages.py
"""
import re
import json
from pathlib import Path
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parent.parent.parent
INDEX_HTML = ROOT / "index.html"
TUTORIALS_JS = ROOT / "js" / "tutorials-data.js"
TOOLS_DIR = ROOT / "tools"
SITEMAP = ROOT / "sitemap.xml"
BASE = "https://myaitoolsfinder.com"

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
    <h2>Frequently Asked Questions</h2>
    {faq_html}
  </section>

  {alternatives_block}
</div>

<footer>
  <p>&copy; {year} My AI Tools Finder &middot; <a href="../about.html">About</a> &middot; <a href="../index.html">Browse all 500+ AI tools</a></p>
</footer>
<script src="../js/mobile-nav.js"></script>
<script src="../js/affiliate.js"></script>
</body>
</html>
"""


def build_page(t, all_tools, tools_by_cat):
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

    # Tutorial button
    tutorial_btn = ""
    if has_tutorial(slug):
        tutorial_btn = f'<a class="btn-secondary" href="../tutorials/view.html?tool={slug}&level=basic">Step-by-Step Tutorial</a>'

    # FAQ (schema + visible) — built from real fields, no invented claims
    is_free = bool(re.search(r"free", pill, re.I)) if pill else False
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
        faq_html=faq_html,
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

    slugs = []
    seen_slugs = set()
    written = 0
    for t in tools:
        slug = slugify(t["name"])
        if not slug or slug in seen_slugs:
            continue  # skip dupes/blank names defensively
        seen_slugs.add(slug)
        slugs.append(slug)
        html = build_page(t, tools, tools_by_cat)
        (TOOLS_DIR / f"{slug}.html").write_text(html, encoding="utf-8")
        written += 1

    print(f"[OK] Wrote {written} tool pages to {TOOLS_DIR}/")
    update_sitemap(slugs)


if __name__ == "__main__":
    main()
