# Scroll Container Wrapper Pattern (2026-04-01)

## Problem

**Scroll-Snap Conflict:** Page-level scroll-snap (`y mandatory`) conflicts with section-level scroll needs (accordion expansion, long read sections).

**Current State:**
- `index.css`: Global scroll-snap container (`scroll-snap-type: y mandatory`)
- `SectionWrapper`: All sections get `snap-section` class
- `useAccordionScroll`: Uses `data-accordion-active` attribute to disable snap on individual sections
- **Issue:** Data attribute CSS approach failed - need container isolation

## Root Cause Analysis

**Why data-attribute approach failed:**
1. **Selector specificity**: `section[data-accordion-active="true"]` has same specificity as `section.snap-section`
2. **Cascading conflicts**: CSS cascade order unpredictable for dynamic attribute changes
3. **Race conditions**: Attribute updates and scroll events happen in different event loops
4. **Container isolation**: No boundary between page-snap and section-snap contexts

## Solution: ScrollableSection Component

**Pattern:** Create a container wrapper that isolates scroll contexts.

### Two Wrapper Types

1. **SnapSection** (default) — Page-level scroll-snap
2. **ScrollableSection** — Container-level scroll isolation

### Architecture

```
Page (html, body)
├─ scroll-snap-type: y mandatory
├─ SnapSection (Hero, Welcome, etc.)
│  ├─ scroll-snap-align: start
│  └─ scroll-snap-stop: normal
└─ ScrollableSection (Researchers, FAQ, etc.)
   ├─ overflow-y: auto
   ├─ scroll-snap-type: y proximity
   └─ Isolated scroll container
```

### Component API

```jsx
// SnapSection.jsx — Default wrapper (page-level snap)
export default function SnapSection({ id, children, className = '', ...props }) {
  return (
    <section
      id={id}
      className={`snap-section ${className}`}
      {...props}
    >
      {children}
    </section>
  )
}

// ScrollableSection.jsx — Isolated scroll container
export default function ScrollableSection({ 
  id, 
  children, 
  className = '', 
  maxHeight = '70vh',
  ...props 
}) {
  return (
    <section
      id={id}
      className={className}
      {...props}
    >
      <div 
        className="scrollable-container"
        style={{ maxHeight }}
      >
        {children}
      </div>
    </section>
  )
}
```

### CSS Utilities (tailwind.config.css)

```css
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
```

## Section Classification

### SnapSection (Page-Level Snap)
**Criteria:** Short content, no accordions, snap-friendly

**Sections:**
- HeroV3Section
- WelcomeSection
- PodcastVideoSection
- PodcastSection
- CtaImageSection
- ServicesSection
- BookingSection

**Usage:**
```jsx
<SnapSection id="hero">
  <HeroV3Section />
</SnapSection>
```

### ScrollableSection (Container-Level Scroll)
**Criteria:** Long content OR accordions OR expandable content

**Sections:**
- WhatIsSection (long read)
- ForWhomSection (long read)
- ResearchersSection (accordion)
- ResearcherQuotesSection (expandable)
- CaseStudiesSection (accordion)
- FAQSection (accordion)
- ReferencesSection (expandable)
- AboutSection (long read)
- ProcessSection (long read)
- StatementSection (long read)

**Usage:**
```jsx
<ScrollableSection id="science" maxHeight="70vh">
  <ResearchersSection />
</ScrollableSection>
```

## Mobile-First Strategy

### Mobile (< 768px)
- **ScrollableSection**: `maxHeight="60vh"` (smaller screens)
- **SnapSection**: Default behavior
- **Touch optimization**: `-webkit-overflow-scrolling: touch`

### Desktop (≥ 768px)
- **ScrollableSection**: `maxHeight="70vh"` or custom
- **SnapSection**: Default behavior
- **Scrollbar**: Thin, styled scrollbar

## Accessibility (WCAG 2.1 AA)

### Keyboard Navigation
- **Tab**: Focus moves into scrollable container
- **Arrow keys**: Native scroll within container
- **Page Up/Down**: Scroll within container
- **Home/End**: Jump to top/bottom of container

### Screen Reader Support
- **ARIA attributes**: Add `role="region"` + `aria-label`
- **Focus management**: Maintain focus when container opens/closes
- **Announcements**: "Scrollable content" for container boundaries

