#!/usr/bin/env python3
"""
generate_article.py — MyAI ToolsFinder Daily Article Generator
─────────────────────────────────────────────────────────────────
Runs daily via GitHub Actions. Does two things:
  1. Fetches trending AI stories from HackerNews (free, no API key needed)
  2. Writes a quality article:
       - WITH Claude API key  → uses Claude to write a proper 600-word article
       - WITHOUT Claude API key → generates a structured HN digest
  3. Saves articles/ai-digest-YYYY-MM-DD.html
  4. Prepends a new card to articles.html so it appears immediately

SETUP:
  - No setup required (free HN-based mode works out of the box)
  - For Claude-written articles: add ANTHROPIC_API_KEY to GitHub Actions secrets
    (Repo → Settings → Secrets → Actions → New repository secret)
"""

import os
import re
import sys
import json
import textwrap
import requests
from datetime import datetime, timezone, timedelta
from pathlib import Path

# ── Paths ─────────────────────────────────────────────────────────────────────
ROOT         = Path(__file__).resolve().parent.parent.parent
ARTICLES_DIR = ROOT / "articles"
ARTICLES_HTML = ROOT / "articles.html"
ARTICLES_DIR.mkdir(exist_ok=True)

# ── Config ────────────────────────────────────────────────────────────────────
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "").strip()
CUSTOM_TOPIC      = os.environ.get("CUSTOM_TOPIC", "").strip()
TODAY             = datetime.now(timezone.utc)
DATE_STR          = TODAY.strftime("%B %d, %Y")
DATE_SLUG         = TODAY.strftime("%Y-%m-%d")
SLUG              = f"ai-digest-{DATE_SLUG}"
OUTPUT_PATH       = ARTICLES_DIR / f"{SLUG}.html"

# AI tools we cover — mentioned naturally in articles so auto-linker picks them up
TOOLS_LIST = [
    "ChatGPT", "Claude", "Gemini", "Perplexity AI", "DeepSeek", "Microsoft Copilot",
    "Grammarly", "Jasper AI", "Writesonic", "Copy.ai", "QuillBot", "DeepL",
    "Midjourney", "Adobe Firefly", "Leonardo.ai", "DALL-E 3", "Ideogram", "Canva",
    "Figma AI", "Framer AI", "Runway", "HeyGen", "Synthesia", "Descript", "Veed.io",
    "ElevenLabs", "Murf AI", "Suno", "Adobe Podcast", "Otter.ai",
    "Surfer SEO", "Ahrefs", "Semrush", "RankMath AI",
    "Cursor", "GitHub Copilot", "Bolt.new", "Windsurf", "Lovable", "v0 by Vercel", "Replit AI",
    "Notion AI", "Granola", "Motion", "Fireflies.ai", "Zapier", "Make.com", "n8n",
    "Gamma", "Beautiful.ai", "HubSpot AI", "Beehiiv", "Instantly AI",
    "Tidio", "Intercom AI", "AdCreative.ai",
]


# ── 1. Fetch trending HN stories ──────────────────────────────────────────────
def fetch_hn_stories(topic=""):
    """Fetch top AI stories from HackerNews Algolia API (free, no key needed)."""
    since = int((TODAY - timedelta(hours=36)).timestamp())
    query = topic if topic else "artificial intelligence AI machine learning LLM"
    url = (
        f"https://hn.algolia.com/api/v1/search"
        f"?query={requests.utils.quote(query)}"
        f"&tags=story"
        f"&numericFilters=created_at_i>{since},points>5"
        f"&hitsPerPage=25"
        f"&attributesToRetrieve=title,url,author,points,num_comments,created_at,objectID"
    )
    try:
        r = requests.get(url, timeout=15)
        r.raise_for_status()
        hits = r.json().get("hits", [])
    except Exception as e:
        print(f"[WARN] HN fetch failed: {e}", file=sys.stderr)
        return []

    # Filter for genuinely AI-relevant stories
    ai_keywords = [
        "ai", "gpt", "llm", "claude", "gemini", "openai", "anthropic",
        "machine learning", "neural", "model", "agent", "chatgpt", "deepseek",
        "mistral", "midjourney", "stable diffusion", "automation", "copilot",
        "cursor", "bolt", "lovable", "windsurf", "elevenlabs", "suno",
        "runway", "heygen", "perplexity", "robotics", "transformer",
    ]
    filtered = [
        h for h in hits
        if any(kw in h.get("title", "").lower() for kw in ai_keywords)
        and h.get("points", 0) >= 8
    ]
    # Sort by points descending
    filtered.sort(key=lambda x: x.get("points", 0), reverse=True)
    return filtered[:8]


