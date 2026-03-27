import { useState, useEffect } from 'react'
import { booking } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import DebugLabel from '../ui/DebugLabel'
import { ChevronDown } from 'lucide-react'

/**
 * BookingSectionCopy — Booking section with typography tokens
 *
 * MIGRATED to design tokens (Single Source of Truth):
 * - Font-family: font-display (headlines), font-primary (body)
 * - Label: text-label (15px) + color-label
 * - Headline: hero-large (clamp 2.4-5.4rem) + color-heading
 * - Subline: text-body (18px) + color-body
 * - Topics: text-body (18px) + color-body
 * - Button: text-label (15px) uppercase + tracking-widest
 *
 * CRITICAL PRESERVED:
 * - SectionWrapper with id="booking" (scroll target)
 * - Global 'booking:open' event listener for CtaButton integration
 * - Accordion with calendar embed
 * - Map over booking.formTopics
 */
export default function BookingSectionCopy({ debugMode = false }) {
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
        <DebugLabel type="label" debugMode={debugMode}>
          <SectionLabel text={booking.label} />
        </DebugLabel>

        <DebugLabel type="hero" debugMode={debugMode}>
          <h2 className="font-display text-hero-large text-color-heading leading-tight content-spacing-lg">
            {booking.headline}
          </h2>
        </DebugLabel>

        <DebugLabel type="body" debugMode={debugMode}>
          <p className="font-primary text-body text-color-body leading-relaxed content-spacing-lg max-w-lg mx-auto">
            {booking.subline}
          </p>
        </DebugLabel>

        {/* Topics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10 text-left max-w-xl mx-auto">
          {booking.formTopics.map((topic, i) => (
            <div key={i} className="flex items-start gap-2">
              <DebugLabel type="list-bullet" debugMode={debugMode}>
                <span className="text-color-label mt-0.5 shrink-0">—</span>
              </DebugLabel>
              <DebugLabel type="list" debugMode={debugMode}>
                <span className="font-primary text-list text-color-body">
                  {topic}
                </span>
              </DebugLabel>
            </div>
          ))}
        </div>

        {/* Accordion CTA button */}
        <button
          onClick={() => setCalendarOpen(!calendarOpen)}
          className="inline-flex items-center gap-3 font-primary text-button-text py-4 px-12 rounded-full bg-color-heading text-on-dark-heading hover:bg-color-label transition-colors duration-200"
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
          <div className="rounded-2xl border border-color-bg-light bg-white/50 p-8 text-left">
            {embedCode ? (
              <iframe
                src={embedCode}
                className="w-full min-h-[600px] border-0 rounded-xl"
                title="Intro-Call buchen"
                data-testid="booking-iframe"
              />
            ) : (
              <div className="min-h-[300px] flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-12 h-px bg-color-heading/20" />
                <DebugLabel type="body" debugMode={debugMode}>
                  <p className="font-primary text-body text-color-body">
                    Kalender-Embed wird hier eingebettet.
                  </p>
                </DebugLabel>
                <DebugLabel type="label" debugMode={debugMode}>
                  <p className="font-primary text-label text-color-label/60 max-w-xs">
                    Sobald du den Embed-Code bereitstellst, erscheint hier das Buchungsformular direkt auf der Seite.
                  </p>
                </DebugLabel>
                <div className="w-12 h-px bg-color-heading/20" />
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
