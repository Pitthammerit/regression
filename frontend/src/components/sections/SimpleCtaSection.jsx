import React from 'react'
import { simpleCta } from '../../content'
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
        <DebugLabel type="typography-label" debugMode={debugMode}>
          <SectionLabel text={simpleCta.label} />
        </DebugLabel>

        <DebugLabel type="typography-h2" debugMode={debugMode}>
          <h2 className="font-secondary text-h2 text-color-primary leading-tight text-center content-spacing-md">
            {simpleCta.headline}
          </h2>
        </DebugLabel>

        <DebugLabel type="typography-body-lg" debugMode={debugMode}>
          <p className="font-primary text-body-lg text-color-text leading-relaxed content-spacing-lg">
            {simpleCta.subline}
          </p>
        </DebugLabel>

        <div className="content-spacing-lg">
          <DebugLabel type="typography-menu-text" debugMode={debugMode}>
            <CtaButton label={simpleCta.cta} variant="primary" className="py-4 px-12" />
          </DebugLabel>
        </div>
      </div>
    </SectionWrapper>
  )
}
