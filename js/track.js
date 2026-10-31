/* track.js — shared GA4 event tracking for My AI Tools Finder.
   Records the things plain page views can't show: did people see the
   sign-up box, click toward it, share, or really read the article.
   Safe everywhere: does nothing if Analytics is blocked or missing. */
(function () {
  function trk(name, params) { try { if (typeof gtag === 'function') gtag('event', name, params || {}); } catch (e) {} }
  window.trk = trk;
  var path = location.pathname;

  document.addEventListener('DOMContentLoaded', function () {
    // 1) The sign-up box actually scrolled into view (denominator for conversion rate)
    var nl = document.getElementById('newsletter');
    if (nl && 'IntersectionObserver' in window) {
      var seen = false;
      // "Seen" = at least half of the box, or half the screen if the box is taller than that
      new IntersectionObserver(function (es, o) {
        es.forEach(function (e) {
          var need = Math.min(e.boundingClientRect.height * 0.5, window.innerHeight * 0.5);
          if (e.isIntersecting && !seen && e.intersectionRect.height >= need) { seen = true; trk('newsletter_view', { placement: 'page' }); o.disconnect(); }
        });
      }, { threshold: [0.05, 0.25, 0.5, 0.75, 1] }).observe(nl);
    }
    // 2) How far people really read an article
    if (/\/articles\/[^\/]+\.html$/.test(path)) {
      var f25 = false, f75 = false;
      window.addEventListener('scroll', function () {
        var h = document.documentElement, p = (h.scrollTop + window.innerHeight) / Math.max(1, h.scrollHeight);
        if (!f25 && p > 0.25) { f25 = true; trk('article_read_25'); }
        if (!f75 && p > 0.75) { f75 = true; trk('article_read_75'); }
      }, { passive: true });
    }
  });

  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    // 3) Clicked a "Subscribe" link that points at the sign-up box
    var a = t.closest('a');
    if (a && /#newsletter/.test(a.getAttribute('href') || '')) trk('newsletter_cta_click', { link_text: (a.textContent || '').trim().slice(0, 40) });
    // 4) Shared an article / tool page
    var sb = t.closest('.share-btn');
    if (sb) {
      var m = (sb.getAttribute('href') || '').match(/twitter|facebook|linkedin|reddit/);
      trk('share_click', { method: m ? m[0] : (sb.id === 'copy-url-btn' ? 'copy_link' : 'other') });
    }
  }, true);
})();
