import React from 'react'
import { processSection } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import CtaButton from '../ui/CtaButton'

// Tree SVG icons: roots only, roots+trunk, full tree
function TreeIcon({ variant }) {
  // variant: 1 = roots, 2 = roots+trunk, 3 = full tree
  return (
    <div className="w-14 h-14 rounded-full border border-brand-deep/25 flex items-center justify-center bg-white/30">
      <svg
        width="32" height="32" viewBox="0 0 32 32" fill="none"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
        className="text-brand-deep/60"
      >
        {/* Roots — always visible */}
        <path d="M13 24 Q 9 26 5 28" />
        <path d="M14 24 Q 12 27 10 29" />
        <path d="M16 24 L 16 28" />
        <path d="M18 24 Q 20 27 22 29" />
        <path d="M19 24 Q 23 26 27 28" />
        {/* Trunk */}
        {variant >= 2 && <line x1="16" y1="24" x2="16" y2="11" />}
        {/* Crown */}
        {variant >= 3 && <circle cx="16" cy="7" r="6" />}
      </svg>
    </div>
  )
}

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
          <div key={i} className="relative overflow-visible">
            {/* Big transparent background number */}
            <span
              aria-hidden="true"
              className="absolute -top-6 -left-3 font-serif text-brand-deep select-none pointer-events-none"
              style={{ fontSize: 'clamp(7rem, 15vw, 11rem)', lineHeight: 1, opacity: 0.05 }}
            >
              {i + 1}
            </span>
            {/* Divider line between steps (desktop) */}
            {i < processSection.steps.length - 1 && (
              <div className="hidden md:block absolute top-7 left-full w-full h-px bg-brand-sand -translate-x-6 z-0 pointer-events-none" />
            )}
            <div className="relative z-10">
              {/* Tree icon */}
              <TreeIcon variant={i + 1} />
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
