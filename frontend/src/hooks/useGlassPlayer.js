import { useState, useRef, useCallback } from 'react'

/**
 * useGlassPlayer — Custom hook for glass video player state and logic
 *
 * Unified player hook that handles play/pause, volume, seeking, and fullscreen
 * for all video types (R2/MP4, YouTube, Vimeo).
 *
 * @param {Object} options - Player options
 * @param {string} options.type - Video type: 'r2', 'youtube', or 'vimeo'
 * @param {string} options.src - Video URL or R2 path
 * @param {string} [options.videoId] - Explicit video ID (for YouTube)
 * @param {Function} [options.onEnded] - Callback when video ends
 *   NOTE: Should be memoized with useCallback in parent component
 *
 * @returns {Object} Player state, refs, and handlers
 */
export default function useGlassPlayer({ type, src, videoId, onEnded }) {
  // Refs for player elements
  const playerRef = useRef(null)
  const ytPlayerRef = useRef(null)

  // Player state
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [volume, setVolumeState] = useState(80)
  const [muted, setMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(false)

  /**
   * Extract YouTube video ID from URL
   * Handles various YouTube URL formats
   *
   * @param {string} url - YouTube URL
   * @returns {string|null} YouTube video ID or null
   */
  const getYouTubeId = useCallback((url) => {
    const match = url?.match(/(?:embed\/|watch\?v=|youtu\.be\/)([^?&]+)/)
    return match ? match[1] : url
  }, [])

  // Determine YouTube ID if type is youtube
  const ytId = type === 'youtube' ? (videoId || getYouTubeId(src)) : null

  /**
   * YouTube player ready handler
   * Called when YouTube player is initialized and ready
   *
   * @param {Object} event - YouTube onReady event
   */
  const onYouTubeReady = useCallback((event) => {
    if (!event?.target) return

    ytPlayerRef.current = event.target

    try {
      const dur = event.target.getDuration()
      if (dur) setDuration(dur)
    } catch (e) {
      console.error('[GlassPlayer] YouTube ready error:', e)
    }
  }, [])

  /**
   * YouTube state change handler
   * Maps YouTube player states to local state
   *
   * States: -1=UNSTARTED, 0=ENDED, 1=PLAYING, 2=PAUSED, 3=BUFFERING, 5=CUED
   *
   * @param {Object} event - YouTube onStateChange event
   */
  const onYouTubeStateChange = useCallback((event) => {
    if (event?.data === undefined) return

    const state = event.data

    if (state === 1) { // PLAYING
      setPlaying(true)
      setStarted(true)
    } else if (state === 2) { // PAUSED
      setPlaying(false)
    } else if (state === 0) { // ENDED
      setPlaying(false)
      setStarted(false)
      onEnded?.()
    }
  }, [onEnded])

  /**
   * Play video
   * Handles play for all video types
   */
  const handlePlay = useCallback(() => {
    if (!started) setStarted(true)
    setPlaying(true)

    if (type === 'youtube' && ytPlayerRef.current) {
      try {
        ytPlayerRef.current.playVideo()
      } catch (e) {
        console.error('[GlassPlayer] YouTube play error:', e)
      }
    } else if (playerRef.current) {
      playerRef.current.play().catch((e) => {
        console.error('[GlassPlayer] Native play error:', e)
      })
    }
  }, [type, started])

  /**
   * Pause video
   * Handles pause for all video types
   */
  const handlePause = useCallback(() => {
    setPlaying(false)

    if (type === 'youtube' && ytPlayerRef.current) {
      try {
        ytPlayerRef.current.pauseVideo()
      } catch (e) {
        console.error('[GlassPlayer] YouTube pause error:', e)
      }
    } else if (playerRef.current) {
      playerRef.current.pause()
    }
  }, [type])

  /**
   * Seek to position in video
   *
   * @param {number} percent - Position as percentage (0-1)
   */
  const handleSeek = useCallback((percent) => {
    // Clamp percent to valid range and guard against invalid duration
    const clampedPercent = Math.max(0, Math.min(1, percent))
    if (!duration || duration <= 0) return

    const newTime = clampedPercent * duration
    setCurrentTime(newTime)

    if (type === 'youtube' && ytPlayerRef.current) {
      try {
        ytPlayerRef.current.seekTo(newTime, true)
      } catch (e) {
        console.error('[GlassPlayer] YouTube seek error:', e)
      }
    } else if (playerRef.current) {
      playerRef.current.currentTime = newTime
    }
  }, [duration, type])

  /**
   * Set volume level
   *
   * @param {number} val - Volume level (0-100)
   */
  const handleVolume = useCallback((val) => {
    const v = Number(val)
    setVolumeState(v)
    setMuted(v === 0)

    if (type === 'youtube' && ytPlayerRef.current) {
      try {
        ytPlayerRef.current.setVolume(v)
        if (v === 0) {
          ytPlayerRef.current.mute()
        } else {
          ytPlayerRef.current.unMute()
        }
      } catch (e) {
        console.error('[GlassPlayer] YouTube volume error:', e)
      }
    } else if (playerRef.current) {
      playerRef.current.volume = v / 100
      playerRef.current.muted = v === 0
    }
  }, [type])

  /**
   * Toggle mute on/off
   * Restores previous volume when unmuting
   */
  const handleMuteToggle = useCallback(() => {
    if (muted) {
      // Restore previous volume (or default to 80)
      handleVolume(volume || 80)
    } else {
      // Mute
      handleVolume(0)
    }
  }, [muted, volume, handleVolume])

  /**
   * Toggle fullscreen mode
   * Handles both native and YouTube video elements
   */
  const handleFullscreen = useCallback(() => {
    let el

    if (type === 'youtube' && ytPlayerRef.current) {
      // For YouTube, get the iframe's parent container
      el = ytPlayerRef.current.getIframe()?.parentElement
    } else {
      // For native video, use the video element's parent
      el = playerRef.current?.parentElement
    }

    if (!el) return

    if (document.fullscreenElement) {
      document.exitFullscreen().catch((e) => {
        console.error('[GlassPlayer] Exit fullscreen error:', e)
      })
    } else {
      if (el.requestFullscreen) {
        el.requestFullscreen()
      } else if (el.webkitRequestFullscreen) {
        // Safari support
        el.webkitRequestFullscreen()
      }
    }
  }, [type])

  /**
   * Handle time update for native video
   * Called by onTimeUpdate event
   *
   * @param {Object} e - Time update event
   */
  const handleTimeUpdate = useCallback((e) => {
    const time = e.currentTarget.currentTime
    const dur = e.currentTarget.duration
    setCurrentTime(time)
    if (dur) setDuration(dur)
  }, [])

  /**
   * Handle video ended for native video
   * Called by onEnded event
   */
  const handleVideoEnded = useCallback(() => {
    setPlaying(false)
    setStarted(false)
    onEnded?.()
  }, [onEnded])

  return {
    // Refs
    playerRef,
    ytPlayerRef,
    ytId,

    // State
    playing,
    started,
    volume,
    muted,
    currentTime,
    duration,
    showControls,
    setShowControls,

    // Handlers
    handlePlay,
    handlePause,
    handleSeek,
    handleVolume,
    handleMuteToggle,
    handleFullscreen,
    handleTimeUpdate,
    handleVideoEnded,

    // YouTube-specific handlers
    onYouTubeReady,
    onYouTubeStateChange,
  }
}
