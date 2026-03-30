# Tailwind v4 Migration Audit — Typography Project

**Date:** 2026-03-27
**Status:** AUDIT COMPLETE — Waiting for Typography Migration to finish
**Current Branch:** `typography-refactoring`
**Tailwind Version:** v3.4.19
**Target Version:** v4.0.0 (beta)

---

## Executive Summary

**CRITICAL FINDING:** Tailwind v4 migration will BREAK the entire plugin utility system. 30+ utility classes from the plugin will stop working.

**Current Status:**
- 16/17 sections migrated to typography tokens
- 50+ plugin utilities in active use across all sections
- Plugin utilities CANNOT be migrated to v4 without code changes

**Recommendation:** ✅ **WAIT until Typography Migration is 100% complete**
- Migrating NOW = double work + high risk of inconsistencies
- Migrating LATER = single conversion of all 17 sections at once
- Copy Sections (`*SectionCopy.jsx`) serve as perfect reference for v4 migration

---

## 1. BREAKING CHANGES — What Will Break?

### 1.1 Plugin System Completely Removed

**Tailwind v3:**
```javascript
// tailwind.config.js
plugins: [
  plugin(function({ addUtilities }) {
    addUtilities({
      '.label': { ... },
      '.section-padding': { ... },
    })
  }),
]
```

**Tailwind v4:**
```javascript
// ❌ NO MORE PLUGINS!
// This entire system is removed
```

**Impact:** ALL 30+ plugin utilities will STOP WORKING

---

### 1.2 Complete List of Broken Utilities

#### Typography Style Utilities (9 classes)
```javascript
// ❌ WILL BREAK IN v4
'.label'              // line-height: 1.5, letter-spacing: 0.2em, uppercase
'.button-text'        // line-height: 1.5, letter-spacing: 0.2em, uppercase
'.role'               // line-height: 1.5, letter-spacing: 0.1em, uppercase
'.subline-italic'     // line-height: 1.5, italic
'.hint-italic'        // line-height: 1.5, italic
'.disclaimer-italic'  // line-height: 1.5, italic
'.quote-featured-italic' // italic
'.body-narrative-italic' // italic
'.tracking-label-alt' // letter-spacing: 0.15em
```

**Usage in Code:**
```jsx
<span className="font-primary text-label tracking-label-alt label text-color-label">
  {service.sub}
</span>
//                                                      ^^^^ THIS BREAKS
```

**Migration Path:**
```css
/* Tailwind v4 @utility replacement */
@utility label {
  line-height: 1.5;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 400;
}

/* OR use native Tailwind classes */
.label-replacement {
  @apply leading-[1.5] tracking-[0.2em] uppercase font-normal;
}
```

---

#### Spacing Utilities (18 classes)
```javascript
// ❌ WILL BREAK IN v4
'.section-padding'         // padding-top: 5rem, padding-bottom: 7rem
'.section-block-spacing'   // margin-bottom: 4rem
'.grid-gap-lg'            // gap: 2rem
'.grid-gap-xl'            // gap: 4rem
'.margin-top-sm'          // margin-top: 1.5rem
'.margin-top-md'          // margin-top: 3rem
'.section-padding-sm'     // padding-top: 2.5rem

// Element spacing
'.label-heading-spacing'  // margin-bottom: 0.7rem
'.name-role-spacing'      // margin-bottom: 0.25rem
'.role-date-spacing'      // margin-bottom: 0.25rem
'.block-label-spacing'    // margin-bottom: 0.75rem
'.content-spacing'        // margin-bottom: 1.5rem
'.content-spacing-md'     // margin-bottom: 1rem
'.content-spacing-lg'     // margin-bottom: 2rem
'.item-tag-spacing'       // margin-bottom: 0.5rem
'.element-spacing-xs'     // margin-top: 0.5rem
'.element-spacing-sm'     // margin-top: 0.75rem
'.element-spacing-md'     // margin-top: 1rem
'.paragraph-spacing'      // margin-bottom: 1rem
'.expanded-content-spacing' // margin-top: 1rem, padding-top: 2rem
'.divider-spacing'        // padding-top: 2.25rem
```

