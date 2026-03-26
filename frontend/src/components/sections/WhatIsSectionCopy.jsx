import React from 'react'
import { whatIs } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import DebugLabel from '../ui/DebugLabel'

export default function WhatIsSectionCopy({ debugMode = false }) {
  return (
    <SectionWrapper id="was-ist-copy" data-testid="whatis-section-copy">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left — sticky headline */}
        <div className="md:sticky md:top-32">
          <DebugLabel type="label" debugMode={debugMode}>
            <SectionLabel text={whatIs.label} />
          </DebugLabel>
          <DebugLabel type="h2" debugMode={debugMode}>
            <h2 className="font-display text-h2 text-primary leading-tight">
              {whatIs.headline}
            </h2>
          </DebugLabel>
        </div>

        {/* Right — body + skeptic toggle */}
        <div>
          {whatIs.body.map((para, i) => (
            <DebugLabel type="body" debugMode={debugMode} key={i}>
              <p className={`font-primary text-brand-body leading-relaxed text-body ${i > 0 ? 'mt-6' : ''}`}>
                {para}
              </p>
            </DebugLabel>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
