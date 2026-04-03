# Media Mutual Exclusion + Improved Video Controls — Design

**Date:** 2026-04-01
**Status:** Approved
**Author:** Claude + Benjamin Kurtz

---

## Overview

Improve video/audio player coordination and UX:
- **Mutual Exclusion:** Only one video/audio plays at a time
- **Better Controls:** Rewind button, improved scrubbing, consistent glass design
- **Fullscreen:** Custom controls work in fullscreen (no native YouTube controls)

---

## Requirements Summary

| # | Requirement | Decision |
|---|-------------|----------|
| 1 | Media Mutual Exclusion | When Video B starts, Video A pauses automatically |
| 2 | Rewind Button | Icon only, no "-15s" text, circular glass style |
| 3 | Button Layout | Play centered, Rewind to the left (off-center) |
| 4 | Scrubbing Bar | Visible only on mouse hover (like other controls) |
| 5 | Fullscreen | Custom glass buttons + scrubbing bar visible in fullscreen |
| 6 | Audio Integration | PodcastPlayer also participates in mutual exclusion |
| 7 | Video Types | Applies to both YouTube and R2/Cloudflare MP4 |

---

## Architecture

### MediaContext (New)

Central coordination for all media players.

```javascript
// frontend/src/contexts/MediaContext.jsx
const MediaContext = createContext(null)

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
      if (playerId !== id) onPause()
    })
  }

  return (
    <MediaContext.Provider value={{ registerPlayer, unregisterPlayer, requestPlay }}>
      {children}
    </MediaContext.Provider>
  )
}

export function useMedia() {
  const context = useContext(MediaContext)
  if (!context) throw new Error('useMedia must be used within MediaProvider')
  return context
}
```

### Data Flow

```
User clicks Play on Video A
  ↓
Video A calls requestPlay('video-A')
  ↓
MediaContext iterates all registered players
  ↓
For each player (except 'video-A'):
  → Call their onPause callback
  ↓
All other videos/audio pause
  ↓
Video A starts playing
```

---

## Component Changes

### CustomVideoPlayer

**Props:** No changes (backward compatible)

**New Features:**
1. Generate unique `playerId` internally
2. Register with MediaContext on mount
3. Call `requestPlay` before playing
4. Provide `onPause` callback to MediaContext
5. Unregister on unmount

**UI Changes:**
- Rewind button: Icon only (no text), circular glass style
- Layout: Flex container with gap, Play centered, Rewind left
- Scrubbing bar: Only visible when `showControls === true`
- Fullscreen: Container-based (not iframe-native for YouTube)

**Integration Points:**
```javascript
const playerId = useRef(`media-${Math.random().toString(36).slice(2)}`)

const { registerPlayer, unregisterPlayer, requestPlay } = useMedia()

useEffect(() => {
  const onPause = () => {
    setPlaying(false)
    if (type === 'youtube') ytCmd('pauseVideo')
    else videoRef.current?.pause()
  }

  registerPlayer(playerId.current, onPause)
  return () => unregisterPlayer(playerId.current)
}, [])

const handlePlay = () => {
  requestPlay(playerId.current)
  // ... existing play logic
}
```

### PodcastPlayer

**Changes:** Same integration pattern as CustomVideoPlayer

**No UI changes** (already has good controls)

### App.jsx

Wrap existing providers with MediaProvider:

```javascript
<MediaProvider>
  <NavigationProvider>
    <SiteProvider>
      <ContentProvider>
        {/* existing routes */}
      </ContentProvider>
    </SiteProvider>
  </NavigationProvider>
</MediaProvider>
```

---

## UI/Layout Specifications

### Glass Overlay Buttons

**Container:**
```
absolute inset-0
flex items-center justify-center
gap-4 (space between buttons)
transition-opacity duration-300
opacity: playing && !showControls ? 0 : 100
```

**Rewind Button:**
```
w-14 h-14
rounded-full
bg-white/20 backdrop-blur-md border border-white/40
hover:bg-white/30 hover:scale-105
transition-all duration-300 shadow-2xl
```

**Play Button:**
```
w-20 h-20
rounded-full
bg-white/20 backdrop-blur-md border border-white/40
hover:bg-white/30 hover:scale-105
transition-all duration-300 shadow-2xl
```

### Scrubbing Bar

**Position:**
```
absolute bottom-0 left-0 right-0
h-1 bg-white/20 cursor-pointer
opacity: showControls ? 100 : 0
transition-opacity duration-300
```

**Progress Fill:**
```
h-full bg-white/60 group-hover/progress:bg-white
width: (currentTime / duration) * 100%
```

**Click Handler:** Calculate seek position from click X coordinate

### Bottom Controls Bar

**Existing controls:** Volume slider, Fullscreen button
**Position:** Above scrubbing bar (z-index higher)
**Visibility:** Same as scrubbing (on hover only)

---

## Fullscreen Handling

### Challenge

YouTube iframe in fullscreen shows native controls, hiding our custom glass buttons.

### Solution

**Container-based Fullscreen:**

1. **YouTube Parameters:**
   - `controls=0` — Hide native controls
   - `fs=0` — Disable native fullscreen button
   - User can only fullscreen via our custom button

2. **Custom Fullscreen:**
   - Call `requestFullscreen()` on wrapper DIV (not iframe)
   - Our glass buttons + scrubbing remain visible
   - Works for both YouTube and R2 videos

**Implementation:**
```javascript
const handleFullscreen = () => {
  const el = type === 'youtube' ? iframeRef.current?.parentElement : videoRef.current
  if (!el) return
  if (el.requestFullscreen) el.requestFullscreen()
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
}
```

**CSS:** Ensure iframe fills container in fullscreen
```css
.aspect-video { aspect-ratio: 16 / 9; }
[fullscreen] .aspect-video { width: 100vw; height: 100vh; }
```

---

## Testing

### Unit Tests
- MediaContext: register, unregister, requestPlay
- CustomVideoPlayer: Mount/unmount registers correctly

### Integration Tests
- Play Video A → Play Video B → Verify A paused
- Play Video → Play Audio → Verify Video paused
- Fullscreen enter/exit for YouTube and R2

### Manual Testing
- Scenarios:
  1. Two videos on page → play both → verify mutual exclusion
  2. Video + Audio → play both → verify mutual exclusion
  3. YouTube fullscreen → verify glass buttons visible
  4. R2 fullscreen → verify glass buttons visible
  5. Scrubbing bar → verify visible on hover only
  6. Rewind button → verify -15 seconds jump

---

## Migration Notes

**Breaking Changes:** None

**Backward Compatibility:** Yes
- Existing CustomVideoPlayer usage continues to work
- MediaProvider wraps app automatically

**Future Considerations:**
- Could add "global pause" button (pause all media)
- Could add media state tracking for analytics
- Could extend to other media types (embeds, etc.)

---

## Implementation Estimate

| Task | Time |
|------|------|
| MediaContext implementation | 1h |
| CustomVideoPlayer integration | 2h |
| PodcastPlayer integration | 1h |
| UI/Layout fixes (rewind, scrubbing, fullscreen) | 2h |
| Testing | 1h |
| **Total** | **~7 hours** |

---

## Next Steps

1. Create detailed implementation plan using `superpowers:writing-plans`
2. Implement MediaContext
3. Update CustomVideoPlayer
4. Update PodcastPlayer
5. Test all scenarios
6. Deploy and verify
