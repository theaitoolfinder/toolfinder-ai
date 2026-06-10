#!/usr/bin/env python3
"""
generate_article.py — MyAI ToolsFinder Automated Article Generator
═══════════════════════════════════════════════════════════════════
Schedule (Philippine Time, PHT = UTC+8):
  Mon–Sun   8:00  Morning article   → comparison / tutorial / roundup
  Mon–Sun  13:00  Afternoon article → roundup / tutorial / comparison
  Mon–Sun  19:00  Evening article   → news digest / roundup / comparison
  Friday   ×5     Exclusive articles → deep dive / workflow / strategy

Sources rotated to avoid repetition:
  hackernews · reddit · devto · venturebeat · verge · techcrunch

Article types rotated (tracked in article_log.json, 14-day dedup window):
  comparison · roundup · tutorial · news_digest · deep_dive · workflow · strategy

Every article: minimum 1,200 words. Topics + angles tracked per article to
prevent ANY repetition across title, topic, tool pair, and angle.
"""

import os, re, sys, json, random, textwrap, requests, hashlib
from datetime import datetime, timezone, timedelta
from pathlib import Path
from xml.etree import ElementTree as ET

# ── Paths ──────────────────────────────────────────────────────────────────────
ROOT               = Path(__file__).resolve().parent.parent.parent
ARTICLES_DIR       = ROOT / "articles"
ARTICLES_HTML      = ROOT / "articles.html"
LOG_PATH           = Path(__file__).resolve().parent / "article_log.json"
AFFILIATE_JSON     = ROOT / "data" / "affiliate_tools.json"
ARTICLES_DIR.mkdir(exist_ok=True)

# ── Affiliate partner tools ────────────────────────────────────────────────────
def _load_affiliate_tools():
    """Return list of affiliate tool dicts sorted by priority (1 = highest)."""
    if not AFFILIATE_JSON.exists():
        return []
    try:
        raw = json.loads(AFFILIATE_JSON.read_text(encoding="utf-8"))
        tools = [t for t in raw.get("tools", []) if t.get("name")]
        tools.sort(key=lambda t: (t.get("priority", 2), t["name"]))
        return tools
    except Exception:
        return []

AFFILIATE_TOOLS = _load_affiliate_tools()          # full dicts
AFFILIATE_NAMES = [t["name"] for t in AFFILIATE_TOOLS]   # display names only

# ── Runtime ────────────────────────────────────────────────────────────────────
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "").strip()
SLOT_OVERRIDE     = os.environ.get("ARTICLE_SLOT", "").strip().lower()
# Alias map: legacy → new slot names
_SLOT_ALIAS = {
    "lunch":      "morning",
    "dinner":     "evening",
    "afternoon":  "afternoon",   # kept for manual dispatch
}
NOW               = datetime.now(timezone.utc)
DATE_SLUG         = NOW.strftime("%Y-%m-%d")
DATE_STR          = NOW.strftime("%B %d, %Y")
YEAR              = NOW.strftime("%Y")

# ── 6 regular slots per day (UTC hour thresholds) ─────────────────────────────
# Slot name          UTC starts   PHT equivalent
REGULAR_SLOTS = [
    ( 0, "morning"),    # 00:00 UTC = 08:00 PHT
    ( 4, "midday"),     # 04:00 UTC = 12:00 PHT
    ( 8, "afternoon"),  # 08:00 UTC = 16:00 PHT
    (12, "evening"),    # 12:00 UTC = 20:00 PHT
    (16, "night"),      # 16:00 UTC = 00:00 PHT
    (20, "latenight"),  # 20:00 UTC = 04:00 PHT
]

# 10 Friday exclusive hours (UTC) — odd hours, interleaved with regular slots
EXCL_HOURS = (1, 3, 5, 7, 9, 11, 13, 15, 17, 19)

# ── Determine slot from time + weekday ────────────────────────────────────────
def determine_slot():
    # Accept override (manual dispatch or forced slot)
    _valid = {"morning","midday","afternoon","evening","night","latenight",
              "exclusive","lunch","dinner"}
    if SLOT_OVERRIDE in _valid:
        return _SLOT_ALIAS.get(SLOT_OVERRIDE, SLOT_OVERRIDE)

    hour = NOW.hour
    is_friday = NOW.weekday() == 4

    # Load today's already-generated slots from the log (for catchup logic)
    generated_today: set = set()
    excl_today = 0
    if LOG_PATH.exists():
        try:
            log = json.loads(LOG_PATH.read_text())
            for e in log.get("generated", []):
                if e.get("date") == DATE_SLUG:
                    generated_today.add(e.get("slot"))
                    if e.get("slot") == "exclusive":
                        excl_today += 1
        except Exception:
            pass

    # Build a unified chronological schedule of all slots due today.
    # Regular and exclusive slots interleave by UTC hour — process them in order
    # so neither type starves the other (fixes Friday regular slots being skipped).
    combined = list(REGULAR_SLOTS)  # [(0, "morning"), (4, "midday"), ...]
    if is_friday:
        for h in EXCL_HOURS:
            combined.append((h, "exclusive"))
    combined.sort(key=lambda x: x[0])

    excl_seen = 0
    for min_hour, slot_name in combined:
        if hour < min_hour:
            break   # haven't reached this slot's scheduled time yet
        if slot_name == "exclusive":
            excl_seen += 1
            if excl_seen > excl_today:
                return "exclusive"
        else:
            if slot_name not in generated_today:
                return slot_name

    return None   # all expected slots are already done for today

SLOT = determine_slot()
if SLOT is None:
    print("[INFO] All expected articles for today are already generated — nothing to do.")
    sys.exit(0)

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

# ── Hero images — verified tech/AI visuals (100+ pool for uniqueness) ─────────
# Pool size ≥ 100 ensures unique covers for weeks of high-frequency publishing.
# Selection uses title-hash as seed → same title always maps to same image AND
# concurrent GitHub Actions runs (which share the same log state) will pick
# DIFFERENT images because they're writing different articles with different titles.
HERO_IMAGES = [
    # ── Original verified pool ──────────────────────────────────────────────────
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550645612-83f5d594b671?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1698778573682-346d219402b5?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579869847557-1f67382cc158?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573152143286-0c422b4d2175?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop",
    # ── Extended pool — tech/AI/workspace (added for uniqueness at high volume) ──
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573495627361-d9b87960b12d?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506729623306-dbf5eae43ab0?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1680524238706-3c9e61bef3d4?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1682685797703-2bb22debb5ab?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1635241161466-541f065683ba?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606765962248-7ff407b51667?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511376777868-611b54f68947?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527430253228-e93688616381?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1624969862293-b749659ccc4e?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592609931095-54a2168ae893?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1649180556628-9ba704115795?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1651059545081-f8a9d6c0a993?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1654157925394-4b7809721149?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1661961112951-f2bfd1f7514e?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1671726203390-cdc4354ee2eb?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1673280349492-5e4fde0b8571?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1676225548768-49b6dd34bd9d?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1678957165432-f0b40eb35aa3?w=800&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1679403766680-7a8d21a0a83d?w=800&q=85&auto=format&fit=crop",
]

# Guaranteed fallback shown by the browser if a hero image ever goes 404 AFTER generation.
# Must always be a live, relevant AI/tech image. Re-verify this URL before changing it.
HERO_FALLBACK_URL = "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=85&auto=format&fit=crop"


def _url_alive(url: str) -> bool:
    """HEAD-check a URL — returns True only on HTTP 200. Fails safe (True) on timeout."""
    try:
        r = requests.head(url, timeout=6, allow_redirects=True,
                          headers={"User-Agent": "Mozilla/5.0"})
        return r.status_code == 200
    except Exception:
        return True   # network error → assume alive, don't block article generation


