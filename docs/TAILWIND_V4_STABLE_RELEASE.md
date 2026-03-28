# Tailwind CSS v4.0 — Stable Release & Migration Guide

**Date:** 2026-03-28
**Current Version:** v3.0.2
**Target Version:** v4.0 (STABLE — Released January 22, 2025)
**Branch:** typography-refactoring
**Status:** 🟢 **READY TO MIGRATE** — After Typography Phase 3B completes

---

## Executive Summary

**Tailwind CSS v4.0 is now STABLE** — no longer alpha/beta. This changes everything: migration is now recommended, not speculative.

**Key Benefits:**
- ⚡ **3.5x faster** full builds (378ms → 100ms)
- ⚡ **182x faster** incremental builds without new CSS (35ms → 0.19ms)
- 🎨 **CSS-first configuration** — no more JavaScript config files
- 🔧 **Zero configuration** — automatic content detection
- 📦 **Simplified installation** — one-line CSS import

**Migration Effort:** 10-15 hours (after Typography Phase 3B completes)

**Recommendation:** **MIGRATE** — v4.0 is stable, performant, and future-proof. The automated upgrade tool makes it easier than ever.

---

## What Changed in v4.0

### 1. Performance Improvements 🚀

| Metric | v3.4 | v4.0 | Improvement |
|--------|------|------|-------------|
| Full build | 378ms | 100ms | **3.78x faster** |
| Incremental (new CSS) | 44ms | 5ms | **8.8x faster** |
| Incremental (no new CSS) | 35ms | 0.19ms | **182x faster** |

**Impact:** For our project, this means:
- Faster builds during development
- Near-instant HMR updates
- Better CI/CD pipeline performance

### 2. Simplified Installation

**Before (v3):**
```bash
npm install tailwindcss
```

**After (v4):**
```bash
npm install tailwindcss @tailwindcss/postcss
```

**Or for Vite (recommended):**
```bash
npm install tailwindcss @tailwindcss/vite
```

### 3. One-Line CSS Import

**Before (v3):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**After (v4):**
```css
@import "tailwindcss";
```

### 4. CSS-First Configuration

**Before (v3):**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'color-heading': '#224160',
        // ... 65+ more colors
      },
      fontSize: {
        'h2': ['2.25rem', { lineHeight: '1.2' }],
        // ... 17 more font sizes
      }
    }
  }
}
```

**After (v4):**
```css
@import "tailwindcss";

@theme {
  --color-heading: #224160;
  /* ... 65+ more colors */

  --font-size-h2: 2.25rem;
  --font-size-h2-line-height: 1.2;
  /* ... 17 more font sizes */
}
```

### 5. Automatic Content Detection

**Before (v3):**
```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
}
```

**After (v4):**
```javascript
// Nothing! v4 auto-detects template files
// Respects .gitignore, ignores binary files
```

**Manual override (if needed):**
```css
@import "tailwindcss";
@source "../node_modules/@my-company/ui-lib";
```

### 6. First-Party Vite Plugin

**vite.config.js:**
```javascript
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

**Benefits:**
- Even better performance than PostCSS
- Zero configuration
- Native HMR support

### 7. Dynamic Utility Values

**Before (v3):**
```jsx
<!-- Had to use arbitrary values -->
<div className="grid grid-cols-[15]">

<!-- Or configure in tailwind.config.js -->
```

**After (v4):**
```jsx
<!-- Just use the value directly -->
<div className="grid grid-cols-15">
```

**Works for:**
- `grid-cols-*` — any number
- `mt-*`, `px-*`, `w-*`, `h-*` — any spacing value
- `data-*` attributes — no configuration needed

### 8. Modern Color System (OKLCH)

**Before (v3):**
```css
/* sRGB color space */
--color-blue-500: rgb(59 130 246);
```

**After (v4):**
```css
/* OKLCH color space — wider gamut, more vivid colors */
--color-blue-500: oklch(0.623 0.254 264.38);
```

**Benefits:**
- More vivid colors on modern displays
- Better color consistency across devices
- Automatic P3 color space support

### 9. Built-in Container Queries

