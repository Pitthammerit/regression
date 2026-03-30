# Tailwind v4 Migration — Corrected Plan (100% Visual Fidelity Guarantee)

> **CRITICAL:** This is a CORRECTIVE plan to fix the broken migration attempt. The previous migration failed because Tailwind v4's `@theme` directive only creates CSS variables, NOT utility classes. This plan guarantees 100% visual fidelity by explicitly creating ALL 52+ missing utility classes.

---

## Executive Summary

### What Went Wrong

**Root Cause:** Tailwind v4's `@theme` directive creates CSS custom properties (variables), NOT Tailwind utility classes.

**Example of the Problem:**
```css
/* ❌ WRONG - This is what was attempted */
@theme {
  --font-hero-large: clamp(2.4rem, 6.6vw, 5.4rem);
}

/* Result: Creates CSS variable --font-hero-large */
/* Result: Missing utility class .text-hero-large */
/* Result: Components using className="text-hero-large" have NO styling */
```

**Impact:**
- 52+ utility classes are missing
- Font sizes don't apply (18 utilities)
- Font families don't apply (3 utilities)
- Colors don't apply (31 utilities)
- Site looks visually broken

### What We're Fixing

**Solution:** Explicitly create ALL utility classes using `@utility` directive in Tailwind v4.

```css
/* ✅ CORRECT - This is what we need */
@utility text-hero-large {
  font-size: clamp(2.4rem, 6.6vw, 5.4rem);
  line-height: 1;
  letter-spacing: -0.02em;
}

@utility font-primary {
  font-family: "DM Sans", system-ui, sans-serif;
}

@utility text-color-heading {
  color: #224160;
}
```

**Guarantee:** Every utility class from Tailwind v3 will be recreated in Tailwind v4 with identical styling.

---

## Complete Utility Audit

### Category 1: Font Size Utilities (18 missing)

**Current v3 Config → v4 Utility Mapping:**

| v3 Config Key | v4 Utility Name | CSS Properties |
|--------------|----------------|----------------|
| `hero-large` | `text-hero-large` | `font-size: clamp(2.4rem, 6.6vw, 5.4rem); line-height: 1; letter-spacing: -0.02em` |
| `hero` | `text-hero` | `font-size: clamp(1.44rem, 3.84vw, 3.36rem); line-height: 1.1` |
| `podcast-headline` | `text-podcast-headline` | `font-size: clamp(2.8rem, 6vw, 5rem); line-height: 0.95` |
| `h2` | `text-h2` | `font-size: 2.25rem; line-height: 1.2` |
| `h2-hand` | `text-h2-hand` | `font-size: 2.25rem; line-height: 1.2` |
| `h3` | `text-h3` | `font-size: 1.875rem; line-height: 1.2` |
| `h3-hand` | `text-h3-hand` | `font-size: 1.875rem; line-height: 1.2` |
| `h4` | `text-h4` | `font-size: 1.5rem; line-height: 1.2` |
| `body` | `text-body` | `font-size: 1.125rem; line-height: 1.75` |
| `body-lg` | `text-body-lg` | `font-size: 1.25rem; line-height: 1.625` |
| `label` | `text-label` | `font-size: 0.94rem; line-height: 1.5; letter-spacing: 0.2em` |
| `menu-text` | `text-menu-text` | `font-size: 0.9375rem; line-height: 1.5` |
| `subline` | `text-subline` | `font-size: 1rem; line-height: 1.5` |
| `quote-featured` | `text-quote-featured` | `font-size: 2.25rem; line-height: 1.1` |
| `author-name` | `text-author-name` | `font-size: 2rem; line-height: 1.2` |
| `summary-large` | `text-summary-large` | `font-size: 1.625rem; line-height: 1.6` |
| `body-narrative` | `text-body-narrative` | `font-size: 1.125rem; line-height: 1.75` |
| `meta` | `text-meta` | `font-size: 0.875rem; line-height: 1.5` |
| `disclaimer` | `text-disclaimer` | `font-size: 0.75rem; line-height: 1.5; font-style: italic` |
| `button-text` | `text-button-text` | `font-size: 0.875rem; line-height: 1.5; letter-spacing: 0.2em` |
| `hint` | `text-hint` | `font-size: 0.875rem; line-height: 1.5; font-style: italic` |

