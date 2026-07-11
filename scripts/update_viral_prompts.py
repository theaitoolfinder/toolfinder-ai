#!/usr/bin/env python3
"""
Auto-update js/prompts-data.js with fresh trending viral AI prompts.
Runs weekly via GitHub Actions. Calls Claude to generate 10 new prompts,
then surgically replaces only the TRENDING_PROMPTS block in the JS file.
"""

import anthropic
import re
import sys
from datetime import date, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / ".github" / "scripts"))
import usage_tracker

PROMPTS_FILE = "js/prompts-data.js"

TODAY = date.today()
NEXT_FRIDAY = TODAY + timedelta(days=(4 - TODAY.weekday()) % 7 or 7)
TODAY_STR = TODAY.strftime("%B %-d, %Y")
NEXT_FRIDAY_STR = NEXT_FRIDAY.strftime("%B %-d, %Y")

SYSTEM = (
    "You are a social media trend researcher specialising in AI-generated photo prompts. "
    "Your job is to identify the most viral AI image prompts circulating on Instagram, TikTok, "
    "Facebook, and Pinterest right now and write them out in exact JavaScript array format."
)

USER = f"""
Today is {TODAY_STR}. Generate the Top 10 most viral AI photo prompts trending THIS WEEK
on Instagram, TikTok, Facebook, and Pinterest.

Focus on prompts that transform the user's own photo (portrait/selfie) into something new —
e.g. cartoon character, action figure, art style, magazine cover, etc.
Avoid generic text-to-image prompts. These must work with ChatGPT's image feature.

Return ONLY the JavaScript array literal below — no markdown, no explanation, no extra text.
Start directly with `[` and end with `];`

Each item must follow this exact structure:
  {{
    rank: <1-10>,
    title: "<short catchy name>",
    tag: "<emoji + label like '🔥 #1 Trending' or '🎨 Viral'>",
    platforms: [<array of "Instagram","TikTok","Facebook","Pinterest" — 2-3 that apply>],
    tool: "ChatGPT",
    toolDomain: "chat.openai.com",
    shares: "<estimated viral reach like '3.2M+'>",
    trendScore: <integer 70-99, decreasing by rank>,
    category: "<one of: Image Generation | Photo Editing | Illustrated / Art | Sticker / Chibi>",
    tip: "<one practical tip for getting the best result, under 20 words>",
    prompt: `<the full ChatGPT prompt the user would paste — detailed, vivid, 80-150 words>`
  }}

Rules:
- Rank 1 must be the #1 trending prompt right now (highest trendScore ≥ 97)
- Keep prompts varied across different styles and categories
- Prompts must instruct ChatGPT to use the user's uploaded photo
- Use backtick template literals for the prompt field
- All strings use double quotes except the prompt field which uses backticks
- trendScore must decrease from rank 1 to 10 (no ties)
- shares should feel realistic based on typical viral reach

Output only the array. Nothing else.
"""


def generate_prompts(client: anthropic.Anthropic) -> str:
    response = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=4096,
        system=SYSTEM,
        messages=[{"role": "user", "content": USER}],
    )
    usage_tracker.record_usage("update_viral_prompts", "claude-haiku-4-5",
                                response.usage.input_tokens, response.usage.output_tokens)
    # Extract only text blocks (skip thinking blocks)
    text_parts = [b.text for b in response.content if b.type == "text"]
    return "\n".join(text_parts).strip()


def patch_prompts_file(new_array: str) -> None:
    with open(PROMPTS_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    header = (
        f"/* ============================================================\n"
        f"   TRENDING VIRAL PROMPTS — Updated weekly\n"
        f"   Top 10 most shared AI prompts on Instagram, TikTok, Facebook\n"
        f"   Last updated: {TODAY_STR} · Next update: {NEXT_FRIDAY_STR}\n"
        f"   ============================================================ */\n"
        f"window.TRENDING_PROMPTS = {new_array}"
    )

    # Replace from the comment block through the closing ]; of TRENDING_PROMPTS
    pattern = re.compile(
        r"/\* =+\s+TRENDING VIRAL PROMPTS.*?window\.TRENDING_PROMPTS\s*=\s*\[.*?\];",
        re.DOTALL,
    )

    if not pattern.search(content):
        print("ERROR: Could not find TRENDING_PROMPTS block in file.", file=sys.stderr)
        sys.exit(1)

    updated = pattern.sub(header, content, count=1)

    with open(PROMPTS_FILE, "w", encoding="utf-8") as f:
        f.write(updated)

    print(f"Updated {PROMPTS_FILE} with fresh trending prompts for {TODAY_STR}.")


def main():
    client = anthropic.Anthropic()
    print("Calling Claude to generate fresh viral prompts...")
    new_array = generate_prompts(client)

    # Basic sanity check — must look like a JS array
    if not new_array.startswith("[") or not new_array.rstrip().endswith("];"):
        # Try to add the closing if Claude forgot it
        if new_array.startswith("[") and not new_array.rstrip().endswith("];"):
            new_array = new_array.rstrip()
            if not new_array.endswith(";"):
                new_array += ";"
            print("Warning: added missing semicolon to array.")
        else:
            print("ERROR: Claude returned unexpected format:\n", new_array[:200], file=sys.stderr)
            sys.exit(1)

    patch_prompts_file(new_array)


if __name__ == "__main__":
    main()
