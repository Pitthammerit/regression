import { useState, useEffect } from 'react'
import { booking } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import TopicCard from '../ui/TopicCard'
import TopicAccordionCard from '../ui/TopicAccordionCard'
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
  const embedCode = import.meta.env.VITE_CALENDAR_EMBED

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
          <h2 className="font-secondary text-hero-large text-color-primary leading-tight content-spacing-md">
            {booking.headline}
          </h2>
        </DebugLabel>

        <DebugLabel type="body-lg" debugMode={debugMode}>
          <p className="font-primary text-body-lg text-color-text leading-relaxed max-w-lg mx-auto">
            {booking.subline}
          </p>
        </DebugLabel>

        {/* Topics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5 mt-[3rem] mb-[3.5rem]" data-testid="booking-topics-grid">
          {booking.formTopics.map((topic, i) => (
            <TopicCard key={i} title={topic} debugMode={debugMode} />
          ))}
        </div>

        {/* Accordion CTA button */}
        <button
          onClick={() => setCalendarOpen(!calendarOpen)}
          className="inline-flex items-center gap-3 font-primary text-button-text button-text py-4 px-12 rounded-full bg-color-primary text-on-dark hover:bg-color-secondary transition-colors duration-200"
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
          <div className="rounded-2xl border border-color-light bg-color-card-overlay p-8 text-left">
            {embedCode ? (
              <iframe
                src={embedCode}
                className="w-full min-h-[600px] border-0 rounded-xl"
                title="Intro-Call buchen"
                data-testid="booking-iframe"
              />
            ) : (
              <div className="min-h-[300px] flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-12 h-px bg-color-primary/20" />
                <DebugLabel type="body" debugMode={debugMode}>
                  <p className="font-primary text-body text-color-text">
                    Kalender-Embed wird hier eingebettet.
                  </p>
                </DebugLabel>
                <DebugLabel type="label" debugMode={debugMode}>
                  <p className="font-primary text-label text-color-secondary/60 max-w-xs">
                    Sobald du den Embed-Code bereitstellst, erscheint hier das Buchungsformular direkt auf der Seite.
                  </p>
                </DebugLabel>
                <div className="w-12 h-px bg-color-primary/20" />
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

/**
 * BookingSectionDark — Dark blue variation with on-dark tokens
 *
 * Same as BookingSection but with dark blue background and adapted colors:
 * - Background: bg-color-primary (dark navy blue)
 * - Headline: text-primary-on-dark (pure white)
 * - Body text: text-on-dark (white 80%)
 * - Labels: text-secondary-on-dark (white 60%)
 * - Calendar card: adapted for dark background
 * - Borders/dividers: use on-dark tokens
 *
 * ADVANCED ANIMATIONS:
 * - Custom cubic-bezier easing for spring-like motion
 * - Staggered fade-out on topic cards (50ms per card)
 * - Grid-template-rows for smoother height transition
 * - Scale effects on topic cards during fade-out
 * - Faster opening (400ms) vs slower closing (600ms)
 */
export function BookingSectionDark({ debugMode = false }) {
  // 'cards' | 'calendar' - which panel is expanded
  const [expandedPanel, setExpandedPanel] = useState('cards')
  const embedCode = import.meta.env.VITE_CALENDAR_EMBED

  // Listen for global 'booking:open' event (dispatched by CtaButton)
  useEffect(() => {
    const handler = () => setExpandedPanel('calendar')
    window.addEventListener('booking:open', handler)
    return () => window.removeEventListener('booking:open', handler)
  }, [])

  return (
    <SectionWrapper
      id="booking"
      data-testid="booking-section"
      className="bg-color-primary text-primary-on-dark"
    >
      <div className="max-w-centered-header content-spacing-lg mx-auto text-center">
        <DebugLabel type="label" debugMode={debugMode}>
          <SectionLabel text={booking.label} light />
        </DebugLabel>

        <DebugLabel type="hero" debugMode={debugMode}>
          <h2 className="font-secondary text-hero-large leading-tight content-spacing-md">
            {booking.headline}
          </h2>
        </DebugLabel>

        <DebugLabel type="body-lg" debugMode={debugMode}>
          <p className="font-primary text-body-lg text-on-dark leading-relaxed max-w-lg mx-auto">
            {booking.subline}
          </p>
        </DebugLabel>

        {/* Topics Accordion - 6 cards (initially open) */}
        <AccordionWrap isOpen={expandedPanel === 'cards'} duration="500ms">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5 mt-[3rem] mb-[3.5rem]">
            {booking.formTopics.map((topic, i) => (
              <TopicAccordionCard key={i} title={topic} dark debugMode={debugMode} />
            ))}
          </div>
        </AccordionWrap>

        {/* Calendar Accordion (initially closed) */}
        <AccordionWrap isOpen={expandedPanel === 'calendar'} duration="500ms">
          <div className="rounded-2xl border border-divider-on-dark bg-white/5 backdrop-blur-sm p-8 text-left">
            {embedCode ? (
              <iframe
                src={embedCode}
                className="w-full min-h-[600px] border-0 rounded-xl"
                title="Intro-Call buchen"
                data-testid="booking-iframe"
              />
            ) : (
              <div className="min-h-[300px] flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-12 h-px bg-divider-on-dark" />
                <DebugLabel type="body" debugMode={debugMode}>
                  <p className="font-primary text-body text-on-dark">
                    Kalender-Embed wird hier eingebettet.
                  </p>
                </DebugLabel>
                <DebugLabel type="label" debugMode={debugMode}>
                  <p className="font-primary text-label text-secondary-on-dark max-w-xs">
                    Sobald du den Embed-Code bereitstellts, erscheint hier das Buchungsformular direkt auf der Seite.
                  </p>
                </DebugLabel>
                <div className="w-12 h-px bg-divider-on-dark" />
              </div>
            )}
          </div>
        </AccordionWrap>

        {/* Accordion CTA button - toggles between panels */}
        <button
          onClick={() => setExpandedPanel(expandedPanel === 'cards' ? 'calendar' : 'cards')}
          className={`inline-flex items-center gap-3 font-primary text-button-text button-text py-4 px-12 rounded-full bg-white text-color-primary hover:bg-color-secondary hover:text-on-dark transition-all duration-200 ${
            expandedPanel === 'calendar' ? 'mt-4' : ''
          }`}
          data-testid="booking-cta-button"
        >
          {booking.directBookingCta}
          <ChevronDown
            size={14}
            className={`transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedPanel === 'calendar' ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </SectionWrapper>
  )
}
