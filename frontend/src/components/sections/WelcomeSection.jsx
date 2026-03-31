import React from 'react'
import { useContent } from '../../contexts/ContentContext'
import SectionWrapper from '../ui/SectionWrapper'
import LazyImage from '../ui/LazyImage'
import DebugLabel from '../ui/DebugLabel'

export default function WelcomeSection({ debugMode = false }) {
  const { welcome } = useContent()

  return (
    <SectionWrapper id="welcome" data-testid="welcome-section">
      <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-10 md:gap-16 items-start">

        {/* Left: Circular portrait + greeting directly below */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden flex-shrink-0 border border-color-primary">
            <LazyImage
              src={welcome.imageUrl}
              alt={welcome.author}
              className="w-full h-full object-cover object-top scale-[1.03]"
            />
          </div>
          {/* Greeting directly under photo */}
          <DebugLabel type="typography-handwriting" debugMode={debugMode}>
            <p className="typography-handwriting text-center md:text-left whitespace-pre-line">
              {welcome.headline}
            </p>
          </DebugLabel>
        </div>

        {/* Right: Body text + signature */}
        <div className="flex flex-col justify-center pt-2">
          <DebugLabel type="typography-hero-large" debugMode={debugMode}>
            <span
              className="typography-hero-large leading-none block mb-0 select-none"
              aria-hidden="true"
            >
              "
            </span>
          </DebugLabel>

          <div className="space-y-5 -mt-4">
            {welcome.quoteLines.map((line, i) => (
              <DebugLabel key={i} type="typography-quote-featured" debugMode={debugMode}>
                <p className="typography-quote-featured">
                  {line}
                </p>
              </DebugLabel>
            ))}
          </div>

          {/* Signature — handwriting text */}
          <div className="mt-8">
            <DebugLabel type="typography-handwriting" debugMode={debugMode}>
              <p className="typography-handwriting text-h2-hand">
                {welcome.author}
              </p>
            </DebugLabel>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
