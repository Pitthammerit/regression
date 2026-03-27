import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import HeroV3Section from '../../components/sections/HeroV3Section'
import ServicesSectionCopy from '../../components/sections/ServicesSectionCopy'
import WelcomeSectionCopy from '../../components/sections/WelcomeSectionCopy'
import ResearcherQuotesSectionCopy from '../../components/sections/ResearcherQuotesSectionCopy'
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
  const [debugMode, setDebugMode] = useState(false)
  const [accordionOpen, setAccordionOpen] = useState('tokens') // 'tokens' | 'preview'

  return (
    <div className="bg-color-bg-light bg-paper min-h-screen font-sans text-color-body">
      {/* Debug Toggle - Fixed */}
      <div className="fixed top-4 right-4 z-50 bg-white p-3 rounded-lg shadow-lg border border-black/10">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={debugMode}
            onChange={(e) => setDebugMode(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="font-sans text-sm">🔍 Debug-Klassen zeigen</span>
        </label>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HEADER & ACCORDIONS (constrained width) */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="max-w-content mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16 pb-8 border-b border-black/10">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-color-label mb-4">
            DESIGN EXPLORATION
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-color-heading leading-tight mb-4">
            Typography Demo
          </h1>
          <p className="font-sans text-color-body text-lg max-w-2xl">
            Experimentiere mit Typography-Klassen in diesen 8 Sections.
            Änderungen hier beeinflussen nicht die Live-Site.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ACCORDION 1: Design Tokens aus tailwind.config.js */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="mb-8 border border-black/10 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => setAccordionOpen(accordionOpen === 'tokens' ? null : 'tokens')}
            className="w-full px-6 py-4 flex items-center justify-between bg-color-bg-dark text-on-dark hover:bg-color-label transition-colors"
          >
            <span className="font-serif text-xl">📐 Design Tokens (aus tailwind.config.js)</span>
            <ChevronDown className={`transition-transform duration-200 ${accordionOpen === 'tokens' ? 'rotate-180' : ''}`} />
          </button>

          {accordionOpen === 'tokens' && (
            <div className="p-6">
              <p className="font-sans text-sm text-color-body mb-6">
                Diese Design Tokens sind in <code className="bg-yellow-100 px-2 py-1 rounded">tailwind.config.js</code> definiert und stehen als Single Source of Truth zur Verfügung.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/20">
                      <th className="text-left py-3 px-4 font-semibold">Token Name</th>
                      <th className="text-left py-3 px-4 font-semibold">DebugLabel</th>
                      <th className="text-left py-3 px-4 font-semibold">CSS Wert</th>
                      <th className="text-left py-3 px-4 font-semibold">Verwendung</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">hero-large</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">H1</td>
                      <td className="py-3 px-4 font-mono text-xs">clamp(2.4rem, 6.6vw, 5.4rem)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Hero Haupt-Headline</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">hero</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">—</td>
                      <td className="py-3 px-4 font-mono text-xs">clamp(1.44rem, 3.84vw, 3.36rem)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Hero Sub-Headline</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">h3</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">H3</td>
                      <td className="py-3 px-4 font-mono text-xs">1.875rem (30px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Section H3</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">h2</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">—</td>
                      <td className="py-3 px-4 font-mono text-xs">2.25rem (36px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Section H2</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">h1</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">—</td>
                      <td className="py-3 px-4 font-mono text-xs">3rem (48px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Section H1</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">h4</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">H4</td>
                      <td className="py-3 px-4 font-mono text-xs">1.5rem (24px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Section H4</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">body</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">BODY</td>
                      <td className="py-3 px-4 font-mono text-xs">1.125rem (18px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Body Text Basis</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">body-lg</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">—</td>
                      <td className="py-3 px-4 font-mono text-xs">1.25rem (20px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Body Text Large</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">label</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">LABEL</td>
                      <td className="py-3 px-4 font-mono text-xs">0.75rem (12px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Labels, Metadata</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">label-wide</td>
                      <td className="py-3 px-4 font-mono text-xs">0.2em</td>
                      <td className="py-3 px-4 text-xs text-color-body">LetterSpreading Labels</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">heading-tight</td>
                      <td className="py-3 px-4 font-mono text-xs">-0.02em</td>
                      <td className="py-3 px-4 text-xs text-color-body">LetterSpreading Headlines</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">disclaimer</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">DISCLAIMER</td>
                      <td className="py-3 px-4 font-mono text-xs">0.75rem (12px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Disclaimer-Texte</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">read-more</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">READ-MORE</td>
                      <td className="py-3 px-4 font-mono text-xs">0.875rem (14px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Mehr lesen / Weniger lesen Buttons</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">button-text</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">BUTTON</td>
                      <td className="py-3 px-4 font-mono text-xs">0.875rem (14px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Button-Texte (allgemein)</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">source-link</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">LINK</td>
                      <td className="py-3 px-4 font-mono text-xs">0.875rem (14px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Quellen-Links</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">subline</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">SUBLINES</td>
                      <td className="py-3 px-4 font-mono text-xs">1rem (16px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Sublines (unter H2, unter Namen)</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">list</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">LIST</td>
                      <td className="py-3 px-4 font-mono text-xs">1rem (16px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">List-Items (Credentials, Bullets)</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">author-name</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">NAME</td>
                      <td className="py-3 px-4 font-mono text-xs">2rem (32px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Autoren-Namen</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">description</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">LEAD</td>
                      <td className="py-3 px-4 font-mono text-xs">1.625rem (26px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Kurzbeschreibungen</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">quote</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">QUOTE</td>
                      <td className="py-3 px-4 font-mono text-xs">1.5rem (24px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Standard Zitate</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">quote-featured</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">QUOTE-FEATURED</td>
                      <td className="py-3 px-4 font-mono text-xs">2.25rem (36px)</td>
                      <td className="py-3 px-4 text-xs text-color-body">Große Zitate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ACCORDION 2: Element-Vergleich mit Live-Vorschau (GRUPPIERT) */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="mb-8 border border-black/10 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => setAccordionOpen(accordionOpen === 'preview' ? null : 'preview')}
            className="w-full px-6 py-4 flex items-center justify-between bg-color-bg-dark text-on-dark hover:bg-color-label transition-colors"
          >
            <span className="font-serif text-xl">🎨 Element-Vergleich & Live-Vorschau (Gruppiert)</span>
            <ChevronDown className={`transition-transform duration-200 ${accordionOpen === 'preview' ? 'rotate-180' : ''}`} />
          </button>

          {accordionOpen === 'preview' && (
            <div className="p-6">
              <p className="font-sans text-sm text-color-body mb-6">
                Vergleiche alle Typography-Elemente mit Live-Vorschau. Änderungen in <code className="bg-yellow-100 px-2 py-1 rounded">tailwind.config.js</code> sind hier sofort sichtbar.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/20">
                      <th className="text-left py-3 px-4 font-semibold">Element</th>
                      <th className="text-left py-3 px-4 font-semibold">Aktuelle Klassen</th>
                      <th className="text-left py-3 px-4 font-semibold">Live-Vorschau</th>
                      <th className="text-left py-3 px-4 font-semibold">Wo verwendet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* ═══════════════════════════════════════════════════════════ */}
                    {/* GRUPPE 1: BASISELEMENTE */}
                    {/* ═══════════════════════════════════════════════════════════ */}
                    <tr>
                      <td colSpan="4" className="py-2 px-4 text-xs font-semibold text-color-heading bg-color-bg-light/50 uppercase tracking-[0.15em]">
                        Gruppe 1: Basiselemente
                      </td>
                    </tr>

                    {/* LABEL */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Label</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-label text-color-label</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-label text-color-label">EVIDENZBASIERT</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">WhatIs, About, CaseStudies, Researchers</td>
                    </tr>

                    {/* H2 */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">H2</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-h3</td>
                      <td className="py-3 px-4">
                        <span className="font-serif text-h3 text-color-heading leading-tight">Was die Forschung sagt</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">WhatIs, About, CaseStudies, Researchers</td>
                    </tr>

                    {/* H3 */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">H3</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-h4</td>
                      <td className="py-3 px-4">
                        <span className="font-serif text-h4 text-color-heading">Marina S.</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">CaseStudies (Item Name), Researchers (Author Name)</td>
                    </tr>

                    {/* BODY */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Body</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-body</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-body text-color-body leading-relaxed">Fließtext mit Standardgröße für lesbaren Inhalt.</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">WhatIs, About</td>
                    </tr>

                    {/* SUBLINE */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Subline</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-subline text-color-body italic</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-subline text-color-body italic">Ergänzender Text in Kursiv (16px)</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">CaseStudies (unter H2, unter Namen)</td>
                    </tr>

                    {/* QUOTE */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Quote</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-quote-featured italic</td>
                      <td className="py-3 px-4 bg-color-bg-dark">
                        <span className="font-serif text-quote-featured italic leading-tight text-on-dark">"The evidence suggests..."</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">Researchers (Featured)</td>
                    </tr>

                    {/* ═══════════════════════════════════════════════════════════ */}
                    {/* GRUPPE 2: SPEZIALELEMENTE */}
                    {/* ═══════════════════════════════════════════════════════════ */}
                    <tr>
                      <td colSpan="4" className="py-2 px-4 text-xs font-semibold text-color-heading bg-color-bg-light/50 uppercase tracking-[0.15em]">
                        Gruppe 2: Spezialelemente
                      </td>
                    </tr>

                    {/* DISCLAIMER */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Disclaimer</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-disclaimer text-color-body</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-disclaimer text-color-body">* Namen wurde geändert</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">CaseStudies</td>
                    </tr>

                    {/* TEASER */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Item Teaser</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-base text-color-body italic</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-base text-color-body italic">Kurzbeschreibung des Falls</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">CaseStudies</td>
                    </tr>

                    {/* LEAD */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Lead (Short)</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-description text-on-dark-body</td>
                      <td className="py-3 px-4 bg-color-bg-dark">
                        <span className="font-serif text-description text-on-dark-body leading-relaxed">Kurzbeschreibung des Autors</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">Researchers</td>
                    </tr>

                    {/* LIST */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">List</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-list text-color-body</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-list text-color-body">— NLP Master (16px)</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">About (Credentials Items)</td>
                    </tr>

                    {/* ═══════════════════════════════════════════════════════════ */}
                    {/* GRUPPE 3: UI-ELEMENTE */}
                    {/* ═══════════════════════════════════════════════════════════ */}
                    <tr>
                      <td colSpan="4" className="py-2 px-4 text-xs font-semibold text-color-heading bg-color-bg-light/50 uppercase tracking-[0.15em]">
                        Gruppe 3: UI-Elemente
                      </td>
                    </tr>

                    {/* READ MORE */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Read More</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-read-more</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-read-more">Mehr lesen</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">Researchers</td>
                    </tr>

                    {/* LINK */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Link</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-source-link</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-source-link">Quelle →</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">Researchers</td>
                    </tr>

                    {/* ═══════════════════════════════════════════════════════════ */}
                    {/* GRUPPE 4: METADATEN */}
                    {/* ═══════════════════════════════════════════════════════════ */}
                    <tr>
                      <td colSpan="4" className="py-2 px-4 text-xs font-semibold text-color-heading bg-color-bg-light/50 uppercase tracking-[0.15em]">
                        Gruppe 4: Metadaten
                      </td>
                    </tr>

                    {/* ROLE */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Role</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-sm text-on-dark-role uppercase tracking-wider</td>
                      <td className="py-3 px-4 bg-color-bg-dark">
                        <span className="font-sans text-sm text-on-dark-role uppercase tracking-wider">University of Virginia</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">Researchers</td>
                    </tr>

                    {/* DATE */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Date</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-sm text-on-dark-role</td>
                      <td className="py-3 px-4 bg-color-bg-dark">
                        <span className="font-sans text-sm text-on-dark-role">*1918–2007</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">Researchers</td>
                    </tr>

                    {/* NAME */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Name</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-author-name</td>
                      <td className="py-3 px-4 bg-color-bg-dark">
                        <span className="font-serif text-author-name text-on-dark">Ian Stevenson MD</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">Researchers</td>
                    </tr>

                    {/* TAG */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Item Tag</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-sm tracking-[0.15em] uppercase text-color-label</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-sm tracking-[0.15em] uppercase text-color-label">HEILUNG</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">CaseStudies</td>
                    </tr>

                    {/* ═══════════════════════════════════════════════════════════ */}
                    {/* GRUPPE 5: SONSTIGE */}
                    {/* ═══════════════════════════════════════════════════════════ */}
                    <tr>
                      <td colSpan="4" className="py-2 px-4 text-xs font-semibold text-color-heading bg-color-bg-light/50 uppercase tracking-[0.15em]">
                        Gruppe 5: Sonstige
                      </td>
                    </tr>

                    {/* CREDENTIALS LABEL */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Credentials Label</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-label text-color-label</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-label text-color-label">AUSBILDUNGEN & ZERTIFIZIERUNGEN</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">About</td>
                    </tr>

                    {/* CREDENTIALS ITEM */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Credentials Item</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-sm text-color-body</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-sm text-color-body">— NLP Master & NR Practitioner</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">About</td>
                    </tr>

                    {/* SECTION BODY */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Section Body</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-base md:text-lg text-color-body leading-relaxed</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-base md:text-lg text-color-body leading-relaxed">Detaillierter Beschreibungstext</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">CaseStudies (Situation/Session/Result)</td>
                    </tr>

                    {/* SHORT VERSION */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-color-heading">Short Version</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-description text-on-dark-body</td>
                      <td className="py-3 px-4 bg-color-bg-dark">
                        <span className="font-serif text-description text-on-dark-body leading-relaxed">Kurzbeschreibung des Autors</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">Researchers</td>
                    </tr>

                    {/* LONG VERSION */}
                    <tr>
                      <td className="py-3 px-4 font-semibold text-color-heading">Long Version</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-base md:text-lg text-on-dark-body leading-relaxed</td>
                      <td className="py-3 px-4 bg-color-bg-dark">
                        <span className="font-serif text-base md:text-lg text-on-dark-body leading-relaxed">Ausführliche Biografie des Autors</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-color-body">Researchers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Sections Divider */}
        <div className="mb-16 pb-8 border-t border-black/10">
          <h2 className="font-serif text-2xl text-color-heading mb-4">📝 Live Sections</h2>
          <p className="font-sans text-sm text-color-body">
            Unten siehst du die 8 Sections mit Debug-Labels (aktiviere oben rechts den Toggle).
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTIONS (full-width - no wrapper!) */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <HeroV3Section debugMode={debugMode} />
      <ServicesSectionCopy debugMode={debugMode} />
      <WelcomeSectionCopy debugMode={debugMode} />
      <ResearcherQuotesSectionCopy debugMode={debugMode} />
      <WhatIsSectionCopy debugMode={debugMode} />
      <AboutSectionCopy debugMode={debugMode} />
      <CaseStudiesSectionCopy debugMode={debugMode} />
      <ResearchersSectionCopy debugMode={debugMode} />

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-black/10 text-center">
        <p className="font-sans text-sm text-color-label">
          /typo-demo — Design Exploration Mode
        </p>
      </div>
    </div>
  )
}
