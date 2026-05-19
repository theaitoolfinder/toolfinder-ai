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
import random
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
    "Tidio", "Intercom AI", "AdCreative.ai", "NotebookLM", "Groq", "Hugging Face",
    "Apollo.io", "Clay", "CapCut AI", "OpusClip", "Captions AI",
]

# ── Curated tech/AI hero images (Unsplash) ────────────────────────────────────
# Varied, high-quality tech visuals — circuits, keyboards, neural networks, UI
HERO_IMAGES = [
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=85&auto=format&fit=crop",  # AI abstract
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=85&auto=format&fit=crop",  # neural network
    "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=85&auto=format&fit=crop",  # ChatGPT-style chat
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=85&auto=format&fit=crop",  # robot head
    "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=85&auto=format&fit=crop",  # code on screen
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=85&auto=format&fit=crop",  # circuit board
    "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=85&auto=format&fit=crop",  # futuristic data
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=85&auto=format&fit=crop",  # tech workspace
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=85&auto=format&fit=crop",  # globe data
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=85&auto=format&fit=crop",  # matrix code
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=85&auto=format&fit=crop",  # cyber security
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85&auto=format&fit=crop",  # person with tech
    "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=85&auto=format&fit=crop",  # server room
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85&auto=format&fit=crop",  # smartphone AI
]

def pick_hero_image():
    """Pick a unique image based on the date — rotates through the full list."""
    day_of_year = TODAY.timetuple().tm_yday
    return HERO_IMAGES[day_of_year % len(HERO_IMAGES)]


# ── 1. Fetch trending HN stories ──────────────────────────────────────────────
AI_KEYWORDS = [
    "ai", "gpt", "llm", "claude", "gemini", "openai", "anthropic",
    "machine learning", "neural", "model", "agent", "chatgpt", "deepseek",
    "mistral", "midjourney", "stable diffusion", "automation", "copilot",
    "cursor", "bolt", "lovable", "windsurf", "elevenlabs", "suno",
    "runway", "heygen", "perplexity", "robotics", "transformer",
    "generative", "diffusion", "hugging face", "groq", "rag",
    "inference", "fine-tuning", "multimodal", "embedding", "vector",
]

SEARCH_QUERIES = [
    "artificial intelligence AI LLM GPT Claude Gemini",
    "OpenAI Anthropic Google DeepMind AI model",
    "AI tools automation machine learning startup",
    "ChatGPT Claude Gemini update release",
    "AI agent coding writing image generation",
]

def fetch_hn_stories(topic="", min_results=4):
    """
    Fetch top AI stories from HackerNews Algolia API.
    Tries progressively wider time windows and multiple queries to guarantee results.
    """
    queries = [topic] + SEARCH_QUERIES if topic else SEARCH_QUERIES
    time_windows = [36, 72, 168]  # hours: 1.5d → 3d → 7d

    all_stories = {}

    for hours in time_windows:
        since = int((TODAY - timedelta(hours=hours)).timestamp())
        for query in queries[:3]:  # Try first 3 queries per window
            url = (
                f"https://hn.algolia.com/api/v1/search"
                f"?query={requests.utils.quote(query)}"
                f"&tags=story"
                f"&numericFilters=created_at_i>{since},points>3"
                f"&hitsPerPage=30"
                f"&attributesToRetrieve=title,url,author,points,num_comments,created_at,objectID"
            )
            try:
                r = requests.get(url, timeout=15)
                r.raise_for_status()
                hits = r.json().get("hits", [])
            except Exception as e:
                print(f"[WARN] HN fetch failed ({query[:30]}…): {e}", file=sys.stderr)
                continue

            for h in hits:
                title_lower = h.get("title", "").lower()
                if any(kw in title_lower for kw in AI_KEYWORDS):
                    oid = h.get("objectID", "")
                    if oid and oid not in all_stories:
                        all_stories[oid] = h

        if len(all_stories) >= min_results:
            break

    if not all_stories:
        print("[WARN] No HN stories found, using evergreen fallback.", file=sys.stderr)
        return _evergreen_stories()

    results = list(all_stories.values())
    results.sort(key=lambda x: x.get("points", 0), reverse=True)
    top = results[:8]
    print(f"[INFO] Found {len(top)} trending HN stories.", file=sys.stderr)
    return top


