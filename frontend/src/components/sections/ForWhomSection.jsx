import React from 'react'
import { forWhom } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'

function TopicCard({ title, body }) {
  return (
    <div className="bg-white/50 rounded p-5 md:p-6 flex flex-col gap-2 border border-brand-sand hover:border-brand-steel transition-colors">
      <h3 className="font-serif text-lg text-brand-deep leading-snug">{title}</h3>
      <p className="font-sans text-sm text-brand-muted leading-relaxed">{body}</p>
    </div>
  )
}

export default function ForWhomSection() {
  return (
    <SectionWrapper id="fuer-wen" data-testid="forwhom-section">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <SectionLabel text={forWhom.label} />
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-deep mb-8 leading-tight">
          {forWhom.headline}
        </h2>
        <p className="font-sans text-brand-muted leading-relaxed text-lg">
          {forWhom.intro}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5" data-testid="topic-cards-grid">
        {forWhom.topics.map((topic, i) => (
          <TopicCard key={i} title={topic.title} body={topic.body} />
        ))}
      </div>
    </SectionWrapper>
  )
}
