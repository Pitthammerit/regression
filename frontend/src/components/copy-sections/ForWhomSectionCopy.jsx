import React from 'react'
import { forWhom } from '../../content'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import TopicCard from '../ui/TopicCard'
import DebugLabel from '../ui/DebugLabel'

/**
 * ForWhomSectionCopy — For Whom section with typography tokens
 *
 * MIGRATED to design tokens (Single Source of Truth):
 * - Font-family: font-secondary (headlines), font-primary (body)
 * - Headline: text-h2 (36px) + color-heading
 * - Card titles: text-h4 (24px) + color-heading
 * - Body text: text-body (18px) + color-body
 * - Borders: semantic tokens (color-bg-light, color-label)
 *
 * CRITICAL PRESERVED:
 * - SectionWrapper with id="fuer-wen" (scroll target)
 * - TopicCard component (imported from ui/)
 * - Map over forWhom.topics from content layer
 */

export default function ForWhomSectionCopy({ debugMode = false }) {
  return (
    <SectionWrapper id="fuer-wen" data-testid="forwhom-section">
      <div className="max-w-centered-header content-spacing-lg text-center mx-auto">
        <DebugLabel type="typography-label" debugMode={debugMode}>
          <SectionLabel text={forWhom.label} />
        </DebugLabel>
        <DebugLabel type="typography-h2" debugMode={debugMode}>
          <h2 className="font-secondary text-h2 text-color-primary leading-tight content-spacing-md">
            {forWhom.headline}
          </h2>
        </DebugLabel>
        <DebugLabel type="typography-body-lg" debugMode={debugMode}>
          <p className="font-primary text-body-lg text-color-text leading-relaxed">
            {forWhom.intro}
          </p>
        </DebugLabel>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5" data-testid="topic-cards-grid">
        {forWhom.topics.map((topic, i) => (
          <TopicCard key={i} title={topic.title} body={topic.body} debugMode={debugMode} />
        ))}
      </div>
    </SectionWrapper>
  )
}
