import React, { useState, useEffect } from 'react'
import { cases } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'
import { ChevronDown, User } from 'lucide-react'

function AvatarSilhouette({ gender }) {
  return (
    <div className="w-24 h-24 rounded-full bg-brand-sand/60 border border-color-light flex items-center justify-center shrink-0">
      <User className="w-12 h-12 text-heading/30" />
    </div>
  )
}

export default function CaseStudiesSection() {
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
        <SectionLabel text={cases.label} />
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-heading leading-tight">
          {cases.headline}
        </h2>
        <p className="font-primary text-sm text-body mt-4 italic">{cases.subline}</p>
      </div>

      {/* Hint — appears on first 3 page loads */}
      <div
        className={`mb-8 flex items-center gap-2 font-primary text-sm text-label/60 italic transition-opacity duration-700 ${showHint ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        data-testid="cases-hint"
      >
        <span className="text-base">↓</span>
        <span>Klicke auf die Namen, um mehr zu lesen</span>
      </div>

      <div className="divide-y divide-color-border">
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
                  className="w-24 h-24 rounded-full object-cover object-top border border-color-light shrink-0"
                />
              ) : (
                <AvatarSilhouette gender={item.gender} />
              )}
              <div className="flex-1 pr-4">
                <span className="font-primary text-sm tracking-[0.15em] uppercase text-label block mb-2">
                  {item.tag}
                </span>
                <span className="font-serif text-2xl md:text-3xl text-heading group-hover:text-label transition-colors block leading-snug">
                  {item.name}{item.title ? ` — ${item.title}` : ''}
                </span>
                <span className="font-primary text-base text-body italic block mt-2">
                  {item.teaser}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`text-label mt-1 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
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
                    <span className="font-primary text-sm tracking-[0.15em] uppercase text-label block mb-3">
                      {block.label}
                    </span>
                    <p className="font-primary text-base md:text-lg text-body leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>
              {/* Tanja-specific anonymity note — inside her accordion */}
              {item.name.includes('*') && (
                <p className="font-primary text-xs text-body/35 mt-6 italic">
                  * Namen wurde geändert
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
