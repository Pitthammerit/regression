# Tailwind v3 vs v4 — Visual Comparison

**Date:** 2026-03-27
**Purpose:** Side-by-side comparison of v3 and v4 configuration

---

## 1. CONFIG FILE STRUCTURE

### Tailwind v3 (Current)
```
frontend/
├── tailwind.config.js  ← JavaScript config
├── package.json        ← tailwindcss@^3.4.0
├── postcss.config.js   ← PostCSS setup
└── src/
    └── index.css       ← @tailwind directives
```

### Tailwind v4 (Target)
```
frontend/
├── tailwind.config.css ← CSS config (NEW!)
├── package.json        ← tailwindcss@next
├── postcss.config.js   ← Optional (v4 includes PostCSS)
└── src/
    └── index.css       ← @import + @utility
```

---

## 2. CONFIG FORMAT COMPARISON

### v3: JavaScript Config
```javascript
// frontend/tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-heading': '#224160',
        'color-body': '#5A5550',
        'on-dark-body': '#FFFFFFCC',
      },
      fontSize: {
        'h2': ['2.25rem', { lineHeight: '1.2' }],
        'label': ['0.94rem', {
          lineHeight: '1.5',
          letterSpacing: '0.2em',
        }],
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.label': {
          'line-height': '1.5',
          'letter-spacing': '0.2em',
          'text-transform': 'uppercase',
        },
        '.content-spacing': {
          'margin-bottom': '1.5rem',
        },
      })
    }),
  ],
}
```

### v4: CSS Config
```css
/* frontend/tailwind.config.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-heading: #224160;
  --color-body: #5A5550;
  --color-on-dark-body: rgba(255, 255, 255, 0.8);

  /* Typography */
  --font-h2: 2.25rem;
  --line-height-h2: 1.2;

  --font-label: 0.94rem;
  --line-height-label: 1.5;
  --letter-spacing-label: 0.2em;
}

/* Utilities (in index.css, not config) */
@utility label {
  line-height: 1.5;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

@utility content-spacing {
  margin-bottom: 1.5rem;
}
```

---

## 3. CSS FILE COMPARISON

### v3: index.css
```css
/* frontend/src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #F0EBE1;
  font-family: 'DM Sans', system-ui, sans-serif;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### v4: index.css
```css
/* frontend/src/index.css */
@import "tailwindcss";

