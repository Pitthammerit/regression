# TODO

Updated: 2026-03-31 12:44

---

## 🔴 PRIORITY 1 — Multi-Site + Multi-Language Architecture

**Status:** READY TO EXECUTE
**Plan:** `docs/plans/2026-03-31-multi-site-multilang-architecture.md` (consolidated from old plan)

**What this builds:**
- Multi-site architecture (Regression + Reiki first)
- Multi-language foundation (German → English)
- Content abstraction layer with content files in flat structure
- Site-first URL routing (`/regression/de`, `/regression/en`, `/reiki/de`)
- Language switcher in Header

**Foundation already complete:**
- ✅ Vite 5.0 + Tailwind v4 running
- ✅ Design tokens in @theme directive
- ✅ 27 composite utilities working
- ✅ 13 on-dark utilities working

**Phases:**
1. Content directory restructuring (30 min) — `regression-de.js`, `reiki-de.js`
2. Site & Content Contexts (2 hours) — React contexts for site/lang state
3. Update sections (3-4 hours) — All 21 sections use `useContent()`
4. Multi-site routing (2 hours) — Site-first URLs with language switcher
5. Site-specific theming (1 hour) — Prepare for site-specific colors
6. English content placeholder (30 min)
7. Backend documentation (30 min)

**Timeline:** 8-10 hours total (2-3 weeks at part-time pace)

**Quick Start:**
1. Review the consolidated plan
2. Start with Phase 1 (Content directory)
3. Use `/multiloop` for Phases 2-4
4. Deploy and test after each phase

---

## 🟡 MEDIUM PRIORITY

### English Content Translation
**Status:** Pending — After multi-site architecture complete

**What needs translation:**
- `regression-de.js` → `regression-en.js`
- ~677 lines of German content
- Focus on key sections first (Hero, Services, Booking)

---

### Reiki Site Real Content
**Status:** Future — Test structure in place, real content needed

---

## 🟢 LOW PRIORITY

### Podcast Site (Future)
**Status:** Can be added later following the same pattern as Reiki

---

### Backend Integration (Future)
**Status:** Documented in Phase 7, not scheduled

---

### Resolve backend/ Folder Confusion
- [ ] Remove `backend/` folder OR
- [ ] Add clarifying note: "Not deployed. Frontend-only project"

---

## Quick Reference

| Document | Purpose | Priority |
|----------|---------|----------|
| `docs/plans/2026-03-31-multi-site-multilang-architecture.md` | **START HERE** — Multi-site implementation | 🔴 1 |
| `docs/plans/2026-03-30-multi-site-tailwind-v4-migration.md` | Old migration plan (archived) | Reference |
| `memory/MEMORY.md` | Project memory and quick links | Reference |

---

## Known Issues

1. **No English content yet** — German only, English structure in place
2. **backend/ folder** — Misleading, no backend deployed
3. **No catch-all route** — Invalid URLs may render blank

---

## Archive

Previous documentation has been moved to `docs/archived/`:
- Architectural review docs (i18n, multi-site analysis)
- Tailwind v4 migration plan (superseded by consolidated plan)

---

**Last Updated:** 2026-03-31
**Next Session Steps:**
1. Review consolidated multi-site plan
2. Execute Phase 1 (Content directory restructuring)
3. Use `/multiloop` for Phases 2-4
