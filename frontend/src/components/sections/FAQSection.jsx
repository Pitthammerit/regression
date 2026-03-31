import { useContent } from '../../contexts/ContentContext'
import SectionLabel from '../ui/SectionLabel'
import DebugLabel from '../ui/DebugLabel'
import AccordionWrap from '../ui/AccordionWrap'
import { ChevronDown } from 'lucide-react'
import { useNavigation } from '../../contexts/NavigationContext'
import { useFAQScroll } from '../../hooks/useFAQScroll'

/**
 * FAQSection — FAQ section with composite typography utilities
 *
 * MIGRATED to composite typography utilities (Single Source of Truth):
 * - Label: typography-label (includes font-family, size, color)
 * - Headline: typography-h2 (includes font-family, size, color, leading)
 * - Question: typography-h4 (includes font-family, size, color)
 * - Answer: typography-body (includes font-family, size, color, leading)
 *
 * CRITICAL PRESERVED:
 * - Section with id="faq" (scroll target)
 * - NavigationContext for expandedFAQIndex (Single Source of Truth)
 * - Only one item expanded at a time
 * - Map over faq.items
 *
 * UPDATED: Using useFAQScroll hook for FAQ-specific scroll behavior
 * - Monitors section-level stability (not button height)
 * - Targets question container (not portrait container)
 * - Waits for full layout stabilization (previous collapse + new expand)
 */
export default function FAQSection({ debugMode = false }) {
  const { faq } = useContent()
  const { expandedFAQIndex, setExpandedFAQIndex } = useNavigation()
  const toggleExpand = useFAQScroll(expandedFAQIndex, setExpandedFAQIndex)

  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="py-20 md:py-28 bg-color-bg-light"
    >
      <div className="max-w-content mx-auto px-6">
        <DebugLabel type="typography-label" debugMode={debugMode}>
          <SectionLabel text={faq.bigLabel} />
        </DebugLabel>

        <DebugLabel type="typography-h2" debugMode={debugMode}>
          <h2 className="typography-h2 section-block-spacing">
            {faq.headline}
          </h2>
        </DebugLabel>

        <div>
          {faq.items.map((item, index) => (
            <div id={`faq-${index}`} key={index} style={{ scrollMarginTop: 80 }}>
              <button
                onClick={(e) => toggleExpand(index, e)}
                className="w-full flex justify-between items-center py-6 text-left font-primary text-color-secondary hover:text-color-secondary/80 transition-colors"
                data-testid={`faq-${index}`}
              >
                <DebugLabel type="typography-h4" debugMode={debugMode}>
                  <span className="typography-h4">{item.question}</span>
                </DebugLabel>
                <ChevronDown
                  className={`chevron transition-transform duration-500 ease-out ${
                    expandedFAQIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AccordionWrap isOpen={expandedFAQIndex === index}>
                <div className="pb-6">
                  <DebugLabel type="typography-body" debugMode={debugMode}>
                    {item.answer.split('\n\n').map((paragraph, i, arr) => (
                      <p
                        key={i}
                        className={`typography-body ${
                          i < arr.length - 1 ? 'paragraph-spacing' : ''
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </DebugLabel>
                </div>
              </AccordionWrap>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
