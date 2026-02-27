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

      {/* HEADLINE — one line: big + small */}
      <div className="pt-24 pb-3 px-8 md:px-14 lg:px-20 flex-shrink-0">
        <div className="font-serif tracking-tight leading-none">
          <span
            className="inline uppercase text-brand-deep"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)' }}
          >
            {hero.headlineLine1}&nbsp;
          </span>
          <span
            className="inline italic text-brand-deep/70"
            style={{ fontSize: 'clamp(1.2rem, 3.2vw, 2.8rem)' }}
          >
            {hero.headlineLine2}
          </span>
        </div>
        {/* Second line — right-aligned */}
        <p
          className="text-right font-serif italic text-brand-deep/50 mt-2"
          style={{ fontSize: 'clamp(0.75rem, 1.6vw, 1.1rem)' }}
        >
          {hero.heroCta}
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

      {/* Scroll arrow — bigger, centered, directly below video */}
      <div className="py-6 flex justify-center" data-testid="hero-cta-scroll">
        <button
          onClick={handleScrollDown}
          aria-label="Nach unten scrollen"
          className="flex flex-col items-center gap-2 opacity-35 hover:opacity-65 transition-opacity duration-300"
        >
          <div className="w-px h-10 bg-brand-deep" style={{ animation: 'scrollFade 2s ease-in-out infinite' }} />
          <ChevronDown size={26} className="text-brand-deep" style={{ animation: 'scrollFade 2s ease-in-out infinite 0.4s' }} />
        </button>
      </div>
    </section>
  )
}
