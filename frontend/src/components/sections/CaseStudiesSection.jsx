import { useState } from 'react'
import { useCaseStudiesScroll } from '../../hooks/useCaseStudiesScroll'
import { cases } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import DebugLabel from '../ui/DebugLabel'
import LazyImage from '../ui/LazyImage'
import AccordionWrap from '../ui/AccordionWrap'
import { ChevronDown } from 'lucide-react'

export default function CaseStudiesSection({ debugMode = false }) {
  // All items closed by default, click to open individual
  const [openIndex, setOpenIndex] = useState(-1)
  const toggleWithScroll = useCaseStudiesScroll(openIndex, setOpenIndex)

  return (
    <SectionWrapper id="cases" data-testid="cases-section">
      <div className="max-w-centered-header content-spacing-lg text-center mx-auto">
        <DebugLabel type="typography-label" debugMode={debugMode}>
          <SectionLabel text={cases.label} />
        </DebugLabel>
        <DebugLabel type="typography-h2" debugMode={debugMode}>
          <h2 className="typography-h2 leading-tight text-center content-spacing-md">
            {cases.headline}
          </h2>
        </DebugLabel>
        <DebugLabel type="typography-body-lg" debugMode={debugMode}>
          <p className="typography-body-lg leading-relaxed">{cases.body}</p>
        </DebugLabel>
      </div>

      {/* Hint — always visible */}
      <div className="mx-auto flex items-center justify-center gap-2 typography-hint text-color-secondary max-w-fit mb-4">
        <span>Klicke auf eine der Geschichten, um sie zu lesen.</span>
      </div>

      {/* Animated arrow — hint to scroll/click */}
      <div className="flex justify-center pb-4">
        <button
          onClick={() => {
            const firstCase = document.querySelector('[data-testid="case-accordion-0"]')
            if (firstCase) firstCase.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }}
          aria-label="Zu den Fallbeispielen scrollen"
          className="opacity-50 hover:opacity-80 transition-opacity duration-300"
        >
          <ChevronDown className="w-16 h-16 text-color-primary animate-pulse-down" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {cases.items.map((item, i) => (
          <div key={i}>
            <button
              onClick={(e) => toggleWithScroll(i, e)}
              className="w-full flex items-start gap-5 py-8 text-left group"
              data-testid={`case-accordion-${i}`}
            >
              {item.image ? (
                <LazyImage
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-full object-cover object-top border border-color-primary shrink-0 scale-[1.03]"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-color-bg-light/60 border border-color-primary flex items-center justify-center shrink-0 overflow-hidden">
                  <svg
                    viewBox="0 0 31.259 31.259"
                    className="w-[99px] h-[99px]"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <g className="text-color-primary" fill="currentColor">
                      <path d="M26.646,18.433c-0.57-1.264-3.535-2.388-4.557-2.744c-1.588-3.478-0.732-7.864-0.732-7.864
        C21.08,9.073,20.722,9.55,20.722,9.55c-0.281,2.256-2.119,4.114-2.119,4.114c-0.035,0.607,0.043,1.123,0.188,1.562
        c-2.842,4.588-5.166,2.187-6.312,0.314c0.221-0.505,0.352-1.118,0.311-1.877c0,0-1.838-1.857-2.119-4.114
        c0,0-0.357-0.477-0.639-1.725c0,0,0.857,4.372-0.719,7.847c-1.227,0.523-2.455,0.897-2.455,0.897
        c-1.33,0.512-1.891,1.275-1.891,1.275c-1.966,2.913-2.196,9.399-2.196,9.399c0.025,1.482,0.664,1.634,0.664,1.634
        c4.52,2.018,11.604,2.375,11.604,2.375c7.277,0.153,12.576-2.067,12.576-2.067c0.77-0.487,0.793-0.869,0.793-0.869
        C28.943,23.667,26.646,18.433,26.646,18.433z M18.007,25.965h-4.758V24.16h4.758V25.965z"/>
                      <path d="M18.835,4.991c0.076,0.29,0.545,1.782,2.117,2.456c0,0,0.059-0.614,0.229-0.672c0,0,0.191,0.096,0.25,0.327
        c0,0,0.41-3.921-1.375-5.383l0.012-0.022c-3.725-3.287-7.943-0.788-7.943-0.788C9.035,2.901,9.9,7.195,9.9,7.195
        C15.709,7.743,18.744,5.07,18.835,4.991z"/>
                    </g>
                  </svg>
                </div>
              )}
              <div className="flex-1 pr-4">
                <DebugLabel type="typography-label" debugMode={debugMode}>
                  <span className="typography-label block">
                    {item.tag}
                  </span>
                </DebugLabel>
                <DebugLabel type="typography-h3" debugMode={debugMode}>
                  <span className="typography-h3 group-hover:text-color-secondary transition-colors block leading-snug">
                    {item.name}{item.title ? ` — ${item.title}` : ''}
                  </span>
                </DebugLabel>
                <DebugLabel type="typography-body" debugMode={debugMode}>
                  <span className="typography-subline text-color-text italic block element-spacing-xs">
                    {item.teaser}
                  </span>
                </DebugLabel>
              </div>
              <ChevronDown
                size={18}
                className={`text-color-secondary mt-1 shrink-0 transition-transform transition-normal ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>

            <AccordionWrap isOpen={openIndex === i}>
              <div className="pb-10 grid md:grid-cols-3 gap-6 pt-2">
                {[
                  { label: cases.sectionLabels.situation, text: item.situation },
                  { label: cases.sectionLabels.session,   text: item.session },
                  { label: cases.sectionLabels.result,    text: item.result },
                ].map((block) => (
                  <div key={block.label} className="border-l border-color-primary pl-4">
                    <DebugLabel type="typography-label" debugMode={debugMode}>
                      <span className="typography-label block">
                        {block.label}
                      </span>
                    </DebugLabel>
                    <DebugLabel type="typography-body" debugMode={debugMode}>
                      <p className="typography-body">
                        {block.text}
                      </p>
                    </DebugLabel>
                  </div>
                ))}
              </div>
              {/* Tanja-specific anonymity note — inside her accordion */}
              {item.name.includes('*') && (
                <DebugLabel type="typography-disclaimer" debugMode={debugMode}>
                  <p className="typography-disclaimer text-color-text/35 element-spacing-sm">
                    * Namen wurde geändert
                  </p>
                </DebugLabel>
              )}
            </AccordionWrap>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