**Usage in Code:**
```jsx
<div className="max-w-centered-header content-spacing text-center mx-auto">
  {/*                         ^^^^^^^^^^^^^^^ THIS BREAKS */}

<p className="text-subline subline-italic text-color-body element-spacing-md">
  {/*                                                           ^^^^^^^^^^^^^^^^ THIS BREAKS */}
```

**Migration Path:**
```css
/* Tailwind v4 @utility replacement */
@utility content-spacing {
  margin-bottom: 1.5rem;
}

@utility element-spacing-md {
  margin-top: 1rem;
}

/* OR use native Tailwind arbitrary values */
.content-spacing-replacement {
  @apply mb-[1.5rem];
}
```

---

#### Transition Utilities (4 classes)
```javascript
// ❌ WILL BREAK IN v4
'.transition-fast'    // transition-duration: 200ms
'.transition-normal'  // transition-duration: 300ms
'.transition-slow'    // transition-duration: 500ms
'.transition-slower'  // transition-duration: 700ms
```

**Usage in Code:**
```jsx
<div className={`transition-opacity transition-slower ${showHint ? 'opacity-100' : 'opacity-0'}`}>
  {/*                            ^^^^^^^^^^^^^^^^ THIS BREAKS */}

<ChevronDown className={`transition-transform transition-normal ${openIndex === i ? 'rotate-180' : ''}`} />
  {/*                                          ^^^^^^^^^^^^^^^^ THIS BREAKS */}
```

**Migration Path:**
```css
/* Tailwind v4 @utility replacement */
@utility transition-slower {
  transition-duration: 700ms;
}

/* OR use native Tailwind arbitrary values */
.transition-slower-replacement {
  @apply duration-[700ms];
}
```

---

### 1.3 Impact Assessment

| Category | Classes Broken | Sections Affected | Migration Effort |
|----------|---------------|-------------------|------------------|
| Typography Styles | 9 | All 17 sections | LOW (can use @apply) |
| Spacing Utilities | 18 | All 17 sections | MEDIUM (need @utility) |
| Transition Utilities | 4 | 3 sections | LOW (can use arbitrary values) |
| **TOTAL** | **31** | **17 sections** | **MEDIUM-HIGH** |

---

## 2. COLOR SYSTEM MIGRATION

### 2.1 Current Color Tokens (JavaScript)

```javascript
// tailwind.config.js (v3)
colors: {
  // Semantic names
  'color-heading': '#224160',
  'color-body':    '#5A5550',
  'color-label':   '#7696AD',
  'color-accent':  '#2DAD71',
  'color-star':    '#F59E0B',

  // On-dark semantic
  'on-dark':         '#FFFFFF',
  'on-dark-heading': '#ffffff',
  'on-dark-quote':   '#ffffff',
  'on-dark-body':    '#FFFFFFCC',
  'on-dark-role':    '#ffffff9c',
  'on-dark-date':    '#ffffff9c',
  'on-dark-label':   '#ffffff9c',
  'on-dark-accent':  '#ffffff',
  'on-dark-divider': '#ffffff33',

  // General purpose
  'color-bg-light':     '#EDE7DC',
  'color-bg-medium':    '#E5DFD5',
  'color-bg-dark':      '#224160',
  'color-card-overlay': '#ffffff80',
  'color-divider':      '#0000001A',
  'color-border':       '#0000001A',
  'color-overlay-dark': '#00000040',
}
```

**Usage:**
```jsx
<h2 className="text-color-heading">...</h2>
<p className="text-color-body">...</p>
<div className="bg-on-dark-bg">...</div>
```

### 2.2 Tailwind v4 Color System (CSS Variables)

**Tailwind v4 uses CSS variables by default:**

