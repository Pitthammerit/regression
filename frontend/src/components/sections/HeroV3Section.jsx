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

      {/* HEADLINE — flush with video frame */}
      <div className="pt-24 pb-1 px-8 md:px-14 lg:px-20 flex-shrink-0">
        <div className="max-w-content mx-auto">
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
          {/* Second line — right-aligned, tight spacing */}
          <p
            className="text-right font-serif italic text-brand-deep mt-0.5"
            style={{ fontSize: 'clamp(1.44rem, 3.84vw, 3.36rem)' }}
          >
            {hero.heroCta}
          </p>
        </div>
      </div>

      {/* VIDEO — same max-width as headline */}
      <div className="px-8 md:px-14 lg:px-20 w-full">
        <div className="max-w-content mx-auto">
          <CustomVideoPlayer
            type="r2"
            src={hero.videoUrl}
            className="h-full"
            onVideoEnded={handleScrollDown}
          />
        </div>
      </div>

      {/* Arrow — no line, directly below video */}
      <div className="px-8 md:px-14 lg:px-20 pt-3 pb-4">
        <div className="max-w-content mx-auto flex justify-center" data-testid="hero-cta-scroll">
          <button
            onClick={handleScrollDown}
            aria-label="Nach unten scrollen"
            className="opacity-35 hover:opacity-65 transition-opacity duration-300"
          >
            <ChevronDown
              size={80}
              className="text-brand-deep"
              style={{ animation: 'scrollFade 2s ease-in-out infinite' }}
            />
          </button>
        </div>
      </div>
    </section>
  )
}
