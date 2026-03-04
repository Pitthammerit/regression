// HeroAlt1 — saved alternative: 2-column layout (Headline left, Video right)
import React from 'react'
import { hero } from '../../content/plr-de'
import CtaButton from '../ui/CtaButton'
import VimeoGlassEmbed from '../ui/VimeoGlassEmbed'

export default function HeroAlt1() {
  return (
    <section className="min-h-screen flex items-center pt-28 pb-16 md:pb-24">
      <div className="max-w-content mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-brand-steel mb-8">{hero.label}</p>
            <h1 className="font-serif leading-[1.0] mb-8">
              <span className="block text-6xl md:text-7xl lg:text-8xl uppercase text-brand-deep tracking-tight">{hero.headlineLine1}</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl italic text-brand-deep">{hero.headlineLine2}</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-brand-body mt-3 font-light">{hero.headlineLine3}</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl italic text-brand-muted font-light">{hero.headlineLine4}</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <CtaButton label={hero.ctaPrimary} variant="primary" />
              <CtaButton label={hero.ctaSecondary} variant="ghost" onClick={() => document.getElementById('podcast')?.scrollIntoView({ behavior: 'smooth' })} />
            </div>
          </div>
          <VimeoGlassEmbed src={hero.vimeoEmbedUrl} title="Intro Regression — Benjamin Kurtz" variant="compact" />
        </div>
      </div>
    </section>
  )
}
