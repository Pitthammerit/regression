// HeroAlt1 — saved alternative: 2-column layout (Headline left, Video right)
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
        {started && <iframe src={embedSrc} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerPolicy="strict-origin-when-cross-origin" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} title={title} />}
        {!started && (
          <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => setStarted(true)}>
            <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/50 to-brand-dark/70" />
            <button className="relative z-10 w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/35 flex items-center justify-center hover:bg-white/25 hover:scale-105 transition-all duration-300 shadow-2xl"><Play size={28} className="text-white ml-1" fill="white" /></button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function HeroAlt1() {
  return (
    <section className="min-h-screen flex items-center pt-28 pb-16 md:pb-24">
      <div className="max-w-content mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="font-primary text-label text-color-secondary mb-8">{hero.label}</p>
            <h1 className="font-serif leading-[1.0] mb-8">
              <span className="block text-6xl md:text-7xl lg:text-8xl uppercase text-color-primary tracking-tight">{hero.headlineLine1}</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl italic text-color-primary">{hero.headlineLine2}</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-color-text mt-3 font-light">{hero.headlineLine3}</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl italic text-brand-muted font-light">{hero.headlineLine4}</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <CtaButton label={hero.ctaPrimary} variant="primary" />
              <CtaButton label={hero.ctaSecondary} variant="ghost" onClick={() => document.getElementById('podcast')?.scrollIntoView({ behavior: 'smooth' })} />
            </div>
          </div>
          <VimeoGlassEmbed src={hero.vimeoEmbedUrl} title="Intro Regression — Benjamin Kurtz" />
        </div>
      </div>
    </section>
  )
}
