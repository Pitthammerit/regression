import { useRef, useState, useCallback } from 'react'

/**
 * useYouTubePlayer — Custom hook for YouTube Player API
 *
 * Provides safe wrapper methods for YouTube Player API calls with consistent error handling.
 * All methods check player readiness and wrap calls in try-catch to prevent crashes.
 *
 * @returns {Object} YouTube player API methods and state
 * @returns {React.MutableRefObject} playerRef - Reference to YouTube player instance
 * @returns {boolean} ready - Whether player is ready for API calls
 * @returns {function} setReady - Setter for ready state
 * @returns {function} onReady - YouTube onReady event handler
 * @returns {function} onStateChange - YouTube onStateChange event handler
 * @returns {function} play - Play video
 * @returns {function} pause - Pause video
 * @returns {function} seekTo - Seek to specific time (seconds)
 * @returns {function} setVolume - Set volume (0-100)
 * @returns {function} mute - Mute audio
 * @returns {function} unMute - Unmute audio
 * @returns {function} getDuration - Get video duration
 * @returns {function} getCurrentTime - Get current playback time
 */
export default function useYouTubePlayer() {
  const playerRef = useRef(null)
  const [ready, setReady] = useState(false)

  /**
   * Safe wrapper for all YouTube API calls
   * Checks player readiness and wraps execution in try-catch
   *
   * @param {Function} fn - Function to execute with player reference
   * @returns {*} Result of fn() or undefined if error/not ready
   */
  const safeCall = useCallback((fn) => {
    if (playerRef.current && ready) {
      try {
        return fn()
      } catch (e) {
        console.error('[YouTube] API error:', e)
      }
    }
  }, [ready])

  /**
   * Play video
   */
  const play = useCallback(() => {
    safeCall(() => playerRef.current.playVideo())
  }, [safeCall])

  /**
   * Pause video
   */
  const pause = useCallback(() => {
    safeCall(() => playerRef.current.pauseVideo())
  }, [safeCall])

  /**
   * Seek to specific time
   *
   * @param {number} time - Time in seconds
   * @param {boolean} [allowSeekAhead=true] - Allow seeking beyond loaded buffer
   */
  const seekTo = useCallback((time, allowSeekAhead = true) => {
    safeCall(() => playerRef.current.seekTo(time, allowSeekAhead))
  }, [safeCall])

  /**
   * Set volume
   *
   * @param {number} volume - Volume level (0-100)
   */
  const setVolume = useCallback((volume) => {
    safeCall(() => playerRef.current.setVolume(volume))
  }, [safeCall])

  /**
   * Mute audio
   */
  const mute = useCallback(() => {
    safeCall(() => playerRef.current.mute())
  }, [safeCall])

  /**
   * Unmute audio
   */
  const unMute = useCallback(() => {
    safeCall(() => playerRef.current.unMute())
  }, [safeCall])

  /**
   * Get video duration in seconds
   *
   * @returns {number|undefined} Duration in seconds or undefined if error/not ready
   */
  const getDuration = useCallback(() => {
    return safeCall(() => playerRef.current.getDuration())
  }, [safeCall])

  /**
   * Get current playback time in seconds
   *
   * @returns {number|undefined} Current time in seconds or undefined if error/not ready
   */
  const getCurrentTime = useCallback(() => {
    return safeCall(() => playerRef.current.getCurrentTime())
  }, [safeCall])

  /**
   * YouTube onReady event handler
   * Stores player reference and marks as ready for API calls
   *
   * @param {Object} event - YouTube onReady event
   */
  const onReady = useCallback((event) => {
    if (!event?.target) return
    playerRef.current = event.target
    try {
      setReady(true)
    } catch (e) {
      console.error('[YouTube] onReady error:', e)
    }
  }, [])

  /**
   * YouTube onStateChange event handler
   * Returns player state: -1=UNSTARTED, 0=ENDED, 1=PLAYING, 2=PAUSED, 3=BUFFERING, 5=CUED
   *
   * @param {Object} event - YouTube onStateChange event
   * @returns {number|undefined} Player state or undefined if event invalid
   */
  const onStateChange = useCallback((event) => {
    if (!event?.data && event.data !== 0) return
    return event.data
  }, [])

  return {
    playerRef,
    ready,
    setReady,
    onReady,
    onStateChange,
    play,
    pause,
    seekTo,
    setVolume,
    mute,
    unMute,
    getDuration,
    getCurrentTime,
  }
}
