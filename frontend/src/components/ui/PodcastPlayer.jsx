import React, { useState, useRef, useEffect } from 'react'
import { SkipBack, Play, Pause, SkipForward } from 'lucide-react'
import { Slider } from './Slider'

/**
 * PodcastPlayer — in-page HTML5 audio player
 * Props: title, host, episodeLabel, thumbnailUrl, audioUrl
 */
export default function PodcastPlayer({ title, host, episodeLabel, thumbnailUrl, audioUrl }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onLoadedMetadata = () => setTotalDuration(audio.duration)
    const onEnded = () => setPlaying(false)
    const onWaiting = () => setLoading(true)
    const onCanPlay = () => setLoading(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('canplay', onCanPlay)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('canplay', onCanPlay)
    }
  }, [])

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

  const handleSkipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 30)
    }
  }

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.duration || 0,
        audioRef.current.currentTime + 30
      )
    }
  }

  const handleSeek = (val) => {
    if (audioRef.current && totalDuration) {
      const newTime = (val[0] / 100) * totalDuration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00'
    const h = Math.floor(secs / 3600)
    const m = Math.floor((secs % 3600) / 60)
    const s = Math.floor(secs % 60)
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    return `${m}:${String(s).padStart(2, '0')}`
  }

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0

  return (
    <div className="relative rounded-2xl overflow-hidden w-full max-w-sm mx-auto" data-testid="podcast-player">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Blurred Background — FULL card fill, same image as thumbnail */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
          filter: 'blur(28px)',
          transform: 'scale(1.15)',
        }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col items-center text-center gap-5">

        {/* Thumbnail — sharp, larger, center stage */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-36 h-36 object-cover shadow-2xl"
          style={{ borderRadius: '4px' }}
        />

        {/* Episode info */}
        <div className="space-y-1">
          <p className="font-primary text-xs tracking-[0.2em] uppercase text-white/45">
            {episodeLabel}
          </p>
          <h3 className="font-serif text-lg text-white leading-snug">
            {title}
          </h3>
          <p className="font-primary text-xs text-white/55">{host}</p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-8 mt-1">
          <button
            onClick={handleSkipBack}
            className="text-white/55 hover:text-white transition-colors flex flex-col items-center gap-0.5"
            aria-label="30s zurück"
            data-testid="podcast-skip-back"
          >
            <SkipBack size={20} />
            <span className="text-[9px] text-white/35 font-primary">30s</span>
          </button>

          <button
            onClick={togglePlay}
            disabled={loading}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-brand-cream transition-colors shadow-lg disabled:opacity-50"
            aria-label={playing ? 'Pause' : 'Abspielen'}
            data-testid="podcast-play-button"
          >
            {playing ? (
              <Pause size={20} className="text-brand-deep" fill="currentColor" />
            ) : (
              <Play size={20} className="text-brand-deep ml-0.5" fill="currentColor" />
            )}
          </button>

          <button
            onClick={handleSkipForward}
            className="text-white/55 hover:text-white transition-colors flex flex-col items-center gap-0.5"
            aria-label="30s vor"
            data-testid="podcast-skip-forward"
          >
            <SkipForward size={20} />
            <span className="text-[9px] text-white/35 font-primary">30s</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full px-1">
          <Slider
            value={[progress]}
            max={100}
            onChange={handleSeek}
            className="w-full mb-1.5"
          />
          <div className="flex justify-between text-xs text-white/35 font-primary">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
