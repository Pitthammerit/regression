# Plan: Robuster TODO Auto-Sync Workflow (Hybrid + DRY)

**Datum:** 2026-03-06
**Status:** Basierend auf 4 Subagent-Analysen

---

## Executive Summary

**Empfehlung:** Hybrid Approach mit DRY-Refactoring

1. **Primary:** GitHub Actions (bleibt — DRY Score: 10/10, Robustness: 8/10)
2. **Optional:** Husky v9 pre-commit hook für lokale Developer Experience
3. **Refactoring:** `todo-utils.js` erstellen um Code-Duplizierung zu eliminieren

---

## Problemstellung (aus Agent-Analysen)

### Aktuelle Issues

1. **Code Duplizierung** (Agent 4):
   - `extractKeywords()` in beiden Scripts dupliziert
   - `calculateSimilarity()` dupliziert
   - `updateTimestamp()` dupliziert
   - `TODO_PATH` hardcoded in beiden Files

2. **Edge Cases** (Agent 2):
   - Infinite loop risk bei `git commit --amend`
   - Merge conflicts in TODO.md
   - Concurrent commits → last writer wins
   - Script failures → partial writes

3. **Workflow** (Agent 3):
   - GitHub Actions nur async (1-2 Min Verzögerung)
   - Kein lokales Feedback vor Push
   - Team-Konsistenz aber keine Developer Experience

---

## Lösung: Hybrid + DRY Refactoring

### Architektur

``┌─────────────────────────────────────────────────────────────┐
│                    HYBRID WORKFLOW                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Local Developer          GitHub CI/CD                       │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │ pre-commit   │         │  push event  │                 │
│  │ (optional)   │         │              │                 │
│  └──────┬───────┘         └──────┬───────┘                 │
│         │                        │                          │
│         ▼                        ▼                          │
│  ┌─────────────────────────────────────────┐                │
│  │         Shared Scripts                  │                │
│  │  ┌─────────────────────────────────┐   │                │
│  │  │      todo-utils.js (NEW)        │   │                │
│  │  │  - extractKeywords()            │   │                │
│  │  │  - calculateSimilarity()        │   │                │
│  │  │  - updateTimestamp()            │   │                │
│  │  │  - read/writeTodoFile()         │   │                │
│  │  └─────────────────────────────────┘   │                │
│  │                                        │                │
│  │  ┌──────────────┐  ┌──────────────┐    │                │
│  │  │update-todo.js│  │  add-todo.js│    │                │
│  │  └──────┬───────┘  └──────┬───────┘    │                │
│  └─────────┼─────────────────┼────────────┘                │
│            │                 │                             │
│            ▼                 ▼                             │
│      ┌──────────┐      ┌──────────┐                         │
│      │ TODO.md  │      │ TODO.md  │                         │
│      └──────────┘      └──────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 1: DRY Refactoring (Critical First Step)

### Schritt 1.1: todo-utils.js erstellen

**Datei:** `scripts/todo-utils.js` (neu)

