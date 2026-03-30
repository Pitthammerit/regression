import { useState, useEffect } from 'react'
import { booking } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import TopicCard from '../ui/TopicCard'
import DebugLabel from '../ui/DebugLabel'
import { ChevronDown } from 'lucide-react'

/**
 * BookingSection — Booking section with typography tokens
 *
 * MIGRATED to design tokens (Single Source of Truth):
 * - Font-family: font-secondary (headlines), font-primary (body)
 * - Label: text-label (15px) + color-label
 * - Headline: hero-large (clamp 2.4-5.4rem) + color-heading
 * - Subline: text-body-lg (20px) + color-body
 * - Topics: text-list (20px) + color-body
 * - Button: text-label (15px) uppercase + tracking-widest
 *
 * CRITICAL PRESERVED:
 * - SectionWrapper with id="booking" (scroll target)
 * - Global 'booking:open' event listener for CtaButton integration
 * - Accordion with calendar embed
 * - TopicCard component for form topics (imported from ui/)
 */
export default function BookingSection({ debugMode = false }) {
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
      <div className="max-w-centered-header content-spacing-lg mx-auto text-center">
        <DebugLabel type="label" debugMode={debugMode}>
          <SectionLabel text={booking.label} />
        </DebugLabel>

        <DebugLabel type="hero" debugMode={debugMode}>
          <h2 className="font-secondary text-hero-large text-color-heading leading-tight content-spacing-md">
            {booking.headline}
          </h2>
        </DebugLabel>

        <DebugLabel type="body-lg" debugMode={debugMode}>
          <p className="font-primary text-body-lg text-color-body leading-relaxed max-w-lg mx-auto">
            {booking.subline}
          </p>
        </DebugLabel>

        {/* Topics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5 mb-10" data-testid="booking-topics-grid">
          {booking.formTopics.map((topic, i) => (
            <TopicCard key={i} title={topic} debugMode={debugMode} />
          ))}
        </div>

        {/* Accordion CTA button */}
        <button
          onClick={() => setCalendarOpen(!calendarOpen)}
          className="inline-flex items-center gap-3 font-primary text-button-text button-text py-4 px-12 rounded-full bg-color-heading text-on-dark hover:bg-color-label transition-colors duration-200"
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
          <div className="rounded-2xl border border-color-bg-light bg-color-card-overlay p-8 text-left">
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