/* Utility definitions (from plugin) */
@utility label {
  line-height: 1.5;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

@utility content-spacing {
  margin-bottom: 1.5rem;
}

/* ... 29 more @utility definitions ... */

body {
  background-color: #F0EBE1;
  font-family: 'DM Sans', system-ui, sans-serif;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 4. COMPONENT CODE COMPARISON

### v3: Component with Plugin Utilities
```jsx
// ServicesSection.jsx (CURRENT)
<span className="font-primary text-label tracking-label-alt label text-color-label">
  {service.sub}
</span>

<div className="max-w-centered-header content-spacing text-center">
  <h2 className="text-h2 text-color-heading">{headline}</h2>
</div>
```

### v4: Component (IDENTICAL!)
```jsx
// ServicesSection.jsx (AFTER MIGRATION)
<span className="font-primary text-label tracking-label-alt label text-color-label">
  {service.sub}
</span>

<div className="max-w-centered-header content-spacing text-center">
  <h2 className="text-h2 text-color-heading">{headline}</h2>
</div>
```

**Key Insight:** Component code DOESN'T CHANGE!

---

## 5. COLOR TOKEN CONVERSION

### v3: Hex-Alpha Format
```javascript
// tailwind.config.js (v3)
colors: {
  'color-card-overlay': '#ffffff80',      // 50% opacity
  'on-dark-body':    '#FFFFFFCC',         // 80% opacity
  'on-dark-role':    '#ffffff9c',         // 61% opacity
  'on-dark-divider': '#ffffff33',         // 20% opacity
  'color-overlay-dark': '#00000040',      // 25% opacity
}
```

### v4: RGBA Format
```css
/* tailwind.config.css (v4) */
@theme {
  --color-card-overlay: rgba(255, 255, 255, 0.5);
  --color-on-dark-body: rgba(255, 255, 255, 0.8);
  --color-on-dark-role: rgba(255, 255, 255, 0.61);
  --color-on-dark-divider: rgba(255, 255, 255, 0.2);
  --color-overlay-dark: rgba(0, 0, 0, 0.25);
}
```

**Conversion Table:**
| Hex-Alpha | RGBA | Opacity |
|-----------|------|---------|
| `#ffffff80` | `rgba(255, 255, 255, 0.5)` | 50% |
| `#FFFFFFCC` | `rgba(255, 255, 255, 0.8)` | 80% |
| `#ffffff9c` | `rgba(255, 255, 255, 0.61)` | 61% |
| `#ffffff33` | `rgba(255, 255, 255, 0.2)` | 20% |
| `#00000040` | `rgba(0, 0, 0, 0.25)` | 25% |

---

## 6. TYPOGRAPHY TOKEN CONVERSION

### v3: Array Format with Properties
```javascript
// tailwind.config.js (v3)
fontSize: {
  'hero-large': ['clamp(2.4rem, 6.6vw, 5.4rem)', {
    lineHeight: '1',
    letterSpacing: '-0.02em',
  }],
  'label': ['0.94rem', {
    lineHeight: '1.5',
    letterSpacing: '0.2em',
  }],
}
```

### v4: Individual CSS Variables
```css
/* tailwind.config.css (v4) */
@theme {
  --font-hero-large: clamp(2.4rem, 6.6vw, 5.4rem);
  --line-height-hero-large: 1;
  --letter-spacing-hero-large: -0.02em;

  --font-label: 0.94rem;
  --line-height-label: 1.5;
  --letter-spacing-label: 0.2em;
}
```

---

## 7. PLUGIN UTILITY → @UTILITY CONVERSION

### v3: addUtilities() Plugin
```javascript
// tailwind.config.js (v3)
plugins: [
  plugin(function({ addUtilities }) {
    addUtilities({
      '.label': {
        'line-height': '1.5',
        'letter-spacing': '0.2em',
        'text-transform': 'uppercase',
        'font-weight': '400',
      },
      '.content-spacing': {
        'margin-bottom': '1.5rem',
      },
      '.transition-slower': {
        'transition-duration': '700ms',
      },
    })
  }),
]
```

### v4: @utility CSS
```css
/* frontend/src/index.css (v4) */
@utility label {
  line-height: 1.5;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 400;
}

@utility content-spacing {
  margin-bottom: 1.5rem;
}

@utility transition-slower {
  transition-duration: 700ms;
}
```

---

## 8. MIGRATION CHECKLIST

### Step 1: Install v4
```bash
npm install tailwindcss@next
```

### Step 2: Create CSS Config
```bash
cat > frontend/tailwind.config.css << 'EOF'
@import "tailwindcss";

@theme {
  /* Copy tokens from v3 config */
}
EOF
```

### Step 3: Migrate Plugin Utilities
```bash
# Add to frontend/src/index.css
cat >> frontend/src/index.css << 'EOF'
@utility label {
  line-height: 1.5;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

/* ... 30 more @utility definitions ... */
EOF
```

### Step 4: Remove Old Config
```bash
rm frontend/tailwind.config.js
```

### Step 5: Update index.css Import
```css
/* Change from: */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* To: */
@import "tailwindcss";
```

### Step 6: Build & Test
```bash
npm run build
# Check for errors
# Deploy to Cloudflare
# Test all sections
```

---

## 9. FILE SIZE COMPARISON

### v3: JavaScript Config
```javascript
// tailwind.config.js: ~305 lines
// - 66 lines: colors
// - 95 lines: fontSize
// - 125 lines: plugin utilities
// - 19 lines: other config
```

### v4: CSS Config
```css
/* tailwind.config.css: ~120 lines (estimated) */
/* - 30 lines: @theme colors */
/* - 60 lines: @theme typography */
/* - 30 lines: other @theme values */

/* index.css: +150 lines (added) */
/* - 150 lines: @utility definitions */

/* Total: ~270 lines (vs 305 lines) */
/* Slightly smaller! */
```

---

## 10. BUILD PERFORMANCE COMPARISON

### v3: Create React App + Webpack
```
Build time: ~45 seconds
HMR speed: ~2-3 seconds
Bundle size: ~200KB gzipped
```

### v4: Vite (Expected)
```
Build time: ~15 seconds (3x faster)
HMR speed: ~100ms (instant)
Bundle size: ~180KB gzipped (10% smaller)
```

**Note:** Actual performance may vary, but v4 + Vite should be significantly faster.

---

## 11. CLASS NAME COMPATIBILITY

### ✅ 100% Compatible Class Names

**All component code stays the same:**
```jsx
// These work in BOTH v3 and v4
"text-h2"
"text-color-heading"
"text-label label"
"content-spacing"
"transition-slower"
"bg-on-dark-bg"
```

**No component changes needed!**

---

## 12. MIGRATION RISK ASSESSMENT

| Risk Area | v3 → v4 Risk | Mitigation |
|-----------|-------------|------------|
| **Class names** | LOW | Don't change! |
| **Colors** | LOW | Simple conversion |
| **Typography** | LOW | Simple conversion |
| **Plugin utilities** | HIGH | Use @utility |
| **Build system** | MEDIUM | Test thoroughly |
| **Browser support** | LOW | v4 similar to v3 |
| **Performance** | LOW | Should improve |
| **Developer workflow** | LOW | Familiar patterns |

**Overall Risk: MEDIUM (managed with proper testing)**

---

## Summary

**Key Changes:**
1. Config: JavaScript → CSS
2. Colors: Hex-alpha → rgba()
3. Typography: Array format → CSS variables
4. Plugins: addUtilities() → @utility

**What Doesn't Change:**
1. Component class names ✅
2. HTML structure ✅
3. Visual appearance ✅
4. User experience ✅

**Migration Effort: ~20 hours (single pass after typography complete)**

---

**Last updated:** 2026-03-27
**Status:** Ready to execute after Typography Migration (16/17 complete)
