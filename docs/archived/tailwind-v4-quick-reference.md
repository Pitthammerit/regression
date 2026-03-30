# Tailwind v4 Migration — Quick Reference

**Date:** 2026-03-27
**Status:** AUDIT COMPLETE — Awaiting Typography Migration (16/17 sections)

---

## TL;DR

**CRITICAL:** Tailwind v4 will BREAK all 31 plugin utilities. Class names stay the same, but definitions move from JavaScript → CSS.

**RECOMMENDATION:** ✅ Wait until Typography Migration is 100% complete (1 section remaining)

**EFFORT:** ~20 hours single migration vs ~40 hours double migration

---

## Breaking Changes Summary

| Category | Count | Will Break? | Migration Path |
|----------|-------|-------------|----------------|
| Typography Utilities | 9 | ✅ YES | `@utility` replacement |
| Spacing Utilities | 18 | ✅ YES | `@utility` replacement |
| Transition Utilities | 4 | ✅ YES | `@utility` replacement |
| Color Tokens | 23 | ⚠️ FORMAT | CSS variables |
| Typography Tokens | 18 | ⚠️ FORMAT | CSS `@theme` |
| **TOTAL** | **72** | **31 BROKEN** | **~20 hours** |

---

## What DEFINITELY Breaks (31 Utilities)

### Typography Styles (9 classes)
```javascript
'.label'                // → @utility label
'.button-text'          // → @utility button-text
'.role'                 // → @utility role
'.subline-italic'       // → @utility subline-italic
'.hint-italic'          // → @utility hint-italic
'.disclaimer-italic'    // → @utility disclaimer-italic
'.quote-featured-italic' // → @utility quote-featured-italic
'.body-narrative-italic' // → @utility body-narrative-italic
'.tracking-label-alt'   // → @utility tracking-label-alt
```

### Spacing Utilities (18 classes)
```javascript
'.section-padding'         // → @utility section-padding
'.section-block-spacing'   // → @utility section-block-spacing
'.label-heading-spacing'   // → @utility label-heading-spacing
'.name-role-spacing'       // → @utility name-role-spacing
'.role-date-spacing'       // → @utility role-date-spacing
'.block-label-spacing'     // → @utility block-label-spacing
'.content-spacing'         // → @utility content-spacing
'.content-spacing-md'      // → @utility content-spacing-md
'.content-spacing-lg'      // → @utility content-spacing-lg
'.item-tag-spacing'        // → @utility item-tag-spacing
'.element-spacing-xs'      // → @utility element-spacing-xs
'.element-spacing-sm'      // → @utility element-spacing-sm
'.element-spacing-md'      // → @utility element-spacing-md
'.paragraph-spacing'       // → @utility paragraph-spacing
'.expanded-content-spacing' // → @utility expanded-content-spacing
'.divider-spacing'         // → @utility divider-spacing
'.grid-gap-lg'            // → @utility grid-gap-lg
'.grid-gap-xl'            // → @utility grid-gap-xl
```

### Transition Utilities (4 classes)
```javascript
'.transition-fast'    // → @utility transition-fast
'.transition-normal'  // → @utility transition-normal
'.transition-slow'    // → @utility transition-slow
'.transition-slower'  // → @utility transition-slower
```

---

## What CHANGES Format (41 Tokens)

### Color Tokens (23 tokens)
```javascript
// BEFORE (JavaScript)
colors: {
  'color-heading': '#224160',
  'on-dark-body': '#FFFFFFCC',  // Hex-alpha
}

// AFTER (CSS)
@theme {
  --color-heading: #224160;
  --color-on-dark-body: rgba(255, 255, 255, 0.8);  // rgba()
}
```

### Typography Tokens (18 tokens)
```javascript
// BEFORE (JavaScript)
fontSize: {
  'h2': ['2.25rem', { lineHeight: '1.2' }],
  'label': ['0.94rem', {
    lineHeight: '1.5',
    letterSpacing: '0.2em',
  }],
}

// AFTER (CSS)
@theme {
  --font-h2: 2.25rem;
  --line-height-h2: 1.2;

  --font-label: 0.94rem;
  --line-height-label: 1.5;
  --letter-spacing-label: 0.2em;
}
```

---

## What STAYS THE SAME

### Component Code (NO CHANGES!)
```jsx
// This code works in BOTH v3 and v4
<span className="font-primary text-label tracking-label-alt label text-color-label">
  {service.sub}
</span>

<h2 className="text-h2 text-color-heading">{headline}</h2>
<div className="content-spacing">{children}</div>
```

**Key Insight:** Only the config changes, not the component code!

---

## Migration Strategy Comparison

### Option A: Migrate NOW ❌
- **Effort:** 40 hours (20 now + 20 later)
- **Risk:** HIGH (inconsistency, double work)
- **Timeline:** Disrupts current workflow

### Option B: Migrate LATER ✅
- **Effort:** 20 hours (one-time)
- **Risk:** LOW (stable foundation)
- **Timeline:** After 1 remaining section

**Winner:** Option B ✅

---

## Migration Checklist (For Later)

### Pre-Migration
- [ ] Typography Migration 100% complete (17/17)
- [ ] All sections using tokens
- [ ] No hardcoded values
- [ ] typo-demo tested

### Migration
- [ ] Install `tailwindcss@next`
- [ ] Create `tailwind.config.css`
- [ ] Convert 23 colors → CSS variables
- [ ] Convert 18 typography → `@theme`
- [ ] Create 31 `@utility` definitions
- [ ] Remove old `tailwind.config.js`

### Testing
- [ ] Build succeeds
- [ ] No utility warnings
- [ ] All sections render
- [ ] Visual regression pass
- [ ] Deploy to Cloudflare

---

## Quick Migration Commands

```bash
# 1. Install Tailwind v4
npm install tailwindcss@next

# 2. Create new config
cat > frontend/tailwind.config.css << 'EOF'
@import "tailwindcss";

@theme {
  /* Copy tokens from audit document */
}
EOF

# 3. Add @utility to index.css
cat >> frontend/src/index.css << 'EOF'
/* Add @utility definitions from audit document */
EOF

# 4. Remove old config
rm frontend/tailwind.config.js

# 5. Build & test
npm run build
```

---

## Key Files

- **Full Audit:** `docs/tailwind-v4-migration-audit.md` (THIS FILE - detailed)
- **Quick Reference:** `docs/tailwind-v4-quick-reference.md` (THIS FILE - summary)
- **Strategic Plan:** `docs/tailwind-v4-vite-strategy.md` (timeline)
- **Typography Plan:** `docs/typography-refactoring-plan.md` (current status)
- **Memory:** `memory/tailwind-v4-vite-strategy.md` (strategic decision)

---

## Questions?

**See detailed audit:** `docs/tailwind-v4-migration-audit.md`

**Key questions answered:**
- What utilities break? (31 classes)
- What changes format? (41 tokens)
- What stays the same? (Component code)
- When to migrate? (After typography complete)
- How long does it take? (~20 hours)
- What's the risk? (LOW with stable foundation)

---

**Last updated:** 2026-03-27
**Status:** Waiting for PodcastVideoSection migration (1/17 remaining)
