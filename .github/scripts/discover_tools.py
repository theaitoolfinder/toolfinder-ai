#!/usr/bin/env python3
"""
discover_tools.py — MyAI ToolsFinder AI Tools Discovery
═══════════════════════════════════════════════════════
Runs twice a week (Wednesday + Saturday at 14:00 PHT) to discover
and add new AI tools to the directory.

Updates made per run:
  • index.html   — TOOLS array (display data) + hardcoded count strings
  • admin.html   — DEFAULT_TOOLS array (admin editor source of truth)
  • js/tools-data.js — MYAI_AFF_MAP (affiliate/URL lookup used by affiliate.js)

Process:
  1. Fetch trending AI tool mentions from HN + Reddit
  2. Use Claude (or curated fallback) to research 3–5 new tools
  3. Validate each tool's domain is reachable
  4. De-duplicate against existing tools
  5. Inject into all three files
  6. Log to tool_discovery_log.json
"""

import os, re, sys, json, random, textwrap, requests, time
from datetime import datetime, timezone
from pathlib import Path

# ── Paths ──────────────────────────────────────────────────────────────────────
ROOT          = Path(__file__).resolve().parent.parent.parent
INDEX_HTML    = ROOT / "index.html"
ADMIN_HTML    = ROOT / "admin.html"
TOOLS_DATA_JS = ROOT / "js" / "tools-data.js"
LOG_PATH      = Path(__file__).resolve().parent / "tool_discovery_log.json"

# ── Config ─────────────────────────────────────────────────────────────────────
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "").strip()
NOW               = datetime.now(timezone.utc)
DATE_STR          = NOW.strftime("%Y-%m-%d")

HDR = {"User-Agent": "Mozilla/5.0 (compatible; MyAIToolsFinder/2.0)"}

# Valid categories (must match existing LENSES.cat.options)
VALID_CATS = [
    "Analytics","Audio","Automation","Chatbot","Coding","Design",
    "Education","Finance","HR","Image","Marketing","Presentation",
    "Productivity","Research","Sales","SEO","Support","Video","Writing",
]

# Valid job roles and needs (must match existing LENSES)
VALID_JOBS = [
    "Content Creator","Copywriter","Graphic Designer","Photographer","Podcaster",
    "Video Creator","Writer","YouTuber","Business Analyst","Data Scientist",
    "Developer","DevOps Engineer","Product Manager","UX Designer","Brand Manager",
    "Digital Marketer","E-commerce Owner","Email Marketer","Entrepreneur","Founder",
    "Marketer","Sales Professional","Social Media Manager","Solopreneur","Academic",
    "Educator","Journalist","Researcher","Student","Trainer","Customer Support",
    "Finance Professional","HR Professional","Legal Professional","Manager",
    "Project Manager","Virtual Assistant","Freelance Designer","Freelance Writer",
    "SEO Consultant","Translator","Web Developer",
]

VALID_NEEDS = [
    "Automate repetitive work","Brainstorm ideas","Build a website","Build an app",
    "Code faster","Create a logo","Create presentations","Create social content",
    "Design without a designer","Edit audio","Edit video","Generate images",
    "Generate video","Generate voice","Handle customer queries","Improve writing",
    "Make social posts","Manage a team","Manage email","Organize work",
    "Plan projects","Rank higher on Google","Research competitors","Run marketing",
    "Save time","Schedule smarter","Search the web","Ship faster",
    "Summarize long docs","Take notes","Transcribe meetings","Translate",
    "Write faster","Write marketing copy",
]


# ══════════════════════════════════════════════════════════════════════════════
# LOG
# ══════════════════════════════════════════════════════════════════════════════

