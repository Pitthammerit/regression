# Composite Typography Utilities Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create Tailwind v4 composite typography utilities that combine font-family, font-size, font-weight, line-height, and letter-spacing into single utilities for cleaner, more consistent component code.

**Architecture:** Extend existing `@utility` definitions in `tailwind.config.css` to include all typography properties in one utility. Create new `typography-*` utilities that replace combinations like `font-secondary text-h2 leading-tight` with single `typography-h2` class.

**Tech Stack:** Tailwind CSS v4 (@utility syntax), CSS custom properties, React components

---

## Context

Current state requires multiple classes for typography:
```jsx
<h2 className="font-secondary text-h2 text-color-primary leading-tight">
```

Desired state with single composite utility:
```jsx
<h2 className="typography-h2 text-color-primary">
```

We already have partial composite utilities (`text-label`, `text-button-text`) that combine 3 properties. This plan extends that pattern to all typography tokens.

---

## Task 1: Define Composite Typography Utilities in tailwind.config.css

**Files:**
- Modify: `frontend/tailwind.config.css:149-241`

**Step 1: Add new composite utilities after existing text-* utilities**

Find line 241 (after `text-hint` utility) and add:

```css
/* ─────────────────────────────────────────────────────────────
   COMPOSITE TYPOGRAPHY UTILITIES (font + size + weight + line-height + spacing)
   ───────────────────────────────────────────────────────────── */

/* Headlines (Secondary/Serif Font + Primary Color by default) */
@utility typography-hero-large {
  font-family: var(--font-secondary);
  font-size: var(--font-hero-large);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--color-primary);
}

@utility typography-hero {
  font-family: var(--font-secondary);
  font-size: var(--font-hero);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-primary);
}

@utility typography-h2 {
  font-family: var(--font-secondary);
  font-size: var(--font-h2);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--color-primary);
}

@utility typography-h3 {
  font-family: var(--font-secondary);
  font-size: var(--font-h3);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--color-primary);
}

@utility typography-h4 {
  font-family: var(--font-secondary);
  font-size: var(--font-h4);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--color-primary);
}

/* Body Text (Primary/Sans Font + Text Color by default) */
@utility typography-body {
  font-family: var(--font-primary);
  font-size: var(--font-body);
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0;
  color: var(--color-text);
}

@utility typography-body-lg {
  font-family: var(--font-primary);
  font-size: var(--font-body-lg);
  font-weight: 400;
  line-height: 1.625;
  letter-spacing: 0;
  color: var(--color-text);
}

/* Labels (Primary/Sans Font + Wide Spacing + Secondary Color by default) */
@utility typography-label {
  font-family: var(--font-primary);
  font-size: var(--font-label);
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-secondary);
}

/* Handwriting Font (for decorative use) */
@utility typography-handwriting {
  font-family: var(--font-handwriting);
  font-size: var(--font-h4);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0;
}
```

**Step 2: Verify build succeeds**

Run: `npm --prefix frontend run build`
Expected: PASS with no CSS errors

**Step 3: Commit**

```bash
git add frontend/tailwind.config.css
git commit -m "feat: add composite typography utilities (typography-*)"
```

---

## Task 2: Update FAQSection to Use Composite Utilities

**Files:**
- Modify: `frontend/src/components/sections/FAQSection.jsx:46,60`

**Step 1: Update h2 headline (line 46)**

Change:
```jsx
<h2 className="font-secondary text-h2 text-color-primary leading-tight section-block-spacing">
```

To:
```jsx
<h2 className="typography-h2 section-block-spacing">
```

**Step 2: Update h4 question (line 60)**

Change:
```jsx
<span className="font-medium text-h4 text-color-primary">{item.question}</span>
```

To:
```jsx
<span className="typography-h4">{item.question}</span>
```

**Step 3: Verify visual consistency**

Run: `npm --prefix frontend run dev`
Expected: h2 and h4 now both use Cormorant Garamond (font-secondary), consistent look

**Step 4: Commit**

```bash
git add frontend/src/components/sections/FAQSection.jsx
git commit -m "refactor: FAQSection use composite typography utilities"
```

---

## Task 3: Update HeroV3Section to Use Composite Utilities

**Files:**
- Modify: `frontend/src/components/sections/HeroV3Section.jsx`

**Step 1: Find typography classes**

Search for: `font-secondary text-hero-large`, `font-secondary text-hero`

**Step 2: Replace with composite utilities**

```jsx
// Before:
className="font-secondary text-hero-large text-color-primary leading-tight"

// After:
className="typography-hero-large text-color-primary"
```

**Step 3: Commit**

```bash
git add frontend/src/components/sections/HeroV3Section.jsx
git commit -m "refactor: HeroV3Section use composite typography utilities"
```

---

## Task 4: Update All Sections to Use Composite Utilities

**Files:**
- Modify: All section components in `frontend/src/components/sections/`

**Step 1: Update WelcomeSection**

Replace:
```jsx
font-secondary text-h2 → typography-h2
font-primary text-body-lg → typography-body-lg
font-primary text-body → typography-body
font-secondary text-h3 → typography-h3
```

**Step 2: Update ForWhomSection**

Replace:
```jsx
font-secondary text-h2 → typography-h2
font-primary text-body-lg → typography-body-lg
```

