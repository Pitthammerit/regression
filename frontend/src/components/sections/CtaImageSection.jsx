import React from 'react'
import { ctaImage } from '../../content/plr-de'
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
  return (
    <SectionWrapper id="simple-cta" data-testid="simple-cta-section">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-[320px_1fr] gap-8 md:gap-12 items-center">
          {/* Image - Left column */}
          <div className="flex justify-center md:justify-start">
            <div className="max-w-[280px] md:max-w-[320px]">
              <LazyImage
                src={ctaImage.imageUrl}
                alt={ctaImage.imageAlt}
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>

          {/* Text - Right column, left-aligned */}
          <div className="text-left">
            <DebugLabel type="label" debugMode={debugMode}>
              <SectionLabel text={ctaImage.label} />
            </DebugLabel>

            <DebugLabel type="h2" debugMode={debugMode}>
              <h2 className="font-secondary text-h2 text-color-heading leading-tight content-spacing-md">
                {ctaImage.headline}
              </h2>
            </DebugLabel>

            <DebugLabel type="body-lg" debugMode={debugMode}>
              <p className="font-primary text-body-lg text-color-body leading-relaxed content-spacing-md">
                {ctaImage.subline}
              </p>
            </DebugLabel>

            <div className="content-spacing-md">
              <DebugLabel type="button-text" debugMode={debugMode}>
                <CtaButton label={ctaImage.cta} variant="primary" />
              </DebugLabel>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
