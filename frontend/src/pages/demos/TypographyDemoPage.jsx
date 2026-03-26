import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
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
    <div className="bg-brand-cream bg-paper min-h-screen font-sans text-brand-body">
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

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ACCORDION 1: Design Tokens aus tailwind.config.js */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="mb-8 border border-black/10 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => setAccordionOpen(accordionOpen === 'tokens' ? null : 'tokens')}
            className="w-full px-6 py-4 flex items-center justify-between bg-brand-deep text-white hover:bg-brand-steel transition-colors"
          >
            <span className="font-serif text-xl">📐 Design Tokens (aus tailwind.config.js)</span>
            <ChevronDown className={`transition-transform duration-200 ${accordionOpen === 'tokens' ? 'rotate-180' : ''}`} />
          </button>

          {accordionOpen === 'tokens' && (
            <div className="p-6">
              <p className="font-sans text-sm text-brand-muted mb-6">
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
                      <td className="py-3 px-4 text-xs text-brand-muted">Hero Haupt-Headline</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">hero</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">—</td>
                      <td className="py-3 px-4 font-mono text-xs">clamp(1.44rem, 3.84vw, 3.36rem)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Hero Sub-Headline</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">h3</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">H3</td>
                      <td className="py-3 px-4 font-mono text-xs">1.875rem (30px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Section H3</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">h2</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">—</td>
                      <td className="py-3 px-4 font-mono text-xs">2.25rem (36px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Section H2</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">h1</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">—</td>
                      <td className="py-3 px-4 font-mono text-xs">3rem (48px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Section H1</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">h4</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">H4</td>
                      <td className="py-3 px-4 font-mono text-xs">1.5rem (24px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Section H4</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">body</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">BODY</td>
                      <td className="py-3 px-4 font-mono text-xs">1.125rem (18px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Body Text Basis</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">body-lg</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">—</td>
                      <td className="py-3 px-4 font-mono text-xs">1.25rem (20px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Body Text Large</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">label</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">LABEL</td>
                      <td className="py-3 px-4 font-mono text-xs">0.75rem (12px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Labels, Metadata</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">label-wide</td>
                      <td className="py-3 px-4 font-mono text-xs">0.2em</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">LetterSpreading Labels</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-50 rounded">heading-tight</td>
                      <td className="py-3 px-4 font-mono text-xs">-0.02em</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">LetterSpreading Headlines</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">disclaimer</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">DISCLAIMER</td>
                      <td className="py-3 px-4 font-mono text-xs">0.75rem (12px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Disclaimer-Texte</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">read-more</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">READ-MORE</td>
                      <td className="py-3 px-4 font-mono text-xs">0.875rem (14px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Mehr lesen / Weniger lesen Buttons</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">button-text</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">BUTTON</td>
                      <td className="py-3 px-4 font-mono text-xs">0.875rem (14px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Button-Texte (allgemein)</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">source-link</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">LINK</td>
                      <td className="py-3 px-4 font-mono text-xs">0.875rem (14px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Quellen-Links</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">subline</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">SUBLINES</td>
                      <td className="py-3 px-4 font-mono text-xs">1rem (16px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Sublines (unter H2, unter Namen)</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">list</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">LIST</td>
                      <td className="py-3 px-4 font-mono text-xs">1rem (16px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">List-Items (Credentials, Bullets)</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">author-name</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">NAME</td>
                      <td className="py-3 px-4 font-mono text-xs">2rem (32px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Autoren-Namen</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">description</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">LEAD</td>
                      <td className="py-3 px-4 font-mono text-xs">1.625rem (26px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Kurzbeschreibungen</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">quote</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">QUOTE</td>
                      <td className="py-3 px-4 font-mono text-xs">1.5rem (24px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Standard Zitate</td>
                    </tr>
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-mono text-xs bg-green-50 rounded text-green-800">quote-featured</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">QUOTE-FEATURED</td>
                      <td className="py-3 px-4 font-mono text-xs">2.25rem (36px)</td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Große Zitate</td>
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
            className="w-full px-6 py-4 flex items-center justify-between bg-brand-deep text-white hover:bg-brand-steel transition-colors"
          >
            <span className="font-serif text-xl">🎨 Element-Vergleich & Live-Vorschau (Gruppiert)</span>
            <ChevronDown className={`transition-transform duration-200 ${accordionOpen === 'preview' ? 'rotate-180' : ''}`} />
          </button>

          {accordionOpen === 'preview' && (
            <div className="p-6">
              <p className="font-sans text-sm text-brand-muted mb-6">
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
                      <td colSpan="4" className="py-2 px-4 text-xs font-semibold text-brand-deep bg-brand-cream/50 uppercase tracking-[0.15em]">
                        Gruppe 1: Basiselemente
                      </td>
                    </tr>

                    {/* LABEL */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Label</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-label text-brand-steel</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-label text-brand-steel">EVIDENZBASIERT</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">WhatIs, About, CaseStudies, Researchers</td>
                    </tr>

                    {/* H2 */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">H2</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-h3</td>
                      <td className="py-3 px-4">
                        <span className="font-serif text-h3 text-brand-deep leading-tight">Was die Forschung sagt</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">WhatIs, About, CaseStudies, Researchers</td>
                    </tr>

                    {/* H3 */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">H3</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-h4</td>
                      <td className="py-3 px-4">
                        <span className="font-serif text-h4 text-brand-deep">Marina S.</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">CaseStudies (Item Name), Researchers (Author Name)</td>
                    </tr>

                    {/* BODY */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Body</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-body</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-body text-brand-body leading-relaxed">Fließtext mit Standardgröße für lesbaren Inhalt.</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">WhatIs, About</td>
                    </tr>

                    {/* SUBLINE */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Subline</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-subline text-brand-muted italic</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-subline text-brand-muted italic">Ergänzender Text in Kursiv (16px)</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">CaseStudies (unter H2, unter Namen)</td>
                    </tr>

                    {/* QUOTE */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Quote</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-quote-featured italic</td>
                      <td className="py-3 px-4 bg-brand-deep">
                        <span className="font-serif text-quote-featured italic leading-tight text-white/90">"The evidence suggests..."</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Researchers (Featured)</td>
                    </tr>

                    {/* ═══════════════════════════════════════════════════════════ */}
                    {/* GRUPPE 2: SPEZIALELEMENTE */}
                    {/* ═══════════════════════════════════════════════════════════ */}
                    <tr>
                      <td colSpan="4" className="py-2 px-4 text-xs font-semibold text-brand-deep bg-brand-cream/50 uppercase tracking-[0.15em]">
                        Gruppe 2: Spezialelemente
                      </td>
                    </tr>

                    {/* DISCLAIMER */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Disclaimer</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-disclaimer text-brand-muted</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-disclaimer text-brand-muted">* Namen wurde geändert</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">CaseStudies</td>
                    </tr>

                    {/* TEASER */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Item Teaser</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-base text-brand-muted italic</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-base text-brand-muted italic">Kurzbeschreibung des Falls</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">CaseStudies</td>
                    </tr>

                    {/* LEAD */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Lead (Short)</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-description text-white/80</td>
                      <td className="py-3 px-4 bg-brand-deep">
                        <span className="font-serif text-description text-white/80 leading-relaxed">Kurzbeschreibung des Autors</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Researchers</td>
                    </tr>

                    {/* LIST */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">List</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-list text-brand-muted</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-list text-brand-muted">— NLP Master (16px)</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">About (Credentials Items)</td>
                    </tr>

                    {/* ═══════════════════════════════════════════════════════════ */}
                    {/* GRUPPE 3: UI-ELEMENTE */}
                    {/* ═══════════════════════════════════════════════════════════ */}
                    <tr>
                      <td colSpan="4" className="py-2 px-4 text-xs font-semibold text-brand-deep bg-brand-cream/50 uppercase tracking-[0.15em]">
                        Gruppe 3: UI-Elemente
                      </td>
                    </tr>

                    {/* READ MORE */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Read More</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-read-more</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-read-more">Mehr lesen</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Researchers</td>
                    </tr>

                    {/* LINK */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Link</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-source-link</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-source-link">Quelle →</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Researchers</td>
                    </tr>

                    {/* ═══════════════════════════════════════════════════════════ */}
                    {/* GRUPPE 4: METADATEN */}
                    {/* ═══════════════════════════════════════════════════════════ */}
                    <tr>
                      <td colSpan="4" className="py-2 px-4 text-xs font-semibold text-brand-deep bg-brand-cream/50 uppercase tracking-[0.15em]">
                        Gruppe 4: Metadaten
                      </td>
                    </tr>

                    {/* ROLE */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Role</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-sm text-white/70 uppercase tracking-wider</td>
                      <td className="py-3 px-4 bg-brand-deep">
                        <span className="font-sans text-sm text-white/70 uppercase tracking-wider">University of Virginia</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Researchers</td>
                    </tr>

                    {/* DATE */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Date</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-sm text-white/50</td>
                      <td className="py-3 px-4 bg-brand-deep">
                        <span className="font-sans text-sm text-white/50">*1918–2007</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Researchers</td>
                    </tr>

                    {/* NAME */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Name</td>
                      <td className="py-3 px-4 font-mono text-xs bg-green-100 rounded text-green-800">text-author-name</td>
                      <td className="py-3 px-4 bg-brand-deep">
                        <span className="font-serif text-author-name text-white">Ian Stevenson MD</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Researchers</td>
                    </tr>

                    {/* TAG */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Item Tag</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-sm tracking-[0.15em] uppercase text-brand-steel</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-sm tracking-[0.15em] uppercase text-brand-steel">HEILUNG</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">CaseStudies</td>
                    </tr>

                    {/* ═══════════════════════════════════════════════════════════ */}
                    {/* GRUPPE 5: SONSTIGE */}
                    {/* ═══════════════════════════════════════════════════════════ */}
                    <tr>
                      <td colSpan="4" className="py-2 px-4 text-xs font-semibold text-brand-deep bg-brand-cream/50 uppercase tracking-[0.15em]">
                        Gruppe 5: Sonstige
                      </td>
                    </tr>

                    {/* CREDENTIALS LABEL */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Credentials Label</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-label text-brand-steel</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-label text-brand-steel">AUSBILDUNGEN & ZERTIFIZIERUNGEN</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">About</td>
                    </tr>

                    {/* CREDENTIALS ITEM */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Credentials Item</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-sm text-brand-muted</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-sm text-brand-muted">— NLP Master & NR Practitioner</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">About</td>
                    </tr>

                    {/* SECTION BODY */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Section Body</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-base md:text-lg text-brand-muted leading-relaxed</td>
                      <td className="py-3 px-4">
                        <span className="font-sans text-base md:text-lg text-brand-muted leading-relaxed">Detaillierter Beschreibungstext</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">CaseStudies (Situation/Session/Result)</td>
                    </tr>

                    {/* SHORT VERSION */}
                    <tr className="border-b border-black/10">
                      <td className="py-3 px-4 font-semibold text-brand-deep">Short Version</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-description text-white/80</td>
                      <td className="py-3 px-4 bg-brand-deep">
                        <span className="font-serif text-description text-white/80 leading-relaxed">Kurzbeschreibung des Autors</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Researchers</td>
                    </tr>

                    {/* LONG VERSION */}
                    <tr>
                      <td className="py-3 px-4 font-semibold text-brand-deep">Long Version</td>
                      <td className="py-3 px-4 font-mono text-xs bg-yellow-100 rounded">text-base md:text-lg text-white/80 leading-relaxed</td>
                      <td className="py-3 px-4 bg-brand-deep">
                        <span className="font-serif text-base md:text-lg text-white/80 leading-relaxed">Ausführliche Biografie des Autors</span>
                      </td>
                      <td className="py-3 px-4 text-xs text-brand-muted">Researchers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Sections Divider */}
        <div className="mb-16 pb-8 border-t border-black/10">
          <h2 className="font-serif text-2xl text-brand-deep mb-4">📝 Live Sections</h2>
          <p className="font-sans text-sm text-brand-muted">
            Unten siehst du die 4 Sections mit Debug-Labels (aktiviere oben rechts den Toggle).
          </p>
        </div>

        {/* Sections */}
        <WhatIsSectionCopy debugMode={debugMode} />
        <AboutSectionCopy debugMode={debugMode} />
        <CaseStudiesSectionCopy debugMode={debugMode} />
        <ResearchersSectionCopy debugMode={debugMode} />

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
