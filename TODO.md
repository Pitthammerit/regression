# TODO

Updated: 2026-03-04

## High Priority

**None** ✅

## Medium Priority

### TestimonialCarousel from Journey Within Retreats
- ✅ Created TestimonialCarousel component
- ✅ Added to App.js below existing TestimonialsSection (for comparison)
- ✅ Integrated with Cloudflare Image Resizing
- ⏳ Later: Replace current TestimonialsSection with new carousel
- ⏳ Later: Import actual testimonials data from Journey Within Retreats

### Extract Accordion Component
- Files: `WhatIsSection.jsx`, `CaseStudiesSection.jsx`, `BookingSection.jsx`
- Create `frontend/src/components/ui/Accordion.jsx`
- Support both controlled and uncontrolled modes

### Implement Minimal i18n System
- Create `frontend/src/content/plr-en.js`
- Create `frontend/src/content/index.js` with `getContent(lang)` export
- Add `useContent()` hook
- Update components to use `useContent()` instead of direct imports

## Low Priority

### Add SPA Fallback for Deep Links
- Create `frontend/public/_redirects` with: `/*    /index.html   200`
- Enables deep links like `/transkript` to work on refresh
- Currently intentionally disabled (add if needed)

### Fix Podcast Thumbnail Filename
- Current: `spotify-bergesund.jpeg.webp.png.webp`
- Rename to: `spotify-bergesund.webp`
- Update reference in `frontend/src/content/plr-de.js`

---

## Notes

### backend/ Folder
**Status:** KEEP — needed for future features:
- Email token links for transcript access
- Potential testimonial imports from Journey Within Retreats
- Other server-side functionality

### Journey Within Retreats Integration
- TestimonialCarousel component added for comparison
- Uses Cloudflare Image Resizing for journeywithinretreats.com images
- Data structure compatible with Journey Within Retreats testimonials
- Can be imported from their GitHub repo in the future

---

## Completed ✅

### Phase 1: Code Organization (2026-03-04)
- ✅ Moved unused hero variants to `frontend/src/components/experiments/`
- ✅ Created README.md in experiments/ folder
- ✅ Updated CLAUDE.md with Subagent Loop Pattern

### Phase 2: VimeoGlassEmbed Component (2026-03-04)
- ✅ Extracted duplicated VimeoGlassEmbed to `frontend/src/components/ui/VimeoGlassEmbed.jsx`
- ✅ Updated HeroSection, HeroAlt1, HeroV2Section to use shared component

### Phase 3: LazyImage Implementation (2026-03-04)
- ✅ Replaced all direct `<img>` tags with `LazyImage` component
- ✅ Footer Logo
- ✅ WelcomeSection Signature
- ✅ Testimonials (4 client portraits)
- ✅ CaseStudies (2 client photos)

### Phase 4: 404 NotFound Route (2026-03-04)
- ✅ Created `frontend/src/components/NotFound.jsx`
- ✅ Added catch-all route `path="*"` to App.js

### Phase 5: Content Layer Fixes (2026-03-04)
- ✅ Footer: Moved all hardcoded German strings to `plr-de.js`
- ✅ TranscriptPage: Separated UI from content, moved data to `transcripts/episode52.de.js`
- ✅ ServicesSection: Now uses content layer instead of inline array

### Phase 6: Performance Fixes (2026-03-04)
- ✅ Header: Added `{ passive: true }` to scroll listener
- ✅ CaseStudiesSection: Added try-catch for localStorage access

### Phase 7: Cloudflare Image Resizing (2026-03-04)
- ✅ Enhanced LazyImage with automatic Cloudflare Image Resizing
- ✅ Added responsive srcset generation
- ✅ Implemented width presets (avatar, thumbnail, card, full)
- ✅ All R2 images now optimized on-the-fly
