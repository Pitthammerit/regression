import React from 'react'
import { useContent } from '../../contexts/ContentContext'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import TopicCard from '../ui/TopicCard'
import DebugLabel from '../ui/DebugLabel'

/**
 * ForWhomSection — For Whom section with composite typography utilities
 *
 * MIGRATED to composite typography utilities:
 * - Label: typography-label (replaces font-primary text-label label)
 * - H2: typography-h2 (replaces font-secondary text-h2 text-color-primary)
 * - Body-lg: typography-body-lg (replaces font-primary text-body-lg text-color-text)
 *
 * CRITICAL PRESERVED:
 * - SectionWrapper with id="fuer-wen" (scroll target)
 * - TopicCard component (imported from ui/)
 * - Map over forWhom.topics from content layer
 */

export default function ForWhomSection({ debugMode = false }) {
  const { forWhom } = useContent()

  return (
    <SectionWrapper id="fuer-wen" data-testid="forwhom-section">
      <div className="max-w-centered-header content-spacing-lg text-center mx-auto">
        <DebugLabel type="typography-label" debugMode={debugMode}>
          <SectionLabel text={forWhom.label} />
        </DebugLabel>
        <DebugLabel type="typography-h2" debugMode={debugMode}>
          <h2 className="typography-h2 leading-tight content-spacing-md">
            {forWhom.headline}
          </h2>
        </DebugLabel>
        <DebugLabel type="typography-body-lg" debugMode={debugMode}>
          <p className="typography-body-lg leading-relaxed">
            {forWhom.intro}
          </p>
        </DebugLabel>
      </div>

      <div className="mt-[3rem] grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5" data-testid="topic-cards-grid">
        {forWhom.topics.map((topic, i) => (
          <TopicCard key={i} title={topic.title} body={topic.body} debugMode={debugMode} />
        ))}
      </div>
    </SectionWrapper>
  )
}
