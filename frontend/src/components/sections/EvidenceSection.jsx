import React, { useState } from 'react'
import { whatIs, testimonials } from '../../content/plr-de'
import { ChevronDown } from 'lucide-react'

export default function EvidenceSection() {
  const [openIndex, setOpenIndex] = useState(null)

  // Combine skepticContent with authorityQuotes for full evidence list
  const evidenceItems = [
    ...whatIs.skepticContent.map(item => ({
      name: item.name,
      role: item.role,
      quote: item.text,
      isGerman: true,
    })),
    ...testimonials.authorityQuotes.map(item => ({
      name: item.name,
      role: item.role,
      quote: item.quote,
      isGerman: false,
    })),
  ]

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
        <div className="max-w-3xl mb-12">
          <div className="font-sans text-xs uppercase tracking-[0.2em] text-brand-steel/80 mb-4">
            {testimonials.authorityBigLabel}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
            {testimonials.authorityHeadline}
          </h2>
          <p className="font-sans text-lg text-white/70 leading-relaxed max-w-2xl">
            {testimonials.authorityLabel} — Die Wissenschaft spricht eine klare Sprache.
          </p>
        </div>

        {/* Evidence Accordion */}
        <div className="divide-y divide-white/10">
          {evidenceItems.map((item, i) => (
            <div key={i} className="border-l-2 border-brand-steel/30 hover:border-brand-steel/60 transition-colors">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-6 md:py-8 text-left group"
                data-testid={`evidence-accordion-${i}`}
              >
                <div className="flex-1">
                  <p className="font-sans text-sm uppercase tracking-[0.15em] text-brand-steel mb-2">
                    {item.role}
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-white group-hover:text-brand-steel transition-colors leading-snug">
                    {item.name}
                  </p>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-brand-steel mt-1 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${openIndex === i ? 'max-h-[500px] pb-6' : 'max-h-0'}`}>
                <blockquote className="font-serif text-xl md:text-2xl text-white/90 leading-relaxed pl-6 border-l-4 border-brand-steel italic">
                  "{item.quote}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom hint */}
        <div className="mt-12 flex items-center gap-2 font-sans text-sm text-brand-steel/60 italic">
          <span className="text-base">↓</span>
          <span>Klicke auf die Namen, um die vollständigen Statements zu lesen</span>
        </div>
      </div>
    </section>
  )
}
