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
            className="inline text-brand-deep"
            style={{ fontSize: 'clamp(2.4rem, 6.6vw, 5.4rem)' }}
          >
            {hero.headlineLine1}&nbsp;
          </span>
          <span
            className="inline italic text-brand-deep/70"
            style={{ fontSize: 'clamp(1.44rem, 3.84vw, 3.36rem)' }}
          >
            {hero.headlineLine2}
          </span>
        </div>
        {/* Second line — right-aligned, same size as headlineLine2, same color as headlineLine1 */}
        <p
          className="text-right font-serif italic text-brand-deep mt-2"
          style={{ fontSize: 'clamp(1.44rem, 3.84vw, 3.36rem)' }}
        >
          {hero.heroCta}
        </p>
      </div>

      {/* VIDEO — R2 Cloudflare, constrained to page content width */}
      <div className="px-8 md:px-14 lg:px-20 w-full">
        <div className="max-w-content mx-auto">
          <CustomVideoPlayer
            type="r2"
            src={hero.videoUrl}
            className="h-full"
          />
        </div>
      </div>

      {/* Scroll arrow — 4x bigger, right at video bottom */}
      <div className="pt-2 pb-6 flex justify-center" data-testid="hero-cta-scroll">
        <button
          onClick={handleScrollDown}
          aria-label="Nach unten scrollen"
          className="flex flex-col items-center gap-3 opacity-35 hover:opacity-65 transition-opacity duration-300"
        >
          <div className="w-[2px] h-36 bg-brand-deep" style={{ animation: 'scrollFade 2s ease-in-out infinite' }} />
          <ChevronDown size={80} className="text-brand-deep" style={{ animation: 'scrollFade 2s ease-in-out infinite 0.4s' }} />
        </button>
      </div>
    </section>
  )
}
