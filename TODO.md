# TODO

Updated: 2026-03-31 06:40

---

## 🔴 PRIORITY 1 — Composite Typography Utilities

**Status:** READY TO REVIEW & EXECUTE
**Plan:** `docs/plans/2026-03-31-composite-typography-utilities.md`

**What this builds:**
- Combined typography utilities (`typography-h2`, `typography-body`, etc.)
- Single class replaces 4-5 classes (font, size, weight, line-height, color, spacing)
- Consistent typography across ALL components
- Easier maintenance (change once in CSS, not 50+ JSX files)

**Components to update (11 tasks):**
1. tailwind.config.css — Add all composite utilities
2. FAQSection — Fix h2/h4 font inconsistency
3. HeroV3Section
4. All 17 sections (Welcome, ForWhom, Services, etc.)
5. UI Components (SectionLabel, TopicCard, etc.)
6. NotFound.jsx (404 page)
7. Header.jsx
8. Footer.jsx

**Timeline:** 4-6 hours with `/multiloop` execution

**Quick Start:**
1. Review plan: `docs/plans/2026-03-31-composite-typography-utilities.md`
2. Improve if needed (add missing utilities, adjust patterns)
3. Execute with `/multiloop`
4. Code review after each component
5. Deploy and test

**Execution method:** `/multiloop` (subagent-driven with LOOP BACK)

---

## 🔴 PRIORITY 2 — Multi-Site + Tailwind v4 + Vite Migration

**Status:** START AFTER PRIORITY 1 COMPLETE
**Plan:** `docs/plans/2026-03-30-multi-site-tailwind-v4-migration.md`
**Prerequisite:** Composite typography utilities complete

**Why this order:**
- Composite utilities simplifies code BEFORE major migration
- Cleaner codebase = easier multi-site refactoring
- Migration is mostly complete (Tailwind v4 stable release)
- Ready for multi-site and language expansion

**What this builds:**
- Tailwind v4 migration complete (mostly done)
- Multi-site architecture (Regression, Reiki, Podcast)
- Multi-language foundation (German → English ready)
- Site-first URL routing (`/regression/de`, `/regression/en`, `/reiki/de`)
- Backend-ready for Supabase or Cloudflare D1

**Timeline:** 24-36 hours (6-8 weeks at part-time pace)

---

## 🟡 MEDIUM PRIORITY

### English Content Translation
**Status:** Pending — After PRIORITY 1 & 2 complete

**What needs translation:**
- `content/regression/de.js` → Create `content/regression/en.js`
- ~677 lines of German content
- Focus on key sections first (Hero, Services, Booking)

---

### Reiki Site Content
**Status:** Future — After English translations complete

---

### Podcast Site Content
**Status:** Future — After Reiki site complete

---

## 🟢 LOW PRIORITY

### Backend Integration (Future)
**Status:** Documented, not scheduled

---

### Resolve backend/ Folder Confusion
- [ ] Remove `backend/` folder OR
- [ ] Add clarifying note: "Not deployed. Frontend-only project"

---

### Add SPA Fallback for Deep Links
- [ ] Create `frontend/public/_redirects` with: `/*    /index.html   200`

---

## Quick Reference

| Document | Purpose | Priority |
|----------|---------|----------|
| `docs/plans/2026-03-31-composite-typography-utilities.md` | **START HERE** — Composite utilities | 🔴 1 |
| `docs/plans/2026-03-30-multi-site-tailwind-v4-migration.md` | Multi-site + v4 migration | 🔴 2 |
| `docs/ESM_MIGRATION_SUMMARY.md` | ESM/Vite migration analysis | Reference |
| `docs/TAILWIND_V4_ASSESSMENT_SUMMARY.md` | Tailwind v4 comparison | Reference |

---

## Known Issues

1. **No English content yet** — All content in `regression/de.js`, English not implemented
2. **backend/ folder** — Misleading, no backend deployed
3. **No catch-all route** — Invalid URLs may render blank

---

## Archive

Previous documentation has been moved to `docs/archived/`:
- Architectural review docs (i18n, multi-site analysis)
- Critical bugs fix plan (referenced Copy sections that no longer exist)
- Section migration plans (typography refactoring complete)
- Tailwind v4 alpha assessments (superseded by stable release)

---

**Last Updated:** 2026-03-31
**Next Session Steps:**
1. Review `docs/plans/2026-03-31-composite-typography-utilities.md`
2. Improve if needed
3. Execute with `/multiloop`
4. After completion → Continue with `docs/plans/2026-03-30-multi-site-tailwind-v4-migration.md`
