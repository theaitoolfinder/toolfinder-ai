/**
 * affiliate.js — My AI Tools Finder
 * ─────────────────────────────────────────────────────────────────────────────
 * AUTO-LINKER: Automatically detects AI tool names anywhere on the page and
 * wraps them with the correct affiliate link. Works on article pages, the
 * about page, and anywhere else text content appears.
 *
 * HOW IT WORKS:
 * 1. Loads tool name → URL map from window.MYAI_AFF_MAP (js/tools-data.js)
 * 2. Merges with any affiliate URL overrides from the admin portal (localStorage)
 * 3. Scans all text nodes in the page body
 * 4. Replaces tool name mentions with affiliate links
 * 5. Only links the FIRST occurrence of each tool per page (avoids spam)
 * 6. Tracks every click in GA4
 *
 * INCLUDE IN ANY PAGE:
 *   <script src="js/affiliate.js"></script>         (same level)
 *   <script src="../js/affiliate.js"></script>       (one level deep — articles/)
 *
 * MANUAL OVERRIDE (optional — for precise link placement):
 *   <a href="https://jasper.ai" data-tool="Jasper AI">Jasper AI</a>
 *   The script will replace href with affiliate URL + add tracking.
 * ─────────────────────────────────────────────────────────────────────────────
 */
