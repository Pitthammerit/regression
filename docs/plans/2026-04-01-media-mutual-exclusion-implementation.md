# Media Mutual Exclusion + Improved Video Controls — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement mutual exclusion for all media players (only one plays at a time) + improve video controls with rewind button, better scrubbing, and fullscreen handling.

**Architecture:** New MediaContext coordinates all media players via callback system. CustomVideoPlayer and PodcastPlayer register on mount, request play through context, which pauses all other players.

**Tech Stack:** React 19, Context API, lucide-react icons, existing CustomVideoPlayer/PodcastPlayer components

**Design Doc:** `docs/plans/2026-04-01-media-mutual-exclusion-video-controls-design.md`

---

## Task 1: Create MediaContext

**Files:**
- Create: `frontend/src/contexts/MediaContext.jsx`

**Step 1: Create MediaContext file**

```javascript
import { createContext, useState, useContext } from 'react'

const MediaContext = createContext(null)

/**
 * MediaProvider - Coordinates all media players for mutual exclusion
 *
 * Only one media player (video/audio) can play at a time.
 * Players register on mount, unregister on unmount.
 * When a player requests to play, all others are paused.
 */
export function MediaProvider({ children }) {
  const [players, setPlayers] = useState(new Map())

  const registerPlayer = (id, onPause) => {
    setPlayers(prev => new Map(prev).set(id, onPause))
  }

  const unregisterPlayer = (id) => {
    setPlayers(prev => {
      const next = new Map(prev)
      next.delete(id)
      return next
    })
  }

  const requestPlay = (id) => {
    // Pause all other players
    players.forEach((onPause, playerId) => {
      if (playerId !== id) {
        onPause()
      }
    })
  }

  return (
    <MediaContext.Provider value={{ registerPlayer, unregisterPlayer, requestPlay }}>
      {children}
    </MediaContext.Provider>
  )
}

/**
 * useMedia Hook
 *
 * Provides access to media coordination functions
 *
 * @returns {Object} { registerPlayer, unregisterPlayer, requestPlay }
 */
export function useMedia() {
  const context = useContext(MediaContext)
  if (!context) throw new Error('useMedia must be used within MediaProvider')
  return context
}
```

**Step 2: Verify no syntax errors**

Run: Check browser console or dev server
Expected: No errors

**Step 3: Commit**

```bash
git add frontend/src/contexts/MediaContext.jsx
git commit -m "feat: create MediaContext for mutual media exclusion"
```

---

## Task 2: Integrate MediaProvider in App.jsx

**Files:**
- Modify: `frontend/src/App.jsx`

**Step 1: Import MediaProvider**

Add to imports (after existing imports):
```javascript
import { MediaProvider } from './contexts/MediaContext'
```

**Step 2: Wrap existing providers with MediaProvider**

Find the existing provider wrapper (around line 5-8) and wrap it:

**Before:**
```javascript
<NavigationProvider>
  <SiteProvider>
    <ContentProvider>
```

**After:**
```javascript
<MediaProvider>
  <NavigationProvider>
    <SiteProvider>
      <ContentProvider>
```

**Step 3: Close the MediaProvider tag**

At the end of the providers section, add closing tag:

**Before:**
```javascript
    </ContentProvider>
  </SiteProvider>
</NavigationProvider>
```

**After:**
```javascript
    </ContentProvider>
  </SiteProvider>
</NavigationProvider>
</MediaProvider>
```

**Step 4: Verify app still loads**

Check: `http://localhost:3001/`
Expected: Page renders without errors

**Step 5: Commit**

```bash
git add frontend/src/App.jsx
git commit -m "feat: wrap app with MediaProvider for media coordination"
```

---

## Task 3: Update CustomVideoPlayer - Remove "-15s" text from Rewind button

**Files:**
- Modify: `frontend/src/components/ui/CustomVideoPlayer.jsx`

**Step 1: Find the Rewind button JSX**

Search for the rewind button section (around line 175-185)

**Step 2: Remove "-15s" text and make button circular**

