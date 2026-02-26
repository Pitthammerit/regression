import React from 'react'
import { processSection } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import CtaButton from '../ui/CtaButton'

export default function ProcessSection() {
  return (
    <SectionWrapper id="prozess" data-testid="process-section">
      <div className="max-w-2xl mb-16">
        <SectionLabel text={processSection.label} />
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-deep leading-tight">
          {processSection.headline}
        </h2>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-10 md:gap-12 mb-16" data-testid="process-steps">
        {processSection.steps.map((step, i) => (
          <div key={i} className="relative">
            {/* Divider line between steps */}
            {i < processSection.steps.length - 1 && (
              <div className="hidden md:block absolute top-7 left-full w-full h-px bg-brand-sand -translate-x-6 z-0 pointer-events-none" />
            )}
            <div className="relative z-10">
              <div className="font-serif text-5xl text-brand-deep/20 mb-5 leading-none">{step.number}</div>
              <h3 className="font-serif text-xl md:text-2xl text-brand-deep mb-2">{step.title}</h3>
              <p className="font-sans text-xs text-brand-steel uppercase tracking-widest mb-5">
                {step.duration}
              </p>
              <p className="font-sans text-sm text-brand-muted leading-relaxed">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-8">
        <CtaButton label={processSection.cta} variant="primary" />
      </div>

      <p className="text-center font-sans text-sm italic text-brand-muted">
        {processSection.footnote}
      </p>
    </SectionWrapper>
  )
}
