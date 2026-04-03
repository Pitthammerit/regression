# Scroll Container Wrapper Pattern — Design Specification

> **Status:** Proposed
> **Created:** 2026-04-01
> **Approach:** Container Isolation (CSS-Only)

---

## Executive Summary

**Problem:** Page-level scroll-snap (`y mandatory`) conflicts with section-level scroll needs (accordion expansion, long read sections).

**Root Cause:** Data attribute CSS approach failed due to selector conflicts and cascade unpredictability.

**Solution:** Create two wrapper components:
1. **SnapSection** — Page-level scroll-snap (short sections)
2. **ScrollableSection** — Isolated scroll container (long/accordion sections)

**Benefits:**
- Clean separation of concerns (SOC)
- CSS-only solution (no JavaScript scroll handlers)
- Mobile-first with touch optimization
- WCAG 2.1 AA compliant
- Easy to understand and maintain (KISS)

---

## Architecture Overview

```
Page (html, body)
├─ scroll-snap-type: y mandatory (global)
│
├─ SnapSection (Hero, Welcome, Podcast, etc.)
│  ├─ scroll-snap-align: start
│  ├─ scroll-snap-stop: normal
│  └─ Participates in page-level snap
│
└─ ScrollableSection (Researchers, FAQ, etc.)
   ├─ overflow-y: auto
   ├─ scroll-snap-type: y proximity
   └─ Isolated scroll context
```

**Key Innovation:** Container isolation creates clear boundaries between page-snap and section-snap contexts.

---

## Component API

### 1. SnapSection.jsx

**Purpose:** Default wrapper for sections that participate in page-level scroll-snap.

**Props:**
```jsx
interface SnapSectionProps {
  id: string              // Section ID (for anchor links)
  children: ReactNode    // Section content
  className?: string     // Additional CSS classes
  dark?: boolean         // Dark background variant
  [key: string]: any    // Other HTML attributes
}
```

**Usage:**
```jsx
<SnapSection id="hero" dark={false}>
  <HeroV3Section />
</SnapSection>
```

**CSS Classes:**
- `snap-section` — scroll-snap-align: start, scroll-snap-stop: normal
- `py-16 md:py-20` — vertical padding (from SectionWrapper)
- `max-w-content mx-auto px-6` — max-width wrapper (inherited)

### 2. ScrollableSection.jsx

**Purpose:** Isolated scroll container for long content or accordion sections.

**Props:**
```jsx
interface ScrollableSectionProps {
  id: string              // Section ID (for anchor links)
  children: ReactNode    // Section content
  className?: string     // Additional CSS classes
  dark?: boolean         // Dark background variant
  maxHeight?: string     // Maximum height (default: "70vh")
  ariaLabel?: string     // Accessibility label
  [key: string]: any    // Other HTML attributes
}
```

**Usage:**
```jsx
<ScrollableSection 
  id="science" 
  dark={true}
  maxHeight="70vh"
  ariaLabel="Wissenschaftliche Forscher"
>
  <ResearchersSection />
</ScrollableSection>
```

**CSS Classes:**
- `scrollable-container` — overflow-y: auto, scroll-snap-type: y proximity
- `py-16 md:py-20` — vertical padding (from SectionWrapper)
- `max-w-content mx-auto px-6` — max-width wrapper (inherited)

---

## CSS Utilities (tailwind.config.css)

### Add to tailwind.config.css

```css
/* ─────────────────────────────────────────────────────────────
   SCROLL CONTAINER UTILITIES
   ───────────────────────────────────────────────────────────── */

/* Page-level snap sections */
@utility snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}

/* Isolated scroll container */
@utility scrollable-container {
  overflow-y: auto;
  scroll-snap-type: y proximity;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: theme('colors.color-primary') theme('colors.color-bg-light');
  contain: strict;
}

/* Custom scrollbar for webkit browsers */
.scrollable-container::-webkit-scrollbar {
  width: 8px;
}

.scrollable-container::-webkit-scrollbar-track {
  background: theme('colors.color-bg-light');
  border-radius: 4px;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background: theme('colors.color-primary');
  border-radius: 4px;
}

.scrollable-container::-webkit-scrollbar-thumb:hover {
  background: theme('colors.color-primary-dark');
}

/* Mobile adjustments */
@media (max-width: 767px) {
  .scrollable-container {
    max-height: 60vh;
  }
}

/* Desktop adjustments */
@media (min-width: 768px) {
  .scrollable-container {
    max-height: 70vh;
  }
}
```

