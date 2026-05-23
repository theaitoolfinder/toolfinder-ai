#!/usr/bin/env python3
"""
generate_article.py — MyAI ToolsFinder Automated Article Generator
═══════════════════════════════════════════════════════════════════
Schedule (Philippine Time, PHT = UTC+8):
  Mon–Thu  12:00  Lunch article   → comparison / tutorial / roundup
  Mon–Thu  18:00  Dinner article  → news digest / roundup / comparison
  Friday   ×5     Exclusive articles → deep dive / workflow / strategy

Sources rotated to avoid repetition:
  hackernews  · reddit  · devto  · venturebeat  · verge  · techcrunch

Article types rotated (tracked in article_log.json, 14-day dedup window):
  comparison · roundup · tutorial · news_digest · deep_dive · workflow · strategy

SETUP:
  No required setup — works without an API key (template fallback).
  Add ANTHROPIC_API_KEY to GitHub Actions secrets for Claude-written articles.
"""

import os, re, sys, json, random, textwrap, requests
from datetime import datetime, timezone, timedelta
from pathlib import Path
from xml.etree import ElementTree as ET

# ── Paths ──────────────────────────────────────────────────────────────────────
ROOT          = Path(__file__).resolve().parent.parent.parent
ARTICLES_DIR  = ROOT / "articles"
ARTICLES_HTML = ROOT / "articles.html"
LOG_PATH      = Path(__file__).resolve().parent / "article_log.json"
ARTICLES_DIR.mkdir(exist_ok=True)

# ── Runtime ────────────────────────────────────────────────────────────────────
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "").strip()
SLOT_OVERRIDE     = os.environ.get("ARTICLE_SLOT", "").strip().lower()
NOW               = datetime.now(timezone.utc)
DATE_SLUG         = NOW.strftime("%Y-%m-%d")
DATE_STR          = NOW.strftime("%B %d, %Y")
YEAR              = NOW.strftime("%Y")

# ── Determine slot from time + weekday ────────────────────────────────────────
def determine_slot():
    if SLOT_OVERRIDE in ("lunch", "dinner", "exclusive"):
        return SLOT_OVERRIDE
    if NOW.weekday() == 4:      # Friday
        return "exclusive"
    return "lunch" if NOW.hour < 7 else "dinner"

SLOT = determine_slot()

# ── AI tools list (for natural in-text mentions) ──────────────────────────────
TOOLS = [
    "ChatGPT","Claude","Gemini","Perplexity AI","DeepSeek","Microsoft Copilot","Grok",
    "Grammarly","Jasper AI","Writesonic","Copy.ai","QuillBot","DeepL","Wordtune",
    "Sudowrite","ProWritingAid","Hemingway Editor","Hyperwrite",
    "Midjourney","Adobe Firefly","Leonardo.ai","DALL-E 3","Ideogram","Canva","Figma AI",
    "Runway","HeyGen","Synthesia","Descript","Veed.io","CapCut AI","OpusClip","Captions AI",
    "ElevenLabs","Murf AI","Suno","Adobe Podcast","Otter.ai",
    "Surfer SEO","Ahrefs","Semrush","RankMath AI",
    "Cursor","GitHub Copilot","Bolt.new","Windsurf","Lovable","v0 by Vercel","Replit AI",
    "Notion AI","Granola","Motion","Fireflies.ai","Zapier","Make.com","n8n",
    "Gamma","Beautiful.ai","HubSpot AI","Beehiiv","Instantly AI","Apollo.io","Clay",
    "Tidio","Intercom AI","AdCreative.ai","NotebookLM","Groq","Hugging Face",
]

# ── Hero images — 20 varied tech/AI visuals ───────────────────────────────────
HERO_IMAGES = [
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=85&auto=format&fit=crop",   # AI abstract blue
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=85&auto=format&fit=crop",   # neural network
    "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=85&auto=format&fit=crop",   # chat interface
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=85&auto=format&fit=crop",   # robot head
    "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=85&auto=format&fit=crop",      # code on screen
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=85&auto=format&fit=crop",   # circuit board
    "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=85&auto=format&fit=crop",   # futuristic data
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=85&auto=format&fit=crop",   # tech workspace
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=85&auto=format&fit=crop",   # globe / data
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=85&auto=format&fit=crop",   # matrix code
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=85&auto=format&fit=crop",      # cybersecurity
    "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=85&auto=format&fit=crop",   # server room
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85&auto=format&fit=crop",   # smartphone AI
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85&auto=format&fit=crop",   # person + tech
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=85&auto=format&fit=crop",      # dark keyboard
    "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&q=85&auto=format&fit=crop",   # abstract purple
    "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=800&q=85&auto=format&fit=crop",   # AI chip
    "https://images.unsplash.com/photo-1655720831417-c7f2c4e9a028?w=800&q=85&auto=format&fit=crop",   # data flow
    "https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=800&q=85&auto=format&fit=crop",   # neon AI art
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=85&auto=format&fit=crop",   # laptop + coffee
]

