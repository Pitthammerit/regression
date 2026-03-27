import React, { useState } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { researchers } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'
import Container from '../ui/Container'
import DebugLabel from '../ui/DebugLabel'

/**
 * ResearcherQuotesSectionCopy — Research authority quotes with portraits
 *
 * Based on SIMPLE TEST pattern with correct spacing:
 * - SectionLabel → H2 (with section-block-spacing) → Grid
 * - Uses only design tokens, no hardcoded values
 *
 * FEATURES:
 * - Filter for authors with portraits
 * - Expandable "Mehr/Weniger" for additional authors
 * - Responsive: 16:9 on mobile, 1:1 on desktop
 */
export default function ResearcherQuotesSectionCopy({ debugMode = false }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Filter authors with portraits (from plr-de.js)
  const authorsWithPortraits = researchers.authors.filter(author => author.portrait !== null)
  const hasMore = authorsWithPortraits.length > 3

  return (
    <section className="py-16 md:py-20 bg-color-bg-dark text-on-dark-heading">
      <Container>
        {/* Label - imported from plr-de.js */}
        <DebugLabel type="label" debugMode={debugMode}>
          <SectionLabel text={researchers.authorBigLabel} light />
        </DebugLabel>

        {/* H2 - uses section-block-spacing token (not hardcoded mb-*) */}
        <DebugLabel type="h2" debugMode={debugMode}>
          <h2 className="font-display text-h2 leading-tight text-on-dark-heading section-block-spacing">
            {researchers.authorHeadline}
          </h2>
        </DebugLabel>

        {/* Grid - first 3 authors, no margin-top */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {authorsWithPortraits.slice(0, 3).map((author) => (
            <div key={author.id}>
              {/* Mobile: 16:9 aspect ratio */}
              <div className="md:hidden mb-4">
                <AspectRatio ratio={16 / 9}>
                  <LazyImage
                    src={author.portrait}
                    alt={author.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </AspectRatio>
              </div>

              {/* Desktop: 1:1 aspect ratio */}
              <div className="hidden md:block mb-4">
                <AspectRatio ratio={1 / 1}>
                  <LazyImage
                    src={author.portrait}
                    alt={author.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </AspectRatio>
              </div>

              {/* Quote - uses content-spacing token */}
              <DebugLabel type="quote-featured" debugMode={debugMode}>
                <p className="font-display text-quote-featured italic leading-tight text-on-dark-quote content-spacing">
                  "{author.quote}"
                </p>
              </DebugLabel>

              {/* Name - uses name-role-spacing token */}
              <DebugLabel type="author-name" debugMode={debugMode}>
                <p className="font-display text-author-name text-on-dark-heading name-role-spacing">
                  {author.name}
                </p>
              </DebugLabel>

              {/* Role - uses role-date-spacing token */}
              <DebugLabel type="date" debugMode={debugMode}>
                <p className="text-date text-on-dark-role role-date-spacing">
                  {author.role}
                </p>
              </DebugLabel>
            </div>
          ))}
        </div>

        {/* Expandable "Mehr/Weniger" - only show if more than 3 authors */}
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

            {/* Expanded content - authors 4+ */}
            {isExpanded && (
              <div className="grid md:grid-cols-3 gap-10 md:gap-14">
                {authorsWithPortraits.slice(3).map((author) => (
                  <div key={author.id}>
                    <div className="md:hidden mb-4">
                      <AspectRatio ratio={16 / 9}>
                        <LazyImage
                          src={author.portrait}
                          alt={author.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </AspectRatio>
                    </div>

                    <div className="hidden md:block mb-4">
                      <AspectRatio ratio={1 / 1}>
                        <LazyImage
                          src={author.portrait}
                          alt={author.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </AspectRatio>
                    </div>

                    <DebugLabel type="quote-featured" debugMode={debugMode}>
                      <p className="font-display text-quote-featured italic leading-tight text-on-dark-quote content-spacing">
                        "{author.quote}"
                      </p>
                    </DebugLabel>

                    <DebugLabel type="author-name" debugMode={debugMode}>
                      <p className="font-display text-author-name text-on-dark-heading name-role-spacing">
                        {author.name}
                      </p>
                    </DebugLabel>

                    <DebugLabel type="date" debugMode={debugMode}>
                      <p className="text-date text-on-dark-role role-date-spacing">
                        {author.role}
                      </p>
                    </DebugLabel>
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