**Before (v3):**
```bash
npm install @tailwindcss/container-queries
```

**After (v4):**
```jsx
<!-- Built-in, no plugin needed -->
<div className="@container">
  <div className="grid grid-cols-1 @sm:grid-cols-3 @lg:grid-cols-4">
    <!-- ... -->
  </div>
</div>
```

### 10. New Utilities and Variants

- **`@starting-style`** — Animate elements appearing on page
- **`not-*`** — CSS `:not()` pseudo-class support
- **`inset-shadow-*`**, **`inset-ring-*`** — Up to 4 shadow layers
- **`field-sizing`** — Auto-resizing textareas
- **`color-scheme`** — Proper scrollbars in dark mode
- **`font-stretch`** — Variable font width control
- **`inert`** — Non-interactive element styling
- **`nth-*`** — Clever nth-child variants
- **`@min-*`**, **`@max-*`** — Container query ranges
- **`descendant`** — Style all descendants

---

## Migration Strategy

### Phase 1: Prerequisites (Week 1-2)

**Complete Typography Phase 3B:**
- [ ] Migrate PodcastVideoSection (final section)
- [ ] Verify all 17 sections use design tokens
- [ ] Run final token audit
- [ ] Freeze token system

**Why:** Changing the build system while tokens are still changing would create chaos.

### Phase 2: Vite Migration (Week 3)

**Why migrate to Vite?**
- Tailwind v4's Vite plugin offers best performance
- Create React App is deprecated (last update: 2022)
- Vite enables true ESM (required for v4)
- Faster builds, better HMR

**Steps:**
1. Create backup branch: `typography-complete`
2. Install Vite: `npm install -D vite @vitejs/plugin-react`
3. Create `vite.config.js`
4. Move `index.html` to project root
5. Update all import paths to use `.js` extensions
6. Test build locally
7. Deploy to Cloudflare preview

**Effort:** 3-5 hours

### Phase 3: Tailwind v4 Migration (Week 4)

**Step 1: Install v4**
```bash
npm install tailwindcss @tailwindcss/vite
```

**Step 2: Update vite.config.js**
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**Step 3: Convert tailwind.config.js to CSS**

