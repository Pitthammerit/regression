import React from 'react'
import { welcome } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import LazyImage from '../ui/LazyImage'

export default function WelcomeSection() {
  return (
    <SectionWrapper id="welcome" data-testid="welcome-section">
      <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-10 md:gap-16 items-start">

        {/* Left: Circular portrait + greeting directly below */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-brand-sand shadow-lg">
            <LazyImage
              src={welcome.imageUrl}
              alt={welcome.author}
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Greeting directly under photo */}
          <p className="font-serif text-2xl md:text-3xl text-brand-deep text-center md:text-left leading-snug">
            {welcome.quoteLines[0]}
          </p>
        </div>

        {/* Right: Body text + signature */}
        <div className="flex flex-col justify-center pt-2">
          <span
            className="font-serif text-brand-deep/15 leading-none block mb-0 select-none"
            style={{ fontSize: '5rem', lineHeight: 1 }}
            aria-hidden="true"
          >
            "
          </span>

          <div className="space-y-5 -mt-4">
            {welcome.quoteLines.slice(1).map((line, i) => (
              <p
                key={i}
                className="font-serif italic text-xl md:text-2xl lg:text-3xl text-brand-body/80 leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Signature image */}
          <div className="mt-8">
            <img
              src={welcome.signatureUrl}
              alt={welcome.author}
              className="h-14 md:h-16 object-contain object-left opacity-80"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
