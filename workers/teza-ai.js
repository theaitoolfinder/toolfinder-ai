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
// Preferred models, best first. Groq retires models without notice (the
// previous single hard-coded model started returning 404 model_not_found and
// took the whole chatbot down), so the Worker walks this list and, if none
// work, asks Groq which models are currently available — see pickModel().
const GROQ_MODELS      = [
  'openai/gpt-oss-120b',
  'llama-3.3-70b-versatile',
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'qwen/qwen3-32b',
  'openai/gpt-oss-20b',
  'llama-3.1-8b-instant',
];
const GROQ_MODEL       = GROQ_MODELS[0];
const GROQ_URL         = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODELS_URL  = 'https://api.groq.com/openai/v1/models';
const NON_CHAT_RE      = /whisper|guard|tts|embed|prompt-guard|safeguard|distil-whisper|orpheus/i;

let _workingModel = null; // remembered for the isolate's lifetime once one succeeds
const AFFILIATE_JSON   = 'https://myaitoolsfinder.com/data/affiliate_tools.json';

// ── In-memory affiliate cache (lives for the isolate lifetime, ~few minutes) ─
let _affiliateCache    = null;
let _affiliateCacheAt  = 0;
const CACHE_TTL_MS     = 60 * 60 * 1000; // 1 hour


// ── Link safety net ─────────────────────────────────────────────────────────
// The model sometimes invents URLs (e.g. ?q= search links, or category pages
// that don't exist). Before a reply leaves the Worker, every myaitoolsfinder.com
// link is checked against the live sitemap: valid → kept, a tool search link →
// rewritten to that tool's page, anything else → plain bold text (no dead link).
const SITEMAP_URL      = 'https://myaitoolsfinder.com/sitemap.xml';
const SITE_STATIC      = ['prompts.html','articles.html','tutorials.html','about.html','quiz.html','academy.html','badge.html','privacy.html','terms.html'];
const CATEGORY_ALIAS   = { 'ai-automation-tools': 'ai-productivity-tools', 'ai-no-code-tools': 'ai-productivity-tools', 'ai-image-tools': 'ai-design-tools', 'ai-sales-tools': 'ai-marketing-tools' };
let _sitePaths = null, _sitePathsAt = 0;

async function getSitePaths() {
  const now = Date.now();
  if (_sitePaths && now - _sitePathsAt < CACHE_TTL_MS) return _sitePaths;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const resp = await fetch(SITEMAP_URL, { signal: controller.signal, cf: { cacheEverything: true, cacheTtl: 3600 } });
    clearTimeout(timer);
    if (resp.ok) {
      const xml = await resp.text();
      const set = new Set(SITE_STATIC);
      for (const m of xml.matchAll(/<loc>https?:\/\/(?:www\.)?myaitoolsfinder\.com\/([^<]+)<\/loc>/g)) set.add(m[1].trim());
      if (set.size > 50) { _sitePaths = set; _sitePathsAt = now; return set; }
    }
  } catch { /* fall through to stale cache / null */ }
  return _sitePaths; // may be null → fixLinks() then leaves links untouched
}

function slugify(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }

function matchToolSlug(query, label, slugs) {
  const set = new Set(slugs);
  const cands = [slugify(query), slugify(label)].filter(Boolean);
  for (const c of cands) { if (set.has(c)) return c; if (set.has(c + '-ai')) return c + '-ai'; }
  for (const c of cands) {
    if (c.length < 3) continue;
    const hit = slugs.find(sl => sl === c || sl.startsWith(c + '-'));
    if (hit) return hit;
  }
  return null;
}

