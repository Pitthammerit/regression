import React, { useState } from 'react'
import { Play, ChevronDown } from 'lucide-react'
import { hero } from '../../content/plr-de'

function VimeoGlassEmbed({ src, title }) {
  const [started, setStarted] = useState(false)
  const embedSrc = `${src}?badge=0&autopause=0&player_id=0&app_id=58479${started ? '&autoplay=1' : ''}`

  return (
    <div className="relative rounded-2xl overflow-hidden bg-brand-dark shadow-xl">
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
        {!started && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={() => setStarted(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/50 to-brand-dark/70" />
            <button
              className="relative z-10 w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/35 flex items-center justify-center hover:bg-white/25 hover:scale-105 transition-all duration-300 shadow-2xl"
              aria-label="Video abspielen"
              data-testid="hero-glass-play"
            >
              <Play size={28} className="text-white ml-1" fill="white" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function HeroV3Section() {
  return (
    <section id="hero" className="min-h-screen flex flex-col overflow-hidden relative" data-testid="hero-section">

      {/* HEADLINE + SUBLINE ROW */}
      <div className="pt-28 pb-6 px-8 md:px-14 lg:px-20 flex-shrink-0">
        <div className="flex items-end justify-between gap-8 md:gap-16">

          {/* Left: Big editorial headline */}
          <h1 className="font-serif tracking-tight leading-none flex-shrink-0">
            <span
              className="block uppercase text-brand-deep"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)', lineHeight: 0.88 }}
            >
              {hero.headlineLine1}
            </span>
            <span
              className="block italic text-brand-deep/70"
              style={{ fontSize: 'clamp(2.8rem, 9vw, 7.5rem)', lineHeight: 0.92 }}
            >
              {hero.headlineLine2}
            </span>
            <span
              className="block font-sans font-light text-brand-muted mt-2 pl-0.5"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)', lineHeight: 1.1 }}
            >
              {hero.headlineLine3} {hero.headlineLine4}
            </span>
          </h1>

          {/* Right: Subline text — visible on desktop only */}
          <p className="hidden md:block font-sans text-sm text-brand-muted/70 leading-relaxed text-right max-w-[220px] pb-2 flex-shrink-0">
            {hero.subline}
          </p>
        </div>
      </div>

      {/* VIDEO — full width, no portraits */}
      <div className="flex-1 px-8 md:px-14 lg:px-20 min-h-[300px] md:min-h-[380px]">
        <VimeoGlassEmbed
          src={hero.vimeoEmbedUrl}
          title="Intro Regression — Benjamin Kurtz"
        />
      </div>

      {/* CTA ROW — podcast link only + scroll indicator */}
      <div className="px-8 md:px-14 lg:px-20 py-8 flex items-center justify-between">
        <a
          href="#podcast"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('podcast')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="font-sans text-sm text-brand-muted hover:text-brand-deep transition-colors tracking-wide"
          data-testid="hero-podcast-link"
        >
          {hero.ctaSecondary}
        </a>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-1" style={{ opacity: 0.35 }}>
          <div className="w-px h-8 bg-brand-deep" style={{ animation: 'scrollFade 2s ease-in-out infinite' }} />
          <ChevronDown size={13} className="text-brand-deep" style={{ animation: 'scrollFade 2s ease-in-out infinite 0.4s' }} />
        </div>
      </div>
    </section>
  )
}
