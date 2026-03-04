# TODO

Updated: 2026-03-04

## High Priority

### Sprint 2: Quality (Next)

### Phase 2: Remove Remaining Hardcoded Strings
- Footer: Extract hardcoded German strings to content layer
- Check other components for hardcoded strings
- Ensure all user-facing text is in plr-de.js

### Phase 3: Type Safety (Optional)
- Add PropTypes to key components
- Consider TypeScript migration for larger refactors

### Implement Minimal i18n System
- Create `frontend/src/content/plr-en.js`
- Create `frontend/src/content/index.js` with `getContent(lang)` export
- Add `useContent()` hook
- Update components to use `useContent()` instead of direct imports

### Fix Missing Catch-All Route
- Note: Already implemented in App.js (`path="*"` with NotFound component)

## Medium Priority

### Clean Up Unused Section Variants
- Move unused hero variants to `frontend/src/experiments/`:
  - `HeroAlt1.jsx`, `HeroAlt2.jsx`, `HeroAlt3.jsx`, `HeroV2Section.jsx`
- Keep only production components in `sections/`

### Resolve backend/ Folder Confusion
- Either remove `backend/` folder
- Or add clarifying note: "Not deployed. Frontend-only project right now."

## Low Priority

### Add SPA Fallback for Deep Links
- Create `frontend/public/_redirects` with: `/*    /index.html   200`
- Enables deep links like `/transkript` to work on refresh
- Currently intentionally disabled (add if needed)

## Completed

### Sprint 1: Config-Based Section System + Dynamic Testimonials (2026-03-04)
- Created `frontend/src/config/sections.config.js` with SECTIONS_ORDER array
- Updated App.js to use dynamic section rendering from config
- Created `frontend/src/content/testimonials.list.js` with automatic numbering
- Updated TestimonialsSection to use TESTIMONIALS_LIST dynamically
- Updated TestimonialCarousel to use TESTIMONIALS_LIST with fallback
- Sections can now be reordered by editing sections.config.js
- Testimonials can be added/removed by editing testimonials.list.js

### Sprint 0: TestimonialCarousel CI-Farben + No Hardcoding (2026-03-04)
- Changed carousel dots to use Tailwind classes (brand-deep, brand-steel)
- Replaced hardcoded star color with text-amber-400
- CLAUDE.md updated: Added "No Hardcoding" principle
- All inline styles replaced with Tailwind classes (except dynamic values)

### TranscriptPage: Separated UI from Content (2026-03-04)
- Created `frontend/src/content/transcripts/episode52.de.js` with transcript data
- Moved UI strings to `frontend/src/content/plr-de.js` (transcriptPage export)
- Simplified TranscriptPage to be a renderer component only
- Component now imports content from content layer instead of hardcoded data
- Build test passed successfully
- Token gate functionality preserved