```css
/* tailwind.config.css (v4) */
@theme {
  /* Semantic colors become CSS variables */
  --color-heading: #224160;
  --color-body: #5A5550;
  --color-label: #7696AD;
  --color-accent: #2DAD71;
  --color-star: #F59E0B;

  /* On-dark semantic */
  --color-on-dark: #FFFFFF;
  --color-on-dark-heading: #ffffff;
  --color-on-dark-quote: #ffffff;
  --color-on-dark-body: rgba(255, 255, 255, 0.8);
  --color-on-dark-role: rgba(255, 255, 255, 0.61);
  --color-on-dark-date: rgba(255, 255, 255, 0.61);
  --color-on-dark-label: rgba(255, 255, 255, 0.61);
  --color-on-dark-accent: #ffffff;
  --color-on-dark-divider: rgba(255, 255, 255, 0.2);

  /* General purpose */
  --color-bg-light: #EDE7DC;
  --color-bg-medium: #E5DFD5;
  --color-bg-dark: #224160;
  --color-card-overlay: rgba(255, 255, 255, 0.5);
  --color-divider: rgba(0, 0, 0, 0.1);
  --color-border: rgba(0, 0, 0, 0.1);
  --color-overlay-dark: rgba(0, 0, 0, 0.25);
}
```

**Usage stays the SAME:**
```jsx
<h2 className="text-color-heading">...</h2>
<p className="text-color-body">...</p>
<div className="bg-on-dark-bg">...</div>
```

**Key Insight:** Class names don't change! Only the definition format changes.

### 2.3 Breaking Change: Hex Alpha Values

**Current (v3):**
```javascript
'color-card-overlay': '#ffffff80',  // Hex with alpha
'on-dark-body':    '#FFFFFFCC',      // Hex with alpha
'on-dark-role':    '#ffffff9c',      // Hex with alpha
```

**Tailwind v4:**
```css
/* v4 prefers rgba() for alpha values */
--color-card-overlay: rgba(255, 255, 255, 0.5);
--color-on-dark-body: rgba(255, 255, 255, 0.8);
--color-on-dark-role: rgba(255, 255, 255, 0.61);
```

**Migration Required:** Convert all hex-alpha values to rgba()

---

## 3. TYPOGRAPHY TOKENS MIGRATION

### 3.1 Current Font Size Tokens (JavaScript)

```javascript
// tailwind.config.js (v3)
fontSize: {
  'hero-large': ['clamp(2.4rem, 6.6vw, 5.4rem)', {
    lineHeight: '1',
    letterSpacing: '-0.02em',
  }],
  'hero': ['clamp(1.44rem, 3.84vw, 3.36rem)', {
    lineHeight: '1.1',
  }],
  'h2': ['2.25rem', {
    lineHeight: '1.2',
  }],
  'body': ['1.125rem', {
    lineHeight: '1.75',
  }],
  'label': ['0.94rem', {
    lineHeight: '1.5',
    letterSpacing: '0.2em',
  }],
  // ... 18 total tokens
}
```

### 3.2 Tailwind v4 Typography System (CSS)

```css
/* tailwind.config.css (v4) */
@theme {
  /* Font size tokens */
  --font-hero-large: clamp(2.4rem, 6.6vw, 5.4rem);
  --line-height-hero-large: 1;
  --letter-spacing-hero-large: -0.02em;

  --font-hero: clamp(1.44rem, 3.84vw, 3.36rem);
  --line-height-hero: 1.1;

  --font-h2: 2.25rem;
  --line-height-h2: 1.2;

  --font-body: 1.125rem;
  --line-height-body: 1.75;

  --font-label: 0.94rem;
  --line-height-label: 1.5;
  --letter-spacing-label: 0.2em;
}
```

**Usage stays the SAME:**
```jsx
<h1 className="text-hero-large">...</h1>
<h2 className="text-h2">...</h2>
<p className="text-body">...</p>
```

**Key Insight:** Typography class names don't change either!

---

## 4. MIGRATION STRATEGY

### 4.1 Timeline Analysis

#### Option A: Migrate NOW (Before Typography Complete)

**Pros:**
- Get it over with
- Future sections start with v4 system

**Cons:**
- ❌ DOUBLE WORK: Migrate 16 sections, then migrate all 17 sections again
- ❌ INCONSISTENCY RISK: Some sections v3, some v4 during transition
- ❌ TESTING NIGHTMARE: Need to test v3 vs v4 sections separately
- ❌ COPY SECTIONS LOSE REFERENCE VALUE: Can't compare v3 vs v4 side-by-side

**Effort:** ~40 hours (20 hours now + 20 hours re-migrate later)

#### Option B: Migrate LATER (After Typography Complete) ✅ RECOMMENDED

