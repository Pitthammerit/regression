# Composite Typography Utilities (2026-03-31)

## What
Single utilities that combine font-family, font-size, font-weight, line-height, and letter-spacing into one class.

## Why
- Cleaner code (one class vs 3-4)
- Consistent typography across all sections
- Single Source of Truth for typography styles
- Easier to maintain and update

## Usage

### Before (4+ classes)
```jsx
<h2 className="font-secondary text-h2 text-color-primary leading-tight">
```

### After (1 class - includes default color)
```jsx
<h2 className="typography-h2">
```

### Override color when needed
```jsx
<h2 className="typography-h2 text-color-secondary">
<h2 className="typography-h2 text-on-dark">
```

## Available Utilities (include default colors)

### Headlines (Serif + Primary Color)
- `typography-hero-large` - Hero big (clamp 2.4-5.4rem, serif, **primary color**)
- `typography-hero` - Hero (clamp 1.44-3.36rem, serif, **primary color**)
- `typography-h2` - H2 (36px, serif, **primary color**)
- `typography-h3` - H3 (30px, serif, **primary color**)
- `typography-h4` - H4 (24px, serif, semibold, **primary color**)

### Body (Sans-Serif + Text Color)
- `typography-body` - Body (18px, sans-serif, **text color**)
- `typography-body-lg` - Body large (20px, sans-serif, **text color**)
- `typography-body-narrative` - Narrative (18px, serif, **text color**)

### Labels (Sans-Serif + Uppercase + Secondary Color)
- `typography-label` - Label (15px, uppercase, **secondary color**, wide spacing)

### Special (Footer, etc.)
- `typography-subline-italic` - Subline italic (16px, italic, **text color**)
- `typography-disclaimer` - Disclaimer (12px, italic, **secondary color**)
- `typography-hint-italic` - Hint italic (14px, italic, **secondary color**)

### Decorative
- `typography-handwriting` - Handwriting font (24px, Kalam)
- `typography-quote-featured` - Featured quote (36px, serif, italic)
- `typography-author-name` - Author name (32px, serif)

### Menu & Meta
- `typography-menu-text` - Menu text (15px, **primary color**)
- `typography-meta` - Meta text (14px, **text color**)

## On-Dark Exception Pattern

**Exception:** Headlines on dark backgrounds use white instead of blue.

**Pattern:** Override color with `text-on-dark` or `text-primary-on-dark`

```jsx
// Light background (default):
<h2 className="typography-h2">  // color: #224160 (blue)

// Dark background (exception):
<section className="bg-color-primary">
  <h2 className="typography-h2 text-on-dark">  // color: #FFFFFF (white)
</section>

// Or for primary heading on dark:
<h2 className="typography-h2 text-primary-on-dark">  // color: #FFFFFF (white)
```

**Apply this pattern in:**
- ResearchersSection (dark background section)
- ResearcherQuotesSection (dark background)
- ReferencesSection (dark background)
- Any component with `bg-color-primary` or `bg-brand-deep`

## Migration Status

**Complete (2026-03-31):**
- ✅ 15 composite utilities created in tailwind.config.css
- ✅ 17/17 active sections migrated
- ✅ 7 UI components migrated
- ✅ NotFound.jsx migrated
- ✅ SidecarMenu.jsx migrated
- ✅ Footer.jsx migrated
- ✅ Code review approved (with 1 fix applied)

**Files Changed:** 26 files total
**Build Status:** ✅ PASS (1.66s)

## Code Review Summary

**Verdict:** ✅ APPROVE (after fixing 1 critical issue)

**Fixed:**
- Issue #1: `text-on-dark-meta` → `text-secondary-on-dark` in SectionLabel.jsx

**Remaining (Phase 2):**
- TestimonialsSection — 8 old patterns (deferred)
- PodcastVideoSection — 12 old patterns (deferred)
- Some components may have intentional old patterns

## Next Steps

1. Deploy to production (git push)
2. Visual testing on live site
3. Phase 2: Complete remaining migrations (TestimonialsSection, PodcastVideoSection)
