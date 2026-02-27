import React, { useState } from 'react'
import { Play, ChevronDown } from 'lucide-react'
import { hero } from '../../content/plr-de'
import { r2, portraits } from '../../utils/media'
import LazyImage from '../ui/LazyImage'

function VimeoGlassEmbed({ src, title }) {
  const [started, setStarted] = useState(false)
  const embedSrc = `${src}?badge=0&autopause=0&player_id=0&app_id=58479${started ? '&autoplay=1' : ''}`

  return (
    <div className="relative rounded overflow-hidden bg-brand-dark shadow-xl">
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

      {/* HEADLINE */}
      <div className="pt-28 pb-0 px-8 md:px-14 lg:px-20 flex-shrink-0">
        <h1 className="font-serif tracking-tight leading-none">
          {/* "DEINE SEELE." — smaller, muted */}
          <span
            className="block uppercase text-brand-deep/60"
            style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.6rem)', lineHeight: 1.1, letterSpacing: '0.06em' }}
          >
            {hero.headlineLine1}.
          </span>
          {/* "ERINNERT SICH." — dominant, large */}
          <span
            className="block uppercase italic text-brand-deep"
            style={{ fontSize: 'clamp(3.8rem, 11vw, 9.5rem)', lineHeight: 0.88 }}
          >
            {hero.headlineLine2}
          </span>
          {/* "Bist du bereit zuzuhören?" — left-aligned, light */}
          <span
            className="block font-sans font-light text-brand-muted pl-0.5 mt-4"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', lineHeight: 1.3 }}
          >
            {hero.headlineLine3} {hero.headlineLine4}
          </span>
        </h1>
      </div>

      {/* VISUAL BLOCK — video right-shifted */}
      <div className="flex-1 flex items-end gap-3 md:gap-4 px-8 md:pl-14 lg:pl-20 pr-0 overflow-hidden min-h-[280px] md:min-h-[360px]">

        {/* Portrait LEFT — small anchor, partially cut at top */}
        <div className="hidden lg:block w-[9%] flex-shrink-0 self-end pb-14">
          <div className="aspect-[3/4] rounded overflow-hidden">
            <LazyImage
              src={r2(portraits.p20)}
              alt="Benjamin Kurtz"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Spacer — pushes video further right */}
        <div className="hidden lg:block flex-shrink-0" style={{ width: '8%' }} />

        {/* VIDEO — main, right of center */}
        <div className="flex-1 lg:flex-none lg:w-[64%] self-end">
          <VimeoGlassEmbed
            src={hero.vimeoEmbedUrl}
            title="Intro Regression — Benjamin Kurtz"
          />
        </div>

        {/* Portrait RIGHT — cropped at edge */}
        <div className="hidden lg:block w-[10%] flex-shrink-0 self-end -mr-4 pb-6">
          <div className="aspect-[2/3] rounded-l overflow-hidden">
            <LazyImage
              src={r2(portraits.p24)}
              alt=""
              className="w-full h-full object-cover object-center scale-110"
            />
          </div>
        </div>
      </div>

      {/* CTA ROW — podcast link only */}
      <div className="px-8 md:px-14 lg:px-20 py-8 flex items-center">
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
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 right-10 md:right-16 flex flex-col items-center gap-1.5" style={{ opacity: 0.35 }}>
        <div className="w-px h-10 bg-brand-deep" style={{ animation: 'scrollFade 2s ease-in-out infinite' }} />
        <ChevronDown size={13} className="text-brand-deep" style={{ animation: 'scrollFade 2s ease-in-out infinite 0.4s' }} />
      </div>
    </section>
  )
}
