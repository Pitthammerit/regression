import React from 'react'
import { useContent } from '../../contexts/ContentContext'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import CtaButton from '../ui/CtaButton'
import DebugLabel from '../ui/DebugLabel'

/**
 * ProcessSection — Process section with composite typography utilities
 *
 * MIGRATED to composite typography utilities:
 * - Label: typography-label (replaces font-primary text-label text-color-secondary label)
 * - H2: typography-h2 (replaces font-secondary text-h2 text-color-primary)
 * - Body-lg: typography-body-lg (replaces font-primary text-body-lg text-color-text)
 * - H3: typography-h3 (replaces font-secondary text-h3 text-color-primary)
 * - Body: typography-body (replaces font-primary text-body text-color-text)
 *
 * CRITICAL PRESERVED:
 * - SectionWrapper with id="prozess" (scroll target)
 * - Process steps with background numbers
 * - CtaButton component
 * - Map over processSection.steps
 */
export default function ProcessSection({ debugMode = false }) {
  const { processSection } = useContent()

  return (
    <SectionWrapper id="prozess" data-testid="process-section">
      <div className="max-w-centered-header content-spacing-lg text-center mx-auto">
        <DebugLabel type="typography-label" debugMode={debugMode}>
          <SectionLabel text={processSection.label} />
        </DebugLabel>
        <DebugLabel type="typography-h2" debugMode={debugMode}>
          <h2 className="typography-h2 leading-tight text-center content-spacing-md">
            {processSection.headline}
          </h2>
        </DebugLabel>
        <DebugLabel type="typography-body-lg" debugMode={debugMode}>
          <p className="typography-body-lg leading-relaxed">
            {processSection.footnote}
          </p>
        </DebugLabel>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-10 md:gap-12 content-spacing-lg max-w-5xl mx-auto" data-testid="process-steps">
        {processSection.steps.map((step, i) => (
          <div key={i} className="relative overflow-hidden md:overflow-visible">
            {/* Big transparent background number — scales down on mobile */}
            <span
              aria-hidden="true"
              className="process-bg-number absolute font-secondary text-color-primary select-none pointer-events-none"
              style={{ lineHeight: 1, opacity: 0.10 }}
            >
              {i + 1}
            </span>
            {/* Divider line between steps (desktop) */}
            {i < processSection.steps.length - 1 && (
              <div className="hidden md:block absolute top-4 left-full w-full h-px bg-color-bg-light -translate-x-6 z-0 pointer-events-none" />
            )}
            <div className="relative z-10 pt-2">
              <DebugLabel type="typography-h3" debugMode={debugMode}>
                <h3 className="typography-h3 mt-5 mb-2">
                  {step.title}
                </h3>
              </DebugLabel>
              <DebugLabel type="typography-label" debugMode={debugMode}>
                <p className="typography-label mb-5">
                  {step.duration}
                </p>
              </DebugLabel>
              <DebugLabel type="typography-body" debugMode={debugMode}>
                <p className="typography-body leading-relaxed">{step.body}</p>
              </DebugLabel>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-8">
        <CtaButton label={processSection.cta} variant="primary" />
      </div>
    </SectionWrapper>
  )
}