def _evergreen_stories():
    """
    Curated evergreen AI stories used when HN returns nothing.
    Always gives us high-quality content to write about.
    """
    return [
        {
            "title": "How AI Agents Are Changing the Way Solopreneurs Work in 2025",
            "url": "https://news.ycombinator.com/",
            "objectID": "evergreen1",
            "points": 150,
            "num_comments": 80,
        },
        {
            "title": "The State of AI Coding Tools: Cursor, Copilot and Windsurf Compared",
            "url": "https://news.ycombinator.com/",
            "objectID": "evergreen2",
            "points": 130,
            "num_comments": 70,
        },
        {
            "title": "Why Claude 3.7 and GPT-4o Are Becoming the Default Business Tools",
            "url": "https://news.ycombinator.com/",
            "objectID": "evergreen3",
            "points": 120,
            "num_comments": 60,
        },
        {
            "title": "AI Image and Video Tools: What's Actually Worth Paying For",
            "url": "https://news.ycombinator.com/",
            "objectID": "evergreen4",
            "points": 110,
            "num_comments": 55,
        },
        {
            "title": "How to Automate Your Workflow with AI in Under an Hour",
            "url": "https://news.ycombinator.com/",
            "objectID": "evergreen5",
            "points": 100,
            "num_comments": 50,
        },
    ]


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
    )

    tools_sample = ", ".join(TOOLS_LIST[:18])
    focus = f"Focus especially on: {topic}." if topic else ""

    prompt = textwrap.dedent(f"""
        You are a writer for MyAI ToolsFinder — an AI tools directory for solopreneurs, freelancers and creators.
        Your readers are practical people who use AI tools daily to save time and grow their businesses.

        Write a ~650-word daily AI news digest article titled:
        "AI Tools Digest — {DATE_STR}: What's Trending This Week"

        {focus}

        Base the article on these real trending Hacker News stories (or the latest AI industry trends if the stories are evergreen):
        {headlines}

        REQUIREMENTS:
        - Tone: conversational, honest, practical — never hype-y or click-bait
        - Structure: engaging intro (2-3 sentences) → 3-4 story sections with h3 headings → "Bottom Line" section
        - Each section: summarise the topic in 2-3 sentences, then give ONE practical takeaway for the reader
        - Naturally mention 3-5 AI tools from this list where genuinely relevant: {tools_sample}
          (Only include tool mentions where they add real value — do NOT force them)
        - NO markdown, write clean HTML using only: <p>, <h3>, <ul>, <li>, <strong>, <em>
        - Do NOT include h1, h2, html, head, body, or any structural tags
        - Do NOT make up facts — ground everything in real AI industry trends
        - End with a "Bottom Line" section (<h3>Bottom Line</h3>) with one clear, actionable takeaway

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
    """Generate a structured digest without any AI API. Always produces good content."""

    heading = (
        f"Here's your daily roundup of the most-discussed AI stories — "
        f"filtered for what actually matters to solopreneurs, creators and founders."
    )
    html = f"<p><strong>AI is moving fast.</strong> {heading}</p>\n\n"

    # Tool keyword hints for adding relevant mentions
    tool_hints = {
        "chatgpt": "ChatGPT users will want to pay close attention to this.",
        "openai": "If you use ChatGPT or any OpenAI-powered tool, this directly affects you.",
        "claude": "Claude users should take note of this development.",
        "anthropic": "This affects anyone using Claude in their workflows.",
        "gemini": "Google Workspace and Gemini users should follow this closely.",
        "midjourney": "Designers using Midjourney or DALL-E 3 will find this interesting.",
        "stable diffusion": "Image generation tools like Midjourney and Stable Diffusion are in focus.",
        "cursor": "Developers using Cursor, GitHub Copilot or Windsurf should know this.",
        "codi": "AI coding tools like Cursor, GitHub Copilot and Bolt.new are highlighted here.",
        "seo": "SEO professionals using Semrush, Ahrefs or Surfer SEO should take note.",
        "video": "Video creators using Runway or HeyGen will want to follow this.",
        "audio": "Audio and podcast creators using ElevenLabs should pay attention.",
        "automat": "Automation users on Zapier or Make.com should follow this closely.",
        "notion": "Notion AI and productivity tool users will find this relevant.",
        "writing": "AI writing tools like Grammarly, Jasper AI and Writesonic are relevant here.",
        "design": "Designers using Canva, Figma AI or Adobe Firefly should know about this.",
        "solopreneur": "This is highly relevant for solopreneurs and freelancers using AI.",
        "agent": "AI agent users — anyone on n8n, Zapier or AutoGPT — should read this.",
    }

    practical_takeaways = [
        "The practical takeaway: experiment with one new AI tool this week and measure the time saved.",
        "For you: spend 30 minutes testing this in your own workflow before committing.",
        "What this means: your current AI stack may need a small update to stay competitive.",
        "Action item: check if your existing tools have already rolled out this capability — many have.",
        "The bottom line for creators: the barrier to entry keeps falling. Use that to your advantage.",
    ]

    for i, story in enumerate(stories[:5], 1):
        title   = story.get("title", "Untitled")
        s_url   = story.get("url") or f"https://news.ycombinator.com/item?id={story.get('objectID','')}"
        hn_url  = f"https://news.ycombinator.com/item?id={story.get('objectID','')}"
        points  = story.get("points", 0)
        comments= story.get("num_comments", 0)

        html += f'<h3>{i}. {title}</h3>\n'
        html += f'<p>'

        if s_url and not s_url.endswith("news.ycombinator.com/"):
            html += f'<a href="{s_url}" target="_blank" rel="noopener"><strong>Read the full story →</strong></a> '

        # Add tool hint based on title keywords
        title_lower = title.lower()
        hint_added = False
        for kw, hint in tool_hints.items():
            if kw in title_lower:
                html += hint + " "
                hint_added = True
                break
        if not hint_added:
            html += "This story is gaining significant traction across the AI community. "

        if points > 5:
            html += f'<strong>{points} upvotes · {comments} comments</strong> on Hacker News. '

        takeaway = practical_takeaways[i % len(practical_takeaways)]
        html += takeaway

        html += f'</p>\n\n'

    html += "<h3>Bottom Line</h3>\n"
    html += (
        "<p>AI is accelerating, but the tools that deliver the most value haven't changed: "
        "a great writing assistant like <strong>Grammarly</strong> or <strong>Jasper AI</strong>, "
        "an image generator like <strong>Midjourney</strong> or <strong>Canva</strong>, "
        "and a smart automation layer like <strong>Zapier</strong> or <strong>Make.com</strong>. "
        "Master your current stack first — then layer in what's new. "
        "That's how you stay ahead without burning out on every new release.</p>\n"
    )

    return html


# ── 3. Build complete article HTML page ──────────────────────────────────────
def build_article_html(title, body_html, stories, hero_img_url):
    sources_html = ""
    if stories:
        links = []
        for s in stories[:4]:
            s_url = s.get("url") or f"https://news.ycombinator.com/item?id={s.get('objectID','')}"
            hn_url = f"https://news.ycombinator.com/item?id={s.get('objectID','')}"
            snippet = s.get("title", "HN Story")[:65]
            links.append(f'<a href="{hn_url}" target="_blank" rel="noopener">{snippet}</a>')
        sources_html = (
            '<div class="sources-box">'
            '<strong>Sources</strong> '
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
<meta property="og:title" content="{title}">
<meta property="og:description" content="Daily AI tools digest — {DATE_STR}. Trending AI stories and practical takeaways for creators and solopreneurs.">
<meta property="og:image" content="{hero_img_url}">
<meta property="og:type" content="article">
<link rel="canonical" href="https://myaitoolsfinder.com/articles/{SLUG}.html">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%231a56db'/%3E%3Ccircle cx='10' cy='10' r='4' fill='white'/%3E%3Ccircle cx='22' cy='10' r='4' fill='white' opacity='.55'/%3E%3Ccircle cx='10' cy='22' r='4' fill='white' opacity='.55'/%3E%3Ccircle cx='22' cy='22' r='4' fill='white' opacity='.25'/%3E%3Cpath d='M14 10h4M10 14v4M22 14v4M14 22h4' stroke='white' stroke-width='2.2' stroke-linecap='round'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{{--bg:#f0f6ff;--surface:#fff;--primary:#1a56db;--primary-2:#1e3a8a;--primary-light:#dbeafe;--accent:#d97706;--text:#0d1f3c;--text-2:#1e3a5f;--text-dim:#5c7799;--border:#c9d9f5;--border-soft:#dce9ff;--radius:14px;--shadow:0 2px 12px rgba(26,86,219,.07);}}
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
.post-wrap{{max-width:760px;margin:0 auto;padding:88px 20px 80px;}}
.hero-img{{width:100%;height:280px;object-fit:cover;border-radius:16px;margin-bottom:24px;box-shadow:0 8px 28px rgba(26,86,219,.12);}}
.post-eyebrow{{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--primary);background:var(--primary-light);padding:5px 12px;border-radius:999px;margin-bottom:14px;}}
.post-title{{font-size:clamp(24px,4vw,36px);font-weight:800;letter-spacing:-.025em;line-height:1.1;color:var(--text);margin-bottom:16px;}}
.post-meta{{display:flex;align-items:center;gap:14px;font-size:13px;color:var(--text-dim);flex-wrap:wrap;padding-bottom:24px;border-bottom:1px solid var(--border-soft);}}
.post-meta svg{{opacity:.6;}}
.post-body{{margin-top:32px;}}
.post-body h3{{font-size:18px;font-weight:700;color:var(--text);margin:32px 0 10px;letter-spacing:-.01em;}}
.post-body p{{font-size:15px;color:var(--text-2);line-height:1.85;margin-bottom:18px;}}
.post-body ul{{padding-left:22px;margin-bottom:18px;display:flex;flex-direction:column;gap:8px;}}
.post-body ul li{{font-size:14.5px;color:var(--text-2);line-height:1.7;}}
.post-body a{{color:var(--primary);text-decoration:underline;text-underline-offset:3px;}}
.post-body strong{{color:var(--text);}}
.sources-box{{margin-top:40px;padding:18px 22px;background:var(--surface);border:1px solid var(--border-soft);border-radius:var(--radius);font-size:13px;color:var(--text-dim);}}
.sources-box strong{{display:block;margin-bottom:8px;color:var(--text);font-size:11.5px;text-transform:uppercase;letter-spacing:.1em;font-weight:700;}}
.sources-box a{{color:var(--primary);font-size:12.5px;}}
.back-link{{display:inline-flex;align-items:center;gap:6px;color:var(--primary);font-size:13.5px;font-weight:600;margin-top:40px;padding:10px 18px;border:1.5px solid var(--border);border-radius:999px;transition:all .15s;}}
.back-link:hover{{background:var(--primary-light);border-color:var(--primary);}}
.share-row{{display:flex;gap:8px;flex-wrap:wrap;margin-top:28px;padding-top:20px;border-top:1px solid var(--border-soft);}}
.share-btn{{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;border:1.5px solid var(--border);font-size:12.5px;font-weight:600;color:var(--text-2);cursor:pointer;text-decoration:none;transition:all .15s;}}
.share-btn:hover{{border-color:var(--primary);color:var(--primary);background:var(--primary-light);}}
footer{{background:var(--surface);border-top:1px solid var(--border-soft);padding:32px 20px;text-align:center;font-size:12.5px;color:var(--text-dim);margin-top:60px;}}
footer a{{color:var(--primary);}}
@media(max-width:600px){{nav{{padding:0 16px;}}.nav-links{{display:none;}}.hero-img{{height:180px;}}}}
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
    <img src="{hero_img_url}" alt="AI technology concept" class="hero-img" loading="eager">
    <div class="post-eyebrow">Daily Digest &nbsp;·&nbsp; AI News</div>
    <h1 class="post-title">{title}</h1>
    <div class="post-meta">
      <span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:3px"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        {DATE_STR}
      </span>
      <span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:3px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        4 min read
      </span>
      <span>MyAI ToolsFinder</span>
    </div>
    <div class="post-body">
      {body_html}
    </div>
    {sources_html}
    <div class="share-row">
      <a href="https://twitter.com/intent/tweet?text={requests.utils.quote(title)}&url=https://myaitoolsfinder.com/articles/{SLUG}.html" target="_blank" rel="noopener nofollow" class="share-btn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.845L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        Share on X
      </a>
      <a href="../articles.html" class="share-btn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        All Articles
      </a>
      <a href="../index.html" class="share-btn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
        Browse AI Tools
      </a>
    </div>
  </article>
</div>

<footer>
  <p>© 2026 MyAI ToolsFinder &nbsp;·&nbsp;
     <a href="../index.html">Directory</a> &nbsp;·&nbsp;
     <a href="../articles.html">Articles</a> &nbsp;·&nbsp;
     <a href="../privacy.html">Privacy Policy</a>
  </p>
  <p style="margin-top:6px;font-size:11px;opacity:.7">
    Some links in this article may be affiliate links — we may earn a small commission at no extra cost to you.
  </p>
</footer>

<script src="../js/tools-data.js"></script>
<script src="../js/affiliate.js"></script>
</body>
</html>"""


# ── 4. Inject new article card into articles.html ────────────────────────────
def update_articles_html(title, excerpt, hero_img_url):
    if not ARTICLES_HTML.exists():
        print("[WARN] articles.html not found, skipping index update.", file=sys.stderr)
        return

    content = ARTICLES_HTML.read_text(encoding="utf-8")

    new_card = f"""
    <a href="articles/{SLUG}.html" class="art-card" data-cat="guide review">
      <div class="art-card-img">
        <img src="{hero_img_url}" alt="{title}" loading="lazy">
        <div class="art-card-overlay"></div>
        <span class="art-card-cat">Daily Digest</span>
        <span class="art-card-read-time">4 min read</span>
      </div>
      <div class="art-card-body">
        <div class="art-card-title">{title}</div>
        <div class="art-card-excerpt">{excerpt}</div>
        <div class="art-card-footer">
          <span class="art-card-date">{TODAY.strftime('%b %d, %Y')}</span>
          <span class="art-card-arrow">Read more →</span>
        </div>
      </div>
    </a>"""

    # Insert before the ARTICLES_INSERT marker, or at the top of the art-grid
    marker = "<!-- ARTICLES_INSERT -->"
    if marker in content:
        content = content.replace(marker, marker + "\n" + new_card)
    else:
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

    # Pick hero image
    hero_img_url = pick_hero_image()
    print(f"[INFO] Using hero image: {hero_img_url[:60]}...")

    # Fetch stories — guaranteed to return something
    stories = fetch_hn_stories(topic, min_results=4)
    print(f"[INFO] Using {len(stories)} stories for article.")

    # Article title
    title = f"AI Tools Digest — {DATE_STR}: What's Trending This Week"
    if topic:
        title = f"AI Spotlight: {topic} — {DATE_STR}"

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
    html = build_article_html(title, body_html, stories, hero_img_url)
    OUTPUT_PATH.write_text(html, encoding="utf-8")
    print(f"[OK] Article saved: {OUTPUT_PATH}")

    # Extract plain-text excerpt for the articles.html card
    first_p = re.search(r"<p>(.*?)</p>", body_html, re.DOTALL)
    if first_p:
        excerpt = re.sub(r"<[^>]+>", "", first_p.group(1)).strip()[:160] + "…"
    else:
        excerpt = f"Today's AI news digest — trending stories and tool recommendations for {DATE_STR}."

    # Update articles.html index
    update_articles_html(title, excerpt, hero_img_url)
    print("[DONE] All steps complete.")


if __name__ == "__main__":
    main()