**Pros:**
- ✅ SINGLE MIGRATION: All 17 sections converted at once
- ✅ STABLE FOUNDATION: Typography system fully tested and stable
- ✅ COPY SECTIONS AS REFERENCE: Can compare v3 (original) vs v4 (migrated) side-by-side
- ✅ CONSISTENT TESTING: All sections tested together
- ✅ LOWER RISK: No mixed states

**Cons:**
- Plugin utilities accumulate for 1 more section
- Need to maintain v3 plugin for ~1 more week

**Effort:** ~20 hours (one-time migration)

### 4.2 Risk Assessment

| Risk | Option A (Now) | Option B (Later) | Winner |
|------|---------------|------------------|---------|
| Double Work | HIGH | NONE | B |
| Inconsistency | HIGH | NONE | B |
| Testing Complexity | HIGH | LOW | B |
| Reference Loss | HIGH | NONE | B |
| Delay | NONE | 1 week | A (minor) |
| **TOTAL** | **HIGH RISK** | **LOW RISK** | **B ✅** |

---

## 5. DETAILED MIGRATION PLAN (For Later)

### 5.1 Phase 1: Tailwind v4 Upgrade (2 hours)

```bash
# 1. Install Tailwind v4
npm install tailwindcss@next @tailwindcss/vite@next

# 2. Update postcss.config.js (if needed)
# v4 includes PostCSS by default
```

### 5.2 Phase 2: Convert Config (4 hours)

**Create `frontend/tailwind.config.css`:**

```css
/* tailwind.config.css */
@import "tailwindcss";

@theme {
  /* ───────────────────────────────────────────────────────────── */
  /* TYPOGRAPHY TOKENS (18 tokens) */
  /* ───────────────────────────────────────────────────────────── */

  /* Hero */
  --font-hero-large: clamp(2.4rem, 6.6vw, 5.4rem);
  --line-height-hero-large: 1;
  --letter-spacing-hero-large: -0.02em;

  --font-hero: clamp(1.44rem, 3.84vw, 3.36rem);
  --line-height-hero: 1.1;

  /* Headings */
  --font-h1: 3rem;
  --line-height-h1: 1.1;

  --font-h2: 2.25rem;
  --line-height-h2: 1.2;

  --font-h3: 1.875rem;
  --line-height-h3: 1.2;

  --font-h4: 1.5rem;
  --line-height-h4: 1.2;

  /* Body */
  --font-body: 1.125rem;
  --line-height-body: 1.75;

  --font-body-lg: 1.25rem;
  --line-height-body-lg: 1.625;

  /* Labels */
  --font-label: 0.94rem;
  --line-height-label: 1.5;
  --letter-spacing-label: 0.2em;

  --font-subline: 1rem;
  --line-height-subline: 1.5;

  --font-list: 1.25rem;
  --line-height-list: 1.5;

  /* Quotes */
  --font-quote-featured: 2.25rem;
  --line-height-quote-featured: 1.1;

  --font-quote: 1.5rem;
  --line-height-quote: 1.2;

  /* Author */
  --font-author-name: 2rem;
  --line-height-author-name: 1.2;

  /* Narrative (Serif) */
  --font-summary-large: 1.625rem;
  --line-height-summary-large: 1.6;

  --font-body-narrative: 1.125rem;
  --line-height-body-narrative: 1.75;

  /* Metadata */
  --font-date: 0.875rem;
  --line-height-date: 1.5;

  --font-disclaimer: 0.75rem;
  --line-height-disclaimer: 1.5;

  --font-read-more: 0.875rem;
  --line-height-read-more: 1.5;

  --font-button-text: 0.875rem;
  --line-height-button-text: 1.5;
  --letter-spacing-button-text: 0.2em;

  --font-source-link: 0.875rem;
  --line-height-source-link: 1.5;

  --font-hint: 0.875rem;
  --line-height-hint: 1.5;

  /* ───────────────────────────────────────────────────────────── */
  /* COLOR TOKENS (Semantic + General Purpose) */
  /* ───────────────────────────────────────────────────────────── */

  /* Semantic colors */
  --color-heading: #224160;
  --color-body: #5A5550;
  --color-label: #7696AD;
  --color-accent: #2DAD71;
  --color-star: #F59E0B;

  /* On-dark semantic (using rgba() for alpha) */
  --color-on-dark: #FFFFFF;
  --color-on-dark-heading: #ffffff;
  --color-on-dark-quote: #ffffff;
  --color-on-dark-body: rgba(255, 255, 255, 0.8);
  --color-on-dark-role: rgba(255, 255, 255, 0.61);
  --color-on-dark-date: rgba(255, 255, 255, 0.61);
  --color-on-dark-label: rgba(255, 255, 255, 0.61);
  --color-on-dark-accent: #ffffff;
  --color-on-dark-divider: rgba(255, 255, 255, 0.2);

  /* General purpose */
  --color-bg-light: #EDE7DC;
  --color-bg-medium: #E5DFD5;
  --color-bg-dark: #224160;
  --color-card-overlay: rgba(255, 255, 255, 0.5);
  --color-divider: rgba(0, 0, 0, 0.1);
  --color-border: rgba(0, 0, 0, 0.1);
  --color-overlay-dark: rgba(0, 0, 0, 0.25);

  /* ───────────────────────────────────────────────────────────── */
  /* SPACING TOKENS (for semantic spacing utilities) */
  /* ───────────────────────────────────────────────────────────── */

  --spacing-section-padding-top: 5rem;
  --spacing-section-padding-bottom: 7rem;
  --spacing-section-block: 4rem;
  --spacing-content: 1.5rem;
  --spacing-content-md: 1rem;
  --spacing-content-lg: 2rem;

  /* Element spacing */
  --spacing-label-heading: 0.7rem;
  --spacing-name-role: 0.25rem;
  --spacing-role-date: 0.25rem;
  --spacing-block-label: 0.75rem;
  --spacing-item-tag: 0.5rem;
  --spacing-element-xs: 0.5rem;
  --spacing-element-sm: 0.75rem;
  --spacing-element-md: 1rem;
  --spacing-paragraph: 1rem;
  --spacing-divider: 2.25rem;

  /* ───────────────────────────────────────────────────────────── */
  /* TRANSITION DURATIONS */
  /* ───────────────────────────────────────────────────────────── */

  --transition-fast: 200ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;
  --transition-slower: 700ms;
}
```

