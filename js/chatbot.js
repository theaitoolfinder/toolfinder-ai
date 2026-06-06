/**
 * MyAI ToolsFinder — Universal Chatbot Widget
 * Self-contained; inject via <script src="js/chatbot.js"></script>
 * Works on all pages. Uses window.TOOLS if available (index.html),
 * window.PROMPT_CATEGORY_BANK if available (prompts.html).
 */
(function () {
  'use strict';

  // ── Don't double-load (index.html already has Teza inline) ──
  if (document.getElementById('cb-btn') || document.getElementById('mcb-btn')) return;

  // ── Config ──
  const BREVO_EP = 'https://bb0b0867.sibforms.com/serve/MUIFAOGDJeXWoD51BjwMfv68XSaz0v90tEtIP4j7fWleHs6hcXvvW59DvRO_ULI5cVeWpFz--du9WCjUPi-wuhIhngKkkv4OkRXymONeiAKq6NUmSsZaxZEjzXzPwOQPwIAYEnFwUugNyHeTgKFv4i9Kv4nuKKNy3zM4zlwgk6coRZy63tOLzVnlVoVBq5AN2uiZDuQW-rU1Kgz9GQ==';
  const PAGE = window.location.pathname.split('/').pop() || 'index.html';

  // ── Inject CSS ──
  const style = document.createElement('style');
  style.textContent = `
  #mcb-btn{position:fixed;bottom:10px;right:10px;z-index:9000;width:96px;height:96px;
    background:transparent;border:none;border-radius:50%;cursor:pointer;padding:0;
    box-shadow:none;transition:transform .28s cubic-bezier(.34,1.56,.64,1)}
  #mcb-btn:hover{transform:translateY(-5px) scale(1.04)}
  #mcb-btn.open{transform:none}
  #mcb-teza-canvas{display:block;width:84px;height:84px}
  #mcb-badge{position:absolute;top:0;right:0;width:18px;height:18px;border-radius:50%;
    background:#ef4444;color:#fff;font:700 10px 'Poppins',sans-serif;
    display:flex;align-items:center;justify-content:center;border:2px solid #fff;
    opacity:0;transition:opacity .2s;pointer-events:none}
  #mcb-badge.show{opacity:1}
  #mcb-win{position:fixed;bottom:92px;right:24px;z-index:9000;width:370px;
    max-width:calc(100vw - 20px);max-height:560px;
    background:rgba(255,255,255,.96);backdrop-filter:blur(20px) saturate(180%);
    -webkit-backdrop-filter:blur(20px) saturate(180%);
    border-radius:20px;border:1px solid rgba(255,255,255,.8);
    box-shadow:0 20px 60px rgba(26,86,219,.18),0 0 0 1px rgba(26,86,219,.06);
    display:flex;flex-direction:column;overflow:hidden;
    transform:translateY(14px) scale(.97);opacity:0;pointer-events:none;
    transition:transform .26s cubic-bezier(.4,0,.2,1),opacity .22s;transform-origin:bottom right}
  #mcb-win.open{transform:translateY(0) scale(1);opacity:1;pointer-events:all}
  #mcb-head{padding:14px 16px 12px;background:linear-gradient(135deg,#1a56db,#7c3aed);
    display:flex;align-items:center;gap:10px;flex-shrink:0}
  #mcb-head-icon{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,.2);
    display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
  #mcb-head-info{flex:1;min-width:0}
  #mcb-head-info h4{margin:0;font-size:14px;font-weight:700;color:#fff;font-family:'Poppins',sans-serif}
  #mcb-head-info p{margin:0;font-size:11px;color:rgba(255,255,255,.8);font-family:'Poppins',sans-serif;
    display:flex;align-items:center;gap:4px}
  .mcb-dot{width:7px;height:7px;border-radius:50%;background:#4ade80;display:inline-block;flex-shrink:0}
  #mcb-close{background:rgba(255,255,255,.18);border:none;color:#fff;cursor:pointer;
    width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;
    font-size:18px;line-height:1;transition:background .15s;flex-shrink:0;font-family:sans-serif}
  #mcb-close:hover{background:rgba(255,255,255,.3)}
  #mcb-msgs{flex:1;overflow-y:auto;padding:14px 12px;
    display:flex;flex-direction:column;gap:10px;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.08) transparent}
  .mcb-msg{max-width:88%;display:flex;flex-direction:column;gap:3px;animation:mcbIn .2s ease}
  @keyframes mcbIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}
  .mcb-msg.bot{align-self:flex-start}
  .mcb-msg.user{align-self:flex-end}
  .mcb-bubble{padding:10px 13px;border-radius:14px;font:13.5px/1.55 'Poppins',system-ui,sans-serif;word-break:break-word}
  .mcb-msg.bot .mcb-bubble{background:rgba(239,246,255,.9);border:1px solid rgba(26,86,219,.1);
    color:#1e293b;border-bottom-left-radius:4px;box-shadow:0 2px 8px rgba(26,86,219,.05)}
  .mcb-msg.user .mcb-bubble{background:linear-gradient(135deg,#1a56db,#7c3aed);
    color:#fff;border-bottom-right-radius:4px;box-shadow:0 4px 12px rgba(26,86,219,.28)}
  .mcb-bubble a{color:#1a56db;text-decoration:underline;font-weight:500}
  .mcb-msg.user .mcb-bubble a{color:#bfdbfe}
  .mcb-gate-card{background:linear-gradient(135deg,rgba(239,246,255,.9),rgba(245,243,255,.9));
    border:1px solid rgba(26,86,219,.12);border-radius:13px;padding:14px;margin-top:2px;width:100%}
  .mcb-gate-fields{display:flex;flex-direction:column;gap:8px;margin-bottom:10px}
  .mcb-gate-input{padding:9px 12px;border-radius:9px;border:1.5px solid rgba(26,86,219,.2);
    font:13px 'Poppins',sans-serif;outline:none;width:100%;transition:border-color .15s;
    background:#fff;color:#1e293b;box-sizing:border-box}
  .mcb-gate-input:focus{border-color:#1a56db;box-shadow:0 0 0 3px rgba(26,86,219,.08)}
  .mcb-gate-btn{width:100%;padding:10px;border-radius:9px;border:none;
    background:linear-gradient(135deg,#1a56db,#7c3aed);color:#fff;
    font:700 13px 'Poppins',sans-serif;cursor:pointer;transition:opacity .15s;margin-bottom:5px}
  .mcb-gate-btn:hover{opacity:.88}.mcb-gate-btn:disabled{opacity:.5;cursor:not-allowed}
  .mcb-gate-msg{font-size:12px;min-height:14px;margin:2px 0;text-align:center;font-family:'Poppins',sans-serif}
  .mcb-gate-skip{background:none;border:none;font:400 11.5px 'Poppins',sans-serif;
    color:#94a3b8;cursor:pointer;text-decoration:underline;
    display:block;width:100%;text-align:center;padding:3px 0;transition:color .15s}
  .mcb-gate-skip:hover{color:#64748b}
  .mcb-chips{padding:6px 12px 8px;display:flex;gap:5px;flex-wrap:wrap;
    flex-shrink:0;border-top:1px solid rgba(26,86,219,.06)}
  .mcb-chip{padding:5px 10px;border-radius:999px;border:1.5px solid rgba(26,86,219,.18);
    background:rgba(219,234,254,.5);font:500 11.5px 'Poppins',sans-serif;
    color:#1a56db;cursor:pointer;transition:all .15s;white-space:nowrap}
  .mcb-chip:hover{background:#1a56db;color:#fff;border-color:#1a56db}
  .mcb-tool-chip{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;
    background:rgba(219,234,254,.7);border:1px solid rgba(26,86,219,.14);border-radius:8px;
    font:600 12.5px 'Poppins',sans-serif;color:#1a56db;margin:2px 0;cursor:pointer;
    transition:all .15s;text-decoration:none}
  .mcb-tool-chip:hover{background:#1a56db;color:#fff;border-color:#1a56db}
  .mcb-tool-chip img{width:16px;height:16px;border-radius:3px;flex-shrink:0}
  .mcb-typing{display:flex;gap:4px;align-items:center;padding:12px 14px}
  .mcb-typing span{width:7px;height:7px;border-radius:50%;background:#94a3b8;
    animation:mcbDot .9s ease-in-out infinite}
  .mcb-typing span:nth-child(2){animation-delay:.18s}
  .mcb-typing span:nth-child(3){animation-delay:.36s}
  @keyframes mcbDot{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}
  #mcb-input-row{padding:10px 12px 12px;display:flex;gap:8px;align-items:center;
    flex-shrink:0;border-top:1px solid rgba(26,86,219,.06)}
  #mcb-input{flex:1;border:1.5px solid rgba(26,86,219,.18);border-radius:999px;
    padding:9px 15px;font:13.5px/1 'Poppins',system-ui,sans-serif;
    color:#1e293b;background:rgba(255,255,255,.85);outline:none;transition:border-color .15s}
  #mcb-input:focus{border-color:#1a56db}
  #mcb-input::placeholder{color:#94a3b8}
  #mcb-input:disabled{opacity:.5;cursor:not-allowed}
  #mcb-send{width:36px;height:36px;border-radius:50%;border:none;flex-shrink:0;
    background:linear-gradient(135deg,#1a56db,#7c3aed);color:#fff;cursor:pointer;
    display:flex;align-items:center;justify-content:center;transition:transform .15s,opacity .15s}
  #mcb-send:hover{transform:scale(1.08)}
  #mcb-send:disabled{opacity:.4;cursor:not-allowed;transform:none}
  @media(max-width:480px){
    #mcb-win{width:calc(100vw - 16px);right:8px;bottom:118px;max-height:72vh;border-radius:16px}
    #mcb-btn{bottom:10px;right:10px}
  }`;
  document.head.appendChild(style);

  // ── Inject HTML ──
  const root = document.createElement('div');
  root.style.cssText = 'position:fixed;z-index:9000';
  root.innerHTML = `
  <button id="mcb-btn" onclick="mcbToggle()" aria-label="Chat with Teza — AI Tool Finder" style="position:fixed;bottom:10px;right:10px">
    <span id="mcb-badge"></span>
    <canvas id="mcb-teza-canvas" width="84" height="84" aria-hidden="true"></canvas>
  </button>

  <div id="mcb-win" role="dialog" aria-modal="true" aria-label="Teza chat" style="position:fixed;bottom:118px;right:10px">
    <div id="mcb-head">
      <div id="mcb-head-icon">🤖</div>
      <div id="mcb-head-info">
        <h4>Teza — AI Tool Finder</h4>
        <p><span class="mcb-dot"></span> Online now</p>
      </div>
      <button id="mcb-close" onclick="mcbToggle()" aria-label="Close chat">&#x2715;</button>
    </div>
    <div id="mcb-msgs" aria-live="polite"></div>
    <div class="mcb-chips" id="mcb-chips">
      <button class="mcb-chip" onclick="mcbQuick('Find AI tools for me')">🔍 Find tools</button>
      <button class="mcb-chip" onclick="mcbQuick('Show me the prompts library')">✍️ Prompts</button>
      <button class="mcb-chip" onclick="mcbQuick('Latest articles and guides')">📰 Articles</button>
      <button class="mcb-chip" onclick="mcbQuick('Free AI tools only')">🆓 Free tools</button>
      <button class="mcb-chip" onclick="mcbQuick('Trending AI tools right now')">🔥 Trending</button>
      <button class="mcb-chip" onclick="mcbQuick('Tell me about the newsletter')">📬 Newsletter</button>
      <button class="mcb-chip" onclick="mcbQuick('How does this site work?')">❓ How it works</button>
    </div>
    <div id="mcb-input-row">
      <input id="mcb-input" type="text" placeholder="Ask me anything…"
        autocomplete="off" inputmode="text"
        onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();mcbSend();}">
      <button id="mcb-send" onclick="mcbSend()" aria-label="Send">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  </div>`;
  document.body.appendChild(root);

  // ── State ──
  let _isOpen = false;

  // ── Helpers ──
  function mcbMsg(text, cls) {
    const msgs = document.getElementById('mcb-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'mcb-msg ' + cls;
    const bubble = document.createElement('div');
    bubble.className = 'mcb-bubble';
    if (cls === 'bot') {
      bubble.innerHTML = text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    } else {
      bubble.textContent = text;
    }
    wrap.appendChild(bubble);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
    return wrap;
  }

  function mcbBotMsg(text) { return mcbMsg(text, 'bot'); }
  function mcbUserMsg(text) { return mcbMsg(text, 'user'); }

  function mcbTyping() {
    const msgs = document.getElementById('mcb-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'mcb-msg bot';
    const bub = document.createElement('div');
    bub.className = 'mcb-bubble mcb-typing';
    bub.innerHTML = '<span></span><span></span><span></span>';
    wrap.appendChild(bub);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
    return wrap;
  }

  // ── Toggle ──
  window.mcbToggle = function () {
    _isOpen = !_isOpen;
    const win = document.getElementById('mcb-win');
    const btn = document.getElementById('mcb-btn');
    win.classList.toggle('open', _isOpen);
    btn.classList.toggle('open', _isOpen);
    if (_isOpen) {
      const msgs = document.getElementById('mcb-msgs');
      if (!msgs.children.length) {
        if (localStorage.getItem('myai_chat_gate') === '1') {
          const savedName = localStorage.getItem('myai_chat_name');
          mcbBotMsg(savedName
            ? `Hey ${savedName}! 👋 Good to see you again. How can I help? I know 500+ AI tools, 700+ prompts, and everything about this site.`
            : `Hey! 👋 I'm **Teza** — your AI tools guide for MyAI ToolsFinder. Ask me anything: find tools, browse prompts, compare options, or get site help. What do you need?`);
        } else {
          mcbShowGate();
        }
      }
      setTimeout(() => document.getElementById('mcb-input').focus(), 320);
    }
  };

  // ── Quick chips ──
  window.mcbQuick = function (q) {
    document.getElementById('mcb-input').value = q;
    mcbSend();
  };

  // ── Send ──
  window.mcbSend = function () {
    if (window._mcbGateActive) return;
    const inp = document.getElementById('mcb-input');
    const q = inp.value.trim();
    if (!q) return;
    mcbUserMsg(q);
    inp.value = '';
    const typing = mcbTyping();
    setTimeout(() => { typing.remove(); mcbProcess(q); }, 600 + Math.random() * 400);
  };

  // ══════════════════════════════════════════
  //  SUBSCRIPTION GATE
  // ══════════════════════════════════════════

  // ── SHA-256 + subscriber check (self-contained for cross-page use) ──
  async function mcbSha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str.trim().toLowerCase()));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  async function mcbIsSubscriber(email) {
    // Prefer the existing global helper if on index.html
    if (typeof isSubscriberCmp === 'function') return isSubscriberCmp(email);
    try {
      const hash = await mcbSha256(email);
      const r = await fetch('/data/subscribers.json?_=' + Date.now(), { cache: 'no-store' });
      if (!r.ok) return null;
      const d = await r.json();
      return Array.isArray(d.hashes) && d.hashes.includes(hash);
    } catch (e) { return null; }
  }

  function mcbShowGate() {
    window._mcbGateActive = true;
    const inp    = document.getElementById('mcb-input');
    const send   = document.getElementById('mcb-send');
    const chips  = document.getElementById('mcb-chips');
    if (inp)   { inp.disabled = true; inp.placeholder = 'Subscribe to start chatting…'; }
    if (send)  { send.disabled = true; }
    if (chips) { chips.style.display = 'none'; }

    mcbBotMsg("👋 Hey! I'm **Teza** — your AI tools guide for MyAI ToolsFinder. Before we dive in, I'd love to invite you to our **free Friday newsletter**: 5 AI tools, 1 comparison, 1 tip per week. 1,000+ readers. Takes 10 seconds 👇");

    const msgs = document.getElementById('mcb-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'mcb-msg bot';
    wrap.id = 'mcb-gate-wrap';
    wrap.innerHTML = `<div class="mcb-gate-card">

      <!-- VIEW 1: Subscribe -->
      <div id="mcb-gate-sub-view">
        <p style="font-size:12px;color:#64748b;margin:0 0 10px;line-height:1.5;font-family:'Poppins',sans-serif">Every Friday: 5 hand-picked AI tools, 1 comparison, 1 tip. <strong>1,000+ readers.</strong> Free forever.</p>
        <div class="mcb-gate-fields">
          <input id="mcb-gate-fname" class="mcb-gate-input" type="text" placeholder="First name (optional)" autocomplete="given-name">
          <input id="mcb-gate-email" class="mcb-gate-input" type="email" placeholder="your@email.com" autocomplete="email"
            onkeydown="if(event.key==='Enter')mcbGateSubmit()">
        </div>
        <button class="mcb-gate-btn" id="mcb-gate-btn" onclick="mcbGateSubmit()">Subscribe Free 🎉</button>
        <div id="mcb-gate-msg" class="mcb-gate-msg"></div>
        <button class="mcb-gate-skip" onclick="mcbGateShowVerify()">Already a subscriber? Verify access →</button>
      </div>

      <!-- VIEW 2: Verify existing subscriber -->
      <div id="mcb-gate-verify-view" style="display:none">
        <p style="font-size:12px;color:#64748b;margin:0 0 10px;line-height:1.5;font-family:'Poppins',sans-serif">Enter your subscriber email and we'll verify your access instantly.</p>
        <input id="mcb-verify-email" class="mcb-gate-input" type="email" placeholder="your@email.com" autocomplete="email"
          onkeydown="if(event.key==='Enter')mcbGateVerify()" style="margin-bottom:10px">
        <button class="mcb-gate-btn" id="mcb-verify-btn" onclick="mcbGateVerify()">Verify Access →</button>
        <div id="mcb-verify-msg" class="mcb-gate-msg"></div>
        <button class="mcb-gate-skip" onclick="mcbGateShowSub()">← Back to subscribe</button>
      </div>

    </div>`;
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => document.getElementById('mcb-gate-email')?.focus(), 350);
  }

  window.mcbGateShowVerify = function () {
    document.getElementById('mcb-gate-sub-view').style.display  = 'none';
    document.getElementById('mcb-gate-verify-view').style.display = '';
    setTimeout(() => document.getElementById('mcb-verify-email')?.focus(), 80);
  };

  window.mcbGateShowSub = function () {
    document.getElementById('mcb-gate-verify-view').style.display = 'none';
    document.getElementById('mcb-gate-sub-view').style.display  = '';
    setTimeout(() => document.getElementById('mcb-gate-email')?.focus(), 80);
  };

  window.mcbGateVerify = async function () {
    const email = (document.getElementById('mcb-verify-email')?.value || '').trim();
    const msgEl = document.getElementById('mcb-verify-msg');
    const btn   = document.getElementById('mcb-verify-btn');
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      if (msgEl) { msgEl.style.color = '#ef4444'; msgEl.textContent = '⚠ Enter your subscriber email.'; }
      return;
    }
    if (btn) { btn.disabled = true; btn.textContent = 'Checking…'; }
    if (msgEl) { msgEl.style.color = '#64748b'; msgEl.textContent = ''; }
    let result = null;
    try { result = await mcbIsSubscriber(email); } catch (e) {}
    if (result === true) {
      const savedName = localStorage.getItem('myai_chat_name');
      localStorage.setItem('pf_sub', '1');
      localStorage.setItem('pf_email', email);
      mcbGateComplete(savedName || null, true);
    } else if (result === false) {
      if (btn) { btn.disabled = false; btn.textContent = 'Verify Access →'; }
      if (msgEl) {
        msgEl.style.color = '#ef4444';
        msgEl.innerHTML = '❌ Email not found. <a href="/#newsletter" target="_blank" style="color:#1a56db">Subscribe free</a> first, then come back!';
      }
    } else {
      if (btn) { btn.disabled = false; btn.textContent = 'Verify Access →'; }
      if (msgEl) { msgEl.style.color = '#ef4444'; msgEl.textContent = '⚠ Could not connect — please try again.'; }
    }
  };

  window.mcbGateSubmit = async function () {
    const fname = (document.getElementById('mcb-gate-fname')?.value || '').trim();
    const email = (document.getElementById('mcb-gate-email')?.value || '').trim();
    const msgEl = document.getElementById('mcb-gate-msg');
    const btn   = document.getElementById('mcb-gate-btn');
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      if (msgEl) { msgEl.style.color = '#ef4444'; msgEl.textContent = '⚠ Enter a valid email address.'; }
      return;
    }
    if (btn) { btn.disabled = true; btn.textContent = 'Subscribing…'; }
    if (msgEl) { msgEl.style.color = '#64748b'; msgEl.textContent = ''; }
    try {
      const fd = new FormData();
      fd.append('EMAIL', email);
      if (fname) fd.append('FIRSTNAME', fname);
      fd.append('locale', 'en');
      fd.append('html_type', 'simple');
      await fetch(BREVO_EP, { method: 'POST', body: fd, mode: 'no-cors' });
    } catch (e) {}
    if (fname) localStorage.setItem('myai_chat_name', fname);
    mcbGateComplete(fname || null, true);
  };

  function mcbGateComplete(fname, subscribed) {
    window._mcbGateActive = false;
    localStorage.setItem('myai_chat_gate', '1');
    document.getElementById('mcb-gate-wrap')?.remove();
    const inp   = document.getElementById('mcb-input');
    const send  = document.getElementById('mcb-send');
    const chips = document.getElementById('mcb-chips');
    if (inp)   { inp.disabled = false; inp.placeholder = 'Ask me anything…'; }
    if (send)  { send.disabled = false; }
    if (chips) { chips.style.display = ''; }
    if (subscribed && fname) {
      mcbBotMsg(`🎉 You're in, **${fname}**! First email lands this Friday.\n\nNow — what can I help you with? I know 500+ AI tools, 700+ prompts, and everything about this site. 🚀`);
    } else if (subscribed) {
      mcbBotMsg(`🎉 Subscribed! First email lands this Friday.\n\nNow — what can I help you find? 500+ tools, 700+ prompts, honest comparisons. Just ask! 🚀`);
    } else {
      mcbBotMsg(`No worries! I'm still here to help 😊\n\nI know **500+ AI tools**, **700+ free prompts**, and everything about MyAI ToolsFinder. What are you working on?`);
    }
    setTimeout(() => document.getElementById('mcb-input')?.focus(), 150);
  }

  // ══════════════════════════════════════════
  //  CORE PROCESSING
  // ══════════════════════════════════════════

  function mcbProcess(q) {
    const ql = q.toLowerCase().replace(/[''`]/g, "'").trim();

    // ─── Site navigation & customer service ───

    /* How it works / about */
    if (/\b(how (does|do) (this|it) work|what is this site|what.*myai|about this|site.*mission|how.*use this|site.*help)\b/.test(ql)) {
      mcbBotMsg(`**MyAI ToolsFinder** is a free, curated directory of 500+ AI tools — built for solopreneurs, freelancers and creators.\n\n🔍 <a href="/" target="_blank">Tools Directory</a> — 500+ tools, filter by job/need/category\n✍️ <a href="/prompts.html" target="_blank">Prompts Library</a> — 700+ free prompts\n📰 <a href="/articles.html" target="_blank">Articles & Guides</a> — reviews, comparisons, tutorials\n📬 <a href="/#newsletter" target="_blank">Newsletter</a> — free Friday digest\n\nAll free. What can I help you find?`);
      return;
    }

    /* Prompts */
    if (/\bprompt(s)?\b/.test(ql) && !/compare/.test(ql)) {
      const tm = ql.match(/prompts?\s+(?:for|about|on)\s+(.+)/i)
               || ql.match(/^(seo|email|social|youtube|blog|copywriting|coding|marketing|business|productivity|sales|design|video|chatbot)\b/i);
      const topic = tm ? (tm[1] || tm[0]).replace(/\b(get|find|show|best|me|give|the|a|an)\b/gi, '').trim() : null;

      // If PROMPT_CATEGORY_BANK is available, do a real search
      const bank = window.PROMPT_CATEGORY_BANK;
      if (bank && topic) {
        const cats = Object.keys(bank);
        const matched = cats.filter(c => c.toLowerCase().includes(topic) || topic.includes(c.toLowerCase()));
        if (matched.length) {
          const cat = matched[0];
          const prompts = (bank[cat] || []).slice(0, 3);
          mcbBotMsg(`Here are some prompts from **${cat}**:`);
          const msgs = document.getElementById('mcb-msgs');
          const wrap = document.createElement('div');
          wrap.className = 'mcb-msg bot';
          wrap.innerHTML = '<div style="display:flex;flex-direction:column;gap:6px;margin-top:2px">'
            + prompts.map(p => `<div style="background:rgba(239,246,255,.9);border:1px solid rgba(26,86,219,.1);border-radius:10px;padding:9px 12px;font:12.5px/1.5 'Poppins',sans-serif;color:#1e293b">${escH(p.title || p.prompt?.slice(0,80) + '…')}</div>`).join('')
            + `<a href="/prompts.html" target="_blank" style="font:500 12px 'Poppins',sans-serif;color:#1a56db;text-decoration:underline;margin-top:2px">See all ${cat} prompts →</a></div>`;
          msgs.appendChild(wrap);
          msgs.scrollTop = msgs.scrollHeight;
          return;
        }
      }
      if (topic) {
        mcbBotMsg(`Check out **${topic}** prompts in our library:\n\n👉 <a href="/prompts.html" target="_blank">Open Prompts Library</a>\n\nWe have 700+ free prompts across 25 categories. I can also find AI **tools** for ${topic} — want that?`);
      } else {
        mcbBotMsg(`Our **Prompts Library** has 700+ free, ready-to-use prompts! ✍️\n\n👉 <a href="/prompts.html" target="_blank">Browse Prompts →</a>\n\nCategories: Copywriting, SEO, Email, Social Media, YouTube, Coding, Marketing, Sales, HR, Finance, Legal, Design, and more.\n\nWhat topic are you working on?`);
      }
      return;
    }

    /* Articles */
    if (/\barticle(s)?|blog|guide(s)?|tutorial|read about|latest content\b/.test(ql) && !/tool/.test(ql)) {
      const tm = ql.match(/(?:article|guide|read)\s+(?:about|on)\s+(.+)/i);
      const topic = tm ? tm[1].trim() : null;
      if (topic) {
        mcbBotMsg(`Check out our <a href="/articles.html" target="_blank">Articles section</a> for **${topic}** content — reviews, comparisons, and how-to guides.\n\nNew content drops multiple times daily. Any specific tool or question?`);
      } else {
        mcbBotMsg(`Our <a href="/articles.html" target="_blank">Articles & Guides</a> section covers:\n\n📝 In-depth AI tool reviews\n⚖️ Honest head-to-head comparisons\n🔧 Practical tutorials\n📰 Weekly AI news digests\n\nNew articles go live daily. What topic interests you?`);
      }
      return;
    }

    /* Newsletter */
    if (/\bnewsletter|friday.*(email|digest)|subscribe.*weekly|weekly.*email\b/.test(ql)) {
      mcbBotMsg(`Our **AI Toolbox Newsletter** is free every Friday 📬\n\n✅ 5 hand-picked AI tools\n✅ 1 honest comparison\n✅ 1 practical tip\n✅ 10 exclusive Friday articles for members\n\n**1,000+ readers** weekly — free forever.\n\n<a href="/#newsletter" target="_blank">📩 Subscribe free →</a>`);
      return;
    }

    /* Contact */
    if (/\b(contact|reach.*team|email.*us|support|customer.?service|get.*help|feedback)\b/.test(ql)) {
      mcbBotMsg(`Reach the team at 📧 **hello@myaitoolsfinder.com** — we respond within 24 hours.\n\nWhat's your question? There's a good chance I can help right now 😊`);
      return;
    }

    /* Compare feature */
    if (/\b(compare|side.?by.?side).*(feature|tool|how)\b/.test(ql)) {
      mcbBotMsg(`Our <strong>Compare</strong> feature (on the <a href="/" target="_blank">Tools Directory</a>) lets you pit two AI tools head-to-head:\n\n1. Click ⚖️ on a tool card\n2. Add a second tool\n3. Click **Compare**\n\nRequires a free subscriber account. Not subscribed yet?`);
      return;
    }

    /* Free / cost */
    if (/\b(is this|the site|myai).*(free|paid|cost)\b/.test(ql) || /\bhow much.*use\b/.test(ql)) {
      mcbBotMsg(`**Totally free!** 🎉 The Tools Directory, Prompts Library and Articles are all free.\n\nThe Compare feature and Friday exclusive articles need a free newsletter subscription — no credit card, just your email.`);
      return;
    }

    // ─── Find tools ───
    if (/\b(find|recommend|suggest|best|top|show).*(tool|ai)\b|\btool(s)? for\b/.test(ql)) {
      const allTools = (typeof window.TOOLS !== 'undefined' ? window.TOOLS : []);
      if (allTools.length) {
        // delegate to tool search
        mcbFindTools(ql, allTools);
      } else {
        mcbBotMsg(`Head to our <a href="/" target="_blank">AI Tools Directory</a> to browse 500+ tools — you can filter by job, need, category, or price!\n\nTell me what you're trying to do and I'll suggest the best tools. 🔍`);
      }
      return;
    }

    // ─── Greetings ───
    if (/^(hi|hello|hey|howdy|yo|sup)\b/.test(ql)) {
      const r = [
        "Hey! 👋 What are you working on? I can find AI tools, suggest prompts, or answer any question about this site.",
        "Hello! 😊 I'm Teza — AI tools guide for MyAI ToolsFinder. What do you need?",
        "Hey there! Got a task or just exploring? Tell me what you need ✨",
      ];
      mcbBotMsg(r[Math.floor(Math.random() * r.length)]); return;
    }

    if (/thank(s| you)|you.re (great|awesome|helpful)|nice one|well done/.test(ql)) {
      mcbBotMsg("Happy to help! 😊 What else can I find for you?"); return;
    }

    if (/^(bye|goodbye|see you|later|cya)\b/.test(ql)) {
      mcbBotMsg("See ya! 👋 Come back anytime you need a tool recommendation."); return;
    }

    // ─── Tool search via window.TOOLS if available ───
    const allTools = typeof window.TOOLS !== 'undefined' ? window.TOOLS : [];
    if (allTools.length) {
      mcbFindTools(ql, allTools);
    } else {
      mcbBotMsg(`I'm not sure about that one, but here's what I can help with:\n\n🔍 <a href="/" target="_blank">Browse 500+ AI tools →</a>\n✍️ <a href="/prompts.html" target="_blank">Explore 700+ prompts →</a>\n📰 <a href="/articles.html" target="_blank">Read articles & guides →</a>\n\nOr ask me: "tools for writers", "free SEO tools", "ChatGPT vs Claude" — I've got answers!`);
    }
  }

  // ── Tool search (used when window.TOOLS is available) ──
  function mcbFindTools(ql, pool) {
    function findOne(name) {
      const n = name.toLowerCase().trim();
      return pool.find(t => t.name.toLowerCase() === n)
          || pool.find(t => t.name.toLowerCase().startsWith(n))
          || pool.find(t => t.name.toLowerCase().includes(n))
          || null;
    }

    // VS comparison
    const vsM = ql.match(/^(.+?)\s+vs\.?\s+(.+)$/) || ql.match(/^compare\s+(.+?)\s+(?:and|vs|with)\s+(.+)$/);
    if (vsM) {
      const t1 = findOne(vsM[1].trim()), t2 = findOne(vsM[2].trim());
      if (t1 && t2) {
        const r1 = t1.rating || 0, r2 = t2.rating || 0;
        const f1 = /free/i.test(t1.pill), f2 = /free/i.test(t2.pill);
        const ratingLine = Math.abs(r1 - r2) < 0.15
          ? 'They\'re rated nearly the same — it\'s close.'
          : `**${r1 > r2 ? t1.name : t2.name}** edges ahead in user ratings.`;
        const priceLine = f1 && !f2 ? `**${t1.name}** has a free plan; ${t2.name} doesn't.`
          : !f1 && f2 ? `**${t2.name}** has a free plan; ${t1.name} doesn't.`
          : 'Both have free options.';
        mcbBotMsg(`**${t1.name}** — ${t1.tag} (${t1.pill})\n**${t2.name}** — ${t2.tag} (${t2.pill})\n\n✨ **Teza's take:** ${ratingLine} ${priceLine} Try the free tier of both and see which clicks.`);
        mcbShowTools([t1, t2]); return;
      }
    }

    // Filter
    let results = [...pool];
    if (/\bfree\b/.test(ql)) results = results.filter(t => /free/i.test(t.pill));

    const jobMap = [
      [/design(er|ing)?|ui|ux|graphic/,'Designer'],
      [/develop(er|ing)?|coder?|programmer/,'Developer'],
      [/market(er|ing)?/,'Marketer'],
      [/writ(er|ing)|copywriter|blogger/,'Writer'],
      [/founder|startup|entrepreneur|solopreneur/,'Founder'],
      [/creator|youtuber|influencer/,'Creator'],
    ];
    for (const [re, job] of jobMap) {
      if (re.test(ql)) {
        const jf = results.filter(t => t.jobs && t.jobs.some(j => j.toLowerCase().includes(job.toLowerCase())));
        if (jf.length) { results = jf; break; }
      }
    }

    const catMap = [
      [/writ(e|ing)|blog|copywriting/,'Writing'],
      [/video|film/,'Video'],
      [/cod(e|ing)|developer/,'Coding'],
      [/design/,'Design'],
      [/seo|keyword/,'SEO'],
      [/social media|instagram|twitter/,'Social Media'],
      [/image|art|photo/,'Image'],
      [/audio|voice|music/,'Audio'],
      [/automat|workflow/,'Automation'],
      [/productiv|task|project/,'Productivity'],
    ];
    for (const [re, cat] of catMap) {
      if (re.test(ql)) {
        const cf = results.filter(t => t.cat && t.cat.toLowerCase().includes(cat.toLowerCase()));
        if (cf.length) { results = cf; break; }
      }
    }

    results.sort((a, b) => ((b.trending || 0) * 2 + (b.rating || 0) * 10) - ((a.trending || 0) * 2 + (a.rating || 0) * 10));
    const top = results.slice(0, 5);
    mcbBotMsg(`Here are ${top.length === 1 ? 'the top match' : `${top.length} top picks`} (${results.length} total):`);
    mcbShowTools(top);
    if (results.length > 5) setTimeout(() => mcbBotMsg(`Found ${results.length} matching tools — head to the <a href="/" target="_blank">directory</a> to see all of them!`), 500);
  }

  function mcbShowTools(tools) {
    const msgs = document.getElementById('mcb-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'mcb-msg bot';
    const inner = document.createElement('div');
    inner.style.cssText = 'display:flex;flex-direction:column;gap:5px;margin-top:2px';
    tools.forEach(t => {
      const a = document.createElement('a');
      a.className = 'mcb-tool-chip';
      a.href = t.affiliate_url || t.url || '#';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      const stars = t.rating ? ` ⭐ ${t.rating}` : '';
      a.innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${t.domain}&sz=32" width="16" height="16" alt="" loading="lazy" style="border-radius:3px;flex-shrink:0"><span><b>${t.name}</b> — ${t.pill}${stars}</span>`;
      inner.appendChild(a);
    });
    wrap.appendChild(inner);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function escH(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

})();

/* ══════════════════════════════════════════════════════
   TEZA — Animated 3D tesseract for chatbot.js pages
   84×84 canvas · 4D rotation · supernova glow · eyes+mouth
   ══════════════════════════════════════════════════════ */
(function(){
  // Wait for DOM ready in case the script loads before the button is injected
  function initTeza() {
    const canvas = document.getElementById('mcb-teza-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // HiDPI scaling — square
    const dpr = window.devicePixelRatio || 1;
    const S = 84;
    canvas.width  = S * dpr;
    canvas.height = S * dpr;
    ctx.scale(dpr, dpr);

    // ── 16 tesseract vertices ──
    const VERTS = [];
    for (let i = 0; i < 16; i++)
      VERTS.push([(i&1)?1:-1,(i&2)?1:-1,(i&4)?1:-1,(i&8)?1:-1]);

    // ── 32 edges ──
    const EDGES = [];
    for (let a = 0; a < 16; a++)
      for (let b = a+1; b < 16; b++) {
        const x = a^b;
        if (x && (x&(x-1))===0) EDGES.push([a,b]);
      }
    const NE = EDGES.length;

    function rot4(v, a, b, ang) {
      const r=v.slice(), c=Math.cos(ang), s=Math.sin(ang);
      r[a]=v[a]*c-v[b]*s; r[b]=v[a]*s+v[b]*c; return r;
    }

    // ── Supernova palette ──
    const PAL=[
      [255,20,80],[255,100,0],[255,220,0],[180,0,255],
      [0,180,255],[0,255,200],[255,0,180],[255,255,255]
    ];
    function lerpColor(ph, al) {
      const f=((ph%1)+1)%1, n=PAL.length, i=Math.floor(f*n)%n, t=f*n-Math.floor(f*n);
      const a=PAL[i],b=PAL[(i+1)%n];
      return `rgba(${Math.round(a[0]+(b[0]-a[0])*t)},${Math.round(a[1]+(b[1]-a[1])*t)},${Math.round(a[2]+(b[2]-a[2])*t)},${al})`;
    }

    // ── Face state ──
    const cx=S/2, cy=S/2;
    let blinkStart=-10, nextBlink=3.2+Math.random()*3;
    let lookStart=-10, nextLook=2+Math.random()*3;
    let targetLX=0, targetLY=0;
    let mood='smile', moodNext=6+Math.random()*6;

    function drawEye(ex, ey, idx, iris_dx, iris_dy, scY) {
      ctx.save();
      ctx.translate(ex, ey);
      ctx.scale(1, scY);
      ctx.beginPath(); ctx.arc(0,0,5.7,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,0.95)';
      ctx.shadowColor='rgba(255,255,255,0.55)'; ctx.shadowBlur=5;
      ctx.fill(); ctx.shadowBlur=0;
      ctx.beginPath(); ctx.arc(iris_dx,iris_dy,3.3,0,Math.PI*2);
      ctx.fillStyle='#0e1635'; ctx.fill();
      ctx.beginPath(); ctx.arc(iris_dx,iris_dy,1.8,0,Math.PI*2);
      ctx.fillStyle='#000014'; ctx.fill();
      ctx.beginPath(); ctx.arc(iris_dx+1.2,-0.7,0.95,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,0.92)'; ctx.fill();
      ctx.restore();
    }

    function drawMouth() {
      const mx=cx, my=cy+15.5;
      ctx.save();
      ctx.lineCap='round'; ctx.lineWidth=2.0;
      ctx.strokeStyle='rgba(255,255,255,0.88)';
      ctx.shadowColor='rgba(255,255,255,0.45)'; ctx.shadowBlur=4;
      ctx.beginPath();
      if (mood==='excited') {
        ctx.moveTo(mx-10.5,my-2.5); ctx.quadraticCurveTo(mx,my+8.5,mx+10.5,my-2.5);
      } else {
        ctx.moveTo(mx-7.5,my); ctx.quadraticCurveTo(mx,my+7,mx+7.5,my);
      }
      ctx.stroke(); ctx.shadowBlur=0;
      ctx.restore();
    }

    function drawFace(t) {
      // Blink
      const bd = t - blinkStart;
      let scY = 1;
      if (bd < 0.18) scY = 1 - Math.sin(bd/0.18*Math.PI)*0.88;
      if (t - blinkStart > nextBlink) { blinkStart=t; nextBlink=3+Math.random()*4; }

      // Look around
      const ld = t - lookStart;
      const decay = Math.max(0, 1 - ld*1.3);
      const iris_dx=targetLX*decay, iris_dy=targetLY*decay;
      if (ld > nextLook) {
        lookStart=t; nextLook=2.5+Math.random()*3.5;
        targetLX=(Math.random()-0.5)*4.5; targetLY=(Math.random()-0.5)*2.2;
      }

      // Mood
      if (t > moodNext) {
        const m=['smile','smile','excited','smile'];
        mood=m[Math.floor(Math.random()*m.length)];
        moodNext=t+5+Math.random()*8;
      }

      const scY_r = (mood==='wink') ? 0.08 : scY;
      drawEye(cx-11.5, cy-1.5, 0, iris_dx, iris_dy, scY);
      drawEye(cx+11.5, cy-1.5, 1, iris_dx, iris_dy, scY_r);
      drawMouth();
    }

    function drawFrame(ts) {
      const t = ts*0.001;
      ctx.clearRect(0, 0, S, S);

      // ── Nebula smoke background ──
      const nt=t*0.28;
      const clouds=[
        {x:cx+Math.sin(nt*0.9)*10,  y:cy+Math.cos(nt*0.6)*8,  r:34, c:[110,60,255]},
        {x:cx+Math.cos(nt*0.5)*12,  y:cy+Math.sin(nt*0.8)*9,  r:28, c:[0,120,255]},
        {x:cx+Math.sin(nt*1.1)*7,   y:cy+Math.cos(nt*1.3)*11, r:24, c:[220,40,180]},
        {x:cx+Math.cos(nt*0.7)*9,   y:cy+Math.sin(nt*0.4)*7,  r:21, c:[255,80,40]},
      ];
      clouds.forEach(({x,y,r,c})=>{
        const g=ctx.createRadialGradient(x,y,0,x,y,r);
        g.addColorStop(0,`rgba(${c[0]},${c[1]},${c[2]},0.18)`);
        g.addColorStop(0.5,`rgba(${c[0]},${c[1]},${c[2]},0.07)`);
        g.addColorStop(1,`rgba(${c[0]},${c[1]},${c[2]},0)`);
        ctx.fillStyle=g;
        ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
      });

      // Project tesseract — fixed distances, no zoom
      const W4=2.2, Z3=2.5, SCALE=35;
      const proj2d = VERTS.map(v => {
        let r=v.slice();
        r=rot4(r,0,3,t*0.70); r=rot4(r,1,3,t*0.53);
        r=rot4(r,0,1,t*0.34); r=rot4(r,2,3,t*0.41); r=rot4(r,1,2,t*0.22);
        const w4=1/(W4-r[3]);
        const z3=1/(Z3-r[2]*w4);
        return [cx+r[0]*w4*z3*SCALE, cy+r[1]*w4*z3*SCALE];
      });

      ctx.lineCap='round';

      // Pass 1 — bloom
      EDGES.forEach(([a,b],i)=>{
        const ph=((i/NE)*0.75+t*0.07)%1;
        ctx.beginPath(); ctx.moveTo(proj2d[a][0],proj2d[a][1]); ctx.lineTo(proj2d[b][0],proj2d[b][1]);
        ctx.strokeStyle=lerpColor(ph,0.07); ctx.lineWidth=11; ctx.shadowBlur=0; ctx.stroke();
      });
      // Pass 2 — mid glow
      EDGES.forEach(([a,b],i)=>{
        const ph=((i/NE)*0.75+t*0.07)%1;
        ctx.beginPath(); ctx.moveTo(proj2d[a][0],proj2d[a][1]); ctx.lineTo(proj2d[b][0],proj2d[b][1]);
        ctx.strokeStyle=lerpColor(ph,0.48); ctx.lineWidth=2.8;
        ctx.shadowColor=lerpColor(ph,1); ctx.shadowBlur=10; ctx.stroke();
      });
      ctx.shadowBlur=0;
      // Pass 3 — bright core
      EDGES.forEach(([a,b],i)=>{
        const ph=((i/NE)*0.75+t*0.07)%1;
        ctx.beginPath(); ctx.moveTo(proj2d[a][0],proj2d[a][1]); ctx.lineTo(proj2d[b][0],proj2d[b][1]);
        ctx.strokeStyle=lerpColor(ph,1); ctx.lineWidth=1.1;
        ctx.shadowColor='#fff'; ctx.shadowBlur=3; ctx.stroke();
      });
      ctx.shadowBlur=0;

      // Vertex sparkles
      proj2d.forEach((p,i)=>{
        const ph=((i/16)*0.6+t*0.05)%1;
        ctx.beginPath(); ctx.arc(p[0],p[1],1.9,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,0.90)';
        ctx.shadowColor=lerpColor(ph,1); ctx.shadowBlur=7; ctx.fill();
      });
      ctx.shadowBlur=0;

      // Animated face — drawn on top of the tesseract
      drawFace(t);

      requestAnimationFrame(drawFrame);
    }

    requestAnimationFrame(drawFrame);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTeza);
  } else {
    // DOM already ready — but the chatbot IIFE may inject the canvas asynchronously;
    // give it one tick to finish before looking for the canvas.
    setTimeout(initTeza, 0);
  }
})();
