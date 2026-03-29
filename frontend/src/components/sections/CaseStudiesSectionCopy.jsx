import { useState, useEffect } from 'react'
import { cases } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import DebugLabel from '../ui/DebugLabel'
import LazyImage from '../ui/LazyImage'
import { ChevronDown, User } from 'lucide-react'

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
      <div className="max-w-centered-header content-spacing-lg text-center mx-auto">
        <DebugLabel type="label" debugMode={debugMode}>
          <SectionLabel text={cases.label} />
        </DebugLabel>
        <DebugLabel type="h2" debugMode={debugMode}>
          <h2 className="font-secondary text-h2 text-color-heading leading-tight text-center content-spacing-md">
            {cases.headline}
          </h2>
        </DebugLabel>
        <DebugLabel type="body-lg" debugMode={debugMode}>
          <p className="font-primary text-body-lg text-color-label leading-relaxed">{cases.body}</p>
        </DebugLabel>
      </div>

      {/* Animated arrow — hint to scroll/click */}
      <div className="flex justify-center pb-6">
        <button
          onClick={() => {
            const firstCase = document.querySelector('[data-testid="case-accordion-0"]')
            if (firstCase) firstCase.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }}
          aria-label="Zu den Fallbeispielen scrollen"
          className="opacity-50 hover:opacity-80 transition-opacity duration-300"
        >
          <ChevronDown className="w-16 h-16 text-color-heading animate-pulse-down" />
        </button>
      </div>

      {/* Hint — appears on first 3 page loads */}
      <div
        className={`content-spacing mx-auto flex items-center gap-2 text-hint hint-italic text-color-body italic transition-opacity transition-slower max-w-fit ${showHint ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        data-testid="cases-hint"
      >
        <span className="text-icon">↓</span>
        <span>klicke auf eine der geschichten, um sie zu lesen.</span>
      </div>

      <div className="divide-y divide-color-border max-w-4xl mx-auto">
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
                  className="w-24 h-24 rounded-full object-cover object-top border-2 border-color-border shrink-0"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-color-bg-light/60 border-2 border-color-border flex items-center justify-center shrink-0">
                  <User className="w-12 h-12 text-color-heading/30" />
                </div>
              )}
              <div className="flex-1 pr-4">
                <DebugLabel type="label" debugMode={debugMode}>
                  <span className="font-primary text-label label text-color-label block item-tag-spacing">
                    {item.tag}
                  </span>
                </DebugLabel>
                <DebugLabel type="h3" debugMode={debugMode}>
                  <span className="font-secondary text-h3 text-color-heading group-hover:text-color-label transition-colors block leading-snug">
                    {item.name}{item.title ? ` — ${item.title}` : ''}
                  </span>
                </DebugLabel>
                <DebugLabel type="subline" debugMode={debugMode}>
                  <span className="text-subline subline-italic text-color-body block element-spacing-xs">
                    {item.teaser}
                  </span>
                </DebugLabel>
              </div>
              <ChevronDown
                size={18}
                className={`text-color-label mt-1 shrink-0 transition-transform transition-normal ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>

            <div className={`overflow-hidden transition-all transition-slow ${openIndex === i ? 'max-h-[1600px] pb-10' : 'max-h-0'}`}>
              <div className="grid md:grid-cols-3 gap-6 pt-2">
                {[
                  { label: cases.sectionLabels.situation, text: item.situation },
                  { label: cases.sectionLabels.session,   text: item.session },
                  { label: cases.sectionLabels.result,    text: item.result },
                ].map((block) => (
                  <div key={block.label} className="border-l-2 border-color-heading pl-4">
                    <DebugLabel type="label" debugMode={debugMode}>
                      <span className="font-primary text-label label text-color-label block block-label-spacing">
                        {block.label}
                      </span>
                    </DebugLabel>
                    <DebugLabel type="body" debugMode={debugMode}>
                      <p className="font-primary text-color-body text-body">
                        {block.text}
                      </p>
                    </DebugLabel>
                  </div>
                ))}
              </div>
              {/* Tanja-specific anonymity note — inside her accordion */}
              {item.name.includes('*') && (
                <DebugLabel type="disclaimer" debugMode={debugMode}>
                  <p className="text-disclaimer disclaimer-italic text-color-body/35 element-spacing-sm">
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