### 5.3 Phase 3: Convert Plugin Utilities to @utility (6 hours)

**Create `frontend/src/index.css` additions:**

```css
/* frontend/src/index.css */
@import "tailwindcss";

/* ───────────────────────────────────────────────────────────── */
/* PLUGIN UTILITY MIGRATION — @utility replacements */
/* ───────────────────────────────────────────────────────────── */

/* Typography Style Utilities */
@utility label {
  line-height: 1.5;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 400;
}

@utility button-text {
  line-height: 1.5;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

@utility role {
  line-height: 1.5;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@utility subline-italic {
  line-height: 1.5;
  font-style: italic;
}

@utility hint-italic {
  line-height: 1.5;
  font-style: italic;
}

@utility disclaimer-italic {
  line-height: 1.5;
  font-style: italic;
}

@utility quote-featured-italic {
  font-style: italic;
}

@utility body-narrative-italic {
  font-style: italic;
}

@utility tracking-label-alt {
  letter-spacing: 0.15em;
}

/* Spacing Utilities */
@utility section-padding {
  padding-top: 5rem;
  padding-bottom: 7rem;
}

@utility section-block-spacing {
  margin-bottom: 4rem;
}

@utility grid-gap-lg {
  gap: 2rem;
}

@utility grid-gap-xl {
  gap: 4rem;
}

@utility margin-top-sm {
  margin-top: 1.5rem;
}

@utility margin-top-md {
  margin-top: 3rem;
}

@utility section-padding-sm {
  padding-top: 2.5rem;
}

/* Element spacing */
@utility label-heading-spacing {
  margin-bottom: 0.7rem;
}

@utility name-role-spacing {
  margin-bottom: 0.25rem;
}

@utility role-date-spacing {
  margin-bottom: 0.25rem;
}

@utility block-label-spacing {
  margin-bottom: 0.75rem;
}

@utility content-spacing {
  margin-bottom: 1.5rem;
}

@utility content-spacing-md {
  margin-bottom: 1rem;
}

@utility content-spacing-lg {
  margin-bottom: 2rem;
}

@utility item-tag-spacing {
  margin-bottom: 0.5rem;
}

@utility element-spacing-xs {
  margin-top: 0.5rem;
}

@utility element-spacing-sm {
  margin-top: 0.75rem;
}

@utility element-spacing-md {
  margin-top: 1rem;
}

@utility paragraph-spacing {
  margin-bottom: 1rem;
}

@utility expanded-content-spacing {
  margin-top: 1rem;
  padding-top: 2rem;
}

@utility divider-spacing {
  padding-top: 2.25rem;
}

/* Transition Utilities */
@utility transition-fast {
  transition-duration: 200ms;
}

@utility transition-normal {
  transition-duration: 300ms;
}

@utility transition-slow {
  transition-duration: 500ms;
}

@utility transition-slower {
  transition-duration: 700ms;
}
```

