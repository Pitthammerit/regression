import React, { useState } from 'react'
import { whatIs } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import { ChevronDown } from 'lucide-react'

function SkepticAccordion({ label, items }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-t border-black/10 mt-10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left font-sans text-brand-body text-sm tracking-wide hover:text-brand-deep transition-colors"
        data-testid="skeptic-toggle"
      >
        <span className="font-medium">{label}</span>
        <ChevronDown
          size={16}
          className={`text-brand-steel transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-400 ${open ? 'max-h-[600px] pb-6' : 'max-h-0'}`}>
        <div className="space-y-6 pt-2">
          {items.map((item, i) => (
            <div key={i} className="border-l-2 border-brand-deep pl-4">
              <div className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-deep mb-0.5">
                {item.name}
              </div>
              <div className="font-sans text-xs text-brand-steel mb-2">{item.role}</div>
              <p className="font-sans text-sm text-brand-muted leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WhatIsSection() {
  return (
    <SectionWrapper id="was-ist" data-testid="whatis-section">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left — sticky headline */}
        <div className="md:sticky md:top-32">
          <SectionLabel text={whatIs.label} />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-deep leading-tight">
            {whatIs.headline}
          </h2>
        </div>

        {/* Right — body + skeptic toggle */}
        <div>
          {whatIs.body.map((para, i) => (
            <p key={i} className={`font-sans text-brand-body leading-relaxed text-lg ${i > 0 ? 'mt-6' : ''}`}>
              {para}
            </p>
          ))}
          <SkepticAccordion label={whatIs.skepticToggleLabel} items={whatIs.skepticContent} />
        </div>
      </div>
    </SectionWrapper>
  )
}