```javascript
const fs = require('fs');
const path = require('path');

// ============================================================================
// CONSTANTS
// ============================================================================

const TODO_PATH = path.join(process.cwd(), 'TODO.md');
const TASK_REGEX = /^[\s]*-\s\[([ x])\]\s+(.+)$/;
const SECTION_HEADERS = {
  high: '## 🔴 High Priority',
  medium: '## 🟡 Medium Priority',
  low: '## 🟢 Low Priority'
};

// ============================================================================
// FILE OPERATIONS (with atomic writes)
// ============================================================================

function readTodoFile() {
  if (!fs.existsSync(TODO_PATH)) {
    throw new Error('TODO.md not found');
  }
  return fs.readFileSync(TODO_PATH, 'utf-8');
}

function writeTodoFile(content) {
  // Atomic write pattern: temp file + mv
  const tmpPath = `${TODO_PATH}.tmp`;
  fs.writeFileSync(tmpPath, content, 'utf-8');
  fs.renameSync(tmpPath, TODO_PATH);
}

// ============================================================================
// TEXT PROCESSING
// ============================================================================

function extractKeywords(text) {
  const clean = text
    .replace(/[\*\[\]\(\)\{\}]/g, ' ')
    .replace(/https?:\/\/[^\s]+/g, '')
    .toLowerCase();
  const words = clean.match(/\b[a-z]{3,}\b/gi) || [];
  return [...new Set(words)];
}

function calculateSimilarity(str1, str2) {
  const keywords1 = extractKeywords(str1);
  const keywords2 = extractKeywords(str2);

  if (keywords1.length === 0 || keywords2.length === 0) return 0;

  const intersection = keywords1.filter(k => keywords2.includes(k));
  const union = [...new Set([...keywords1, ...keywords2])];

  return intersection.length / union.length;
}

function updateTimestamp(content) {
  const now = new Date();
  const updated = now.toISOString().replace('T', ' ').substring(0, 16);
  return content.replace(/Updated: \d{4}-\d{2}-\d{2}.*/, `Updated: ${updated}`);
}

// ============================================================================
// TASK PROCESSING
// ============================================================================

function parseTasks(content) {
  const lines = content.split('\n');
  const tasks = [];

  for (const line of lines) {
    const match = line.match(TASK_REGEX);
    if (match) {
      tasks.push({
        line,
        status: match[1], // ' ' or 'x'
        text: match[2]
      });
    }
  }

  return tasks;
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

function handleError(error, message) {
  console.error(`❌ ${message}:`, error.message);
  process.exit(1);
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  // Constants
  TODO_PATH,
  TASK_REGEX,
  SECTION_HEADERS,

  // File operations
  readTodoFile,
  writeTodoFile,

  // Text processing
  extractKeywords,
  calculateSimilarity,
  updateTimestamp,

  // Task processing
  parseTasks,

  // Error handling
  handleError
};
```

### Schritt 1.2: update-todo.js refaktorieren

**Änderungen:** `scripts/update-todo.js`

- Entferne: Duplicate `extractKeywords()`, `calculateSimilarity()`, `updateTimestamp()`
- Ersetze: `const todoUtils = require('./todo-utils');`
- Nutze: `todoUtils.readTodoFile()`, `todoUtils.writeTodoFile()`, etc.

### Schritt 1.3: add-todo.js refaktorieren

**Änderungen:** `scripts/add-todo.js`

- Gleiche Pattern wie update-todo.js
- Nutze `todoUtils` für alle shared operations

---

## Phase 2: Husky v9 Pre-Commit Hook (Optional)

### Warum Pre-Commit statt Post-Commit?

| Kriterium | Pre-Commit | Post-Commit |
|-----------|------------|-------------|
| Infinite Loop Risk | ✅ Kein Risk | ❌ Amend re-trigger |
| Feedback | ✅ Vor Commit | ❌ Nach Commit |
| Bypass möglich | ✅ --no-verify | ❌ Nur mit --no-verify |
| Best Practice | ✅ Industriestandard | ❌ Seltener genutzt |

### Schritt 2.1: Husky installieren

```bash
# In frontend/ directory
npm install --save-dev husky
npx husky init
```

**Ergebnis in `frontend/package.json`:**
```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "devDependencies": {
    "husky": "^9.0.0"
  }
}
```

### Schritt 2.2: Pre-Commit Hook erstellen

**Datei:** `.husky/pre-commit` (neu)

```bash
#!/bin/sh
. "$(dirname -- "$0")/_/husky.sh"

# ============================================================================
# EDGE CASE: Skip in CI/CD
# ============================================================================
if [ -n "$CI" ]; then
  exit 0
fi

# ============================================================================
# EDGE CASE: Skip during amend (prevent infinite loop)
# ============================================================================
if [ "$GIT_REFLOG_ACTION" = "amend" ]; then
  exit 0
fi

# ============================================================================
# EDGE CASE: Skip during rebase
# ============================================================================
if [ -n "$GIT_REBASE" ]; then
  exit 0
fi

# ============================================================================
# TODO AUTO-SYNC
# ============================================================================
cd "$(git rev-parse --show-toplevel)"

echo "🔄 Checking TODO.md..."

# Run update script (with error handling)
if node scripts/update-todo.js; then
  # Exit code 0 = no changes needed
  exit 0
else
  # Exit code 1 = TODO.md was updated
  echo "✅ TODO.md updated, staging..."

  # Stage updated TODO.md
  git add TODO.md

  # Continue with commit (TODO.md is now part of it)
  exit 0
fi
```