def pick_hero(index_offset=0):
    """Rotate hero images by day-of-year + slot offset — never the same image twice in a row."""
    day_num     = NOW.timetuple().tm_yday + index_offset
    slot_offset = {"lunch": 0, "dinner": 7, "exclusive": 13}.get(SLOT, 0)
    return HERO_IMAGES[(day_num + slot_offset) % len(HERO_IMAGES)]

# ── Article type definitions ───────────────────────────────────────────────────
ARTICLE_TYPES = {
    "comparison": {
        "label": "Comparison", "cat": "comparison review", "read_time": "8 min",
        "prompt": """Write a ~700-word AI tools COMPARISON article.
Structure:
- Engaging intro (why this comparison matters right now, 2–3 sentences)
- For each tool: <h3> tool name → key strengths, pricing, ideal user (3–4 sentences)
- Head-to-head verdict: one clear winner per use case
- Final recommendation: who should pick which tool
Use <h3> for tool/section headings, <p> for paragraphs, <ul><li> for lists.
Pick 2–3 real AI tools to compare — choose from the provided context or our tools list.""",
    },
    "roundup": {
        "label": "Guide", "cat": "guide review", "read_time": "7 min",
        "prompt": """Write a ~650-word AI tools BEST-OF ROUNDUP.
Structure:
- Intro: who this is for and how we selected these tools (2–3 sentences)
- 5–7 tools, each as <h3> tool name → one-line description, key feature, pricing, best for
- Editor's Pick: one clear top recommendation with a reason
- Closing: the single next action the reader should take
Use <h3> for tool names, <p> for body text, <ul><li> for feature lists.""",
    },
    "tutorial": {
        "label": "Tutorial", "cat": "guide tutorial", "read_time": "6 min",
        "prompt": """Write a ~600-word practical HOW-TO TUTORIAL.
Structure:
- Problem hook: state the pain in 1–2 sentences
- Step-by-step: 4–6 numbered <h3> steps, each specific and actionable
- Recommended tools for each step (from our list)
- Quick wins: 3 things the reader can do TODAY (<ul>)
- Closing: the #1 first action to take
Keep every step concrete — no vague advice.""",
    },
    "news_digest": {
        "label": "Daily Digest", "cat": "review guide", "read_time": "4 min",
        "prompt": """Write a ~550-word AI NEWS DIGEST based on the trending stories provided.
Structure:
- Opening hook: 1–2 punchy sentences on why right now matters for AI
- 3–4 story sections: <h3> headline → 2-sentence summary → 1 practical takeaway for the reader
- "Bottom Line" section: one clear action this week
Tone: conversational, direct, zero fluff — these are busy professionals.""",
    },
    "deep_dive": {
        "label": "Deep Dive", "cat": "guide deep-dive", "read_time": "12 min",
        "prompt": """Write a ~900-word EXCLUSIVE IN-DEPTH GUIDE (premium subscriber content).
Structure:
- Strong problem/opportunity intro (3–4 sentences — make the reader feel the stakes)
- 4–5 detailed sections with <h3> headings, real examples, specific tools, and hard numbers
- Include actual estimates: time saved, cost difference, ROI where relevant
- Implementation checklist: 5 specific, sequential action items (<ul>)
- Closing: first, second, third thing to do — no vague "get started" advice
This is premium content: go significantly deeper than a standard article. Be specific and practical.""",
    },
    "workflow": {
        "label": "Workflow", "cat": "guide workflow", "read_time": "10 min",
        "prompt": """Write a ~800-word EXCLUSIVE WORKFLOW GUIDE (premium subscriber content).
Structure:
- Intro: paint the before/after picture — what this workflow changes
- 5–7 workflow steps as <h3> headings, each with: specific tool, how to use it, time estimate
- Exact prompt templates in <em> tags for key AI tools (at least 3 prompts)
- Common mistakes section: 3 mistakes people make and how to avoid them
- Getting started: first 3 actions, each taking <10 minutes
This is premium content: include copy-pasteable prompts and real workflow detail.""",
    },
    "strategy": {
        "label": "Strategy", "cat": "guide strategy", "read_time": "10 min",
        "prompt": """Write a ~850-word EXCLUSIVE STRATEGIC GUIDE (premium subscriber content).
Structure:
- Market context: what has changed and why it matters NOW (not general AI talk)
- Core insight: the key strategy in 3–4 main <h3> sections
- Implementation: step-by-step with specific tools and pricing
- 30-day action plan: week 1, week 2, week 3, week 4 (<ul>)
- Pitfalls: 3 common mistakes that kill results
This is premium content: give real strategic depth, not surface-level advice.""",
    },
}

# Slot → preferred type order
SLOT_TYPE_PREFS = {
    "lunch":     ["comparison", "tutorial", "roundup", "workflow"],
    "dinner":    ["news_digest", "comparison", "roundup", "tutorial"],
    "exclusive": ["deep_dive", "workflow", "strategy", "comparison", "roundup", "tutorial"],
}

