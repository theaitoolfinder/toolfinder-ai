# Claude Instructions — MyAI ToolsFinder

## ALWAYS DO AFTER EVERY CODE CHANGE

After making any file edits, **always** run these two commands before saying you're done:

```bash
git add <changed files>
git commit -m "description"
git push
```

**Never say "it's done" without pushing.** The site is on GitHub Pages — changes only go live after push.

## Project Info

- **Live site:** https://myaitoolsfinder.com (GitHub Pages, auto-deploys from `main`)
- **Repo:** https://github.com/theaitoolfinder/toolfinder-ai
- **Local path:** /Users/benjiegadiaza/projects/toolfinder-ai/

## Key Files

- `index.html` — main tool directory (monolithic, ~5000 lines)
- `js/tutorials-data.js` — single source of truth for all tutorial content
- `tutorials.html` — tutorials listing page
- `tutorials/view.html` — universal tutorial viewer (URL param driven)
- `data/affiliate_tools.json` — affiliate tools list
- `js/theme.js` — theme switcher
- `quiz.html` — AI personality quiz

## Design Rules

- Font: Poppins
- Primary color: `#1a56db` (light) / `#3b82f6` (dark)
- Hero gradient: `var(--hero-grad)`
- No emojis in nav or professional UI elements
- Always match existing design language (frosted glass nav, pill buttons, card shadows)

## Tutorial Lock System

- Basic = always free
- Intermediate = `localStorage.getItem('tut_subscribed') === '1'`
- Advanced = subscribed + `localStorage.getItem('tut_tried_[toolid]') === '1'`
