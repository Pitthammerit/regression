import React, { useState, useRef, useEffect } from 'react'
import YouTube from 'react-youtube'
import { Play, Pause, Volume2, VolumeX, Maximize, RedoDot } from 'lucide-react'
import { useMedia } from '../../contexts/MediaContext'

/**
 * YouTubePlayer — Custom controls for YouTube embed
 * - Play/Pause, Rewind 15s, Scrubber, Volume, Fullscreen
 * - Hides YouTube's native controls and related videos
 */
export default function YouTubePlayer({ videoId, className = '' }) {
  const playerRef = useRef(null)
  const { registerPlayer, unregisterPlayer, requestPlay } = useMedia()
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(80)
  const [muted, setMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const progressInterval = useRef(null)

  // Register with MediaContext for mutual exclusion
  useEffect(() => {
    const onPause = () => {
      setPlaying(false)
      if (playerRef.current) {
        playerRef.current.pauseVideo()
      }
    }

    registerPlayer(`youtube-${videoId}`, onPause)

    return () => {
      unregisterPlayer(`youtube-${videoId}`)
    }
  }, [videoId, registerPlayer, unregisterPlayer])

  // Track progress when playing
  useEffect(() => {
    if (playing && playerRef.current) {
      progressInterval.current = setInterval(() => {
        if (playerRef.current) {
          setCurrentTime(playerRef.current.getCurrentTime())
        }
      }, 250)
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
        progressInterval.current = null
      }
    }
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [playing])

  // YouTube player options
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0,          // Hide YouTube controls
      rel: 0,              // Show related videos from same channel only
      modestbranding: 1,    // Minimize YouTube logo
      iv_load_policy: 3,    // Hide annotations
      fs: 0,               // Disable fullscreen button
      playsinline: 1,       // Prevent auto-fullscreen on iOS
      enablejsapi: 1,       // Enable JavaScript API
    },
  }

  // When player is ready
  const onReady = (event) => {
    playerRef.current = event.target
    const dur = event.target.getDuration()
    setDuration(dur)
  }

  // When player state changes
  const onStateChange = (event) => {
    const playerState = event.data
    // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
    if (playerState === 1) {
      setPlaying(true)
      setStarted(true)
    } else if (playerState === 2) {
      setPlaying(false)
    } else if (playerState === 0) {
      setPlaying(false)
      setStarted(false)
    }
  }

  // ── Playback controls ──────────────────────────────────
  const handlePlay = () => {
    requestPlay(`youtube-${videoId}`)
    playerRef.current?.playVideo()
    setPlaying(true)
    setStarted(true)
  }

  const handlePause = () => {
    playerRef.current?.pauseVideo()
    setPlaying(false)
  }

  const handleRewind15 = () => {
    const newTime = Math.max(0, currentTime - 15)
    playerRef.current?.seekTo(newTime, true)
    setCurrentTime(newTime)
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    playerRef.current?.seekTo(newTime, true)
    setCurrentTime(newTime)
  }

  const handleToggle = () => {
    playing ? handlePause() : handlePlay()
  }

  // ── Volume controls ─────────────────────────────────────
  const handleVolume = (val) => {
    const v = Number(val)
    setVolumeState(v)
    setMuted(v === 0)
    playerRef.current?.setVolume(v)
  }

  const handleMuteToggle = () => {
    if (muted) {
      handleVolume(volume || 80)
      playerRef.current?.unMute()
    } else {
      handleVolume(0)
      playerRef.current?.mute()
    }
  }

  // ── Fullscreen ─────────────────────────────────────────
  const handleFullscreen = () => {
    const wrapper = playerRef.current?.getIframe()?.parentElement
    if (!wrapper) return
    if (wrapper.requestFullscreen) wrapper.requestFullscreen()
    else if (wrapper.webkitRequestFullscreen) wrapper.webkitRequestFullscreen()
  }

  // Format time as M:SS
  const formatTime = (s) => {
    const mins = Math.floor(s / 60)
    const secs = Math.floor(s % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-brand-dark group cursor-pointer ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* ── YouTube iframe (hidden controls) ─── */}
      <div className="aspect-video [&_iframe]:w-full [&_iframe]:h-full [&:fullscreen]:w-screen [&:fullscreen]:h-screen [&:fullscreen]:aspect-auto">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          className="w-full h-full"
        />
      </div>

      {/* ── Glass overlay with -15s, Play/Pause ─── */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300
          ${playing && !showControls ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onClick={handleToggle}
      >
        {/* Gradient vignette so button is always readable */}
        {!started && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
        )}

        {/* Controls row: -15s | Play/Pause */}
        <div className="relative flex items-center justify-center w-full">
          {/* Play/Pause (glass style) - centered anchor */}
          <button
            data-testid="glass-play-button"
            className="relative w-20 h-20 rounded-full
              bg-white/10 backdrop-blur-[2px] border border-white/20
              flex items-center justify-center
              hover:bg-white/20 hover:scale-105
              transition-all duration-300 shadow-2xl pointer-events-auto"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing
              ? <Pause size={26} className="text-white" fill="white" />
              : <Play  size={26} className="text-white ml-1" fill="white" />
            }

            {/* -15 Seconds Rewind */}
            {started && (
              <button
                onClick={(e) => { e.stopPropagation(); handleRewind15() }}
                className="absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                  bg-white/10 backdrop-blur-[2px] border border-white/20
                  flex items-center justify-center
                  hover:bg-white/20 hover:scale-105
                  transition-all duration-300 shadow-2xl pointer-events-auto"
                aria-label="15 seconds back"
              >
                <RedoDot size={18} className="text-white scale-x-[-1]" />
              </button>
            )}
          </button>
        </div>
      </div>

      {/* ── Progress bar (scrubber) ─── */}
      <div
        data-testid="scrubber-bar"
        className="absolute bottom-0 left-0 right-0 h-2 bg-color-primary cursor-pointer group/progress transition-opacity duration-300 pointer-events-auto z-30"
        onClick={handleSeek}
      >
        <div
          className="h-full bg-white group-hover/progress:bg-white transition-colors"
          style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
        />
      </div>

      {/* ── Bottom controls bar ─── */}
      <div
        className={`absolute bottom-[5px] left-0 right-0 flex items-center justify-between
          px-5 py-3 bg-gradient-to-t from-black/70 to-transparent
          transition-opacity duration-300 pointer-events-auto
          ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Time display */}
        <div className="text-white/80 text-xs font-medium">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-3">
          {/* Volume */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleMuteToggle}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Mute toggle"
            >
              {muted || volume === 0
                ? <VolumeX size={16} />
                : <Volume2 size={16} />
              }
            </button>
            <input
              type="range" min="0" max="100"
              value={muted ? 0 : volume}
              onChange={(e) => handleVolume(e.target.value)}
              className="w-20 h-0.5 accent-white cursor-pointer"
              onClick={(e) => e.stopPropagation()}
              data-testid="volume-slider"
            />
          </div>

          {/* Fullscreen */}
          <button
            onClick={(e) => { e.stopPropagation(); handleFullscreen() }}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Vollbild"
            data-testid="fullscreen-button"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