def _scan_disk_heroes() -> set[str]:
    """Scan all articles on disk and return the set of hero image URLs in use.

    This is the ground truth — it catches every article ever published,
    regardless of whether it's still in the log's rolling window.
    Run before pick_hero so concurrent GitHub Actions jobs (which all share
    the same checkout state) still pick different images per title.

    Uses og:image as the canonical source — it's unambiguous and can't be
    confused with onerror fallback URLs that also appear in <img> tags.
    """
    used: set[str] = set()
    try:
        for html_file in ARTICLES_DIR.glob("*.html"):
            text = html_file.read_text(encoding="utf-8", errors="ignore")
            # og:image is the definitive hero URL — no onerror confusion
            m = re.search(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', text)
            if not m:
                # Alternate attribute order
                m = re.search(r'<meta\s+content=["\']([^"\']+)["\']\s+property=["\']og:image["\']', text)
            if m:
                used.add(m.group(1).split("?")[0])  # strip query params for comparison
    except Exception as e:
        print(f"[WARN] disk hero scan failed: {e}", file=sys.stderr)
    return used


def pick_hero(title: str, log: dict, index_offset: int = 0) -> str:
    """Return a hero URL that is unique to this article.

    Strategy:
      1. Scan ALL article files on disk → complete ground-truth used-image set.
         This catches every published article regardless of log window size,
         and works correctly even when concurrent GitHub Actions runs share
         the same checkout state.
      2. Hash the article TITLE to get a deterministic start index.
         → Different titles always map to different pool positions.
      3. Walk forward from that index, skipping already-used images.
      4. Fall back to log hero_history for any pool images not found on disk.
      5. If pool fully exhausted, reuse from hash position (last resort).
      6. Skip any image that returns HTTP 404.
      index_offset shifts the start for Friday exclusive multi-slot runs.
    """
    pool = HERO_IMAGES

    # Ground truth: scan every article file currently on disk
    disk_used = _scan_disk_heroes()

    # Also include log-based history for belt-and-suspenders
    hero_history: list[str] = log.get("hero_history", [])
    legacy = [e.get("hero", "") for e in log.get("generated", []) if e.get("hero")]
    log_used: set[str] = set(hero_history + legacy)

    # Normalise pool URLs to base (no query string) for comparison
    def _base(url: str) -> str:
        return url.split("?")[0]

    recently_used: set[str] = disk_used | {_base(u) for u in log_used}

    # Deterministic start index from title hash + offset
    title_hash   = int(hashlib.md5(title.encode()).hexdigest(), 16)
    base_idx     = (title_hash + index_offset) % len(pool)

    # Pass 1: find an unused+alive image starting from hash position
    for step in range(len(pool)):
        img = pool[(base_idx + step) % len(pool)]
        if _base(img) not in recently_used:
            if _url_alive(img):
                return img
            else:
                print(f"[WARN] Hero image 404 — skipping: {img}", file=sys.stderr)

    # Pass 2: pool exhausted for recent window — fall back to hash position (alive)
    print("[INFO] Hero pool fully cycled — reusing least-recent image.", file=sys.stderr)
    for step in range(len(pool)):
        img = pool[(base_idx + step) % len(pool)]
        if _url_alive(img):
            return img

    # Absolute fallback
    print("[ERROR] All hero images returned 404 — using fallback.", file=sys.stderr)
    return HERO_FALLBACK_URL


# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE TYPES  — all require ≥1,200 words from Claude
# ══════════════════════════════════════════════════════════════════════════════

ARTICLE_TYPES = {
    "comparison": {
        "label": "Comparison", "cat": "comparison review", "read_time": "8 min",
        "prompt": """Write a THOROUGH AI TOOLS COMPARISON article of AT LEAST 1,200 words.

REQUIRED STRUCTURE (do not skip sections):
1. Intro (150+ words): Hook readers with WHY this comparison matters RIGHT NOW — a specific real-world scenario where a wrong tool choice costs time or money. Paint the problem vividly.
2. Quick Verdict Box: A 3-row bullet summary (<ul>) — Best for X, Best for Y, Best if budget-tight. Put it early so skimmers get value.
3. Tool A Deep Dive (<h3>): 200+ words covering — core strengths (with a specific use-case example), weaknesses you've actually noticed, pricing tiers and what each unlocks, who the ideal user is.
4. Tool B Deep Dive (<h3>): Same depth as Tool A.
5. Tool C (optional but preferred if relevant): 150+ words.
6. Head-to-Head Breakdown (<h3>): Compare across 4–5 dimensions (speed, output quality, price/value, learning curve, integrations). Use a plain-text comparison grid or <ul> with ✓/✗.
7. Real-World Use Cases (<h3>): 2–3 specific scenarios showing which tool wins and why.
8. Final Verdict (<h3>): Clear, opinionated recommendation. Name ONE winner for most users. Acknowledge who should choose the alternative.
9. FAQ (<h3>): 3 questions a reader would actually Google before buying.

STYLE: Conversational but authoritative. Cite real pricing. Mention specific features by name. No vague superlatives.""",
    },
    "featured": {
        "label": "Featured Tool", "cat": "featured review", "read_time": "8 min",
        "prompt": """Write a DEEP-DIVE FEATURED AI TOOL REVIEW of AT LEAST 1,200 words.

This is a full spotlight on ONE specific AI tool — the kind of review a professional reads before deciding to pay for a tool.

REQUIRED STRUCTURE (do not skip sections):
1. The Hook (150+ words): Open with a specific, vivid scenario where this tool saves the day — real numbers, real situation. Make the reader feel the value before you explain the tool.
2. What It Actually Does (<h3>, 150+ words): Cut through the marketing. Explain in plain language what the tool does, what problem it was built for, and who built it. Include current pricing tiers.
3. The Killer Feature (<h3>, 150+ words): The ONE thing this tool does better than anything else on the market. Be specific — name the feature, explain HOW it works, give a concrete before/after example.
4. Full Feature Breakdown (<h3>): Walk through the 5–7 most important features. For each: what it does, how well it works, any limitations. Be honest — no feature is perfect.
5. Real-World Test Results (<h3>, 200+ words): Describe 2–3 specific tasks you ran through the tool. What was the input? What came out? How long did it take? How did it compare to doing it manually or with a competitor?
6. Who It's Perfect For (<h3>): 3–4 specific user profiles (e.g., "If you're a freelance writer producing 20+ articles a month…"). Be precise — not just "marketers" but which type of marketer and why.
7. Honest Limitations (<h3>, 100+ words): What it genuinely doesn't do well. Every tool has weaknesses — name them directly. This is what readers trust you for.
8. Pricing: Is It Worth It? (<h3>, 100+ words): Break down each tier. What does each unlock? At what usage level does upgrading make sense? Is the free plan genuinely useful or just a teaser?
9. Compared to the Alternatives (<h3>): How does it stack up against 2–3 competitors? When should someone choose a competitor instead?
10. The Verdict (<h3>): Your honest final score out of 10 for different user types. One sentence on who should buy it today and one sentence on who should wait or look elsewhere.

STYLE: Honest, specific, opinionated. Readers want to know if this tool is worth their money — tell them directly.""",
    },
    "pros_cons": {
        "label": "Pros & Cons", "cat": "pros-cons review", "read_time": "7 min",
        "prompt": """Write an HONEST PROS AND CONS review of AT LEAST 1,200 words.

This is the article someone reads when they're almost ready to buy a tool but want an unfiltered take first.

REQUIRED STRUCTURE (do not skip sections):
1. The Stakes Hook (100+ words): Why does getting this decision right matter? Open with a specific story of someone who chose the wrong tool and paid the price — in time, money, or frustration.
2. Quick Snapshot (<h3>): Tool name, what it does in one sentence, current pricing, best-fit user. This is the skimmable overview.
3. The Pros — In Depth (<h3>, 400+ words total across all pros): List 5–7 genuine pros. For each pro:
   - State it as a specific claim, not vague praise (e.g., "Cuts video editing time by 60% for social clips" not "saves time")
   - Explain WHY this is a pro with real detail — feature name, how it works, who benefits
   - Give a concrete example or use case
4. The Cons — In Depth (<h3>, 300+ words total across all cons): List 4–6 genuine cons. For each con:
   - Be specific and honest — this is what readers trust you for
   - Explain the real-world impact of this limitation
   - Note if there's a workaround (and whether it's good enough)
5. Who Should Buy It (<h3>, 100+ words): 3 specific user profiles that will love this tool. Be precise — not "content creators" but "content creators who publish daily short-form video and need..."
6. Who Should Skip It (<h3>, 100+ words): 3 specific user profiles for whom this tool is a bad fit. This takes courage to write — do it honestly.
7. How It Compares (<h3>): Name 2–3 alternatives and one sentence on who should pick each instead.
8. The Bottom Line (<h3>, 100+ words): A direct recommendation. What's the score out of 10? Under what conditions is it worth paying for? What would need to change to make it a 10?

STYLE: Candid and balanced. Equal space to pros and cons. Readers see through puff pieces — be the writer they trust.""",
    },
    "controversial": {
        "label": "Controversy", "cat": "news controversy", "read_time": "7 min",
        "prompt": """Write a CONTROVERSIAL AI TOOLS NEWS article of AT LEAST 1,200 words.

This is the article that tells the truth no one else is saying — the backlash, the failure, the overhyped launch, the lawsuit, the pricing scandal, the data concern, or the industry debate that's dividing professionals.

REQUIRED STRUCTURE (do not skip sections):
1. The Controversy Hook (150+ words): Open hard — state the controversy directly in the first sentence. No easing in. Make the stakes clear: who's affected, how much, and why it matters right now. Use specific numbers or quotes where possible.
2. What Actually Happened (<h3>, 200+ words): A factual, timeline-based breakdown of the controversy. What did the company do or say? When? What was the reaction? Include specific details — dates, pricing changes, policy language, user complaints. No vague summaries.
3. Why People Are Angry — And Are They Right? (<h3>, 200+ words): Present the strongest version of the criticism. What do users, experts, or competitors say? Quote real reactions from forums, social media, or press. Then — critically — evaluate whether the outrage is justified, overstated, or missing the bigger picture.
4. The Company's Side (<h3>, 100+ words): What did the company say in response? Were their explanations credible? This section should be fair — not a PR piece, but not a hit piece either. Readers trust you to be balanced.
5. What This Means for You (<h3>, 150+ words): Practical impact on real users. Should you be worried? Should you switch tools? Should you adjust how you use it? Give specific, actionable guidance — not "wait and see" vagueness.
6. The Bigger Picture (<h3>, 150+ words): Is this an isolated incident or part of a broader trend? What does this controversy reveal about the AI tools industry — pricing practices, data policies, overpromising, quality control? Connect the dots.
7. Alternatives Worth Knowing (<h3>): If readers are reconsidering this tool, what are 2–3 legitimate alternatives? One sentence per tool on why it might be a better fit given the controversy.
8. The Bottom Line (<h3>, 100+ words): Your unfiltered verdict. Is the tool still worth using despite the controversy? Has trust been permanently damaged? What would need to happen for you to change your recommendation?

STYLE: Journalistic and fearless. Name names. Cite specifics. Be fair but not toothless. This is the article that earns trust because it says what others won't.""",
    },
    "roadmap": {
        "label": "AI Roadmap", "cat": "guide roadmap", "read_time": "10 min",
        "prompt": """Write a PROFESSION-SPECIFIC AI TOOLS ROADMAP of AT LEAST 1,200 words.

This is a step-by-step guide for someone in a specific profession who wants to build their AI toolkit intelligently — not all at once, but in the right order.

REQUIRED STRUCTURE (do not skip sections):
1. The Opportunity Hook (150+ words): Paint the picture of what a professional in this field can achieve once their AI toolkit is fully built. Specific numbers: hours saved per week, output multiplied, costs reduced. Make it real and tangible.
2. The Wrong Way to Start (<h3>, 100+ words): The mistake most people make — subscribing to 10 tools at once, picking randomly, or using general-purpose AI when specialized tools exist. Explain why this fails.
3. The Right Framework (<h3>, 100+ words): How to think about building an AI toolkit for this profession. What categories of tools matter? What order should you add them in? Why does sequencing matter?
4. Phase 1 — Foundation (Week 1–2) (<h3>, 200+ words): The 1–2 tools to start with. These are the highest-leverage entry points for this profession. For each tool: what it does, why it's the right starting point, how to set it up quickly, what result to expect in week 1.
5. Phase 2 — Core Stack (Month 1–2) (<h3>, 200+ words): The next 2–3 tools to add once the foundation is working. These deepen capability. Same format — what, why, how, expected result.
6. Phase 3 — Power Stack (Month 3+) (<h3>, 200+ words): Advanced tools for when you're ready to go deeper. These are often more specialized or require more setup. Explain what they unlock that the earlier tools can't do.
7. The Full Stack at a Glance (<h3>): A clean <ul> list of all recommended tools by phase, with one-line descriptions and estimated monthly cost for each.
8. Total Cost & ROI Reality Check (<h3>, 100+ words): What does the full stack cost per month? What does it save in hours? At what point does each phase pay for itself?
9. Common Mistakes at Each Phase (<h3>): One mistake to avoid per phase — with specific consequences if you make it.
10. Your First Week Action Plan (<h3>): Day 1, Day 3, Day 7 — specific actions, not general advice. What exactly should they install, try, and measure in their first week?

STYLE: Sequential and practical. Readers want a clear path — give them phases, not a flat list. Be opinionated about the order.""",
    },
}

# Slot → preferred type order
# All slots rotate through the 5 core content pillars:
#   comparison · featured · pros_cons · roadmap · controversial
SLOT_TYPE_PREFS = {
    "morning":   ["comparison",    "featured",      "pros_cons",   "roadmap",     "controversial"],
    "midday":    ["featured",      "roadmap",       "comparison",  "pros_cons",   "controversial"],
    "afternoon": ["pros_cons",     "comparison",    "featured",    "roadmap",     "controversial"],
    "evening":   ["controversial", "roadmap",       "featured",    "comparison",  "pros_cons"],
    "night":     ["roadmap",       "comparison",    "pros_cons",   "controversial","featured"],
    "latenight": ["controversial", "featured",      "comparison",  "roadmap",     "pros_cons"],
    "exclusive": ["controversial", "roadmap",       "featured",    "comparison",  "pros_cons"],
    # Legacy aliases kept for backward compatibility
    "lunch":     ["comparison",    "featured",      "pros_cons",   "roadmap",     "controversial"],
    "dinner":    ["controversial", "comparison",    "featured",    "pros_cons",   "roadmap"],
}

# ── Varied title format pools (picked randomly so every article looks different) ──
COMPARISON_TITLE_FORMATS = [
    "{a} vs {b}: Which Is Actually Worth It in {year}?",
    "{a} vs {b} ({year}): I Used Both for 30 Days — Here's the Truth",
    "{a} or {b}? The {year} Comparison No One's Being Honest About",
    "{a} vs {b}: Pricing, Features, and Which One Wins for Most Users",
    "Is {b} Finally Better Than {a}? ({year} Head-to-Head)",
    "{a} vs {b}: The Honest Breakdown for {year}",
    "I Switched from {a} to {b} — Here's What Actually Happened",
    "{a} vs {b}: Which AI Tool Should You Pay For in {year}?",
    "{a} or {b}? A Real User's Take After Testing Both",
    "{a} vs {b}: Features, Price, and the Winner for Your Use Case",
    "{a} vs {b} — Stop Guessing. Here's the {year} Verdict.",
    "Choosing Between {a} and {b}? Read This First ({year})",
]


# ── Opening style pool — injected per article to prevent identical hooks ──────
OPENING_STYLES = [
    "Open with a specific dollar amount or hours wasted — quantify the pain before you offer the solution.",
    "Open with a 2-sentence before/after: one sentence on the slow painful old way, one on the fast AI-powered result.",
    "Open with a surprising or counterintuitive finding that challenges what most people assume about this topic.",
    "Open with a direct myth-bust in the first sentence: 'Most people believe X. They're wrong — and it's costing them.'",
    "Open with a concrete before/after contrast: 'Six months ago this took 4 hours. Now it takes 18 minutes.'",
    "Open by naming the exact reader and their exact frustration — ultra-specific, not 'as a professional...'",
    "Open with a one-line story: one sentence setup, one sentence conflict, one sentence that promises resolution.",
    "Open with the conclusion first — state your main finding boldly, then spend the article proving why it's true.",
    "Open with a price shock: 'An agency charges $3,000 for this. With the right AI tools it costs $15 and 40 minutes.'",
    "Open with the single thing that surprised you most when you actually tested these tools.",
    "Open by calling out the #1 mistake people make with this topic — make the reader feel seen for having made it.",
    "Open with a question that puts the reader inside a specific scenario they've definitely lived.",
]

# ── Forbidden phrases — injected into Claude prompt to ban stale AI writing ───
FORBIDDEN_PHRASES = [
    "In today's fast-paced world",
    "In the ever-evolving landscape",
    "Are you looking for",
    "Look no further",
    "game-changer",
    "Leverage the power of",
    "In this article, we will",
    "Without further ado",
    "It goes without saying",
    "At the end of the day",
    "Take your X to the next level",
    "Unlock your potential",
    "Dive deep into",
    "In conclusion",
    "To summarize",
    "cutting-edge",
    "revolutionary",
    "seamlessly",
    "robust solution",
    "harness the power",
    "transformative",
    "streamline your workflow",
    "In the digital age",
]

# ── Expanded title banks ───────────────────────────────────────────────────────
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
        ("Runway", "Descript"),
        ("Motion", "Notion AI"),
        ("Beehiiv", "ConvertKit"),
        ("Apollo.io", "Clay"),
        ("Semrush", "Ahrefs"),
        ("n8n", "Zapier"),
        ("Replit AI", "Cursor"),
        ("Suno", "Udio"),
        ("Canva AI", "Adobe Firefly"),
        ("Instantly AI", "Apollo.io"),
        ("Gamma", "Beautiful.ai"),
        ("OpusClip", "Descript"),
        ("HubSpot AI", "Instantly AI"),
        ("Fireflies.ai", "Otter.ai"),
        ("Leonardo.ai", "Midjourney"),
        ("Windsurf", "Cursor"),
        ("Claude", "ChatGPT"),
        ("Perplexity AI", "Gemini"),
        ("Runway", "Sora"),
        ("AdCreative.ai", "Canva AI"),
        ("Beehiiv", "Mailchimp"),
        ("Notion AI", "Obsidian"),
        ("Groq", "ChatGPT"),
    ],
    "featured": [
        "ChatGPT",
        "Claude",
        "Midjourney",
        "Cursor",
        "ElevenLabs",
        "Perplexity AI",
        "Gemini",
        "GitHub Copilot",
        "Grammarly",
        "Jasper AI",
        "HeyGen",
        "Runway",
        "Notion AI",
        "Zapier",
        "Surfer SEO",
        "Synthesia",
        "CapCut AI",
        "Bolt.new",
        "Gamma",
        "Make.com",
        "Suno",
        "Canva AI",
        "Descript",
        "OpusClip",
        "Fireflies.ai",
        "Writesonic",
        "Leonardo.ai",
        "Adobe Firefly",
        "Motion",
        "Beehiiv",
        "Copy.ai",
        "Windsurf",
        "Lovable",
        "Groq",
        "DeepSeek",
        "NotebookLM",
        "v0 by Vercel",
        "AdCreative.ai",
        "Clay",
        "Instantly AI",
    ],
    "pros_cons": [
        ("ChatGPT", "AI assistant"),
        ("Claude", "AI assistant"),
        ("Midjourney", "image generation"),
        ("Cursor", "AI coding"),
        ("ElevenLabs", "AI voice"),
        ("Jasper AI", "AI writing"),
        ("Perplexity AI", "AI search"),
        ("HeyGen", "AI video avatars"),
        ("Grammarly", "AI writing"),
        ("GitHub Copilot", "AI coding"),
        ("Surfer SEO", "AI SEO"),
        ("Notion AI", "AI productivity"),
        ("Zapier", "AI automation"),
        ("Synthesia", "AI video"),
        ("Runway", "AI video generation"),
        ("Suno", "AI music"),
        ("CapCut AI", "AI video editing"),
        ("Bolt.new", "AI app building"),
        ("Gamma", "AI presentations"),
        ("Descript", "AI audio/video editing"),
        ("OpusClip", "AI video clipping"),
        ("Fireflies.ai", "AI meeting notes"),
        ("Writesonic", "AI writing"),
        ("Make.com", "AI automation"),
        ("Leonardo.ai", "AI image generation"),
        ("Motion", "AI scheduling"),
        ("Beehiiv", "newsletter platform"),
        ("Copy.ai", "AI copywriting"),
        ("Windsurf", "AI coding"),
        ("DeepSeek", "AI assistant"),
        ("NotebookLM", "AI research"),
        ("Adobe Firefly", "AI image generation"),
        ("AdCreative.ai", "AI advertising"),
        ("Clay", "AI sales outreach"),
    ],
    "roadmap": [
        ("Content Creator", "building a full AI content system"),
        ("Freelance Writer", "AI-powered writing and research"),
        ("Marketing Manager", "AI marketing and campaign tools"),
        ("Software Developer", "AI coding and development tools"),
        ("Solopreneur", "replacing an entire team with AI"),
        ("SEO Consultant", "AI SEO and content ranking tools"),
        ("Podcaster", "AI audio, editing, and growth tools"),
        ("YouTuber", "AI video creation and growth tools"),
        ("Social Media Manager", "AI social content and scheduling"),
        ("Startup Founder", "AI tools for a lean early-stage team"),
        ("Freelance Designer", "AI design and creative tools"),
        ("E-commerce Owner", "AI tools for product, marketing, and support"),
        ("Sales Professional", "AI outreach, research, and CRM tools"),
        ("HR Manager", "AI hiring, onboarding, and people tools"),
        ("Educator or Trainer", "AI teaching and course creation tools"),
        ("Real Estate Agent", "AI tools for listings, outreach, and admin"),
        ("Financial Analyst", "AI research, reporting, and data tools"),
        ("Lawyer or Legal Professional", "AI research, drafting, and document tools"),
        ("Healthcare Professional", "AI tools for admin, research, and patient comms"),
        ("Project Manager", "AI planning, reporting, and team tools"),
        ("Consultant", "AI tools for research, decks, and client delivery"),
        ("Researcher or Academic", "AI tools for literature review and writing"),
        ("Customer Support Team", "AI tools for tickets, replies, and helpdesk"),
        ("Journalist or Reporter", "AI tools for research, writing, and fact-checking"),
        ("Musician or Audio Producer", "AI tools for creation, mixing, and distribution"),
    ],
    "controversial": [
        f"The ChatGPT Features That Quietly Disappeared — and Why It Matters in {YEAR}",
        "OpenAI's Pricing Changes Are Angering Power Users. Here's the Full Story.",
        "Is Midjourney Stealing Artists' Work? The Lawsuit That Could Change AI Art Forever",
        "Why Grammarly's AI Upgrade Is Making Writers Trust It Less, Not More",
        f"The Dark Side of AI Writing Tools: What They Don't Tell You About Your Data in {YEAR}",
        "Jasper AI's Pricing Controversy: Users Are Leaving. Here's Why.",
        "Is Perplexity AI Actually Plagiarizing Publishers? The Evidence Is Damning.",
        "The Truth About AI Hallucinations in {YEAR}: Which Tools Lie the Most",
        "Why Notion AI Is Frustrating Power Users — and What They're Switching To",
        "The Hidden Cost of 'Free' AI Tools: What You're Really Giving Up",
        "ElevenLabs Voice Cloning Abuse: Who's Responsible When AI Goes Wrong?",
        "GitHub Copilot vs. Human Developers: The Data That Started a War",
        "Why Zapier's AI Features Feel Like a Cash Grab (And What to Use Instead)",
        f"The AI Tool Subscription Trap: How Companies Hook You and Raise Prices in {YEAR}",
        "Runway vs. Sora: The Video AI War That's Leaving Users in the Middle",
        "The Controversy Behind AI SEO Tools: Are They Actually Hurting Your Rankings?",
        "Adobe Firefly's Copyright Promise: Does It Actually Hold Up?",
        "Why Tech Experts Are Quietly Warning Against Trusting AI Meeting Transcription Tools",
        f"The AI Tools That Overpromised and Underdelivered in {YEAR}",
        "DeepSeek's Data Privacy Scandal: Should You Still Be Using It?",
        "Is Claude Actually Safer Than ChatGPT? The Real Differences Nobody Talks About",
        "The Canva AI Backlash: Designers Are Fed Up. Here's the Full Story.",
        f"AI Tool Lock-In: Why Switching Costs Are Getting Worse in {YEAR}",
        "The Real Reason AI Coding Tools Are Creating More Bugs, Not Fewer",
        "Beehiiv vs. Substack: The Feud That's Splitting the Creator Economy",
    ],
}

