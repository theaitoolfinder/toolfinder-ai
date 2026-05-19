/**
 * affiliate.js — MyAI ToolsFinder
 * ─────────────────────────────────────────────────────────────────────────────
 * Include this script in any article page to automatically wire up affiliate
 * links. It reads affiliate URL overrides from localStorage (set via the admin
 * portal at /admin.html) and rewrites matching links on the page.
 *
 * HOW TO USE IN AN ARTICLE:
 *
 *   1. Add this script at the bottom of your article HTML:
 *        <script src="../js/affiliate.js"></script>
 *
 *   2. Mark any tool link with a data-tool attribute matching the tool name:
 *        <a href="https://jasper.ai" data-tool="Jasper AI">Try Jasper AI →</a>
 *        <a href="https://grammarly.com" data-tool="Grammarly">Grammarly</a>
 *
 *   3. The script will automatically replace the href with your affiliate URL
 *      (if one is set in the admin portal), add rel="sponsored noopener nofollow",
 *      and track the click in GA4.
 *
 * FALLBACK: If no affiliate URL is set for a tool, the original href is kept.
 * ─────────────────────────────────────────────────────────────────────────────
 */
(function () {
  "use strict";

  const LS_OVERRIDES = "myai_admin_overrides_v1";
  const LS_CLICKS    = "myai_clicks_v1";

  /* ── Load admin overrides from localStorage ── */
  function loadOverrides() {
    try { return JSON.parse(localStorage.getItem(LS_OVERRIDES)) || {}; }
    catch (e) { return {}; }
  }

  /* ── Build a name → affiliate_url lookup map ── */
  function buildAffMap() {
    const ov  = loadOverrides();
    const map = {};

    /* Walk through every override index and pick up affiliate_url entries */
    Object.entries(ov).forEach(([idx, data]) => {
      if (data && data.affiliate_url && data.affiliate_url.trim()) {
        /* We need the tool name — it may be stored in the override itself */
        if (data.name) {
          map[data.name.toLowerCase()] = data.affiliate_url.trim();
        }
      }
    });

    return map;
  }

  /* ── Track a click in GA4 + localStorage ── */
  function trackClick(toolName, url) {
    /* GA4 */
    if (window.dataLayer) {
      window.dataLayer.push({
        event:        "tool_click",
        tool_name:    toolName,
        is_affiliate: true,
        destination:  url,
        source:       "article"
      });
    }
    /* localStorage click history */
    try {
      const c = JSON.parse(localStorage.getItem(LS_CLICKS) || "{}");
      c[toolName] = (c[toolName] || 0) + 1;
      localStorage.setItem(LS_CLICKS, JSON.stringify(c));
    } catch (e) { /* silent */ }
  }

  /* ── Wire up all [data-tool] links on the page ── */
  function wireLinks() {
    const affMap = buildAffMap();
    if (Object.keys(affMap).length === 0) return; /* no overrides set yet */

    document.querySelectorAll("a[data-tool]").forEach(function (el) {
      const toolName = el.dataset.tool;
      const affUrl   = affMap[toolName.toLowerCase()];

      if (affUrl) {
        el.href = affUrl;
        el.rel  = "sponsored noopener nofollow";
        el.setAttribute("target", "_blank");
        el.addEventListener("click", function () {
          trackClick(toolName, affUrl);
        });
        /* Optional: add a small affiliate indicator */
        if (!el.querySelector(".aff-indicator")) {
          const span = document.createElement("span");
          span.className   = "aff-indicator";
          span.textContent = " ✦";
          span.title       = "Affiliate link — we may earn a commission";
          span.style.cssText = "font-size:.75em;opacity:.55;margin-left:2px;";
          el.appendChild(span);
        }
      }
    });
  }

  /* ── Run after DOM is ready ── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireLinks);
  } else {
    wireLinks();
  }
})();
