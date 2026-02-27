import React from 'react'
import { welcome } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import LazyImage from '../ui/LazyImage'

export default function WelcomeSection() {
  return (
    <SectionWrapper id="welcome" data-testid="welcome-section">
      <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-10 md:gap-16 items-center">

        {/* Left: Circular portrait */}
        <div className="flex justify-center md:justify-start">
          <div
            className="w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-brand-sand shadow-lg"
          >
            <LazyImage
              src={welcome.imageUrl}
              alt={welcome.author}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Right: Quote */}
        <div>
          {/* Opening quote mark */}
          <span
            className="font-serif text-brand-deep/15 leading-none block mb-1 select-none"
            style={{ fontSize: '6rem', lineHeight: 1 }}
            aria-hidden="true"
          >
            "
          </span>

          <blockquote className="space-y-4">
            {welcome.quoteLines.map((line, i) => (
              <p
                key={i}
                className={`font-serif leading-relaxed ${
                  i === 0
                    ? 'text-xl md:text-2xl text-brand-deep font-medium'
                    : 'text-lg md:text-xl italic text-brand-body/80'
                }`}
              >
                {line}
              </p>
            ))}
          </blockquote>

          <footer className="mt-8 flex items-center gap-3">
            <div className="w-8 h-px bg-brand-steel/40" />
            <span className="font-sans text-sm tracking-[0.2em] uppercase text-brand-steel">
              {welcome.author}
            </span>
          </footer>
        </div>
      </div>
    </SectionWrapper>
  )
}
