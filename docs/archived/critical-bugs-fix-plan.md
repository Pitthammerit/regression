# Critical Bugs Fix Plan — Typography Migration

**Created:** 2026-03-27
**Status:** Ready for Execution
**Branch:** `typography-refactoring`
**Priority:** 🔴 HIGH — Must fix before PodcastVideoSection migration

---

## Executive Summary

Comprehensive architectural review conducted via `/multiloop` workflow revealed **6 critical bugs** across 16 Copy sections that must be fixed before migrating the final section (PodcastVideoSection).

**Timeline:** ~4 hours for all fixes
**Blocked:** PodcastVideoSection migration until fixes complete

---

## 🐛 Critical Bugs (6 Total)

### BUG #1: Plugin Utility Conflict — DOUBLE STYLING
**Severity:** 🔴 HIGH | **Instances:** 11 | **Fix Time:** 1 hour

**Problem:** `.label` and `.role` plugin utilities have built-in tracking, but manual tracking classes (`tracking-label-alt`, `tracking-wider`) are also applied, creating cascade conflicts.

**Affected Sections:**
- `ServicesSectionCopy.jsx:17`
- `ResearchersSectionCopy.jsx:98, 156, 173` (3 instances)
- `TestimonialsSectionCopy.jsx:81, 134` (2 instances)
- `TestimonialCarouselCopy.jsx:147`
- `ProcessSectionCopy.jsx:67`
- `ReferencesSectionCopy.jsx:43, 90, 169` (3 instances)

**The Bug:**
```jsx
// ❌ WRONG - Conflicting tracking!
<span className="font-primary text-label tracking-label-alt label text-color-label">
<p className="font-primary text-label role tracking-wider text-on-dark-role">
```

**The Fix:**
```jsx
// ✅ CORRECT - Remove manual tracking
<span className="font-primary text-label label text-color-label">
<p className="font-primary text-label role text-on-dark-role">
```

---

### BUG #2: Manual Italic + Plugin Utilities — REDUNDANT
**Severity:** 🔴 HIGH | **Instances:** 10+ | **Fix Time:** 30 minutes

**Problem:** Plugin utilities (`.subline-italic`, `.quote-featured-italic`) already have `font-style: italic`, but manual `italic` class is also added.

**Affected Sections:**
- `CaseStudiesSectionCopy.jsx:46, 90`
- `ResearcherQuotesSectionCopy.jsx:71, 141`
- `ResearchersSectionCopy.jsx:87`
- `StatementSectionCopy.jsx:28, 29`
- `TestimonialsSectionCopy.jsx:62, 115`

**The Bug:**
```jsx
// ❌ WRONG - Redundant italic!
<p className="text-subline subline-italic italic text-color-body">
<blockquote className="text-quote-featured quote-featured-italic italic text-on-dark-quote">
```

**The Fix:**
```jsx
// ✅ CORRECT - Remove manual italic
<p className="text-subline subline-italic text-color-body">
<blockquote className="text-quote-featured quote-featured-italic text-on-dark-quote">
```

---

### BUG #3: Hardcoded Spacing — Not Using Single Source of Truth
**Severity:** 🟡 MEDIUM | **Instances:** 15+ | **Fix Time:** 1 hour

**Problem:** Semantic spacing utilities exist (`.section-padding`, `.content-spacing`), but hardcoded Tailwind classes are used instead.

**Affected Sections:**
- `BookingSectionCopy.jsx:57` (mb-10)
- `ForWhomSectionCopy.jsx:27, 32` (mb-16, mb-8)
- `ProcessSectionCopy.jsx:28` (mb-16)
- `CaseStudiesSectionCopy.jsx:64, 97` (py-8, mt-1)
- `FAQSectionCopy.jsx:34, 52` (py-20, py-28, py-6)
- `PodcastSectionCopy.jsx:34` (py-16, py-20)

**The Bug:**
```jsx
// ❌ WRONG - Hardcoded spacing
<div className="mb-10">
<div className="mb-16">
<div className="py-20">
```

**The Fix:**
```jsx
// ✅ CORRECT - Use semantic utilities
<div className="section-block-spacing">  // was mb-16
<div className="content-spacing-lg">      // was mb-10
<div className="section-padding">         // was py-20/py-28
```

**Mapping:**
| Hardcoded | Semantic Utility |
|-----------|------------------|
| `mb-10` | `.content-spacing-lg` |
| `mb-16` | `.section-block-spacing` |
| `mb-8` | `.content-spacing` |
| `mb-6` | `.content-spacing-md` |
| `py-20`, `py-28` | `.section-padding` |
| `py-8` | `.section-padding-sm` |

---

### BUG #4: Inconsistent Tracking Patterns
**Severity:** 🟡 MEDIUM | **Instances:** 8+ | **Fix Time:** 30 minutes

**Problem:** Three different tracking values used inconsistently for labels:
- `tracking-label-alt` (0.15em) — labeled "alt" but used as standard
- `tracking-widest` (0.2em) — EXACT DUPLICATE of `.label` plugin
- `tracking-wider` (0.05em) — wrong value for labels

**Fix:** Remove ALL manual tracking when using `.label` or `.role` plugins.

---

