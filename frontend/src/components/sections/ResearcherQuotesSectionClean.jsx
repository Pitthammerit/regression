import React, { useState } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { researchers } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'
import Container from '../ui/Container'

/**
 * ResearcherQuotesSectionClean — Clean spacing pattern
 *
 * PATTERN: Label → H2 → Images with EQUAL gaps
 * - Label → H2: label-heading-spacing (0.7rem)
 * - H2 → Grid: label-heading-spacing (0.7rem)
 *
 * Both gaps use the same utility for consistent spacing.
 */
export default function ResearcherQuotesSectionClean() {
  const [isExpanded, setIsExpanded] = useState(false)
  const authorsWithPortraits = researchers.authors.filter(author => author.portrait !== null)
  const hasMore = authorsWithPortraits.length > 3

  return (
    <section className="py-16 md:py-20 bg-color-bg-dark text-on-dark-heading">
      <Container>
        {/* Label with spacing below */}
        <SectionLabel text={researchers.authorBigLabel} light />

        {/* H2 with SAME spacing below as label → H2 */}
        <h2 className="font-display text-h2 leading-tight text-on-dark-heading label-heading-spacing">
          {researchers.authorHeadline}
        </h2>

        {/* Grid - no extra margin, spacing controlled by H2 */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
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
              <blockquote className="font-display text-quote-featured italic leading-tight text-on-dark-quote content-spacing">
                "{author.quote}"
              </blockquote>
              <div className="font-display text-author-name text-on-dark-heading name-role-spacing">
                {author.name}
              </div>
              <div className="text-date text-on-dark-role role-date-spacing">
                {author.role}
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less */}
        {hasMore && (
          <>
            <div className="flex items-center gap-4 my-10">
              <div className="flex-1 h-px bg-on-dark-divider"></div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-read-more text-on-dark-label hover:text-on-dark-accent transition-colors cursor-pointer"
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
              <div className="flex-1 h-px bg-on-dark-divider"></div>
            </div>

            {isExpanded && (
              <div className="grid md:grid-cols-3 gap-10 md:gap-14">
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
                    <blockquote className="font-display text-quote-featured italic leading-tight text-on-dark-quote content-spacing">
                      "{author.quote}"
                    </blockquote>
                    <div className="font-display text-author-name text-on-dark-heading name-role-spacing">
                      {author.name}
                    </div>
                    <div className="text-date text-on-dark-role role-date-spacing">
                      {author.role}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  )
}