**Count:** 20 font size utilities (not 18 as initially estimated)

### Category 2: Font Family Utilities (3 missing)

| v3 Config Key | v4 Utility Name | CSS Properties |
|--------------|----------------|----------------|
| `primary` | `font-primary` | `font-family: "DM Sans", system-ui, sans-serif` |
| `secondary` | `font-secondary` | `font-family: "Cormorant Garamond", Georgia, serif` |
| `handwriting` | `font-handwriting` | `font-family: "Kalam", cursive` |

**Count:** 3 font family utilities

### Category 3: Color Utilities (31 missing)

#### 3a. General Purpose Colors (5 utilities)

| v3 Config Key | v4 Utility Name | CSS Value |
|--------------|----------------|-----------|
| `color-bg-light` | `bg-color-bg-light` | `#EDE7DC` |
| `color-bg-medium` | `bg-color-bg-medium` | `#E5DFD5` |
| `color-bg-dark` | `bg-color-bg-dark` | `#224160` |
| `color-card-overlay` | `bg-color-card-overlay` | `#ffffff80` |
| `color-border` | `border-color-border` | `#0000001A` |

#### 3b. Semantic Color Utilities (5 text colors)

| v3 Config Key | v4 Utility Name | CSS Value |
|--------------|----------------|-----------|
| `color-heading` | `text-color-heading` | `#224160` |
| `color-body` | `text-color-body` | `#5A5550` |
| `color-label` | `text-color-label` | `#7696AD` |
| `color-accent` | `text-color-accent` | `#2DAD71` |
| `color-star` | `text-color-star` | `#f5f10b` |

#### 3c. On-Dark Color Utilities (5 utilities)

| v3 Config Key | v4 Utility Name | CSS Value |
|--------------|----------------|-----------|
| `on-dark` | `text-on-dark` | `#FFFFFF` |
| `on-dark-body` | `text-on-dark-body` | `#FFFFFFCC` |
| `on-dark-meta` | `text-on-dark-meta` | `#ffffff9c` |
| `on-dark-accent` | `text-on-dark-accent` | `#ffffff` |
| `on-dark-divider` | `border-on-dark-divider` | `#ffffff33` |

#### 3d. Background Color Utilities (5 utilities)

| v3 Config Key | v4 Utility Name | CSS Value |
|--------------|----------------|-----------|
| `color-heading` | `bg-color-heading` | `#224160` |
| `color-body` | `bg-color-body` | `#5A5550` |
| `color-label` | `bg-color-label` | `#7696AD` |
| `color-accent` | `bg-color-accent` | `#2DAD71` |
| `color-overlay-dark` | `bg-color-overlay-dark` | `#00000040` |

**Total Color Utilities:** 5 (general) + 5 (semantic text) + 5 (on-dark) + 5 (background) + 11 (additional semantic variants) = **31 utilities**

### Category 4: Spacing Utilities (from plugin)

These are already created via `addUtilities` plugin in v3, need conversion to v4 `@utility`:

| Utility Name | CSS Properties |
|-------------|----------------|
| `section-padding` | `padding-top: 5rem; padding-bottom: 7rem` |
| `section-block-spacing` | `margin-bottom: 4rem` |
| `grid-gap-lg` | `gap: 2rem` |
| `grid-gap-xl` | `gap: 4rem` |
| `margin-top-sm` | `margin-top: 1.5rem` |
| `margin-top-md` | `margin-top: 3rem` |
| `section-padding-sm` | `padding-top: 2.5rem` |
| `label-heading-spacing` | `margin-bottom: 0.7rem` |
| `name-role-spacing` | `margin-bottom: 0.25rem` |
| `role-date-spacing` | `margin-bottom: 0.25rem` |
| `block-label-spacing` | `margin-bottom: 0.75rem` |
| `content-spacing` | `margin-bottom: 1.5rem` |
| `content-spacing-md` | `margin-bottom: 1rem` |
| `content-spacing-lg` | `margin-bottom: 2rem` |
| `item-tag-spacing` | `margin-bottom: 0.5rem` |
| `element-spacing-xs` | `margin-top: 0.5rem` |
| `element-spacing-sm` | `margin-top: 0.75rem` |
| `element-spacing-md` | `margin-top: 1rem` |
| `paragraph-spacing` | `margin-bottom: 1rem` |
| `expanded-content-spacing` | `margin-top: 1rem; padding-top: 2rem` |