# Title bank for non-news types (avoids needing Claude just for the title)
TITLE_BANK = {
    "comparison": [
        ("ChatGPT", "Claude"),
        ("Cursor", "GitHub Copilot"),
        ("Midjourney", "DALL-E 3"),
        ("Jasper AI", "Copy.ai"),
        ("Grammarly", "ProWritingAid"),
        ("Zapier", "Make.com"),
        ("ElevenLabs", "Murf AI"),
        ("Surfer SEO", "Ahrefs"),
        ("HeyGen", "Synthesia"),
        ("Notion AI", "Granola"),
        ("Writesonic", "Wordtune"),
        ("Perplexity AI", "ChatGPT"),
        ("Claude", "Gemini"),
        ("Bolt.new", "Lovable"),
        ("DeepSeek", "ChatGPT"),
    ],
    "roundup": [
        ("AI Tools", "Solopreneurs"),
        ("Free AI Tools", "Anyone"),
        ("AI Coding Tools", "Developers"),
        ("AI Writing Tools", "Content Creators"),
        ("AI Tools", "Students"),
        ("AI Image Generators", "Designers"),
        ("AI Video Tools", "Creators"),
        ("AI Productivity Tools", "Remote Workers"),
        ("AI Marketing Tools", "Marketers"),
        ("AI SEO Tools", "Bloggers"),
        ("AI Automation Tools", "Freelancers"),
        ("AI Tools", "Founders"),
    ],
    "tutorial": [
        "Build a Content Calendar with AI in Under an Hour",
        "Automate Your Email Outreach with AI Tools",
        "Create Professional Videos with AI — No Camera Needed",
        "Write SEO Articles 10× Faster Using AI",
        "Set Up AI Customer Support for Your Business",
        "Build a Newsletter with AI Tools [Zero to First 1,000 Subs]",
        "Generate Qualified Leads Using AI in 30 Minutes a Day",
        "Repurpose One Blog Post Into 10 Pieces of Content with AI",
        "Use AI to Research Competitors in 20 Minutes",
        "Build Your First AI Automation Without Coding",
    ],
    "deep_dive": [
        f"The Complete {YEAR} AI Stack for Solopreneurs: 12 Tools, Zero Fluff",
        f"How to Replace a $5,000/mo Agency with 6 AI Tools in {YEAR}",
        "ChatGPT Prompting Secrets: 20 Power Prompts for Content Creators",
        "The AI Automation Playbook: How to Save 15+ Hours a Week",
        f"Hidden AI Features Most Users Miss — and How to Use Them in {YEAR}",
        "The Real Cost of AI Tools: What You Should Actually Be Paying",
        "How Top 1% Creators Use AI: Inside Their Actual Workflows",
    ],
    "workflow": [
        f"The 5-Tool AI Workflow That's Replacing Marketing Teams in {YEAR}",
        "From Brief to Published: The AI Content Workflow That Takes 45 Minutes",
        f"The Complete Freelancer AI Workflow: Save 20 Hours a Week",
        "Morning AI Routine: The 30-Minute Setup That Powers Your Whole Day",
        "How to Produce a Week of Content in One Afternoon Using AI",
        "The AI Sales Workflow: From Lead to Close in Half the Time",
    ],
    "strategy": [
        f"From $10K to $100K/mo: The AI Business Strategy That Works in {YEAR}",
        f"Why Most People Use AI Wrong — and the Right Strategy for {YEAR}",
        "The Unfair Advantage: How AI Lets One Person Do the Work of Five",
        f"The Creator Economy AI Playbook for {YEAR}: Build Once, Earn Forever",
        "How to Position Your Business for the AI-First Era",
    ],
}

def build_title(article_type, log):
    """Build a title that hasn't been used in the last 30 articles."""
    recent_titles = {e.get("title", "") for e in log.get("generated", [])[-30:]}

    if article_type == "news_digest":
        slot_label = "Lunch Edition" if SLOT == "lunch" else "Evening Edition"
        return f"AI Tools Digest — {DATE_STR} ({slot_label})"

    if article_type == "comparison":
        pairs = [p for p in TITLE_BANK["comparison"]
                 if f"{p[0]} vs {p[1]}" not in " ".join(recent_titles)]
        if not pairs:
            pairs = TITLE_BANK["comparison"]
        a, b = random.choice(pairs)
        return f"{a} vs {b}: The Honest {YEAR} Verdict"

    if article_type == "roundup":
        options = [o for o in TITLE_BANK["roundup"]
                   if o[0] not in " ".join(recent_titles)]
        if not options:
            options = TITLE_BANK["roundup"]
        cat, aud = random.choice(options)
        n = random.choice([7, 8, 9, 10, 12])
        return f"{n} Best {cat} for {aud} in {YEAR} — Ranked"

    if article_type == "tutorial":
        opts = [t for t in TITLE_BANK["tutorial"] if t not in recent_titles]
        if not opts:
            opts = TITLE_BANK["tutorial"]
        return random.choice(opts)

    bank = TITLE_BANK.get(article_type, [])
    opts = [t for t in bank if t not in recent_titles]
    if not opts:
        opts = bank if bank else [f"The Ultimate AI Guide — {DATE_STR}"]
    return random.choice(opts)