**Before:**
```javascript
<button
  onClick={(e) => { e.stopPropagation(); handleRewind15() }}
  className="flex items-center gap-1.5 px-3 h-14 rounded-full
    bg-white/20 backdrop-blur-md border border-white/40
    hover:bg-white/30 hover:scale-105
    transition-all duration-300 shadow-2xl"
  aria-label="15 seconds back"
>
  <Rewind size={18} className="text-white" fill="white" />
  <span className="text-white text-xs font-semibold">-15s</span>
</button>
```

**After:**
```javascript
<button
  onClick={(e) => { e.stopPropagation(); handleRewind15() }}
  className="w-14 h-14 rounded-full
    bg-white/20 backdrop-blur-md border border-white/40
    flex items-center justify-center
    hover:bg-white/30 hover:scale-105
    transition-all duration-300 shadow-2xl"
  aria-label="15 seconds back"
>
  <Rewind size={20} className="text-white" fill="white" />
</button>
```

**Step 3: Verify button looks correct**

Check: `http://localhost:3001/` - navigate to video section
Expected: Rewind button is circular, icon only, no text

**Step 4: Commit**

```bash
git add frontend/src/components/ui/CustomVideoPlayer.jsx
git commit -m "fix: remove -15s text from rewind button, make circular"
```

---

## Task 4: Update CustomVideoPlayer - Add MediaContext integration

**Files:**
- Modify: `frontend/src/components/ui/CustomVideoPlayer.jsx`

**Step 1: Import useMedia hook**

Add to existing imports (after line 2):
```javascript
import { useMedia } from '../../contexts/MediaContext'
```

**Step 2: Generate unique player ID and get media functions**

Add after the existing refs (after line 13):
```javascript
const playerId = useRef(`media-${Math.random().toString(36).slice(2)}`)
const { registerPlayer, unregisterPlayer, requestPlay } = useMedia()
```

**Step 3: Register/unregister player on mount/unmount**

Add new useEffect after the YouTube time tracking useEffect (after line 67):

```javascript
// Register with MediaContext for mutual exclusion
useEffect(() => {
  const onPause = () => {
    setPlaying(false)
    if (type === 'youtube') {
      ytCmd('pauseVideo')
    } else if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  registerPlayer(playerId.current, onPause)

  return () => {
    unregisterPlayer(playerId.current)
  }
}, [type, registerPlayer, unregisterPlayer])
```

**Step 4: Update handlePlay to request play through context**

**Before:**
```javascript
const handlePlay = () => {
  if (type === 'youtube') ytCmd('playVideo')
  else videoRef.current?.play()
  setPlaying(true)
  setStarted(true)
}
```

**After:**
```javascript
const handlePlay = () => {
  requestPlay(playerId.current)
  if (type === 'youtube') ytCmd('playVideo')
  else videoRef.current?.play()
  setPlaying(true)
  setStarted(true)
}
```

**Step 5: Test mutual exclusion**

1. Open page with video
2. Play video
3. Open in second tab or trigger another video
4. Verify first video pauses when second plays

**Step 6: Commit**

```bash
git add frontend/src/components/ui/CustomVideoPlayer.jsx
git commit -m "feat: integrate CustomVideoPlayer with MediaContext"
```

---

## Task 5: Update CustomVideoPlayer - Fix scrubbing bar visibility

**Files:**
- Modify: `frontend/src/components/ui/CustomVideoPlayer.jsx`

**Step 1: Find scrubbing bar JSX**

Search for the progress bar section (around line 210-220)

**Step 2: Add showControls conditional to scrubbing bar**

**Before:**
```javascript
{/* ── Progress bar (scrubber) ─── */}
<div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 cursor-pointer group/progress" onClick={handleSeek}>
```

**After:**
```javascript
{/* ── Progress bar (scrubber) ─── */}
<div className={`absolute bottom-0 left-0 right-0 h-1 bg-white/20 cursor-pointer group/progress transition-opacity duration-300
  ${showControls ? 'opacity-100' : 'opacity-0'}`} onClick={handleSeek}>
```

**Step 3: Verify scrubbing bar behavior**

Check: `http://localhost:3001/`
Expected: Scrubbing bar only visible when hovering over video