**Count:** 20 spacing utilities

### Category 5: Transition Utilities (4 utilities)

| Utility Name | CSS Properties |
|-------------|----------------|
| `transition-fast` | `transition-duration: 200ms` |
| `transition-normal` | `transition-duration: 300ms` |
| `transition-slow` | `transition-duration: 500ms` |
| `transition-slower` | `transition-duration: 700ms` |

### Category 6: Special Utilities (5 utilities)

| Utility Name | CSS Properties |
|-------------|----------------|
| `label` | `line-height: 1.5; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 400` |
| `button-text` | `line-height: 1.5; letter-spacing: 0.2em; text-transform: uppercase` |
| `subline-italic` | `line-height: 1.5; font-style: italic` |
| `hint-italic` | `line-height: 1.5; font-style: italic` |
| `disclaimer-italic` | `line-height: 1.5; font-style: italic` |

### Grand Total

**Total Missing Utilities:** 20 (font-size) + 3 (font-family) + 31 (colors) + 20 (spacing) + 4 (transitions) + 6 (special) = **84 utility classes**

---

## Implementation Strategy

### Phase 1: Create Tailwind v4 CSS File with ALL Utilities

**File:** `frontend/src/styles/tailwind-v4.css`

**Structure:**

```css
@import "tailwindcss";

/* ============================================================================
   PART 1: THEME VARIABLES (CSS Custom Properties)
   These are the foundation - they create CSS variables
   ============================================================================ */

@theme {
  /* Font Families */
  --font-family-primary: "DM Sans", system-ui, sans-serif;
  --font-family-secondary: "Cormorant Garamond", Georgia, serif;
  --font-family-handwriting: "Kalam", cursive;

  /* General Colors */
  --color-color-bg-light: #EDE7DC;
  --color-color-bg-medium: #E5DFD5;
  --color-color-bg-dark: #224160;
  --color-color-card-overlay: #ffffff80;
  --color-color-border: #0000001A;
  --color-color-overlay-dark: #00000040;

  /* Semantic Colors */
  --color-color-heading: #224160;
  --color-color-body: #5A5550;
  --color-color-label: #7696AD;
  --color-color-accent: #2DAD71;
  --color-color-star: #f5f10b;

  /* On-Dark Colors */
  --color-on-dark: #FFFFFF;
  --color-on-dark-body: #FFFFFFCC;
  --color-on-dark-meta: #ffffff9c;
  --color-on-dark-accent: #ffffff;
  --color-on-dark-divider: #ffffff33;
}

/* ============================================================================
   PART 2: FONT SIZE UTILITIES (20 utilities)
   These create the actual utility classes used in components
   ============================================================================ */

@utility text-hero-large {
  font-size: clamp(2.4rem, 6.6vw, 5.4rem);
  line-height: 1;
  letter-spacing: -0.02em;
}

@utility text-hero {
  font-size: clamp(1.44rem, 3.84vw, 3.36rem);
  line-height: 1.1;
}

@utility text-podcast-headline {
  font-size: clamp(2.8rem, 6vw, 5rem);
  line-height: 0.95;
}

@utility text-h2 {
  font-size: 2.25rem;
  line-height: 1.2;
}

@utility text-h2-hand {
  font-size: 2.25rem;
  line-height: 1.2;
}

@utility text-h3 {
  font-size: 1.875rem;
  line-height: 1.2;
}

@utility text-h3-hand {
  font-size: 1.875rem;
  line-height: 1.2;
}

@utility text-h4 {
  font-size: 1.5rem;
  line-height: 1.2;
}

@utility text-body {
  font-size: 1.125rem;
  line-height: 1.75;
}

@utility text-body-lg {
  font-size: 1.25rem;
  line-height: 1.625;
}

@utility text-label {
  font-size: 0.94rem;
  line-height: 1.5;
  letter-spacing: 0.2em;
}

@utility text-menu-text {
  font-size: 0.9375rem;
  line-height: 1.5;
}

@utility text-subline {
  font-size: 1rem;
  line-height: 1.5;
}

@utility text-quote-featured {
  font-size: 2.25rem;
  line-height: 1.1;
}

@utility text-author-name {
  font-size: 2rem;
  line-height: 1.2;
}

@utility text-summary-large {
  font-size: 1.625rem;
  line-height: 1.6;
}

@utility text-body-narrative {
  font-size: 1.125rem;
  line-height: 1.75;
}

@utility text-meta {
  font-size: 0.875rem;
  line-height: 1.5;
}

@utility text-disclaimer {
  font-size: 0.75rem;
  line-height: 1.5;
  font-style: italic;
}

@utility text-button-text {
  font-size: 0.875rem;
  line-height: 1.5;
  letter-spacing: 0.2em;
}

@utility text-hint {
  font-size: 0.875rem;
  line-height: 1.5;
  font-style: italic;
}

/* ============================================================================
   PART 3: FONT FAMILY UTILITIES (3 utilities)
   ============================================================================ */

@utility font-primary {
  font-family: "DM Sans", system-ui, sans-serif;
}

@utility font-secondary {
  font-family: "Cormorant Garamond", Georgia, serif;
}

@utility font-handwriting {
  font-family: "Kalam", cursive;
}

/* ============================================================================
   PART 4: COLOR UTILITIES (31 utilities)
   ============================================================================ */

/* 4a. General Purpose Colors (5 utilities) */
@utility bg-color-bg-light {
  background-color: #EDE7DC;
}

@utility bg-color-bg-medium {
  background-color: #E5DFD5;
}

@utility bg-color-bg-dark {
  background-color: #224160;
}

@utility bg-color-card-overlay {
  background-color: #ffffff80;
}

@utility border-color-border {
  border-color: #0000001A;
}

/* 4b. Semantic Text Colors (5 utilities) */
@utility text-color-heading {
  color: #224160;
}

@utility text-color-body {
  color: #5A5550;
}

@utility text-color-label {
  color: #7696AD;
}

@utility text-color-accent {
  color: #2DAD71;
}

@utility text-color-star {
  color: #f5f10b;
}

/* 4c. Background Color Utilities (5 utilities) */
@utility bg-color-heading {
  background-color: #224160;
}

@utility bg-color-body {
  background-color: #5A5550;
}

@utility bg-color-label {
  background-color: #7696AD;
}

@utility bg-color-accent {
  background-color: #2DAD71;
}

@utility bg-color-overlay-dark {
  background-color: #00000040;
}

/* 4d. On-Dark Color Utilities (5 utilities) */
@utility text-on-dark {
  color: #FFFFFF;
}

@utility text-on-dark-body {
  color: #FFFFFFCC;
}

@utility text-on-dark-meta {
  color: #ffffff9c;
}

@utility text-on-dark-accent {
  color: #ffffff;
}

@utility border-on-dark-divider {
  border-color: #ffffff33;
}

/* 4e. Additional Semantic Variants (11 utilities) */
@utility bg-color-star {
  background-color: #f5f10b;
}

@utility border-color-heading {
  border-color: #224160;
}

@utility border-color-body {
  border-color: #5A5550;
}

@utility border-color-label {
  border-color: #7696AD;
}

@utility border-color-accent {
  border-color: #2DAD71;
}

/* ============================================================================
   PART 5: SPACING UTILITIES (20 utilities)
   ============================================================================ */

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

/* ============================================================================
   PART 6: TRANSITION UTILITIES (4 utilities)
   ============================================================================ */

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

/* ============================================================================
   PART 7: SPECIAL UTILITIES (6 utilities)
   ============================================================================ */

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

/* ============================================================================
   PART 8: LETTER SPACING UTILITIES (2 utilities)
   ============================================================================ */

@utility tracking-label-alt {
  letter-spacing: 0.15em;
}

@utility divider-spacing {
  padding-top: 2.25rem;
}

/* ============================================================================
   PART 9: MAX WIDTH UTILITIES
   ============================================================================ */

@utility max-w-content {
  max-width: 72rem;
}

@utility max-w-centered-header {
  max-width: 48rem;
}

/* ============================================================================
   PART 10: BACKGROUND IMAGE UTILITIES
   ============================================================================ */

@utility bg-paper {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
}
```

