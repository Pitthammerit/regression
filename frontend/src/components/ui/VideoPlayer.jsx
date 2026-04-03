import React, { useRef, useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import { Play, Pause, Volume2, VolumeX, Maximize, RedoDot } from 'lucide-react'
import { useMedia } from '../../contexts/MediaContext'
import useYouTubePlayer from '../../hooks/useYouTubePlayer'
import { formatTime } from '../../utils/timeFormat'

/**
 * VideoPlayer — Unified player for R2/native video and YouTube
 *
 * Props:
 * - type: 'r2' | 'youtube'
 * - src: MP4 URL (for R2) or YouTube URL (for YouTube)
 * - videoId: YouTube video ID (alternative to src for YouTube)
 * - poster: thumbnail URL (R2 only)
 * - onVideoEnded: callback when video ends
 * - enterFullscreenOnClick: auto-fullscreen on first click
 * - exitFullscreenAtTime: auto-exit fullscreen at specific time (R2 only)
 * - className: additional CSS classes
 */
export default function VideoPlayer({
  type = 'r2',
  src,
  videoId,
  poster,
  className = '',
  onVideoEnded,
  enterFullscreenOnClick = false,
  exitFullscreenAtTime = null
}) {
  const playerRef = useRef(null)
  const hasTriggeredScrollRef = useRef(false)
  const progressInterval = useRef(null)
  const playerId = useRef(`media-${Math.random().toString(36).slice(2)}`)
  const { registerPlayer, unregisterPlayer, requestPlay } = useMedia()

  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [volume, setVolumeState] = useState(80)
  const [muted, setMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // YouTube player hook
  const ytPlayer = useYouTubePlayer()

  // Extract YouTube ID from URL if needed
  const getYouTubeId = (url) => {
    const m = url?.match(/(?:embed\/|watch\?v=|youtu\.be\/)([^?&]+)/)
    return m ? m[1] : url
  }
  const ytId = type === 'youtube' ? (videoId || getYouTubeId(src)) : null

  // Track fullscreen state for controls visibility
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Detect fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // ── Progress tracking ─────────────────────────────────────
  // R2: Uses onTimeUpdate event
  // YouTube: Uses polling interval
  useEffect(() => {
    if (type === 'youtube' && playing && ytPlayer.ready) {
      progressInterval.current = setInterval(() => {
        const time = ytPlayer.getCurrentTime()
        if (time !== undefined) setCurrentTime(time)
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
  }, [type, playing, ytPlayer.ready, ytPlayer.getCurrentTime])

  // ── Force YouTube options to hide UI elements ─────────────────
  // YouTube sometimes shows buttons after state changes (play, fullscreen, etc.)
  // This effect ensures options are re-applied to keep UI hidden
  useEffect(() => {
    if (type === 'youtube' && ytPlayer.ready && ytPlayer.playerRef.current) {
      try {
        // Re-apply critical options to ensure YouTube UI stays hidden
        const iframe = ytPlayer.playerRef.current.getIframe()
        if (iframe && iframe.contentWindow) {
          // Force hide YouTube chrome via direct DOM manipulation
          iframe.style.pointerEvents = 'none' // Prevent YouTube UI interaction
        }
      } catch (e) {
        // Silently fail - YouTube might not be ready yet
      }
    }
  }, [type, playing, ytPlayer.ready])

  // ── MediaContext mutual exclusion ───────────────────────────
  useEffect(() => {
    const onPause = () => {
      setPlaying(false)
      if (type === 'youtube') {
        ytPlayer.pause()
      } else if (playerRef.current) {
        playerRef.current.pause()
      }
    }

    registerPlayer(playerId.current, onPause)

    return () => {
      unregisterPlayer(playerId.current)
    }
  }, [type, ytPlayer.pause, registerPlayer, unregisterPlayer])

  // ── YouTube specific events ─────────────────────────────────
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0,          // Hide YouTube controls
      rel: 0,              // Show related videos from same channel only
      modestbranding: 1,    // Minimize YouTube logo
      iv_load_policy: 3,    // Hide annotations (Forward, Save, Share buttons)
      fs: 0,               // Disable YouTube's fullscreen button
      playsinline: 1,       // Prevent auto-fullscreen on iOS
      enablejsapi: 1,       // Enable JavaScript API for programmatic control
      start: 115,           // Start from 1:55
    },
  }

  const onReady = (event) => {
    ytPlayer.onReady(event)
    const dur = ytPlayer.getDuration()
    if (dur !== undefined) setDuration(dur)
  }

  const onStateChange = (event) => {
    const playerState = ytPlayer.onStateChange(event)
    if (playerState === undefined) return

    if (playerState === 1) { // PLAYING
      setPlaying(true)
      setStarted(true)
    } else if (playerState === 2) { // PAUSED
      setPlaying(false)
    } else if (playerState === 0) { // ENDED
      setPlaying(false)
      setStarted(false)
    }
  }

  // ── Playback controls ─────────────────────────────────────
  const handlePlay = () => {
    requestPlay(playerId.current)
    if (type === 'youtube') {
      ytPlayer.play()
    } else {
      playerRef.current?.play()
    }
    setPlaying(true)
    setStarted(true)
  }

  const handlePause = () => {
    if (type === 'youtube') {
      ytPlayer.pause()
    } else {
      playerRef.current?.pause()
    }
    setPlaying(false)
  }

  const handleRewind15 = () => {
    const newTime = Math.max(0, currentTime - 15)
    if (type === 'youtube') {
      ytPlayer.seekTo(newTime)
      setCurrentTime(newTime)
    } else if (playerRef.current) {
      playerRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    if (type === 'youtube') {
      ytPlayer.seekTo(newTime)
      setCurrentTime(newTime)
    } else if (playerRef.current) {
      playerRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleToggle = () => {
    // Request fullscreen BEFORE any state changes (direct user activation)
    if (enterFullscreenOnClick && !playing && type === 'r2') {
      const el = playerRef.current
      if (el) {
        if (el.requestFullscreen) el.requestFullscreen()
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
      }
    }
    playing ? handlePause() : handlePlay()
  }

  // ── Volume controls ───────────────────────────────────────
  const handleVolume = (val) => {
    const v = Number(val)
    setVolumeState(v)
    setMuted(v === 0)
    if (type === 'youtube') {
      ytPlayer.setVolume(v)
    } else if (playerRef.current) {
      playerRef.current.volume = v / 100
    }
  }

  const handleMuteToggle = () => {
    if (muted) {
      handleVolume(volume || 80)
      if (type === 'youtube') {
        ytPlayer.unMute()
      }
    } else {
      handleVolume(0)
      if (type === 'youtube') {
        ytPlayer.mute()
      }
    }
  }

  // ── Fullscreen ────────────────────────────────────────────
  const handleFullscreen = () => {
    let el
    if (type === 'youtube') {
      el = ytPlayer.playerRef?.current?.getIframe()?.parentElement
    } else {
      el = playerRef.current
    }
    if (!el) return

    // Exit fullscreen if already in fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    } else {
      // Enter fullscreen
      if (el.requestFullscreen) el.requestFullscreen()
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
    }
  }

  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-color-bg-dark group cursor-pointer ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* ── Media element ─── */}
      <div className={`aspect-video [&_iframe]:w-full [&_iframe]:h-full [&:fullscreen]:w-screen [&:fullscreen]:h-screen [&:fullscreen]:aspect-auto [&:fullscreen_&]:flex [&:fullscreen_&]:items-center [&:fullscreen_&]:justify-center ${type === 'youtube' ? 'hide-youtube-chrome' : ''}`}>
        {type === 'youtube' ? (
          ytId ? (
            <YouTube
              videoId={ytId}
              opts={opts}
              onReady={onReady}
              onStateChange={onStateChange}
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              Invalid YouTube video ID
            </div>
          )
        ) : (
          <video
            ref={playerRef}
            src={src}
            poster={poster}
            className="w-full h-full object-cover"
            onEnded={() => { setPlaying(false); setStarted(false); onVideoEnded?.() }}
            onTimeUpdate={(e) => {
              setCurrentTime(e.currentTarget.currentTime)
              setDuration(e.currentTarget.duration)
              if (exitFullscreenAtTime && !hasTriggeredScrollRef.current && playerRef.current) {
                const currentTime = playerRef.current.currentTime
                if (currentTime >= exitFullscreenAtTime && document.fullscreenElement) {
                  hasTriggeredScrollRef.current = true
                  document.exitFullscreen().catch(() => {})
                  setTimeout(() => {
                    onVideoEnded?.()
                  }, 100)
                }
              }
            }}
            onClick={handleToggle}
          />
        )}
      </div>

      {/* ── Glass overlay with -15s, Play/Pause ─── */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300
          ${playing && !showControls && !isFullscreen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onClick={handleToggle}
      >
        {/* Gradient vignette */}
        {!started && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
        )}

        {/* Controls row: -15s | Play/Pause */}
        <div className="relative flex items-center justify-center w-full">
          {/* Play/Pause (glass style) */}
          <button
            data-testid="glass-play-button"
            className={`relative ${type === 'youtube' ? 'player-button-strong' : 'player-button'} rounded-full
              bg-white/10 border border-white/20
              flex items-center justify-center
              hover:bg-white/20 hover:scale-105
              transition-[background-color,transform,opacity] duration-300 shadow-2xl pointer-events-auto`}
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
                className={`absolute -left-14 top-1/2 -translate-y-1/2 ${type === 'youtube' ? 'player-rewind-strong' : 'player-rewind'} rounded-full
                  bg-white/10 border border-white/20
                  flex items-center justify-center
                  hover:bg-white/20 hover:scale-105
                  transition-[background-color,transform,opacity] duration-300 shadow-2xl pointer-events-auto`}
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
        className={`absolute bottom-0 left-0 right-0 player-scrubber bg-color-primary cursor-pointer group/progress transition-opacity duration-300 pointer-events-auto z-30 ${showControls || isFullscreen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
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
          ${showControls || isFullscreen ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Time display */}
        <div className="text-white/80 text-xs font-medium">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Controls row */}
        <div className="flex items-center player-gap">
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
