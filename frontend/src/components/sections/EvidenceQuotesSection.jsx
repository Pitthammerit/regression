import React from 'react'
import { evidence } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'

/**
 * EvidenceQuotesSection — Research authority quotes with portraits
 *
 * Displays 3 researchers with portraits and quotes from evidence.authors
 * Filters for authors with portrait !== null
 * Dark background (bg-brand-deep)
 */
export default function EvidenceQuotesSection() {
  // Filter authors with portraits
  const authorsWithPortraits = evidence.authors.filter(author => author.portrait !== null)

  return (
    <section
      id="evidence-quotes"
      data-testid="evidence-quotes-section"
      className="py-16 md:py-20 bg-brand-deep text-white"
    >
      <div className="max-w-content mx-auto px-6">
        <SectionLabel text={evidence.authorBigLabel} light />
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mt-3 mb-12">
          {evidence.authorHeadline}
        </h2>
        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {authorsWithPortraits.map((author) => (
            <div key={author.id} className="border-t border-white/20 pt-8">
              <LazyImage
                src={author.portrait}
                alt={author.name}
                className="w-32 h-32 rounded-lg object-cover mb-6"
              />
              <blockquote className="font-serif italic text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                "{author.quote}"
              </blockquote>
              <div className="font-sans text-sm font-medium text-white/70">{author.name}</div>
              <div className="font-sans text-xs text-white/40 mt-0.5">{author.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
