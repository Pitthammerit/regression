import React from 'react'
import { evidence } from '../../content/plr-de'
import LazyImage from '../ui/LazyImage'

export default function EvidenceSection() {
  const authorities = evidence.authorities

  return (
    <section
      id="evidence"
      data-testid="evidence-section"
      className="py-20 md:py-28 bg-brand-deep text-white relative overflow-hidden"
    >
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 bg-paper opacity-20 pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-sans text-xs uppercase tracking-[0.2em] text-brand-steel/80 mb-4">
            {evidence.authorityBigLabel}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
            {evidence.authorityHeadline}
          </h2>
        </div>

        {/* Four Portraits with English Quotes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {authorities.map((authority) => {
            const portraitUrl = {
              'ian-stevenson': 'https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/authors/Ian_Stevenson_3_beige.jpg',
              'brian-weiss': 'https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/authors/brian-weiss_350.jpg',
              'roger-woolger': 'https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/authors/roger_woolger.jpg',
            }[authority.id]

            return (
              <div key={authority.id} className="flex flex-col items-center text-center">
                {/* Portrait - Square or Placeholder */}
                {portraitUrl ? (
                  <div className="aspect-square w-full max-w-[240px] mb-6 overflow-hidden rounded-sm bg-brand-dark/50">
                    <LazyImage
                      src={portraitUrl}
                      alt={authority.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="aspect-square w-full max-w-[240px] mb-6 flex items-center justify-center bg-brand-dark/30 rounded-sm border border-white/10">
                    <p className="font-serif text-xl text-white/90 italic text-center px-4">
                      {authority.name}
                    </p>
                  </div>
                )}

                {/* English Quote */}
                <blockquote className="font-serif text-base md:text-lg text-white/90 leading-snug mb-4 italic">
                  "{authority.quote}"
                </blockquote>

                {/* Name & Role & Dates */}
                <div className="font-sans text-sm text-brand-steel">
                  <span className="font-semibold">— {authority.name}</span>
                  {authority.dates && (
                    <span className="block text-xs text-white/50 italic mt-1">{authority.dates}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* German Flowing Text Section */}
        <div className="space-y-8 md:space-y-10 mb-16">
          {authorities.map((authority) => (
            <div key={authority.id}>
              <p className="font-serif text-xl md:text-2xl text-white font-semibold mb-3">
                {authority.name}
              </p>
              <p className="font-sans text-white/70 text-sm uppercase tracking-wider mb-4">
                {authority.role}
              </p>
              <p className="font-serif text-base md:text-lg text-white/80 leading-relaxed max-w-4xl">
                {authority.longVersion}
              </p>
            </div>
          ))}
        </div>

        {/* Journal of Regression Therapy */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start max-w-4xl">
          {/* Journal Image */}
          <div className="w-full md:w-1/3 aspect-[3/4] max-w-[200px] overflow-hidden rounded-sm bg-brand-dark/50 shrink-0">
            <LazyImage
              src={evidence.journal.portrait}
              alt={evidence.journal.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Journal Text */}
          <div className="flex-1">
            <a
              href={evidence.journal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block"
            >
              <p className="font-serif text-xl md:text-2xl text-white font-semibold mb-3 group-hover:text-brand-green transition-colors">
                {evidence.journal.name}
              </p>
            </a>
            <p className="font-sans text-white/70 text-sm uppercase tracking-wider mb-4">
              {evidence.journal.role}
            </p>
            <p className="font-serif text-lg md:text-xl text-white/80 leading-relaxed">
              {evidence.journal.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
