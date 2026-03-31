import { useState, useCallback } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { researchers, ui } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'
import DebugLabel from '../ui/DebugLabel'
import ExpandToggleButton from '../ui/ExpandToggleButton'

/**
 * ResearcherQuotesSection — Research authority quotes with composite typography utilities
 *
 * MIGRATED to composite typography utilities:
 * - H2: typography-h2 (replaces font-secondary text-h2 leading-tight text-primary-on-dark)
 * - Quote-featured: typography-quote-featured (replaces font-secondary text-quote-featured quote-featured-italic)
 * - Author-name: typography-author-name (replaces font-secondary text-author-name)
 * - Meta: typography-meta (replaces font-primary text-meta text-secondary-on-dark)
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
export default function ResearcherQuotesSection({ debugMode = false }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Simple scroll to align section top when expanding
  const handleToggle = useCallback(() => {
    const willExpand = !isExpanded
    setIsExpanded(willExpand)

    // When opening, scroll to first newly visible author (4th author overall)
    if (willExpand) {
      requestAnimationFrame(() => {
        // Target the expanded grid (contains authors 4+)
        const expandedGrid = document.querySelector('[data-testid="researcher-quotes-expanded"]')
        if (expandedGrid) {
          const rect = expandedGrid.getBoundingClientRect()
          const scrollTop = window.scrollY + rect.top - 100

          window.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          })
        }
      })
    }
  }, [isExpanded])

  // Filter authors with portraits (from plr-de.js)
  const authorsWithPortraits = researchers.authors.filter(author => author.portrait !== null)
  const hasMore = authorsWithPortraits.length > 3

  return (
    <SectionWrapper className="bg-color-primary text-primary-on-dark" data-testid="researcher-quotes-section">
      {/* Header group with controlled spacing */}
      <div className="mb-12 md:mb-16">
        <DebugLabel type="typography-label" debugMode={debugMode}>
          <SectionLabel text={researchers.authorBigLabel} light />
        </DebugLabel>
        <DebugLabel type="typography-h2" debugMode={debugMode}>
          <h2 className="typography-h2 leading-tight text-primary-on-dark">
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
            <DebugLabel type="typography-quote-featured" debugMode={debugMode}>
              <p className="typography-quote-featured text-primary-on-dark content-spacing">
                "{author.quote}"
              </p>
            </DebugLabel>

            {/* Name */}
            <DebugLabel type="typography-author-name" debugMode={debugMode}>
              <p className="typography-author-name text-primary-on-dark name-role-spacing">
                {author.name}
              </p>
            </DebugLabel>

            {/* Role */}
            <DebugLabel type="typography-meta" debugMode={debugMode}>
              <p className="typography-meta text-secondary-on-dark role-date-spacing">
                {author.role}
              </p>
            </DebugLabel>
          </div>
        ))}
      </div>

      {/* Expandable "Mehr/Weniger" - only show if more than 3 authors */}
      {hasMore && (
        <>
          <ExpandToggleButton
            isExpanded={isExpanded}
            onToggle={handleToggle}
            labelMore={ui.showMore}
            labelLess={ui.showLess}
            debugMode={debugMode}
            className="my-10"
          />

          {/* Expanded content - authors 4+ */}
          {isExpanded && (
            <div className="grid md:grid-cols-3 gap-10 md:gap-14" data-testid="researcher-quotes-expanded">
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

                  <DebugLabel type="typography-quote-featured" debugMode={debugMode}>
                    <p className="typography-quote-featured text-primary-on-dark content-spacing">
                      "{author.quote}"
                    </p>
                  </DebugLabel>

                  <DebugLabel type="typography-author-name" debugMode={debugMode}>
                    <p className="typography-author-name text-primary-on-dark name-role-spacing">
                      {author.name}
                    </p>
                  </DebugLabel>

                  <DebugLabel type="typography-meta" debugMode={debugMode}>
                    <p className="typography-meta text-secondary-on-dark role-date-spacing">
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
