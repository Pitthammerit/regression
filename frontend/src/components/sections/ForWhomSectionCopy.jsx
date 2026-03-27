import React from 'react'
import { forWhom } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import DebugLabel from '../ui/DebugLabel'

/**
 * ForWhomSectionCopy — For Whom section with typography tokens
 *
 * MIGRATED to design tokens (Single Source of Truth):
 * - Font-family: font-display (headlines), font-primary (body)
 * - Headline: text-h2 (36px) + color-heading
 * - Card titles: text-h4 (24px) + color-heading
 * - Body text: text-body (18px) + color-body
 * - Borders: semantic tokens (color-bg-light, color-label)
 *
 * CRITICAL PRESERVED:
 * - SectionWrapper with id="fuer-wen" (scroll target)
 * - TopicCard component structure
 * - Map over forWhom.topics from content layer
 */
function TopicCard({ title, body }) {
  return (
    <div className="bg-white/50 rounded-2xl p-5 md:p-6 flex flex-col gap-2 border border-color-bg-light hover:border-color-label transition-colors">
      <h3 className="font-display text-h4 text-color-heading leading-snug">{title}</h3>
      <p className="font-primary text-body text-color-body leading-relaxed">{body}</p>
    </div>
  )
}

export default function ForWhomSectionCopy({ debugMode = false }) {
  return (
    <SectionWrapper id="fuer-wen" data-testid="forwhom-section">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <DebugLabel type="label" debugMode={debugMode}>
          <SectionLabel text={forWhom.label} />
        </DebugLabel>
        <DebugLabel type="h2" debugMode={debugMode}>
          <h2 className="font-display text-h2 text-color-heading mb-8 leading-tight">
            {forWhom.headline}
          </h2>
        </DebugLabel>
        <DebugLabel type="body" debugMode={debugMode}>
          <p className="font-primary text-body text-color-body leading-relaxed">
            {forWhom.intro}
          </p>
        </DebugLabel>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5" data-testid="topic-cards-grid">
        {forWhom.topics.map((topic, i) => (
          <TopicCard key={i} title={topic.title} body={topic.body} />
        ))}
      </div>
    </SectionWrapper>
  )
}
