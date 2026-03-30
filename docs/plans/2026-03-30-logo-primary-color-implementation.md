# Logo Primary Color Effect Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply CSS filter to transform black header logos to dark navy (#224160) while simplifying header to remove scroll-based glass effect.

**Architecture:** Single CSS utility class applied to both logo images. Header no longer needs scroll state tracking.

**Tech Stack:** Tailwind CSS v4 @utility, React 19, CSS filters

---

## Task 1: Add logo-primary CSS utility

**Files:**
- Modify: `frontend/tailwind.config.css`

**Step 1: Add the CSS utility**

Add after the last utility (around line 520):

```css
@utility logo-primary {
  filter: sepia(100%) saturate(500%) hue-rotate(195deg) saturate(80%);
}
```

**Step 2: Verify build succeeds**

Run: `npm --prefix frontend run build`
Expected: ✓ built in ~1.6s

**Step 3: Commit**

```bash
git add frontend/tailwind.config.css
git commit -m "feat: Add logo-primary utility for dark navy logo color

- CSS filter: sepia(100%) saturate(500%) hue-rotate(195deg) saturate(80%)
- Transforms black logos to #224160 (primary color)"
```

---

## Task 2: Apply logo-primary to mobile logo

**Files:**
- Modify: `frontend/src/components/Header.jsx`

**Step 1: Add logo-primary class to mobile logo**

Find line 34 (circular logo for mobile/tablet):
```jsx
<img
  src={r2('logos/BKA logo 500 px black.png')}
  alt="Benjamin Kurtz Academy"
  className="lg:hidden h-full w-auto object-contain logo-primary"
/>
```

Change: Add `logo-primary` to className (keep existing classes)

**Step 2: Verify build succeeds**

Run: `npm --prefix frontend run build`
Expected: ✓ built in ~1.6s

**Step 3: Commit**

```bash
git add frontend/src/components/Header.jsx
git commit -m "feat: Apply logo-primary filter to mobile circular logo"
```

---

## Task 3: Apply logo-primary to desktop logo

**Files:**
- Modify: `frontend/src/components/Header.jsx`

**Step 1: Add logo-primary class to desktop logo**

Find line 38 (wordmark logo for desktop):
```jsx
<img
  src={r2(logos.dark)}
  alt="Benjamin Kurtz Academy"
  className="hidden lg:block h-full w-auto object-contain logo-primary"
/>
```

Change: Add `logo-primary` to className

**Step 2: Verify build succeeds**

Run: `npm --prefix frontend run build`
Expected: ✓ built in ~1.6s

**Step 3: Commit**

```bash
git add frontend/src/components/Header.jsx
git commit -m "feat: Apply logo-primary filter to desktop wordmark logo"
```

---

## Task 4: Simplify header (remove scroll state)

**Files:**
- Modify: `frontend/src/components/Header.jsx`

**Step 1: Remove scrolled state and useEffect**

Find lines 9-15:
```jsx
const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 40)
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}, [])
```

Delete these lines entirely.

**Step 2: Simplify header className**

Find line 21:
```jsx
className={`fixed top-0 left-0 right-0 z-50 bg-color-bg-light transition-[padding] duration-300 ${
  scrolled ? 'bg-white/80 backdrop-blur-md py-3' : 'bg-color-bg-light py-4'
}`}
```

Replace with:
```jsx
className="fixed top-0 left-0 right-0 z-50 bg-color-bg-light py-4"
```

**Step 3: Verify build succeeds**

Run: `npm --prefix frontend run build`
Expected: ✓ built in ~1.6s

**Step 4: Commit**

```bash
git add frontend/src/components/Header.jsx
git commit -m "refactor: Simplify header - remove scroll state and glass effect

- Always solid bg-color-bg-light (no glass/blur)
- Remove scrolled state and scroll listener
- Fixed py-4 padding (no transition)"
```

---

## Task 5: Final verification and push

**Step 1: Full build test**

Run: `npm --prefix frontend run build`
Expected: ✓ built in ~1.6s with no errors

**Step 2: Visual verification checklist**

After Cloudflare deployment, verify:
- [ ] Mobile logo appears dark navy (not black)
- [ ] Desktop logo appears dark navy (not black)
- [ ] Header background is solid cream color
- [ ] No glass/blur effect when scrolling
- [ ] No header border on scroll

**Step 3: Push to main**

```bash
git push origin main
```

---

## Testing Notes

**CSS Filter Values:**
- `sepia(100%)` - Converts black to brown tone
- `saturate(500%)` - Intensifies for color shift
- `hue-rotate(195deg)` - Rotates toward dark navy blue
- `saturate(80%)` - Fine-tunes to #224160

**If color needs adjustment:**
- More blue: increase `hue-rotate` (try 200-210deg)
- Less saturation: decrease final `saturate()` (try 60-70%)
- More intensity: increase `saturate(500%)` (try 600-700%)

**Fallback:**
If filter doesn't render correctly in some browsers, consider using SVG filter or separate colored asset.