async function fixLinks(text) {
  const paths = await getSitePaths();
  if (!paths) return text;
  const toolSlugs = [...paths].filter(p => p.startsWith('tools/') && p.endsWith('.html')).map(p => p.slice(6, -5));
  return text.replace(/\[([^\]]+)\]\((https?:\/\/(?:www\.)?myaitoolsfinder\.com[^)\s]*)\)/g, (m, label, url) => {
    let u;
    try { u = new URL(url); } catch { return `**${label}**`; }
    const path = u.pathname.replace(/^\/+/, '');
    if (path === '') {                       // homepage
      const q = u.searchParams.get('q');
      if (!q) return m;                      // plain homepage or #newsletter etc.
      const slug = matchToolSlug(q, label, toolSlugs);
      return slug ? `[${label}](https://myaitoolsfinder.com/tools/${slug}.html)` : `**${label}**`;
    }
    if (paths.has(path)) return m;           // real page
    const cat = path.match(/^categories\/(.+)\.html$/);
    if (cat && CATEGORY_ALIAS[cat[1]] && paths.has(`categories/${CATEGORY_ALIAS[cat[1]]}.html`)) {
      return `[${label}](https://myaitoolsfinder.com/categories/${CATEGORY_ALIAS[cat[1]]}.html)`;
    }
    const tool = path.match(/^tools\/(.+)\.html$/);
    if (tool) {
      const slug = matchToolSlug(tool[1], label, toolSlugs);
      if (slug) return `[${label}](https://myaitoolsfinder.com/tools/${slug}.html)`;
    }
    return `**${label}**`;                   // unknown page → no dead link
  });
}

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
For any tool NOT in the affiliate list above, link to that tool's own page on this site:
Format: https://myaitoolsfinder.com/tools/SLUG.html  (SLUG = tool name in lowercase, spaces and symbols become hyphens)
Examples:
- [ChatGPT](https://myaitoolsfinder.com/tools/chatgpt.html)
- [Midjourney](https://myaitoolsfinder.com/tools/midjourney.html)
- [Notion AI](https://myaitoolsfinder.com/tools/notion-ai.html)
- [Perplexity AI](https://myaitoolsfinder.com/tools/perplexity-ai.html)
LINK RULES (important):
- NEVER invent a URL. NEVER use "?q=" search links — they do not work.
- Only link category pages from the list above. There is NO "automation" category: for automation or no-code, use the Productivity category.
- If you are not sure a tool's page exists, write its name in bold with no link.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUBSCRIBER BENEFITS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Free for everyone: Tools directory, Prompts library, Articles, Tutorials
Free with newsletter subscription (no credit card needed):
- AI Tool Compare feature (side-by-side comparison)
- 1 exclusive Friday deep-dive per week
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

    // ── Call Groq with model fallback ────────────────────────────────────────
    const groqHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.GROQ_API_KEY}`,
    };

    async function callGroqWith(model) {
      const r = await fetch(GROQ_URL, {
        method: 'POST',
        headers: groqHeaders,
        body: JSON.stringify({ model, messages: groqMessages, max_tokens: 400, temperature: 0.75 }),
      });
      if (!r.ok) {
        const errBody = await r.text();
        const err = new Error(`Groq ${r.status}: ${errBody}`);
        err.status = r.status;
        err.modelGone = r.status === 404 || r.status === 400 && /decommission|model_not_found|not exist|no longer supported/i.test(errBody);
        throw err;
      }
      return r.json();
    }

    // Ask Groq which chat models exist right now (used only when the
    // preferred list is exhausted), preferring bigger/newer-looking names.
    async function discoverModels() {
      try {
        const r = await fetch(GROQ_MODELS_URL, { headers: groqHeaders });
        if (!r.ok) return [];
        const j = await r.json();
        return (j.data || []).map(m => m.id).filter(id => id && !NON_CHAT_RE.test(id));
      } catch { return []; }
    }

    let groqData = null;
    let lastErr = null;
    const tried = new Set();
    const candidates = _workingModel ? [_workingModel, ...GROQ_MODELS] : [...GROQ_MODELS];

    async function tryModels(list) {
      for (const model of list) {
        if (tried.has(model)) continue;
        tried.add(model);
        try {
          groqData = await callGroqWith(model);
          _workingModel = model;
          return true;
        } catch (e) {
          lastErr = e;
          if (e.modelGone) continue;                       // model retired → next one
          if (e.status === 429 || e.status >= 500) {        // transient → one short retry on same model
            try {
              await new Promise(res => setTimeout(res, 800));
              groqData = await callGroqWith(model);
              _workingModel = model;
              return true;
            } catch (e2) { lastErr = e2; if (!e2.modelGone) continue; }
          }
        }
      }
      return false;
    }

    let ok = await tryModels(candidates);
    if (!ok) ok = await tryModels(await discoverModels());

    if (!ok) {
      return new Response(JSON.stringify({ error: 'Groq request failed', detail: String(lastErr), tried: [...tried] }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    let text = groqData?.choices?.[0]?.message?.content || null;
    if (text) text = await fixLinks(text);

    if (!text) {
      return new Response(JSON.stringify({ error: 'No response from Groq', raw: groqData }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      text,
      _meta: {
        model: groqData.model || _workingModel || GROQ_MODEL,
        tokens: groqData.usage?.total_tokens || null,
        finish: groqData.choices?.[0]?.finish_reason || null,
      }
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};