**Wichtig:**
- `--no-verify` in Hook nicht nutzen (user kann manually bypassen)
- Exit 0 nach `git add` → TODO.md wird Teil des Commits
- Kein zweiter Commit nötig (anders als post-commit)

### Schritt 2.3: Skip Flag für Entwickler

**Usage:**
```bash
# Ohne TODO sync
git commit --no-verify -m "WIP: experimental change"

# Mit Umgebungsvariable
SKIP_TODO_SYNC=1 git commit -m "WIP: experimental change"
```

---

## Phase 3: GitHub Action Optimieren (Fallback)

**Datei:** `.github/workflows/update-todo.yml`

**Änderung:** Erkennen wenn TODO.md bereits durch pre-commit hook aktualisiert wurde.

```yaml
- name: Check TODO update status
  id: check-todo
  run: |
    # Check if TODO.md changed in last commit (pre-commit already ran)
    if git diff HEAD~1 HEAD --name-only | grep -q "TODO.md"; then
      echo "already_updated=true" >> $GITHUB_OUTPUT
      echo "ℹ️  TODO.md already updated by pre-commit hook"
    else
      # Fallback: run update script
      node scripts/update-todo.js
      if git diff --name-only | grep -q "TODO.md"; then
        echo "needs_update=true" >> $GITHUB_OUTPUT
      fi
    fi

- name: Commit updated TODO.md
  if: steps.check-todo.outputs.needs_update == 'true'
  run: |
    git config user.name "github-actions[bot]"
    git config user.email "github-actions[bot]@users.noreply.github.com"
    git add TODO.md
    git commit -m "chore: sync TODO.md [skip ci]"
    git push
```

**Logik:**
- Pre-commit bereits gelaufen? → Nichts tun
- Pre-commit nicht gelaufen? (Developer hat kein Husky) → Fallback läuft

---

## Phase 4: Edge Case Handling

### 4.1: Infinite Loop Prevention

**Problem:** `git commit --amend` → Hook läuft erneut → Infinite loop

**Lösung:** Prüfe `GIT_REFLOG_ACTION` in Hook

```bash
if [ "$GIT_REFLOG_ACTION" = "amend" ]; then
  exit 0
fi
```

### 4.2: Merge Conflicts in TODO.md

**Problem:** Zwei Developers ändern gleiche Task → Konflikt

**Lösung:** Atomic writes + Backup vor Update

```javascript
// In todo-utils.js writeTodoFile()
function writeTodoFile(content) {
  // Backup
  if (fs.existsSync(TODO_PATH)) {
    fs.copyFileSync(TODO_PATH, `${TODO_PATH}.backup`);
  }

  // Atomic write
  const tmpPath = `${TODO_PATH}.tmp`;
  fs.writeFileSync(tmpPath, content, 'utf-8');
  fs.renameSync(tmpPath, TODO_PATH);
}
```

### 4.3: Concurrent Commits

**Problem:** Developer A und B committen gleichzeitig → Last writer wins

**Lösung:** Akzeptieren (Git löst durch merge conflict)

**Best Practice:** `git pull` vor Committen wenn TODO.md geändert wurde

### 4.4: Script Failures

**Problem:** Script crashed mid-write → Korrupte TODO.md

**Lösung:** Atomic write pattern (siehe 4.2)

---

## Phase 5: Watcher Mode (Full-Auto Local Sync)

**Anforderung:** TODO.md aktualisiert sich automatisch bei Datei-Änderungen in `frontend/src/` und `frontend/config/`.

### Schritt 5.1: Watcher Script erstellen

**Datei:** `scripts/watch-todo.js` (neu)

