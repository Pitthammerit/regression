import React, { useState } from 'react'
import { rogerWoolger } from "../../content"
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'

export default function RogerWoolgerSection() {
  const [showFullBio, setShowFullBio] = useState(false)

  return (
    <SectionWrapper id="roger-woolger" data-testid="roger-woolger-section">
      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* Left: Portrait photo */}
        <div className="md:sticky md:top-28 order-2 md:order-1">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-brand-deep/5 max-w-sm mx-auto md:mx-0">
            <LazyImage
              src={rogerWoolger.portrait}
              alt="Roger Woolger"
              className="w-full h-full object-cover object-top"
              fallback={
                <div className="w-full h-full flex items-center justify-center text-brand-muted font-serif text-xl">
                  {rogerWoolger.label}
                </div>
              }
            />
          </div>

          {/* Source link */}
          {rogerWoolger.sourceUrl && (
            <a
              href={rogerWoolger.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm text-brand-steel hover:text-brand-deep transition-colors font-primary"
            >
              <span className="uppercase tracking-wider">{rogerWoolger.sourceLabel}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        {/* Right: Bio content */}
        <div className="order-1 md:order-2">
          <SectionLabel text={rogerWoolger.label} />
          <p className="font-serif text-sm text-brand-steel/80 mb-4">{rogerWoolger.labelSub}</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-deep mb-10 leading-tight">
            {rogerWoolger.headline}
          </h2>

          {/* Short version - always visible */}
          <p className="font-serif text-lg md:text-xl text-brand-body leading-relaxed mb-8">
            {rogerWoolger.shortVersion}
          </p>

          {/* Expand/Collapse button */}
          <button
            onClick={() => setShowFullBio(!showFullBio)}
            className="group inline-flex items-center gap-3 px-6 py-3 bg-brand-deep/5 hover:bg-brand-deep/10 rounded-full transition-all duration-300 mb-8"
            aria-expanded={showFullBio}
          >
            <span className="font-primary text-sm text-brand-deep font-medium">
              {showFullBio ? 'Weniger lesen' : 'Mehr über Roger Woolger'}
            </span>
            <svg
              className={`w-5 h-5 text-brand-deep transition-transform duration-300 ${
                showFullBio ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Long version - accordion */}
          {showFullBio && (
            <div className="animate-fadeIn">
              <div className="prose prose-lg max-w-none">
                {rogerWoolger.longVersion.split('\n\n').map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-serif text-lg md:text-xl text-brand-body leading-relaxed mb-6 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Credentials */}
          <div className="mt-12 pt-10 border-t border-black/10">
            <p className="font-primary text-xs tracking-[0.2em] uppercase text-brand-steel mb-6">
              Ausbildung & Werdegang
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
              {rogerWoolger.credentials.map((cred, i) => (
                <li key={i} className="font-primary text-sm text-brand-muted flex items-start gap-2">
                  <span className="text-brand-deep shrink-0 mt-0.5">—</span>
                  {cred}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
