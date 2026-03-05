# Automatisches TODO.md Sync-System — Doku & Bericht

**Projekt:** Regression Landing Page
**Datum:** 2026-03-05
**Autor:** Claude Code

---

## Übersicht

Dieses Dokument beschreibt ein automatisches System zur Synchronisation von `TODO.md` nach jedem Git-Push. Das System analysiert Commit-Messages, erkennt abgeschlossene Tasks und hält TODO.md als Single Source of Truth.

**Problem:** TODO.md wird manuell aktualisiert → Inkonsistenzen zwischen Code-Changes und TODO-Status.

**Lösung:** GitHub Action + Node.js Scripts für automatische Sync.

---

## Architektur

```
┌─────────────────────────────────────────────────────────────────┐
│                      Push to main                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  GitHub Action: .github/workflows/update-todo.yml               │
│  - Trigger: push to main (frontend/src, frontend/config, etc.)  │
│  - Runs: node scripts/update-todo.js                           │
│  - Commits: TODO.md if changed                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Script 1: scripts/update-todo.js                               │
│  - Git log (letzte 10 Commits)                                  │
│  - Keyword-Matching mit offenen Tasks                           │
│  - Markiere als [x] wenn match                                  │
│  - Update timestamp                                             │
│  - Exit code 1 = changes made                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Script 2: scripts/add-todo.js (manuel)                        │
│  - Füge neue Tasks hinzu                                        │
│  - Duplikat-Erkennung (Similarity Score)                        │
│  - User-Prompt bei Konflikten                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Dateien

### 1. `.github/workflows/update-todo.yml`

**Zweck:** GitHub Action Workflow, der nach jedem Push ausgeführt wird.

**Trigger:**
- `push` auf Branch `main`
- Nur wenn relevante Pfade geändert: `frontend/src/**`, `frontend/config/**`, `CLAUDE.md`, `scripts/**`
- Manuell via `workflow_dispatch` (GitHub UI)

**Schritte:**
1. **Checkout** - Repository mit `fetch-depth: 0` (voller History)
2. **Setup Node** - Node 22 mit npm cache
3. **Update TODO.md** - Führt `node scripts/update-todo.js` aus
4. **Commit** - Wenn Exit-Code 1 (Änderungen), dann committe und pushe

**Wichtig:** `continue-on-error: true` für den Update-Schritt, damit der Workflow nicht fehlschlägt wenn das Script Probleme hat.

---

### 2. `scripts/update-todo.js`

**Zweck:** Analysiert Git-Commits und aktualisiert TODO.md.

#### Funktionen

##### `getRecentCommits()`
```bash
git log -10 --pretty=%B
```
Gibt die letzten 10 Commit-Messages zurück (nur den Body ohne Metadaten).

##### `extractKeywords(text)`
Entfernt Markdown, URLs, Sonderzeichen. Extrahiert Wörter ≥3 Zeichen.
Beispiel: `"Add PropTypes to components"` → `["add", "proptypes", "components"]`

##### `calculateSimilarity(str1, str2)`
Berechnet Jaccard-Ähnlichkeit basierend auf Keyword-Overlap:
```
intersection(keywords1, keywords2) / union(keywords1, keywords2)
```
Wertebereich: 0 (keine Ähnlichkeit) bis 1 (identisch).

##### `isTaskCompleted(taskText, commitMessages)`
**Konservativer Algorithmus:**
1. Prüfe auf Commit-Typ: `feat|fix|chore|...` oder `completed|fixed|...`
2. Berechne Keyword-Overlap zwischen Task und Commit
3. Wenn ≥3 Keyword-Overlaps ODER ≥2 exakte Wort-Matches → Task abgeschlossen

**Beispiel:**
- Task: `"Add PropTypes to key components"`
- Commit: `"feat: add prop-types to Hero and Footer components"`
- Keywords: `["add", "proptypes", "components"]` (3 matches)
- Ergebnis: ✅ Task markiert als [x]

##### `updateTimestamp(content)`
Aktualisiert `Updated: YYYY-MM-DD HH:MM` im Format `2026-03-05 14:30`

##### `markCompletedTasks(content, commitMessages)`
Iteriert durch alle Zeilen, findet `- [ ]` Tasks, prüft mit `isTaskCompleted()`, ersetzt mit `- [x]`.

##### Exit-Codes
- `0` = Keine Änderungen (TODO.md bleibt gleich)
- `1` = Änderungen gemacht (TODO.md wurde geschrieben)

---

### 3. `scripts/add-todo.js`

**Zweck:** Manuelles Hinzufügen neuer Tasks mit Duplikat-Erkennung.

**Usage:**
```bash
node scripts/add-todo.js "Task description" [priority]
# Priority: high (default), medium, low
```

#### Funktionen

##### `findSimilarTasks(newTask, content, threshold = 0.4)`
Findet ähnliche Tasks in TODO.md basierend auf Keyword-Ähnlichkeit.
- Default Threshold: 0.4 (40%)
- Gibt Liste zurück mit `task`, `completed`, `similarity`

##### `findInsertionPoint(content, priority)`
Findet die richtige Section basierend auf Priority:
- `high` → unter `## 🔴 High Priority`
- `medium` → unter `## 🟡 Medium Priority`
- `low` → unter `## 🟢 Low Priority`

##### `addTask(content, task, priority)`
Fügt Task an der richtigen Stelle ein als `- [ ] Task`.

#### Flow bei Duplikaten

1. Extract Keywords aus neuem Task
2. Vergleiche mit allen existierenden Tasks
3. Wenn Similarity ≥ 40% → Prompt User:
   ```
   ⚠️  Similar tasks found:
      1. [✅] Add PropTypes to components (85%)
      2. [⬜] Add TypeScript migration (60%)

   Please choose:
     1 - Skip (existing task covers it)
     2 - Add anyway (new task)
     3 - Mark existing as completed and add new
   ```

---

## Edge Cases & Lösungen

### Edge Case 1: False Positives (über-aggressives Matching)

**Problem:** Script markiert Tasks als erledigt, die es nicht sind.

**Beispiel:**
- Task: `"Klären: Was soll das CMS Admin können?"`
- Commit: `"docs: clarify backend/ folder in CLAUDE.md"`
- Keywords: `["klären", "backend"]` → Match! ❌

**Lösung:** Konservativerer Algorithmus:
- Erfordert Commit-Type (`feat|fix|...`) + Keyword-Overlap
- Mindestens 3 Keyword-Overlaps ODER 2 exakte Wort-Matches
- Exakte Wort-Matches nur für Wörter >4 Zeichen

### Edge Case 2: Remote Rejected (workflow scope)

**Problem:**
```
! [remote rejected] main -> main (refusing to allow a Personal Access
Token to create or update workflow `.github/workflows/update-todo.yml`
without `workflow` scope)
```

**Ursache:** GitHub-PAT hat nicht den `workflow` Scope.

**Lösung:**
1. GitHub → Settings → Developer Settings → Personal Access Tokens
2. Edit Token → `workflow` Scope hinzufügen
3. Git Credential aktualisieren:
   ```bash
   git credential-osxkeychain erase
   host=github.com
   # Enter + Ctrl+D
   git push  # Wird nach neuem Token fragen
   ```

### Edge Case 3: Merge Conflicts in TODO.md

**Problem:** GitHub Action commited TODO.md, gleichzeitig hat User lokal geändert → Merge Conflict.

**Lösung:** Workflow prüft mit `git diff --cached --quiet` ob Änderungen vorhanden sind. Wenn nein, exit ohne Commit. Wenn Merge Conflict entsteht:
```bash
git pull origin main
# TODO.md merge conflict manuell lösen
git add TODO.md
git commit
git push
```

### Edge Case 4: Duplicate GitHub Action Commits

**Problem:** Mehrere Actions committen TODO.md gleichzeitig → Race Condition.

**Lösung:** GitHub Actions werden serialisiert, aber es kann passieren. Git prüft automatisch vor Push ob Remote geändert wurde. Wenn ja:
1. Action 1 commited erfolgreich
2. Action 2 versucht zu pushen → rejected (non-fast-forward)
3. Action 2 muss neu ausgeführt werden

### Edge Case 5: Script-Fehler (Syntax, Runtime)

**Problem:** Script hat Bug → Workflow schlägt fehl.

**Lösung:** `continue-on-error: true` im Workflow + Exit-Code-Check. Bei Fehler:
- Workflow marked als "success with warnings"
- TODO.md wird nicht commited
- Logs in GitHub Actions UI sichtbar

### Edge Case 6: Non-Conventional Commits

**Problem:** User commited ohne `feat|fix|...` Prefix.

**Lösung:** Algorithmus prüft auch auf `completed|fixed|implemented|added|removed|deleted` Wörter im Commit-Body. Wenn keines davon → kein Match.

### Edge Case 7: TODO.md Strukturänderung

**Problem:** User ändert Section-Header oder Format.

**Lösung:** Script sucht nach `- [ ]` Pattern (Standard Markdown Checklist). Solange dieses Format bleibt, funktioniert es. Bei complete Struktur-Änderung muss Script angepasst werden.

### Edge Case 8: Large Repos (1000+ Commits)

**Problem:** `git log` wird langsam bei vielen Commits.

**Lösung:** Script holt nur letzte 10 Commits (`git log -10`). Das reicht für typische Workflows. Bei Bedarf anpassen.

---

## Testing & Verification

### Lokaler Test

```bash
# 1. Script ausführen
node scripts/update-todo.js

# Erwartete Ausgabe:
# 🔄 TODO.md Auto-Sync started...
# 📜 Analyzing 10 recent commits...
# ✓ Completed: Task Name...
# ✅ TODO.md updated (oder "ℹ️  No changes needed")

# 2. Prüfe Änderungen
git diff TODO.md

# 3. Wenn okay, resetten
git checkout TODO.md
```

### Workflow Test

1. **GitHub UI:** Actions → "Update TODO.md" → Run workflow
2. **Logs prüfen:** Job logs zeigen was markiert wurde
3. **TODO.md auf GitHub:** Prüfe ob korrekt aktualisiert

### Integration Test

1. Feature committen mit aussagekräftiger Message
2. Push zu main
3. Warten auf GitHub Action (~30-60 Sekunden)
4. TODO.md prüfen: Task sollte [x] sein

---

## Portierung auf andere Projekte

### Voraussetzungen

1. **TODO.md existiert** im Root mit Markdown Checklist Format (`- [ ]`, `- [x]`)
2. **Node.js** im Projekt (oder anpassen auf Python, etc.)
3. **GitHub Actions** aktiviert

### Anpassungen

#### 1. Pfad-Anpassung
Wenn TODO.md nicht im Root:
```javascript
const TODO_PATH = path.join(process.cwd(), 'docs', 'TODO.md');
```

#### 2. Keywords anpassen
Für Projekt-spezifische Sprache:
```javascript
// In isTaskCompleted()
const hasCompletionWord = /^(feat|fix|story|tech|chore)/i.test(commitLower);
```

#### 3. Trigger anpassen
Wenn andere Pfade relevant sind:
```yaml
# In update-todo.yml
paths:
  - 'src/**'
  - 'docs/**'
  - 'README.md'
```

#### 4. Timestamp-Format anpassen
```javascript
// In updateTimestamp()
const updated = now.toISOString().substring(0, 10); // "2026-03-05"
```

---

## Future Enhancements

### 1. Conventional Commits Parser

Strukturierter Parser für `feat(scope): description` Format:
```javascript
const parsed = parseConventionalCommit(commitMessage);
const scope = parsed.scope; // z.B. "evidence"
const type = parsed.type; // z.B. "feat"
```

### 2. Section-basiertes Update

Nur bestimmte Sections aktualisieren:
```javascript
// Markiere Tasks nur in "High Priority" Section
const inHighPriority = isInSection(line, '## 🔴 High Priority');
if (inHighPriority && isTaskCompleted(...)) { ... }
```

### 3. AI-basiertes Matching

Claude API für intelligentere Erkennung:
```javascript
const similarity = await calculateSemanticSimilarity(task, commit);
// Versteht Kontext: "Fix footer bug" = "Footer strings hardcoded"
```

### 4. Interactive Mode

Claude fragt User bei unsicheren Fällen:
```javascript
if (similarity > 0.5 && similarity < 0.7) {
  const answer = await askUser(`Task "${task}" matches commit "${commit}"? (y/n)`);
}
```

---

## Zusammenfassung

Das automatische TODO.md Sync-System besteht aus:

1. **GitHub Action** - Trigger nach Push
2. **update-todo.js** - Keyword-basierte Erkennung abgeschlossener Tasks
3. **add-todo.js** - Manuelles Hinzufügen mit Duplikat-Erkennung

**Key Learnings:**
- Konservativer Algorithmus vermeidet False Positives
- Exit-Code-basierte Commits für Git-Integration
- GitHub Actions `workflow` Scope erforderlich für Workflow-Files
- `continue-on-error: true` für Robustheit

**Transferability:**
Scripts sind projekt-agnostisch, einzige Anpassungen:
- TODO.md Pfad
- Commit-Type Keywords
- Trigger Pfade

---

## Kontakt & Support

Bei Fragen oder Problemen:
1. GitHub Actions Logs prüfen
2. Script lokal debuggen: `node scripts/update-todo.js`
3. Dieses Dokument konsultieren

**Ende der Dokumentation**
