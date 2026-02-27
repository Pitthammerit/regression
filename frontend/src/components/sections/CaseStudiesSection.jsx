import React, { useState } from 'react'
import { cases } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import { ChevronDown } from 'lucide-react'

function AvatarSilhouette({ gender }) {
  return (
    <div className="w-12 h-12 rounded-full bg-brand-sand/60 border border-black/10 flex items-center justify-center shrink-0 overflow-hidden">
      <svg
        width="32" height="32" viewBox="0 0 32 32" fill="none"
        className="text-brand-deep/30"
      >
        {/* Head */}
        <circle cx="16" cy="10" r="5" fill="currentColor" />
        {/* Body */}
        {gender === 'female' ? (
          /* Female: slightly wider shoulder curve */
          <path d="M7 28 C7 20 10 17 16 17 C22 17 25 20 25 28" fill="currentColor" />
        ) : (
          /* Male: straight shoulders */
          <path d="M6 28 C6 19 10 17 16 17 C22 17 26 19 26 28" fill="currentColor" />
        )}
      </svg>
    </div>
  )
}

export default function CaseStudiesSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <SectionWrapper id="cases" data-testid="cases-section">
      <div className="max-w-2xl mb-16">
        <SectionLabel text={cases.label} />
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-deep leading-tight">
          {cases.headline}
        </h2>
        <p className="font-sans text-sm text-brand-muted mt-4 italic">{cases.subline}</p>
      </div>

      <div className="divide-y divide-black/10">
        {cases.items.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-start gap-5 py-8 text-left group"
              data-testid={`case-accordion-${i}`}
            >
              {/* Avatar silhouette */}
              <AvatarSilhouette gender={item.gender} />

              {/* Text content */}
              <div className="flex-1 pr-4">
                <span className="font-sans text-sm tracking-[0.15em] uppercase text-brand-steel block mb-2">
                  {item.tag}
                </span>
                <span className="font-serif text-2xl md:text-3xl text-brand-deep group-hover:text-brand-steel transition-colors block leading-snug">
                  {item.name}{item.title ? ` — ${item.title}` : ''}
                </span>
                <span className="font-sans text-base text-brand-muted italic block mt-2">
                  {item.teaser}
                </span>
              </div>

              <ChevronDown
                size={18}
                className={`text-brand-steel mt-1 shrink-0 transition-transform duration-300 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div className={`overflow-hidden transition-all duration-500 ${
              openIndex === i ? 'max-h-[1400px] pb-10' : 'max-h-0'
            }`}>
              <div className="grid md:grid-cols-3 gap-6 pt-2">
                {[
                  { label: cases.sectionLabels.situation, text: item.situation },
                  { label: cases.sectionLabels.session,   text: item.session },
                  { label: cases.sectionLabels.result,    text: item.result },
                ].map((block) => (
                  <div key={block.label} className="border-l-2 border-brand-deep pl-4">
                    <span className="font-sans text-sm tracking-[0.15em] uppercase text-brand-steel block mb-3">
                      {block.label}
                    </span>
                    <p className="font-sans text-base md:text-lg text-brand-muted leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
