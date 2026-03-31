import React from 'react'
import { useContent } from '../../contexts/ContentContext'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import CtaButton from '../ui/CtaButton'
import LazyImage from '../ui/LazyImage'
import DebugLabel from '../ui/DebugLabel'

/**
 * CtaImageSection — CTA section with image and typography tokens
 *
 * Design Tokens (Single Source of Truth):
 * - Font-family: font-secondary (headlines), font-primary (body)
 * - Label: text-label (15px) + color-label
 * - Headline: text-h2 (36px) + color-heading
 * - Subline: text-body-lg (20px) + color-body
 * - Button: CtaButton with primary variant
 *
 * Layout:
 * - Image on left (max-w-[280px] on mobile, max-w-[320px] on desktop)
 * - Text left-aligned on right
 * - Button underneath text
 *
 * CRITICAL PRESERVED:
 * - SectionWrapper with id="simple-cta" (scroll target)
 * - Content from plr-de.js (no hardcoding)
 * - Reuses existing components (CtaButton, SectionLabel, DebugLabel, LazyImage)
 */
export default function CtaImageSection({ debugMode = false }) {
  const { ctaImage } = useContent()

  return (
    <SectionWrapper id="simple-cta" data-testid="simple-cta-section">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-[288px_1fr] card-grid-gap-sm md:card-grid-gap-lg items-center">
          {/* Image - Left column */}
          <div className="flex justify-center md:justify-start">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden flex-shrink-0 border border-color-primary">
              <LazyImage
                src={ctaImage.imageUrl}
                alt={ctaImage.imageAlt}
                className="w-full h-full object-cover object-top scale-[1.03]"
              />
            </div>
          </div>

          {/* Text - Right column, left-aligned */}
          <div className="text-left">
            <DebugLabel type="typography-label" debugMode={debugMode}>
              <SectionLabel text={ctaImage.label} />
            </DebugLabel>

            <DebugLabel type="typography-h2" debugMode={debugMode}>
              <h2 className="typography-h2 leading-tight heading-body-spacing">
                {ctaImage.headline}
              </h2>
            </DebugLabel>

            <DebugLabel type="typography-body-lg" debugMode={debugMode}>
              <p className="typography-body-lg leading-relaxed">
                {ctaImage.subline}
              </p>
            </DebugLabel>

            <div className="margin-top-md">
              <DebugLabel type="typography-menu-text" debugMode={debugMode}>
                <CtaButton label={ctaImage.cta} variant="primary" className="py-4 px-12" />
              </DebugLabel>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