**Create `frontend/src/index.css`:**
```css
@import "tailwindcss";

@theme {
  /* ───────────────────────────────────────────────────────────── */
  /* FONT FAMILIES */
  /* ───────────────────────────────────────────────────────────── */
  --font-family-sans: "DM Sans", system-ui, sans-serif;
  --font-family-primary: "DM Sans", system-ui, sans-serif;
  --font-family-display: "Cormorant Garamond", Georgia, serif;

  /* ───────────────────────────────────────────────────────────── */
  /* SCREENS */
  /* ───────────────────────────────────────────────────────────── */
  --breakpoint-900: 900px;

  /* ───────────────────────────────────────────────────────────── */
  /* COLORS (65+ tokens) */
  /* ───────────────────────────────────────────────────────────── */
  --color-bg-light: #EDE7DC;
  --color-bg-medium: #E5DFD5;
  --color-bg-dark: #224160;
  --color-card-overlay: #ffffff80;
  --color-border: #0000001A;
  --color-overlay-dark: #00000040;

  --color-heading: #224160;
  --color-body: #5A5550;
  --color-label: #7696AD;
  --color-accent: #2DAD71;
  --color-star: #F59E0B;

  --on-dark: #FFFFFF;
  --on-dark-heading: #ffffff;
  --on-dark-quote: #ffffff;
  --on-dark-body: #FFFFFFCC;
  --on-dark-role: #ffffff9c;
  --on-dark-date: #ffffff9c;
  --on-dark-label: #ffffff9c;
  --on-dark-accent: #ffffff;
  --on-dark-divider: #ffffff33;

  /* ───────────────────────────────────────────────────────────── */
  /* FONT SIZES (17 tokens) */
  /* ───────────────────────────────────────────────────────────── */
  --font-size-hero-large: clamp(2.4rem, 6.6vw, 5.4rem);
  --font-size-hero-large-line-height: 1;
  --font-size-hero-large-letter-spacing: -0.02em;

  --font-size-hero: clamp(1.44rem, 3.84vw, 3.36rem);
  --font-size-hero-line-height: 1.1;

  --font-size-podcast-headline: clamp(2.8rem, 6vw, 5rem);
  --font-size-podcast-headline-line-height: 0.95;

  --font-size-h2: 2.25rem;
  --font-size-h2-line-height: 1.2;

  --font-size-h3: 1.875rem;
  --font-size-h3-line-height: 1.2;

  --font-size-h4: 1.5rem;
  --font-size-h4-line-height: 1.2;

  --font-size-body: 1.125rem;
  --font-size-body-line-height: 1.75;

  --font-size-body-lg: 1.25rem;
  --font-size-body-lg-line-height: 1.625;

  --font-size-label: 0.94rem;
  --font-size-label-line-height: 1.5;
  --font-size-label-letter-spacing: 0.2em;

  --font-size-subline: 1.0rem;
  --font-size-subline-line-height: 1.5;

  --font-size-quote-featured: 2.25rem;
  --font-size-quote-featured-line-height: 1.1;

  --font-size-author-name: 2rem;
  --font-size-author-name-line-height: 1.2;

  --font-size-summary-large: 1.625rem;
  --font-size-summary-large-line-height: 1.6;

  --font-size-body-narrative: 1.125rem;
  --font-size-body-narrative-line-height: 1.75;

  --font-size-meta: 0.875rem;
  --font-size-meta-line-height: 1.5;

  --font-size-disclaimer: 0.75rem;
  --font-size-disclaimer-line-height: 1.5;

  --font-size-button-text: 0.875rem;
  --font-size-button-text-line-height: 1.5;
  --font-size-button-text-letter-spacing: 0.2em;

  --font-size-hint: 0.875rem;
  --font-size-hint-line-height: 1.5;

  /* ───────────────────────────────────────────────────────────── */
  /* LETTER SPACING */
  /* ───────────────────────────────────────────────────────────── */
  --letter-spacing-heading-tight: -0.02em;
  --letter-spacing-label-wide: 0.2em;

  /* ───────────────────────────────────────────────────────────── */
  /* MAX WIDTH */
  /* ───────────────────────────────────────────────────────────── */
  --max-width-content: 72rem;
  --max-width-centered-header: 48rem;

  /* ───────────────────────────────────────────────────────────── */
  /* BACKGROUND IMAGES */
  /* ───────────────────────────────────────────────────────────── */
  --background-image-paper: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
}

/* ───────────────────────────────────────────────────────────── */
/* CUSTOM UTILITIES (migrated from plugins) */
/* ───────────────────────────────────────────────────────────── */
@layer utilities {
  /* Typography utilities */
  .label {
    line-height: 1.5;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 400;
  }

  .button-text {
    line-height: 1.5;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .subline-italic,
  .hint-italic,
  .disclaimer-italic {
    line-height: 1.5;
    font-style: italic;
  }

  .quote-featured-italic {
    font-style: italic;
  }

  .tracking-label-alt {
    letter-spacing: 0.15em;
  }

  /* Section spacing */
  .section-padding {
    padding-top: 5rem;
    padding-bottom: 7rem;
  }

  .section-padding-sm {
    padding-top: 2.5rem;
  }

  .section-block-spacing {
    margin-bottom: 4rem;
  }

  .divider-spacing {
    padding-top: 2.25rem;
  }

  /* Element spacing */
  .label-heading-spacing {
    margin-bottom: 0.7rem;
  }

  .name-role-spacing,
  .role-date-spacing {
    margin-bottom: 0.25rem;
  }

  .block-label-spacing {
    margin-bottom: 0.75rem;
  }

  .content-spacing {
    margin-bottom: 1.5rem;
  }

  .content-spacing-md {
    margin-bottom: 1rem;
  }

  .content-spacing-lg {
    margin-bottom: 2rem;
  }

  .item-tag-spacing {
    margin-bottom: 0.5rem;
  }

  .element-spacing-xs {
    margin-top: 0.5rem;
  }

  .element-spacing-sm {
    margin-top: 0.75rem;
  }

  .element-spacing-md {
    margin-top: 1rem;
  }

  .paragraph-spacing {
    margin-bottom: 1rem;
  }

  .expanded-content-spacing {
    margin-top: 1rem;
    padding-top: 2rem;
  }

  /* Transition */
  .transition-slower {
    transition-duration: 700ms;
  }
}
```