---

## Section Classification

### SnapSection Sections (Page-Level Snap)

**Criteria:** Short content, no accordions, snap-friendly

| Section | Content Type | Reason |
|---------|--------------|--------|
| HeroV3Section | Short hero | Snap-friendly, no scroll needed |
| WelcomeSection | Medium intro | Short enough for page-snap |
| PodcastVideoSection | Video embed | Fixed height, no scroll |
| PodcastSection | Podcast links | Short content |
| CtaImageSection | Full-viewport CTA | Exactly 100vh |
| ServicesSection | Service cards | Short grid layout |
| BookingSection | Booking form | Short form |

**Total:** 7 sections

### ScrollableSection Sections (Container-Level Scroll)

**Criteria:** Long content OR accordions OR expandable content

| Section | Content Type | Reason |
|---------|--------------|--------|
| WhatIsSection | Long read | 2-column layout, sticky headline |
| ForWhomSection | Long read | Multiple topic cards |
| ResearchersSection | Accordion | Expandable author cards |
| ResearcherQuotesSection | Expandable | "Mehr/Weniger" toggle |
| CaseStudiesSection | Accordion | Expandable case studies |
| FAQSection | Accordion | Expandable FAQ items |
| ReferencesSection | Expandable | "Mehr anzeigen" toggle |
| AboutSection | Long read | 2-column bio layout |
| ProcessSection | Long read | Multiple process steps |
| StatementSection | Long read | Statement lines |

**Total:** 10 sections

---

## Mobile-First Strategy

### Mobile (< 768px)
- **ScrollableSection**: `maxHeight="60vh"` (smaller screens)
- **SnapSection**: Default behavior
- **Touch optimization**: `-webkit-overflow-scrolling: touch`
- **Scrollbar**: Hidden (native behavior)

### Desktop (≥ 768px)
- **ScrollableSection**: `maxHeight="70vh"` or custom
- **SnapSection**: Default behavior
- **Scrollbar**: Thin, styled scrollbar (8px width)

### Responsive Breakpoints
```jsx
// Mobile: 60vh max height
<ScrollableSection id="science" maxHeight="60vh">

// Desktop: 70vh max height (via CSS @media)
// No prop change needed — CSS handles it automatically
```

---

## Accessibility (WCAG 2.1 AA)

### Keyboard Navigation
- **Tab**: Focus moves into scrollable container
- **Arrow Up/Down**: Scroll within container
- **Page Up/Down**: Scroll within container
- **Home/End**: Jump to top/bottom of container

### Screen Reader Support
- **Role**: `role="region"` for scrollable containers
- **Label**: `aria-label` describes the content
- **Announcements**: "Scrollable content" for boundaries

### Focus Management
- Visible focus rings within container
- Focus maintained when accordion opens/closes
- High contrast scrollbar (7:1+ contrast ratio)

### Example:
```jsx
<ScrollableSection 
  id="science"
  role="region"
  aria-label="Wissenschaftliche Forscher und Autoren"
  maxHeight="70vh"
>
  <ResearchersSection />
</ScrollableSection>
```

---

## Migration Path

### Phase 1: Create Components (1 hour)

**Tasks:**
1. Create `frontend/src/components/ui/SnapSection.jsx`
2. Create `frontend/src/components/ui/ScrollableSection.jsx`
3. Add CSS utilities to `frontend/tailwind.config.css`
4. Export from `frontend/src/components/ui/index.js`

**Files Changed:**
- `frontend/src/components/ui/SnapSection.jsx` (new)
- `frontend/src/components/ui/ScrollableSection.jsx` (new)
- `frontend/tailwind.config.css` (add utilities)
- `frontend/src/components/ui/index.js` (export)

### Phase 2: Migrate SnapSection Sections (30 min)

**Replace `SectionWrapper` with `SnapSection` for:**
1. HeroV3Section
2. WelcomeSection
3. PodcastVideoSection
4. PodcastSection
5. CtaImageSection
6. ServicesSection
7. BookingSection

**Pattern:**
```jsx
// Before:
<SectionWrapper id="hero">
  <HeroV3Section />
</SectionWrapper>

// After:
<SnapSection id="hero">
  <HeroV3Section />
</SnapSection>
```

### Phase 3: Migrate ScrollableSection Sections (1 hour)