```javascript
#!/usr/bin/env node
/**
 * watch-todo.js
 *
 * Watcher Mode: TODO.md aktualisiert sich automatisch bei Datei-Änderungen
 * - Überwacht frontend/src/ und frontend/config/
 * - Runnt update-todo.js bei Änderungen
 * - Kann mit npm run todo:watch gestartet/gestoppt werden
 */

const chokidar = require('chokidar');
const { spawn } = require('child_process');
const path = require('path');

// Paths to watch
const WATCH_PATHS = [
  path.join(process.cwd(), 'frontend/src/**'),
  path.join(process.cwd(), 'frontend/config/**'),
  path.join(process.cwd(), 'CLAUDE.md'),
  path.join(process.cwd(), 'scripts/**')
];

// Debounce: Wait 500ms after last change before running update
let updateTimeout = null;
let isRunning = false;

console.log('👀 Watcher Mode gestartet...');
console.log('📁 Überwachte Pfade:');
WATCH_PATHS.forEach(p => console.log(`   - ${p}`));
console.log('⏹️  Stop mit Ctrl+C\n');

const runUpdate = () => {
  if (isRunning) {
    console.log('⏳ Update läuft bereits, skip...');
    return;
  }

  isRunning = true;
  console.log('\n🔄 Änderung erkannt, aktualisiere TODO.md...');

  const update = spawn('node', ['scripts/update-todo.js'], {
    stdio: 'inherit',
    shell: true
  });

  update.on('close', (code) => {
    isRunning = false;
    if (code === 0) {
      console.log('ℹ️  Keine Änderungen nötig\n');
    } else if (code === 1) {
      console.log('✅ TODO.md aktualisiert\n');
      // Optional: Git staging für User
      console.log('💡 Tipp: git add TODO.md um Änderungen zu committen\n');
    }
  });
};

// Watcher starten
const watcher = chokidar.watch(WATCH_PATHS, {
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 200,
    pollInterval: 100
  }
});

watcher
  .on('add', () => {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(runUpdate, 500);
  })
  .on('change', () => {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(runUpdate, 500);
  })
  .on('error', error => console.error(`❌ Watcher error: ${error}`))
  .on('ready', () => console.log('✅ Watcher bereit\n'));

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏹️  Watcher wird gestoppt...');
  watcher.close();
  process.exit(0);
});
```

### Schritt 5.2: package.json Scripts erweitern

**Datei:** `frontend/package.json`

```json
{
  "scripts": {
    "update-todo": "node ../scripts/update-todo.js",
    "add-todo": "node ../scripts/add-todo.js",
    "todo:watch": "node ../scripts/watch-todo.js",
    "todo:sync": "git add -A && git commit -m \"chore: manual sync\" && npm run update-todo && git add TODO.md && git commit --amend --no-edit"
  },
  "devDependencies": {
    "chokidar": "^4.0.0"
  }
}
```

**Usage:**
```bash
# Watcher starten (läuft bis Ctrl+C)
npm run todo:watch

# Manuelles Update (ohne Watcher)
npm run update-todo

# Neuer Task hinzufügen
npm run add-todo "New task" high
```

### Schritt 5.3: Watcher Workflow

**Development Workflow:**
1. Terminal 1: `npm run todo:watch` startet Watcher
2. Terminal 2: `npm run dev` startet Dev Server
3. Developer ändert Dateien in `frontend/src/`
4. Watcher erkennt Änderung → `update-todo.js` läuft automatisch
5. TODO.md wird aktualisiert (falls Tasks erledigt)
6. Developer committet inkl. aktualisiertem TODO.md

**Vorteile:**
- ✅ Vollautomatisch — kein manuelles npm run update-todo nötig
- ✅ Sofortiges Feedback — TODO.md ist immer aktuell
- ✅ Keine Git Hooks nötig für lokale Entwicklung
- ✅ Funktioniert auch ohne Git Commits

**Nachteile:**
- ❌ Zweites Terminal nötig (Watcher + Dev Server)
- ❌ Chokidar dependency (~2MB)

### Schritt 5.4: Alternative ohne Watcher (Optional)

Wenn Watcher zu heavyweight ist, kann Git Hook als Alternative genutzt werden (siehe Phase 2).

---

## DRY Compliance Check

### Vor Refactoring

