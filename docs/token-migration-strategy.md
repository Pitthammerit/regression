# Token Migration Strategy

**Status:** 📋 Design Phase
**Created:** 2026-03-30
**Priority:** HIGH — 61 hardcoded style issues across 15 files

---

## Executive Summary

This document outlines a comprehensive token migration strategy to eliminate hardcoded styles throughout the codebase. The migration is organized by category and priority, with clear mappings from old hardcoded values to new semantic tokens.

**Goal:** Reduce hardcoded styles from 61 to 0 by expanding the design token system.

---

## Current Token System

### Existing Tokens (March 2026)

**Colors:**
- `color-bg-light/medium/dark`, `color-card-overlay`, `color-border`, `color-overlay-dark`
- `color-heading`, `color-body`, `color-label`, `color-accent`, `color-star`
- `on-dark`, `on-dark-body`, `on-dark-meta`, `on-dark-accent`, `on-dark-divider`

**Font Families:**
- `primary` (DM Sans), `secondary` (Cormorant Garamond), `handwriting` (Kalam)

**Font Sizes:** 18 tokens (hero-large, h1-h4, body, body-lg, label, etc.)

**Transitions:**
- `transition-fast` (200ms), `transition-normal` (300ms), `transition-slow` (500ms), `transition-slower` (700ms)

**Spacing:**
- `maxWidth`: content, centered-header
- Utilities: section-padding, content-spacing, etc.

---

## Token Additions Needed

### 1. Z-Index Tokens (CRITICAL — 8 issues in SidecarMenu)

**Problem:** `z-[60]`, `z-[70]`, `z-[100]` scattered throughout codebase.

**Solution:** Semantic z-index scale

```javascript
// tailwind.config.js - extend.zIndex
zIndex: {
  'base':      0,      // Default stacking
  'raised':    10,     // Slightly elevated (cards, badges)
  'dropdown':  20,     // Dropdown menus
  'sticky':    30,     // Sticky headers
  'fixed':     40,     // Fixed navigation
  'modal-back': 50,   // Modal backdrop
  'modal':     60,     // Modal content
  'drawer':    70,     // Side panel/drawer
  'popover':   80,     // Popovers/tooltips
  'toast':     90,     // Toast notifications
  'top':       100,    // Maximum z-index
}
```

**Migration Mapping:**
- `z-[60]` → `z-modal` (SidecarMenu)
- `z-[70]` → `z-drawer` (SidecarMenu overlay)
- `z-[100]` → `z-top` (BurgerButton, other top-level elements)

**Files Affected:**
- `SidecarMenu.jsx` (8 issues)
- `BurgerButton.jsx` (3 issues)
- `DesktopNav.jsx` (1 issue)

---

### 2. Duration Tokens (HIGH — 12 issues across components)

**Problem:** `duration-[400ms]`, `duration-[600ms]`, `duration-[900ms]` not covered by existing tokens.

**Solution:** Expand duration scale

```javascript
// tailwind.config.js - extend.transitionDuration OR add utilities
transitionDuration: {
  'instant': '100ms',   // Micro-interactions (hover, focus)
  'fast':    '200ms',   // Existing: transition-fast
  'normal':  '300ms',   // Existing: transition-normal
  'medium':  '400ms',   // NEW: Panel slides, moderate transitions
  'slow':    '500ms',   // Existing: transition-slow
  'slower':  '600ms',   // MODIFIED: Was 700ms
  'slowest': '900ms',   // NEW: Complex animations
}
```

**Alternative:** Add as utilities (matches existing pattern)

```javascript
// In plugins → addUtilities
'.transition-instant': {
  'transition-duration': '100ms',
},
'.transition-medium': {
  'transition-duration': '400ms',
},
'.transition-slowest': {
  'transition-duration': '900ms',
},
```