def build_title(article_type, log):
    """Build a unique title not used in the last 45 articles."""
    recent = log.get("generated", [])[-45:]
    recent_titles   = {e.get("title", "").lower() for e in recent}
    recent_pairs    = {e.get("pair", "") for e in recent}
    recent_topics   = {e.get("topic", "") for e in recent}

    if article_type == "comparison":
        unused = [
            p for p in TITLE_BANK["comparison"]
            if f"{p[0]} vs {p[1]}" not in recent_pairs
            and p[0].lower() not in " ".join(recent_topics)
        ]
        if not unused:
            unused = TITLE_BANK["comparison"]
        # Prefer pairs where at least one tool is an affiliate partner
        if AFFILIATE_NAMES:
            aff_set = {n.lower() for n in AFFILIATE_NAMES}
            aff_pairs = [p for p in unused
                         if p[0].lower() in aff_set or p[1].lower() in aff_set]
            if aff_pairs:
                unused = aff_pairs
        a, b = random.choice(unused)
        fmt = random.choice(COMPARISON_TITLE_FORMATS)
        return fmt.format(a=a, b=b, year=YEAR)

    if article_type == "featured":
        unused = [
            t for t in TITLE_BANK["featured"]
            if t.lower() not in " ".join(recent_topics)
        ]
        if not unused:
            unused = TITLE_BANK["featured"]
        # Prefer affiliate tools
        if AFFILIATE_NAMES:
            aff_set = {n.lower() for n in AFFILIATE_NAMES}
            aff_picks = [t for t in unused if t.lower() in aff_set]
            if aff_picks:
                unused = aff_picks
        tool = random.choice(unused)
        FEATURED_FORMATS = [
            f"{tool} Review ({YEAR}): Is It Actually Worth Paying For?",
            f"{tool} Deep Dive: The Honest Review No One Else Is Writing",
            f"I Used {tool} Every Day for 30 Days — Here's My Honest Take",
            f"{tool}: Everything You Need to Know Before You Sign Up ({YEAR})",
            f"Is {tool} the Best in Its Category? A Full {YEAR} Review",
            f"{tool} Review: Real Results, Real Pricing, Real Talk",
            f"The {tool} Review That Cuts Through the Hype ({YEAR})",
            f"{tool} in {YEAR}: Still Worth It or Time to Switch?",
        ]
        return random.choice(FEATURED_FORMATS)

    if article_type == "pros_cons":
        unused = [
            p for p in TITLE_BANK["pros_cons"]
            if p[0].lower() not in " ".join(recent_topics)
        ]
        if not unused:
            unused = TITLE_BANK["pros_cons"]
        tool, category = random.choice(unused)
        PROS_CONS_FORMATS = [
            f"{tool} Pros and Cons ({YEAR}): The Unfiltered Truth",
            f"The Real Pros and Cons of {tool} — No Sponsored Opinion",
            f"{tool}: 7 Genuine Pros and 5 Real Cons You Need to Know",
            f"Honest {tool} Review: What It Gets Right and Where It Falls Short",
            f"Is {tool} Worth It? Full Pros, Cons, and Verdict for {YEAR}",
            f"{tool} Pros & Cons: What {category.title()} Users Actually Think",
            f"Before You Subscribe to {tool}, Read This — Pros, Cons, Verdict",
        ]
        return random.choice(PROS_CONS_FORMATS)

    if article_type == "roadmap":
        unused = [
            p for p in TITLE_BANK["roadmap"]
            if p[0].lower() not in " ".join(recent_topics)
        ]
        if not unused:
            unused = TITLE_BANK["roadmap"]
        profession, focus = random.choice(unused)
        ROADMAP_FORMATS = [
            f"The {profession}'s AI Tools Roadmap for {YEAR}: Start Here",
            f"AI Tools for {profession}s: The Exact Stack to Build, Phase by Phase",
            f"If You're a {profession}, This Is the AI Toolkit You Actually Need in {YEAR}",
            f"The {profession} AI Roadmap: Which Tools to Add First (and Why)",
            f"Building Your AI Stack as a {profession}: A Step-by-Step Guide for {YEAR}",
            f"The Complete {profession} AI Toolkit — From Day 1 to Full Automation",
            f"{profession}'s Guide to AI Tools in {YEAR}: What to Use and When",
        ]
        return random.choice(ROADMAP_FORMATS)

    if article_type == "controversial":
        unused = [t for t in TITLE_BANK["controversial"]
                  if t.lower() not in recent_titles]
        if not unused:
            unused = TITLE_BANK["controversial"]
        title = random.choice(unused)
        # Fill in YEAR placeholder if present
        return title.format(YEAR=YEAR) if "{YEAR}" in title else title

    bank  = TITLE_BANK.get(article_type, [])
    unused = [t for t in bank if t.lower() not in recent_titles]
    if not unused:
        unused = bank if bank else [f"The AI Advantage You're Not Using Yet — {DATE_STR}"]
    return random.choice(unused)