**Step 4: Delete tailwind.config.js**
```bash
rm frontend/tailwind.config.js
```

**Step 5: Fix border colors (43 files)**
```bash
# Find all border classes without explicit colors
grep -r "className=\"[^"]*border[^"]*\"" frontend/src --include="*.jsx" | grep -v "color-border" | grep -v "border-color-"

# Add color-border to each
# Example: className="border" → className="border color-border"
```

**Step 6: Test build**
```bash
npm run build
```

**Step 7: Visual regression test**
- Check all 17 sections
- Verify spacing, colors, typography
- Test responsive breakpoints

**Effort:** 4-6 hours

### Phase 4: Deployment

1. Commit all changes
2. Push to main branch
3. Cloudflare auto-deploys
4. Test on production URL
5. Monitor for issues

---

## Breaking Changes (v3 → v4)

### 1. No Default Border Color 🔴 HIGH PRIORITY

**Before (v3):**
```jsx
<div className="border"> {/* defaults to gray-200 */}
```

**After (v4):**
```jsx
<div className="border color-border"> {/* explicit color */}
```

**Files affected:** 43 files

**Migration:** Add `color-border` to all `border` classes

### 2. @import Syntax Change 🔴 HIGH PRIORITY

**Before (v3):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**After (v4):**
```css
@import "tailwindcss";
```

**Files affected:** 1 file (`frontend/src/index.css`)

### 3. Config Format Change 🔴 HIGH PRIORITY

**Before (v3):**
```javascript
// tailwind.config.js (253 lines)
module.exports = {
  theme: {
    extend: { /* ... */ }
  }
}
```

**After (v4):**
```css
/* index.css */
@import "tailwindcss";

@theme {
  /* All tokens here */
}
```

**Files affected:** 1 file (complete rewrite)

### 4. Content Array Deleted 🟢 LOW RISK

**Before (v3):**
```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
}
```

**After (v4):**
```javascript
// Nothing! Auto-detected
```

**Files affected:** 1 file (just delete the line)

---

## Migration Tools

### Official Upgrade Tool

Tailwind provides an automated upgrade tool:

```bash
npx @tailwindcss/upgrade@next
```

**What it does:**
- Converts `tailwind.config.js` to CSS `@theme`
- Updates import syntax
- Simplifies arbitrary values to dynamic utilities
- Migrates plugins to CSS

**Our recommendation:** Use the tool, then manually review changes.

---

## Cost-Benefit Analysis

### Migration Costs

| Category | Time | Complexity |
|----------|------|------------|
| Vite migration | 3-5 hours | Medium |
| Config conversion | 4-6 hours | High |
| Plugin migration | 2 hours | Low |
| Border fixes | 2-3 hours | Medium |
| Testing | 2-3 hours | Medium |
| **Total** | **13-19 hours** | **High** |

### Migration Benefits

| Benefit | Impact | Measurable |
|---------|--------|------------|
| **Faster builds** | 3.5x full, 182x incremental | Yes (benchmark) |
| **CSS-first config** | Better DX, native CSS | Yes (file count) |
| **Smaller bundle** | v4 CSS optimization | Yes (KB reduction) |
| **Future-proof** | Latest features, long-term support | Yes |
| **Automatic content detection** | Zero config maintenance | Yes (file deleted) |
| **Better color system** | OKLCH, P3 support | Yes (visual) |

### ROI Calculation

**One-time cost:** 13-19 hours
**Ongoing savings:**
- Build time: ~50% faster (every build, every day)
- Config maintenance: 0 hours (automatic detection)
- Future features: Built-in (no plugins)

**Payback period:** ~2-3 weeks of active development

---

## Risk Assessment

