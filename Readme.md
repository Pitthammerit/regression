# Regression Website — Self-Service Anleitung

**Was hier steht:** Wie du deine Website selbst ändern kannst, ohne Programmierer zu sein.

---

## 📋 Kurzübersicht: Was ist neu?

Nach dem Update (März 2026) kannst du jetzt:

1. **Bereiche umordnen** — z.B. Kundenstimmen nach oben verschieben
2. **Neue Kundenstimmen hinzufügen** — einfach in einer Liste eintragen
3. **Alles ohne Code** — nur Text-Dateien bearbeiten

---

## 🚀 Schnellstart: So änderst du etwas

### 1. Reihenfolge der Website-Bereiche ändern

**Datei:** `frontend/src/config/sections.config.js`

Diese Datei sieht so aus:

```javascript
export const SECTIONS_ORDER = [
  'HeroV3Section',
  'ServicesSection',
  'WelcomeSection',
  'TestimonialCarousel',  // ← Wenn das nach oben soll:
  'WhatIsSection',        //    Einfach diese Zeilen verschieben
  ...
]
```

**Beispiel:** Kundenstimmen (TestimonialCarousel) nach oben:

```javascript
export const SECTIONS_ORDER = [
  'HeroV3Section',
  'TestimonialCarousel',  // ← Jetzt an zweiter Stelle
  'ServicesSection',
  'WelcomeSection',
  ...
]
```

**WICHTIG:**
- Die Namen in Anführungszeichen bleiben gleich
- Jede Zeile mit Komma trennen (außer die letzte)
- Groß-/Kleinschreibung beachten

---

### 2. Neue Kundenstimme hinzufügen

**Datei:** `frontend/src/content/testimonials.list.js`

Diese Datei enthält alle Kundenstimmen. Um eine neue hinzuzufügen:

```javascript
export const TESTIMONIALS_LIST = [
  {
    name: "Anna K.",
    context: "Health Coach, Deutschland",
    quote: "Durch Benjamins Ruhe...",
    image: "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/...",
  },
  {
    name: "Alexander W.",
    context: "Musikproduzent, USA",
    quote: "Alles, was Benjamin...",
    image: "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/...",
  },
  // HIER eine neue hinzufügen:
  {
    name: "Deine Neue Kundin",
    context: "Beraterin, Schweiz",
    quote: "Das war eine unglaubliche Erfahrung...",
    image: "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/dein-bild.jpg",
  },
]
```

**WICHTIG:**
- Kommas nach jedem Eintrag (außer dem letzten)
- Text in Anführungszeichen
- Bild muss hochgeladen sein (R2 Storage)

**Reihenfolge ändern?** Einfach die Blöcke im Array verschieben.

---

### 3. Texte ändern (Überschriften, Beschreibungen, etc.)

**Datei:** `frontend/src/content/plr-de.js`

Hier stehen alle deutschen Texte der Website.

**Beispiel — Hero-Überschrift ändern:**

```javascript
export const hero = {
  headlineLine1: "Deine Seele",
  headlineLine2: "erinnert sich.",
  // Ändern zu:
  headlineLine1: "Deine Reise",
  headlineLine2: "beginnt jetzt.",
  ...
}
```

---

## 🔨 Nach Änderungen: Deployen

Wenn du etwas geändert hast, musst du es veröffentlichen:

```bash
# 1. Build testen (prüft ob alles funktioniert)
npm --prefix frontend run build

# 2. Wenn erfolgreich, commiten
git add .
git commit -m "Kurzbeschreibung der Änderung"

# 3. Pushen
git push

# Cloudflare deployt automatisch!
```

**Falls Build fehlschlägt:**
- Komma vergessen?
- Anführungszeichen nicht geschlossen?
- Datei im falschen Ordner?

---

## 📁 Die wichtigsten Dateien im Überblick

| Datei | Wofür? | Änderst du oft? |
|-------|--------|----------------|
| `frontend/src/config/sections.config.js` | Reihenfolge der Bereiche | Ja — wenn du Layout änderst |
| `frontend/src/content/testimonials.list.js` | Kundenstimmen | Ja — neue Reviews |
| `frontend/src/content/plr-de.js` | Alle Texte | Ja — Textänderungen |
| `frontend/tailwind.config.js` | Farben, Design | Nein — nur mit Claude |

---

## ⚠️ Was du NICHT ändern solltest

Diese Dateien sind für Programmierer:
- `frontend/src/App.js` — Nur mit Claude ändern
- `frontend/src/components/` — Nur mit Claude ändern
- `frontend/package.json` — Nur wenn du neue Funktionen brauchst

---

## 🎨 Farben ändern?

Alle Farben sind in `frontend/tailwind.config.js` definiert. Aber: **Frage Claude** bevor du etwas änderst!

Die CI-Farben (aktuell):
- `brand-deep`: Dunkelblau (#224160)
- `brand-steel`: Hellblau (#7696AD)
- `brand-cream`: Beige (#F0EBE1)

---

## 🆘 Hilfe bekommen

Wenn etwas nicht funktioniert oder du eine neue Funktion möchtest:

1. Schreibe Claude was du möchtest
2. Erkläre es in einfachen Worten
3. Claude macht die technischen Änderungen

**Beispiel:**
```
"Ich möchte die Kundenstimmen direkt nach dem Hero-Bereich anzeigen."
```

---

## 📝 Checkliste für Änderungen

- [ ] Datei geöffnet (`sections.config.js` oder `testimonials.list.js`)
- [ ] Änderung gemacht
- [ ] Kommas gesetzt? (alles außer letzte Zeile)
- [ ] Anführungszeichen geschlossen?
- [ ] Build getestet (`npm --prefix frontend run build`)
- [ ] Commit erstellt
- [ ] Ge-pusht
- [ ] Cloudflare deploy erfolgreich

---

**Stand:** März 2026 — Sprint 1 abgeschlossen (Config-System + Dynamic Testimonials)