**Replace `SectionWrapper` with `ScrollableSection` for:**
1. WhatIsSection
2. ForWhomSection
3. ResearchersSection
4. ResearcherQuotesSection
5. CaseStudiesSection
6. FAQSection
7. ReferencesSection
8. AboutSection
9. ProcessSection
10. StatementSection

**Pattern:**
```jsx
// Before:
<section id="science" className="section-padding bg-color-primary">
  <ResearchersSection />
</section>

// After:
<ScrollableSection 
  id="science" 
  dark={true}
  maxHeight="70vh"
  ariaLabel="Wissenschaftliche Forscher"
>
  <ResearchersSection />
</ScrollableSection>
```

**Special Cases:**
- **ResearchersSection**: Remove `data-accordion-active` logic from `useAccordionScroll`
- **FAQSection**: Remove `data-accordion-active` logic from `useFAQScroll`
- **CaseStudiesSection**: Remove `data-accordion-active` logic from `useCaseStudiesScroll`

### Phase 4: Clean Up (30 min)

**Tasks:**
1. Remove `data-accordion-active` CSS from `frontend/src/index.css`
2. Simplify accordion scroll hooks (remove snap manipulation)
3. Mark `SectionWrapper.jsx` as deprecated (add comment)
4. Test all scroll behaviors

**Files Changed:**
- `frontend/src/index.css` (remove data-attribute CSS)
- `frontend/src/hooks/useAccordionScroll.js` (simplify)
- `frontend/src/hooks/useFAQScroll.js` (simplify)
- `frontend/src/hooks/useCaseStudiesScroll.js` (simplify)
- `frontend/src/components/ui/SectionWrapper.jsx` (deprecation comment)

---

## Testing Checklist

### Mobile Testing (< 768px)
- [ ] Scroll within `ScrollableSection` works with touch swipe
- [ ] Page snap works for `SnapSection` sections
- [ ] Accordion expansion doesn't trigger page snap
- [ ] Scrollbar is hidden (native mobile behavior)
- [ ] `-webkit-overflow-scrolling: touch` is smooth

### Desktop Testing (≥ 768px)
- [ ] Mouse wheel scrolls within container
- [ ] Page snap works for `SnapSection` sections
- [ ] Keyboard navigation works (arrow keys, page up/down)
- [ ] Custom scrollbar appears and is styled
- [ ] Hover effects on scrollbar work

### Accessibility Testing
- [ ] Screen reader announces "scrollable region"
- [ ] Keyboard focus moves into and out of container
- [ ] Focus indicators visible within container
- [ ] Touch targets ≥ 44×44px (mobile)
- [ ] Contrast ratio ≥ 7:1 for scrollbar

### Edge Cases
- [ ] Very long content in `ScrollableSection`
- [ ] Multiple accordions open simultaneously
- [ ] Rapid open/close of accordions
- [ ] Resizing browser window (responsive behavior)
- [ ] Zoom 200% (WCAG requirement)

### Section-Specific Tests
- [ ] **ResearchersSection**: Accordion expansion doesn't trigger page snap
- [ ] **FAQSection**: Accordion expansion doesn't trigger page snap
- [ ] **CaseStudiesSection**: Accordion expansion doesn't trigger page snap
- [ ] **ResearcherQuotesSection**: "Mehr/Weniger" toggle doesn't trigger page snap
- [ ] **ReferencesSection**: "Mehr anzeigen" toggle doesn't trigger page snap

---

## Performance Considerations

### Scroll Performance
- **GPU acceleration**: `contain: strict` for scrollable containers
- **No scroll event listeners**: CSS-only solution
- **Debouncing**: Not needed (no JavaScript handlers)
- **Containment**: `contain: strict` isolates layout recalculations

### Memory
- **No state synchronization**: Page and container scroll are independent
- **No custom scroll libraries**: Uses native browser scroll
- **Minimal JavaScript**: Only component props, no scroll logic

### Bundle Size
- **SnapSection**: ~0.5 KB (minimal wrapper)
- **ScrollableSection**: ~1 KB (wrapper + inline styles)
- **Total impact**: ~1.5 KB added to bundle

---

## Rollback Plan

### If ScrollableSection Causes Issues

**Steps:**
1. Revert all section migrations to use `SectionWrapper`
2. Keep `snap-section` class on all sections
3. Remove `scrollable-container` utilities from `tailwind.config.css`
4. Accept accordion snap conflict as known limitation

