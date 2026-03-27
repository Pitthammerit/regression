import React from 'react'
import { hero } from '../../content/plr-de'
import CustomVideoPlayer from '../ui/CustomVideoPlayer'
import DebugLabel from '../ui/DebugLabel'
import { ChevronDown } from 'lucide-react'

export default function HeroV3Section({ debugMode = false }) {
  const handleScrollDown = () => {
    const next = document.querySelector('#services')
    if (next) next.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="flex flex-col overflow-hidden relative" data-testid="hero-section">

      {/* HEADLINE — flush with video frame */}
      <div className="pt-24 pb-1 px-8 md:px-14 lg:px-20 flex-shrink-0">
        <div className="max-w-content mx-auto">
          <div className="font-display tracking-tight leading-none">
            <DebugLabel type="hero-large" debugMode={debugMode}>
              <span className="text-hero-large text-color-heading inline">
                {hero.headlineLine1}&nbsp;
              </span>
            </DebugLabel>
            <DebugLabel type="hero" debugMode={debugMode}>
              <span className="text-hero text-color-heading/70 inline italic">
                {hero.headlineLine2}
              </span>
            </DebugLabel>
          </div>
          {/* Second line — right-aligned, tight spacing */}
          <DebugLabel type="hero" debugMode={debugMode}>
            <p className="text-right font-display italic text-color-heading mt-0.5 text-hero">
              {hero.heroCta}
            </p>
          </DebugLabel>
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
              className="w-20 h-20 text-color-heading animate-[scrollFade_2s_ease-in-out_infinite]"
            />
          </button>
        </div>
      </div>
    </section>
  )
}