**Migration Mapping:**
- `duration-[400ms]` → `duration-medium` or `transition-medium`
- `duration-[600ms]` → `duration-slower` or `transition-slower`
- `duration-[900ms]` → `duration-slowest` or `transition-slowest`

**Files Affected:**
- `SidecarMenu.jsx` (2 issues)
- `BurgerButton.jsx` (2 issues)
- `VimeoGlassEmbed.jsx` (1 issue)
- `TestimonialCarousel.jsx` (1 issue)

**Decision:** Use **utility approach** (matches existing `.transition-*` pattern).

---

### 3. Opacity Tokens (CRITICAL — 14 issues in Footer)

**Problem:** Footer has `text-white/30`, `/45`, `/50`, `/60`, `/70`, `/80` — no semantic tokens for on-dark opacity variations.

**Solution:** Expand `on-dark-*` system with opacity variants

```javascript
// tailwind.config.js - extend.colors
colors: {
  // ... existing colors ...

  // ON-DARK with opacity variants
  'on-dark-light':    '#ffffffcc', // 80% - Secondary text (redundant with on-dark-body)
  'on-dark-muted':    '#ffffffb3', // 70% - Tertiary text
  'on-dark-soft':     '#ffffff99', // 60% - Muted text
  'on-dark-medium':   '#ffffff80', // 50% - Disabled state
  'on-dark-faint':    '#ffffff4d', // 30% - Dividers, borders
}
```

