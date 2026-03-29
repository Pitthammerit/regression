import React from 'react'
import { welcome } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import LazyImage from '../ui/LazyImage'
import DebugLabel from '../ui/DebugLabel'

export default function WelcomeSectionCopy({ debugMode = false }) {
  return (
    <SectionWrapper id="welcome" data-testid="welcome-section">
      <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-10 md:gap-16 items-start">

        {/* Left: Circular portrait + greeting directly below */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-color-bg-light shadow-lg">
            <LazyImage
              src={welcome.imageUrl}
              alt={welcome.author}
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Greeting directly under photo */}
          <DebugLabel type="h3-hand" debugMode={debugMode}>
            <p className="font-handwriting text-h3-hand text-color-heading text-center md:text-left leading-snug whitespace-pre-line">
              {welcome.headline}
            </p>
          </DebugLabel>
        </div>

        {/* Right: Body text + signature */}
        <div className="flex flex-col justify-center pt-2">
          <DebugLabel type="hero-large" debugMode={debugMode}>
            <span
              className="font-secondary text-hero-large text-color-heading leading-none block mb-0 select-none"
              aria-hidden="true"
            >
              "
            </span>
          </DebugLabel>

          <div className="space-y-5 -mt-4">
            {welcome.quoteLines.map((line, i) => (
              <DebugLabel key={i} type="quote-featured" debugMode={debugMode}>
                <p
                  className="font-secondary text-quote-featured text-color-heading leading-tight"
                >
                  {line}
                </p>
              </DebugLabel>
            ))}
          </div>

          {/* Signature — handwriting text */}
          <div className="mt-8">
            <DebugLabel type="h2-hand" debugMode={debugMode}>
              <p className="font-handwriting text-h2-hand text-color-heading">
                {welcome.author}
              </p>
            </DebugLabel>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
