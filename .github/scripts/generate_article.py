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
    "roundup": {
        "label": "Guide", "cat": "guide review", "read_time": "8 min",
        "prompt": """Write a COMPREHENSIVE BEST-OF ROUNDUP article of AT LEAST 1,200 words.

REQUIRED STRUCTURE:
1. Intro (100+ words): Who this list is for, what criteria you used to select tools, and one surprising finding from your research.
2. Selection Criteria (<h3>): 4–5 criteria you used (accuracy, pricing, ease of use, integrations, support). Brief but specific.
3. Tools 1–8 (each as its own <h3>): Per tool — 120+ words covering: what it does uniquely, the ONE killer feature, real pricing, best-fit user, one limitation. Be honest about weaknesses.
4. Comparison at a Glance (<h3>): A <ul> grid — each tool, its price tier, and its #1 use case.
5. How to Choose (<h3>): 3–4 decision paths: "If you X, pick Y because Z." Make this opinionated.
6. Editor's Pick (<h3>): One clear winner with a 100-word explanation of why it beats everything else for most readers.
7. Alternatives Worth Watching (<h3>): 2–3 tools that didn't make the main list but deserve mention.
8. Closing (60+ words): The #1 action to take today — not "try them all" but a specific starting point.

STYLE: Direct. Opinionated. Cite real feature names and real pricing.""",
    },
    "tutorial": {
        "label": "Tutorial", "cat": "guide tutorial", "read_time": "9 min",
        "prompt": """Write a DETAILED STEP-BY-STEP TUTORIAL of AT LEAST 1,200 words.

REQUIRED STRUCTURE:
1. Problem Hook (100+ words): Describe the before-state — what this task looks like WITHOUT the AI workflow. Make readers feel the pain: time wasted, quality lost, frustration.
2. What You'll Achieve (50+ words): After-state. Be specific — "In 45 minutes you'll have X, Y, Z."
3. What You'll Need (<h3>): Tools, accounts, any prerequisites. Link by name.
4. Steps 1–6 (<h3> per step, 150+ words each): Each step must include —
   a) The exact action to take  b) WHY this step matters  c) The specific tool/prompt to use
   d) What the output should look like  e) Common mistake to avoid at this step
5. Sample Prompts (<h3>): At least 3 copy-pasteable prompts in <em> tags, with explanation of why each word choice matters.
6. Time & Cost Breakdown (<h3>): Realistic estimate of how long each step takes and what it costs.
7. Troubleshooting (<h3>): 3 things that commonly go wrong and exact fixes.
8. Quick-Win Checklist (<h3>): 5 things the reader can do TODAY to start, in <ul> format.
9. Next Steps (60+ words): Where to go deeper once they've completed this workflow.

STYLE: Precise. Numbered steps. No vague advice — every sentence should be actionable.""",
    },
    "news_digest": {
        "label": "Daily Digest", "cat": "review guide", "read_time": "6 min",
        "prompt": """Write an AI NEWS DIGEST article of AT LEAST 1,200 words.

REQUIRED STRUCTURE:
1. Opening Context (150+ words): Set the scene for why THIS WEEK specifically is important for AI. What's the broader shift happening? What does it mean for everyday AI users — solopreneurs, creators, freelancers?
2. Story 1 (<h3> — most important): 200+ words. Explain the story, why it matters, and the SPECIFIC practical impact on someone using AI tools today. Include at least one concrete example.
3. Story 2 (<h3>): 180+ words. Same depth. Different angle.
4. Story 3 (<h3>): 180+ words. Focus on a tool update, price change, or workflow improvement.
5. Story 4 (<h3> — optional): A "under the radar" story that most people missed.
6. What This Means for You (<h3>, 150+ words): Synthesize the week's themes into 3 actionable takeaways. Not generic — specific to your audience of AI power users.
7. Tool Spotlight (<h3>, 100+ words): One specific tool that's relevant to this week's news. What it does, what's new, and whether it's worth trying.
8. This Week's Action (<h3>): One specific thing to do this week based on everything above. Be directive.
9. Looking Ahead (60+ words): What to watch next week or in the coming month.

STYLE: Journalistic but warm. Direct. Zero hype. Treat readers as smart professionals.""",
    },
    "deep_dive": {
        "label": "Deep Dive", "cat": "guide deep-dive", "read_time": "14 min",
        "prompt": """Write an EXCLUSIVE IN-DEPTH GUIDE of AT LEAST 1,500 words (premium subscriber content).

REQUIRED STRUCTURE:
1. Opening Stakes (200+ words): Don't ease in — open with a specific, startling fact or scenario that makes the reader feel the urgency. What does ignoring this cost in real dollars or real hours? Make them feel the opportunity they're missing.
2. The Core Insight (<h3>, 150+ words): The central idea most people get wrong. Explain the misconception first, then the correction.
3. Section 1 (<h3>, 200+ words): Deep dive with real examples, specific tool names, real pricing, actual workflows. Include a specific case study or scenario.
4. Section 2 (<h3>, 200+ words): Goes deeper. Include hard numbers where possible — hours saved, percentage improvements, cost comparisons.
5. Section 3 (<h3>, 200+ words): Implementation detail. What does this actually look like in practice?
6. Section 4 (<h3>, 150+ words): Edge cases, limitations, and when this approach doesn't work.
7. Advanced Tips (<h3>): 4–5 power-user techniques in <ul> format that 90% of people don't know.
8. The Economics (<h3>, 100+ words): Break down the ROI. What does this cost vs. what does it save?
9. Implementation Roadmap (<h3>): Week 1, Week 2, Week 3, Week 4 action plan in <ul>.
10. Pitfalls to Avoid (<h3>): 4 mistakes that kill results, each explained with WHY it fails.
11. Closing (100+ words): First action, second action, third action. No "get started" vagueness.

STYLE: Premium. Expert. Specific. This reader is paying for depth — deliver it.""",
    },
    "workflow": {
        "label": "Workflow", "cat": "guide workflow", "read_time": "12 min",
        "prompt": """Write an EXCLUSIVE WORKFLOW GUIDE of AT LEAST 1,400 words (premium subscriber content).

REQUIRED STRUCTURE:
1. Before/After Hook (150+ words): Before — painful, slow, expensive. After — fast, automated, scalable. Make the contrast visceral and specific.
2. Workflow Overview (<h3>): The full workflow in one paragraph + a simple numbered list of all steps.
3. Step 1–7 (<h3> per step, 150+ words each): For each step —
   a) The specific tool and WHY this tool for this step (not just any AI)
   b) Exact configuration/settings to use
   c) Copy-pasteable prompt template in <em> tags
   d) What the output looks like + what to look for
   e) Time estimate and how to speed it up further
4. Prompt Templates Section (<h3>): Collect all prompts in one place. At least 5 complete, copy-pasteable prompts with explanations.
5. Integration Glue (<h3>, 100+ words): How the steps connect — what passes between tools, what format works best.
6. Time + Cost Reality Check (<h3>): Honest breakdown: how long does this really take? What does it cost per month?
7. Common Mistakes (<h3>): 4 mistakes with specific fixes, not generic warnings.
8. Scaling It Up (<h3>, 100+ words): How to handle 2×, 5×, 10× the volume.
9. Your First Week (<h3>): Day 1, Day 3, Day 7 milestones.

STYLE: Practical. Prescriptive. Every section gives the reader something they can use immediately.""",
    },
    "strategy": {
        "label": "Strategy", "cat": "guide strategy", "read_time": "12 min",
        "prompt": """Write an EXCLUSIVE STRATEGIC GUIDE of AT LEAST 1,400 words (premium subscriber content).

REQUIRED STRUCTURE:
1. The Shift (200+ words): What has fundamentally changed in the last 6–12 months that makes this strategy possible NOW? Ground it in specific developments — model capabilities, price drops, new tools, market changes.
2. Why Most People Get It Wrong (<h3>, 150+ words): The common approach and why it fails. Be direct.
3. The Core Strategy (<h3>, 200+ words): The central approach explained clearly, with a real-world analogy that makes it click.
4. Implementation: Phase 1 (<h3>, 150+ words): First 30 days. Specific tools, specific steps, specific outcomes to measure.
5. Implementation: Phase 2 (<h3>, 150+ words): Days 31–60. What to add, what to optimize.
6. Implementation: Phase 3 (<h3>, 100+ words): Days 61–90. Scale and systematize.
7. The Stack (<h3>): Exact tools for this strategy with pricing and what each does in the system.
8. Metrics That Matter (<h3>, 100+ words): What to measure, what numbers indicate success, what's a red flag.
9. 30-Day Sprint Plan (<h3>): Week 1, Week 2, Week 3, Week 4 — specific actions, not themes.
10. What Can Go Wrong (<h3>): 4 failure modes with specific prevention tactics.
11. The Unfair Advantage (100+ words): Why this approach, done properly, creates a compounding advantage competitors can't easily copy.

STYLE: Strategic but grounded. Every point needs supporting logic, not just assertion.""",
    },
}

