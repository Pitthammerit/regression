import React, { useState } from 'react'
import { Play } from 'lucide-react'
import { hero } from '../../content/plr-de'
import { r2, portraits } from '../../utils/media'
import CtaButton from '../ui/CtaButton'
import LazyImage from '../ui/LazyImage'

/**
 * Hero V3 — Elementra-inspired editorial layout
 * - Huge left-aligned headline (fills top ~45% of viewport)
 * - Video slightly offset right (full aspect ratio, fully visible)
 * - Second portrait partially cropped at right edge ("im Anschnitt")
 * - First portrait on the left, partially cut at top
 */

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
              data-testid="hero-v3-glass-play"
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
    <section
      id="hero-v3"
      className="min-h-screen flex flex-col overflow-hidden"
      data-testid="hero-v3-section"
    >
      {/* ── HEADLINE — huge, left-aligned, dominates top half ── */}
      <div className="pt-28 pb-4 px-8 md:px-14 lg:px-20 flex-shrink-0">
        <h1 className="font-serif tracking-tight leading-none">
          <span
            className="block uppercase text-brand-deep"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)', lineHeight: 0.88 }}
          >
            {hero.headlineLine1}
          </span>
          <span
            className="block italic text-brand-deep"
            style={{ fontSize: 'clamp(2.8rem, 9vw, 7.5rem)', lineHeight: 0.92 }}
          >
            {hero.headlineLine2}
          </span>
          <span
            className="block font-light text-brand-muted mt-2 pl-1"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', lineHeight: 1.1 }}
          >
            {hero.headlineLine3} {hero.headlineLine4}
          </span>
        </h1>
      </div>

      {/* ── VISUAL BLOCK — portrait left + video center-right + portrait cropped right ── */}
      <div className="flex-1 flex items-end gap-3 md:gap-5 px-8 md:pl-14 lg:pl-20 pr-0 overflow-hidden min-h-[300px] md:min-h-[380px]">

        {/* Portrait LEFT — visible on desktop, partially cut at top via negative margin */}
        <div className="hidden lg:block w-[16%] flex-shrink-0 self-end pb-16">
          <div className="aspect-[3/4] rounded overflow-hidden">
            <LazyImage
              src={r2(portraits.p20)}
              alt="Benjamin Kurtz"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* VIDEO — main, full, slightly offset right via flex margin */}
        <div className="flex-1 lg:max-w-[58%] lg:ml-[2%] self-end">
          <VimeoGlassEmbed
            src={hero.vimeoEmbedUrl}
            title="Intro Regression — Benjamin Kurtz"
          />
        </div>

        {/* Portrait RIGHT — partially cropped ("im Anschnitt") by overflow-hidden */}
        <div className="hidden lg:block w-[14%] flex-shrink-0 self-end -mr-4 pb-8">
          <div className="aspect-[2/3] rounded-l overflow-hidden">
            <LazyImage
              src={r2(portraits.p24)}
              alt=""
              className="w-full h-full object-cover object-center scale-110"
            />
          </div>
        </div>
      </div>

      {/* ── CTA ROW — bottom ── */}
      <div className="px-8 md:px-14 lg:px-20 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <CtaButton label={hero.ctaPrimary} variant="primary" />
        <CtaButton
          label={hero.ctaSecondary}
          variant="ghost"
          onClick={() => document.getElementById('podcast')?.scrollIntoView({ behavior: 'smooth' })}
        />
        <span className="sm:ml-auto font-sans text-xs text-brand-muted/70 tracking-wide">
          {hero.subline}
        </span>
      </div>
    </section>
  )
}