# ── Log management ─────────────────────────────────────────────────────────────
def load_log():
    if LOG_PATH.exists():
        try:
            return json.loads(LOG_PATH.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {"generated": []}

def save_log(log, entry):
    log.setdefault("generated", []).append(entry)
    log["generated"] = log["generated"][-60:]    # keep last 60
    LOG_PATH.write_text(json.dumps(log, indent=2, ensure_ascii=False), encoding="utf-8")

def recent_values(log, key, n=6):
    return [e[key] for e in log.get("generated", [])[-n:] if key in e]

# ── Pick article type ──────────────────────────────────────────────────────────
def pick_article_type(log):
    recent = recent_values(log, "type", 4)
    for t in SLOT_TYPE_PREFS[SLOT]:
        if t not in recent:
            return t
    return SLOT_TYPE_PREFS[SLOT][0]

# ── Pick source ────────────────────────────────────────────────────────────────
ALL_SOURCES = ["hackernews", "reddit", "devto", "venturebeat", "verge", "techcrunch"]

def pick_source(log):
    recent = recent_values(log, "source", 3)
    available = [s for s in ALL_SOURCES if s not in recent]
    return random.choice(available if available else ALL_SOURCES)

# ── Slug ───────────────────────────────────────────────────────────────────────
def get_slug(log):
    if SLOT == "exclusive":
        today_excl = [e for e in log.get("generated", [])
                      if e.get("date") == DATE_SLUG and e.get("slot") == "exclusive"]
        n = len(today_excl) + 1
        return f"exclusive-{DATE_SLUG}-{n}"
    suffix = "am" if SLOT == "lunch" else "pm"
    return f"article-{DATE_SLUG}-{suffix}"


# ══════════════════════════════════════════════════════════════════════════════
# SOURCE FETCHERS
# ══════════════════════════════════════════════════════════════════════════════

HDR = {"User-Agent": "Mozilla/5.0 (compatible; MyAIToolsFinder/2.0)"}

AI_KW = [
    "ai","gpt","llm","claude","gemini","openai","anthropic","machine learning",
    "neural","model","agent","chatgpt","deepseek","mistral","midjourney",
    "stable diffusion","automation","copilot","cursor","bolt","lovable","windsurf",
    "elevenlabs","suno","runway","heygen","perplexity","groq","generative",
    "diffusion","hugging face","rag","inference","multimodal","chatbot","nvidia",
]

def is_ai_story(title):
    tl = title.lower()
    return any(k in tl for k in AI_KW)

def fetch_hackernews(n=7):
    stories, seen = [], set()
    queries = [
        "AI tools LLM GPT Claude Gemini automation",
        "OpenAI Anthropic Google DeepMind AI model release",
        "AI startup tools solopreneur productivity workflow",
    ]
    since = int((NOW - timedelta(hours=48)).timestamp())
    for q in queries[:2]:
        try:
            url = (f"https://hn.algolia.com/api/v1/search"
                   f"?query={requests.utils.quote(q)}"
                   f"&tags=story&numericFilters=created_at_i>{since},points>3"
                   f"&hitsPerPage=25")
            hits = requests.get(url, timeout=12).json().get("hits", [])
            for h in hits:
                oid = h.get("objectID", "")
                if oid and oid not in seen and is_ai_story(h.get("title", "")):
                    seen.add(oid)
                    stories.append({
                        "title": h["title"],
                        "url": h.get("url", f"https://news.ycombinator.com/item?id={oid}"),
                        "points": h.get("points", 0),
                        "comments": h.get("num_comments", 0),
                        "source_label": "Hacker News",
                    })
        except Exception as e:
            print(f"[WARN] HN: {e}", file=sys.stderr)
    stories.sort(key=lambda x: x["points"], reverse=True)
    print(f"[INFO] HN: {len(stories[:n])} stories", file=sys.stderr)
    return stories[:n]

def fetch_reddit(n=7):
    stories = []
    subs = ["artificial", "MachineLearning", "ChatGPT", "singularity"]
    for sub in subs[:3]:
        try:
            url = f"https://www.reddit.com/r/{sub}/hot.json?limit=20&t=week"
            posts = requests.get(url, headers=HDR, timeout=12).json()
            for item in posts.get("data", {}).get("children", []):
                p = item.get("data", {})
                if p.get("stickied") or not is_ai_story(p.get("title", "")):
                    continue
                stories.append({
                    "title": p.get("title", ""),
                    "url": p.get("url") or f"https://reddit.com{p.get('permalink','')}",
                    "points": p.get("score", 0),
                    "comments": p.get("num_comments", 0),
                    "source_label": f"r/{sub}",
                })
        except Exception as e:
            print(f"[WARN] Reddit r/{sub}: {e}", file=sys.stderr)
    stories.sort(key=lambda x: x["points"], reverse=True)
    print(f"[INFO] Reddit: {len(stories[:n])} posts", file=sys.stderr)
    return stories[:n]

def fetch_devto(n=7):
    stories = []
    tags = ["ai", "artificialintelligence", "machinelearning", "chatgpt"]
    for tag in tags[:3]:
        try:
            url = f"https://dev.to/api/articles?tag={tag}&per_page=8&top=1"
            items = requests.get(url, headers=HDR, timeout=12).json()
            for item in items:
                t = item.get("title", "")
                if is_ai_story(t) or tag in ("ai", "chatgpt"):
                    stories.append({
                        "title": t,
                        "url": item.get("url", ""),
                        "points": item.get("positive_reactions_count", 0),
                        "comments": item.get("comments_count", 0),
                        "excerpt": re.sub(r"<[^>]+>", "", item.get("description") or "")[:200],
                        "source_label": "DEV.to",
                    })
        except Exception as e:
            print(f"[WARN] DEV.to {tag}: {e}", file=sys.stderr)
    stories.sort(key=lambda x: x["points"], reverse=True)
    print(f"[INFO] DEV.to: {len(stories[:n])} articles", file=sys.stderr)
    return stories[:n]

RSS_FEEDS = {
    "venturebeat": ("https://feeds.feedburner.com/venturebeat/SZYF",         "VentureBeat"),
    "verge":       ("https://www.theverge.com/ai-artificial-intelligence/rss/index.xml", "The Verge"),
    "techcrunch":  ("https://techcrunch.com/category/artificial-intelligence/feed/", "TechCrunch"),
}

def fetch_rss(source_key, n=7):
    feed_url, label = RSS_FEEDS[source_key]
    stories = []
    try:
        r = requests.get(feed_url, headers=HDR, timeout=15)
        r.raise_for_status()
        root = ET.fromstring(r.content)
        for item in root.findall(".//item")[:20]:
            title_el = item.find("title")
            link_el  = item.find("link")
            desc_el  = item.find("description")
            if not (title_el is not None and link_el is not None):
                continue
            title = re.sub(r"<[^>]+>", "", (title_el.text or "")).strip()
            link  = (link_el.text or "").strip()
            desc  = re.sub(r"<[^>]+>|\s+", " ", (desc_el.text or "")).strip()[:200] if desc_el is not None else ""
            if not title or not link:
                continue
            stories.append({
                "title": title,
                "url": link,
                "points": 60,
                "comments": 0,
                "excerpt": desc,
                "source_label": label,
            })
    except Exception as e:
        print(f"[WARN] RSS {label}: {e}", file=sys.stderr)
    print(f"[INFO] RSS {label}: {len(stories[:n])} items", file=sys.stderr)
    return stories[:n]

def fetch_stories(source_name):
    fetchers = {
        "hackernews": fetch_hackernews,
        "reddit":     fetch_reddit,
        "devto":      fetch_devto,
    }
    if source_name in fetchers:
        return fetchers[source_name]()
    if source_name in RSS_FEEDS:
        return fetch_rss(source_name)
    return fetch_hackernews()

def ensure_stories(stories, min_n=4):
    """Supplement from HN if a source returned too few results."""
    if len(stories) >= min_n:
        return stories
    print(f"[WARN] Only {len(stories)} stories — supplementing from HN", file=sys.stderr)
    seen  = {s["title"] for s in stories}
    extra = [s for s in fetch_hackernews() if s["title"] not in seen]
    return (stories + extra)[:max(min_n, 6)]


# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE GENERATION
# ══════════════════════════════════════════════════════════════════════════════

def generate_with_claude(stories, article_type, title):
    """Use Anthropic Claude to write a high-quality article body."""
    try:
        import anthropic
    except ImportError:
        return None
    if not ANTHROPIC_API_KEY:
        return None

    type_cfg    = ARTICLE_TYPES[article_type]
    tools_pick  = ", ".join(random.sample(TOOLS, min(22, len(TOOLS))))
    is_excl     = SLOT == "exclusive"
    excl_note   = ("\n\nIMPORTANT: This is EXCLUSIVE subscriber-only content. "
                   "Go significantly deeper, include specific prompts/examples, "
                   "and be more detailed than a typical article.") if is_excl else ""

    headlines = "\n".join(
        f"  {i+1}. [{s.get('source_label','?')}] {s['title']} "
        f"({s.get('points',0)} engagements)"
        for i, s in enumerate(stories[:6])
    )

    prompt = textwrap.dedent(f"""
        You are a senior writer for MyAI ToolsFinder — an AI tools directory for
        solopreneurs, freelancers and creators who use AI daily.

        TODAY: {DATE_STR}
        ARTICLE TYPE: {article_type.upper()}
        ARTICLE TITLE: {title}
        {excl_note}

        TRENDING SOURCES (use for inspiration and grounding):
        {headlines}

        WRITING INSTRUCTIONS:
        {type_cfg['prompt']}

        STYLE RULES:
        - Tone: conversational, honest, practical — never hype-y or click-bait
        - Naturally mention 3–5 tools where genuinely relevant (from: {tools_pick})
        - HTML only: <p>, <h3>, <ul>, <li>, <strong>, <em>, <a href="...">
        - NO h1, h2, html, head, body, nav, script or structural tags
        - Every paragraph must be actionable — no filler sentences
        - Ground everything in real AI industry knowledge

        Return ONLY the article body HTML. No preamble, no markdown.
    """).strip()

    try:
        client  = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
        max_tok = 2400 if is_excl else 1900
        msg = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=max_tok,
            messages=[{"role": "user", "content": prompt}]
        )
        text = msg.content[0].text.strip()
        print(f"[OK] Claude generated article ({len(text)} chars)", file=sys.stderr)
        return text
    except Exception as e:
        print(f"[WARN] Claude API error: {e}", file=sys.stderr)
        return None