**Rollback Command:**
```bash
git revert <commit-hash>
npm --prefix frontend run build
```

### Known Limitations (Rollback Scenario)
- Accordion expansion may trigger page snap
- Long read sections may feel "trapped" in snap
- User experience degraded but functional

---

## Alternative Approaches Considered

### A. Data Attribute CSS (❌ Failed)
- **Approach:** Use `section[data-accordion-active="true"]` to disable snap
- **Pros:** Minimal code changes, no new components
- **Cons:** Selector conflicts, cascade issues, unreliable
- **Verdict:** Tested and abandoned

### B. JavaScript Scroll Lock (⚠️ Complex)
- **Approach:** Use JS to dynamically enable/disable scroll-snap
- **Pros:** Full control over scroll behavior
- **Cons:** Heavy JavaScript, performance issues, not KISS
- **Verdict:** Over-engineering

### C. ScrollableSection (✅ Recommended)
- **Approach:** Container isolation with two wrapper types
- **Pros:** Clean separation, CSS-only, mobile-friendly
- **Cons:** New component, migration effort
- **Verdict:** Best balance of simplicity and effectiveness

---

## Design Principles Met

- ✅ **DRY**: One wrapper component for each type, reusable across all sections
- ✅ **KISS**: CSS-based solution, minimal JavaScript, easy to understand
- ✅ **YAGNI**: Only solves scroll-snap conflict, no extra features
- ✅ **SOC**: SnapSection vs ScrollableSection clearly separated
- ✅ **Single Source of Truth**: `tailwind.config.css` for all scroll utilities

---

## Success Metrics

### User Experience
- Smooth scrolling within long sections (no "trapped" feeling)
- Accordion expansion doesn't trigger page snap
- Page snap works for short sections
- Mobile touch scroll is responsive

### Technical
- Zero console errors
- All accessibility tests pass (WCAG 2.1 AA)
- Build time increase < 5 seconds
- Bundle size increase < 2 KB

### Code Quality
- Clean separation of concerns (two wrapper types)
- CSS-only solution (minimal JavaScript)
- Reusable components (DRY)
- Easy to understand and maintain

---

## Next Steps

1. **Review this plan** with user approval
2. **Implement Phase 1** (create components)
3. **Test with one section** (e.g., ResearchersSection)
4. **If successful**, migrate remaining sections (Phase 2 & 3)
5. **Clean up** (Phase 4) and update documentation

**Estimated Time:** 3 hours total
**Risk Level:** Low (easy rollback)
**User Impact:** Positive (better scroll experience)

---

## Appendix: Code Examples

### Example 1: SnapSection Component

```jsx
// frontend/src/components/ui/SnapSection.jsx
import React from 'react'

export default function SnapSection({ 
  id, 
  children, 
  className = '', 
  dark = false,
  ...props 
}) {
  return (
    <section
      id={id}
      className={`snap-section py-16 md:py-20 ${dark ? 'bg-color-primary text-primary-on-dark' : ''} ${className}`}
      {...props}
    >
      <div className="max-w-content mx-auto px-6">
        {children}
      </div>
    </section>
  )
}
```

### Example 2: ScrollableSection Component

```jsx
// frontend/src/components/ui/ScrollableSection.jsx
import React from 'react'

export default function ScrollableSection({ 
  id, 
  children, 
  className = '', 
  dark = false,
  maxHeight = '70vh',
  ariaLabel,
  ...props 
}) {
  return (
    <section
      id={id}
      className={`py-16 md:py-20 ${dark ? 'bg-color-primary text-primary-on-dark' : ''} ${className}`}
      role="region"
      aria-label={ariaLabel}
      {...props}
    >
      <div className="max-w-content mx-auto px-6">
        <div 
          className="scrollable-container"
          style={{ maxHeight }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}
```

### Example 3: ResearchersSection Migration

```jsx
// Before:
<section
  id="science"
  data-testid="science-section"
  className="section-padding bg-color-primary text-primary-on-dark relative overflow-hidden"
>
  <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 relative z-10">
    {/* Content */}
  </div>
</section>

// After:
<ScrollableSection 
  id="science"
  dark={true}
  maxHeight="70vh"
  ariaLabel="Wissenschaftliche Forscher und Autoren"
>
  {/* Content (without outer div wrapper) */}
</ScrollableSection>
```

---

**Awaiting user review before implementation.**