| Function | Dupliziert in | Lines |
|----------|---------------|-------|
| `extractKeywords()` | update-todo.js, add-todo.js | 12 |
| `calculateSimilarity()` | update-todo.js, add-todo.js | 14 |
| `updateTimestamp()` | update-todo.js, add-todo.js | 6 |
| `TODO_PATH` | update-todo.js, add-todo.js | 1 |
| **Total** | | **33 duplizierte Lines** |

### Nach Refactoring

| Function | Location | Lines |
|----------|----------|-------|
| All functions | todo-utils.js | ~80 |
| update-todo.js | Uses utils | ~30 (-20) |
| add-todo.js | Uses utils | ~50 (-30) |
| **Total** | | **-50 Lines netto** |

---

## Verification Plan

### Test 1: DRY Refactoring
1. `todo-utils.js` erstellen
2. `update-todo.js` refaktorieren
3. `add-todo.js` refaktorieren
4. `npm run update-todo` → Funktioniert wie vorher ✅
5. `npm run add-todo "Test task"` → Funktioniert wie vorher ✅

### Test 2: Watcher Mode (Phase 5)
1. `npm run todo:watch` starten
2. Datei in `frontend/src/` ändern
3. Watcher erkennt Änderung (500ms debounce) ✅
4. TODO.md wird automatisch aktualisiert ✅
5. Watcher bleibt aktiv für nächste Änderung ✅
6. `Ctrl+C` stoppt Watcher sauber ✅

### Test 3: Pre-Commit Hook (Phase 2)
1. Ändere Datei in `frontend/src/`
2. `git commit -m "feat: test"`
3. Hook läuft automatisch ✅
4. TODO.md wird updated (falls Tasks erledigt) ✅
5. Commit enthält TODO.md Änderung ✅

### Test 4: Amend Szenario
1. `git commit --amend --no-edit`
2. Hook wird übersprungen (kein infinite loop) ✅
3. Nur ein Commit im Log ✅

### Test 5: GitHub Action Fallback
1. Watcher nicht gestartet (Developer ohne Watcher)
2. Push zu GitHub
3. GitHub Action erkennt fehlende TODO.md Änderung ✅
4. GitHub Action updated TODO.md ✅

### Test 6: Merge Conflict
1. Zwei Developer-Zweige erstellen
2. Beide ändern TODO.md
3. Merge → Konflikt wird erkannt ✅
4. Manuelles Resolve funktioniert ✅

---

## Rollback Plan

Wenn Probleme auftreten:

```bash
# Husky deinstallieren
npm uninstall husky
rm -rf .husky

# TODO.md wiederherstellen
cp TODO.md.backup TODO.md

# Refactoring rückgängig
git revert <commit-hash>
```

---

## Critical Files

1. **Neu:** `scripts/todo-utils.js` — Shared utilities (DRY)
2. **Ändern:** `scripts/update-todo.js` — Uses todo-utils (-20 lines)
3. **Ändern:** `scripts/add-todo.js` — Uses todo-utils (-30 lines)
4. **Neu:** `scripts/watch-todo.js` — Watcher Mode (Full-auto)
5. **Neu:** `.husky/pre-commit` — Optional Git Hook
6. **Ändern:** `frontend/package.json` — Husky + chokidar dependencies
7. **Optimieren:** `.github/workflows/update-todo.yml` — Fallback logic

---

## Dependencies

**Neue Dependencies:**
- `husky@^9.0.0` — Git Hooks (optional, Phase 2)
- `chokidar@^4.0.0` — File Watcher (Phase 5)

---

## Entscheidung

**Phase 1 (DRY Refactoring) — Soll umgesetzt werden?**
- **A:** Ja, todo-utils.js erstellen (kritisch für Code-Qualität)
- **B:** Nein, Status Quo behalten

**Phase 2 (Husky Pre-Commit) — Soll umgesetzt werden?**
- **A:** Ja, optional für Developer Experience
- **B:** Nein, nur GitHub Actions (Status Quo)

**Phase 3 (GitHub Action Optimize) — Soll umgesetzt werden?**
- **A:** Ja, Fallback Logic hinzufügen
- **B:** Nein, aktuelle Version behalten
