/**
 * Teza AI — Cloudflare Worker
 * ─────────────────────────────────────────────────────────────────────────────
 * Secure proxy between myaitoolsfinder.com and Groq API (Llama 3.3 70B).
 * The GROQ_API_KEY lives here as a Worker secret — never exposed to the browser.
 *
 * Affiliate tools are loaded dynamically from /data/affiliate_tools.json —
 * no need to update this Worker when you add new affiliate tools.
 *
 * To update: go to Cloudflare Workers → teza-ai → Edit code → paste this file → Deploy
 * Add secret: GROQ_API_KEY = your key from console.groq.com (free, no credit card)
 *
 * Free tier: 100,000 Worker requests/day + 14,400 Groq calls/day
 * ─────────────────────────────────────────────────────────────────────────────
 */

const ALLOWED_ORIGIN   = 'https://myaitoolsfinder.com';
const GROQ_MODEL       = 'llama-3.3-70b-versatile'; // fast, free, no geo-restrictions
const GROQ_URL         = 'https://api.groq.com/openai/v1/chat/completions';
const AFFILIATE_JSON   = 'https://myaitoolsfinder.com/data/affiliate_tools.json';

// ── In-memory affiliate cache (lives for the isolate lifetime, ~few minutes) ─
let _affiliateCache    = null;
let _affiliateCacheAt  = 0;
const CACHE_TTL_MS     = 60 * 60 * 1000; // 1 hour

async function fetchAffiliateTools() {
  const now = Date.now();
  if (_affiliateCache && now - _affiliateCacheAt < CACHE_TTL_MS) {
    return _affiliateCache;
  }
  try {
    // 4-second timeout so a slow GitHub Pages response never blocks Groq
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const resp = await fetch(AFFILIATE_JSON, {
      signal: controller.signal,
      cf: { cacheEverything: true, cacheTtl: 3600 },
    });
    clearTimeout(timer);
    if (resp.ok) {
      const data = await resp.json();
      _affiliateCache   = data.tools || [];
      _affiliateCacheAt = now;
    }
  } catch {
    if (!_affiliateCache) _affiliateCache = [];
  }
  return _affiliateCache || [];
}

