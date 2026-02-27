import React from 'react'
import { SkipBack, Play, SkipForward } from 'lucide-react'
import { Slider } from './Slider'

/**
 * PodcastPlayer — wiederverwendbare Komponente
 * Props: title, host, episodeLabel, thumbnailUrl, duration, externalUrl
 */
export default function PodcastPlayer({ title, host, episodeLabel, thumbnailUrl, duration, externalUrl }) {
  return (
    <div className="relative rounded-2xl overflow-hidden w-full max-w-sm mx-auto" data-testid="podcast-player">

      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
          filter: 'blur(24px)',
          opacity: 0.55,
        }}
      />
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col items-center text-center gap-5">

        {/* Thumbnail — sharp, not blurred */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-28 h-28 object-cover rounded-xl shadow-2xl"
        />

        {/* Episode info */}
        <div className="space-y-1">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/45">
            {episodeLabel}
          </p>
          <h3 className="font-serif text-lg text-white leading-snug">
            {title}
          </h3>
          <p className="font-sans text-xs text-white/55">{host}</p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-8 mt-1">
          <button className="text-white/55 hover:text-white transition-colors" aria-label="Zurückspulen">
            <SkipBack size={20} />
          </button>
          <a
            href={externalUrl}
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-brand-cream transition-colors shadow-lg"
            aria-label="Auf Spotify abspielen"
            data-testid="podcast-player-play"
          >
            <Play size={20} className="text-brand-deep ml-0.5" fill="currentColor" />
          </a>
          <button className="text-white/55 hover:text-white transition-colors" aria-label="Vorspulen">
            <SkipForward size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full px-1">
          <Slider defaultValue={[0]} max={100} className="w-full mb-1.5" />
          <div className="flex justify-between text-xs text-white/35 font-sans">
            <span>0:00</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* External Link */}
        <a
          href={externalUrl}
          target="_blank"
          rel="noreferrer"
          className="font-sans text-xs text-white/45 hover:text-white/80 transition-colors tracking-widest uppercase mt-1"
          data-testid="podcast-player-external-link"
        >
          ♫ Auf Spotify anhören →
        </a>
      </div>
    </div>
  )
}
