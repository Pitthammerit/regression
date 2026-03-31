import React, { useState, useEffect } from 'react'
import { booking } from "../../content"
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import { ChevronDown } from 'lucide-react'

export default function BookingSection() {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const embedCode = process.env.REACT_APP_CALENDAR_EMBED

  // Listen for global 'booking:open' event (dispatched by CtaButton)
  useEffect(() => {
    const handler = () => setCalendarOpen(true)
    window.addEventListener('booking:open', handler)
    return () => window.removeEventListener('booking:open', handler)
  }, [])

  return (
    <SectionWrapper id="booking" data-testid="booking-section">
      <div className="max-w-2xl mx-auto text-center">
        <SectionLabel text={booking.label} />
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-heading mb-6 leading-tight">
          {booking.headline}
        </h2>
        <p className="font-primary text-body text-base leading-[1.8] mb-10 max-w-lg mx-auto">
          {booking.subline}
        </p>

        {/* Topics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10 text-left max-w-xl mx-auto">
          {booking.formTopics.map((topic, i) => (
            <div key={i} className="flex items-start gap-2 font-primary text-sm text-body">
              <span className="text-heading/50 mt-0.5 shrink-0">—</span>
              {topic}
            </div>
          ))}
        </div>

        {/* Accordion CTA button */}
        <button
          onClick={() => setCalendarOpen(!calendarOpen)}
          className="inline-flex items-center gap-3 uppercase tracking-widest text-sm font-primary py-4 px-12 rounded-full bg-brand-deep text-white hover:bg-brand-steel transition-colors duration-200"
          data-testid="booking-cta-button"
        >
          {booking.directBookingCta}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${calendarOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Inline Calendar Accordion */}
        <div
          className={`overflow-hidden transition-all duration-500 ${calendarOpen ? 'max-h-[900px] mt-8' : 'max-h-0'}`}
          data-testid="booking-calendar-accordion"
        >
          <div className="rounded-2xl border border-brand-sand bg-white/50 p-8 text-left">
            {embedCode ? (
              <iframe
                src={embedCode}
                className="w-full min-h-[600px] border-0 rounded-xl"
                title="Intro-Call buchen"
                data-testid="booking-iframe"
              />
            ) : (
              <div className="min-h-[300px] flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-12 h-px bg-brand-deep/20" />
                <p className="font-primary text-sm text-body">
                  Kalender-Embed wird hier eingebettet.
                </p>
                <p className="font-primary text-xs text-label/60 max-w-xs">
                  Sobald du den Embed-Code bereitstellst, erscheint hier das Buchungsformular direkt auf der Seite.
                </p>
                <div className="w-12 h-px bg-brand-deep/20" />
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
