(function(){
  if(window.innerWidth>767&&!('ontouchstart' in window))return;

  var css='#mob-bottom-nav{display:none;position:fixed;bottom:0;left:0;right:0;z-index:499;height:56px;background:var(--surface,#fff);border-top:1px solid var(--border-soft,#e5e7eb);box-shadow:0 -2px 16px rgba(0,0,0,.08);align-items:stretch}'
    +'.mob-nav-item{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:var(--text-dim,#6b7280);font-size:10px;font-weight:500;text-decoration:none;padding:6px 0;transition:color .15s;-webkit-tap-highlight-color:transparent;position:relative}'
    +'.mob-nav-item svg{flex-shrink:0;opacity:.65;transition:opacity .15s}'
    +'.mob-nav-item.active,.mob-nav-item:hover{color:var(--primary,#1a56db)}'
    +'.mob-nav-item.active svg,.mob-nav-item:hover svg{opacity:1}'
    +'.mob-nav-dot{display:none;width:4px;height:4px;border-radius:50%;background:var(--primary,#1a56db);position:absolute;bottom:5px}'
    +'.mob-nav-item.active .mob-nav-dot{display:block}'
    +'@media(max-width:767px){#mob-bottom-nav{display:flex}body{padding-bottom:60px}#cb-btn{bottom:70px!important}#clippy-speech{bottom:178px!important}#cb-win{bottom:178px!important;max-height:calc(100vh - 228px)!important}.cmp-tray{bottom:56px!important}.cmp-toast{bottom:136px!important}#ath-toast{bottom:220px!important}}';

  var style=document.createElement('style');
  style.textContent=css;
  document.head.appendChild(style);

  var html='<div id="mob-bottom-nav" role="navigation" aria-label="Mobile navigation">'
    +'<a class="mob-nav-item" href="/" id="mobnav-home"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span>Tools</span><span class="mob-nav-dot"></span></a>'
    +'<a class="mob-nav-item" href="/articles.html" id="mobnav-articles"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h10"/></svg><span>Articles</span><span class="mob-nav-dot"></span></a>'
    +'<a class="mob-nav-item" href="/prompts.html" id="mobnav-prompts"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span>Prompts</span><span class="mob-nav-dot"></span></a>'
    +'<a class="mob-nav-item" href="/tutorials.html" id="mobnav-tutorials"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg><span>Tutorials</span><span class="mob-nav-dot"></span></a>'
    +'<a class="mob-nav-item" href="/quiz.html" id="mobnav-quiz"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><span>Quiz</span><span class="mob-nav-dot"></span></a>'
    +'</div>';

  document.body.insertAdjacentHTML('beforeend', html);

  // Set active tab
  var path=location.pathname;
  var id=path==='/'||path==='/index.html'?'mobnav-home'
    :path.indexOf('articles')>-1?'mobnav-articles'
    :path.indexOf('prompts')>-1?'mobnav-prompts'
    :path.indexOf('tutorial')>-1?'mobnav-tutorials'
    :path.indexOf('quiz')>-1?'mobnav-quiz'
    :null;
  if(id){var el=document.getElementById(id);if(el)el.classList.add('active');}
})();
