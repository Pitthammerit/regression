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
                <div className="w-24 h-24 rounded-full bg-color-bg-light/60 border border-color-primary flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 64 64"
                    className="w-14 h-14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {/* Hair - elegant bob shape */}
                    <path
                      d="M12 28C12 18 18 12 32 12C46 12 52 18 52 28C52 32 50 34 48 34C48 28 46 20 32 20C18 20 16 28 16 34C14 34 12 32 12 28Z"
                      fill="currentColor"
                      className="text-color-primary/30"
                    />
                    {/* Head/Neck - feminine shape */}
                    <path
                      d="M32 16C38 16 42 20 42 26V30C42 34 40 36 38 36V44C38 46 36 48 32 48C28 48 26 46 26 44V36C24 36 22 34 22 30V26C22 20 26 16 32 16Z"
                      fill="currentColor"
                      className="text-color-primary/20"
                    />
                    {/* Face outline - subtle */}
                    <path
                      d="M32 18C37 18 40 21 40 26V30C40 33 38 35 35 35V42C35 44 34 45 32 45C30 45 29 44 29 42V35C26 35 24 33 24 30V26C24 21 27 18 32 18Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-color-primary"
                    />
                    {/* Shoulders */}
                    <path
                      d="M20 48C20 44 24 42 32 42C40 42 44 44 44 48V52H20V48Z"
                      fill="currentColor"
                      className="text-color-primary/15"
                    />
                  </svg>
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
