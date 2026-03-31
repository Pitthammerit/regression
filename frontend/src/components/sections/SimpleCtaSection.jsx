import React from 'react'
import { useContent } from '../../contexts/ContentContext'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import CtaButton from '../ui/CtaButton'
import DebugLabel from '../ui/DebugLabel'

/**
 * SimpleCtaSection — Simple CTA section with typography tokens
 *
 * Design Tokens (Single Source of Truth):
 * - Font-family: font-secondary (headlines), font-primary (body)
 * - Label: text-label (15px) + color-label
 * - Headline: text-h2 (36px) + color-heading
 * - Subline: text-body-lg (20px) + color-body
 * - Button: CtaButton with primary variant
 *
 * CRITICAL PRESERVED:
 * - SectionWrapper with id="simple-cta" (scroll target)
 * - Centered layout (max-w-centered-header, text-center)
 * - Content from plr-de.js (no hardcoding)
 * - Reuses existing components (CtaButton, SectionLabel, DebugLabel)
 */
export default function SimpleCtaSection({ debugMode = false }) {
  const { simpleCta } = useContent()

  return (
    <SectionWrapper id="simple-cta" data-testid="simple-cta-section">
      <div className="max-w-centered-header text-center mx-auto section-padding-sm">
        <DebugLabel type="typography-label" debugMode={debugMode}>
          <SectionLabel text={simpleCta.label} />
        </DebugLabel>

        <DebugLabel type="typography-h2" debugMode={debugMode}>
          <h2 className="typography-h2 leading-tight text-center heading-body-spacing">
            {simpleCta.headline}
          </h2>
        </DebugLabel>

        <DebugLabel type="typography-body-lg" debugMode={debugMode}>
          <p className="typography-body-lg leading-relaxed">
            {simpleCta.subline}
          </p>
        </DebugLabel>

        <div>
          <DebugLabel type="typography-menu-text" debugMode={debugMode}>
            <CtaButton label={simpleCta.cta} variant="primary" className="py-4 px-12" />
          </DebugLabel>
        </div>
      </div>
    </SectionWrapper>
  )
}
