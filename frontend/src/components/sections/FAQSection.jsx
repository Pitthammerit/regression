import React, { useState, useEffect } from 'react'
import { faq } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'
import { ChevronDown } from 'lucide-react'

/**
 * FAQSection — Frequently Asked Questions
 *
 * Minimalist accordion with beige background
 * Only one item expanded at a time
 */
export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  // URL hash support for direct FAQ links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith('#faq-')) {
        const index = parseInt(hash.replace('#faq-', ''), 10)
        if (!isNaN(index) && index >= 0 && index < faq.items.length) {
          setExpandedIndex(index)
          // Scroll to the specific FAQ item after a short delay
          setTimeout(() => {
            const element = document.getElementById(`faq-${index}`)
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          }, 100)
        }
      } else if (hash === '#faq') {
        // Scroll to FAQ section but don't expand any item
        const element = document.getElementById('faq')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }

    // Check hash on mount and on change
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

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
            <div id={`faq-${index}`} key={index} className="border-t border-black/10">
              <button
                onClick={() => toggleExpand(index)}
                className="w-full flex justify-between items-center py-6 text-left font-sans text-brand-steel hover:text-brand-steel/80 transition-colors"
              >
                <span className="font-medium text-lg">{item.question}</span>
                <ChevronDown
                  className={`transition-transform duration-500 ease-out ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-600 ease-out ${
                  expandedIndex === index ? 'max-h-[600px] pb-6' : 'max-h-0'
                }`}
              >
                <p className="font-sans text-brand-deep leading-relaxed whitespace-pre-line text-lg">
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
