# TODO

Updated: 2026-04-04 14:40

---

## ✅ COMPLETE — Media Mutual Exclusion (2026-04-01)

All media players (video/audio) now coordinate — only one plays at a time.
Improved video controls: Rewind button (icon only, circular), scrubbing on hover, fullscreen handling.

**Features:**
- MediaContext coordinates all videos/audio for mutual exclusion
- CustomVideoPlayer & PodcastPlayer integrated
- Rewind button: Circular, icon only, positioned left of centered Play button
- Scrubbing bar: Visible only on hover (like other controls)
- YouTube fullscreen: Custom controls visible (no native YouTube controls)

See: `docs/plans/2026-04-01-media-mutual-exclusion-implementation.md`

---

## 🔴 ACTIVE DEBUGGING — Scrubbing Bar Visibility

**Status:** Testing red diagnostic bar (h-2, bg-red-500) to verify if element renders

**Issue:** Scrubbing bar not visible despite multiple attempts. Hypothesis: YouTube `controls=0` blocks video interaction.

**User Reports:**
- Scrubbing bar not visible on hover
- YouTube may block scrubbing when native controls are disabled

---

## 🟡 MEDIUM PRIORITY — Scroll Snap Implementation (Carried Over)

**Status:** Carried over from previous session — see `docs/plans/2026-04-01-scroll-container-wrapper-pattern.md`

Implement CSS scroll-snap with proximity + buffers for smooth section navigation.

---

## 🔴 PRIORITY 1 — Translate English Content

**Status:** Ready to start — Menu migration complete ✅

**Source:** `frontend/src/content/regression-de.js` (780 lines with menu)
**Target:** `frontend/src/content/regression-en.js` (533 lines with menu)

**Translation sections:**
1. ✅ **Menu** — Complete (English labels working)
2. ✅ **Hero** — Already translated (good English)
3. ✅ **Header** — Already translated
4. ⚠️ **Welcome** — Has "Placeholder:" prefix, needs real translation
5. ⚠️ **What Is** — Has "Placeholder:" prefixes
6. ⚠️ **Services** — Mixed (some German: "Seelenrückführung")
7. ⚠️ **All other sections** — Check for "Placeholder:" markers

**Translation approach:**
- Remove "Placeholder: Translate from German" prefixes
- Replace with actual English translations
- Keep structure exactly matching German version
- Test each section after translation

**Estimated effort:** 2-4 hours (depends on translation speed)

---

## 🔴 PRIORITY 2 — Lock German Content

**Status:** Pending — After English translation begins

**What this means:**
- Mark `regression-de.js` as "FINAL" — no more changes
- Document that German content is source of truth for translations
- Create backup/archive of final German version
- Any future content changes should update BOTH de and en files

**Why:** Prevents drift between German and English versions during translation work

---

## 🟡 MEDIUM PRIORITY

### Reiki Site Real Content
**Status:** Test structure in place, real content needed

**Current:** `frontend/src/content/reiki-de.js` has test content copied from Regression

**Needed:**
- Reiki-specific hero content
- Reiki services (energy work, healing modalities)
- Reiki-specific sections (chakra work, certification, etc.)
- Reiki testimonials and case studies

**Pattern:** Follow same structure as `regression-de.js`

---

### Podcast Site (Future)
**Status:** Can be added later following the same pattern as Reiki

**To add:**
1. Create `frontend/src/content/podcast-de.js`
2. Add `'podcast'` to `VALID_SITES` in SiteContext.jsx
3. Add `podcast: { de: podcastDe, en: null }` to CONTENT_MAP in index.js

---

### Scroll Snap Improvements (Lower Priority)
**Status:** Deferred until content translation is done

---

## 🟢 LOW PRIORITY

### Resolve backend/ Folder Confusion
- [ ] Remove `backend/` folder OR
- [ ] Add clarifying note: "Not deployed. Frontend-only project"

---

### Delete Obsolete menu.js
- [x] Delete `frontend/src/content/menu.js` (no longer needed, migrated to content layer)

---

## Quick Reference

| Document | Purpose | Priority |
|----------|---------|----------|
| `docs/plans/2026-04-01-multi-site-regression-reiki.md` | ✅ **COMPLETE** — Multi-site architecture | Done |
| `.serena/memories/multi-site-phases-5-6-complete.md` | Implementation status | Reference |

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
| 6 | English Content Placeholder | ✅ Complete |
| Bonus | Menu Migration | ✅ Complete |

**URLs:**
- `/` → `/regression/de` (default)
- `/regression/en` → English site (working!)
- `/reiki/de` → Reiki site (test content)

---

## Known Issues

1. **Scroll-snap on accordions** — Deferred (lower priority now)
2. **backend/ folder** — Misleading, no backend deployed

---

**Last Updated:** 2026-04-01
**Next Session Steps:**
1. Translate English content from German source (Priority 1)
2. Lock German content as final (Priority 2)
3. Add real Reiki content (replace test content)
