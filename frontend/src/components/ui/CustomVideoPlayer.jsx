import React, { useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

/**
 * CustomVideoPlayer
 * type: 'youtube' | 'r2'
 * src:  YouTube URL (embed or watch) or direct MP4 URL
 * poster: optional thumbnail URL
 */
export default function CustomVideoPlayer({ type = 'r2', src, poster, className = '' }) {
  const iframeRef = useRef(null)
  const videoRef  = useRef(null)
  const [playing,      setPlaying]      = useState(false)
  const [started,      setStarted]      = useState(false)
  const [volume,       setVolumeState]  = useState(80)
  const [muted,        setMuted]        = useState(false)
  const [showControls, setShowControls] = useState(false)

  // ── YouTube helpers ──────────────────────────────────
  const getYouTubeId = (url) => {
    const m = url.match(/(?:embed\/|watch\?v=|youtu\.be\/)([^?&]+)/)
    return m ? m[1] : url
  }
  const ytId  = type === 'youtube' ? getYouTubeId(src) : null
  const ytSrc = ytId
    ? `https://www.youtube.com/embed/${ytId}?controls=0&enablejsapi=1&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3`
    : null

  const ytCmd = (func, args = []) => {
    iframeRef.current?.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func, args }), '*'
    )
  }

  // ── Playback ──────────────────────────────────────────
  const handlePlay = () => {
    if (type === 'youtube') ytCmd('playVideo')
    else videoRef.current?.play()
    setPlaying(true)
    setStarted(true)
  }

  const handlePause = () => {
    if (type === 'youtube') ytCmd('pauseVideo')
    else videoRef.current?.pause()
    setPlaying(false)
  }

  const handleToggle = () => playing ? handlePause() : handlePlay()

  // ── Volume ───────────────────────────────────────────
  const handleVolume = (val) => {
    const v = Number(val)
    setVolumeState(v)
    setMuted(v === 0)
    if (type === 'youtube') { ytCmd('setVolume', [v]); v === 0 ? ytCmd('mute') : ytCmd('unMute') }
    else if (videoRef.current) videoRef.current.volume = v / 100
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
    const el = type === 'youtube' ? iframeRef.current : videoRef.current
    if (!el) return
    if (el.requestFullscreen)       el.requestFullscreen()
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
  }

  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-brand-dark group cursor-pointer ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* ── Media ─── */}
      <div className="aspect-video">
        {type === 'r2' ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full h-full object-cover"
            onEnded={() => { setPlaying(false); setStarted(false) }}
            onClick={handleToggle}
          />
        ) : (
          <iframe
            ref={iframeRef}
            src={ytSrc}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            title="Video player"
          />
        )}
      </div>

      {/* ── Glass Play / Pause overlay ─── */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300
          ${playing && !showControls ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onClick={handleToggle}
      >
        {/* Gradient vignette so button is always readable */}
        {!started && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
        )}
        <button
          data-testid="glass-play-button"
          className="relative z-10 w-20 h-20 rounded-full
            bg-white/20 backdrop-blur-md border border-white/40
            flex items-center justify-center
            hover:bg-white/30 hover:scale-105
            transition-all duration-300 shadow-2xl"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing
            ? <Pause size={26} className="text-white" fill="white" />
            : <Play  size={26} className="text-white ml-1" fill="white" />
          }
        </button>
      </div>

      {/* ── Bottom controls bar ─── */}
      <div
        className={`absolute bottom-0 left-0 right-0 flex items-center justify-between
          px-5 py-3 bg-gradient-to-t from-black/70 to-transparent
          transition-opacity duration-300
          ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
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
          <Maximize size={16} />
        </button>
      </div>
    </div>
  )
}
