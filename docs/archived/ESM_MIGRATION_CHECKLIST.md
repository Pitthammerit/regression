# ESM Migration Quick Reference

**For immediate use during migration**

---

## Current State (March 2026)

**Config:** CommonJS
```javascript
// tailwind.config.js
const plugin = require('tailwindcss/plugin')
module.exports = { ... }
```

**Build:** Create React App (webpack)
```json
{
  "scripts": {
    "build": "react-scripts build"
  }
}
```

**Tailwind:** v3.4.19
**Package Type:** None (defaults to CJS)

---

## Migration Option: Hybrid (Not Recommended)

### Changes Required

1. **Rename config file:**
   ```bash
   mv frontend/tailwind.config.js frontend/tailwind.config.mjs
   ```

2. **Convert to ESM syntax:**
   ```javascript
   // tailwind.config.mjs
   import plugin from 'tailwindcss/plugin'

   export default {
     content: ['./src/**/*.{js,jsx,ts,tsx}'],
     theme: {
       extend: {
         // ... same config
       },
     },
     plugins: [
       plugin(function({ addUtilities }) {
         // ... same plugin
       }),
     ],
   }
   ```

3. **Test build:**
   ```bash
   npm --prefix frontend run build
   ```

**Why NOT Recommended:**
- Doesn't enable full ESM benefits
- Adds complexity (mixed module systems)
- Still can't use Tailwind v4 CSS-first
- Unnecessary intermediate step

---

## Recommended Path: Vite → Tailwind v4

### Phase 1: Vite Migration (After Typography)

**Install Vite:**
```bash
npm --prefix frontend install --save-dev vite @vitejs/plugin-react
npm --prefix frontend uninstall react-scripts
```

**Create vite.config.js:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
})
```

**Update package.json:**
```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**Move index.html:**
```bash
mv frontend/public/index.html frontend/index.html
```

**Update index.html:**
```html
<!-- Change this: -->
<script src="/static/js/bundle.js"></script>

<!-- To this: -->
<script type="module" src="/src/main.jsx"></script>
```

**Create src/main.jsx (if needed):**
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

**Update src/index.js:**
```javascript
// Remove this:
// ReactDOM.render(...)
// Add this:
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
```

**Test Vite:**
```bash
npm --prefix frontend run dev
# Should start on http://localhost:3000
# HMR should work instantly

npm --prefix frontend run build
# Should be faster than CRA

npm --prefix frontend run preview
# Test production build locally
```

---

### Phase 2: Tailwind v4 Migration (After Vite)

**Install Tailwind v4:**
```bash
npm --prefix frontend install tailwindcss@next
```

**Create CSS-first config:**
```css
/* tailwind.config.css */
@import "tailwindcss";

@theme {
  /* Typography Tokens */
  --font-hero-large: clamp(2.4rem, 5vw, 5.4rem);
  --font-hero: clamp(1.44rem, 2.5vw, 3.36rem);
  --font-h1: 48px;
  --font-h2: 36px;
  --font-h3: 30px;
  --font-h4: 24px;
  --font-body: 18px;
  --font-body-lg: 20px;
  --font-label: ~15px;
  --font-subline: 16px;
  --font-quote-featured: 36px;
  --font-quote: 24px;
  --font-author-name: 32px;
  --font-summary-large: 26px;
  --font-body-narrative: 18px;
  --font-date: 14px;
  --font-disclaimer: 12px;
  --font-read-more: 14px;
  --font-source-link: 14px;
  --font-hint: 14px;

  /* Line Heights */
  --line-height-hero: 1.1;
  --line-height-h1: 1.2;
  --line-height-h2: 1.2;
  --line-height-h3: 1.2;
  --line-height-h4: 1.2;
  --line-height-body: 1.75;
  --line-height-body-lg: 1.625;
  --line-height-label: 1.5;
  --line-height-subline: 1.5;
  --line-height-quote: 1.1;
  --line-height-summary-large: 1.6;
  --line-height-narrative: 1.75;

  /* Color Tokens */
  --color-heading: #224160;
  --color-body: #5A5550;
  --color-label: #7696AD;
  --color-accent: #2DAD71;
  --color-star: #F59E0B;

  --on-dark-heading: #ffffff;
  --on-dark-quote: #ffffff;
  --on-dark-body: rgba(255, 255, 255, 0.8);
  --on-dark-role: rgba(255, 255, 255, 0.61);
  --on-dark-date: rgba(255, 255, 255, 0.61);
  --on-dark-label: rgba(255, 255, 255, 0.61);
  --on-dark-accent: #ffffff;
  --on-dark-divider: rgba(255, 255, 255, 0.2);

  --color-border: rgba(0, 0, 0, 0.1);

  /* Spacing Utilities */
  --section-padding: 5rem 0;
  --section-block-spacing: 4rem;
  --content-spacing: 1.5rem;
  --content-spacing-md: 1rem;
  --content-spacing-lg: 2rem;
  --label-heading-spacing: 0.7rem;
  --name-role-spacing: 0.25rem;
  --role-date-spacing: 0.25rem;
  --block-label-spacing: 0.75rem;
}
```

