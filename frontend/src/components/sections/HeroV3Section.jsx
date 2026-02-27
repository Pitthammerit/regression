import React, { useState } from 'react'
import { Play } from 'lucide-react'
import { hero } from '../../content/plr-de'
import CustomVideoPlayer from '../ui/CustomVideoPlayer'
import { ChevronDown } from 'lucide-react'

export default function HeroV3Section() {
  return (
    <section id="hero" className="flex flex-col overflow-hidden relative" data-testid="hero-section">

      {/* HEADLINE + SUBLINE ROW */}
      <div className="pt-28 pb-6 px-8 md:px-14 lg:px-20 flex-shrink-0">
        <div className="flex items-end justify-between gap-8 md:gap-16">

          {/* Left: Big editorial headline */}
          <h1 className="font-serif tracking-tight leading-none flex-shrink-0">
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
            <span
              className="block font-sans font-light text-brand-muted mt-2 pl-0.5"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)', lineHeight: 1.1 }}
            >
              {hero.headlineLine3} {hero.headlineLine4}
            </span>
          </h1>

          {/* Right: Subline text — desktop only */}
          <p className="hidden md:block font-sans text-sm text-brand-muted/70 leading-relaxed text-right max-w-[220px] pb-2 flex-shrink-0">
            {hero.subline}
          </p>
        </div>
      </div>

      {/* VIDEO — R2 Cloudflare */}
      <div className="flex-1 px-8 md:px-14 lg:px-20 min-h-[300px] md:min-h-[380px]">
        <CustomVideoPlayer
          type="r2"
          src={hero.videoUrl}
          className="h-full"
        />
      </div>

      {/* Scroll Indicator */}
      <div className="px-8 md:px-14 lg:px-20 py-8 flex items-center justify-end">
        <div className="flex flex-col items-center gap-1" style={{ opacity: 0.35 }}>
          <div className="w-px h-8 bg-brand-deep" style={{ animation: 'scrollFade 2s ease-in-out infinite' }} />
          <ChevronDown size={13} className="text-brand-deep" style={{ animation: 'scrollFade 2s ease-in-out infinite 0.4s' }} />
        </div>
      </div>
    </section>
  )
}