# ── 2a. Generate article with Claude API ─────────────────────────────────────
def generate_with_claude(stories, topic=""):
    """Use Anthropic Claude API to write a quality article."""
    try:
        import anthropic
    except ImportError:
        print("[WARN] anthropic package not installed, falling back to template.", file=sys.stderr)
        return None

    headlines = "\n".join(
        f"  {i+1}. {s['title']} ({s.get('points',0)} pts, {s.get('num_comments',0)} comments)"
        for i, s in enumerate(stories)
    ) or "  No trending stories found today."

    tools_sample = ", ".join(TOOLS_LIST[:18])
    focus = f"Focus especially on: {topic}." if topic else ""

    prompt = textwrap.dedent(f"""
        You are a writer for MyAI ToolsFinder — an AI tools directory for solopreneurs, freelancers and creators.
        Your readers are practical people who use AI tools daily to save time and grow their businesses.

        Write a ~600-word daily AI news digest article titled:
        "AI Tools Digest — {DATE_STR}: What's Trending This Week"

        {focus}

        Base the article on these real trending Hacker News stories:
        {headlines}

        REQUIREMENTS:
        - Tone: conversational, honest, practical — never hype-y or click-bait
        - Structure: short intro (2 sentences) → 3-4 story sections with h3 headings → "Bottom Line" section
        - Each section: summarise the story in 2-3 sentences, then give ONE practical takeaway for the reader
        - Naturally mention 3-5 AI tools from this list where genuinely relevant: {tools_sample}
          (Do NOT force tool mentions — only include them where they add real value)
        - NO markdown, write clean HTML using only: <p>, <h3>, <ul>, <li>, <strong>, <em>
        - Do NOT include h1, h2, html, head, body, or any structural tags
        - Do NOT make up facts — only reference what's in the headlines above
        - End with a short "Bottom Line" section (<h3>Bottom Line</h3>) with one actionable takeaway

        Return ONLY the article body HTML. Nothing else.
    """).strip()

    try:
        client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
        message = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=1800,
            messages=[{"role": "user", "content": prompt}]
        )
        return message.content[0].text.strip()
    except Exception as e:
        print(f"[WARN] Claude API error: {e}", file=sys.stderr)
        return None


