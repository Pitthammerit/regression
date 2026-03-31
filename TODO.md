# TODO

Updated: 2026-03-31 19:52

---

## 🔴 PRIORITY 0 — Fix English Content Display

**Status:** URGENT — English content not showing on `/regression/en`

**ROOT CAUSE:** Menu stored in separate `menu.js` file, never migrated to `useContent()`!

**Files affected:**
- ❌ `frontend/src/content/menu.js` — Static German menu (NEEDS MIGRATION)
- ❌ `frontend/src/components/DesktopNav.jsx` — Static import, doesn't switch
- ❌ `frontend/src/components/SidecarMenu.jsx` — Static import, doesn't switch

**Fix required:**
1. Add `menu` export to `regression-de.js` (copy from menu.js)
2. Add `menu` export to `regression-en.js` (English translation)
3. Update `DesktopNav.jsx` to use `useContent()` hook
4. Update `SidecarMenu.jsx` to use `useContent()` hook
5. Delete `frontend/src/content/menu.js` (after migration)

**Debugging steps:**
1. Test menu switching on `/regression/en` → should show English labels
2. Test sections showing English placeholder content

---

## 🔴 PRIORITY 1 — Lock German Content

**Status:** Pending — After English display is fixed

**What this means:**
- Mark `regression-de.js` as "FINAL" — no more changes
- Document that German content is source of truth for translations
- Create backup/archive of final German version
- Any future content changes should update BOTH de and en files

**Why:** Prevents drift between German and English versions during translation work

---

## 🔴 PRIORITY 2 — Translate English Content

**Status:** Pending — After German is locked

**Source:** `frontend/src/content/regression-de.js` (716 lines)
**Target:** `frontend/src/content/regression-en.js` (471 lines - needs completion)

**Translation sections:**
1. ✅ **Hero** — Already translated (good English)
2. ✅ **Header** — Already translated
3. ⚠️ **Welcome** — Has "Placeholder:" prefix, needs real translation
4. ⚠️ **What Is** — Has "Placeholder:" prefixes
5. ⚠️ **Services** — Mixed (some German: "Seelenrückführung")
6. ⚠️ **All other sections** — Check for "Placeholder:" markers

**Translation approach:**
- Remove "Placeholder: Translate from German" prefixes
- Replace with actual English translations
- Keep structure exactly matching German version
- Test each section after translation

**Estimated effort:** 2-4 hours (depends on translation speed)

---

## 🟡 MEDIUM PRIORITY

### Reiki Site Real Content
**Status:** Future — Test structure in place, real content needed

---

### Scroll Snap Improvements (Lower Priority)
**Status:** Deferred until English content is done

---

## 🟢 LOW PRIORITY

### Podcast Site (Future)
**Status:** Can be added later following the same pattern as Reiki

---

### Resolve backend/ Folder Confusion
- [ ] Remove `backend/` folder OR
- [ ] Add clarifying note: "Not deployed. Frontend-only project"

---

## Quick Reference

| Document | Purpose | Priority |
|----------|---------|----------|
| `docs/plans/2026-04-01-multi-site-regression-reiki.md` | Multi-site plan (Phases 1-6 complete) | ✅ Done |
| `.serena/memories/multi-site-phases-5-6-complete.md` | Implementation status | Reference |

---

## Known Issues

1. **English content not displaying** — Sections empty on `/regression/en` (Priority 0)
2. **Scroll-snap on accordions** — Deferred (lower priority now)
3. **backend/ folder** — Misleading, no backend deployed

---

## Multi-Site Architecture Status

✅ **COMPLETE** (2026-04-01)

| Phase | Component | Status |
|-------|-----------|--------|
| 1 | Content Directory | ✅ Complete |
| 2 | Contexts | ✅ Complete |
| 3 | Sections Migration | ✅ Complete |
| 4 | Multi-Site Routing | ✅ Complete |
| 5 | Site Theming | ✅ Complete |
| 6 | English Content Placeholder | ✅ Complete (but not displaying) |

**URLs:**
- `/` → `/regression/de` (default)
- `/regression/en` → Should show English (currently broken)
- `/reiki/de` → Reiki site

---

**Last Updated:** 2026-04-01
**Next Session Steps:**
1. **URGENT:** Fix English content display issue
2. Lock German content as final
3. Translate English content from German source
