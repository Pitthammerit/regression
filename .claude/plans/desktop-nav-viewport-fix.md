# Plan: Desktop Navigation Viewport Fix — Variantenvergleich

**Datum:** 2026-03-06
**Status:** Variantenanalyse — Entscheidung erforderlich

---

## Problem

Dropdown-Viewports erscheinen zu weit rechts (Regression bei FAQ, Science zu weit rechts). Ursache: MutationObserver nutzt `rootRef` (flex-1 Container) als Referenz statt der tatsächlichen Nav-Liste.

---

## Lösungsvarianten

### Variante 1: Radix UI Native Positioning (Empfohlen)

**Ansatz:** MutationObserver komplett entfernen, Radix UI's eingebaute Positionierung nutzen.

```jsx
<NavigationMenu.Root className="relative z-10 flex items-center justify-center flex-1">
  <NavigationMenu.List>
    {/* Items */}
  </NavigationMenu.List>
  <NavigationMenu.Viewport className="NavigationMenuViewport" />
</NavigationMenu.Root>
```

**Pro:**
- ✅ -45 Zeilen Code (DRY, YAGNI)
- ✅ Radix UI Maintenance übernimmt Patches
- ✅ Browser-native Performance (kein Observer Overhead)
- ✅ CSS Custom Properties nutzen (--radix-navigation-menu-viewport-width)
- ✅ Zukunftssicher (Radix Updates)

**Contra:**
- ❌ CSS in index.css muss korrekt sein (position: absolute/relative)
- ❌ Weniger Kontrolle bei Custom Animationen

---

### Variante 2: MutationObserver korrigieren

**Ansatz:** `rootRef` auf `NavigationMenu.List` statt `Root` setzen.

```jsx
const rootRef = useRef(null)  // Ref auf List, nicht Root

// Root ohne ref
<NavigationMenu.Root className="...">
  <NavigationMenu.List ref={rootRef}>
    {/* Items */}
  </NavigationMenu.List>
  {/* Viewport mit korrigiertem Offset */}
</NavigationMenu.Root>
```

**Pro:**
- ✅ Behält bestehende Animation-Logik
- ✅ Maximale Kontrolle über Positionierung
- ✅ Kenntnis des bestehenden Codes

**Contra:**
- ❌ +27 Zeilen Observer-Code bleiben (YAGNI Verletzung)
- ❌ Runtime Overhead (MutationObserver)
- ❌ Manual Maintenance bei Radix Updates
- ❌ Komplexere Fehleranfälligkeit

---

### Variante 3: CSS-only Positionierung mit data-state

**Ansatz:** Pure CSS Lösung mit `[data-state="open"]` Selektoren.

```css
/* Viewport positioniert sich relativ zu offenem Trigger */
.NavigationMenuViewport {
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateX(0);
}

[data-state="open"] ~ .NavigationMenuViewport {
  /* Position via CSS vars */
}
```

**Pro:**
- ✅ Kein JavaScript nötig
- ✅ Browser-native Performance

**Contra:**
- ❌ Radix UI hat bereits eingebaute Logik (Doppelter Code)
- ❌ CSS-Only workaround für JS Component
- ❌ Eingeschränkte Flexibilität

---

### Variante 4: Ref-Architektur umbauen (Flexbox Fix)

**Ansatz:** Flex-1 Container in Header aufteilen, DesktopNav bekommt fixed width.

```jsx
// Header.jsx
<div className="hidden lg:flex items-center">
  <DesktopNav className="w-[600px]" />  {/* Fixed width */}
  <div className="flex-1" />  {/* Spacer */}
  <CtaButton />
</div>
```

**Pro:**
- ✅ Deterministische Breite für Berechnungen

**Contra:**
- ❌ Responsive Breaks (Mobile/Tablet/Desktop)
- ❌ Fixed width bricht bei langen Texten
- ❌ Architektur-Änderung für kleines Problem

---

## Empfehlung: Variante 1 (Radix UI Native)

**Begründung:**
1. **YAGNI:** MutationObserver ist Over-Engineering für Radix UI
2. **DRY:** Radix hat bereits Positionierungs-Logik eingebaut
3. **Zukunftssicher:** Radix Updates werden automatisch übernommen
4. **Performance:** Kein Runtime Overhead

---

## Implementation (Variante 1)

### Datei: frontend/src/components/DesktopNav.jsx

**Entfernen:**
- `useState({})` für viewportStyle
- `useRef(null)` für rootRef
- Ganzer `useEffect` mit MutationObserver (Zeilen 42-74)
- `rootRef={rootRef}` aus NavigationMenu.Root
- Wrapper-`div`s um Viewport (Zeilen 129-137)

**Ersetzen mit:**
```jsx
export default function DesktopNav({ shouldBlur }) {
  const { navigateTo } = useNavigation()

  const handleNavClick = (anchor) => {
    if (!anchor) return
    navigateTo(anchor)
  }

  return (
    <NavigationMenu.Root className={`relative z-10 flex items-center justify-center flex-1 ${shouldBlur ? 'backdrop-blur-md' : ''}`}>
      <NavigationMenu.List className="center m-0 flex list-none">
        {/* Items unverändert */}
      </NavigationMenu.List>

      {/* Viewport direkt — native Radix positioning */}
      <NavigationMenu.Viewport className="NavigationMenuViewport" />
    </NavigationMenu.Root>
  )
}
```

---

## CSS Verify (index.css)

Diese Klassen müssen vorhanden sein:
```css
.NavigationMenuContent {
  position: absolute;
  top: 0;
  left: 0;
}

.NavigationMenuViewport {
  position: relative;
  width: auto;
  min-width: 200px;
}
```

---

## Verification

1. Regression hover → Dropdown unter Regression ✅
2. Science hover → Dropdown unter Science ✅
3. Methoden hover → Dropdown unter Methoden ✅
4. FAQ hover → Dropdown unter FAQ ✅
5. Animationen spielen noch (fadeIn/scale) ✅

---

## Critical Files

1. `frontend/src/components/DesktopNav.jsx` — -45 Zeilen
2. `frontend/src/index.css` — verify (sollte korrekt sein)

---

## Entscheidung

**Welche Variante soll umgesetzt werden?**

- **A:** Variante 1 (Radix Native) — Empfohlen
- **B:** Variante 2 (Observer korrigieren) — Mehr Kontrolle
- **C:** Variante 3 (CSS-only) — Experimentell