def extract_topic(title, article_type):
    """Derive a short topic tag from the title for dedup tracking."""
    clean = re.sub(r"[^\w\s]", "", title.lower())
    words = clean.split()
    stop  = {"the","a","an","and","or","of","for","in","to","vs","how","best",
              "with","your","this","that","what","why","when","is","are","you",
              "we","our","their","its","by","on","at","from","into","about","can",
              "will","have","has","been","get","my","most","all","not","just",
              "use","using","make","build","create","guide","review","ranked",
              "tested","honest","verdict","complete","real","right","wrong","do",
              "does","did","was","were","be","am","s","t","ve","ll","re","d"}
    keywords = [w for w in words if w not in stop and len(w) > 3][:4]
    return " ".join(keywords)


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
    log["generated"] = log["generated"][-60:]   # rolling 60-entry window for article dedup
    # Separate hero_history list — keep last 200 so pick_hero can avoid repeats over many weeks
    hero_history = log.get("hero_history", [])
    if entry.get("hero"):
        hero_history.append(entry["hero"])
    log["hero_history"] = hero_history[-200:]
    LOG_PATH.write_text(json.dumps(log, indent=2, ensure_ascii=False), encoding="utf-8")

def recent_values(log, key, n=8):
    return [e[key] for e in log.get("generated", [])[-n:] if key in e]

def build_recent_summary(log):
    """Build a plain-text summary of the last 10 articles to tell Claude what NOT to repeat."""
    recent = log.get("generated", [])[-10:]
    if not recent:
        return "No previous articles yet."
    lines = []
    for e in recent:
        lines.append(f"  • [{e.get('date','')}] {e.get('title','?')} (type: {e.get('type','?')})")
    return "\n".join(lines)

# ── Pick article type ──────────────────────────────────────────────────────────
def pick_article_type(log):
    recent = recent_values(log, "type", 5)
    for t in SLOT_TYPE_PREFS[SLOT]:
        if t not in recent:
            return t
    return SLOT_TYPE_PREFS[SLOT][0]

# ── Pick source ────────────────────────────────────────────────────────────────
ALL_SOURCES = ["hackernews", "reddit", "devto", "venturebeat", "verge", "techcrunch"]

def pick_source(log):
    recent = recent_values(log, "source", 4)
    available = [s for s in ALL_SOURCES if s not in recent]
    return random.choice(available if available else ALL_SOURCES)

# ── SEO Slug ───────────────────────────────────────────────────────────────────
def title_to_slug(title: str) -> str:
    """Convert an article title to a short, SEO-friendly URL slug.

    Rules:
      • Lowercase letters, digits, and hyphens only
      • Max ~65 chars, always breaks at a word boundary
      • No stop words stripped — Google reads full keyword phrases
    Examples:
      "ChatGPT vs Claude: The Honest 2026 Verdict"
        → chatgpt-vs-claude-the-honest-2026-verdict
      "9 Best AI Writing Tools for Content Creators in 2026 — Ranked and Tested"
        → 9-best-ai-writing-tools-for-content-creators-in-2026-ranked
    """
    s = title.lower()
    s = re.sub(r'[^a-z0-9\s-]', ' ', s)   # keep only safe chars
    s = re.sub(r'[\s-]+', '-', s)           # collapse spaces/hyphens
    s = s.strip('-')
    if len(s) > 65:
        s = s[:65].rsplit('-', 1)[0]        # break cleanly at word boundary
    return s


def get_slug(log, title: str) -> str:
    """Return a unique, SEO-friendly slug derived from the article title.

    Collision strategy: if the same slug already exists in the log or on disk,
    append the date suffix so the URL stays meaningful.
    """
    existing_slugs = {e.get("slug", "") for e in log.get("generated", [])}

    base = title_to_slug(title)
    slug = base

    # Resolve collisions (rare — same title generated twice)
    counter = 2
    while slug in existing_slugs or (ARTICLES_DIR / f"{slug}.html").exists():
        slug = f"{base}-{DATE_SLUG}" if counter == 2 else f"{base}-{DATE_SLUG}-{counter}"
        counter += 1

    return slug


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

def fetch_hackernews(n=8):
    stories, seen = [], set()
    queries = [
        "AI tools LLM GPT Claude Gemini automation",
        "OpenAI Anthropic Google DeepMind AI model release",
        "AI startup tools solopreneur productivity workflow",
        "machine learning AI application product launch",
    ]
    since = int((NOW - timedelta(hours=72)).timestamp())
    for q in queries[:3]:
        try:
            url = (f"https://hn.algolia.com/api/v1/search"
                   f"?query={requests.utils.quote(q)}"
                   f"&tags=story&numericFilters=created_at_i>{since},points>2"
                   f"&hitsPerPage=30")
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

def fetch_reddit(n=8):
    stories = []
    subs = ["artificial", "MachineLearning", "ChatGPT", "singularity", "AItools"]
    for sub in subs[:4]:
        try:
            url = f"https://www.reddit.com/r/{sub}/hot.json?limit=25&t=week"
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