```jsx
<ScrollableSection 
  id="science" 
  role="region"
  aria-label="Wissenschaftliche Forscher"
  maxHeight="70vh"
>
  <ResearchersSection />
</ScrollableSection>
```

### Focus Indicators
- Visible focus rings within container
- High contrast scrollbar (WCAG AAA: 7:1+)

## Migration Path

### Phase 1: Create Components (1 hour)
1. Create `SnapSection.jsx` in `frontend/src/components/ui/`
2. Create `ScrollableSection.jsx` in `frontend/src/components/ui/`
3. Add CSS utilities to `tailwind.config.css`
4. Export from `frontend/src/components/ui/index.js`

### Phase 2: Migrate SnapSection Sections (30 min)
Replace `SectionWrapper` with `SnapSection` for short sections:
- HeroV3Section
- WelcomeSection
- PodcastVideoSection
- PodcastSection
- CtaImageSection
- ServicesSection
- BookingSection

### Phase 3: Migrate ScrollableSection Sections (1 hour)
Replace `SectionWrapper` with `ScrollableSection` for long/accordion sections:
- WhatIsSection
- ForWhomSection
- ResearchersSection
- ResearcherQuotesSection
- CaseStudiesSection
- FAQSection
- ReferencesSection
- AboutSection
- ProcessSection
- StatementSection

### Phase 4: Clean Up (30 min)
1. Remove `data-accordion-active` CSS from `index.css`
2. Simplify `useAccordionScroll` hook (no snap manipulation)
3. Update `SectionWrapper.jsx` documentation (deprecated)
4. Test all scroll behaviors

## Testing Checklist

### Mobile Testing
- [ ] Scroll within `ScrollableSection` works with touch
- [ ] Page snap works for `SnapSection` sections
- [ ] Accordion expansion doesn't trigger page snap
- [ ] Scrollbar visible but not intrusive

### Desktop Testing
- [ ] Mouse wheel scrolls within container
- [ ] Page snap works for `SnapSection` sections
- [ ] Keyboard navigation works (arrow keys, page up/down)
- [ ] Custom scrollbar appears and is styled

### Accessibility Testing
- [ ] Screen reader announces scrollable region
- [ ] Keyboard focus moves into and out of container
- [ ] Focus indicators visible within container
- [ ] Touch targets ≥ 44×44px (mobile)

### Edge Cases
- [ ] Very long content in `ScrollableSection`
- [ ] Multiple accordions open simultaneously
- [ ] Rapid open/close of accordions
- [ ] Resizing browser window
- [ ] Zoom 200% (WCAG requirement)

## Performance Considerations

### Scroll Performance
- **GPU acceleration**: `transform: translateZ(0)` for smooth scrolling
- **Debouncing**: No scroll event listeners (use CSS)
- **Containment**: `contain: strict` for scrollable containers

### Memory
- **No JavaScript scroll handlers** (CSS-only solution)
- **No state synchronization** between page and container scroll
- **Native browser scroll** (no custom scroll libraries)

## Rollback Plan

If ScrollableSection causes issues:
1. Revert to `SectionWrapper` for all sections
2. Keep `snap-section` class on all sections
3. Remove `scrollable-container` utilities
4. Accept accordion snap conflict as known limitation

## Alternative Approaches Considered

### A. Data Attribute CSS (❌ Failed)
- **Pros:** Minimal code changes
- **Cons:** Selector conflicts, cascade issues
- **Verdict:** Unreliable, abandoned

### B. JavaScript Scroll Lock (⚠️ Complex)
- **Pros:** Full control over scroll behavior
- **Cons:** Heavy JavaScript, performance issues
- **Verdict:** Over-engineering, not KISS

### C. ScrollableSection (✅ Recommended)
- **Pros:** Clean separation, CSS-only, mobile-friendly
- **Cons:** New component, migration effort
- **Verdict:** Best balance of simplicity and effectiveness

## Design Principles Met

- **DRY**: One wrapper component, reusable across all sections
- **KISS**: CSS-based solution, minimal JavaScript
- **YAGNI**: Only solves scroll-snap conflict, no extra features
- **SOC**: SnapSection vs ScrollableSection clearly separated
- **Single Source of Truth**: `tailwind.config.css` for all scroll utilities

## Next Steps

1. Get user approval for this approach
2. Implement Phase 1 (create components)
3. Test with one section (e.g., ResearchersSection)
4. If successful, migrate remaining sections
5. Update documentation and memories