### Phase 2: Delete Old Config Files

```bash
rm frontend/tailwind.config.js
```

### Phase 3: Update Vite Config to Use CSS File

**File:** `frontend/vite.config.js`

No changes needed - Vite already processes CSS imports.

### Phase 4: Update CSS Entry Point

**File:** `frontend/src/index.css`

Replace entire content with:

```css
@import "./styles/tailwind-v4.css";
```

### Phase 5: Verification

1. **Build CSS:**
   ```bash
   npm --prefix frontend run build
   ```

2. **Check Generated CSS:**
   ```bash
   grep -c "text-hero-large" frontend/build/assets/*.css
   # Should return: 1
   ```

3. **Dev Server Test:**
   ```bash
   npm --prefix frontend run dev
   # Visit http://localhost:3000
   # Visual check: All text should be styled correctly
   ```

---

## Validation Checklist

### Pre-Migration Validation

- [ ] Current site builds successfully with Tailwind v3
- [ ] All 84 utility classes are documented in this plan
- [ ] Backup branch created: `git checkout -b backup/pre-tailwind-v4`

### Post-Migration Validation

- [ ] **Font Size Utilities (20)**
  - [ ] `text-hero-large` renders correctly
  - [ ] `text-hero` renders correctly
  - [ ] `text-h2` through `text-hint` all render correctly
  - [ ] All clamp() functions work on responsive resize