def generate_fallback(stories, article_type, title):
    """Structured template fallback when Claude API is unavailable."""
    type_cfg = ARTICLE_TYPES[article_type]
    html = (f"<p><strong>{title}</strong> — here's what's worth knowing right now, "
            f"and exactly what you can do about it.</p>\n\n")

    for i, s in enumerate(stories[:5], 1):
        t   = s.get("title", "Untitled")
        url = s.get("url", "")
        src = s.get("source_label", "Source")
        pts = s.get("points", 0)
        exc = re.sub(r"<[^>]+>", "", s.get("excerpt", "")).strip()

        html += f"<h3>{i}. {t}</h3>\n<p>"
        if url:
            html += f'<a href="{url}" target="_blank" rel="noopener"><strong>Full story →</strong></a> '
        if exc:
            html += exc[:130] + " "
        else:
            html += f"This story from <strong>{src}</strong> is gaining traction across AI communities. "
        if pts > 10:
            html += f"<strong>{pts}+ engagements</strong>. "
        html += "The practical takeaway: stay current, test one new thing this week, measure the impact.</p>\n\n"

    html += ("<h3>Bottom Line</h3>\n"
             "<p>The AI tools that consistently deliver value haven't changed much — "
             "a reliable writing assistant like <strong>Grammarly</strong> or <strong>Jasper AI</strong>, "
             "an image generator like <strong>Midjourney</strong>, and an automation layer like "
             "<strong>Zapier</strong> or <strong>Make.com</strong>. "
             "Focus on your current stack first. Then layer in whatever's genuinely new.</p>\n")
    return html


