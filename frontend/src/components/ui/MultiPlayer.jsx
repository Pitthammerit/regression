import React, { useEffect, useRef } from 'react'
import YouTube from 'react-youtube'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'
import useGlassPlayer from '../../hooks/useGlassPlayer'
import { liquidGL } from '../../lib/liquidGL'
import { formatTime } from '../../utils/timeFormat'

/**
 * MultiPlayer - Glassmorphic video player with liquidGL
 * Supports R2/MP4, YouTube, and Vimeo (native iframe)
 *
 * @param {Object} props
 * @param {string} [props.type='r2'] - Video type: 'r2', 'youtube', or 'vimeo'
 * @param {string} props.src - Video URL or R2 path
 * @param {string} [props.videoId] - Explicit video ID (for YouTube)
 * @param {string} [props.poster] - Thumbnail image URL
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onVideoEnded] - Callback when video ends
 */
export default function MultiPlayer({
  type = 'r2',
  src,
  videoId,
  poster,
  className = '',
  onVideoEnded,
}) {
  const containerRef = useRef(null)
  const liquidGLInstance = useRef(null)

  const {
    playerRef,
    ytPlayerRef,
    ytId,
    playing,
    started,
    volume,
    muted,
    currentTime,
    duration,
    showControls,
    setShowControls,
    handlePlay,
    handlePause,
    handleSeek,
    handleVolume,
    handleMuteToggle,
    handleFullscreen,
    handleTimeUpdate,
    handleVideoEnded,
    onYouTubeReady,
    onYouTubeStateChange,
  } = useGlassPlayer({ type, src, videoId, onEnded: onVideoEnded })

  // Initialize liquidGL on mount
  useEffect(() => {
    if (!containerRef.current || liquidGLInstance.current) return

    // Check if liquidGL is available
    if (typeof liquidGL === 'undefined') {
      console.warn('[MultiPlayer] liquidGL not available - falling back to CSS-only glass')
      return
    }

    try {
      liquidGLInstance.current = liquidGL({
        target: '.multi-player-target',
        snapshot: 'body',
        resolution: 2.0,
        refraction: 0.047,
        bevelDepth: 0.136,
        bevelWidth: 0.076,
        frost: 2,
        shadow: true,
        specular: false,
        tilt: false,
        on: {
          init(instance) {
            console.log('[MultiPlayer] liquidGL ready!', instance)
          },
        },
      })
    } catch (error) {
      console.warn('[MultiPlayer] liquidGL initialization failed:', error)
    }

    return () => {
      // Cleanup if needed
      liquidGLInstance.current = null
    }
  }, [])

  // YouTube player options
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      modestbranding: 1,
      iv_load_policy: 3,
      fs: 0,
      playsinline: 1,
      enablejsapi: 1,
    },
  }

  // Get Vimeo embed URL
  const getVimeoUrl = (url) => {
    const m = url?.match(/vimeo\.com\/(\d+)/)
    return m ? `https://player.vimeo.com/video/${m[1]}?autoplay=0&controls=0` : url
  }

  const vimeoUrl = type === 'vimeo' ? getVimeoUrl(src) : null

  // Handle progress bar click
  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    handleSeek(percent)
  }

  return (
    <div
      ref={containerRef}
      className={`multi-player-target relative rounded-2xl overflow-hidden bg-color-bg-dark group cursor-pointer ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Container */}
      <div className="relative aspect-video [&:fullscreen]:w-screen [&:fullscreen]:h-screen [&:fullscreen]:aspect-auto [&:fullscreen_&]:flex [&:fullscreen_&]:items-center [&:fullscreen_&]:justify-center">
        {/* Thumbnail - shown until started */}
        {!started && poster && (
          <img
            src={poster}
            alt="Video thumbnail"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Video Element (R2/MP4) */}
        {type === 'r2' && (
          <video
            ref={playerRef}
            src={src}
            poster={poster}
            className="w-full h-full object-cover"
            onEnded={handleVideoEnded}
            onTimeUpdate={handleTimeUpdate}
            onClick={playing ? handlePause : handlePlay}
          />
        )}

        {/* YouTube Player - lazy loaded */}
        {type === 'youtube' && ytId && started && (
          <YouTube
            videoId={ytId}
            opts={opts}
            onReady={onYouTubeReady}
            onStateChange={onYouTubeStateChange}
            className="w-full h-full"
          />
        )}

        {/* Vimeo Player - lazy loaded */}
        {type === 'vimeo' && vimeoUrl && started && (
          <iframe
            src={vimeoUrl}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}

        {/* Play Button Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300
            ${playing && !showControls ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          onClick={playing ? handlePause : handlePlay}
        >
          <button
            className="relative w-20 h-20 rounded-full bg-color-primary flex items-center justify-center
              hover:bg-color-secondary transition-colors duration-200 pointer-events-auto
              shadow-lg"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <Pause size={26} className="text-white" fill="white" />
            ) : (
              <Play size={26} className="text-white ml-1" fill="white" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar - Blue with white progress */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[11px] bg-color-primary cursor-pointer
          group/progress transition-opacity duration-300 pointer-events-auto z-30"
        style={{ opacity: showControls ? 1 : 0 }}
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-white group-hover/progress:bg-white transition-colors"
          style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
        />
      </div>

      {/* Controls Bar - White Glass Design */}
      <div
        className={`absolute bottom-[11px] left-0 right-0 flex items-center justify-between
          px-5 py-3 bg-white/10 backdrop-blur-md border-t border-white/20
          transition-opacity duration-300 pointer-events-auto`}
        style={{ opacity: showControls ? 1 : 0 }}
      >
        {/* Time Display - Left Aligned */}
        <div className="text-white text-xs font-medium">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Volume + Fullscreen - Right Aligned */}
        <div className="flex items-center gap-3">
          {/* Volume */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleMuteToggle}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Mute toggle"
            >
              {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={muted ? 0 : volume}
              onChange={(e) => handleVolume(e.target.value)}
              className="w-20 h-0.5 accent-white cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Fullscreen */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleFullscreen()
            }}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Fullscreen"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
