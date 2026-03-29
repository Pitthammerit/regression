import React from 'react'
import { simpleCta } from '../../content/plr-de'
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
  return (
    <SectionWrapper id="simple-cta" data-testid="simple-cta-section">
      <div className="max-w-centered-header content-spacing-lg text-center mx-auto">
        <DebugLabel type="label" debugMode={debugMode}>
          <SectionLabel text={simpleCta.label} />
        </DebugLabel>

        <DebugLabel type="h2" debugMode={debugMode}>
          <h2 className="font-secondary text-h2 text-color-heading leading-tight text-center content-spacing-md">
            {simpleCta.headline}
          </h2>
        </DebugLabel>

        <DebugLabel type="body-lg" debugMode={debugMode}>
          <p className="font-primary text-body-lg text-color-body leading-relaxed content-spacing-md">
            {simpleCta.subline}
          </p>
        </DebugLabel>

        <div className="content-spacing-md">
          <DebugLabel type="button-text" debugMode={debugMode}>
            <CtaButton label={simpleCta.cta} variant="primary" />
          </DebugLabel>
        </div>
      </div>
    </SectionWrapper>
  )
}
