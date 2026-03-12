# CLAUDE.md — ML Edu App

*Last updated: 03-11-26*

Interactive machine learning education app with 15 modules. Vanilla JS SPA with zero dependencies, hash-based routing, light/dark mode. Deployed to Vercel.

## Dev Commands

```bash
python3 -m http.server 8000    # local dev server
vercel --prod                  # deploy to production
```

## Project Structure

```
ml-edu-app/
├── index.html                 # app shell + navigation
├── vercel.json                # SPA rewrites, security headers, cache control
├── js/
│   ├── app.js                 # routing, theme toggle, main controller
│   ├── modules.js             # 15 module content definitions
│   └── interactions.js        # interactive demos per module
└── css/
    ├── base.css / theme.css / layout.css / components.css
```

## Architecture Notes

- Hash-based routing with browser back/forward support
- Progressive definitions (ELI5 → ELI30) per concept
- System font stack, no localStorage (safe for sandboxed iframes)
- All state in-memory — no persistence layer
- To add modules: define in `modules.js` + add interactions in `interactions.js`

## Gotchas

- No build step, no npm dependencies — everything is vanilla JS + inline SVG
- No ESLint or test suite — verify visually or with `vercel --prod`
