import React, { useState } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { researchers } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'

/**
 * ResearcherQuotesSection — Research authority quotes with portraits
 *
 * Displays researchers with portraits and quotes from researchers.researchers
 * First 3 are always visible, rest expandable with "Mehr/Weniger" toggle
 * Dark background (bg-brand-deep)
 */
export default function ResearcherQuotesSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  // Filter authors with portraits
  const authorsWithPortraits = researchers.authors.filter(author => author.portrait !== null)
  const hasMore = authorsWithPortraits.length > 3

  return (
    <section
      id="evidence-quotes"
      data-testid="evidence-quotes-section"
      className="py-16 md:py-20 bg-brand-deep text-heading-dark"
    >
      <div className="max-w-content mx-auto px-6">
        <SectionLabel text={researchers.authorBigLabel} light />
        <h2 className="font-display text-h2 md:text-h1 text-on-dark leading-tight mt-3 mb-5">
          {researchers.authorHeadline}
        </h2>

        {/* First row - always visible (3 authors) */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 md:mt-6">
          {authorsWithPortraits.slice(0, 3).map((author) => (
            <div key={author.id}>
              <AspectRatio ratio={16 / 9} className="md:hidden mb-4">
                <LazyImage
                  src={author.portrait}
                  alt={author.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </AspectRatio>
              <AspectRatio ratio={1 / 1} className="hidden md:block mb-4">
                <LazyImage
                  src={author.portrait}
                  alt={author.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </AspectRatio>
              <blockquote className="font-display italic text-quote md:text-quote-featured text-on-dark-muted leading-relaxed mb-6">
                "{author.quote}"
              </blockquote>
              <div className="font-display text-role text-on-dark-muted">{author.name}</div>
              <div className="text-meta text-on-dark-faded mt-0.5">{author.role}</div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less divider */}
        {hasMore && (
          <>
            <div className="flex items-center gap-4 my-10">
              <div className="flex-1 h-px bg-dim-dark"></div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-meta text-on-dark-muted hover:text-on-dark transition-colors cursor-pointer"
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
              <div className="flex-1 h-px bg-dim-dark"></div>
            </div>

            {/* Expanded content - additional authors */}
            {isExpanded && (
              <div className="grid md:grid-cols-3 gap-10 md:gap-14 md:mt-6">
                {authorsWithPortraits.slice(3).map((author) => (
                  <div key={author.id}>
                    <AspectRatio ratio={16 / 9} className="md:hidden mb-4">
                      <LazyImage
                        src={author.portrait}
                        alt={author.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </AspectRatio>
                    <AspectRatio ratio={1 / 1} className="hidden md:block mb-4">
                      <LazyImage
                        src={author.portrait}
                        alt={author.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </AspectRatio>
                    <blockquote className="font-display italic text-quote md:text-quote-featured text-heading-dark leading-relaxed mb-6">
                      "{author.quote}"
                    </blockquote>
                    <div className="font-display text-role text-body-dark">{author.name}</div>
                    <div className="text-meta text-dim-dark mt-0.5">{author.role}</div>
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
