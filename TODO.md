# TODO

Updated: 2026-03-04

## Sprint 0: Quick Fix (CURRENT)

### Phase 5: TestimonialCarousel CI-Farben
- [x] Change active color from `#9B7461` to `#2D3F4E` (brand-deep)
- [x] Change inactive color from `#E8D5C4` to `#D1C5B0` (brand-steel)
- [ ] Build & verify
- [ ] Commit & deploy

## Sprint 1: Self-Service Foundation

### Phase 1: Config-Based Section System
- Create `frontend/src/config/sections.config.js` with SECTIONS_ORDER array
- Update `App.js` to use dynamic section rendering from config
- Enable section reordering by changing array order in config file

### Phase 1.5: Dynamic Testimonials System
- Create `frontend/src/content/testimonials.list.js`
- Move testimonials to separate list with automatic numbering (0, 1, 2, 3...)
- Update TestimonialsSection and TestimonialCarousel to import from list
- Add/remove testimonials by editing the list array

## Medium Priority

### Implement Minimal i18n System
- Create `frontend/src/content/plr-en.js`
- Create `frontend/src/content/index.js` with `getContent(lang)` export
- Add `useContent()` hook
- Update components to use `useContent()` instead of direct imports

### Fix Missing Catch-All Route
- Add `path="*"` route in `frontend/src/App.js` to show NotFound component
- Currently, invalid URLs render blank

### Footer: Extract Hardcoded Strings
- File: `frontend/src/components/Footer.jsx`
- Move all German strings to content layer
- Remove direct import of `plr-de.js`
- Footer should receive data via props or context

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

### Sprint 0: TestimonialCarousel CI-Farben (2026-03-04)
- Changed active dot color from `#9B7461` to `#2D3F4E` (brand-deep)
- Changed inactive dot color from `#E8D5C4` to `#D1C5B0` (brand-steel)

### TranscriptPage: Separated UI from Content (2026-03-04)
- Created `frontend/src/content/transcripts/episode52.de.js` with transcript data
- Moved UI strings to `frontend/src/content/plr-de.js` (transcriptPage export)
- Simplified TranscriptPage to be a renderer component only
- Component now imports content from content layer instead of hardcoded data
- Build test passed successfully
- Token gate functionality preserved
