import React from 'react'
import { testimonials } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'

export default function TestimonialsSection() {
  const [anna, ...rest] = testimonials.clients
  // rest = [Alexander, Arthur, Hernan]
  const [alexander, arthur, hernan] = rest

  return (
    <div id="testimonials" data-testid="testimonials-section">

      {/* Authority Quotes — dark navy bg */}
      <div className="bg-brand-deep py-16 md:py-20">
        <div className="max-w-content mx-auto px-6">
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

      {/* Client Testimonials */}
      <div className="py-16 md:py-20">
        <div className="max-w-content mx-auto px-6">
          <SectionLabel text={testimonials.clientLabel} />

          {/*
            Layout:
            Desktop — 3 columns:
              Col 1: Anna (row-span-2, tall)
              Col 2 row 1: Alexander  |  Col 2 row 2: Hernan
              Col 3 row 1: Arthur     |  Col 3 row 2: (empty — reserved for 5th)
            Mobile — single column stack: Anna → Alexander → Arthur → Hernan
          */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">

            {/* Anna — left, full height */}
            <div
              className="md:row-span-2 bg-white/50 rounded-2xl p-8 border border-brand-sand flex flex-col justify-between"
              data-testid="testimonial-card-0"
            >
              <blockquote className="font-serif italic text-lg text-brand-body leading-relaxed mb-8">
                „{anna.quote}"
              </blockquote>
              <div className="flex items-center gap-4 mt-auto">
                {anna.image && (
                  <LazyImage
                    src={anna.image}
                    alt={anna.name}
                    className="w-12 h-12 rounded-full object-cover object-top border border-brand-sand shrink-0"
                  />
                )}
                <div>
                  <div className="font-sans text-sm font-medium text-brand-deep">{anna.name}</div>
                  <div className="font-sans text-xs text-brand-steel mt-0.5">{anna.context}</div>
                </div>
              </div>
            </div>

            {/* Alexander — top center */}
            <TestimonialCard c={alexander} index={1} />

            {/* Arthur — top right */}
            <TestimonialCard c={arthur} index={3} />

            {/* Hernan — bottom center */}
            <TestimonialCard c={hernan} index={2} />

            {/* Empty slot — bottom right, reserved for 5th testimonial */}
            <div className="hidden md:block rounded-2xl border border-dashed border-brand-sand/50" />

          </div>
        </div>
      </div>

    </div>
  )
}

function TestimonialCard({ c, index }) {
  return (
    <div
      className="bg-white/50 rounded-2xl p-8 border border-brand-sand flex flex-col justify-between"
      data-testid={`testimonial-card-${index}`}
    >
      <blockquote className="font-serif italic text-lg text-brand-body leading-relaxed mb-8">
        „{c.quote}"
      </blockquote>
      <div className="flex items-center gap-4 mt-auto">
        {c.image && (
          <LazyImage
            src={c.image}
            alt={c.name}
            className="w-12 h-12 rounded-full object-cover border border-brand-sand shrink-0"
          />
        )}
        <div>
          <div className="font-sans text-sm font-medium text-brand-deep">{c.name}</div>
          <div className="font-sans text-xs text-brand-steel mt-0.5">{c.context}</div>
        </div>
      </div>
    </div>
  )
}
