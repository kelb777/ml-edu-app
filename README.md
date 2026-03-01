# ML Fundamentals — Interactive Education Web App

An interactive, non-technical educational web application teaching machine learning concepts through real-world analogies, visual comparisons, and hands-on interactive demos.

## Features

- **15 modules** covering the full ML lifecycle: data prep → models → metrics → deployment → MLOps → emerging tech
- **Interactive demos** in every module: draggable scatter plots, clickable decision trees, animated neural networks, confusion matrices, cost estimators, and more
- **Progressive definitions** (ELI5 → ELI30) for each model type
- **Light/dark mode** with system preference detection and iOS-style pill toggle
- **Fully responsive** — works on mobile, tablet, and desktop
- **Zero dependencies** — vanilla HTML, CSS, and JavaScript
- **Modular architecture** — add new modules by editing `modules.js` and `interactions.js`

## Project Structure

```
ml-edu-app/
├── index.html          # Main entry point (shell + navigation)
├── css/
│   ├── base.css        # Resets, antialiasing, CSS custom properties
│   ├── theme.css       # Light/dark mode tokens, brand colors
│   ├── layout.css      # Grid, responsive, spacing system
│   └── components.css  # Cards, buttons, tabs, accordions, callouts
├── js/
│   ├── app.js          # Main app controller, routing, theme toggle
│   ├── modules.js      # Module content data — all text/HTML for each module
│   └── interactions.js # All interactive elements per module
├── README.md           # This file
└── vercel.json         # Vercel deployment config
```

## The 15 Modules

### Before the Model
1. **Data Preprocessing Pipeline** — Raw vs. clean data, garbage in/garbage out, missing data, data splitting
2. **Feature Engineering Deep Dive** — Creating features, encoding categories, scaling/normalization

### The Models
3. **Linear Regression** — Ruler on a dot-plot analogy, draggable line interactive
4. **Decision Trees** — 20 Questions analogy, clickable branching tree
5. **Neural Networks** — Baking judges analogy, animated data flow
6. **Random Cut Forests** — Parking lot analogy, outlier detection demo
7. **XGBoost** — Team of specialists analogy, step-by-step boosting animation

### Model Comparison
8. **Compare All Models** — Sortable comparison table across all dimensions

### Beyond the Model
9. **Model Performance Metrics** — Accuracy paradox, precision/recall/F1, interactive confusion matrix
10. **Explainability Spectrum** — Black-box ↔ explainable toggle, regulatory landscape
11. **Deployment & Infrastructure** — Cloud/on-prem/edge, GPU explainer, cost estimator
12. **MLOps & Monitoring** — Model drift, data vs. concept drift, animated drift timeline

### What's Next
13. **Tabular Foundation Models** — TabPFN benchmarks, traditional vs. foundation model comparison
14. **Buyer FAQ Cheat Sheet** — 10 expandable FAQ cards with data-backed answers

### Bonus
15. **Competitive Landscape** — Interactive taxonomy of ML approaches

## Development

No build tools required. Open `index.html` in a browser:

```bash
# With Python
python3 -m http.server 8000

# Or just open in browser
open index.html
```

## Adding a New Module

1. Add a module object to the `MODULES` array in `js/modules.js`
2. Add the module ID to the appropriate section in `MODULE_SECTIONS`
3. Add a case to `initInteractions()` in `js/interactions.js` with your interactive function
4. The navigation and progress tracking update automatically

## Technical Notes

- **No localStorage/sessionStorage** — all state is in-memory (safe for sandboxed iframes)
- **No external dependencies** — everything is vanilla JS, CSS, and inline SVG
- **Hash-based routing** — supports browser back/forward and direct links
- **All external links** use `target="_blank" rel="noopener noreferrer"`
- **System font stack** — SF Pro, Inter, system-ui for fast loading

## Deployment

### Vercel
Push to GitHub and import in Vercel. The `vercel.json` config handles clean routing.

### GitHub Pages
Enable Pages in repo settings and point to the root directory.

### Any Static Host
Upload the entire directory — it's a static site with no server requirements.

## License

Educational content. All research sourced from verified publications.