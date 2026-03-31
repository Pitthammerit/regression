import React, { useState } from 'react'
import { Play } from 'lucide-react'
import { hero } from "../../content"
import CtaButton from '../ui/CtaButton'

/**
 * VimeoGlassEmbed
 * Shows glass play button overlay; on click swaps in the iframe with autoplay=1
 * This avoids the Vimeo privacy restriction showing — the iframe only loads on user intent
 */
function VimeoGlassEmbed({ src, title }) {
  const [started, setStarted] = useState(false)

  const embedSrc = `${src}?badge=0&autopause=0&player_id=0&app_id=58479${started ? '&autoplay=1' : ''}`

  return (
    <div className="relative rounded overflow-hidden shadow-2xl bg-brand-dark">
      <div style={{ paddingTop: '56.25%', position: 'relative' }}>
        {started && (
          <iframe
            src={embedSrc}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title={title}
          />
        )}

        {/* Glass play button — shown before video starts */}
        {!started && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-brand-dark/80"
            onClick={() => setStarted(true)}
            data-testid="vimeo-glass-play"
          >
            {/* Atmospheric background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/40 to-brand-dark/60" />

            {/* Subtle title placeholder */}
            <div className="absolute top-6 left-6 right-6">
              <p className="font-primary text-label text-white/40">
                {title}
              </p>
            </div>

            {/* Glass play button */}
            <button
              className="relative z-10 w-24 h-24 rounded-full
                bg-white/15 backdrop-blur-md border border-white/35
                flex items-center justify-center
                hover:bg-white/25 hover:scale-105
                transition-all duration-300 shadow-2xl"
              aria-label="Video abspielen"
            >
              <Play size={32} className="text-white ml-1" fill="white" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Hero V2 — centered video layout ──────────────────────
export default function HeroV2Section() {
  return (
    <section
      id="hero-v2"
      className="min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-6"
      data-testid="hero-v2-section"
    >
      {/* Headline — centered, no label above */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="font-serif leading-[1.0] mb-4">
          <span className="block text-6xl md:text-7xl lg:text-8xl uppercase text-color-primary tracking-tight">
            {hero.headlineLine1}
          </span>
          <span className="block text-5xl md:text-6xl lg:text-7xl italic text-color-primary">
            {hero.headlineLine2}
          </span>
        </h1>
        <p className="font-serif text-2xl md:text-3xl italic text-brand-muted font-light">
          {hero.headlineLine3} {hero.headlineLine4}
        </p>
      </div>

      {/* Video — centered, wide */}
      <div className="w-full max-w-4xl mb-12">
        <VimeoGlassEmbed
          src={hero.vimeoEmbedUrl}
          title="Intro Regression — Benjamin Kurtz"
        />
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <CtaButton label={hero.ctaPrimary} variant="primary" />
        <CtaButton
          label={hero.ctaSecondary}
          variant="ghost"
          onClick={() => document.getElementById('podcast')?.scrollIntoView({ behavior: 'smooth' })}
        />
      </div>

      {/* Subline */}
      <p className="font-primary text-brand-muted text-sm tracking-wide text-center">
        {hero.subline}
      </p>
    </section>
  )
}
