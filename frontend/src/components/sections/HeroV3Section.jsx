import React from 'react'
import { hero } from '../../content/plr-de'
import CustomVideoPlayer from '../ui/CustomVideoPlayer'
import { ChevronDown } from 'lucide-react'

export default function HeroV3Section() {
  const handleScrollDown = () => {
    const next = document.querySelector('#services')
    if (next) next.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="flex flex-col overflow-hidden relative" data-testid="hero-section">

      {/* HEADLINE */}
      <div className="pt-28 pb-6 px-8 md:px-14 lg:px-20 flex-shrink-0">
        <h1 className="font-serif tracking-tight leading-none">
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
        </h1>
        {/* Subline directly below headline */}
        <p className="font-sans text-sm text-brand-muted/70 leading-relaxed mt-3 pl-0.5">
          {hero.subline}
        </p>
      </div>

      {/* VIDEO — R2 Cloudflare */}
      <div className="flex-1 px-8 md:px-14 lg:px-20 min-h-[300px] md:min-h-[380px]">
        <CustomVideoPlayer
          type="r2"
          src={hero.videoUrl}
          className="h-full"
        />
      </div>

      {/* CTA below video — centered with scroll arrow */}
      <div className="py-10 flex flex-col items-center gap-4" data-testid="hero-cta-scroll">
        <p className="font-serif italic text-brand-deep/80" style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)' }}>
          {hero.heroCta}
        </p>
        <button
          onClick={handleScrollDown}
          aria-label="Nach unten scrollen"
          className="flex flex-col items-center gap-1 opacity-40 hover:opacity-70 transition-opacity duration-300"
        >
          <div className="w-px h-8 bg-brand-deep" style={{ animation: 'scrollFade 2s ease-in-out infinite' }} />
          <ChevronDown size={16} className="text-brand-deep" style={{ animation: 'scrollFade 2s ease-in-out infinite 0.4s' }} />
        </button>
      </div>
    </section>
  )
}