**Step 4: Commit**

```bash
git add frontend/src/components/ui/CustomVideoPlayer.jsx
git commit -m "fix: scrubbing bar only visible on hover"
```

---

## Task 6: Update CustomVideoPlayer - Fix fullscreen for YouTube

**Files:**
- Modify: `frontend/src/components/ui/CustomVideoPlayer.jsx`

**Step 1: Update YouTube embed URL to disable native fullscreen**

Find the ytSrc definition (around line 28-30):

**Before:**
```javascript
const ytSrc = ytId
  ? `https://www.youtube.com/embed/${ytId}?controls=0&enablejsapi=1&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&start=115`
  : null
```

**After:**
```javascript
const ytSrc = ytId
  ? `https://www.youtube.com/embed/${ytId}?controls=0&enablejsapi=1&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&fs=0&start=115`
  : null
```

Note: Added `&fs=0` to disable native fullscreen button

**Step 2: Update handleFullscreen to target wrapper for YouTube**

Find handleFullscreen function (around line 136-145):

**Before:**
```javascript
const handleFullscreen = () => {
  const el = type === 'youtube' ? iframeRef.current : videoRef.current
  if (!el) return
  if (el.requestFullscreen)       el.requestFullscreen()
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
}
```

**After:**
```javascript
const handleFullscreen = () => {
  // For YouTube, fullscreen the wrapper div to keep custom controls visible
  const el = type === 'youtube' ? iframeRef.current?.parentElement : videoRef.current
  if (!el) return
  if (el.requestFullscreen)       el.requestFullscreen()
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
}
```

**Step 3: Add CSS to ensure iframe fills container in fullscreen**

Add to the iframe wrapper div (find the `<div className="aspect-video">` section, around line 157):

**Before:**
```javascript
<div className="aspect-video">
```

**After:**
```javascript
<div className="aspect-video [&_iframe]:w-full [&_iframe]:h-full [&:fullscreen]:w-screen [&:fullscreen]:h-screen [&:fullscreen]:aspect-auto">
```

This ensures:
- Iframe fills container normally
- In fullscreen, container fills screen (w-screen h-screen)
- Aspect ratio is removed in fullscreen (aspect-auto)

**Step 4: Test fullscreen for YouTube**

1. Open YouTube video on page
2. Click fullscreen button
3. Verify custom glass buttons are visible
4. Verify YouTube native controls are hidden

**Step 5: Test fullscreen for R2 videos**

1. Open page with R2 video (Hero section)
2. Click fullscreen button
3. Verify custom glass buttons are visible

**Step 6: Commit**

```bash
git add frontend/src/components/ui/CustomVideoPlayer.jsx
git commit -m "fix: fullscreen uses wrapper for YouTube to keep custom controls"
```

---

## Task 7: Update PodcastPlayer - Add MediaContext integration

**Files:**
- Modify: `frontend/src/components/ui/PodcastPlayer.jsx`

**Step 1: Import useMedia hook**

Add to existing imports (after line 3):
```javascript
import { useMedia } from '../../contexts/MediaContext'
```

**Step 2: Generate unique player ID and get media functions**

Add after the audioRef (after line 10):
```javascript
const playerId = useRef(`media-${Math.random().toString(36).slice(2)}`)
const { registerPlayer, unregisterPlayer, requestPlay } = useMedia()
```

**Step 3: Register/unregister player on mount/unmount**

Add new useEffect after the existing useEffect (after line 39):

```javascript
// Register with MediaContext for mutual exclusion
useEffect(() => {
  const onPause = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setPlaying(false)
  }

  registerPlayer(playerId.current, onPause)

  return () => {
    unregisterPlayer(playerId.current)
  }
}, [registerPlayer, unregisterPlayer])
```

**Step 4: Update togglePlay to request play through context**

Find the togglePlay function (around line 41-51):

**Before:**
```javascript
const togglePlay = () => {
  const audio = audioRef.current
  if (!audio) return
  if (playing) {
    audio.pause()
    setPlaying(false)
  } else {
    audio.play().catch(() => {})
    setPlaying(true)
  }
}
```

**After:**
```javascript
const togglePlay = () => {
  const audio = audioRef.current
  if (!audio) return
  if (playing) {
    audio.pause()
    setPlaying(false)
  } else {
    requestPlay(playerId.current)
    audio.play().catch(() => {})
    setPlaying(true)
  }
}
```

**Step 5: Test audio-video mutual exclusion**

1. Open page with video and audio player
2. Play video
3. Play audio
4. Verify video pauses when audio starts
5. Reverse: Play audio, then video
6. Verify audio pauses when video starts

**Step 6: Commit**

```bash
git add frontend/src/components/ui/PodcastPlayer.jsx
git commit -m "feat: integrate PodcastPlayer with MediaContext"
```

---

## Task 8: Final Testing & Verification

**Files:** None (testing only)

**Step 1: Test all mutual exclusion scenarios**

Create test checklist:
- [ ] Video A playing → click Video B → A pauses, B plays
- [ ] Video playing → click Audio → Video pauses, Audio plays
- [ ] Audio playing → click Video → Audio pauses, Video plays
- [ ] Multiple videos on page → only one plays at a time

**Step 2: Test UI changes**

- [ ] Rewind button: Circular, icon only, no text
- [ ] Button layout: Play centered, Rewind to left
- [ ] Scrubbing bar: Only visible on hover
- [ ] YouTube fullscreen: Custom controls visible, no native controls
- [ ] R2 fullscreen: Custom controls visible

**Step 3: Test functionality**

- [ ] Rewind button: Jumps back 15 seconds
- [ ] Scrubbing: Click to seek works
- [ ] Volume: Slider works
- [ ] Fullscreen: Enter/exit works for both video types

**Step 4: Check console for errors**

Run: Check browser console on `http://localhost:3001/`
Expected: No errors, no warnings

