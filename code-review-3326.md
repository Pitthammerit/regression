
## Code review notes (what must be improved)

### Footer is not language-ready (hardcoded German + wrong data flow)
Problem:
- `frontend/src/components/Footer.jsx` contains hardcoded German strings
  (examples: “Kontaktiere uns”, “Rechtliches”, disclaimer lines).
- It also imports DE content directly instead of receiving all content via props/context.

Required improvement:
- Move all footer strings into the content layer.
- Footer must not import `plr-de.js` directly.
- Footer should receive `footer` data through props or a content provider.

### TranscriptPage mixes UI + huge content + German strings
Problem:
- `frontend/src/pages/TranscriptPage.jsx` contains lots of hardcoded German UI labels
  and transcript data in the same file.
- This blocks English support and makes maintenance painful.

Required improvement:
- Extract transcript data into a content file:
  - `frontend/src/content/transcripts/<episode>.de.js` (or JSON)
- Extract all UI strings into a language dictionary/content object.
- Keep TranscriptPage as a renderer only.

### Content system exists, but only German is implemented
Current:
- `frontend/src/content/plr-de.js` exists.
- English version does not exist.

Required improvement (minimal, no i18n library needed):
- Create:
  - `frontend/src/content/plr-en.js`
- Create:
  - `frontend/src/content/index.js` exporting `getContent(lang)`
- Add a content provider:
  - `useContent()` returns the right content based on `/en` prefix or `?lang=en`
- Remove direct imports of `plr-de.js` from components/sections.
  They must pull from `useContent()` instead.

### Too many unused section variants create clutter
Problem:
- `frontend/src/components/sections/` contains multiple hero variants and alternatives.
- Only one is used in production.

Required improvement:
- Keep only the chosen production components in `sections/`.
- Move experiments into:
  - `frontend/src/experiments/`
  or delete them.
This reduces confusion for future edits and for Claude Code.

### “Backend” folder is misleading

Required improvement:
- If no backend is planned:
  - remove `backend/` to avoid confusion.
- If backend might exist later:
  - keep it but add a clear note:
    “Not deployed. Frontend-only project right now.”