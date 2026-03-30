# TODO

Updated: 2026-03-30 13:03

---

## 🔴 HIGH PRIORITY — START HERE

### 🚀 Multi-Site + Tailwind v4 + Vite Migration
**Status:** READY TO EXECUTE
**Plan:** `docs/plans/2026-03-30-multi-site-tailwind-v4-migration.md`

**What this builds:**
- Migrate to Tailwind v4 + Vite (2-5x faster builds)
- Multi-site architecture (Regression, Reiki, Podcast)
- Multi-language foundation (German → English ready)
- Site-first URL routing (`/regression/de`, `/regression/en`, `/reiki/de`)
- Backend-ready for Supabase or Cloudflare D1

**Timeline:** 24-36 hours (6-8 weeks at part-time pace)

**Phases:**
1. **Phase 1:** Tailwind v4 + Vite Migration (8-12 hours)
2. **Phase 2:** Content Layer Refactoring (6-8 hours)
3. **Phase 3:** Multi-Site Routing (4-6 hours)
4. **Phase 4:** Multi-Language Foundation (4-6 hours)
5. **Phase 5:** Backend-Ready Architecture (2-4 hours)

**Quick Start:**
1. Read the full plan: `docs/plans/2026-03-30-multi-site-tailwind-v4-migration.md`
2. Create backup branch: `git checkout -b backup/pre-migration`
3. Execute Phase 1 (Vite + Tailwind v4)
4. Test and deploy
5. Continue with remaining phases

---

## 🟡 MEDIUM PRIORITY

### English Content Translation
**Status:** Pending — After multi-site foundation complete

**What needs translation:**
- `content/regression/de.js` → Create `content/regression/en.js`
- ~677 lines of German content
- Focus on key sections first (Hero, Services, Booking)

**Workflow:**
1. Multi-language foundation must be complete (Phase 4)
2. Create `content/regression/en.js` with English translations
3. Test language switching between `/regression/de` and `/regression/en`

---

### Reiki Site Content
**Status:** Future — After English translations complete

**What needs to be created:**
- `content/reiki/de.js` — Reiki site content (German)
- Reiki-specific branding colors (update `tailwind.config.css`)
- Unique sections or variations from Regression site

---

### Podcast Site Content
**Status:** Future — After Reiki site complete

**What needs to be created:**
- `content/podcast/de.js` — Podcast site content (German)
- Podcast-specific branding colors
- Audio player integration

---

## 🟢 LOW PRIORITY

### Backend Integration (Future)
**Status:** Documented, not scheduled

**Options documented in plan:**
- Supabase (PostgreSQL database, auth, storage)
- Cloudflare D1 + Workers (SQLite at edge)

**Potential features:**
- User authentication
- Dynamic content management
- Form submissions
- Session management

**Reference:** `docs/backend-integration-plan.md` (created during migration)

---

### Resolve backend/ Folder Confusion
- [ ] Remove `backend/` folder OR
- [ ] Add clarifying note: "Not deployed. Frontend-only project"

---

### Add SPA Fallback for Deep Links
- [ ] Create `frontend/public/_redirects` with: `/*    /index.html   200`

---

## Known Issues

1. **No English content yet** — All content in `regression/de.js`, English not implemented
2. **backend/ folder** — Misleading, no backend deployed
3. **No catch-all route** — Invalid URLs may render blank

---

## Quick Reference

| Document | Purpose |
|----------|---------|
| `docs/plans/2026-03-30-multi-site-tailwind-v4-migration.md` | **MAIN PLAN** — Read this first! |
| `docs/ESM_MIGRATION_SUMMARY.md` | ESM/Vite migration analysis (already incorporated into main plan) |
| `docs/ESM_MIGRATION_CHECKLIST.md` | Vite migration quick reference |
| `docs/TAILWIND_V4_ASSESSMENT_SUMMARY.md` | Tailwind v4 stable vs alpha comparison |

---

## Archive

Previous documentation has been moved to `docs/archived/`:
- Architectural review docs (i18n, multi-site analysis)
- Critical bugs fix plan (referenced Copy sections that no longer exist)
- Section migration plans (typography refactoring complete)
- Tailwind v4 alpha assessments (superseded by stable release)

---

**Last Updated:** 2026-03-30
**Next Session:** Start with `docs/plans/2026-03-30-multi-site-tailwind-v4-migration.md`