**Step 5: Build verification**

Run:
```bash
npm --prefix frontend run build
```

Expected: Build succeeds without errors

**Step 6: Commit any minor fixes**

If any small adjustments needed:
```bash
git add .
git commit -m "fix: minor adjustments from testing"
```

---

## Task 9: Update Documentation

**Files:**
- Modify: `TODO.md`

**Step 1: Update TODO.md**

Add completion note at top of TODO.md:

```markdown
## ✅ COMPLETE — Media Mutual Exclusion (2026-04-01)

All media players (video/audio) now coordinate — only one plays at a time.
Improved video controls: Rewind button, scrubbing on hover, fullscreen handling.

See: `docs/plans/2026-04-01-media-mutual-exclusion-implementation.md`

---
```

**Step 2: Commit documentation**

```bash
git add TODO.md
git commit -m "docs: mark media mutual exclusion complete"
```

---

## Task 10: Deploy & Verify

**Files:** None (deployment)

**Step 1: Build for production**

```bash
npm --prefix frontend run build
```

**Step 2: Commit all changes**

```bash
git add .
git commit -m "feat: complete media mutual exclusion + improved video controls"
```

**Step 3: Push to remote**

```bash
git push origin main
```

**Step 4: Wait for Cloudflare deployment**

Check: Cloudflare dashboard or wait for deployment email

**Step 5: Test on live site**

1. Open deployed URL
2. Test all scenarios from Task 8
3. Verify everything works as expected

**Step 6: Report completion**

If issues found: Document and create fix plan
If all good: Mark feature complete

---

## Summary

**Total Tasks:** 10
**Estimated Time:** ~7 hours
**Files Created:** 2 (MediaContext.jsx, implementation plan)
**Files Modified:** 3 (App.jsx, CustomVideoPlayer.jsx, PodcastPlayer.jsx)

**Key Changes:**
- New MediaContext for coordinating all media players
- CustomVideoPlayer: Media integration, UI fixes, fullscreen handling
- PodcastPlayer: Media integration
- Mutual exclusion: Only one video/audio plays at a time

**Testing Checklist:**
- Mutual exclusion works (video ↔ video, video ↔ audio)
- Rewind button: Icon only, circular
- Scrubbing: Visible on hover only
- Fullscreen: Custom controls visible for both YouTube and R2

---

**Ready for implementation!**