# ── 2b. Generate article from template (no API key needed) ───────────────────
def generate_template_article(stories, topic=""):
    """Generate a structured digest without any AI API."""
    if not stories:
        return (
            "<p>No trending AI stories found in the last 24 hours. "
            "Check back tomorrow for your daily digest.</p>"
        )

    heading = f"Here's your daily roundup of the most-discussed AI stories — " \
              f"filtered from Hacker News for what actually matters to solopreneurs and creators."
    html = f"<p>{heading}</p>\n\n"

    # Tool keyword hints for adding relevant mentions
    tool_hints = {
        "chatgpt": "ChatGPT users will want to pay attention here.",
        "openai": "If you use ChatGPT or any OpenAI-powered tool, this is relevant.",
        "claude": "Claude users should take note of this development.",
        "anthropic": "This affects anyone using Claude in their workflows.",
        "gemini": "Google Workspace and Gemini users should follow this closely.",
        "midjourney": "Designers using Midjourney or DALL-E 3 will find this interesting.",
        "stable diffusion": "Image generation with tools like Midjourney or Stable Diffusion is affected.",
        "cursor": "Developers using Cursor, GitHub Copilot or Windsurf should know this.",
        "coding": "AI coding tools like Cursor, GitHub Copilot and Bolt.new are in the spotlight.",
        "seo": "SEO pros using Semrush, Ahrefs or Surfer SEO should take note.",
        "video": "Video creators using Runway or HeyGen will want to follow this.",
        "audio": "Audio and podcast creators using ElevenLabs should take note.",
        "automat": "Automation users on Zapier or Make.com should follow this closely.",
        "notion": "Notion AI and productivity tool users will find this relevant.",
        "writing": "AI writing tools like Grammarly, Jasper AI and Writesonic are relevant here.",
        "design": "Designers using Canva, Figma AI or Adobe Firefly should know about this.",
    }

    for i, story in enumerate(stories[:5], 1):
        title   = story.get("title", "Untitled")
        s_url   = story.get("url") or f"https://news.ycombinator.com/item?id={story.get('objectID','')}"
        hn_url  = f"https://news.ycombinator.com/item?id={story.get('objectID','')}"
        points  = story.get("points", 0)
        comments= story.get("num_comments", 0)

        html += f'<h3>{i}. <a href="{s_url}" target="_blank" rel="noopener">{title}</a></h3>\n'
        html += f'<p><strong>{points} upvotes · {comments} comments on HN.</strong> '

        # Add tool hint based on title keywords
        title_lower = title.lower()
        hint_added = False
        for kw, hint in tool_hints.items():
            if kw in title_lower:
                html += hint + " "
                hint_added = True
                break
        if not hint_added:
            html += "This story is getting significant traction in the AI community. "

        html += f'<a href="{hn_url}" target="_blank" rel="noopener">Discuss on HN →</a></p>\n\n'

    html += "<h3>Bottom Line</h3>\n"
    html += (
        "<p>AI is moving fast, but the tools that save you the most time today are still "
        "the fundamentals: a solid writing assistant like Grammarly or Jasper AI, an image "
        "generator like Midjourney or Canva, and a good automation layer like Zapier or Make.com. "
        "Focus on mastering what you already have before chasing every new release.</p>\n"
    )

    return html