### High-Risk Areas

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Build failures** | High | Low | Test on preview branch first |
| **Visual regression** | Medium | Medium | Screenshot comparison |
| **Plugin migration bugs** | Low | Low | Simple CSS conversion |
| **Component breakage** | Medium | Low | Comprehensive testing |

### Rollback Strategy

**If migration fails:**
1. Delete migration branch
2. Restore from `typography-complete` backup
3. No production impact (tested on preview)

**If production issues:**
1. Revert to previous commit
2. Cloudflare auto-deploys rollback
3. Investigate on development branch

---

## Decision Matrix

### ✅ Migrate When:

- Typography Phase 3B 100% complete (16/17 sections done)
- Have 2-3 weeks for migration + testing
- Want faster builds and better DX
- Planning long-term maintenance
- Want OKLCH color support

### ⏳ Wait If:

- Typography refactoring incomplete
- Tight deadlines (migration takes 13-19 hours)
- Critical production period (wait for calm week)
- Team unavailable for testing

### ❌ Don't Migrate If:

- Project is frozen/no active development
- Breaking changes unacceptable
- No time for testing

---

## Next Steps

### Immediate (This Week)

1. **Complete Typography Phase 3B**
   - [ ] Migrate PodcastVideoSection
   - [ ] Verify all 17 sections use tokens
   - [ ] Run final token audit
   - [ ] Freeze token system

2. **Create Migration Branch**
   ```bash
   git checkout -b tailwind-v4-migration
   ```

### Short-term (Week 3)

1. **Vite Migration**
   - [ ] Install Vite
   - [ ] Configure vite.config.js
   - [ ] Update index.html
   - [ ] Fix import paths
   - [ ] Test build locally
   - [ ] Deploy to Cloudflare preview

2. **Test Vite Build**
   - [ ] Run build: `npm run build`
   - [ ] Test all 17 sections
   - [ ] Verify HMR works
   - [ ] Check bundle size

### Long-term (Week 4)

1. **Tailwind v4 Migration**
   - [ ] Install v4 packages
   - [ ] Convert config to CSS @theme
   - [ ] Migrate plugins to CSS
   - [ ] Fix 43 files with border issues
   - [ ] Run visual regression tests
   - [ ] Deploy to production

2. **Post-Migration**
   - [ ] Monitor build times
   - [ ] Check for console errors
   - [ ] Verify all sections render correctly
   - [ ] Update documentation

---

## Appendix A: Token Migration Reference

### Font Size Tokens (17)

| Token | v3 Value | v4 CSS Variable |
|-------|----------|-----------------|
| hero-large | `['clamp(2.4rem, 6.6vw, 5.4rem)', { lineHeight: '1', letterSpacing: '-0.02em' }]` | `--font-size-hero-large`, `--font-size-hero-large-line-height`, `--font-size-hero-large-letter-spacing` |
| hero | `['clamp(1.44rem, 3.84vw, 3.36rem)', { lineHeight: '1.1' }]` | `--font-size-hero`, `--font-size-hero-line-height` |
| podcast-headline | `['clamp(2.8rem, 6vw, 5rem)', { lineHeight: '0.95' }]` | `--font-size-podcast-headline`, `--font-size-podcast-headline-line-height` |
| h2 | `['2.25rem', { lineHeight: '1.2' }]` | `--font-size-h2`, `--font-size-h2-line-height` |
| h3 | `['1.875rem', { lineHeight: '1.2' }]` | `--font-size-h3`, `--font-size-h3-line-height` |
| h4 | `['1.5rem', { lineHeight: '1.2' }]` | `--font-size-h4`, `--font-size-h4-line-height` |
| body | `['1.125rem', { lineHeight: '1.75' }]` | `--font-size-body`, `--font-size-body-line-height` |
| body-lg | `['1.25rem', { lineHeight: '1.625' }]` | `--font-size-body-lg`, `--font-size-body-lg-line-height` |
| label | `['0.94rem', { lineHeight: '1.5', letterSpacing: '0.2em' }]` | `--font-size-label`, `--font-size-label-line-height`, `--font-size-label-letter-spacing` |
| subline | `['1.0rem', { lineHeight: '1.5' }]` | `--font-size-subline`, `--font-size-subline-line-height` |
| quote-featured | `['2.25rem', { lineHeight: '1.1' }]` | `--font-size-quote-featured`, `--font-size-quote-featured-line-height` |
| author-name | `['2rem', { lineHeight: '1.2' }]` | `--font-size-author-name`, `--font-size-author-name-line-height` |
| summary-large | `['1.625rem', { lineHeight: '1.6' }]` | `--font-size-summary-large`, `--font-size-summary-large-line-height` |
| body-narrative | `['1.125rem', { lineHeight: '1.75' }]` | `--font-size-body-narrative`, `--font-size-body-narrative-line-height` |
| meta | `['0.875rem', { lineHeight: '1.5' }]` | `--font-size-meta`, `--font-size-meta-line-height` |
| disclaimer | `['0.75rem', { lineHeight: '1.5' }]` | `--font-size-disclaimer`, `--font-size-disclaimer-line-height` |
| button-text | `['0.875rem', { lineHeight: '1.5', letterSpacing: '0.2em' }]` | `--font-size-button-text`, `--font-size-button-text-line-height`, `--font-size-button-text-letter-spacing` |
| hint | `['0.875rem', { lineHeight: '1.5' }]` | `--font-size-hint`, `--font-size-hint-line-height` |