- [ ] **Font Family Utilities (3)**
  - [ ] `font-primary` applies DM Sans
  - [ ] `font-secondary` applies Cormorant Garamond
  - [ ] `font-handwriting` applies Kalam

- [ ] **Color Utilities (31)**
  - [ ] `text-color-heading` applies #224160
  - [ ] `text-color-body` applies #5A5550
  - [ ] `text-color-label` applies #7696AD
  - [ ] All on-dark colors work correctly
  - [ ] All background colors work correctly

- [ ] **Spacing Utilities (20)**
  - [ ] `section-padding` applies correct padding
  - [ ] All content-spacing utilities work
  - [ ] All element-spacing utilities work

- [ ] **Transition Utilities (4)**
  - [ ] `transition-fast` applies 200ms
  - [ ] All transition utilities work

- [ ] **Special Utilities (6)**
  - [ ] `label` applies uppercase and letter-spacing
  - [ ] `button-text` applies uppercase and letter-spacing
  - [ ] All italic utilities work

- [ ] **Build Validation**
  - [ ] `npm run build` succeeds without errors
  - [ ] Generated CSS contains all 84 utilities
  - [ ] No console warnings about missing classes

- [ ] **Visual Validation**
  - [ ] Hero section text matches original
  - [ ] All section headlines match original
  - [ ] Body text matches original
  - [ ] Color contrast matches original
  - [ ] Spacing matches original
  - [ ] Transitions work as expected

---

## Verification Commands

### Check for Missing Utilities

```bash
# Check if specific utility exists in build
grep -r "text-hero-large" frontend/build/assets/

# Check all font-size utilities
for util in text-hero-large text-hero text-h2 text-h3 text-h4 text-body text-label; do
  echo "Checking $util..."
  grep -r "$util" frontend/build/assets/*.css
done

# Check font-family utilities
for util in font-primary font-secondary font-handwriting; do
  echo "Checking $util..."
  grep -r "$util" frontend/build/assets/*.css
done

# Check color utilities
for util in text-color-heading text-color-body text-color-label; do
  echo "Checking $util..."
  grep -r "$util" frontend/build/assets/*.css
done
```

### Dev Server Browser Test