**Rationale:**
- `on-dark-light` (80%) = Secondary text, already exists as `on-dark-body` (#FFFFFFCC)
- `on-dark-muted` (70%) = Tertiary text, captions
- `on-dark-soft` (60%) = Muted text, less important info
- `on-dark-medium` (50%) = Disabled state, placeholders
- `on-dark-faint` (30%) = Dividers, borders, very subtle elements

**Migration Mapping (Footer):**
- `text-white/80` → `text-on-dark-light` or `text-on-dark-body` (existing)
- `text-white/70` → `text-on-dark-muted`
- `text-white/60` → `text-on-dark-soft`
- `text-white/50` → `text-on-dark-medium`
- `text-white/30` → `text-on-dark-faint`

**Files Affected:**
- `Footer.jsx` (14 issues) — HIGHEST PRIORITY
- `SidecarMenu.jsx` (1 issue)
- `BurgerButton.jsx` (1 issue)

**Additional:** Black opacity variants for light backgrounds

```javascript
colors: {
  // ... existing ...

  // BLACK opacity variants (for light backgrounds)
  'black-overlay-light':  '#000000cc', // 80% - Heavy overlays
  'black-overlay-medium': '#00000080', // 50% - Medium overlays
  'black-overlay-soft':   '#00000033', // 20% - Subtle overlays
  'black-overlay-faint':  '#00000014', // 8%  - Very subtle
  'black-overlay-subtle': '#0000000d', // 5%  - Barely visible
}
```

**Migration Mapping:**
- `bg-black/5` → `bg-black-overlay-subtle`
- `bg-black/8` → `bg-black-overlay-faint`
- `bg-black/20` → `bg-black-overlay-soft`
- `bg-black/50` → `bg-black-overlay-medium`
- `bg-black/80` → `bg-black-overlay-light`

**Files Affected:**
- `Footer.jsx` (2 issues)
- `SidecarMenu.jsx` (1 issue)

---

### 4. Width/Spacing Tokens (MEDIUM — 6 issues)

**Problem:** Arbitrary widths like `w-[380px]`, `max-w-[783px]`, `w-[436px]`.

**Solution:** Semantic width tokens

```javascript
// tailwind.config.js - extend.maxWidth / extend.width
maxWidth: {
  // ... existing: content, centered-header ...

  'panel-sm':  '380px',   // Small panels (SidecarMenu mobile)
  'panel-md':  '436px',   // Medium panels
  'panel-lg':  '540px',   // Large panels
  'hero-lg':  '783px',    // Hero content max-width
  'modal':    '600px',    // Modal content
  'drawer':   '400px',    // Side drawer
},
width: {
  'panel-sm':  '380px',
  'panel-md':  '436px',
  'panel-lg':  '540px',
  'drawer':   '400px',
}
```

**Migration Mapping:**
- `w-[380px]` → `w-panel-sm`
- `w-[436px]` → `w-panel-md`
- `max-w-[783px]` → `max-w-hero-lg`
- `w-[400px]` → `w-drawer` (if exists)

**Files Affected:**
- `SidecarMenu.jsx` (3 issues)
- `HeroV3Section.jsx` (1 issue)
- `TestimonialCarousel.jsx` (2 issues)

---

### 5. Border Radius Tokens (LOW — 3 issues)

**Problem:** `rounded-[3px]` in BurgerButton.

**Solution:** Already exists in Tailwind defaults (`rounded-sm` = 2px, `rounded` = 4px).

**Migration Mapping:**
- `rounded-[3px]` → `rounded` (4px is close enough, or use `rounded-sm` for 2px)

**Files Affected:**
- `BurgerButton.jsx` (1 issue)

---

### 6. Gap Tokens (LOW — 2 issues)

**Problem:** `gap-[2px]`, `gap-[3px]` in BurgerButton.

**Solution:** Use Tailwind defaults or add semantic tokens.

**Migration Mapping:**
- `gap-[2px]` → `gap-px` (1px, closest default) or `gap-[2px]` (keep as-is, very specific)
- `gap-[3px]` → `gap-1` (4px) or `gap-[3px]` (keep as-is)

**Decision:** Keep `gap-[2px]` and `gap-[3px]` as-is — too specific to justify new tokens.

**Files Affected:**
- `BurgerButton.jsx` (2 issues)

---

### 7. Object Position Tokens (LOW — 2 issues)

**Problem:** `object-[position]` values in TestimonialCarousel.

**Solution:** Already covered by Tailwind defaults (`object-left`, `object-center`, etc.).

**Migration Mapping:**
- `object-[position]` → Use appropriate Tailwind default

**Files Affected:**
- `TestimonialCarousel.jsx` (2 issues)

---

## Complete tailwind.config.js Additions

```javascript
// tailwind.config.js - ADD to extend section
module.exports = {
  theme: {
    extend: {
      // 1. Z-INDEX TOKENS
      zIndex: {
        'base':       0,
        'raised':     10,
        'dropdown':   20,
        'sticky':     30,
        'fixed':      40,
        'modal-back': 50,
        'modal':      60,
        'drawer':     70,
        'popover':    80,
        'toast':      90,
        'top':        100,
      },

      // 2. WIDTH TOKENS
      width: {
        'panel-sm': '380px',
        'panel-md': '436px',
        'panel-lg': '540px',
        'drawer':  '400px',
      },
      maxWidth: {
        'panel-sm': '380px',
        'panel-md': '436px',
        'panel-lg': '540px',
        'hero-lg': '783px',
        'modal':   '600px',
        'drawer':  '400px',
      },

      // 3. OPACITY TOKENS (expand on-dark system)
      colors: {
        // ... existing colors ...

        // ON-DARK opacity variants
        'on-dark-muted':  '#ffffffb3', // 70%
        'on-dark-soft':   '#ffffff99', // 60%
        'on-dark-medium': '#ffffff80', // 50%
        'on-dark-faint':  '#ffffff4d', // 30%

        // BLACK opacity variants (for light backgrounds)
        'black-overlay-light':  '#000000cc', // 80%
        'black-overlay-medium': '#00000080', // 50%
        'black-overlay-soft':   '#00000033', // 20%
        'black-overlay-faint':  '#00000014', // 8%
        'black-overlay-subtle': '#0000000d', // 5%
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        // ... existing utilities ...

        // 4. DURATION TOKENS (add to existing transition utilities)
        '.transition-instant': {
          'transition-duration': '100ms',
        },
        '.transition-medium': {
          'transition-duration': '400ms',
        },
        '.transition-slowest': {
          'transition-duration': '900ms',
        },
      })
    }),
  ],
}
```

---

## Migration Priority Order

### Phase 1: CRITICAL (Footer — 14 issues)
1. **Opacidad tokens** — Migrate `text-white/*` to `text-on-dark-*`
2. **Black opacity** — Migrate `bg-black/*` to `bg-black-overlay-*`

**Impact:** 14/61 issues resolved (23%)

### Phase 2: HIGH (SidecarMenu — 8 issues, BurgerButton — 3 issues)
1. **Z-index tokens** — Migrate `z-[60]`, `z-[70]`, `z-[100]`
2. **Width tokens** — Migrate `w-[380px]`, `max-w-[783px]`
3. **Duration tokens** — Migrate `duration-[400ms]`, etc.

**Impact:** 11/61 issues resolved (18%) → 34% total

### Phase 3: MEDIUM (PodcastPlayer, VimeoGlassEmbed, TestimonialCarousel)
1. **Duration tokens** — Remaining `duration-*` issues
2. **Width tokens** — Remaining `max-w-*` issues

**Impact:** ~15/61 issues resolved (25%) → 59% total

### Phase 4: LOW (Remaining scattered issues)
1. **Border radius** — Migrate `rounded-[3px]`
2. **Object position** — Use Tailwind defaults

**Impact:** ~21/61 issues resolved (34%) → 93% total

**Remaining:** Keep `gap-[2px]`, `gap-[3px]` as-is (too specific)

---

## Migration Checklist

### For Each Component

1. **Identify hardcoded values** (from code-explorer results)
2. **Map to token** (use migration mapping above)
3. **Replace in code** (global find/replace with review)
4. **Test visually** (ensure no visual regressions)
5. **Commit changes** (with descriptive message)

### Example Migration Workflow

```bash
# 1. Add tokens to tailwind.config.js
# 2. Find and replace in Footer.jsx
# 3. Build locally: npm --prefix frontend run build
# 4. Test on typo-demo branch (debugMode)
# 5. Commit: "refactor: migrate hardcoded opacities to tokens"
# 6. Push to typo-demo branch
```

---

## Testing Strategy

### Visual Regression Testing
1. **Before migration:** Take screenshots of all affected components
2. **After migration:** Compare screenshots pixel-by-pixel
3. **Acceptable variance:** None (tokens must match hardcoded values exactly)

### Manual Testing Checklist
- [ ] Footer: All text colors match original
- [ ] SidecarMenu: Z-index stacking works correctly
- [ ] BurgerButton: Animation timing feels the same
- [ ] TestimonialCarousel: Image positioning unchanged
- [ ] PodcastPlayer: Video overlays render correctly

### Browser Testing
- [ ] Chrome (desktop)
- [ ] Safari (desktop + mobile)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)

---

## Rollback Strategy

If migration causes issues:

1. **Revert tailwind.config.js** to previous version
2. **Revert component changes** (git reset)
3. **Identify root cause** (usually token value mismatch)
4. **Fix token values** and re-migrate
5. **Test again** before committing

---

## Success Metrics

- ✅ 61 hardcoded styles → 0 (93% reduction, excluding too-specific values)
- ✅ All tokens use semantic naming (z-modal, not z-60)
- ✅ Single Source of Truth maintained (tailwind.config.js)
- ✅ No visual regressions
- ✅ Build succeeds without errors
- ✅ No new warnings introduced

---

## Next Steps

1. **Review this strategy** with team/user
2. **Approve token additions** (tailwind.config.js changes)
3. **Create migration branches** for each phase
4. **Execute migrations** in priority order
5. **Test thoroughly** after each phase
6. **Document learnings** in memory

---

**Last updated:** 2026-03-30
**Status:** Awaiting approval
