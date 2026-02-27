import React from 'react'
import { testimonials } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'

export default function TestimonialsSection() {
  return (
    <div id="testimonials" data-testid="testimonials-section">

      {/* Authority Quotes — dark navy bg */}
      <div className="bg-brand-deep py-16 md:py-20">
        <div className="max-w-content mx-auto px-6">
          {/* New header: EVIDENZBASIERT label + big title */}
          <SectionLabel text={testimonials.authorityBigLabel} light />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mt-3 mb-12">
            {testimonials.authorityHeadline}
          </h2>
          <div className="grid md:grid-cols-3 gap-10 md:gap-14">
            {testimonials.authorityQuotes.map((q, i) => (
              <div key={i} className="border-t border-white/20 pt-8">
                <blockquote className="font-serif italic text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                  "{q.quote}"
                </blockquote>
                <div className="font-sans text-sm font-medium text-white/70">{q.name}</div>
                <div className="font-sans text-xs text-white/40 mt-0.5">{q.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Cards — parchment bg */}
      <div className="py-16 md:py-20">
        <div className="max-w-content mx-auto px-6">
          <SectionLabel text={testimonials.clientLabel} />
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {testimonials.clientPlaceholder.map((c, i) => (
              <div
                key={i}
                className="bg-white/50 rounded-2xl p-8 md:p-10 border border-brand-sand"
                data-testid={`testimonial-card-${i}`}
              >
                <blockquote className="font-serif italic text-xl md:text-2xl text-brand-body leading-relaxed mb-8">
                  "{c.quote}"
                </blockquote>
                <div className="font-sans text-sm font-medium text-brand-deep">{c.name}</div>
                <div className="font-sans text-xs text-brand-steel mt-0.5">{c.context}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
