import React from 'react'
import { booking } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'

export default function BookingSection() {
  const isEmbed = process.env.REACT_APP_BOOKING_MODE === 'embed'
  const bookingUrl = process.env.REACT_APP_BOOKING_URL || booking.directBookingUrl
  const fluentsUrl = process.env.REACT_APP_FLUENT_FORMS_URL

  return (
    <SectionWrapper id="booking" data-testid="booking-section">
      <div className="max-w-2xl mx-auto text-center">
        <SectionLabel text={booking.label} />
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-deep mb-6 leading-tight">
          {booking.headline}
        </h2>
        <p className="font-sans text-brand-muted text-base leading-[1.8] mb-14 max-w-lg mx-auto">
          {booking.subline}
        </p>

        {isEmbed ? (
          /* State B — Production: Iframe embed */
          <div className="rounded-2xl border border-brand-sand overflow-hidden text-left">
            <iframe
              src={fluentsUrl}
              className="w-full min-h-[600px] border-0"
              title="Intro-Call buchen"
              data-testid="booking-iframe"
            />
          </div>
        ) : (
          /* State A — Prototype: Direct link */
          <div>
            {/* Topics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-14 text-left max-w-xl mx-auto">
              {booking.formTopics.map((topic, i) => (
                <div key={i} className="flex items-start gap-2 font-sans text-sm text-brand-muted">
                  <span className="text-brand-green mt-0.5 shrink-0">—</span>
                  {topic}
                </div>
              ))}
            </div>

            <p className="font-sans text-brand-muted text-sm mb-6">
              {booking.directBookingText}
            </p>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block uppercase tracking-widest text-sm font-sans py-4 px-12 rounded-sm bg-brand-deep text-white hover:bg-brand-steel transition-colors duration-200"
              data-testid="booking-cta-button"
            >
              {booking.directBookingCta}
            </a>
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
