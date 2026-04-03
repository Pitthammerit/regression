import React, { useRef, useState, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, RedoDot } from 'lucide-react'
import { useMedia } from '../../contexts/MediaContext'

/**
 * CustomVideoPlayer — R2/Native video player with custom controls
 * src: MP4 video URL
 * poster: optional thumbnail URL
 * exitFullscreenAtTime: optional time in seconds to auto-exit fullscreen
 */
export default function CustomVideoPlayer({ src, poster, className = '', onVideoEnded, enterFullscreenOnClick = false, exitFullscreenAtTime = null }) {
  const videoRef = useRef(null)
  const hasTriggeredScrollRef = useRef(false)
  const playerId = useRef(`media-${Math.random().toString(36).slice(2)}`)
  const { registerPlayer, unregisterPlayer, requestPlay } = useMedia()
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [volume, setVolumeState] = useState(80)
  const [muted, setMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Register with MediaContext for mutual exclusion
  useEffect(() => {
    const onPause = () => {
      setPlaying(false)
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }

    registerPlayer(playerId.current, onPause)

    return () => {
      unregisterPlayer(playerId.current)
    }
  }, [registerPlayer, unregisterPlayer])

  // ── Playback ──────────────────────────────────────────
  const handlePlay = () => {
    requestPlay(playerId.current)
    videoRef.current?.play()
    setPlaying(true)
    setStarted(true)
  }

  const handlePause = () => {
    videoRef.current?.pause()
    setPlaying(false)
  }

  const handleRewind15 = () => {
    const newTime = Math.max(0, currentTime - 15)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  const handleToggle = (e) => {
    // Request fullscreen BEFORE any state changes (direct user activation)
    if (enterFullscreenOnClick && !playing) {
      const el = videoRef.current
      if (el) {
        if (el.requestFullscreen) el.requestFullscreen()
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
      }
    }
    playing ? handlePause() : handlePlay()
  }

  // ── Volume ───────────────────────────────────────────
  const handleVolume = (val) => {
    const v = Number(val)
    setVolumeState(v)
    setMuted(v === 0)
    if (videoRef.current) videoRef.current.volume = v / 100
  }

  const handleMuteToggle = () => {
    if (muted) {
      handleVolume(volume || 80)
    } else {
      handleVolume(0)
    }
  }

  // ── Fullscreen ────────────────────────────────────────
  const handleFullscreen = () => {
    const el = videoRef.current
    if (!el) return
    if (el.requestFullscreen) el.requestFullscreen()
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
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
      {/* ── Video ─── */}
      <div className="aspect-video [&:fullscreen]:w-screen [&:fullscreen]:h-screen [&:fullscreen]:aspect-auto">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full object-cover"
          onEnded={() => { setPlaying(false); setStarted(false); onVideoEnded?.() }}
          onTimeUpdate={(e) => {
            setCurrentTime(e.currentTarget.currentTime)
            setDuration(e.currentTarget.duration)
            if (exitFullscreenAtTime && !hasTriggeredScrollRef.current && videoRef.current) {
              const currentTime = videoRef.current.currentTime
              // Only trigger if we're in fullscreen and reached the target time
              if (currentTime >= exitFullscreenAtTime && document.fullscreenElement) {
                hasTriggeredScrollRef.current = true
                // Exit fullscreen first
                document.exitFullscreen().catch(() => {
                  // Ignore errors if already exited
                })
                // Then trigger scroll after a short delay
                setTimeout(() => {
                  onVideoEnded?.()
                }, 100)
              }
            }
          }}
          onClick={handleToggle}
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

            {/* -15 Seconds Rewind (positioned relative to Play button) */}
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
        className="absolute bottom-0 left-0 right-0 h-[11px] bg-color-primary cursor-pointer group/progress transition-opacity duration-300 pointer-events-auto z-30 opacity-0 group-hover:opacity-100"
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