# ══════════════════════════════════════════════════════════════════════════════
# HTML BUILDERS
# ══════════════════════════════════════════════════════════════════════════════

def build_article_html(slug, title, body_html, stories, hero_url, article_type):
    type_cfg   = ARTICLE_TYPES[article_type]
    is_excl    = SLOT == "exclusive"
    eyebrow    = "Exclusive · Subscribers Only" if is_excl else f"{type_cfg['label']} · AI Tools"
    eyebrow_bg = "#fef3c7" if is_excl else "#dbeafe"
    eyebrow_fg = "#d97706" if is_excl else "#1a56db"
    read_time  = type_cfg["read_time"]

    # Sources box
    src_links = []
    for s in stories[:4]:
        u, lbl, t = s.get("url",""), s.get("source_label",""), s.get("title","")[:55]
        if u and t:
            src_links.append(f'<a href="{u}" target="_blank" rel="noopener">{t}…</a>')
    sources_html = ""
    if src_links:
        sources_html = (
            '<div class="sources-box"><strong>Sources</strong> '
            + " &nbsp;·&nbsp; ".join(src_links)
            + "</div>"
        )

    enc_title = requests.utils.quote(title)
    enc_url   = requests.utils.quote(f"https://myaitoolsfinder.com/articles/{slug}.html")

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SZQYFK19QN"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-SZQYFK19QN');</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} — MyAI ToolsFinder</title>
<meta name="description" content="{re.sub(chr(34),'',title)} — AI tools insight for solopreneurs, creators and professionals. {DATE_STR}.">
<meta property="og:title" content="{title}">
<meta property="og:image" content="{hero_url}">
<meta property="og:type" content="article">
<link rel="canonical" href="https://myaitoolsfinder.com/articles/{slug}.html">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%231a56db'/%3E%3Ccircle cx='10' cy='10' r='4' fill='white'/%3E%3Ccircle cx='22' cy='10' r='4' fill='white' opacity='.55'/%3E%3Ccircle cx='10' cy='22' r='4' fill='white' opacity='.55'/%3E%3Ccircle cx='22' cy='22' r='4' fill='white' opacity='.25'/%3E%3Cpath d='M14 10h4M10 14v4M22 14v4M14 22h4' stroke='white' stroke-width='2.2' stroke-linecap='round'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
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
.post-wrap{{max-width:760px;margin:0 auto;padding:88px 20px 80px;}}
.hero-img{{width:100%;height:280px;object-fit:cover;border-radius:16px;margin-bottom:24px;box-shadow:0 8px 28px rgba(26,86,219,.12);}}
.post-eyebrow{{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:{eyebrow_fg};background:{eyebrow_bg};padding:5px 12px;border-radius:999px;margin-bottom:14px;}}
.post-title{{font-size:clamp(24px,4vw,36px);font-weight:800;letter-spacing:-.025em;line-height:1.1;color:var(--text);margin-bottom:16px;}}
.post-meta{{display:flex;align-items:center;gap:14px;font-size:13px;color:var(--text-dim);flex-wrap:wrap;padding-bottom:24px;border-bottom:1px solid var(--border-soft);}}
.post-body{{margin-top:32px;}}
.post-body h3{{font-size:18px;font-weight:700;color:var(--text);margin:32px 0 10px;letter-spacing:-.01em;}}
.post-body p{{font-size:15px;color:var(--text-2);line-height:1.85;margin-bottom:18px;}}
.post-body ul{{padding-left:22px;margin-bottom:18px;display:flex;flex-direction:column;gap:8px;}}
.post-body ul li{{font-size:14.5px;color:var(--text-2);line-height:1.7;}}
.post-body a{{color:var(--primary);text-decoration:underline;text-underline-offset:3px;}}
.post-body strong{{color:var(--text);}}
.post-body em{{color:var(--text-2);font-style:italic;}}
.sources-box{{margin-top:40px;padding:18px 22px;background:var(--surface);border:1px solid var(--border-soft);border-radius:var(--r);font-size:13px;color:var(--text-dim);}}
.sources-box strong{{display:block;margin-bottom:8px;color:var(--text);font-size:11px;text-transform:uppercase;letter-spacing:.1em;font-weight:700;}}
.sources-box a{{color:var(--primary);font-size:12.5px;}}
.share-row{{display:flex;gap:8px;flex-wrap:wrap;margin-top:28px;padding-top:20px;border-top:1px solid var(--border-soft);}}
.share-btn{{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;border:1.5px solid var(--border);font-size:12.5px;font-weight:600;color:var(--text-2);text-decoration:none;transition:all .15s;}}
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
  <a href="../articles.html" class="nav-cta">Newsletter</a>