### Color Tokens (65+)

**Sample of key tokens:**

| Token | v3 Value | v4 CSS Variable |
|-------|----------|-----------------|
| color-bg-light | `#EDE7DC` | `--color-bg-light` |
| color-bg-medium | `#E5DFD5` | `--color-bg-medium` |
| color-bg-dark | `#224160` | `--color-bg-dark` |
| color-border | `#0000001A` | `--color-border` |
| color-heading | `#224160` | `--color-heading` |
| color-body | `#5A5550` | `--color-body` |
| on-dark-heading | `#ffffff` | `--on-dark-heading` |
| on-dark-body | `#FFFFFFCC` | `--on-dark-body` |

**Full migration:** All 65+ colors need `@theme` conversion

---

## Appendix B: Performance Benchmarks

### Build Time Comparison

| Scenario | v3.4 | v4.0 | Improvement |
|----------|------|------|-------------|
| **Full build** | 378ms | 100ms | **3.78x faster** |
| **Incremental (new CSS)** | 44ms | 5ms | **8.8x faster** |
| **Incremental (no new CSS)** | 35ms | 0.19ms | **182x faster** |

### Bundle Size Comparison

| Metric | v3.4 | v4.0 | Change |
|--------|------|------|--------|
| **CSS bundle** | ~8.7 KB | TBD | Expected -10% to -20% |
| **JS bundle** | ~122 KB | TBD | No change (Tailwind is CSS-only) |

---

## Appendix C: Resources

### Official Documentation

- **Tailwind CSS v4.0 Announcement:** https://tailwindcss.com/blog/tailwindcss-v4
- **Upgrade Guide:** https://tailwindcss.com/docs/upgrade
- **v4 Documentation:** https://tailwindcss.com/docs/v4-beta

### Tools

- **Automated Upgrade Tool:** `npx @tailwindcss/upgrade@next`
- **Tailwind Play (v4):** https://play.tailwindcss.com

### Community

- **GitHub:** https://github.com/tailwindlabs/tailwindcss
- **Discord:** https://tailwindcss.com/discord

---

## Conclusion

**Tailwind CSS v4.0 is STABLE and RECOMMENDED for migration.**

**Key Takeaways:**
1. ✅ v4.0 is stable (released January 22, 2025)
2. ✅ Significant performance improvements (3.5x faster builds)
3. ✅ Automated upgrade tool available
4. ✅ CSS-first configuration is simpler
5. ✅ Long-term benefits outweigh short-term migration cost

**Recommendation:** **MIGRATE** after completing Typography Phase 3B.

**Timeline:**
- Week 1-2: Complete typography
- Week 3: Vite migration
- Week 4: Tailwind v4 migration

**Total effort:** 13-19 hours over 4 weeks

---

**Report Updated:** 2026-03-28
**Status:** Ready for migration after typography completion
**Author:** Master Orchestrator (/multiloop workflow)