def fetch_devto(n=8):
    stories = []
    tags = ["ai", "artificialintelligence", "machinelearning", "chatgpt", "llm"]
    for tag in tags[:4]:
        try:
            url = f"https://dev.to/api/articles?tag={tag}&per_page=10&top=1"
            items = requests.get(url, headers=HDR, timeout=12).json()
            for item in items:
                t = item.get("title", "")
                if is_ai_story(t) or tag in ("ai", "chatgpt", "llm"):
                    stories.append({
                        "title": t,
                        "url": item.get("url", ""),
                        "points": item.get("positive_reactions_count", 0),
                        "comments": item.get("comments_count", 0),
                        "excerpt": re.sub(r"<[^>]+>", "", item.get("description") or "")[:250],
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

def fetch_rss(source_key, n=8):
    feed_url, label = RSS_FEEDS[source_key]
    stories = []
    try:
        r = requests.get(feed_url, headers=HDR, timeout=15)
        r.raise_for_status()
        root = ET.fromstring(r.content)
        for item in root.findall(".//item")[:25]:
            title_el = item.find("title")
            link_el  = item.find("link")
            desc_el  = item.find("description")
            if not (title_el is not None and link_el is not None):
                continue
            title = re.sub(r"<[^>]+>", "", (title_el.text or "")).strip()
            link  = (link_el.text or "").strip()
            desc  = re.sub(r"<[^>]+>|\s+", " ", (desc_el.text or "")).strip()[:250] if desc_el is not None else ""
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

def ensure_stories(stories, min_n=5):
    """Supplement from multiple sources if primary returned too few."""
    if len(stories) >= min_n:
        return stories
    print(f"[WARN] Only {len(stories)} stories — supplementing", file=sys.stderr)
    seen  = {s["title"] for s in stories}
    extra = [s for s in fetch_hackernews() if s["title"] not in seen]
    result = (stories + extra)
    if len(result) < min_n:
        extra2 = [s for s in fetch_reddit() if s["title"] not in seen]
        result = (result + extra2)
    return result[:max(min_n, 6)]


# ══════════════════════════════════════════════════════════════════════════════
# DEEP RESEARCH — fetches real current data about a specific tool or topic
# so Claude writes about facts, not training-data guesses.
# ══════════════════════════════════════════════════════════════════════════════

def fetch_tool_research(tool_name: str) -> str:
    """
    Pull real, current user opinions and discussions about a specific AI tool
    from Reddit and Hacker News. Returns a research brief Claude uses as the
    factual foundation for featured, pros_cons, and comparison articles.
    """
    snippets = []
    q = tool_name

    # ── Reddit: search across AI-relevant subs ────────────────────────────────
    subs = ["artificial", "ChatGPT", "AItools", "MachineLearning",
            "singularity", "Entrepreneur", "freelance", "productivity"]
    for sub in subs[:5]:
        try:
            url = (f"https://www.reddit.com/r/{sub}/search.json"
                   f"?q={requests.utils.quote(q)}&sort=top&t=month&limit=8&restrict_sr=1")
            data = requests.get(url, headers=HDR, timeout=10).json()
            for child in data.get("data", {}).get("children", [])[:4]:
                p = child.get("data", {})
                post_title = p.get("title", "").strip()
                selftext   = re.sub(r"\s+", " ", p.get("selftext", "")).strip()[:400]
                score      = p.get("score", 0)
                n_comments = p.get("num_comments", 0)
                if post_title and score > 5:
                    line = f'[Reddit r/{sub} | {score} upvotes, {n_comments} comments] "{post_title}"'
                    if selftext and len(selftext) > 30:
                        line += f'\n  → {selftext}'
                    snippets.append(line)
        except Exception as e:
            print(f"[WARN] Reddit research r/{sub}: {e}", file=sys.stderr)

    # ── Hacker News: recent threads ───────────────────────────────────────────
    try:
        since = int((NOW - timedelta(days=90)).timestamp())
        url = (f"https://hn.algolia.com/api/v1/search"
               f"?query={requests.utils.quote(q)}"
               f"&tags=story&numericFilters=created_at_i>{since},points>5"
               f"&hitsPerPage=8")
        hits = requests.get(url, timeout=10).json().get("hits", [])
        for h in hits[:5]:
            post_title = h.get("title", "").strip()
            pts        = h.get("points", 0)
            comments   = h.get("num_comments", 0)
            if post_title:
                snippets.append(
                    f'[Hacker News | {pts} pts, {comments} comments] "{post_title}"'
                )
    except Exception as e:
        print(f"[WARN] HN research: {e}", file=sys.stderr)

    # ── RSS feeds: recent news mentions ───────────────────────────────────────
    for key in ("techcrunch", "verge", "venturebeat"):
        try:
            feed_url, label = RSS_FEEDS[key]
            r = requests.get(feed_url, headers=HDR, timeout=10)
            root = ET.fromstring(r.content)
            for item in root.findall(".//item")[:20]:
                t_el = item.find("title")
                d_el = item.find("description")
                if t_el is None:
                    continue
                t = re.sub(r"<[^>]+>", "", t_el.text or "").strip()
                d = re.sub(r"<[^>]+>|\s+", " ", (d_el.text or "") if d_el is not None else "").strip()[:250]
                if tool_name.lower() in t.lower() or tool_name.lower() in d.lower():
                    snippets.append(f'[{label}] "{t}" — {d}')
        except Exception as e:
            print(f"[WARN] RSS research {key}: {e}", file=sys.stderr)

    if not snippets:
        print(f"[INFO] No research found for '{tool_name}' — Claude will rely on training data.", file=sys.stderr)
        return ""

    print(f"[INFO] Research: {len(snippets)} snippets found for '{tool_name}'", file=sys.stderr)
    research_text = "\n\n".join(snippets[:18])  # cap at 18 to stay within token budget
    return research_text


def fetch_controversy_research(title: str) -> str:
    """
    Pull real current discussions about a controversy topic from Reddit + HN + RSS.
    Extracts the tool or company name from the title and searches for it.
    """
    # Extract key terms: tool names, company names, controversy keywords
    # Pull capitalized words from title as candidate entities
    candidates = re.findall(r'\b([A-Z][a-zA-Z0-9]+(?:\s+[A-Z][a-zA-Z0-9]+)?)\b', title)
    # Also pull known tool names that appear in the title
    known = [t for t in TOOLS if t.lower() in title.lower()]
    queries = list(dict.fromkeys(known + candidates[:3]))  # deduplicated, known tools first

    all_snippets = []
    seen_titles: set = set()
    for q in queries[:3]:
        snippets = fetch_tool_research(q)
        for line in snippets.split("\n\n"):
            line = line.strip()
            first_line = line.split("\n")[0]
            if first_line and first_line not in seen_titles:
                seen_titles.add(first_line)
                all_snippets.append(line)

    return "\n\n".join(all_snippets[:20])


# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE GENERATION
# ══════════════════════════════════════════════════════════════════════════════

def generate_with_claude(stories, article_type, title, log, research: str = ""):
    """Use Anthropic Claude to write a high-quality 1,200+ word article body."""
    try:
        import anthropic
    except ImportError:
        print("[ERROR] 'anthropic' package not installed — Claude cannot run.", file=sys.stderr)
        return None
    if not ANTHROPIC_API_KEY:
        print("[ERROR] ANTHROPIC_API_KEY secret is not set in GitHub — Claude cannot run. "
              "Go to: GitHub repo → Settings → Secrets → Actions → add ANTHROPIC_API_KEY",
              file=sys.stderr)
        return None

    type_cfg       = ARTICLE_TYPES[article_type]
    is_excl        = SLOT == "exclusive"
    recent_summary = build_recent_summary(log)

    # Pick a random opening style — forces variety so no two articles start the same way
    opening_style  = random.choice(OPENING_STYLES)
    forbidden_list = "\n".join(f"  ✗ \"{p}\"" for p in FORBIDDEN_PHRASES)

    # ── Build tools_pick: affiliate tools first, fill with random others ──────
    aff_names_pick = AFFILIATE_NAMES[:12]   # up to 12 partners at the front
    non_aff = [t for t in TOOLS if t not in aff_names_pick]
    filler  = random.sample(non_aff, min(18, len(non_aff)))
    tools_pick = ", ".join(aff_names_pick + filler)

    # ── Affiliate partner instruction (only when partners exist) ──────────────
    aff_note = ""
    if AFFILIATE_NAMES:
        p1_tools = AFFILIATE_NAMES[:8]   # priority-1 pool shown to Claude
        aff_note = (
            "\n\nAFFILIATE PARTNER TOOLS — EDITORIAL REQUIREMENT:\n"
            "MyAI ToolsFinder has content partnerships with the following tools. "
            "Where genuinely relevant to the article topic, naturally include "
            "at least 2–3 of these tools with substantive mentions (not just name-drops). "
            "Treat them with the same honest, editorial voice as all other tools — "
            "never forced, never promotional-sounding:\n"
            f"  {', '.join(p1_tools)}\n"
            "If the article is a comparison or roundup, prefer featuring these tools "
            "as primary subjects where topic fit is strong."
        )

    headlines = "\n".join(
        f"  {i+1}. [{s.get('source_label','?')}] {s['title']}"
        + (f"\n     Excerpt: {s['excerpt'][:180]}" if s.get("excerpt") else "")
        for i, s in enumerate(stories[:7])
    )

    excl_note = ""
    if is_excl:
        excl_note = (
            "\n\nIMPORTANT — EXCLUSIVE SUBSCRIBER CONTENT: "
            "This article is behind a paywall for paying subscribers. "
            "Go significantly deeper than any free article would. Include specific prompts, "
            "real numbers, step-by-step implementation, and insider insights. "
            "Subscribers expect premium depth — deliver it."
        )

    prompt = textwrap.dedent(f"""
        You are the lead writer for MyAI ToolsFinder — an AI tools directory trusted by
        solopreneurs, freelancers, content creators, and professionals who use AI every day.

        TODAY: {DATE_STR}
        ARTICLE TYPE: {article_type.upper()}
        ARTICLE TITLE: {title}

        ⚠️  CRITICAL — TITLE MATCH REQUIREMENT:
        Every section, every example, every recommendation in this article MUST be
        directly and specifically about the EXACT title above. If the title is a
        comparison of two specific tools, write ONLY about those two tools. If it's
        a roundup of a specific category, cover ONLY that category. Never drift off-topic.
        A reader who clicks this title must find exactly what the title promises.
        {excl_note}{aff_note}

        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        CRITICAL REQUIREMENT — READ FIRST:
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        Your article MUST be AT LEAST 1,200 words (1,400+ for exclusive content).
        Short articles will be rejected. Count your words before finishing.
        Every section in the structure below is MANDATORY — do not skip any.

        NON-REPETITION RULE:
        The following articles were recently published — you MUST write about a
        COMPLETELY DIFFERENT angle, topic, or approach. DO NOT repeat any theme,
        example, or key point from these recent articles:
        {recent_summary}

        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        TRENDING CONTEXT (use for grounding and inspiration):
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        {headlines}
{f'''
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        REAL USER RESEARCH — THIS IS YOUR PRIMARY SOURCE MATERIAL:
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        The following is REAL data pulled today from Reddit, Hacker News, and tech press
        about this specific topic. This is what actual users are saying right now.

        YOUR JOB: Use this research as the factual backbone of your article.
        - Reference specific points from these discussions (without naming the source thread)
        - If users praise something, your article should reflect that genuinely
        - If users complain about something, your article must acknowledge it honestly
        - Do NOT ignore this research and write from generic training data instead
        - Do NOT make up pricing, features, or claims that contradict this data

        RESEARCH:
        {research}
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
''' if research else ''}
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        WRITING INSTRUCTIONS FOR THIS ARTICLE TYPE:
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        {type_cfg['prompt']}

        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        OPENING HOOK — USE THIS EXACT APPROACH:
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        {opening_style}
        Your first paragraph must use this opening style. No exceptions.

        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        FORBIDDEN PHRASES — NEVER USE THESE:
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        These phrases are overused AI writing clichés. If any appear in your output,
        the article will be rejected. Do not use them in any form:
{forbidden_list}

        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        STYLE RULES (non-negotiable):
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        - Tone: Conversational, honest, practical. Confident but not arrogant.
        - Voice: Write like a knowledgeable friend, not a marketing brochure.
        - Vary your section headings — do NOT use generic labels like "Introduction",
          "Overview", "Conclusion". Every <h3> should be a specific, interesting claim.
        - Naturally mention 4–8 specific tools where genuinely relevant. Use: {tools_pick}
        - HTML ONLY: use <p>, <h3>, <ul>, <li>, <strong>, <em>, <a href="...">.
        - NEVER use: h1, h2, html, head, body, nav, script, style, or layout tags.
        - Every paragraph must move the reader forward — zero filler sentences.
        - Include at least ONE specific example, case study, or scenario with real detail.
        - Use real pricing where you know it. Estimate ranges where you don't.
        - Be opinionated — readers want recommendations, not "it depends" answers.
        - End with specific next steps, not vague encouragement.

        Return ONLY the article body HTML. No preamble, no markdown, no explanation.
        Start directly with the first <p> tag of the article body.
    """).strip()

    # Model preference order — first available model wins
    # Start with the most cost-effective reliable models.
    # Sonnet gives excellent article quality at ~$0.04/article.
    # Opus is 5-10x more expensive with minimal quality gain for long-form writing.
    MODELS = [
        "claude-3-5-sonnet-20241022",   # Best value — reliable, fast, great writing
        "claude-3-7-sonnet-20250219",   # Newer sonnet if available
        "claude-sonnet-4-5",            # Claude 4 sonnet if available
        "claude-3-5-haiku-20241022",    # Cheaper fallback — still good for articles
        "claude-sonnet-4-0",
        "claude-opus-4-0",              # Expensive — last resort only
    ]
    max_tok = 5000 if is_excl else 4000

    for model in MODELS:
        try:
            client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
            msg = client.messages.create(
                model=model,
                max_tokens=max_tok,
                messages=[{"role": "user", "content": prompt}]
            )
            text = msg.content[0].text.strip()
            word_count = len(re.sub(r"<[^>]+>", " ", text).split())
            print(f"[OK] {model} generated ~{word_count} words ({len(text)} chars)", file=sys.stderr)
            if word_count < 800:
                print(f"[WARN] Article may be too short ({word_count} words)", file=sys.stderr)
            return text
        except Exception as e:
            err_str = str(e)
            if "not_found_error" in err_str or "model" in err_str.lower():
                print(f"[WARN] Model {model} not found, trying next...", file=sys.stderr)
                continue
            print(f"[WARN] Claude API error with {model}: {e}", file=sys.stderr)
            return None

    print(f"[WARN] All Claude models exhausted — falling back to template.", file=sys.stderr)
    return None


def generate_fallback(stories, article_type, title):
    """
    Rich template fallback when Claude API is unavailable.
    Produces a structured, readable article of ~800+ words using story context.
    Title-aware: extracts tool names / category from the title for relevant content.
    """
    type_cfg   = ARTICLE_TYPES[article_type]

    # ── Extract title-relevant tools / topics ─────────────────────────────────
    # For comparison: extract the two tool names from "Tool A vs Tool B: ..."
    t1_from_title, t2_from_title = None, None
    if article_type == "comparison" and " vs " in title.lower():
        raw = re.split(r'\s+vs\s+', title, flags=re.IGNORECASE)[0:2]
        t1_from_title = raw[0].strip()
        t2_from_title = re.split(r'[:\(—]', raw[1])[0].strip() if len(raw) > 1 else None

    # Pick 6 relevant tools — prefer title tools, fill with random others
    title_lower = title.lower()
    matched = [t for t in TOOLS if t.lower() in title_lower]
    filler  = [t for t in TOOLS if t not in matched]
    random.shuffle(filler)
    tools_pick = (matched + filler)[:6]
    while len(tools_pick) < 6:
        tools_pick.append(random.choice(TOOLS))
    t1 = t1_from_title or tools_pick[0]
    t2 = t2_from_title or tools_pick[1]
    t3, t4, t5, t6 = tools_pick[2], tools_pick[3], tools_pick[4], tools_pick[5]

    # Intro paragraph — vary by article type, always references the title
    intros = {
        "comparison": (
            f"<p>Choosing the right AI tool isn't just a preference — it's a business decision "
            f"that affects your output quality, your time, and your monthly bill. This comparison "
            f"breaks down <strong>{t1}</strong> and <strong>{t2}</strong> "
            f"across the dimensions that actually matter to working professionals: real output quality, "
            f"pricing transparency, learning curve, and long-term value. No marketing language — "
            f"just the honest verdict on which one wins for most users in {YEAR}.</p>"
        ),
        "featured": (
            f"<p>There are hundreds of AI tools competing for your attention — and your subscription budget. "
            f"Most reviews tell you what a tool does. This one tells you whether <strong>{t1}</strong> "
            f"is actually worth paying for, who it's genuinely built for, and where it falls short in "
            f"real workflows. We cut through the marketing to give you the honest picture before you commit.</p>"
        ),
        "pros_cons": (
            f"<p>Every AI tool has a marketing page designed to make it sound perfect. Reality is messier. "
            f"<strong>{t1}</strong> has genuine strengths that make it the right choice for certain users — "
            f"and real limitations that make it the wrong choice for others. This breakdown gives you both "
            f"sides with the same level of honesty, so you can make the call for your actual situation.</p>"
        ),
        "roadmap": (
            f"<p>Most professionals build their AI toolkit backwards — they sign up for tools they've "
            f"heard about, add more whenever something goes viral, and end up with overlapping subscriptions "
            f"that don't connect. This roadmap fixes that. It gives you the right tools in the right order, "
            f"built around how your work actually flows, so each tool you add multiplies the value of the "
            f"ones you already have.</p>"
        ),
        "controversial": (
            f"<p>Not every story about AI tools is a success story. Some of the most important things to "
            f"know about the tools you use every day are the things companies would rather you didn't notice "
            f"— pricing changes buried in fine print, features quietly removed, data practices that raise "
            f"real questions. This article covers what's actually happening in the AI tools industry right "
            f"now, and what it means for the people relying on these tools every day.</p>"
        ),
    }

    html = intros.get(article_type, intros["news_digest"]) + "\n\n"

    # Key context from trending stories
    if stories:
        html += f"<h3>What's Happening in AI Right Now</h3>\n"
        html += (f"<p>This article draws on trending developments across the AI space — from community "
                 f"discussions on Hacker News and Reddit to coverage from TechCrunch and VentureBeat. "
                 f"Here's what's shaping the current landscape:</p>\n<ul>\n")
        for s in stories[:5]:
            t   = s.get("title", "")
            url = s.get("url", "")
            src = s.get("source_label", "")
            exc = re.sub(r"<[^>]+>", "", s.get("excerpt", "")).strip()[:120]
            if t:
                link = f'<a href="{url}" target="_blank" rel="noopener">{t}</a>' if url else t
                note = f" — {exc}" if exc else f" (via {src})"
                html += f"<li>{link}{note}</li>\n"
        html += "</ul>\n\n"

    # Main content sections — vary by type
    if article_type in ("comparison",):
        html += (
            f"<h3>How We Evaluated {t1} vs {t2}</h3>\n"
            f"<p>We tested both tools on the same real-world tasks — not cherry-picked demos. "
            f"The four dimensions that matter most: output quality on realistic prompts, "
            f"pricing predictability (no surprise bills), integration with everyday workflows, "
            f"and the learning curve to get consistent results. Both tools have genuine strengths, "
            f"but they win on different dimensions — which is exactly what makes this comparison "
            f"worth doing rather than just picking whichever one you've heard of.</p>\n\n"
            f"<h3>{t1}: Strengths, Weaknesses, and Best Use Cases</h3>\n"
            f"<p><strong>{t1}</strong> has built a strong reputation for consistency and reliability. "
            f"Its core strength is delivering predictable, high-quality output without requiring "
            f"extensive prompt engineering. For anyone producing work at volume — content creators, "
            f"marketers, founders — that reliability compounds quickly into real time savings. "
            f"Pricing is transparent and starts at a level most individuals can justify, "
            f"with team plans that scale reasonably.</p>\n"
            f"<p>The honest limitation: it excels at standard use cases but can feel constrained "
            f"on highly specialized or nuanced tasks. Users doing complex, multi-step reasoning "
            f"sometimes find more headroom in competing tools. That said, for 80% of everyday "
            f"AI work, this is not a meaningful drawback.</p>\n\n"
            f"<h3>{t2}: Strengths, Weaknesses, and Best Use Cases</h3>\n"
            f"<p><strong>{t2}</strong> takes a different architectural approach — it trades some "
            f"out-of-the-box consistency for a higher ceiling on complex tasks. When you know "
            f"exactly what you want and can provide the right context, the output quality is "
            f"consistently impressive. The pricing model is structured differently, which matters "
            f"depending on your usage pattern — heavy daily users often find it more economical "
            f"per output than alternatives.</p>\n"
            f"<p>Where it clearly wins: multi-step reasoning, maintaining context across long "
            f"sessions, and handling specialized domain knowledge. If your work involves nuanced "
            f"tasks — legal drafting, technical writing, complex analysis — this tool's ceiling "
            f"is meaningfully higher than most alternatives.</p>\n\n"
            f"<h3>Head-to-Head: The 5 Dimensions That Actually Matter</h3>\n"
            f"<ul>\n"
            f"<li><strong>Output quality on everyday tasks:</strong> Both deliver strong results. "
            f"{t1} wins on consistency; {t2} wins on ceiling for complex prompts.</li>\n"
            f"<li><strong>Pricing and value:</strong> {t1} is more predictable for occasional users. "
            f"{t2} can be more economical at high volume depending on your use case.</li>\n"
            f"<li><strong>Learning curve:</strong> {t1} is easier to get value from immediately. "
            f"{t2} rewards users who invest time in understanding how to prompt it effectively.</li>\n"
            f"<li><strong>Integrations:</strong> Both have solid API access and third-party integrations. "
            f"Check which tools you already use before assuming either has an edge here.</li>\n"
            f"<li><strong>Speed:</strong> Response times are comparable for most tasks. "
            f"Latency differences become meaningful only at scale or with very long prompts.</li>\n"
            f"</ul>\n\n"
        )
    elif article_type == "featured":
        html += (
            f"<h3>What {t1} Actually Does (Beyond the Marketing Page)</h3>\n"
            f"<p><strong>{t1}</strong> is built around a core promise: doing one specific thing "
            f"significantly better than general-purpose alternatives. In practice, this means the "
            f"tool has a tighter feature set but higher output quality on the tasks it's designed "
            f"for. That's a deliberate trade-off — and whether it works for you depends entirely "
            f"on whether your workflow matches what it's optimized for.</p>\n\n"
            f"<h3>The Feature That Changes How You Work</h3>\n"
            f"<p>Every tool worth reviewing has one feature that makes early adopters evangelical. "
            f"For <strong>{t1}</strong>, it's the combination of speed and output consistency at "
            f"scale. Users report that what previously took 45–90 minutes now runs in under 15 — "
            f"not because the tool cuts corners, but because it eliminates the back-and-forth "
            f"iteration that eats most of the time in manual workflows.</p>\n\n"
            f"<h3>Honest Limitations: Where It Falls Short</h3>\n"
            f"<p>No tool is perfect, and <strong>{t1}</strong> is no exception. The most consistent "
            f"complaint from power users: it handles standard use cases well but struggles with "
            f"highly specialized or context-heavy tasks. The workaround — providing detailed context "
            f"upfront — works, but it adds friction that reduces the time savings in edge cases. "
            f"If your work is mostly standard, this matters less. If you work in niche domains, "
            f"test carefully before committing.</p>\n\n"
            f"<h3>Pricing: Which Tier Actually Makes Sense</h3>\n"
            f"<p>The free tier is a genuine evaluation tool — not just a crippled demo. You can "
            f"get a real sense of the output quality before spending anything. The paid tier unlocks "
            f"higher usage limits, API access, and in most cases a meaningfully higher ceiling on "
            f"what the tool can produce. Whether that upgrade is worth it depends on volume: "
            f"occasional users are fine on free; anyone using it daily should run the numbers on "
            f"whether the paid plan pays for itself in time saved.</p>\n\n"
        )
    elif article_type == "pros_cons":
        html += (
            f"<h3>The Genuine Pros of {t1}</h3>\n"
            f"<ul>\n"
            f"<li><strong>Output quality on core tasks is consistently high.</strong> The tool "
            f"delivers reliable results on the use cases it's designed for — not just in demos "
            f"but in real production workflows.</li>\n"
            f"<li><strong>Pricing is transparent and predictable.</strong> No surprise bills "
            f"or usage spikes that blow your budget. You know what you're paying before you commit.</li>\n"
            f"<li><strong>The learning curve is short.</strong> Most users report being productive "
            f"within the first session. The interface is designed for people who want results, "
            f"not people who want to configure settings.</li>\n"
            f"<li><strong>Integrations with common tools are solid.</strong> It connects to the "
            f"apps most professionals already use — which means you can fit it into your existing "
            f"workflow rather than rebuilding around it.</li>\n"
            f"<li><strong>Updates ship consistently.</strong> The team has a track record of "
            f"improving the product based on user feedback rather than pursuing flashy features "
            f"that look good in press releases.</li>\n"
            f"</ul>\n\n"
            f"<h3>The Real Cons You Need to Know</h3>\n"
            f"<ul>\n"
            f"<li><strong>It struggles with highly specialized inputs.</strong> If your work "
            f"involves niche domain knowledge, you'll need to provide more context than the "
            f"average user — and even then, results are inconsistent.</li>\n"
            f"<li><strong>The free tier has meaningful limits.</strong> You can evaluate the "
            f"tool on free, but you can't run a real workflow on it. The usage caps force a "
            f"paid decision earlier than some users would like.</li>\n"
            f"<li><strong>Support response times vary.</strong> Users on lower-tier plans "
            f"report slower response times when something goes wrong. If you're using this "
            f"in a production workflow, factor this in.</li>\n"
            f"<li><strong>Output can feel formulaic at scale.</strong> Over time, heavy users "
            f"notice patterns in how the tool structures output. This isn't a dealbreaker, but "
            f"it means you'll still need to edit for voice and distinctiveness.</li>\n"
            f"</ul>\n\n"
        )
    elif article_type == "roadmap":
        html += (
            f"<h3>Phase 1 — Foundation (Week 1–2)</h3>\n"
            f"<p>Start with one tool that addresses your single biggest time bottleneck. Don't "
            f"subscribe to five things at once — you won't learn any of them well enough to get "
            f"real value. For most professionals, the highest-leverage starting point is an AI "
            f"assistant like <strong>{t1}</strong> that handles writing, summarizing, and research "
            f"tasks. Get this working in your actual workflow before adding anything else. "
            f"Measure the time saved in week 1. If it's not saving at least 2 hours, adjust "
            f"how you're using it before moving forward.</p>\n\n"
            f"<h3>Phase 2 — Core Stack (Month 1–2)</h3>\n"
            f"<p>Once your foundation tool is embedded in your workflow, add one specialized tool "
            f"that handles a specific task category — something like <strong>{t2}</strong> for "
            f"a focused use case. The rule: only add a new tool when you've hit a clear ceiling "
            f"on what your current stack can do. Adding tools before you've maxed out what you "
            f"have leads to subscription bloat and divided attention. At this phase, your stack "
            f"should cost under $50/month and save 6–10 hours per week.</p>\n\n"
            f"<h3>Phase 3 — Power Stack (Month 3+)</h3>\n"
            f"<p>By month 3, you know your workflow well enough to identify the remaining "
            f"bottlenecks. This is when tools like <strong>{t3}</strong> and "
            f"<strong>{t4}</strong> start making sense — they're more powerful but also more "
            f"complex to set up. The payoff at this phase is automation: tasks that previously "
            f"required your attention start running in the background. A fully built stack "
            f"typically costs $80–150/month and saves 15–25 hours per week.</p>\n\n"
        )
    elif article_type == "controversial":
        html += (
            f"<h3>What Actually Happened — The Timeline</h3>\n"
            f"<p>The story starts with a change most users didn't notice until it affected them "
            f"directly. Companies rarely announce the things that make their products worse or "
            f"more expensive — they bury the details in changelog updates, policy pages, or "
            f"email threads that most users never read. By the time the wider community noticed, "
            f"the change had already been live for weeks.</p>\n\n"
            f"<h3>Why Users Are Frustrated — And Whether They're Right</h3>\n"
            f"<p>The reaction from the user community has been pointed. The core complaint isn't "
            f"just about the specific change — it's about the pattern. When users invest time "
            f"building workflows around a tool, they're making a bet on that tool's stability and "
            f"pricing. Changes that break that bet, even technically justified ones, erode the "
            f"trust that makes the whole ecosystem work. The frustration is understandable. "
            f"Whether it's proportionate depends on how you weigh the specific impact against "
            f"the broader value the tool provides.</p>\n\n"
            f"<h3>What This Means for Your Workflow</h3>\n"
            f"<p>If you're currently using <strong>{t1}</strong> or similar tools as a core part "
            f"of your workflow, the practical question is whether this controversy changes your "
            f"calculus. For most users: probably not immediately. But it's worth reviewing your "
            f"dependency on any single tool and making sure you have alternatives evaluated. "
            f"The professionals who get hurt most by these situations are the ones who never "
            f"stress-tested their stack. The ones who weather them are those who built in "
            f"optionality from the start.</p>\n\n"
        )
    else:
        # Generic but substantive sections for other types
        html += (
            f"<h3>The Tools That Are Delivering Real Results Right Now</h3>\n"
            f"<p>Not every AI tool earns its subscription fee. The ones that consistently show up "
            f"in power users' workflows tend to share a few qualities: they do one thing very well "
            f"rather than trying to do everything adequately, they integrate with the tools you "
            f"already use, and they save time in ways that compound — meaning the more you use them, "
            f"the more efficient your workflow becomes.</p>\n"
            f"<p>Right now, the tools getting the most traction among the solopreneurs and freelancers "
            f"we track include <strong>{t1}</strong> for writing and ideation, "
            f"<strong>{t2}</strong> for structured research, and "
            f"<strong>{t3}</strong> for automating the repetitive parts of creative work. The pattern "
            f"is consistent: people who get the most value pick tools that match a specific bottleneck "
            f"in their workflow, not tools that sound impressive in a demo.</p>\n\n"
            f"<h3>How to Evaluate New AI Tools Without Wasting Your Time</h3>\n"
            f"<p>The AI tools market is noisy. New products launch every week, and many of them are "
            f"genuinely interesting — but interesting and useful are different things. A practical "
            f"evaluation framework: spend 20 minutes on a real task you already need to do, not a "
            f"test prompt. If the output requires less editing than your current approach and takes "
            f"less time, it earns a 30-day trial. If not, move on.</p>\n"
            f"<p>The tools that fail this test most often: ones that are impressive on generic "
            f"prompts but struggle with your specific context. The ones that pass most often: "
            f"tools with a narrow focus, good documentation, and active communities where you can "
            f"learn from people already using them for your exact use case.</p>\n\n"
            f"<h3>What's Actually Worth Paying For</h3>\n"
            f"<p>Free tiers are useful for evaluation, not for production work. The tools worth "
            f"paying for fall into two categories: those that directly produce revenue (by helping "
            f"you create better work faster) and those that save time you can redirect to revenue "
            f"activity. Everything else is a nice-to-have.</p>\n"
            f"<p><strong>{t4}</strong> and <strong>{t5}</strong> consistently earn their place in "
            f"the paid column for most users — not because they're flashy, but because the ROI is "
            f"calculable. You know what you're paying and you can see what you're getting. "
            f"<strong>{t6}</strong> is worth watching if your workflow involves the specific "
            f"problems it solves, but verify before you commit.</p>\n\n"
        )

    # Practical takeaways section (always included)
    html += (
        f"<h3>Three Things to Do This Week</h3>\n"
        f"<ul>\n"
        f"<li><strong>Audit your current stack.</strong> List every AI tool you're paying for. "
        f"For each one, write down the specific workflow it supports. If you can't name it, "
        f"cancel it.</li>\n"
        f"<li><strong>Identify your biggest time bottleneck.</strong> Not a vague category — a "
        f"specific task that takes longer than it should. Then search specifically for AI tools "
        f"that solve that exact problem.</li>\n"
        f"<li><strong>Run a 20-minute trial on one new tool.</strong> Use a real task, not a "
        f"demo prompt. Measure the time and quality of output. Decide whether it earns a "
        f"longer evaluation.</li>\n"
        f"</ul>\n\n"
        f"<h3>The Bottom Line</h3>\n"
        f"<p>The AI tools that deliver lasting value aren't the ones with the most features or "
        f"the most funding — they're the ones that fit cleanly into your specific workflow and "
        f"make a measurable difference to the work you're already doing. The market is noisy, "
        f"but the signal is clear: focus on bottlenecks, measure results, and don't pay for "
        f"tools you can't justify with time saved or quality improved. The rest is just FOMO.</p>\n"
    )

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

    # ── Related articles: pick 3 recent articles from the log (excluding current) ──
    related_html = ""
    try:
        log_data = json.load(open(LOG_PATH, encoding="utf-8"))
        all_entries = [e for e in log_data.get("generated", []) if e.get("slug") and e["slug"] != slug and e.get("title")]
        picks = all_entries[-6:]  # last 6 candidates
        import random as _rnd
        _rnd.shuffle(picks)
        picks = picks[:3]
        if picks:
            items = "\n".join(
                f'    <li><a href="../articles/{e["slug"]}.html" '
                f'style="color:#1a56db;text-decoration:underline;font-size:14px;font-weight:500">'
                f'{e["title"]}</a></li>'
                for e in picks
            )
            related_html = f"""<div class="related-articles" style="margin-top:40px;padding:24px;background:#f0f6ff;border-radius:12px;border:1px solid #c9d9f5">
  <h3 style="font-size:15px;font-weight:700;color:#0d1f3c;margin:0 0 14px;text-transform:uppercase;letter-spacing:.08em">Related Articles</h3>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px">
{items}
  </ul>
</div>"""
    except Exception:
        pass

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SZQYFK19QN"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-SZQYFK19QN');</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} — MyAI ToolsFinder</title>
<meta name="description" content="{re.sub(chr(34),'&quot;',title)} — Practical AI tools guide for solopreneurs, creators and professionals. Updated {DATE_STR}.">
<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{re.sub(chr(34),'&quot;',title)} — Practical AI tools insight from MyAI ToolsFinder. Updated {DATE_STR}.">
<meta property="og:url" content="https://myaitoolsfinder.com/articles/{slug}.html">
<meta property="og:image" content="{hero_url}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="MyAI ToolsFinder">
<meta property="article:published_time" content="{NOW.strftime('%Y-%m-%dT%H:%M:%SZ')}">
<meta property="article:author" content="MyAI ToolsFinder">
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{re.sub(chr(34),'&quot;',title)} — Practical AI tools insight from MyAI ToolsFinder.">
<meta name="twitter:image" content="{hero_url}">
<meta name="twitter:site" content="@myaitoolsfinder">
<!-- Canonical -->
<link rel="canonical" href="https://myaitoolsfinder.com/articles/{slug}.html">
<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{re.sub(chr(34), chr(39), title)}",
  "image": "{hero_url}",
  "datePublished": "{NOW.strftime('%Y-%m-%dT%H:%M:%SZ')}",
  "dateModified": "{NOW.strftime('%Y-%m-%dT%H:%M:%SZ')}",
  "author": {{"@type": "Organization", "name": "MyAI ToolsFinder", "url": "https://myaitoolsfinder.com"}},
  "publisher": {{"@type": "Organization", "name": "MyAI ToolsFinder", "url": "https://myaitoolsfinder.com", "logo": {{"@type": "ImageObject", "url": "https://myaitoolsfinder.com/logo.svg"}}}},
  "mainEntityOfPage": "https://myaitoolsfinder.com/articles/{slug}.html",
  "description": "{re.sub(chr(34), chr(39), title)} — Practical AI tools guide updated {DATE_STR}."
}}
</script>
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
.post-wrap{{max-width:780px;margin:0 auto;padding:88px 20px 80px;}}
.hero-img{{width:100%;height:300px;object-fit:cover;border-radius:16px;margin-bottom:28px;box-shadow:0 8px 28px rgba(26,86,219,.12);}}
.post-eyebrow{{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:{eyebrow_fg};background:{eyebrow_bg};padding:5px 12px;border-radius:999px;margin-bottom:14px;}}
.post-title{{font-size:clamp(24px,4vw,38px);font-weight:800;letter-spacing:-.025em;line-height:1.1;color:var(--text);margin-bottom:16px;}}
.post-meta{{display:flex;align-items:center;gap:14px;font-size:13px;color:var(--text-dim);flex-wrap:wrap;padding-bottom:24px;border-bottom:1px solid var(--border-soft);}}
.post-body{{margin-top:32px;}}
.post-body h3{{font-size:19px;font-weight:700;color:var(--text);margin:36px 0 12px;letter-spacing:-.01em;}}
.post-body p{{font-size:15.5px;color:var(--text-2);line-height:1.9;margin-bottom:20px;}}
.post-body ul{{padding-left:24px;margin-bottom:20px;display:flex;flex-direction:column;gap:10px;}}
.post-body ul li{{font-size:15px;color:var(--text-2);line-height:1.75;}}
.post-body a{{color:var(--primary);text-decoration:underline;text-underline-offset:3px;}}
.post-body strong{{color:var(--text);}}
.post-body em{{color:var(--text-2);font-style:italic;background:var(--primary-light);padding:2px 6px;border-radius:4px;font-size:14px;display:block;margin:10px 0;}}
.sources-box{{margin-top:40px;padding:18px 22px;background:var(--surface);border:1px solid var(--border-soft);border-radius:var(--r);font-size:13px;color:var(--text-dim);}}
.sources-box strong{{display:block;margin-bottom:8px;color:var(--text);font-size:11px;text-transform:uppercase;letter-spacing:.1em;font-weight:700;}}
.sources-box a{{color:var(--primary);font-size:12.5px;}}
.share-row{{display:flex;gap:8px;flex-wrap:wrap;margin-top:28px;padding-top:20px;border-top:1px solid var(--border-soft);}}
.share-btn{{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;border:1.5px solid var(--border);font-size:12.5px;font-weight:600;color:var(--text-2);text-decoration:none;transition:all .15s;}}
.share-btn:hover{{border-color:var(--primary);color:var(--primary);background:var(--primary-light);}}
footer{{background:var(--surface);border-top:1px solid var(--border-soft);padding:32px 20px;text-align:center;font-size:12.5px;color:var(--text-dim);margin-top:60px;}}
footer a{{color:var(--primary);}}
@media(max-width:600px){{nav{{padding:0 16px;}}.nav-links{{display:none;}}.hero-img{{height:200px;}}}}
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
    <img src="{hero_url}" alt="{title}" class="hero-img" loading="eager" onerror="this.onerror=null;this.src='{HERO_FALLBACK_URL}'">
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
    {related_html}
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
  <p>© {YEAR} MyAI ToolsFinder &nbsp;·&nbsp;
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
        <img src="{hero_url}" alt="{title}" loading="lazy" onerror="this.onerror=null;this.src='{HERO_FALLBACK_URL}'">
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
          <img src="{hero_url}" alt="Exclusive" loading="lazy" onerror="this.onerror=null;this.src='{HERO_FALLBACK_URL}'">
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
            grid_tag = '<div class="exclusive-grid" id="exclusive-grid">'
            content  = content.replace(grid_tag, grid_tag + "\n" + card)
    else:
        card = build_regular_card(slug, title, excerpt, hero_url, article_type, date_str)
        marker = "<!-- ARTICLES_INSERT -->"
        if marker in content:
            content = content.replace(marker, marker + "\n" + card)
        else:
            grid_tag = '<div class="art-grid" id="art-grid">'
            content  = content.replace(grid_tag, grid_tag + "\n" + card)

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
    log = load_log()

    # ── Early-exit: already generated this slot today (log-based check) ───────
    # For exclusive slots, determine_slot() already verified count-based need,
    # so we skip the simple name-match guard (it would always fire after the 1st).
    if SLOT != "exclusive":
        already_done = any(
            e.get("date") == DATE_SLUG and e.get("slot") == SLOT
            for e in log.get("generated", [])
        )
        if already_done:
            print(f"[INFO] Already generated '{SLOT}' slot for {DATE_SLUG} — skipping.")
            return

    print(f"[INFO] Slot={SLOT}  Date={DATE_STR}", file=sys.stderr)

    # ── Select type + source ───────────────────────────────────────────────────
    article_type = pick_article_type(log)
    source_name  = pick_source(log)
    print(f"[INFO] Type={article_type}  Source={source_name}", file=sys.stderr)

    # ── Build title FIRST — slug is derived from it for SEO ───────────────────
    title = build_title(article_type, log)
    print(f"[INFO] Title: {title}", file=sys.stderr)

    # ── Generate SEO-friendly slug from title ──────────────────────────────────
    slug        = get_slug(log, title)
    output_path = ARTICLES_DIR / f"{slug}.html"
    print(f"[INFO] Slug: {slug}", file=sys.stderr)

    if output_path.exists():
        print(f"[INFO] Already exists: {slug}.html — skipping.")
        return

    # ── Fetch stories ──────────────────────────────────────────────────────────
    stories = fetch_stories(source_name)
    stories = ensure_stories(stories)

    # ── Deep research — fetch real current data for tool-specific article types ─
    # This gives Claude actual user opinions, pricing data, and recent news
    # instead of writing from stale training-data memory.
    research = ""
    if article_type in ("featured", "pros_cons", "comparison", "controversial"):
        print(f"[INFO] Running deep research for '{title}'...", file=sys.stderr)
        if article_type == "controversial":
            research = fetch_controversy_research(title)
        else:
            # Extract tool name(s) from title for targeted research
            # Comparison: "Tool A vs Tool B: ..." → research both
            if article_type == "comparison" and " vs " in title.lower():
                parts = re.split(r'\s+vs\s+', title, flags=re.IGNORECASE)
                tool_a = parts[0].strip()
                tool_b = re.split(r'[:\(—]', parts[1])[0].strip() if len(parts) > 1 else ""
                r_a = fetch_tool_research(tool_a)
                r_b = fetch_tool_research(tool_b) if tool_b else ""
                research = "\n\n".join(filter(None, [r_a, r_b]))
            else:
                # featured / pros_cons: find the tool name in the title
                matched_tools = [t for t in TOOLS if t.lower() in title.lower()]
                if matched_tools:
                    research = fetch_tool_research(matched_tools[0])
                else:
                    # Try extracting first capitalized multi-word from title
                    m = re.search(r'\b([A-Z][a-zA-Z0-9]+(?:\s+[A-Z][a-zA-Z0-9]+)?)\b', title)
                    if m:
                        research = fetch_tool_research(m.group(1))
        if research:
            print(f"[INFO] Research collected: {len(research)} chars", file=sys.stderr)
        else:
            print(f"[INFO] No research data found — Claude will use training knowledge.", file=sys.stderr)

    # ── Hero image ─────────────────────────────────────────────────────────────
    excl_offset = len([e for e in log.get("generated", [])
                        if e.get("date") == DATE_SLUG and e.get("slot") == "exclusive"])
    # Pass title + log so pick_hero uses title-hash seed (prevents concurrent-run duplication)
    hero_url = pick_hero(title=title, log=log, index_offset=excl_offset)

    # ── Generate body with Claude ──────────────────────────────────────────────
    body_html = generate_with_claude(stories, article_type, title, log, research=research)
    if not body_html:
        # Do NOT fall back to a template — a fake fill-in-the-blank article wastes
        # readers' time and hurts the site's credibility. Skip gracefully instead.
        print("[WARN] Claude generation failed — skipping this slot. No article published.", file=sys.stderr)
        return

    # ── Save article file ──────────────────────────────────────────────────────
    html = build_article_html(slug, title, body_html, stories, hero_url, article_type)
    output_path.write_text(html, encoding="utf-8")
    word_count = len(re.sub(r"<[^>]+>", " ", body_html).split())
    print(f"[OK] Saved: {output_path.name} (~{word_count} words)", file=sys.stderr)

    # ── Extract excerpt for card ───────────────────────────────────────────────
    m = re.search(r"<p>(.*?)</p>", body_html, re.DOTALL)
    raw = re.sub(r"<[^>]+>", "", m.group(1)).strip() if m else title
    excerpt = raw[:160] + ("…" if len(raw) > 160 else "")

    # ── Update articles.html index ─────────────────────────────────────────────
    update_articles_html(slug, title, excerpt, hero_url, article_type)

    # ── Extract comparison pair for dedup ─────────────────────────────────────
    pair = ""
    if article_type == "comparison" and " vs " in title:
        parts = title.split(" vs ")
        pair  = f"{parts[0].strip()} vs {parts[1].split(':')[0].strip()}"

    # ── Detect which affiliate tools were mentioned (for partner audit logs) ──
    body_text_lower = re.sub(r"<[^>]+>", " ", body_html).lower()
    mentioned_partners = [
        n for n in AFFILIATE_NAMES
        if n.lower() in body_text_lower
    ]
    if mentioned_partners:
        print(f"[INFO] Affiliate partners mentioned: {', '.join(mentioned_partners)}", file=sys.stderr)

    # ── Save log (with topic + pair + affiliate mentions for dedup/audit) ─────
    save_log(log, {
        "date":      DATE_SLUG,
        "slot":      SLOT,
        "slug":      slug,
        "title":     title,
        "type":      article_type,
        "source":    source_name,
        "hero":      hero_url,
        "topic":     extract_topic(title, article_type),
        "pair":      pair,
        "words":     word_count,
        "partners":  mentioned_partners,   # [] when no affiliate tools defined
    })
    print("[DONE] All steps complete.", file=sys.stderr)


if __name__ == "__main__":
    main()
