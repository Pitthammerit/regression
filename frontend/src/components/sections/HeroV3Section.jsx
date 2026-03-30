import React from 'react'
import { hero } from '../../content/plr-de'
import CustomVideoPlayer from '../ui/CustomVideoPlayer'
import DebugLabel from '../ui/DebugLabel'
import { ChevronDown } from 'lucide-react'
import { scrollPresets } from '../../utils/scrollAnimations'

export default function HeroV3Section({ debugMode = false }) {
  const handleScrollDown = () => {
    // Medium-fast scroll (1200ms) with 500ms delay, scroll to welcome section
    scrollPresets.normal('#welcome', { delay: 500, offset: 80 })
  }

  return (
    <section id="hero" className="flex flex-col overflow-hidden relative" data-testid="hero-section">

      {/* HEADLINE — spacing to video */}
      <div className="pt-24 pb-6 px-8 md:px-14 lg:px-20 flex-shrink-0">
        <div className="max-w-content mx-auto text-center">
          <div className="font-secondary tracking-tight leading-none">
            <DebugLabel type="hero-large" debugMode={debugMode}>
              <span className="text-hero-large text-color-primary inline">
                {hero.headlineLine1}&nbsp;
              </span>
            </DebugLabel>
            <DebugLabel type="hero" debugMode={debugMode}>
              <span className="text-hero text-color-primary/70 inline italic">
                {hero.headlineLine2}
              </span>
            </DebugLabel>
          </div>

        </div>
      </div>

      {/* VIDEO — 20% smaller (783px instead of 979px) */}
      <div className="px-8 md:px-14 lg:px-20 w-full">
        <div className="max-w-[783px] mx-auto">
          <CustomVideoPlayer
            type="r2"
            src={hero.videoUrl}
            poster={hero.posterUrl}
            className="h-full"
            onVideoEnded={handleScrollDown}
            enterFullscreenOnClick
            exitFullscreenAtTime={86}
          />
        </div>
      </div>

      {/* CTA — centered below video */}
      <div className="px-8 md:px-14 lg:px-20 pt-6">
        <div className="max-w-[783px] mx-auto text-center">
          <DebugLabel type="hero" debugMode={debugMode}>
            <p className="font-secondary italic text-color-primary text-hero">
              {hero.heroCta}
            </p>
          </DebugLabel>
        </div>
      </div>

      {/* Arrow */}
      <div className="px-8 md:px-14 lg:px-20 pt-3 pb-4">
        <div className="max-w-[783px] mx-auto flex justify-center" data-testid="hero-cta-scroll">
          <button
            onClick={handleScrollDown}
            aria-label="Nach unten scrollen"
            className="opacity-50 hover:opacity-80 transition-opacity duration-300"
          >
            <ChevronDown
              className="w-20 h-20 text-color-primary animate-pulse-down"
            />
          </button>
        </div>
      </div>
    </section>
  )
}
