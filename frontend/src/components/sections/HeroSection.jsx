import React, { useState } from 'react'
import { Play } from 'lucide-react'
import { hero } from '../../content/plr-de'
import CtaButton from '../ui/CtaButton'

function VimeoGlassEmbed({ src, title }) {
  const [started, setStarted] = useState(false)
  const embedSrc = `${src}?badge=0&autopause=0&player_id=0&app_id=58479${started ? '&autoplay=1' : ''}`

  return (
    <div className="relative rounded overflow-hidden shadow-lg bg-brand-dark">
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
            data-testid="hero-glass-play"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/50 to-brand-dark/70" />
            <button className="relative z-10 w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/35 flex items-center justify-center hover:bg-white/25 hover:scale-105 transition-all duration-300 shadow-2xl" aria-label="Video abspielen">
              <Play size={28} className="text-white ml-1" fill="white" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-28 pb-16 md:pb-24" data-testid="hero-section">
      <div className="max-w-content mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left: Headline + CTAs */}
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-brand-steel mb-8">
              {hero.label}
            </p>
            <h1 className="font-serif leading-[1.0] mb-8">
              <span className="block text-6xl md:text-7xl lg:text-8xl uppercase text-brand-deep tracking-tight">
                {hero.headlineLine1}
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl italic text-brand-deep">
                {hero.headlineLine2}
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-brand-body mt-3 font-light">
                {hero.headlineLine3}
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl italic text-brand-muted font-light">
                {hero.headlineLine4}
              </span>
            </h1>
            <p className="font-sans text-brand-muted text-base leading-relaxed mb-10 max-w-xs">
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
          />
        </div>
      </div>
    </section>
  )
}