# ── 3. Build complete article HTML page ──────────────────────────────────────
def build_article_html(title, body_html, stories):
    sources_html = ""
    if stories:
        links = []
        for s in stories[:4]:
            hn_url = f"https://news.ycombinator.com/item?id={s.get('objectID','')}"
            snippet = s.get("title", "HN Story")[:70]
            links.append(f'<a href="{hn_url}" target="_blank" rel="noopener">{snippet}</a>')
        sources_html = (
            '<div class="sources-box">'
            '<strong>Sources (Hacker News)</strong>'
            + " &nbsp;·&nbsp; ".join(links) +
            '</div>'
        )

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SZQYFK19QN"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-SZQYFK19QN');</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} — MyAI ToolsFinder</title>
<meta name="description" content="Daily AI tools digest for solopreneurs and creators — {DATE_STR}. Trending stories, practical takeaways and tool recommendations.">
<link rel="canonical" href="https://myaitoolsfinder.com/articles/{SLUG}.html">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%234f46e5'/%3E%3Ccircle cx='10' cy='10' r='4' fill='white'/%3E%3Ccircle cx='22' cy='10' r='4' fill='white' opacity='.55'/%3E%3Ccircle cx='10' cy='22' r='4' fill='white' opacity='.55'/%3E%3Ccircle cx='22' cy='22' r='4' fill='white' opacity='.25'/%3E%3Cpath d='M14 10h4M10 14v4M22 14v4M14 22h4' stroke='white' stroke-width='2.2' stroke-linecap='round'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{{--bg:#f4f7ff;--surface:#fff;--primary:#4f46e5;--primary-2:#3730a3;--primary-light:#e0e7ff;--accent:#d97706;--text:#111827;--text-2:#374151;--text-dim:#6b7280;--border:#dde3f0;--radius:14px;--shadow:0 2px 12px rgba(79,70,229,.07);}}
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0;}}
html{{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;}}
body{{font-family:'Poppins',sans-serif;background:var(--bg);color:var(--text);font-size:15px;line-height:1.65;}}
a{{color:inherit;text-decoration:none;}}
nav{{position:fixed;top:0;left:0;right:0;z-index:50;height:60px;background:rgba(255,255,255,.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 32px;}}
.logo{{display:flex;align-items:center;gap:9px;font-weight:700;font-size:16px;color:var(--text);}}
.logo-mark{{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,var(--primary),var(--primary-2));display:flex;align-items:center;justify-content:center;flex-shrink:0;}}
.nav-links{{display:flex;gap:20px;font-size:13.5px;color:var(--text-2);}}
.nav-links a:hover{{color:var(--primary);}}
.nav-cta{{padding:8px 16px;border-radius:999px;background:var(--primary);color:#fff;font-weight:600;font-size:13px;}}
.post-wrap{{max-width:760px;margin:0 auto;padding:88px 20px 80px;}}
.post-eyebrow{{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--primary);background:var(--primary-light);padding:5px 12px;border-radius:999px;margin-bottom:14px;}}
.post-title{{font-size:clamp(24px,4vw,38px);font-weight:800;letter-spacing:-.025em;line-height:1.1;color:var(--text);margin-bottom:16px;}}
.post-meta{{display:flex;align-items:center;gap:16px;font-size:13px;color:var(--text-dim);flex-wrap:wrap;padding-bottom:24px;border-bottom:1px solid var(--border);}}
.post-body{{margin-top:32px;}}
.post-body h3{{font-size:18px;font-weight:700;color:var(--text);margin:32px 0 10px;letter-spacing:-.01em;}}
.post-body p{{font-size:15px;color:var(--text-2);line-height:1.85;margin-bottom:18px;}}
.post-body ul{{padding-left:22px;margin-bottom:18px;display:flex;flex-direction:column;gap:8px;}}
.post-body ul li{{font-size:14.5px;color:var(--text-2);line-height:1.7;}}
.post-body a{{color:var(--primary);text-decoration:underline;text-underline-offset:3px;}}
.post-body a.aff-link{{color:var(--accent);font-weight:600;text-decoration:none;border-bottom:1.5px dashed rgba(217,119,6,.4);}}
.post-body a.aff-link:hover{{border-bottom-style:solid;}}
.sources-box{{margin-top:40px;padding:18px 22px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);font-size:13px;color:var(--text-dim);}}
.sources-box strong{{display:block;margin-bottom:8px;color:var(--text);font-size:11.5px;text-transform:uppercase;letter-spacing:.1em;font-weight:700;}}
.sources-box a{{color:var(--primary);font-size:12.5px;}}
.back-link{{display:inline-flex;align-items:center;gap:6px;color:var(--primary);font-size:13.5px;font-weight:600;margin-top:40px;padding:10px 18px;border:1px solid var(--border);border-radius:999px;transition:all .15s;}}
.back-link:hover{{background:var(--primary-light);border-color:var(--primary);}}
footer{{background:var(--surface);border-top:1px solid var(--border);padding:32px 20px;text-align:center;font-size:12.5px;color:var(--text-dim);margin-top:60px;}}
footer a{{color:var(--accent);}}
@media(max-width:600px){{nav{{padding:0 16px;}}.nav-links{{display:none;}}}}
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
    MyAI ToolsFinder
  </a>
  <div class="nav-links">
    <a href="../index.html">Directory</a>
    <a href="../articles.html">Articles</a>
    <a href="../about.html">About</a>
  </div>
  <a href="../index.html#newsletter" class="nav-cta">Newsletter</a>
</nav>

<div class="post-wrap">
  <article>
    <div class="post-eyebrow">📰 Daily Digest &nbsp;·&nbsp; AI News</div>
    <h1 class="post-title">{title}</h1>
    <div class="post-meta">
      <span>📅 {DATE_STR}</span>
      <span>⏱ 4 min read</span>
      <span>🔗 Sources: Hacker News</span>
    </div>
    <div class="post-body">
      {body_html}
    </div>
    {sources_html}
    <a href="../articles.html" class="back-link">← Back to all articles</a>
  </article>
</div>

<footer>
  <p>© 2026 MyAI ToolsFinder &nbsp;·&nbsp;
     <a href="../index.html">Directory</a> &nbsp;·&nbsp;
     <a href="../articles.html">Articles</a> &nbsp;·&nbsp;
     <a href="../privacy.html">Privacy Policy</a>
  </p>
  <p style="margin-top:6px;font-size:11px;opacity:.7">
    Some links in this article are affiliate links — we may earn a commission at no extra cost to you.
    <a href="../index.html#disclosure-text">Learn more</a>
  </p>
</footer>