### BUG #5: Inline Styles (Partial)
**Severity:** 🟢 LOW | **Instances:** 5 | **Fix Time:** 30 minutes

**Problem:** Static inline styles where Tailwind classes exist.

**Affected Sections:**
- `FAQSectionCopy.jsx:49` (scrollMarginTop: 80)
- `ProcessSectionCopy.jsx:52` (lineHeight, opacity)
- `PodcastSectionCopy.jsx:30` (backgroundImage — OK, dynamic)
- `TestimonialCarouselCopy.jsx:122` (transform — OK, dynamic)
- `TestimonialCarouselCopy.jsx:198` (width — OK, dynamic)

**The Fix:**
```jsx
// ✅ CORRECT - Use Tailwind where possible
<div className="scroll-mt-20">  // was scrollMarginTop: 80
<span className="leading-none opacity-[0.10]">  // was lineHeight: 1, opacity: 0.10
```

---

### BUG #6: App.js — Dead Code Issue
**Severity:** 🟡 MEDIUM | **Instances:** 1 | **Fix Time:** 30 minutes

**Problem:** 16 Copy sections created but only 1 used in production (`TestimonialsSectionCopy`). Other Copy sections are dead code.

**Current State:**
```jsx
// ❌ Copy sections imported but NOT in sections.config.js
import TestimonialsSectionCopy from './components/sections/TestimonialsSectionCopy'
// ... other Copy sections NOT imported
```

**Fix:** Update `sections.config.js` to reference all Copy sections, OR remove dead imports.

---

## 📋 Execution Plan

### Phase 1: Fix Plugin Utility Conflicts (1 hour)
1. Open each affected section
2. Find instances with `.label` or `.role` + manual tracking
3. Remove manual tracking classes
4. Test on typo-demo

### Phase 2: Remove Redundant Italic Classes (30 min)
1. Open each affected section
2. Find instances with plugin italic utilities + manual `italic`
3. Remove manual `italic` class
4. Test on typo-demo

### Phase 3: Replace Hardcoded Spacing (1 hour)
1. Open each affected section
2. Find hardcoded spacing classes (mb-*, py-*, etc.)
3. Replace with semantic utilities using mapping table
4. Test on typo-demo

### Phase 4: Fix Inconsistent Tracking (30 min)
1. Remove ALL manual tracking with `.label` or `.role` plugins
2. Verify plugin utilities provide correct tracking

### Phase 5: Fix Inline Styles (30 min)
1. Replace static inline styles with Tailwind classes
2. Keep dynamic inline styles (backgroundImage, transform, width)

### Phase 6: Fix App.js (30 min)
1. Decide: Use Copy sections OR remove dead imports
2. Update `sections.config.js` if using Copy sections
3. Test on production

**Total Time:** ~4 hours

---

## ✅ Success Criteria

- [ ] All 11 plugin utility conflicts fixed
- [ ] All 10+ redundant italic classes removed
- [ ] All 15+ hardcoded spacing replaced with utilities
- [ ] All inconsistent tracking patterns resolved
- [ ] All static inline styles replaced with Tailwind
- [ ] App.js imports resolved
- [ ] Build succeeds: `npm --prefix frontend run build`
- [ ] All sections render on typo-demo without errors
- [ ] No console errors

---

## 🚀 Next Steps (After Bugs Fixed)

1. **Migrate PodcastVideoSection** — The final section (1-2 hours)
2. **Test all 17 sections** — typo-demo verification
3. **Update sections.config.js** — Use Copy sections in production
4. **Deploy to production** — Cloudflare auto-deploy

---

## 📚 Reference Documents

### Created During Review:

**Tailwind v4 Migration:**
- `docs/tailwind-v4-migration-audit.md` — 11,000 word analysis
- `docs/tailwind-v4-quick-reference.md` — Quick summary
- `docs/tailwind-v4-visual-comparison.md` — Side-by-side comparison

**i18n Architecture:**
- `docs/ARCHITECTURAL_REVIEW_I18N_MULTI_SITE.md` — Full technical report
- `docs/ARCHITECTURAL_REVIEW_SUMMARY.md` — Executive summary
- `docs/ARCHITECTURAL_REVIEW_DIAGRAMS.md` — Visual diagrams
- `docs/ARCHITECTURAL_REVIEW_INDEX.md` — Navigation guide
- `docs/ARCHITECTURAL_REVIEW_QUICK_REF.md` — Cheat sheet

---

## 🔍 Verification Commands

```bash
# Check for plugin utility conflicts (should find 0 after fixes)
grep -rn "tracking-label-alt.*label\|tracking-wider.*role\|tracking-widest.*label" frontend/src/components/sections/*Copy.jsx

# Check for redundant italic (should find 0 after fixes)
grep -rn "italic.*-italic\|-italic.*italic" frontend/src/components/sections/*Copy.jsx

# Check for hardcoded spacing (should be minimal after fixes)
grep -rn "mb-\|py-\|mt-" frontend/src/components/sections/*Copy.jsx | grep -v "section-padding\|content-spacing\|block-spacing"

# Build test
npm --prefix frontend run build

# Dev server test
npm --prefix frontend run dev
# Visit: http://localhost:3000/typo-demo
```

---

**Last updated:** 2026-03-27
**Next session:** Start with BUG #1 (Plugin Utility Conflicts)