**Step 3: Update ServicesSection**

Replace:
```jsx
font-secondary text-h2 → typography-h2
font-primary text-body → typography-body
```

**Step 4: Update remaining sections**

Apply same pattern to:
- `WhatIsSection.jsx`
- `StatementSection.jsx`
- `ResearchersSection.jsx`
- `AboutSection.jsx`
- `ProcessSection.jsx`
- `PodcastSection.jsx`
- `CaseStudiesSection.jsx`
- `TestimonialsSection.jsx`
- `BookingSection.jsx`
- `ReferencesSection.jsx`
- `CtaImageSection.jsx`

**Step 5: Build and verify**

Run: `npm --prefix frontend run build`
Expected: All sections build successfully

**Step 6: Commit**

```bash
git add frontend/src/components/sections/
git commit -m "refactor: all sections use composite typography utilities"
```

---

## Task 5: Update UI Components to Use Composite Utilities

**Files:**
- Modify: `frontend/src/components/ui/*.jsx`

**Step 1: Update SectionLabel component**

Replace `font-primary text-label label` with `typography-label`

**Step 2: Update any remaining typography in UI components**

Check:
- `TopicCard.jsx`
- `AccordionWrap.jsx`
- `LazyImage.jsx`
- Other UI components with typography

**Step 3: Commit**

```bash
git add frontend/src/components/ui/
git commit -m "refactor: UI components use composite typography utilities"
```

---

## Task 6: Remove Deprecated Utilities (Optional Cleanup)

**Files:**
- Modify: `frontend/tailwind.config.css:132-241`

**Step 1: Identify unused utilities**

After migration, old utilities like `text-h2`, `text-h4` may be unused.

**Step 2: Search for usage**

Run: `grep -r "text-h2\|text-h4\|text-body" frontend/src/`

**Step 3: If unused, remove old utilities**

Remove `@utility text-h2`, `@utility text-h4`, etc. from config.

**Step 4: Commit**

```bash
git add frontend/tailwind.config.css
git commit -m "chore: remove deprecated typography utilities"
```

---

## Task 7: Visual Testing and Documentation

**Files:**
- Modify: `memory/2026-03-31-typography-composite-utilities.md` (create new memory file)

**Step 1: Visual test all sections**

Run dev server and verify:
- All headings use correct font (secondary for h1-h4)
- All body text uses correct font (primary)
- No visual regressions
- Consistent letter-spacing across components

**Step 2: Document new utilities**

Create memory file:

```markdown
# Composite Typography Utilities (2026-03-31)

## What
Single utilities that combine font-family, font-size, font-weight, line-height, and letter-spacing.

## Why
- Cleaner component code (one class vs 3-4)
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
- `typography-hero-large` - Hero big (clamp 2.4-5.4rem, serif, **primary color**)
- `typography-hero` - Hero (clamp 1.44-3.36rem, serif, **primary color**)
- `typography-h2` - H2 (36px, serif, **primary color**)
- `typography-h3` - H3 (30px, serif, **primary color**)
- `typography-h4` - H4 (24px, serif, semibold, **primary color**)
- `typography-body` - Body (18px, sans-serif, **text color**)
- `typography-body-lg` - Body large (20px, sans-serif, **text color**)
- `typography-label` - Label (15px, sans-serif, uppercase, **secondary color**, wide spacing)
- `typography-handwriting` - Handwriting font (24px, Kalam)
```

**Step 3: Commit documentation**

```bash
git add memory/2026-03-31-typography-composite-utilities.md
git commit -m "docs: document composite typography utilities"
```

---

## Task 8: Final Build and Deploy

**Step 1: Production build**

Run: `npm --prefix frontend run build`
Expected: PASS with no errors

**Step 2: Deploy**

Run: `git push origin main`
Expected: Cloudflare Pages deploys successfully

**Step 3: Visual verification on production**

Test at: `[commit-hash].regression-a2m.pages.dev`

**Step 4: Final commit**

```bash
git commit --allow-empty -m "chore: composite typography utilities migration complete"
```

---

## Success Criteria

- [ ] All typography uses composite utilities (typography-*)
- [ ] No visual regressions
- [ ] FAQ section h2/h4 use same font-family (both serif)
- [ ] Build succeeds
- [ ] All sections deployed successfully
- [ ] Documentation created in memory

---

## Migration Pattern Summary

| Old Classes | New Utility | Notes |
|------------|-------------|-------|
| `font-secondary text-h2 text-color-primary leading-tight` | `typography-h2` | Default color included |
| `font-secondary text-h3 text-color-primary leading-tight` | `typography-h3` | Default color included |
| `font-medium text-h4 text-color-primary` | `typography-h4` | Default color included |
| `font-primary text-body text-color-text leading-relaxed` | `typography-body` | Default color included |
| `font-primary text-body-lg text-color-text leading-relaxed` | `typography-body-lg` | Default color included |
| `font-primary text-label text-color-secondary label tracking-widest uppercase` | `typography-label` | Default color + case included |

**Override colors when needed:**
```jsx
typography-h2 text-color-secondary    // Different color
typography-h2 text-on-dark             // On dark background
typography-body text-color-primary     // Body as heading
```
