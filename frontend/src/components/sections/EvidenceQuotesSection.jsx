import React, { useState } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { evidence } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'

/**
 * EvidenceQuotesSection — Research authority quotes with portraits
 *
 * Displays researchers with portraits and quotes from evidence.authors
 * First 3 are always visible, rest expandable with "Mehr/Weniger" toggle
 * Dark background (bg-brand-deep)
 */
export default function EvidenceQuotesSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  // Filter authors with portraits
  const authorsWithPortraits = evidence.authors.filter(author => author.portrait !== null)
  const hasMore = authorsWithPortraits.length > 3

  return (
    <section
      id="evidence-quotes"
      data-testid="evidence-quotes-section"
      className="py-16 md:py-20 bg-brand-deep text-white"
    >
      <div className="max-w-content mx-auto px-6">
        <SectionLabel text={evidence.authorBigLabel} light />
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mt-3 mb-5">
          {evidence.authorHeadline}
        </h2>

        {/* First row - always visible (3 authors) */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {authorsWithPortraits.slice(0, 3).map((author) => (
            <div key={author.id} className="pt-8">
              <AspectRatio ratio={1 / 1} className="mb-6">
                <LazyImage
                  src={author.portrait}
                  alt={author.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </AspectRatio>
              <blockquote className="font-serif italic text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                "{author.quote}"
              </blockquote>
              <div className="font-sans text-sm font-medium text-white/70">{author.name}</div>
              <div className="font-sans text-xs text-white/40 mt-0.5">{author.role}</div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less divider */}
        {hasMore && (
          <>
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/20"></div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                {isExpanded ? 'Weniger' : 'Mehr'}
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Expanded content - additional authors */}
            {isExpanded && (
              <div className="grid md:grid-cols-3 gap-10 md:gap-14">
                {authorsWithPortraits.slice(3).map((author) => (
                  <div key={author.id} className="pt-8">
                    <AspectRatio ratio={1 / 1} className="mb-6">
                      <LazyImage
                        src={author.portrait}
                        alt={author.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </AspectRatio>
                    <blockquote className="font-serif italic text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                      "{author.quote}"
                    </blockquote>
                    <div className="font-sans text-sm font-medium text-white/70">{author.name}</div>
                    <div className="font-sans text-xs text-white/40 mt-0.5">{author.role}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
