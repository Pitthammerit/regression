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
        <DebugLabel type="label" debugMode={debugMode}>
          <SectionLabel text={cases.label} />
        </DebugLabel>
        <DebugLabel type="h2" debugMode={debugMode}>
          <h2 className="font-secondary text-h2 text-color-primary leading-tight text-center content-spacing-md">
            {cases.headline}
          </h2>
        </DebugLabel>
        <DebugLabel type="body-lg" debugMode={debugMode}>
          <p className="font-primary text-body-lg text-color-text leading-relaxed">{cases.body}</p>
        </DebugLabel>
      </div>

      {/* Hint — always visible */}
      <div className="mx-auto flex items-center justify-center gap-2 text-hint hint-italic text-color-secondary italic max-w-fit mb-4">
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
                  <LazyImage
                    src="https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/client-portraits/female-avatar.svg"
                    alt={item.name}
                    className="w-12 h-12"
                  />
                </div>
              )}
              <div className="flex-1 pr-4">
                <DebugLabel type="label" debugMode={debugMode}>
                  <span className="font-primary text-label label text-color-secondary block item-tag-spacing">
                    {item.tag}
                  </span>
                </DebugLabel>
                <DebugLabel type="h3" debugMode={debugMode}>
                  <span className="font-secondary text-h3 text-color-primary group-hover:text-color-secondary transition-colors block leading-snug">
                    {item.name}{item.title ? ` — ${item.title}` : ''}
                  </span>
                </DebugLabel>
                <DebugLabel type="subline" debugMode={debugMode}>
                  <span className="text-subline subline-italic text-color-text block element-spacing-xs">
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
                    <DebugLabel type="label" debugMode={debugMode}>
                      <span className="font-primary text-label label text-color-secondary block block-label-spacing">
                        {block.label}
                      </span>
                    </DebugLabel>
                    <DebugLabel type="body" debugMode={debugMode}>
                      <p className="font-primary text-color-text text-body">
                        {block.text}
                      </p>
                    </DebugLabel>
                  </div>
                ))}
              </div>
              {/* Tanja-specific anonymity note — inside her accordion */}
              {item.name.includes('*') && (
                <DebugLabel type="disclaimer" debugMode={debugMode}>
                  <p className="text-disclaimer disclaimer-italic text-color-text/35 element-spacing-sm">
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
