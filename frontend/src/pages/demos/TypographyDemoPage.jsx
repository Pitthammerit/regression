import React from 'react'
import WhatIsSectionCopy from '../../components/sections/WhatIsSectionCopy'
import AboutSectionCopy from '../../components/sections/AboutSectionCopy'
import CaseStudiesSectionCopy from '../../components/sections/CaseStudiesSectionCopy'
import ResearchersSectionCopy from '../../components/sections/ResearchersSectionCopy'

/**
 * TypographyDemoPage — Design Exploration Page
 *
 * Diese Seite zeigt 4 Sections in einer sicheren Umgebung zum Experimentieren.
 * Änderungen hier beeinflussen nicht die Live-Site.
 *
 * Route: /typo-demo
 */
export default function TypographyDemoPage() {
  return (
    <div className="bg-brand-cream bg-paper min-h-screen font-sans text-brand-body">
      <div className="max-w-content mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16 pb-8 border-b border-black/10">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-brand-steel mb-4">
            DESIGN EXPLORATION
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-deep leading-tight mb-4">
            Typography Demo
          </h1>
          <p className="font-sans text-brand-muted text-lg max-w-2xl">
            Experimentiere mit Typography-Klassen in diesen 4 Sections.
            Änderungen hier beeinflussen nicht die Live-Site.
          </p>
        </div>

        {/* Sections */}
        <WhatIsSectionCopy />
        <AboutSectionCopy />
        <CaseStudiesSectionCopy />
        <ResearchersSectionCopy />

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-black/10 text-center">
          <p className="font-sans text-sm text-brand-steel">
            /typo-demo — Design Exploration Mode
          </p>
        </div>
      </div>
    </div>
  )
}