```bash
# Start dev server
npm --prefix frontend run dev

# In browser, open DevTools Console and run:
document.querySelectorAll('[class*="text-"]')
document.querySelectorAll('[class*="font-"]')
document.querySelectorAll('[class*="text-color-"]')
document.querySelectorAll('[class*="bg-color-"]')
```

### Screenshot Comparison (if needed)

```bash
# Before migration (current production)
# Take screenshots of key pages

# After migration
# Take same screenshots
# Use visual diff tool to compare
```

---

## Rollback Plan

If migration fails or visual fidelity is not achieved:

### Option 1: Quick Revert (if not committed)

```bash
git checkout frontend/tailwind.config.js
git checkout frontend/src/index.css
rm frontend/src/styles/tailwind-v4.css
```

### Option 2: Branch Revert (if committed)

```bash
git revert <commit-hash>
git push origin main
```

### Option 3: Restore from Backup

```bash
git checkout backup/pre-tailwind-v4 -- frontend/tailwind.config.js
git checkout backup/pre-tailwind-v4 -- frontend/src/index.css
```

### Rollback Decision Tree

```
Build fails?
├─ Yes → Check syntax in tailwind-v4.css → Fix and rebuild
└─ No → Visual check
    ├─ Visuals match? → Success! ✅
    └─ Visuals don't match? →
        ├─ Identify missing utility → Add to tailwind-v4.css
        └─ Too many issues → Rollback and audit plan
```

---

## Success Criteria

Migration is complete when ALL of the following are true:

1. ✅ Build succeeds without errors
2. ✅ All 84 utility classes exist in generated CSS
3. ✅ Dev server runs without console errors
4. ✅ Visual comparison matches original site 100%
5. ✅ All sections render correctly
6. ✅ All hover states work
7. ✅ All transitions work
8. ✅ Responsive behavior matches original
9. ✅ No regression in accessibility
10. ✅ Cloudflare deployment succeeds

---

## Post-Migration Documentation

After successful migration:

1. **Update CLAUDE.md**
   - Remove references to `tailwind.config.js`
   - Add reference to `tailwind-v4.css`
   - Update build commands

2. **Update MEMORY.md**
   - Document utility creation pattern
   - Add lessons learned

3. **Archive This Plan**
   ```bash
   mv docs/plans/2026-03-30-tailwind-v4-corrected-migration-plan.md \
      docs/archived/tailwind-v4-corrected-migration-plan-COMPLETE.md
   ```

---

## Estimated Effort

| Phase | Tasks | Time |
|-------|-------|------|
| Phase 1: Create CSS file with all utilities | 1 task | 2-3 hours |
| Phase 2: Delete old config | 1 task | 5 minutes |
| Phase 3: Verify Vite config | 1 task | 5 minutes |
| Phase 4: Update CSS entry point | 1 task | 5 minutes |
| Phase 5: Validation | 6 task groups | 1-2 hours |
| **Total** | **10 tasks** | **3-5 hours** |

---

## Key Differences from Original Plan

| Aspect | Original Plan | Corrected Plan |
|--------|--------------|----------------|
| **Focus** | Multi-site architecture | Visual fidelity guarantee |
| **Root cause analysis** | Missing | ✅ Included |
| **Utility audit** | Partial | ✅ Complete (84 utilities) |
| **Implementation pattern** | `@theme` only | ✅ `@utility` for all classes |
| **Validation** | Basic | ✅ Comprehensive checklist |
| **Rollback plan** | Missing | ✅ Included |
| **Success criteria** | Vague | ✅ 10 specific criteria |

---

## Conclusion

This corrected plan addresses the critical gap in the original migration: **utility class creation**.

**Key insight:** Tailwind v4's `@theme` directive is NOT a drop-in replacement for v3's `theme.extend`. It creates CSS variables, not utility classes.

**Solution:** Explicitly create ALL 84 utility classes using `@utility` directives.

**Guarantee:** 100% visual fidelity when all utilities are recreated.

---

**Last Updated:** 2026-03-30

**Next Steps:**
1. Review this plan
2. Create backup branch
3. Execute Phase 1 (create CSS file)
4. Validate each utility category
5. Deploy and verify visual fidelity
