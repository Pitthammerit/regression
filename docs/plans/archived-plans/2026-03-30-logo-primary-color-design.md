# Logo Primary Color Effect Design

**Date:** 2026-03-30
**Status:** Approved

## Overview
Apply a CSS filter to both header logos (mobile circular + desktop wordmark) to transform black → dark navy (#224160).

## Requirements
- Both logos (mobile + desktop) get the color effect
- Always active (no conditional states)
- Header background: Always solid `bg-color-bg-light`
- Remove glass/blur effect on scroll

## Implementation

### 1. Add Tailwind Utility
**File:** `frontend/tailwind.config.css`

```css
@utility logo-primary {
  filter: sepia(100%) saturate(500%) hue-rotate(195deg) saturate(80%);
}
```

### 2. Update Header.jsx
**File:** `frontend/src/components/Header.jsx`

**Remove scroll state transition:**
```jsx
<header
  className="fixed top-0 left-0 right-0 z-50 bg-color-bg-light py-4"
>
```

**Add logo-primary class to both images:**
```jsx
<img
  src={r2('logos/BKA logo 500 px black.png')}
  className="lg:hidden h-full w-auto object-contain logo-primary"
/>
<img
  src={r2(logos.dark)}
  className="hidden lg:block h-full w-auto object-contain logo-primary"
/>
```

### 3. Remove scroll tracking
Remove `scrolled` state and `useEffect` scroll listener (no longer needed).

## Files to Modify
- `frontend/tailwind.config.css` - Add logo-primary utility
- `frontend/src/components/Header.jsx` - Simplify header, add logo-primary class
