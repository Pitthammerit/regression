import { useState } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { researchers } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'
import DebugLabel from '../ui/DebugLabel'

/**
 * ResearcherQuotesSectionCopy — Research authority quotes with portraits
 *
 * REDESIGNED with cleaner spacing pattern:
 * - Label → H2 → Grid structure
 * - Wrapper div controls spacing between header group and grid
 * - Uses design tokens, no hardcoded values
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
    <SectionWrapper className="bg-color-bg-dark text-on-dark-heading" data-testid="researcher-quotes-section">
      {/* Header group with controlled spacing */}
      <div className="mb-12 md:mb-16">
        <DebugLabel type="label" debugMode={debugMode}>
          <SectionLabel text={researchers.authorBigLabel} light />
        </DebugLabel>
        <DebugLabel type="h2" debugMode={debugMode}>
          <h2 className="font-display text-h2 leading-tight text-on-dark-heading">
            {researchers.authorHeadline}
          </h2>
        </DebugLabel>
      </div>

      {/* Grid - first 3 authors */}
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

            {/* Quote */}
            <DebugLabel type="quote-featured" debugMode={debugMode}>
              <p className="font-display text-quote-featured quote-featured-italic leading-tight text-on-dark-quote content-spacing">
                "{author.quote}"
              </p>
            </DebugLabel>

            {/* Name */}
            <DebugLabel type="author-name" debugMode={debugMode}>
              <p className="font-display text-author-name text-on-dark-heading name-role-spacing">
                {author.name}
              </p>
            </DebugLabel>

            {/* Role */}
            <DebugLabel type="meta" debugMode={debugMode}>
              <p className="font-primary text-meta text-on-dark-role role-date-spacing">
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
              className="flex items-center gap-2 font-primary text-meta text-on-dark-label hover:text-on-dark-accent transition-colors cursor-pointer"
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
                    <p className="font-display text-quote-featured quote-featured-italic leading-tight text-on-dark-quote content-spacing">
                      "{author.quote}"
                    </p>
                  </DebugLabel>

                  <DebugLabel type="author-name" debugMode={debugMode}>
                    <p className="font-display text-author-name text-on-dark-heading name-role-spacing">
                      {author.name}
                    </p>
                  </DebugLabel>

                  <DebugLabel type="meta" debugMode={debugMode}>
                    <p className="font-primary text-meta text-on-dark-role role-date-spacing">
                      {author.role}
                    </p>
                  </DebugLabel>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </SectionWrapper>
  )
}
