/**
 * Admin Auth — Cloudflare Worker
 * ─────────────────────────────────────────────────────────────────────────────
 * Checks the 6-digit code from Google Authenticator (TOTP, RFC 6238) for the
 * admin page. The secret key lives ONLY here as a Worker secret — never in the
 * public website. On a correct code it returns a short-lived signed session
 * token (8 hours).
 *
 * DEPLOY (same as the Teza chatbot Worker):
 *   1. Cloudflare → Workers & Pages → Create → "Hello World" Worker.
 *      Name it exactly:  admin-auth   → Deploy → Edit code → paste this file → Deploy.
 *   2. Worker → Settings → Variables and Secrets → add TWO secrets (type: Secret):
 *        TOTP_SECRET     the base32 key from your admin-2fa-setup.txt file
 *        SESSION_SECRET  the long hex string from the same file
 *   3. Done. Test:  open the Worker URL in a browser → it shows {"ok":true}.
 *
 * Endpoints (all JSON):
 *   GET  /          health check
 *   POST /          { "code": "123456" }  → { ok, token, exp }  |  401 wrong  |  429 too many tries
 *   POST /verify    { "token": "..." }    → { ok: true|false }
 */

const ALLOWED_ORIGINS = ['https://myaitoolsfinder.com', 'https://www.myaitoolsfinder.com'];
const SESSION_HOURS   = 8;
const MAX_FAILS       = 5;                 // wrong codes allowed per IP …
const FAIL_WINDOW_MS  = 10 * 60 * 1000;    // … per 10 minutes

const fails = new Map();   // ip -> { n, t }   (per Worker instance; resets on redeploy)
let lastStepUsed = -1;     // a code can only be used once (blocks replay of a sniffed code)

// ── helpers ──────────────────────────────────────────────────────────────────
function cors(origin) {
  const ok = ALLOWED_ORIGINS.includes(origin);
  return {
    'Access-Control-Allow-Origin': ok ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}
const json = (obj, status, headers) =>
  new Response(JSON.stringify(obj), { status, headers: { ...headers, 'Content-Type': 'application/json' } });

function b32decode(s) {
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  s = String(s || '').replace(/=+$/, '').replace(/\s+/g, '').toUpperCase();
  let bits = '';
  for (const c of s) {
    const v = A.indexOf(c);
    if (v < 0) throw new Error('bad base32');
    bits += v.toString(2).padStart(5, '0');
  }
  const out = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < out.length; i++) out[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
  return out;
}

async function hotp(keyBytes, counter) {
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
  const buf = new ArrayBuffer(8);
  const dv = new DataView(buf);
  dv.setUint32(0, Math.floor(counter / 2 ** 32));
  dv.setUint32(4, counter >>> 0);
  const h = new Uint8Array(await crypto.subtle.sign('HMAC', key, buf));
  const off = h[19] & 0xf;
  const bin = ((h[off] & 0x7f) << 24) | (h[off + 1] << 16) | (h[off + 2] << 8) | h[off + 3];
  return String(bin % 1000000).padStart(6, '0');
}

// Returns the matching time-step (so we can block reuse) or -1. Allows ±1 step (30 s) of clock drift.
async function checkTotp(secretB32, code, nowMs = Date.now()) {
  if (!/^\d{6}$/.test(code)) return -1;
  const key = b32decode(secretB32);
  const step = Math.floor(nowMs / 30000);
  for (const d of [0, -1, 1]) {
    const expect = await hotp(key, step + d);
    let diff = 0;                                    // constant-time compare
    for (let i = 0; i < 6; i++) diff |= expect.charCodeAt(i) ^ code.charCodeAt(i);
    if (diff === 0) return step + d;
  }
  return -1;
}

const enc = new TextEncoder();
const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64uStr = (s) => b64u(enc.encode(s));

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64u(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}

async function makeToken(secret, expMs) {
  const payload = b64uStr(JSON.stringify({ exp: expMs }));
  return `${payload}.${await hmac(secret, payload)}`;
}

async function checkToken(secret, token) {
  const [payload, sig] = String(token || '').split('.');
  if (!payload || !sig) return false;
  const good = await hmac(secret, payload);
  let diff = good.length ^ sig.length;
  for (let i = 0; i < Math.min(good.length, sig.length); i++) diff |= good.charCodeAt(i) ^ sig.charCodeAt(i);
  if (diff !== 0) return false;
  try {
    const { exp } = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return typeof exp === 'number' && exp > Date.now();
  } catch { return false; }
}

// ── main ─────────────────────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const h = cors(origin);
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });
    if (request.method === 'GET') return json({ ok: true, service: 'admin-auth' }, 200, h);
    if (request.method !== 'POST') return json({ ok: false }, 405, h);
    if (!env.TOTP_SECRET || !env.SESSION_SECRET) return json({ ok: false, error: 'not configured' }, 500, h);
    if (!ALLOWED_ORIGINS.includes(origin)) return json({ ok: false, error: 'forbidden' }, 403, h);

    let body = {};
    try { body = await request.json(); } catch { /* empty */ }

    // Session check (used by the admin page to confirm a saved session is still valid)
    if (url.pathname === '/verify') {
      return json({ ok: await checkToken(env.SESSION_SECRET, body.token) }, 200, h);
    }

    // Login with a code
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();
    let rec = fails.get(ip);
    if (rec && now - rec.t > FAIL_WINDOW_MS) { fails.delete(ip); rec = null; }
    if (rec && rec.n >= MAX_FAILS) {
      return json({ ok: false, error: 'too many tries — wait 10 minutes' }, 429, h);
    }

    const code = String(body.code || '').replace(/\s+/g, '');
    let step = -1;
    try { step = await checkTotp(env.TOTP_SECRET, code, now); } catch { return json({ ok: false, error: 'bad server key' }, 500, h); }

    if (step < 0 || step <= lastStepUsed) {
      fails.set(ip, { n: (rec ? rec.n : 0) + 1, t: rec ? rec.t : now });
      return json({ ok: false, error: 'wrong or already-used code' }, 401, h);
    }
    lastStepUsed = step;
    fails.delete(ip);
    const exp = now + SESSION_HOURS * 3600 * 1000;
    return json({ ok: true, token: await makeToken(env.SESSION_SECRET, exp), exp }, 200, h);
  },
};

// exported for tests
export { checkTotp, hotp, b32decode, makeToken, checkToken };
