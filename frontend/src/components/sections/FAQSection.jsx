import React from 'react'
import { faq } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'
import { ChevronDown } from 'lucide-react'
import { useNavigation } from '../../contexts/NavigationContext'

/**
 * FAQSection — Frequently Asked Questions
 *
 * Minimalist accordion with beige background
 * Only one item expanded at a time
 * FAQ-Index wird aus NavigationContext geholt (Single Source of Truth)
 */
export default function FAQSection() {
  const { expandedFAQIndex, setExpandedFAQIndex } = useNavigation()

  const toggleExpand = (index) => {
    setExpandedFAQIndex(expandedFAQIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="py-20 md:py-28 bg-brand-cream"
    >
      <div className="max-w-content mx-auto px-6">
        <SectionLabel text={faq.bigLabel} />
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mt-3 mb-16">
          {faq.headline}
        </h2>

        <div>
          {faq.items.map((item, index) => (
            <div id={`faq-${index}`} key={index} className="border-t border-black/10" style={{ scrollMarginTop: 80 }}>
              <button
                onClick={() => toggleExpand(index)}
                className="w-full flex justify-between items-center py-6 text-left font-sans text-label hover:text-label/80 transition-colors"
              >
                <span className="font-medium text-lg">{item.question}</span>
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
                <p className="font-sans text-heading leading-relaxed whitespace-pre-line text-lg">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
