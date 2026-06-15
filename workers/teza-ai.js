/**
 * Teza AI — Cloudflare Worker
 * ─────────────────────────────────────────────────────────────────────────────
 * Secure proxy between myaitoolsfinder.com and Google Gemini API.
 * The GEMINI_API_KEY lives here as a Worker secret — never exposed to the browser.
 *
 * To update: go to Cloudflare Workers → teza-ai → Edit code → paste this file → Deploy
 * Secret GEMINI_API_KEY is already saved — no need to re-add it.
 *
 * Free tier: 100,000 Worker requests/day + 1,500 Gemini calls/day
 * ─────────────────────────────────────────────────────────────────────────────
 */

const ALLOWED_ORIGIN = 'https://myaitoolsfinder.com';
const GEMINI_MODEL   = 'gemini-2.5-flash-lite';
const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `You are Teza, the AI assistant for My AI Tools Finder (myaitoolsfinder.com). You are the site's autonomous customer service, guide, and AI expert — available on every page of the site.

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

Tool search links — use these to link to specific tools in the directory:
Format: https://myaitoolsfinder.com/?q=TOOLNAME (replace spaces with +)
Examples:
- ChatGPT → https://myaitoolsfinder.com/?q=chatgpt
- Midjourney → https://myaitoolsfinder.com/?q=midjourney
- Jasper → https://myaitoolsfinder.com/?q=jasper
- Canva → https://myaitoolsfinder.com/?q=canva
- Notion AI → https://myaitoolsfinder.com/?q=notion+ai
- Claude → https://myaitoolsfinder.com/?q=claude
- Runway → https://myaitoolsfinder.com/?q=runway
- ElevenLabs → https://myaitoolsfinder.com/?q=elevenlabs
- Perplexity → https://myaitoolsfinder.com/?q=perplexity
- Copy.ai → https://myaitoolsfinder.com/?q=copy.ai

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
2. Recommend specific tools with links when helpful
3. Always link to a category page or tool search — never send users away from the site
4. End with one natural follow-up question or next step
5. When recommending tools, link like this:
   - "Try [Jasper](https://myaitoolsfinder.com/?q=jasper) for long-form content"
   - "Browse our [Writing Tools](https://myaitoolsfinder.com/categories/ai-writing-tools.html)"
   - "You can compare them using our [Compare feature](https://myaitoolsfinder.com/)"

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

    // ── Build Gemini request ──────────────────────────────────────────────────
    const contents = messages.map(m => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const geminiPayload = {
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.75,
        topP: 0.9,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
      ],
    };

    // ── Call Gemini ───────────────────────────────────────────────────────────
    let geminiResp;
    try {
      geminiResp = await fetch(`${GEMINI_URL}?key=${env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiPayload),
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Gemini request failed', detail: String(err) }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const geminiData = await geminiResp.json();
    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || null;

    if (!text) {
      return new Response(JSON.stringify({ error: 'No response from Gemini', raw: geminiData }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};