</nav>

<div class="post-wrap">
  <article>
    <img src="{hero_url}" alt="{title}" class="hero-img" loading="eager">
    <div class="post-eyebrow">{eyebrow}</div>
    <h1 class="post-title">{title}</h1>
    <div class="post-meta">
      <span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:3px"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        {DATE_STR}
      </span>
      <span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:3px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        {read_time} read
      </span>
      <span>MyAI ToolsFinder</span>
    </div>
    <div class="post-body">
      {body_html}
    </div>
    {sources_html}
    <div class="share-row">
      <a href="https://twitter.com/intent/tweet?text={enc_title}&url={enc_url}" target="_blank" rel="noopener nofollow" class="share-btn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.845L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        Share on X
      </a>
      <a href="../articles.html" class="share-btn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        All Articles
      </a>
      <a href="../index.html" class="share-btn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
        Browse Tools
      </a>
    </div>
  </article>
</div>

<footer>
  <p>© 2026 MyAI ToolsFinder &nbsp;·&nbsp;
     <a href="../index.html">Directory</a> &nbsp;·&nbsp;
     <a href="../articles.html">Articles</a> &nbsp;·&nbsp;
     <a href="../privacy.html">Privacy</a>
  </p>
  <p style="margin-top:6px;font-size:11px;opacity:.7">
    Some links may be affiliate links — we may earn a small commission at no extra cost to you.
  </p>
</footer>