<script src="../js/tools-data.js"></script>
<script src="../js/affiliate.js"></script>
</body>
</html>"""


# ── 4. Inject new article card into articles.html ────────────────────────────
def update_articles_html(title, excerpt):
    if not ARTICLES_HTML.exists():
        print("[WARN] articles.html not found, skipping index update.", file=sys.stderr)
        return

    content = ARTICLES_HTML.read_text(encoding="utf-8")

    # Build the new card HTML
    unsplash_ids = [
        "photo-1677442135703-1787eea5ce01",
        "photo-1620712943543-bcc4688e7485",
        "photo-1667372393119-3d4c48d07fc9",
        "photo-1485827404703-89b55fcc595e",
    ]
    # Pick image based on day of week for variety
    img_id = unsplash_ids[TODAY.weekday() % len(unsplash_ids)]
    img_url = f"https://images.unsplash.com/{img_id}?w=600&q=80&auto=format&fit=crop"

    new_card = f"""
    <a href="articles/{SLUG}.html" class="art-card" data-cat="guide review">
      <div class="art-card-img">
        <img src="{img_url}" alt="{title}" loading="lazy">
        <div class="art-card-overlay"></div>
        <span class="art-card-cat">📰 Daily Digest</span>
        <span class="art-card-read-time">4 min read</span>
      </div>
      <div class="art-card-body">
        <div class="art-card-title">{title}</div>
        <div class="art-card-excerpt">{excerpt}</div>
        <div class="art-card-footer">
          <span class="art-card-date">📅 {TODAY.strftime('%b %Y')}</span>
          <span class="art-card-arrow">Read more →</span>
        </div>
      </div>
    </a>"""

    # Insert before the ARTICLES_INSERT marker, or at the top of the art-grid
    marker = "<!-- ARTICLES_INSERT -->"
    if marker in content:
        content = content.replace(marker, marker + "\n" + new_card)
    else:
        # Fallback: insert after <div class="art-grid" id="art-grid">
        grid_tag = '<div class="art-grid" id="art-grid">'
        if grid_tag in content:
            content = content.replace(grid_tag, grid_tag + "\n" + new_card)
        else:
            print("[WARN] Could not find insertion point in articles.html", file=sys.stderr)
            return

    # Update the article count display
    count_match = re.search(r'id="art-count"[^>]*>(\d+) articles?', content)
    if count_match:
        old_count = int(count_match.group(1))
        content = content.replace(
            count_match.group(0),
            f'id="art-count">{old_count + 1} articles'
        )

    ARTICLES_HTML.write_text(content, encoding="utf-8")
    print(f"[OK] Updated articles.html with new card.")


# ── 5. Main ───────────────────────────────────────────────────────────────────
def main():
    # Skip if today's article already exists
    if OUTPUT_PATH.exists():
        print(f"[INFO] Article already exists: {OUTPUT_PATH.name} — skipping.")
        return

    print(f"[INFO] Generating article for {DATE_STR}...")
    topic = CUSTOM_TOPIC or ""

    # Fetch stories
    stories = fetch_hn_stories(topic)
    print(f"[INFO] Found {len(stories)} trending HN stories.")

    # Article title
    title = f"AI Tools Digest — {DATE_STR}: What's Trending This Week"
    if topic:
        title = f"AI Tools: {topic} — {DATE_STR}"

    # Generate body
    body_html = None
    if ANTHROPIC_API_KEY:
        print("[INFO] ANTHROPIC_API_KEY detected — using Claude to write article...")
        body_html = generate_with_claude(stories, topic)
        if body_html:
            print("[OK] Claude-written article generated.")
    if not body_html:
        print("[INFO] Generating template-based digest...")
        body_html = generate_template_article(stories, topic)

    # Build and save article HTML
    html = build_article_html(title, body_html, stories)
    OUTPUT_PATH.write_text(html, encoding="utf-8")
    print(f"[OK] Article saved: {OUTPUT_PATH}")

    # Extract plain-text excerpt for the articles.html card
    first_p = re.search(r"<p>(.*?)</p>", body_html, re.DOTALL)
    if first_p:
        excerpt = re.sub(r"<[^>]+>", "", first_p.group(1)).strip()[:160] + "…"
    else:
        excerpt = f"Today's AI news digest — trending stories and tool recommendations for {DATE_STR}."

    # Update articles.html index
    update_articles_html(title, excerpt)
    print("[DONE] All steps complete.")


if __name__ == "__main__":
    main()
