import React from 'react'
import { hero } from "../../content"
import CtaButton from '../ui/CtaButton'
import VimeoGlassEmbed from '../ui/VimeoGlassEmbed'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-28 pb-16 md:pb-24" data-testid="hero-section">
      <div className="max-w-content mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left: Headline + CTAs */}
          <div>
            <p className="font-primary text-label text-color-secondary mb-8">
              {hero.label}
            </p>
            <h1 className="font-serif leading-[1.0] mb-8">
              <span className="block text-6xl md:text-7xl lg:text-8xl uppercase text-color-primary tracking-tight">
                {hero.headlineLine1}
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl italic text-color-primary">
                {hero.headlineLine2}
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-color-text mt-3 font-light">
                {hero.headlineLine3}
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl italic text-brand-muted font-light">
                {hero.headlineLine4}
              </span>
            </h1>
            <p className="font-primary text-brand-muted text-base leading-relaxed mb-10 max-w-xs">
              {hero.subline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CtaButton label={hero.ctaPrimary} variant="primary" />
              <CtaButton
                label={hero.ctaSecondary}
                variant="ghost"
                onClick={() => document.getElementById('podcast')?.scrollIntoView({ behavior: 'smooth' })}
              />
            </div>
          </div>

          {/* Right: Vimeo — loads only on click, no autoload */}
          <VimeoGlassEmbed
            src={hero.vimeoEmbedUrl}
            title="Intro Regression — Benjamin Kurtz"
            variant="compact"
            testId="hero-glass-play"
          />
        </div>
      </div>
    </section>
  )
}