### 5.4 Phase 4: Delete Old Config (1 hour)

```bash
# Remove old config
rm frontend/tailwind.config.js

# Update index.css
# @tailwind base; @tailwind components; @tailwind utilities;
# → @import "tailwindcss";
```

### 5.5 Phase 5: Testing & Validation (4 hours)

```bash
# 1. Build locally
npm --prefix frontend run build

# 2. Check for errors
# Look for "Unknown utility" warnings

# 3. Test typo-demo
# All sections should render identically

# 4. Visual regression test
# Compare screenshots before/after

# 5. Deploy to Cloudflare
git push origin typography-refactoring
# Test on live URL
```

### 5.6 Phase 6: Cleanup (1 hour)

- Remove any remaining v3 references
- Update documentation
- Commit final changes

---

## 6. COMPATIBILITY LAYER (During Migration)

### 6.1 Hybrid Approach (NOT RECOMMENDED)

**Possible but NOT recommended:**

```javascript
// Keep BOTH systems during transition
// v3 config with plugin utilities
// v4 config with @theme

// Problem: Conflicts, double build size, confusion
```

**Better:** Complete cutover in one go.

### 6.2 Gradual Utility Replacement (NOT RECOMMENDED)

**Replace utilities one by one:**

```jsx
// Step 1: Replace .label with native classes
<span className="font-primary text-label tracking-label-alt label text-color-label">
// →
<span className="font-primary text-label tracking-label-alt leading-[1.5] tracking-[0.2em] uppercase text-color-label">

// Step 2: Replace .content-spacing with native classes
<div className="content-spacing">
// →
<div className="mb-[1.5rem]">
```

**Problem:** 17 sections × 31 utilities = 527 replacements
**Better:** Keep plugin utilities, use @utility to replace them

---

## 7. FINAL RECOMMENDATION

### ✅ MIGRATE TO TAILWIND v4 AFTER TYPOGRAPHY MIGRATION IS 100% COMPLETE

**Rationale:**

1. **Single Conversion Event**
   - All 17 sections converted together
   - No double work
   - Consistent state

2. **Reference Materials Available**
   - Copy Sections show "before" state
   - Original sections show "after" state
   - Can compare side-by-side

3. **Lower Risk**
   - Typography system fully tested
   - No mixed v3/v4 states
   - Clear rollback point

4. **Efficient Testing**
   - Test all sections together
   - Single validation pass
   - Easier to spot regressions

5. **Timeline Impact: Minimal**
   - Only 1 section remaining (PodcastVideoSection)
   - ~1 week delay
   - Saves ~20 hours of re-work

---

## 8. MIGRATION CHECKLIST (For Later)

### Pre-Migration
- [ ] Typography Migration 100% complete (17/17 sections)
- [ ] All sections use typography tokens
- [ ] No hardcoded values remaining
- [ ] DebugLabels consistent across all sections
- [ ] typo-demo tested and working
- [ ] Git commit: "feat: complete typography migration (17/17 sections)"

### Tailwind v4 Upgrade
- [ ] Install `tailwindcss@next`
- [ ] Create `tailwind.config.css`
- [ ] Convert 18 typography tokens to `@theme`
- [ ] Convert 23 color tokens to CSS variables
- [ ] Replace hex-alpha with rgba()
- [ ] Remove old `tailwind.config.js`

### Plugin Utility Migration
- [ ] Create 31 `@utility` definitions in `index.css`
- [ ] Test all typography utilities (9 classes)
- [ ] Test all spacing utilities (18 classes)
- [ ] Test all transition utilities (4 classes)

