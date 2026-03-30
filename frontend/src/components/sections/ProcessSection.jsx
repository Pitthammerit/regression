import React from 'react'
import { processSection } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import CtaButton from '../ui/CtaButton'
import DebugLabel from '../ui/DebugLabel'

/**
 * ProcessSection — Process section with typography tokens
 *
 * MIGRATED to design tokens (Single Source of Truth):
 * - Font-family: font-secondary (headlines), font-primary (body)
 * - Headline: text-h2 (36px) + color-heading
 * - Step titles: text-h3 (30px) + color-heading
 * - Labels: text-label (15px) + color-label
 * - Body: text-body (18px) + color-body
 * - Backgrounds: semantic tokens (color-bg-light)
 *
 * CRITICAL PRESERVED:
 * - SectionWrapper with id="prozess" (scroll target)
 * - Process steps with background numbers
 * - CtaButton component
 * - Map over processSection.steps
 */
export default function ProcessSection({ debugMode = false }) {
  return (
    <SectionWrapper id="prozess" data-testid="process-section">
      <div className="max-w-centered-header content-spacing-lg text-center mx-auto">
        <DebugLabel type="label" debugMode={debugMode}>
          <SectionLabel text={processSection.label} />
        </DebugLabel>
        <DebugLabel type="h2" debugMode={debugMode}>
          <h2 className="font-secondary text-h2 text-color-heading leading-tight text-center content-spacing-md">
            {processSection.headline}
          </h2>
        </DebugLabel>
        <DebugLabel type="body-lg" debugMode={debugMode}>
          <p className="font-primary text-body-lg text-color-body leading-relaxed">
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
              className="process-bg-number absolute font-secondary text-color-heading select-none pointer-events-none"
              style={{ lineHeight: 1, opacity: 0.10 }}
            >
              {i + 1}
            </span>
            {/* Divider line between steps (desktop) */}
            {i < processSection.steps.length - 1 && (
              <div className="hidden md:block absolute top-4 left-full w-full h-px bg-color-bg-light -translate-x-6 z-0 pointer-events-none" />
            )}
            <div className="relative z-10 pt-2">
              <DebugLabel type="h3" debugMode={debugMode}>
                <h3 className="font-secondary text-h3 text-color-heading mt-5 mb-2">
                  {step.title}
                </h3>
              </DebugLabel>
              <DebugLabel type="label" debugMode={debugMode}>
                <p className="font-primary text-label text-color-label label tracking-widest mb-5">
                  {step.duration}
                </p>
              </DebugLabel>
              <DebugLabel type="body" debugMode={debugMode}>
                <p className="font-primary text-body text-color-body leading-relaxed">{step.body}</p>
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