**Update src/index.css:**
```css
@import "tailwindcss";
@import "../tailwind.config.css";

/* Custom styles */
body {
  background-color: #F0EBE1;
  /* ... rest of styles */
}
```

**Remove old config:**
```bash
rm frontend/tailwind.config.mjs
```

**Test v4:**
```bash
npm --prefix frontend run build
npm --prefix frontend run preview
```

---

## Rollback Commands

### Rollback Vite Migration
```bash
git checkout main
git branch -D vite-migration
git checkout backup/pre-vite-migration
npm --prefix frontend install
npm --prefix frontend run build
```

### Rollback Tailwind v4 Migration
```bash
npm --prefix frontend install tailwindcss@^3.4.0
git checkout HEAD~1 frontend/tailwind.config.css
git checkout HEAD~1 frontend/src/index.css
npm --prefix frontend run build
```

---

## Testing Checklist

### Pre-Migration
- [ ] Current build works: `npm run build`
- [ ] Dev server works: `npm run dev`
- [ ] No console errors
- [ ] All sections render

### Post-Vite
- [ ] Dev server starts: `npm run dev`
- [ ] HMR works (instant updates)
- [ ] Build works: `npm run build`
- [ ] Build faster than before
- [ ] Preview works: `npm run preview`
- [ ] All sections render
- [ ] No console errors

### Post-Tailwind v4
- [ ] Build works: `npm run build`
- [ ] CSS contains custom properties
- [ ] All typography tokens work
- [ ] Visual output identical
- [ ] Performance improved

---

## Cloudflare Pages (No Changes Needed)

**Current Settings:**
- Build command: `npm run build`
- Output directory: `frontend/build`
- Root directory: `frontend`

**After Migration:**
- Build command: `npm run build` (same)
- Output directory: `frontend/build` (same)
- Root directory: `frontend` (same)

**Auto-deploy still works:**
```bash
git add .
git commit -m "migrate: Vite + Tailwind v4"
git push origin main
# Cloudflare deploys automatically
```

---

## Quick Reference Card

### Before Migration
```bash
npm --prefix frontend run build   # react-scripts build
npm --prefix frontend run dev     # webpack dev server
```

### After Vite Migration
```bash
npm --prefix frontend run build   # vite build (faster)
npm --prefix frontend run dev     # vite dev server (faster HMR)
npm --prefix frontend run preview # vite preview (test production build)
```

### After Tailwind v4 Migration
```bash
# Same commands, but uses CSS-first config
npm --prefix frontend run build
npm --prefix frontend run dev
npm --prefix frontend run preview
```

---

## File Changes Summary

### Files to Create
- `frontend/vite.config.js` — Vite configuration
- `frontend/index.html` — Moved from public/
- `frontend/src/main.jsx` — New entry point (if needed)
- `frontend/tailwind.config.css` — Tailwind v4 CSS-first config

### Files to Modify
- `frontend/package.json` — Add "type": "module", update scripts
- `frontend/src/index.js` — Convert to createRoot API
- `frontend/src/index.css` — Update imports for v4

### Files to Delete
- `frontend/tailwind.config.js` or `.mjs` — Replaced by CSS config
- `frontend/public/index.html` — Moved to root

### Files to Keep
- `frontend/src/components/**` — No changes
- `frontend/src/content/**` — No changes
- `frontend/src/config/**` — No changes

---

## Common Issues & Solutions

### Issue: "Cannot use import statement outside a module"
**Solution:** Add `"type": "module"` to package.json

### Issue: "react-scripts is not found"
**Solution:** `npm --prefix frontend install react-scripts` (rollback to CRA)

### Issue: "vite: Cannot find /src/main.jsx"
**Solution:** Create src/main.jsx or update index.html script src

### Issue: "Tailwind config not found"
**Solution:** Ensure tailwind.config.css is in frontend/ root

### Issue: "Custom properties not working"
**Solution:** Check @import order in index.css (tailwindcss first, then config)

---

**Last Updated:** 2026-03-28
**Full Analysis:** See `ESM_MIGRATION_ANALYSIS.md`
