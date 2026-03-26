import React, { useState, useEffect } from 'react'
import { cases } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import DebugLabel from '../ui/DebugLabel'
import LazyImage from '../ui/LazyImage'
import { ChevronDown } from 'lucide-react'

function AvatarSilhouette({ gender }) {
  return (
    <div className="w-12 h-12 rounded-full bg-brand-sand/60 border border-black/10 flex items-center justify-center shrink-0 overflow-hidden">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-brand-deep/30">
        <circle cx="16" cy="10" r="5" fill="currentColor" />
        {gender === 'female' ? (
          <path d="M7 28 C7 20 10 17 16 17 C22 17 25 20 25 28" fill="currentColor" />
        ) : (
          <path d="M6 28 C6 19 10 17 16 17 C22 17 26 19 26 28" fill="currentColor" />
        )}
      </svg>
    </div>
  )
}

export default function CaseStudiesSectionCopy({ debugMode = false }) {
  // Marina (index 0) opens by default
  const [openIndex, setOpenIndex] = useState(0)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    try {
      const count = parseInt(localStorage.getItem('cases_hint_count') || '0')
      if (count < 3) {
        localStorage.setItem('cases_hint_count', String(count + 1))
        setShowHint(true)
        const t = setTimeout(() => setShowHint(false), 5000)
        return () => clearTimeout(t)
      }
    } catch (error) {
      // localStorage unavailable (private browsing, quota exceeded, etc.)
      // Silently fail - hint just won't show or persist
      console.warn('localStorage access failed:', error)
      // Still show hint on first visit even without localStorage
      setShowHint(true)
      const t = setTimeout(() => setShowHint(false), 5000)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <SectionWrapper id="cases" data-testid="cases-section">
      <div className="max-w-2xl mb-6">
        <DebugLabel type="label" debugMode={debugMode}>
          <SectionLabel text={cases.label} />
        </DebugLabel>
        <DebugLabel type="h2" debugMode={debugMode}>
          <h2 className="font-serif text-h2 text-brand-deep leading-tight">
            {cases.headline}
          </h2>
        </DebugLabel>
        <DebugLabel type="subline" debugMode={debugMode}>
          <p className="font-sans text-subline text-brand-body mt-4 italic">{cases.subline}</p>
        </DebugLabel>
      </div>

      {/* Hint — appears on first 3 page loads */}
      <div
        className={`mb-8 flex items-center gap-2 font-sans text-sm text-brand-steel/60 italic transition-opacity duration-700 ${showHint ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        data-testid="cases-hint"
      >
        <span className="text-base">↓</span>
        <span>Klicke auf die Namen, um mehr zu lesen</span>
      </div>

      <div className="divide-y divide-black/10">
        {cases.items.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-start gap-5 py-8 text-left group"
              data-testid={`case-accordion-${i}`}
            >
              {item.image ? (
                <LazyImage
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover object-top border border-black/10 shrink-0"
                />
              ) : (
                <AvatarSilhouette gender={item.gender} />
              )}
              <div className="flex-1 pr-4">
                <DebugLabel type="label" debugMode={debugMode}>
                  <span className="font-sans text-label tracking-[0.2em] uppercase text-brand-steel block mb-2">
                    {item.tag}
                  </span>
                </DebugLabel>
                <DebugLabel type="h4" debugMode={debugMode}>
                  <span className="font-serif text-h4 text-brand-deep group-hover:text-brand-steel transition-colors block leading-snug">
                    {item.name}{item.title ? ` — ${item.title}` : ''}
                  </span>
                </DebugLabel>
                <DebugLabel type="subline" debugMode={debugMode}>
                  <span className="font-sans text-subline text-brand-body italic block mt-2">
                    {item.teaser}
                  </span>
                </DebugLabel>
              </div>
              <ChevronDown
                size={18}
                className={`text-brand-steel mt-1 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>

            <div className={`overflow-hidden transition-all duration-500 ${openIndex === i ? 'max-h-[1600px] pb-10' : 'max-h-0'}`}>
              <div className="grid md:grid-cols-3 gap-6 pt-2">
                {[
                  { label: cases.sectionLabels.situation, text: item.situation },
                  { label: cases.sectionLabels.session,   text: item.session },
                  { label: cases.sectionLabels.result,    text: item.result },
                ].map((block) => (
                  <div key={block.label} className="border-l-2 border-brand-deep pl-4">
                    <DebugLabel type="label" debugMode={debugMode}>
                      <span className="font-sans text-label tracking-[0.2em] uppercase text-brand-steel block mb-3">
                        {block.label}
                      </span>
                    </DebugLabel>
                    <DebugLabel type="body" debugMode={debugMode}>
                      <p className="font-sans text-body text-brand-body leading-relaxed">
                        {block.text}
                      </p>
                    </DebugLabel>
                  </div>
                ))}
              </div>
              {/* Tanja-specific anonymity note — inside her accordion */}
              {item.name.includes('*') && (
                <DebugLabel type="disclaimer" debugMode={debugMode}>
                  <p className="text-disclaimer text-brand-body/35 mt-6 italic">
                    * Namen wurde geändert
                  </p>
                </DebugLabel>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
