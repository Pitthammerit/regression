import React, { useState } from 'react'
import { cases } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import { ChevronDown } from 'lucide-react'

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
              className="w-full flex justify-between items-start py-8 text-left group"
              data-testid={`case-accordion-${i}`}
            >
              <div className="pr-6">
                <span className="font-sans text-xs tracking-[0.15em] uppercase text-brand-steel block mb-2">
                  {item.tag}
                </span>
                <span className="font-serif text-xl md:text-2xl text-brand-deep group-hover:text-brand-steel transition-colors block leading-snug">
                  {item.name} — {item.title}
                </span>
                <span className="font-sans text-sm text-brand-muted italic block mt-2">
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
                    <span className="font-sans text-xs tracking-[0.15em] uppercase text-brand-steel block mb-3">
                      {block.label}
                    </span>
                    <p className="font-sans text-sm text-brand-muted leading-relaxed">
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
