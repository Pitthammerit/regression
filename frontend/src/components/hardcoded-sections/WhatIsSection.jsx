import React from 'react'
import { whatIs } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'

export default function WhatIsSection() {
  return (
    <SectionWrapper id="was-ist" data-testid="whatis-section">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left — sticky headline */}
        <div className="md:sticky md:top-32">
          <SectionLabel text={whatIs.label} />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-heading leading-tight">
            {whatIs.headline}
          </h2>
        </div>

        {/* Right — body + skeptic toggle */}
        <div>
          {whatIs.body.map((para, i) => (
            <p key={i} className={`font-primary text-body leading-relaxed text-lg ${i > 0 ? 'mt-6' : ''}`}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