<script src="../js/tools-data.js"></script>
<script src="../js/affiliate.js"></script>
</body>
</html>"""


# ── articles.html card builders ────────────────────────────────────────────────
def build_regular_card(slug, title, excerpt, hero_url, article_type, date_str):
    cfg = ARTICLE_TYPES[article_type]
    return f"""
    <a href="articles/{slug}.html" class="art-card" data-cat="{cfg['cat']}">
      <div class="art-card-img">
        <img src="{hero_url}" alt="{title}" loading="lazy">
        <div class="art-card-overlay"></div>
        <span class="art-card-cat">{cfg['label']}</span>
        <span class="art-card-read-time">{cfg['read_time']} read</span>
      </div>
      <div class="art-card-body">
        <div class="art-card-title">{title}</div>
        <div class="art-card-excerpt">{excerpt}</div>
        <div class="art-card-footer">
          <span class="art-card-date">{date_str}</span>
          <span class="art-card-arrow">Read more →</span>
        </div>
      </div>
    </a>"""

def build_exclusive_card(slug, title, excerpt, hero_url, article_type, date_str):
    cfg = ARTICLE_TYPES[article_type]
    lock_svg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
    return f"""
      <div class="art-card exclusive-card" data-href="articles/{slug}.html" onclick="showSubscribeGate()">
        <div class="art-card-img">
          <img src="{hero_url}" alt="Exclusive" loading="lazy">
          <div class="art-card-overlay"></div>
          <span class="art-card-cat">{cfg['label']}</span>
          <span class="art-card-read-time">{cfg['read_time']} read</span>
        </div>
        <div class="art-card-body">
          <div class="exclusive-lock">{lock_svg} Subscribers Only</div>
          <div class="art-card-title" style="filter:blur(4px);user-select:none">{title}</div>
          <div class="art-card-excerpt" style="filter:blur(3px);user-select:none">{excerpt}</div>
          <div class="art-card-footer">
            <span class="art-card-date">{date_str}</span>
            <span class="art-card-arrow">Subscribe to read →</span>
          </div>
        </div>
      </div>"""


# ── Update articles.html ───────────────────────────────────────────────────────
def update_articles_html(slug, title, excerpt, hero_url, article_type):
    if not ARTICLES_HTML.exists():
        print("[WARN] articles.html not found — skipping.", file=sys.stderr)
        return

    content  = ARTICLES_HTML.read_text(encoding="utf-8")
    date_str = NOW.strftime("%b %d, %Y")

    if SLOT == "exclusive":
        card = build_exclusive_card(slug, title, excerpt, hero_url, article_type, date_str)
        marker = "<!-- EXCLUSIVE_INSERT -->"
        if marker in content:
            content = content.replace(marker, marker + "\n" + card)
        else:
            # Fallback: insert at top of exclusive-grid
            grid_tag = '<div class="exclusive-grid" id="exclusive-grid">'
            content  = content.replace(grid_tag, grid_tag + "\n" + card)
    else:
        card = build_regular_card(slug, title, excerpt, hero_url, article_type, date_str)
        marker = "<!-- ARTICLES_INSERT -->"
        if marker in content:
            content = content.replace(marker, marker + "\n" + card)
        else:
            # Fallback: insert at top of art-grid
            grid_tag = '<div class="art-grid" id="art-grid">'
            content  = content.replace(grid_tag, grid_tag + "\n" + card)

    # Update article count display
    m = re.search(r'id="art-count">(\d+) articles?', content)
    if m:
        new_count = int(m.group(1)) + 1
        content = content.replace(m.group(0), f'id="art-count">{new_count} articles')

    ARTICLES_HTML.write_text(content, encoding="utf-8")
    kind = "exclusive" if SLOT == "exclusive" else "regular"
    print(f"[OK] articles.html updated — {kind} card prepended.", file=sys.stderr)


# ══════════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════════

def main():
    log         = load_log()
    slug        = get_slug(log)
    output_path = ARTICLES_DIR / f"{slug}.html"

    if output_path.exists():
        print(f"[INFO] Already exists: {slug}.html — skipping.")
        return

    print(f"[INFO] Slot={SLOT}  Slug={slug}  Date={DATE_STR}", file=sys.stderr)

    # ── Select type + source ───────────────────────────────────────────────────
    article_type = pick_article_type(log)
    source_name  = pick_source(log)
    print(f"[INFO] Type={article_type}  Source={source_name}", file=sys.stderr)

    # ── Build title early (needed for Claude prompt) ───────────────────────────
    title = build_title(article_type, log)
    print(f"[INFO] Title: {title}", file=sys.stderr)

    # ── Fetch stories ──────────────────────────────────────────────────────────
    stories = fetch_stories(source_name)
    stories = ensure_stories(stories)

    # ── Hero image ─────────────────────────────────────────────────────────────
    excl_offset = len([e for e in log.get("generated", [])
                        if e.get("date") == DATE_SLUG and e.get("slot") == "exclusive"])
    hero_url = pick_hero(index_offset=excl_offset)

    # ── Generate body ──────────────────────────────────────────────────────────
    body_html = generate_with_claude(stories, article_type, title)
    if not body_html:
        print("[INFO] Falling back to template generation.", file=sys.stderr)
        body_html = generate_fallback(stories, article_type, title)

    # ── Save article file ──────────────────────────────────────────────────────
    html = build_article_html(slug, title, body_html, stories, hero_url, article_type)
    output_path.write_text(html, encoding="utf-8")
    print(f"[OK] Saved: {output_path.name}", file=sys.stderr)

    # ── Extract excerpt for card ───────────────────────────────────────────────
    m = re.search(r"<p>(.*?)</p>", body_html, re.DOTALL)
    raw = re.sub(r"<[^>]+>", "", m.group(1)).strip() if m else title
    excerpt = raw[:160] + ("…" if len(raw) > 160 else "")

    # ── Update articles.html index ─────────────────────────────────────────────
    update_articles_html(slug, title, excerpt, hero_url, article_type)

    # ── Save log ───────────────────────────────────────────────────────────────
    save_log(log, {
        "date":   DATE_SLUG,
        "slot":   SLOT,
        "slug":   slug,
        "title":  title,
        "type":   article_type,
        "source": source_name,
        "hero":   hero_url,
    })
    print("[DONE] All steps complete.", file=sys.stderr)


if __name__ == "__main__":
    main()