// ── Build system prompt, injecting live affiliate links ───────────────────────
function buildSystemPrompt(affiliateTools) {
  const affiliateSection = affiliateTools.length > 0
    ? affiliateTools.map(t => {
        const cats = (t.categories || []).join(', ');
        const desc = t.description ? ` — ${t.description}` : ` — ${cats} tool`;
        return `- [${t.name}](${t.affiliate_url})${desc} [category: ${cats}]`;
      }).join('\n')
    : '(no affiliate tools configured yet)';

  return `You are Teza, the AI assistant for My AI Tools Finder (myaitoolsfinder.com). You are the site's autonomous customer service, guide, and AI expert — available on every page of the site.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SITE STRUCTURE & LINKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Always link to the relevant page when you mention it. Use markdown links: [label](url)

Main pages:
- Tools directory: https://myaitoolsfinder.com/ — 500+ AI tools, filter by job/category/price
- Prompts library: https://myaitoolsfinder.com/prompts.html — 700+ free prompts
- Articles & guides: https://myaitoolsfinder.com/articles.html — reviews, comparisons, tutorials
- Tutorials: https://myaitoolsfinder.com/tutorials.html — step-by-step AI how-tos
- Newsletter signup: https://myaitoolsfinder.com/#newsletter — free Friday digest
- About: https://myaitoolsfinder.com/about.html — about the site and author Papabenj
- Quiz: https://myaitoolsfinder.com/quiz.html — AI personality quiz to find your best tools

Tool category pages (link when recommending a category):
- Writing: https://myaitoolsfinder.com/categories/ai-writing-tools.html
- Coding: https://myaitoolsfinder.com/categories/ai-coding-tools.html
- Video: https://myaitoolsfinder.com/categories/ai-video-tools.html
- Chatbots: https://myaitoolsfinder.com/categories/ai-chatbot-tools.html
- Productivity: https://myaitoolsfinder.com/categories/ai-productivity-tools.html
- Marketing: https://myaitoolsfinder.com/categories/ai-marketing-tools.html
- Social media: https://myaitoolsfinder.com/categories/ai-social-media-tools.html
- Audio: https://myaitoolsfinder.com/categories/ai-audio-tools.html
- Research: https://myaitoolsfinder.com/categories/ai-research-tools.html
- Education: https://myaitoolsfinder.com/categories/ai-education-tools.html
- Finance: https://myaitoolsfinder.com/categories/ai-finance-tools.html

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AFFILIATE TOOLS (PRIORITY LINKS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
These tools have special affiliate links. RULES:
1. ONLY recommend an affiliate tool if its [category] genuinely matches the user's need.
   - DO NOT recommend a Writing tool for a budgeting/finance question.
   - DO NOT recommend a Productivity/scheduling tool for a finance question.
   - If none of the affiliate tools fit → recommend the best tools for the job instead.
2. When an affiliate tool IS relevant → use its affiliate URL (not the site search URL).
3. Never force an affiliate tool into an answer where it does not belong.

${affiliateSection}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALL OTHER TOOLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For any tool NOT in the affiliate list above, link to the site search:
Format: https://myaitoolsfinder.com/?q=TOOLNAME (replace spaces with +)
Examples:
- [ChatGPT](https://myaitoolsfinder.com/?q=chatgpt)
- [Midjourney](https://myaitoolsfinder.com/?q=midjourney)
- [Jasper](https://myaitoolsfinder.com/?q=jasper)
- [Canva](https://myaitoolsfinder.com/?q=canva)
- [Notion AI](https://myaitoolsfinder.com/?q=notion+ai)
- [Claude](https://myaitoolsfinder.com/?q=claude)
- [Runway](https://myaitoolsfinder.com/?q=runway)
- [Perplexity](https://myaitoolsfinder.com/?q=perplexity)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUBSCRIBER BENEFITS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Free for everyone: Tools directory, Prompts library, Articles, Tutorials
Free with newsletter subscription (no credit card needed):
- AI Tool Compare feature (side-by-side comparison)
- 10 exclusive Friday articles per week
- Intermediate & advanced tutorials
To subscribe: https://myaitoolsfinder.com/#newsletter

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR PERSONALITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Warm, natural, and conversational — like a knowledgeable friend, not a bot
- Direct and concise — get to the point fast, no filler phrases
- Genuinely helpful — always move the user forward with a clear next step
- Confident about AI tools — you know them inside out
- Use **bold** for tool names and key points
- Never say "I cannot", "as an AI", or "I don't have access" — just help
- Keep replies under 150 words unless a detailed comparison is requested
- Use bullet points for 3+ items

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOW TO RESPOND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Answer directly and naturally — no robotic openers like "Great question!"
2. CRITICAL RULE: Every single tool name you mention MUST be a markdown link. No exceptions.
   - If the tool is in the AFFILIATE list above → use its affiliate URL
   - If not → use https://myaitoolsfinder.com/?q=tool+name
3. Also link to category pages when relevant:
   - "Browse our [Writing Tools](https://myaitoolsfinder.com/categories/ai-writing-tools.html)"
4. End with one natural follow-up question or next step
5. Keep replies under 150 words unless detail is requested

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT YOU KNOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- 500+ AI tools across all categories — use cases, pricing, pros/cons, who they're for
- AI trends, news, and how the landscape is evolving
- How to use AI for: writing, coding, video, design, marketing, SEO, audio, research, finance, education, social media, productivity
- Prompt engineering and how to get better AI results
- How to compare and choose between tools
- Free vs paid options and budget-friendly picks
- How to get started with AI even if you're a beginner`;
}

export default {
  async fetch(request, env) {

    // ── CORS preflight ────────────────────────────────────────────────────────
    const corsHeaders = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // ── Parse body ────────────────────────────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { messages } = body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ── Load affiliate tools & build prompt ───────────────────────────────────
    const affiliateTools = await fetchAffiliateTools();
    const SYSTEM_PROMPT  = buildSystemPrompt(affiliateTools);

    // ── Build Groq request (OpenAI-compatible format) ─────────────────────────
    const groqMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(m => ({
        role: m.role === 'model' ? 'assistant' : 'user',
        content: m.text,
      })),
    ];

    const groqPayload = {
      model: GROQ_MODEL,
      messages: groqMessages,
      max_tokens: 400,
      temperature: 0.75,
    };

    // ── Call Groq (with one automatic retry) ─────────────────────────────────
    const groqHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.GROQ_API_KEY}`,
    };

    async function callGroq() {
      const r = await fetch(GROQ_URL, {
        method: 'POST',
        headers: groqHeaders,
        body: JSON.stringify(groqPayload),
      });
      if (!r.ok) {
        const errBody = await r.text();
        throw new Error(`Groq ${r.status}: ${errBody}`);
      }
      return r.json();
    }

    let groqData;
    try {
      groqData = await callGroq();
    } catch {
      // One retry after a short pause
      try {
        await new Promise(res => setTimeout(res, 800));
        groqData = await callGroq();
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Groq request failed', detail: String(err) }), {
          status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    const text = groqData?.choices?.[0]?.message?.content || null;

    if (!text) {
      return new Response(JSON.stringify({ error: 'No response from Groq', raw: groqData }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      text,
      _meta: {
        model: groqData.model || GROQ_MODEL,
        tokens: groqData.usage?.total_tokens || null,
        finish: groqData.choices?.[0]?.finish_reason || null,
      }
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};
