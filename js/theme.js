/* MyAI ToolsFinder — shared theme loader (articles & sub-pages)
   Must run before first paint. Reads myai_theme_v1 from localStorage
   and applies the correct colour variables to <html>. */
(function(){
  try {
    var _t = localStorage.getItem('myai_theme_v1');
    if (!_t || _t === 'blue') return;

    var r = document.documentElement;

    /* Named theme → set CSS custom properties directly so articles
       don't need [data-theme] CSS rules in their own stylesheet */
    var themes = {
      purple:  ['#7c3aed','#6d28d9','#ede9fe','#f5f3ff','#ddd6fe','#f5f3ff'],
      green:   ['#059669','#047857','#d1fae5','#ecfdf5','#a7f3d0','#ecfdf5'],
      amber:   ['#d97706','#b45309','#fef3c7','#fffbeb','#fde68a','#fffbeb'],
      rose:    ['#e11d48','#be123c','#ffe4e6','#fff1f2','#fecdd3','#fff1f2'],
      cyan:    ['#0891b2','#0e7490','#cffafe','#ecfeff','#a5f3fc','#ecfeff'],
      indigo:  ['#4338ca','#3730a3','#e0e7ff','#eef2ff','#c7d2fe','#eef2ff'],
      slate:   ['#475569','#334155','#e2e8f0','#f1f5f9','#cbd5e1','#f1f5f9'],
      lime:    ['#65a30d','#4d7c0f','#d9f99d','#f7fee7','#bef264','#f7fee7'],
      violet:  ['#9333ea','#7e22ce','#f3e8ff','#faf5ff','#e9d5ff','#faf5ff'],
      orange:  ['#ea580c','#c2410c','#ffedd5','#fff7ed','#fed7aa','#fff7ed'],
      sky:     ['#0284c7','#0369a1','#e0f2fe','#f0f9ff','#bae6fd','#f0f9ff'],
      pink:    ['#db2777','#be185d','#fce7f3','#fdf2f8','#fbcfe8','#fdf2f8'],
      teal:    ['#0d9488','#0f766e','#ccfbf1','#f0fdfa','#99f6e4','#f0fdfa'],
      fuchsia: ['#c026d3','#a21caf','#fae8ff','#fdf4ff','#f0abfc','#fdf4ff'],
      red:     ['#dc2626','#b91c1c','#fee2e2','#fef2f2','#fecaca','#fef2f2'],
      gold:    ['#ca8a04','#a16207','#fef9c3','#fefce8','#fde047','#fefce8'],
      brown:   ['#92400e','#78350f','#fef3c7','#fdf6ec','#fcd9a0','#fdf6ec']
    };

    if (_t.indexOf('custom:') === 0) {
      /* Custom hue — compute colours */
      var h = parseFloat(_t.split(':')[1]);
      if (isNaN(h)) return;
      var hsl = function(hue, s, l) {
        s /= 100; l /= 100;
        var a = s * Math.min(l, 1 - l);
        var f = function(n) {
          var k = (n + hue / 30) % 12;
          return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        };
        return '#' + [f(0), f(8), f(4)].map(function(x) {
          return Math.round(x * 255).toString(16).padStart(2, '0');
        }).join('');
      };
      r.style.setProperty('--primary',       hsl(h, 75, 38));
      r.style.setProperty('--primary-2',     hsl(h, 75, 28));
      r.style.setProperty('--primary-light', hsl(h, 80, 90));
      r.style.setProperty('--surface-2',     hsl(h, 60, 96));
      r.style.setProperty('--border',        hsl(h, 60, 82));
      r.style.setProperty('--bg',            hsl(h, 55, 96));
    } else if (themes[_t]) {
      var c = themes[_t];
      r.style.setProperty('--primary',       c[0]);
      r.style.setProperty('--primary-2',     c[1]);
      r.style.setProperty('--primary-light', c[2]);
      r.style.setProperty('--surface-2',     c[3]);
      r.style.setProperty('--border',        c[4]);
      r.style.setProperty('--bg',            c[5]);
    }
  } catch(e) {}
})();