### Testing
- [ ] Build succeeds: `npm run build`
- [ ] No "Unknown utility" warnings
- [ ] typo-demo loads without errors
- [ ] All 17 sections render correctly
- [ ] Visual regression test passes
- [ ] Responsive behavior preserved
- [ ] DebugLabels still work

### Deployment
- [ ] Commit changes
- [ ] Push to branch
- [ ] Deploy to Cloudflare Pages
- [ ] Test on live URL
- [ ] Merge to main

### Post-Migration
- [ ] Update documentation
- [ ] Remove any v3 references
- [ ] Update CLAUDE.md
- [ ] Save migration lessons to memory

---

## 9. ROLLBACK PLAN

### If Migration Fails

**Immediate Rollback:**
```bash
# 1. Revert commit
git revert <tailwind-v4-migration-commit>

# 2. Or restore from backup branch
git checkout -b rollback-v3
git checkout <pre-migration-commit>

# 3. Reinstall v3
npm install tailwindcss@^3.4.0

# 4. Restore tailwind.config.js
git checkout <pre-migration-commit> -- frontend/tailwind.config.js

# 5. Rebuild
npm run build
```

**Partial Rollback (if some sections work):**
```bash
# Keep v4 config
# Revert only broken sections
# Fix issues incrementally
```

---

## 10. APPENDIX: Code Comparison

### Example 1: ServicesSection Before/After

**Before (v3 with plugin):**
```jsx
<span className="font-primary text-label tracking-label-alt label text-color-label">
  {service.sub}
</span>
```

**After (v4 with @utility):**
```jsx
/* IDENTICAL - class names don't change! */
<span className="font-primary text-label tracking-label-alt label text-color-label">
  {service.sub}
</span>
```

**What changed:** Only the config, not the component code!

### Example 2: CaseStudiesSection Before/After

**Before (v3 with plugin):**
```jsx
<div className={`transition-opacity transition-slower ${showHint ? 'opacity-100' : 'opacity-0'}`}>
  <span className="text-hint hint-italic text-color-label/60">
    Klicke auf die Namen, um mehr zu lesen
  </span>
</div>
```

**After (v4 with @utility):**
```jsx
/* IDENTICAL - class names don't change! */
<div className={`transition-opacity transition-slower ${showHint ? 'opacity-100' : 'opacity-0'}`}>
  <span className="text-hint hint-italic text-color-label/60">
    Klicke auf die Namen, um mehr zu lesen
  </span>
</div>
```

**What changed:** Only the config, not the component code!

### Example 3: Color Tokens Before/After

**Before (v3 JavaScript):**
```javascript
colors: {
  'color-heading': '#224160',
  'color-body': '#5A5550',
  'on-dark-body': '#FFFFFFCC',
}
```

**After (v4 CSS):**
```css
@theme {
  --color-heading: #224160;
  --color-body: #5A5550;
  --color-on-dark-body: rgba(255, 255, 255, 0.8);
}
```

**Usage stays the same:**
```jsx
<h2 className="text-color-heading">...</h2>
<p className="text-color-body">...</p>
<div className="text-on-dark-body">...</div>
```

---

## Summary

**Tailwind v4 migration is MAJOR but MANAGEABLE:**

- ✅ Class names don't change (huge win!)
- ✅ Typography system already stable
- ✅ Only config format changes
- ⚠️ 31 plugin utilities need @utility replacement
- ⚠️ Hex-alpha colors need rgba() conversion
- ⚠️ Build system may need adjustments

**Recommendation: Wait until Typography Migration is 100% complete**

**Estimated Effort: 20 hours (single migration) vs 40 hours (double migration)**

**Risk Level: LOW (with stable foundation) vs HIGH (with mixed states)**

---

**Next Steps:**
1. Finish PodcastVideoSection migration (1/17 remaining)
2. Test all 17 sections on typo-demo
3. Commit "Typography Migration Complete"
4. Then begin Tailwind v4 migration

**Questions?** See:
- `docs/tailwind-v4-vite-strategy.md` (Strategic timeline)
- `docs/typography-refactoring-plan.md` (Current migration status)
- `MEMORY.md` (Project context)
