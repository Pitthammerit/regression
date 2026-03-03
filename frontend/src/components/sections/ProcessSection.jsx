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
          <div key={i} className="relative overflow-hidden md:overflow-visible">
            {/* Big transparent background number — scales down on mobile */}
            <span
              aria-hidden="true"
              className="process-bg-number absolute font-serif text-brand-deep select-none pointer-events-none"
              style={{ lineHeight: 1, opacity: 0.10 }}
            >
              {i + 1}
            </span>
            {/* Divider line between steps (desktop) */}
            {i < processSection.steps.length - 1 && (
              <div className="hidden md:block absolute top-4 left-full w-full h-px bg-brand-sand -translate-x-6 z-0 pointer-events-none" />
            )}
            <div className="relative z-10 pt-2">
              <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-brand-deep mt-5 mb-2">
                {step.title}
              </h3>
              <p className="font-sans text-xs text-brand-steel uppercase tracking-widest mb-5">
                {step.duration}
              </p>
              <p className="font-sans text-base text-brand-muted leading-relaxed">{step.body}</p>
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