def load_log():
    if LOG_PATH.exists():
        try:
            return json.loads(LOG_PATH.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {"discovered": []}

def save_log(log, added_names):
    log.setdefault("discovered", []).append({
        "date":  DATE_STR,
        "tools": added_names,
        "count": len(added_names),
    })
    log["discovered"] = log["discovered"][-100:]
    LOG_PATH.write_text(json.dumps(log, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[LOG] Saved {len(added_names)} new tools to discovery log.", file=sys.stderr)


# ══════════════════════════════════════════════════════════════════════════════
# PARSE EXISTING TOOLS
# ══════════════════════════════════════════════════════════════════════════════

def extract_array_bounds(content, array_name):
    """
    Find the start and end positions of a JS array declaration.
    Returns (start_of_opening_bracket, end_of_closing_bracket) or None.
    """
    # Match `const TOOLS=[` or `const DEFAULT_TOOLS = [`
    pattern = rf'const\s+{re.escape(array_name)}\s*=\s*\['
    m = re.search(pattern, content)
    if not m:
        return None
    start = m.end() - 1  # position of `[`
    depth = 0
    i = start
    in_str = False
    str_char = None
    while i < len(content):
        c = content[i]
        if in_str:
            if c == '\\':
                i += 2
                continue
            if c == str_char:
                in_str = False
        else:
            if c in ('"', "'", '`'):
                in_str = True
                str_char = c
            elif c == '[':
                depth += 1
            elif c == ']':
                depth -= 1
                if depth == 0:
                    return (start, i + 1)  # end is exclusive
        i += 1
    return None

def load_existing_tools_from_html(content, array_name="TOOLS"):
    """Return a dict keyed by lowercase name and lowercase domain for dedup."""
    bounds = extract_array_bounds(content, array_name)
    if not bounds:
        print(f"[WARN] Could not find {array_name} array.", file=sys.stderr)
        return {}, {}
    chunk = content[bounds[0]:bounds[1]]
    names   = {n.lower() for n in re.findall(r'name:"([^"]+)"', chunk)}
    domains = {d.lower() for d in re.findall(r'domain:"([^"]+)"', chunk)}
    return names, domains

def count_tools_in_html(content, array_name="TOOLS"):
    """Count number of tool objects in the array."""
    bounds = extract_array_bounds(content, array_name)
    if not bounds:
        return 0
    chunk = content[bounds[0]:bounds[1]]
    return len(re.findall(r'\{name:"', chunk))


# ══════════════════════════════════════════════════════════════════════════════
# FETCH TRENDING AI TOOL MENTIONS
# ══════════════════════════════════════════════════════════════════════════════

AI_TOOL_KW = [
    "launch", "tool", "app", "platform", "api", "model", "assistant",
    "generator", "ai", "gpt", "llm", "agent", "automate", "workflow",
]

def fetch_hn_new_tools(n=15):
    """Fetch recent HN 'Show HN' + AI product launches."""
    mentions = []
    queries = [
        "Show HN AI tool launch product",
        "AI SaaS tool launch 2025 2026",
        "new AI assistant automation platform",
    ]
    from datetime import timedelta
    since = int((NOW - timedelta(days=10)).timestamp())
    for q in queries[:2]:
        try:
            url = (f"https://hn.algolia.com/api/v1/search"
                   f"?query={requests.utils.quote(q)}"
                   f"&tags=story&numericFilters=created_at_i>{since},points>1"
                   f"&hitsPerPage=25")
            hits = requests.get(url, timeout=10).json().get("hits", [])
            for h in hits:
                title = h.get("title", "")
                hn_url = h.get("url", "")
                if any(k in title.lower() for k in AI_TOOL_KW):
                    mentions.append({
                        "title": title,
                        "url": hn_url,
                        "source": "Hacker News",
                        "points": h.get("points", 0),
                    })
        except Exception as e:
            print(f"[WARN] HN fetch: {e}", file=sys.stderr)
    mentions.sort(key=lambda x: x["points"], reverse=True)
    print(f"[INFO] HN: {len(mentions[:n])} tool mentions", file=sys.stderr)
    return mentions[:n]

def fetch_reddit_new_tools(n=15):
    """Fetch Reddit posts about new AI tools."""
    mentions = []
    subs = ["artificial", "SideProject", "AItools", "ChatGPT"]
    for sub in subs[:3]:
        try:
            url = f"https://www.reddit.com/r/{sub}/new.json?limit=25"
            posts = requests.get(url, headers=HDR, timeout=10).json()
            for item in posts.get("data", {}).get("children", []):
                p = item.get("data", {})
                if p.get("stickied"):
                    continue
                title = p.get("title", "")
                if any(k in title.lower() for k in ["ai", "gpt", "tool", "launch", "llm", "agent"]):
                    mentions.append({
                        "title": title,
                        "url": p.get("url", ""),
                        "source": f"r/{sub}",
                        "points": p.get("score", 0),
                    })
        except Exception as e:
            print(f"[WARN] Reddit r/{sub}: {e}", file=sys.stderr)
    mentions.sort(key=lambda x: x["points"], reverse=True)
    print(f"[INFO] Reddit: {len(mentions[:n])} mentions", file=sys.stderr)
    return mentions[:n]


# ══════════════════════════════════════════════════════════════════════════════
# VALIDATE TOOL DOMAIN
# ══════════════════════════════════════════════════════════════════════════════

def validate_domain(domain, url):
    """Check that the tool's website is actually reachable."""
    check_url = url if url.startswith("http") else f"https://{domain}"
    try:
        r = requests.head(check_url, timeout=8, allow_redirects=True,
                          headers={"User-Agent": "Mozilla/5.0"})
        ok = r.status_code < 500
        print(f"[VALIDATE] {domain} → HTTP {r.status_code} {'✓' if ok else '✗'}", file=sys.stderr)
        return ok
    except Exception as e:
        print(f"[VALIDATE] {domain} → unreachable ({e})", file=sys.stderr)
        return False


# ══════════════════════════════════════════════════════════════════════════════
# CLAUDE: RESEARCH + FORMAT NEW TOOLS
# ══════════════════════════════════════════════════════════════════════════════

def research_tools_with_claude(existing_names, existing_domains, mentions):
    """Use Claude to suggest and format 3–5 genuinely new AI tools."""
    try:
        import anthropic
    except ImportError:
        return None
    if not ANTHROPIC_API_KEY:
        return None

    recent_headlines = "\n".join(
        f"  • [{m['source']}] {m['title']}"
        for m in mentions[:15]
    )

    existing_sample = sorted(list(existing_names))[:80]
    existing_list   = ", ".join(existing_sample)

    valid_cats_str  = ", ".join(VALID_CATS)
    valid_jobs_str  = ", ".join(VALID_JOBS[:20]) + " ... (and more)"
    valid_needs_str = ", ".join(VALID_NEEDS[:20]) + " ... (and more)"

    prompt = textwrap.dedent(f"""
        You are the curator of MyAI ToolsFinder, an AI tools directory for solopreneurs,
        freelancers, and creators. Today is {DATE_STR}.

        TASK: Identify and document 4–5 real, currently-live AI tools that should be
        added to our directory. Prioritize tools that are:
        - New (launched or gained traction in the last 3–6 months), OR
        - Established but genuinely missing from our list
        - Actually useful for our audience (solopreneurs, creators, marketers, developers)
        - Verifiably real with a working website

        RECENT AI TRENDING CONTEXT (use for inspiration):
        {recent_headlines}

        TOOLS ALREADY IN OUR DIRECTORY (do NOT suggest these):
        {existing_list}
        (Plus ~{len(existing_names) - len(existing_sample)} more.)

        REQUIREMENTS FOR EACH TOOL:
        1. Must be a real, working AI tool with an actual website
        2. Must NOT already be in our directory (check the list above carefully)
        3. Must be genuinely useful — no vaporware or tools with no real users
        4. Should be diverse: different categories, different use cases

        VALID CATEGORIES (use EXACTLY one from this list):
        {valid_cats_str}

        VALID JOB ROLES (use 2–5 from this list for the "jobs" array):
        {valid_jobs_str}

        VALID NEEDS (use 2–4 from this list for the "needs" array):
        {valid_needs_str}

        VALID PILL VALUES (pricing badge — be accurate):
        "Free", "Free + Pro", "Free + Premium", "Free + Team", "Free Trial",
        "From $X", "$X/mo", "Custom", "Enterprise", "Open Source", "Lifetime deal"

        OUTPUT FORMAT — Return ONLY a valid JSON array, no markdown, no explanation:
        [
          {{
            "name": "Tool Name",
            "domain": "toolname.com",
            "tag": "One or two sentences describing exactly what this AI tool does and who it helps.",
            "pill": "Free + Pro",
            "url": "https://toolname.com",
            "affiliate_url": "",
            "rating": 4.5,
            "reviews": "12K",
            "users": "500K+",
            "verified": false,
            "featured": false,
            "jobs": ["Developer", "Solopreneur"],
            "needs": ["Code faster", "Automate repetitive work"],
            "trending": 72,
            "cat": "Coding"
          }}
        ]

        Rules for the JSON:
        - "rating": number between 4.0 and 4.9 (realistic, not inflated)
        - "reviews": string like "5K", "120K", "1.2M" or omit if unknown
        - "users": string like "50K+", "1M+", "10M+" or omit if unknown
        - "trending": integer 50–95 (higher = more viral right now)
        - "tag": max 120 characters, no marketing fluff, factual and specific
        - All job/need values must EXACTLY match the valid lists above
        - "cat" must EXACTLY match one value from the valid categories list

        Return the JSON array only. Start with `[` and end with `]`.
    """).strip()

    try:
        client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
        msg = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=3000,
            messages=[{"role": "user", "content": prompt}]
        )
        raw = msg.content[0].text.strip()
        # Extract JSON array from response (in case of any preamble)
        m = re.search(r'\[.*\]', raw, re.DOTALL)
        if not m:
            print("[WARN] Claude response had no JSON array.", file=sys.stderr)
            return None
        tools = json.loads(m.group(0))
        print(f"[OK] Claude suggested {len(tools)} tools.", file=sys.stderr)
        return tools
    except Exception as e:
        print(f"[WARN] Claude API error: {e}", file=sys.stderr)
        return None


def curated_fallback_tools(existing_names, existing_domains):
    """
    Hand-picked new AI tools when Claude API is unavailable.
    Rotated by week number to avoid repeating.
    """
    all_candidates = [
        {
            "name": "Perplexity Pages",
            "domain": "perplexity.ai",
            "tag": "Create beautiful AI-written research pages with citations, published directly from Perplexity.",
            "pill": "Free + Pro", "url": "https://perplexity.ai/pages",
            "affiliate_url": "", "rating": 4.6, "reviews": "8K", "users": "2M+",
            "verified": False, "featured": False,
            "jobs": ["Researcher", "Writer", "Educator"],
            "needs": ["Research competitors", "Summarize long docs", "Write faster"],
            "trending": 74, "cat": "Research"
        },
        {
            "name": "Ideogram",
            "domain": "ideogram.ai",
            "tag": "AI image generator that excels at text rendering inside images — great for logos and graphics.",
            "pill": "Free + Pro", "url": "https://ideogram.ai",
            "affiliate_url": "", "rating": 4.5, "reviews": "25K", "users": "3M+",
            "verified": False, "featured": False,
            "jobs": ["Graphic Designer", "Marketer", "Content Creator"],
            "needs": ["Generate images", "Create a logo", "Design without a designer"],
            "trending": 78, "cat": "Image"
        },
        {
            "name": "Wispr Flow",
            "domain": "wispr.ai",
            "tag": "AI voice dictation that works across every app — 3× faster than typing with auto-correction.",
            "pill": "Free + Pro", "url": "https://wispr.ai",
            "affiliate_url": "", "rating": 4.6, "reviews": "4K", "users": "200K+",
            "verified": False, "featured": False,
            "jobs": ["Writer", "Solopreneur", "Manager", "Entrepreneur"],
            "needs": ["Write faster", "Take notes", "Save time"],
            "trending": 71, "cat": "Productivity"
        },
        {
            "name": "Pika Labs",
            "domain": "pika.art",
            "tag": "AI video generation from text or images — create cinematic short clips in seconds.",
            "pill": "Free + Pro", "url": "https://pika.art",
            "affiliate_url": "", "rating": 4.5, "reviews": "18K", "users": "1M+",
            "verified": False, "featured": False,
            "jobs": ["Video Creator", "Content Creator", "Marketer"],
            "needs": ["Generate video", "Edit video", "Make social posts"],
            "trending": 76, "cat": "Video"
        },
        {
            "name": "Wordware",
            "domain": "wordware.ai",
            "tag": "Build AI agents and automations in plain English — no code required, team-friendly.",
            "pill": "Free + Pro", "url": "https://wordware.ai",
            "affiliate_url": "", "rating": 4.5, "reviews": "2K", "users": "50K+",
            "verified": False, "featured": False,
            "jobs": ["Founder", "Product Manager", "Solopreneur", "Developer"],
            "needs": ["Automate repetitive work", "Build an app", "Ship faster"],
            "trending": 70, "cat": "Automation"
        },
        {
            "name": "Udio",
            "domain": "udio.com",
            "tag": "AI music generator that creates full songs with vocals, instruments and custom lyrics.",
            "pill": "Free + Pro", "url": "https://udio.com",
            "affiliate_url": "", "rating": 4.5, "reviews": "14K", "users": "800K+",
            "verified": False, "featured": False,
            "jobs": ["Content Creator", "Podcaster", "Video Creator", "YouTuber"],
            "needs": ["Edit audio", "Generate voice", "Create social content"],
            "trending": 72, "cat": "Audio"
        },
        {
            "name": "Convergence Proxy",
            "domain": "convergence.ai",
            "tag": "Autonomous AI agent that browses the web and completes multi-step tasks on your behalf.",
            "pill": "Free + Pro", "url": "https://convergence.ai",
            "affiliate_url": "", "rating": 4.4, "reviews": "3K", "users": "100K+",
            "verified": False, "featured": False,
            "jobs": ["Solopreneur", "Researcher", "Founder", "Marketer"],
            "needs": ["Automate repetitive work", "Research competitors", "Save time"],
            "trending": 69, "cat": "Automation"
        },
        {
            "name": "Recraft",
            "domain": "recraft.ai",
            "tag": "AI design tool for generating consistent brand visuals, icons, illustrations and vector art.",
            "pill": "Free + Pro", "url": "https://recraft.ai",
            "affiliate_url": "", "rating": 4.6, "reviews": "9K", "users": "600K+",
            "verified": False, "featured": False,
            "jobs": ["Graphic Designer", "Brand Manager", "UX Designer", "Marketer"],
            "needs": ["Generate images", "Design without a designer", "Create a logo"],
            "trending": 73, "cat": "Design"
        },
        {
            "name": "Bolt.new",
            "domain": "bolt.new",
            "tag": "AI full-stack app builder — describe your app and get working code deployed in minutes.",
            "pill": "Free + Pro", "url": "https://bolt.new",
            "affiliate_url": "", "rating": 4.7, "reviews": "22K", "users": "2M+",
            "verified": True, "featured": False,
            "jobs": ["Developer", "Founder", "Solopreneur", "Product Manager"],
            "needs": ["Build an app", "Build a website", "Ship faster", "Code faster"],
            "trending": 85, "cat": "Coding"
        },
        {
            "name": "Lovable",
            "domain": "lovable.dev",
            "tag": "AI that turns natural language descriptions into full-stack web apps — no coding experience needed.",
            "pill": "Free + Pro", "url": "https://lovable.dev",
            "affiliate_url": "", "rating": 4.6, "reviews": "15K", "users": "500K+",
            "verified": False, "featured": False,
            "jobs": ["Founder", "Solopreneur", "Product Manager", "Entrepreneur"],
            "needs": ["Build an app", "Build a website", "Ship faster"],
            "trending": 82, "cat": "Coding"
        },
        {
            "name": "Krea AI",
            "domain": "krea.ai",
            "tag": "Real-time AI image generation and upscaling tool with advanced style controls for creatives.",
            "pill": "Free + Pro", "url": "https://krea.ai",
            "affiliate_url": "", "rating": 4.5, "reviews": "11K", "users": "700K+",
            "verified": False, "featured": False,
            "jobs": ["Graphic Designer", "Content Creator", "Photographer"],
            "needs": ["Generate images", "Design without a designer"],
            "trending": 70, "cat": "Image"
        },
        {
            "name": "Sora",
            "domain": "sora.com",
            "tag": "OpenAI's text-to-video model that generates realistic videos up to one minute from a prompt.",
            "pill": "From $20", "url": "https://sora.com",
            "affiliate_url": "", "rating": 4.5, "reviews": "40K", "users": "2M+",
            "verified": True, "featured": False,
            "jobs": ["Video Creator", "Content Creator", "Marketer", "YouTuber"],
            "needs": ["Generate video", "Create social content", "Make social posts"],
            "trending": 83, "cat": "Video"
        },
        {
            "name": "Luma Dream Machine",
            "domain": "lumalabs.ai",
            "tag": "Luma AI's video generation tool — create smooth, high-quality video clips from text or images.",
            "pill": "Free + Pro", "url": "https://lumalabs.ai/dream-machine",
            "affiliate_url": "", "rating": 4.5, "reviews": "20K", "users": "1.5M+",
            "verified": False, "featured": False,
            "jobs": ["Video Creator", "Content Creator", "Graphic Designer"],
            "needs": ["Generate video", "Edit video", "Create social content"],
            "trending": 77, "cat": "Video"
        },
        {
            "name": "Fal.ai",
            "domain": "fal.ai",
            "tag": "Fast AI inference API for image and video generation — run Flux, SDXL and more at scale.",
            "pill": "Pay-per-use", "url": "https://fal.ai",
            "affiliate_url": "", "rating": 4.5, "reviews": "5K", "users": "200K+",
            "verified": False, "featured": False,
            "jobs": ["Developer", "Data Scientist", "Product Manager"],
            "needs": ["Generate images", "Build an app", "Ship faster"],
            "trending": 69, "cat": "Image"
        },
        {
            "name": "Claude.ai Projects",
            "domain": "claude.ai",
            "tag": "Persistent AI projects in Claude that remember context, files and instructions across conversations.",
            "pill": "Free + Pro", "url": "https://claude.ai",
            "affiliate_url": "", "rating": 4.8, "reviews": "95K", "users": "5M+",
            "verified": True, "featured": False,
            "jobs": ["Researcher", "Writer", "Developer", "Founder"],
            "needs": ["Organize work", "Summarize long docs", "Write faster"],
            "trending": 88, "cat": "Productivity"
        },
    ]

    week_num = NOW.isocalendar()[1]
    random.seed(week_num)
    random.shuffle(all_candidates)

    new_tools = []
    for t in all_candidates:
        name_l   = t["name"].lower()
        domain_l = t["domain"].lower()
        if name_l not in existing_names and domain_l not in existing_domains:
            new_tools.append(t)
        if len(new_tools) >= 4:
            break

    print(f"[FALLBACK] Selected {len(new_tools)} curated tools.", file=sys.stderr)
    return new_tools


# ══════════════════════════════════════════════════════════════════════════════
# VALIDATE TOOLS
# ══════════════════════════════════════════════════════════════════════════════

def sanitize_tool(tool, existing_names, existing_domains):
    """Clean, validate and de-duplicate a tool dict."""
    name   = str(tool.get("name", "")).strip()
    domain = str(tool.get("domain", "")).strip().lower()
    url    = str(tool.get("url", "")).strip()
    tag    = str(tool.get("tag", "")).strip()[:140]
    cat    = tool.get("cat", "")
    pill   = str(tool.get("pill", "Free")).strip()

    if not name or not domain or not url or not tag:
        print(f"[SKIP] Missing required field: {name or '?'}", file=sys.stderr)
        return None
    if name.lower() in existing_names:
        print(f"[SKIP] Already exists: {name}", file=sys.stderr)
        return None
    if domain in existing_domains:
        print(f"[SKIP] Domain already exists: {domain}", file=sys.stderr)
        return None
    if cat not in VALID_CATS:
        print(f"[WARN] Invalid cat '{cat}' for {name} — defaulting to Productivity", file=sys.stderr)
        cat = "Productivity"

    # Filter jobs and needs to valid values only
    jobs  = [j for j in (tool.get("jobs") or []) if j in VALID_JOBS][:5]
    needs = [n for n in (tool.get("needs") or []) if n in VALID_NEEDS][:4]
    if not jobs:
        jobs = ["Solopreneur", "Marketer"]
    if not needs:
        needs = ["Save time", "Automate repetitive work"]

    # Coerce numeric fields
    try:
        rating = round(float(tool.get("rating") or 4.4), 1)
        rating = max(4.0, min(4.9, rating))
    except (ValueError, TypeError):
        rating = 4.4

    try:
        trending = int(tool.get("trending") or 65)
        trending = max(50, min(95, trending))
    except (ValueError, TypeError):
        trending = 65

    return {
        "name":         name,
        "domain":       domain,
        "tag":          tag,
        "pill":         pill,
        "url":          url,
        "affiliate_url": "",
        "rating":       rating,
        "reviews":      str(tool.get("reviews", "")).strip() or None,
        "users":        str(tool.get("users", "")).strip() or None,
        "verified":     bool(tool.get("verified", False)),
        "featured":     bool(tool.get("featured", False)),
        "jobs":         jobs,
        "needs":        needs,
        "trending":     trending,
        "cat":          cat,
    }


# ══════════════════════════════════════════════════════════════════════════════
# JS OBJECT SERIALIZER
# ══════════════════════════════════════════════════════════════════════════════

def tool_to_js(t):
    """Convert a tool dict to a JS object literal string."""
    def js_str(s):
        return '"' + str(s).replace('\\', '\\\\').replace('"', '\\"') + '"'

    def js_arr(arr):
        return '[' + ','.join(js_str(x) for x in arr) + ']'

    parts = [
        f'name:{js_str(t["name"])}',
        f'domain:{js_str(t["domain"])}',
        f'tag:{js_str(t["tag"])}',
        f'pill:{js_str(t["pill"])}',
        f'url:{js_str(t["url"])}',
        f'affiliate_url:{js_str(t["affiliate_url"])}',
    ]
    if t.get("rating"):
        parts.append(f'rating:{t["rating"]}')
    if t.get("reviews"):
        parts.append(f'reviews:{js_str(t["reviews"])}')
    if t.get("users"):
        parts.append(f'users:{js_str(t["users"])}')
    if t.get("featured"):
        parts.append('featured:true')
    if t.get("verified"):
        parts.append('verified:true')
    parts += [
        f'jobs:{js_arr(t["jobs"])}',
        f'needs:{js_arr(t["needs"])}',
        f'trending:{t["trending"]}',
        f'cat:{js_str(t["cat"])}',
    ]
    return '{' + ','.join(parts) + '}'


# ══════════════════════════════════════════════════════════════════════════════
# INJECT INTO FILES
# ══════════════════════════════════════════════════════════════════════════════

def inject_tools_into_array(content, array_name, new_tools):
    """
    Inject new tool JS objects just before the closing `]` of the named array.
    Returns updated content string.
    """
    bounds = extract_array_bounds(content, array_name)
    if not bounds:
        print(f"[WARN] Cannot find {array_name} array — skipping injection.", file=sys.stderr)
        return content

    insert_pos = bounds[1] - 1  # position of closing `]`
    # Ensure trailing comma on last existing item
    chunk_before = content[bounds[0]:insert_pos].rstrip()
    # Build new lines
    new_lines = ""
    for t in new_tools:
        new_lines += "\n  " + tool_to_js(t) + ","
    # Insert before the `]`
    updated = content[:bounds[0]] + content[bounds[0]:insert_pos].rstrip() + new_lines + "\n" + content[insert_pos:]
    print(f"[OK] Injected {len(new_tools)} tools into {array_name}.", file=sys.stderr)
    return updated


def update_hardcoded_counts(content, new_total):
    """Update all hardcoded tool count strings in index.html."""
    # Round down to nearest 25 for display (same logic as renderStats)
    rounded = (new_total // 25) * 25

    patterns = [
        # Search placeholder
        (r'placeholder="Search \d+\+ AI tools', f'placeholder="Search {rounded}+ AI tools'),
        # Hero eyebrow
        (r'AI Tools Directory &middot; \d+\+ Tools',
         f'AI Tools Directory &middot; {rounded}+ Tools'),
        # Hero CTA button
        (r'Explore \d+\+ Tools', f'Explore {rounded}+ Tools'),
    ]
    for pattern, replacement in patterns:
        content, n = re.subn(pattern, replacement, content)
        if n:
            print(f"[OK] Updated count string: {replacement!r}", file=sys.stderr)
    return content


def update_tools_data_js(js_content, new_tools):
    """Add new entries to MYAI_AFF_MAP in tools-data.js."""
    # Find the closing `};`
    end_m = re.search(r'\n\};', js_content)
    if not end_m:
        print("[WARN] Cannot find closing }; in tools-data.js", file=sys.stderr)
        return js_content

    new_lines = []
    for t in new_tools:
        key = t["name"].lower()
        val = t["affiliate_url"] if t["affiliate_url"] else t["url"]
        line = f'  {json.dumps(key)}: {json.dumps(val)}'
        new_lines.append(line)

    if not new_lines:
        return js_content

    insert = end_m.start()
    updated = js_content[:insert] + ",\n" + ",\n".join(new_lines) + js_content[insert:]
    print(f"[OK] Added {len(new_lines)} entries to MYAI_AFF_MAP.", file=sys.stderr)
    return updated


# ══════════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════════

def main():
    log = load_log()

    # Avoid running twice on the same day
    today_runs = [e for e in log.get("discovered", []) if e.get("date") == DATE_STR]
    if today_runs:
        print(f"[INFO] Already ran today ({DATE_STR}) — skipping.", file=sys.stderr)
        return

    print(f"[INFO] Starting tool discovery — {DATE_STR}", file=sys.stderr)

    # ── Read existing files ────────────────────────────────────────────────────
    if not INDEX_HTML.exists():
        print("[ERROR] index.html not found — aborting.", file=sys.stderr)
        sys.exit(1)
    if not ADMIN_HTML.exists():
        print("[ERROR] admin.html not found — aborting.", file=sys.stderr)
        sys.exit(1)

    index_content = INDEX_HTML.read_text(encoding="utf-8")
    admin_content = ADMIN_HTML.read_text(encoding="utf-8")
    js_content    = TOOLS_DATA_JS.read_text(encoding="utf-8") if TOOLS_DATA_JS.exists() else ""

    # ── Load existing tool names/domains ──────────────────────────────────────
    existing_names, existing_domains = load_existing_tools_from_html(index_content, "TOOLS")
    original_count = count_tools_in_html(index_content, "TOOLS")
    print(f"[INFO] Existing tools: {original_count} ({len(existing_names)} unique names)", file=sys.stderr)

    # ── Fetch trending mentions ────────────────────────────────────────────────
    mentions = fetch_hn_new_tools() + fetch_reddit_new_tools()
    random.shuffle(mentions)

    # ── Discover new tools ────────────────────────────────────────────────────
    raw_tools = research_tools_with_claude(existing_names, existing_domains, mentions)
    if not raw_tools:
        print("[INFO] Using curated fallback tools.", file=sys.stderr)
        raw_tools = curated_fallback_tools(existing_names, existing_domains)

    if not raw_tools:
        print("[WARN] No new tools found — nothing to add.", file=sys.stderr)
        return

    # ── Sanitize + de-duplicate ────────────────────────────────────────────────
    valid_tools = []
    seen_names_this_run = set()
    for raw in raw_tools:
        clean = sanitize_tool(raw, existing_names | seen_names_this_run,
                              existing_domains)
        if clean:
            # Optional: validate domain is reachable (skip in CI if slow)
            do_validate = os.environ.get("VALIDATE_DOMAINS", "1") == "1"
            if do_validate and not validate_domain(clean["domain"], clean["url"]):
                print(f"[SKIP] Domain not reachable: {clean['domain']}", file=sys.stderr)
                continue
            valid_tools.append(clean)
            seen_names_this_run.add(clean["name"].lower())
        if len(valid_tools) >= 5:
            break

    if not valid_tools:
        print("[WARN] All candidate tools failed validation — nothing to add.", file=sys.stderr)
        return

    print(f"[INFO] Adding {len(valid_tools)} new tools: "
          f"{', '.join(t['name'] for t in valid_tools)}", file=sys.stderr)

    # ── Update index.html ──────────────────────────────────────────────────────
    index_content = inject_tools_into_array(index_content, "TOOLS", valid_tools)
    new_total     = original_count + len(valid_tools)
    index_content = update_hardcoded_counts(index_content, new_total)
    INDEX_HTML.write_text(index_content, encoding="utf-8")
    print(f"[OK] index.html updated ({original_count} → {new_total} tools).", file=sys.stderr)

    # ── Update admin.html ──────────────────────────────────────────────────────
    admin_content = inject_tools_into_array(admin_content, "DEFAULT_TOOLS", valid_tools)
    ADMIN_HTML.write_text(admin_content, encoding="utf-8")
    print(f"[OK] admin.html DEFAULT_TOOLS updated.", file=sys.stderr)

    # ── Update tools-data.js ───────────────────────────────────────────────────
    if js_content:
        js_content = update_tools_data_js(js_content, valid_tools)
        TOOLS_DATA_JS.write_text(js_content, encoding="utf-8")
        print(f"[OK] tools-data.js updated.", file=sys.stderr)

    # ── Save discovery log ────────────────────────────────────────────────────
    save_log(log, [t["name"] for t in valid_tools])

    print(f"\n[DONE] Added {len(valid_tools)} tools. Directory now has {new_total} tools.", file=sys.stderr)


if __name__ == "__main__":
    main()