(function () {
  "use strict";

  var LS_OVERRIDES = "myai_admin_overrides_v1";
  var LS_CLICKS    = "myai_clicks_v1";

  /* Tags whose text children we NEVER touch */
  var SKIP_TAGS = new Set([
    "A","SCRIPT","STYLE","NAV","HEADER","FOOTER","CODE","PRE",
    "H1","BUTTON","INPUT","TEXTAREA","SELECT","LABEL","NOSCRIPT","IFRAME"
  ]);

  /* Selectors whose subtrees we search for text to link */
  var SEARCH_SELECTORS = [
    "main", "article", ".post-body", ".page-body",
    ".art-card-body", ".featured-body", ".art-section",
    ".section", ".section-block", "#disclosure-text"
  ];

  /* ── 1. Build the effective name → URL map ────────────────────────────── */
  function buildMap() {
    /* Start with baked-in base URLs from tools-data.js */
    var base = (typeof window.MYAI_AFF_MAP === "object" && window.MYAI_AFF_MAP) ? window.MYAI_AFF_MAP : {};
    var map  = {};

    /* Copy base map (already lowercase keys) */
    Object.keys(base).forEach(function (k) { map[k] = base[k]; });

    /* Overlay localStorage overrides from admin portal */
    try {
      var overrides = JSON.parse(localStorage.getItem(LS_OVERRIDES) || "{}") || {};
      Object.values(overrides).forEach(function (o) {
        if (!o || !o.name) return;
        var key = o.name.toLowerCase();
        /* If admin set an affiliate_url — use it (highest priority) */
        if (o.affiliate_url && o.affiliate_url.trim()) {
          map[key] = o.affiliate_url.trim();
        }
        /* If admin only set a url override — update only if key already exists */
        else if (o.url && map[key]) {
          map[key] = o.url.trim();
        }
      });
    } catch (e) { /* localStorage unavailable or corrupt — silently skip */ }

    return map;
  }

  /* ── 2. Build sorted array of {lower, display, url} ──────────────────── */
  function buildEntries(map) {
    return Object.keys(map)
      .filter(function (k) { return map[k] && k.length >= 3; })
      /* Sort longest first so "GitHub Copilot" matches before "GitHub" */
      .sort(function (a, b) { return b.length - a.length; })
      .map(function (k) {
        return { lower: k, url: map[k] };
      });
  }

  /* ── 3. Escape string for use in RegExp ──────────────────────────────── */
  function esc(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /* ── 4. Build one combined RegExp for all tool names ─────────────────── */
  function buildPattern(entries) {
    var alts = entries.map(function (e) { return esc(e.lower); });
    /* Case-insensitive, word boundary — but allow punctuation after (e.g. "Canva,") */
    return new RegExp("(?<![\\w\\-])(" + alts.join("|") + ")(?![\\w\\-])", "gi");
  }

  /* ── 5. Replace tool mentions in a single text node ─────────────────── */
  function replaceTextNode(node, pattern, map, linked) {
    var text = node.nodeValue;
    if (!pattern.test(text)) return false;
    pattern.lastIndex = 0;

    var frag   = document.createDocumentFragment();
    var last   = 0;
    var match;

    while ((match = pattern.exec(text)) !== null) {
      var key = match[0].toLowerCase();
      var url = map[key];
      if (!url) continue;

      /* Only link the first occurrence of each tool on the page */
      if (linked.has(key)) continue;
      linked.add(key);

      /* Text before the match */
      if (match.index > last) {
        frag.appendChild(document.createTextNode(text.slice(last, match.index)));
      }

      /* The affiliate link */
      var a = document.createElement("a");
      a.href   = url;
      a.target = "_blank";
      a.rel    = "sponsored noopener nofollow";
      a.className = "aff-link";
      a.textContent = match[0];
      a.title  = "Try " + match[0] + " →";
      a.setAttribute("data-tool", match[0]);
      a.addEventListener("click", makeTracker(match[0], url));
      frag.appendChild(a);

      last = match.index + match[0].length;
    }

    /* Remaining text */
    if (last < text.length) {
      frag.appendChild(document.createTextNode(text.slice(last)));
    }

    /* Only replace if we actually made changes */
    if (last > 0) {
      node.parentNode.replaceChild(frag, node);
      return true;
    }
    return false;
  }

  /* ── 6. GA4 + localStorage click tracker ─────────────────────────────── */
  function makeTracker(toolName, url) {
    return function () {
      if (window.dataLayer) {
        window.dataLayer.push({
          event:        "tool_click",
          tool_name:    toolName,
          is_affiliate: true,
          destination:  url,
          source:       "auto_link"
        });
      }
      try {
        var c = JSON.parse(localStorage.getItem(LS_CLICKS) || "{}");
        c[toolName] = (c[toolName] || 0) + 1;
        localStorage.setItem(LS_CLICKS, JSON.stringify(c));
      } catch (e) {}
    };
  }

  /* ── 7. Walk all text nodes inside a container ───────────────────────── */
  function walkContainer(root, pattern, map, linked) {
    /* Collect text nodes first (modifying DOM during walk causes issues) */
    var nodes = [];

    var walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          /* Skip if inside an excluded tag */
          var p = node.parentElement;
          while (p && p !== root) {
            if (SKIP_TAGS.has(p.tagName)) return NodeFilter.FILTER_REJECT;
            p = p.parentElement;
          }
          /* Skip whitespace-only nodes */
          if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    var n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (n) { replaceTextNode(n, pattern, map, linked); });
  }

  /* ── 8. Wire manual [data-tool] links (explicit affiliate anchors) ───── */
  function wireDataToolLinks(map, linked) {
    document.querySelectorAll("a[data-tool]").forEach(function (el) {
      var key = (el.dataset.tool || "").toLowerCase();
      var url = map[key];
      if (!url) return;
      el.href = url;
      el.rel  = "sponsored noopener nofollow";
      el.target = "_blank";
      if (!el.classList.contains("aff-link")) el.classList.add("aff-link");
      el.removeEventListener("click", el._affTracker || function(){});
      el._affTracker = makeTracker(el.dataset.tool, url);
      el.addEventListener("click", el._affTracker);
      linked.add(key);
    });
  }

  /* ── 9. Main entry point ─────────────────────────────────────────────── */
  function init() {
    var map     = buildMap();
    var entries = buildEntries(map);
    if (entries.length === 0) return; /* no tool data loaded yet */

    var pattern = buildPattern(entries);
    var linked  = new Set(); /* tracks which tools have been linked (per page) */

    /* Wire manual data-tool links first (they get priority) */
    wireDataToolLinks(map, linked);

    /* Auto-link in content containers */
    var found = false;
    SEARCH_SELECTORS.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        /* Avoid double-processing nested selectors */
        if (el.dataset.affProcessed) return;
        el.dataset.affProcessed = "1";
        walkContainer(el, pattern, map, linked);
        found = true;
      });
    });

    /* Fallback: if no specific containers found, walk the whole body */
    if (!found) {
      var body = document.querySelector("body");
      if (body) walkContainer(body, pattern, map, linked);
    }
  }

  /* Run after DOM ready */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
