import { faq } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'
import DebugLabel from '../ui/DebugLabel'
import { ChevronDown } from 'lucide-react'
import { useNavigation } from '../../contexts/NavigationContext'
import { useAccordionScroll } from '../../hooks/useAccordionScroll'

/**
 * FAQSectionCopy — FAQ section with typography tokens
 *
 * MIGRATED to design tokens (Single Source of Truth):
 * - Font-family: font-secondary (headlines), font-primary (body)
 * - Label: text-label (15px) + color-label
 * - Headline: text-h2 (36px) + color-heading
 * - Question: text-h4 (24px) + color-heading
 * - Answer: text-body (18px) + color-heading
 *
 * CRITICAL PRESERVED:
 * - Section with id="faq" (scroll target)
 * - NavigationContext for expandedFAQIndex (Single Source of Truth)
 * - Only one item expanded at a time
 * - Map over faq.items
 */
export default function FAQSectionCopy({ debugMode = false }) {
  const { expandedFAQIndex, setExpandedFAQIndex } = useNavigation()
  const toggleExpand = useAccordionScroll(expandedFAQIndex, setExpandedFAQIndex)

  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="py-20 md:py-28 bg-color-bg-light"
    >
      <div className="max-w-content mx-auto px-6">
        <DebugLabel type="label" debugMode={debugMode}>
          <SectionLabel text={faq.bigLabel} />
        </DebugLabel>

        <DebugLabel type="h2" debugMode={debugMode}>
          <h2 className="font-secondary text-h2 text-color-heading leading-tight section-block-spacing">
            {faq.headline}
          </h2>
        </DebugLabel>

        <div>
          {faq.items.map((item, index) => (
            <div id={`faq-${index}`} key={index} className="border-t border-color-border" style={{ scrollMarginTop: 80 }}>
              <button
                onClick={(e) => toggleExpand(index, e)}
                className="w-full flex justify-between items-center py-6 text-left font-primary text-color-label hover:text-color-label/80 transition-colors"
                data-testid={`faq-${index}`}
              >
                <DebugLabel type="h4" debugMode={debugMode}>
                  <span className="font-medium text-h4 text-color-heading">{item.question}</span>
                </DebugLabel>
                <ChevronDown
                  className={`transition-transform duration-500 ease-out ${
                    expandedFAQIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-600 ease-out ${
                  expandedFAQIndex === index ? 'max-h-[600px] pb-6' : 'max-h-0'
                }`}
              >
                <DebugLabel type="body" debugMode={debugMode}>
                  {item.answer.split('\n\n').map((paragraph, i, arr) => (
                    <p
                      key={i}
                      className={`font-primary text-body text-color-heading leading-relaxed ${
                        i < arr.length - 1 ? 'paragraph-spacing' : ''
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </DebugLabel>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
