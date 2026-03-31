import { useState, useCallback } from 'react'
import { useContent } from '../../contexts/ContentContext'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'
import DebugLabel from '../ui/DebugLabel'
import ExpandToggleButton from '../ui/ExpandToggleButton'

/**
 * ResearcherQuotesSection — Research authority quotes with composite typography utilities
 *
 * MIGRATED to composite typography utilities:
 * - H2-on-dark: typography-h2-on-dark (replaces typography-h2 text-primary-on-dark)
 * - Quote-featured-on-dark: typography-quote-featured-on-dark (replaces typography-quote-featured text-primary-on-dark)
 * - Author-name-on-dark: typography-author-name-on-dark (replaces typography-author-name text-primary-on-dark)
 * - Meta-on-dark: typography-meta-on-dark (replaces typography-meta text-secondary-on-dark)
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
  const { researchers, ui } = useContent()
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
        <DebugLabel type="typography-h2-on-dark" debugMode={debugMode}>
          <h2 className="typography-h2-on-dark leading-tight">
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
            <DebugLabel type="typography-quote-featured-on-dark" debugMode={debugMode}>
              <p className="typography-quote-featured-on-dark content-spacing">
                "{author.quote}"
              </p>
            </DebugLabel>

            {/* Name */}
            <DebugLabel type="typography-author-name-on-dark" debugMode={debugMode}>
              <p className="typography-author-name-on-dark">
                {author.name}
              </p>
            </DebugLabel>

            {/* Role */}
            <DebugLabel type="typography-meta-on-dark" debugMode={debugMode}>
              <p className="typography-meta-on-dark element-spacing-xs">
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

                  <DebugLabel type="typography-quote-featured-on-dark" debugMode={debugMode}>
                    <p className="typography-quote-featured-on-dark content-spacing">
                      "{author.quote}"
                    </p>
                  </DebugLabel>

                  <DebugLabel type="typography-author-name-on-dark" debugMode={debugMode}>
                    <p className="typography-author-name-on-dark">
                      {author.name}
                    </p>
                  </DebugLabel>

                  <DebugLabel type="typography-meta-on-dark" debugMode={debugMode}>
                    <p className="typography-meta-on-dark element-spacing-xs">
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
