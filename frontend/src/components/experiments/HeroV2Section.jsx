import React from 'react'
import { hero } from '../../content/plr-de'
import CtaButton from '../ui/CtaButton'
import VimeoGlassEmbed from '../ui/VimeoGlassEmbed'

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
          <span className="block text-6xl md:text-7xl lg:text-8xl uppercase text-brand-deep tracking-tight">
            {hero.headlineLine1}
          </span>
          <span className="block text-5xl md:text-6xl lg:text-7xl italic text-brand-deep">
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
          showTitleOverlay
          shadowSize="2xl"
          testId="vimeo-glass-play"
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
      <p className="font-sans text-brand-muted text-sm tracking-wide text-center">
        {hero.subline}
      </p>
    </section>
  )
}