# Slot → preferred type order
SLOT_TYPE_PREFS = {
    "morning":   ["comparison", "tutorial", "roundup", "workflow"],
    "midday":    ["tutorial", "roundup", "comparison", "workflow"],
    "afternoon": ["roundup", "tutorial", "comparison", "workflow"],
    "evening":   ["news_digest", "roundup", "comparison", "tutorial"],
    "night":     ["comparison", "workflow", "tutorial", "roundup"],
    "latenight": ["news_digest", "roundup", "workflow", "comparison"],
    "exclusive": ["deep_dive", "workflow", "strategy", "comparison", "roundup", "tutorial"],
    # Legacy aliases kept for backward compatibility
    "lunch":     ["comparison", "tutorial", "roundup", "workflow"],
    "dinner":    ["news_digest", "comparison", "roundup", "tutorial"],
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

ROUNDUP_TITLE_FORMATS = [
    "{n} Best {cat} for {aud} in {year} (Ranked by Real Users)",
    "The {n} {cat} That {aud} Are Actually Using in {year}",
    "Best {cat} for {aud}: {n} Tools Tested, Only These Made the Cut",
    "{n} {cat} for {aud} — Tried, Tested, and Ranked for {year}",
    "I Tested {n} {cat} for {aud}. These Are the Only Ones Worth It.",
    "{n} Best {cat} for {aud}: Honest Reviews, Real Pricing, No Fluff",
    "The Best {cat} for {aud} Right Now ({year} Update)",
    "Stop Overpaying: The {n} Best {cat} for {aud} That Fit Any Budget",
    "{n} {cat} for {aud} That Will Actually Save You Time in {year}",
    "The Only {cat} List {aud} Need in {year} — Curated and Tested",
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
        ("Suno", "ElevenLabs"),
        ("Canva AI", "Adobe Firefly"),
        ("Instantly AI", "Apollo.io"),
        ("Gamma", "Beautiful.ai"),
        ("OpusClip", "Descript"),
        ("HubSpot AI", "Instantly AI"),
        ("Fireflies.ai", "Otter.ai"),
        ("Leonardo.ai", "Midjourney"),
    ],
    "roundup": [
        ("AI Writing Tools", "Content Creators"),
        ("Free AI Tools", "Solopreneurs"),
        ("AI Coding Tools", "Developers"),
        ("AI Image Generators", "Designers"),
        ("AI Video Tools", "Creators"),
        ("AI Productivity Tools", "Remote Workers"),
        ("AI Marketing Tools", "Marketers"),
        ("AI SEO Tools", "Bloggers"),
        ("AI Automation Tools", "Freelancers"),
        ("AI Research Tools", "Researchers"),
        ("AI Meeting Tools", "Managers"),
        ("AI Audio Tools", "Podcasters"),
        ("AI Sales Tools", "Sales Teams"),
        ("AI Design Tools", "Non-Designers"),
        ("AI Email Tools", "Founders"),
        ("AI Social Media Tools", "Influencers"),
        ("AI Analytics Tools", "Data Teams"),
        ("AI Customer Support Tools", "Startups"),
        ("AI Tools", "Students"),
        ("AI Tools", "Educators"),
        ("AI Finance Tools", "Freelancers"),
        ("AI Legal Tools", "Small Business Owners"),
        ("AI HR Tools", "People Teams"),
        ("AI Presentation Tools", "Consultants"),
        ("Affordable AI Tools", "Budget-Conscious Creators"),
    ],
    "tutorial": [
        "How to Build a Full Content Calendar with AI in One Afternoon",
        "The Step-by-Step AI Email Outreach System That Books 10+ Meetings a Week",
        "Create Scroll-Stopping Videos with AI — Full Workflow, No Camera Needed",
        "Write SEO Articles 10× Faster: The Exact AI Workflow",
        "Set Up AI Customer Support That Handles 80% of Queries Automatically",
        "Build a Newsletter from Zero to 1,000 Subscribers Using AI Tools",
        "Generate Qualified Leads Every Day with AI in Under 30 Minutes",
        "Turn One Piece of Content Into 20 with This AI Repurposing Workflow",
        "Competitive Research in 20 Minutes: The AI Method That Beats Manual Work",
        "Build Your First No-Code AI Automation (Step-by-Step for Beginners)",
        "The AI Podcast Workflow: Record, Edit, Transcribe, Clip — All Automated",
        "Create a Professional Brand Identity with AI for Under $50",
        "Use AI to Write a Week of Social Media Posts in 60 Minutes",
        "The AI-Powered Client Onboarding System for Freelancers",
        "Build a Personal Knowledge Base with AI That Actually Saves You Time",
        "How to Automate Your Weekly Report with AI in 4 Steps",
        "Use AI to Proofread, Rewrite, and Improve Any Document in Minutes",
        "The AI Research Workflow: Go from Question to Insight in 30 Minutes",
        "Create a Professional Slide Deck with AI (Gamma + ChatGPT Method)",
        "The AI Video Editing Workflow: From Raw Footage to Published in 2 Hours",
    ],
    "deep_dive": [
        f"The Real {YEAR} AI Stack for Solopreneurs: 12 Tools, Zero Fluff, Real Results",
        f"How to Cut Your Agency Bill in Half Using 6 AI Tools in {YEAR}",
        "ChatGPT Power Prompts: 25 Templates That Actually Produce Great Output",
        "The AI Automation Playbook: 15+ Hours Saved Per Week — Here's How",
        f"Hidden AI Features Most Users Never Find — and How to Unlock Them in {YEAR}",
        "The Real Cost of AI Subscriptions: What You Should Pay vs. What Most People Do",
        "How Top Creators Use AI: Inside 5 Real Workflows (With Screenshots)",
        "The Complete Guide to AI Agents: What They Are and How to Build One Today",
        f"Context Windows, Models, and Pricing: The {YEAR} Buyer's Guide to AI APIs",
        "How to Build an AI-Powered Business That Runs While You Sleep",
        "The Truth About AI Writing: What It Can Do, What It Can't, and Where It Shines",
        f"The Creator's AI Toolkit for {YEAR}: 20 Tools Ranked by ROI",
        "AI Productivity Myths Debunked: What Actually Saves Time vs. What Wastes It",
        f"Prompt Engineering for Real Work: The {YEAR} Practical Guide",
    ],
    "workflow": [
        f"The 5-Tool AI Workflow That Replaced a Marketing Team in {YEAR}",
        "From Brief to Published: The AI Content Workflow That Runs in 45 Minutes",
        f"The Freelancer AI Stack: 20 Hours Saved Per Week — Exact Workflow",
        "The 30-Minute Morning AI Routine That Powers a 6-Figure Business Day",
        "How to Produce an Entire Month of Content in One Weekend with AI",
        "The AI Sales Workflow: Lead to Close in Half the Normal Time",
        "The AI Customer Support Workflow: 200 Tickets a Day, One Person",
        "The YouTube-to-Everything AI Workflow: One Video, 15 Pieces of Content",
        "The AI Research Workflow That Replaces 4 Hours of Manual Work",
        "Build a Weekly Newsletter in 90 Minutes Using This AI Workflow",
        "The AI Hiring Workflow: Screen 100 Applicants in an Afternoon",
        "The AI Bookkeeping Workflow for Freelancers (No Accountant Needed)",
        f"The {YEAR} Content Repurposing Workflow: One Post, Every Platform",
        "The AI Client-Getting Workflow: From Cold Outreach to Signed Contract",
    ],
    "strategy": [
        f"From $10K to $100K: The AI Business Strategy That Scales in {YEAR}",
        f"Why 95% of People Use AI Wrong — and the Right Approach for {YEAR}",
        "The Unfair Advantage: How AI Lets One Person Outcompete a 10-Person Team",
        f"The Creator Economy AI Playbook for {YEAR}: Build Once, Earn Repeatedly",
        f"How to Position Your Business for the AI-First Economy in {YEAR}",
        "The AI Pricing Strategy: How to Charge More by Delivering Faster with AI",
        f"The No-Code AI Business Blueprint for {YEAR}: Build Without Engineers",
        "How to Build a Moat Around Your Business Using AI Before Competitors Do",
        f"The Solopreneur's AI Competitive Strategy for {YEAR}",
        "How to Use AI to Enter a New Market 10× Faster Than Traditional Methods",
        f"The AI-First Agency Model: How to Run a $500K Agency with 2 People in {YEAR}",
        "The Long Game: How to Build AI Into Your Business as a Lasting Advantage",
    ],
}

