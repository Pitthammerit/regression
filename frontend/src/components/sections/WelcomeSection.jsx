import React from 'react'
import { useContent } from '../../contexts/ContentContext'
import LazyImage from '../ui/LazyImage'
import DebugLabel from '../ui/DebugLabel'

export default function WelcomeSection({ debugMode = false }) {
  const { welcome } = useContent()

  return (
    <section id="welcome" data-testid="welcome-section" className="h-screen flex items-center snap-section">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] card-grid-gap-sm md:card-grid-gap-lg items-center">

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
          <div className="flex flex-col justify-center">
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
            <div className="mt-2">
              <DebugLabel type="typography-handwriting" debugMode={debugMode}>
                <p className="typography-handwriting">
                  {welcome.author}
                </p>
              </DebugLabel>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
