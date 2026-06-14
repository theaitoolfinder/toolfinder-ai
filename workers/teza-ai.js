/**
 * Teza AI — Cloudflare Worker
 * ─────────────────────────────────────────────────────────────────────────────
 * Secure proxy between myaitoolsfinder.com and Google Gemini API.
 * The GEMINI_API_KEY lives here as a Worker secret — never exposed to the browser.
 *
 * Deploy steps:
 *   1. Go to https://workers.cloudflare.com → Create Worker → paste this file
 *   2. Settings → Variables → Add secret: GEMINI_API_KEY = (your key from aistudio.google.com)
 *   3. Copy your worker URL (e.g. https://teza-ai.YOUR-NAME.workers.dev)
 *   4. Paste that URL into chatbot.js → TEZA_WORKER_URL
 *
 * Free tier: 100,000 requests/day (more than enough)
 * ─────────────────────────────────────────────────────────────────────────────
 */

const ALLOWED_ORIGIN = 'https://myaitoolsfinder.com';
const GEMINI_MODEL   = 'gemini-2.5-flash-lite';   // fastest free model
const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `You are Teza, the friendly AI assistant for My AI Tools Finder (myaitoolsfinder.com).

ABOUT THE SITE:
- Free directory of 500+ curated AI tools for solopreneurs, freelancers and creators
- Tools are organized by category (Writing, Coding, Video, Design, SEO, Marketing, Productivity, Audio, Research, Finance, Education, Social Media, Chatbots, and more)
- Also has: 700+ free prompts library, weekly AI newsletter (Fridays), exclusive articles for subscribers, AI tool comparison feature, tutorials
- Subscriber benefits are free — just an email, no credit card

YOUR PERSONALITY:
- Warm, concise, and genuinely helpful — like a knowledgeable friend
- Get to the point fast — this is a chat widget, not a blog post
- Use **bold** for tool names and key points
- Never say "I cannot" or "I don't have access" — you know a lot about AI tools
- If you don't know something specific, guide them to the right page on the site

WHAT YOU HELP WITH:
- Recommending AI tools for specific tasks, jobs, or budgets
- Comparing AI tools honestly (pros, cons, who it's for)
- Explaining what AI tools do and whether they're worth paying for
- Answering questions about AI in general
- Helping visitors navigate the site

WHAT YOU DON'T DO:
- Make up tools that don't exist
- Give financial or medical advice
- Write full articles or long essays in chat
- Pretend to have real-time internet access

RESPONSE STYLE:
- Keep replies under 120 words unless a detailed comparison is asked
- Use bullet points for lists of 3+ items
- End with a follow-up question or action when helpful
- Link to site pages when relevant: / for tools, /prompts.html for prompts, /articles.html for guides`;

export default {
  async fetch(request, env) {

    // ── CORS preflight ────────────────────────────────────────────────────────
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // ── Only allow POST from the site ─────────────────────────────────────────
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // ── Parse request body ────────────────────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { messages } = body; // array of { role: 'user'|'model', text: string }
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
        maxOutputTokens: 300,
        temperature: 0.7,
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

    // ── Extract text from response ────────────────────────────────────────────
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