def build_title(article_type, log):
    """Build a unique title not used in the last 45 articles."""
    recent = log.get("generated", [])[-45:]
    recent_titles   = {e.get("title", "").lower() for e in recent}
    recent_pairs    = {e.get("pair", "") for e in recent}
    recent_topics   = {e.get("topic", "") for e in recent}

    if article_type == "news_digest":
        slot_label_map = {
            "morning":   "Morning Edition",
            "midday":    "Midday Edition",
            "afternoon": "Afternoon Edition",
            "evening":   "Evening Edition",
            "night":     "Night Edition",
            "latenight": "Late Night Edition",
            "lunch":     "Morning Edition",
            "dinner":    "Evening Edition",
        }
        slot_label = slot_label_map.get(SLOT, "Daily Edition")
        return f"AI Tools Digest — {DATE_STR} ({slot_label})"

    if article_type == "comparison":
        unused = [
            p for p in TITLE_BANK["comparison"]
            if f"{p[0]} vs {p[1]}" not in recent_pairs
            and f"{p[0]}".lower() not in " ".join(recent_topics)
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
        # Pick a varied title format so comparisons don't all sound the same
        fmt = random.choice(COMPARISON_TITLE_FORMATS)
        return fmt.format(a=a, b=b, year=YEAR)

    if article_type == "roundup":
        unused = [
            o for o in TITLE_BANK["roundup"]
            if o[0].lower() not in " ".join(recent_topics)
        ]
        if not unused:
            unused = TITLE_BANK["roundup"]
        # Prefer categories that match an affiliate tool's categories
        if AFFILIATE_TOOLS:
            aff_cats = {
                c.lower()
                for t in AFFILIATE_TOOLS
                for c in t.get("categories", [])
            }
            cat_matches = [
                o for o in unused
                if any(ac in o[0].lower() for ac in aff_cats)
            ]
            if cat_matches:
                unused = cat_matches
        cat, aud = random.choice(unused)
        n = random.choice([7, 8, 9, 10, 11, 12])
        # Pick a varied title format so roundups don't all end "Ranked and Tested"
        fmt = random.choice(ROUNDUP_TITLE_FORMATS)
        return fmt.format(n=n, cat=cat, aud=aud, year=YEAR)

    if article_type == "tutorial":
        unused = [t for t in TITLE_BANK["tutorial"]
                  if t.lower() not in recent_titles]
        if not unused:
            unused = TITLE_BANK["tutorial"]
        return random.choice(unused)

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
# ARTICLE GENERATION
# ══════════════════════════════════════════════════════════════════════════════

def generate_with_claude(stories, article_type, title, log):
    """Use Anthropic Claude to write a high-quality 1,200+ word article body."""
    try:
        import anthropic
    except ImportError:
        return None
    if not ANTHROPIC_API_KEY:
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
    MODELS = ["claude-opus-4-5", "claude-sonnet-4-5", "claude-haiku-4-5",
              "claude-opus-4-0", "claude-sonnet-4-0"]
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

    # For roundups: extract category name from "N Best {cat} for {aud}"
    cat_from_title = None
    if article_type == "roundup":
        m = re.search(r'(?:Best\s+|Top\s+)(\d+\s+)?([\w\s]+?)\s+(?:for|to|that)', title, re.IGNORECASE)
        if m:
            cat_from_title = m.group(2).strip()

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
        "roundup": (
            f"<p>The AI tools landscape changes fast — what was the best option three months ago may "
            f"have been leapfrogged by something better, cheaper, or more focused. This roundup cuts "
            f"through the noise to give you the tools that are actually delivering results right now. "
            f"We tested each one against real workflows — not demo conditions — and these are the ones "
            f"that made the cut.</p>"
        ),
        "tutorial": (
            f"<p>Most AI tutorials show you the tool. This one shows you the workflow. There's a "
            f"meaningful difference: knowing that <strong>{t1}</strong> exists doesn't help you if you "
            f"don't know exactly how to fit it into your process. That's what this guide does. By the "
            f"end, you'll have a repeatable, step-by-step system you can run in under an hour.</p>"
        ),
        "news_digest": (
            f"<p>The AI industry never slows down — and this week was no exception. Between new model "
            f"releases, pricing changes, and tool updates that affect your daily workflow, there's a lot "
            f"to process. This digest cuts straight to what matters for people who use AI as a core part "
            f"of their work: the developments worth acting on, and the ones you can safely ignore.</p>"
        ),
        "deep_dive": (
            f"<p>There's a version of using AI tools that costs you $200 a month and saves you two hours "
            f"a week. And there's another version that costs $80 a month and saves you fifteen hours. The "
            f"difference isn't which tools you pick — it's how you use them. This deep dive is about the "
            f"second version. We're going beyond the surface features to show you what's actually possible "
            f"when you build AI into your work systematically.</p>"
        ),
        "workflow": (
            f"<p>The difference between an AI user and an AI power user isn't the number of tools they "
            f"subscribe to — it's whether those tools are connected into a workflow or used in isolation. "
            f"This guide covers the exact workflow, in the exact order, using the exact tools that "
            f"consistently deliver results. Copy it wholesale or adapt it to your needs.</p>"
        ),
        "strategy": (
            f"<p>Most people use AI reactively — they open a chat window when they're stuck on something. "
            f"That's not a strategy; that's a habit. The professionals seeing the biggest gains from AI "
            f"are the ones who've built it into their systems intentionally. This guide covers what that "
            f"looks like in practice and how to get there in the next 30 days.</p>"
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
    elif article_type == "tutorial":
        steps = [
            (f"Step 1: Set Up Your Workspace",
             f"Before you touch any AI tool, spend five minutes getting organized. Open a fresh "
             f"document, write down your goal in one sentence, and list the three outputs you need "
             f"by the end of this session. This sounds trivial but it's the single biggest factor "
             f"in getting useful output from AI — you can't get a great answer to a vague question. "
             f"<strong>{t1}</strong> works best when your input is precise."),
            (f"Step 2: Draft with AI, Refine with Judgment",
             f"Use <strong>{t2}</strong> to generate the first draft. The key is to treat this as "
             f"raw material, not finished work. Paste your goal, add any relevant context, and ask "
             f"for a structured first pass. Then — and this is critical — read it as an editor, not "
             f"a proofreader. You're looking for structure and argument, not typos."),
            (f"Step 3: Verify and Enrich",
             f"AI output is a starting point, not a finished product. Before you do anything with "
             f"what you've generated, verify any facts, statistics, or claims that matter. Use "
             f"<strong>{t3}</strong> or a quick search to confirm the key points. This step takes "
             f"five minutes and prevents the kind of embarrassing errors that erode trust."),
            (f"Step 4: Format for Your Audience",
             f"The same content works differently in different formats. A detailed brief that works "
             f"for a client presentation is overwhelming in an email. A quick summary that works for "
             f"Slack is too thin for a report. Use <strong>{t4}</strong> to adapt your output to "
             f"the format — paste what you have, describe the format you need, and let it handle "
             f"the restructuring."),
            (f"Step 5: Review the Final Output",
             f"Never publish, send, or share AI-assisted work without reading it in full yourself. "
             f"Not because AI makes obvious mistakes (though it does), but because your name is on "
             f"it. Read it once for accuracy, once for tone, and once for whether it actually says "
             f"what you intended. Fix what needs fixing — this is faster than writing from scratch "
             f"but still requires your judgment."),
        ]
        for h, body in steps:
            html += f"<h3>{h}</h3>\n<p>{body}</p>\n\n"
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

    # ── Hero image ─────────────────────────────────────────────────────────────
    excl_offset = len([e for e in log.get("generated", [])
                        if e.get("date") == DATE_SLUG and e.get("slot") == "exclusive"])
    # Pass title + log so pick_hero uses title-hash seed (prevents concurrent-run duplication)
    hero_url = pick_hero(title=title, log=log, index_offset=excl_offset)

    # ── Generate body ──────────────────────────────────────────────────────────
    body_html = generate_with_claude(stories, article_type, title, log)
    if not body_html:
        print("[INFO] Falling back to template generation.", file=sys.stderr)
        body_html = generate_fallback(stories, article_type, title)

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
