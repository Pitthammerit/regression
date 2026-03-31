import { useState } from 'react'
import { useContent } from '../../contexts/ContentContext'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import LazyImage from '../ui/LazyImage'
import DebugLabel from '../ui/DebugLabel'
import ExpandToggleButton from '../ui/ExpandToggleButton'
import { BookOpen, ChevronDown } from 'lucide-react'

/**
 * ReferencesSection — References section with composite typography utilities
 *
 * MIGRATED to composite typography utilities:
 * - Label: typography-label-on-dark (replaces typography-label text-secondary-on-dark)
 * - H2: typography-h2-on-dark (replaces typography-h2 text-primary-on-dark)
 * - H3: typography-h3-on-dark (replaces typography-h3 text-primary-on-dark)
 * - Role: typography-label-on-dark (replaces typography-label text-secondary-on-dark label)
 * - Date: typography-label-on-dark (replaces typography-label text-secondary-on-dark)
 * - Body-narrative: typography-body-narrative (replaces typography-body-narrative)
 * - Source link: typography-label-on-dark (replaces typography-label text-secondary-on-dark)
 *
 * CRITICAL PRESERVED:
 * - Section with id="references" (scroll target)
 * - Dark background (bg-color-primary)
 * - Expandable "Mehr anzeigen" for additional references
 * - Map over references.items
 */
export default function ReferencesSection({ debugMode = false }) {
  const { references, ui } = useContent()
  const [expanded, setExpanded] = useState(false)

  const handleToggle = () => {
    const willExpand = !expanded
    setExpanded(willExpand)

    // When opening, scroll to first newly visible item after animation
    // Special case: content opens BELOW the weniger/mehr button
    // We scroll to the 2nd reference overall (first one below the button)
    if (willExpand) {
      // Wait for content to render (no accordion animation, just state update)
      requestAnimationFrame(() => {
        // Find the first newly visible reference (reference-item-0 = 2nd overall)
        const firstNewItem = document.querySelector('[data-testid="reference-item-0"]')
        if (firstNewItem) {
          const rect = firstNewItem.getBoundingClientRect()
          const scrollTop = window.scrollY + rect.top - 100

          window.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          })
        }
      })
    }
  }

  return (
    <section
      id="references"
      data-testid="references-section"
      className="py-20 md:py-28 bg-color-primary text-primary-on-dark relative overflow-hidden snap-section"
    >
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 bg-paper opacity-20 pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="max-w-centered-header section-block-spacing">
          <DebugLabel type="typography-label-on-dark" debugMode={debugMode}>
            <div className="typography-label-on-dark">
              {references.bigLabel}
            </div>
          </DebugLabel>

          <DebugLabel type="typography-h2-on-dark" debugMode={debugMode}>
            <h2 className="typography-h2-on-dark leading-tight heading-body-spacing">
              {references.headline}
            </h2>
          </DebugLabel>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* References */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {references.items && references.items.length > 0 && (
          <>
            {/* First reference - always visible */}
            {references.items.slice(0, 1).map((resource) => (
              <div key={resource.type} className={!expanded ? 'grid md:grid-cols-[240px_1fr] card-grid-gap-sm md:card-grid-gap-lg items-start mb-16' : 'grid md:grid-cols-[240px_1fr] card-grid-gap-sm md:card-grid-gap-lg items-start mb-6'}>
                {/* Photo - Left column */}
                <div className="md:max-w-[240px]">
                  {resource.portrait && resource.portrait.trim() !== '' ? (
                    <LazyImage
                      src={resource.portrait}
                      alt={resource.name}
                      className="w-full h-auto rounded-lg"
                    />
                  ) : (
                    <AspectRatio ratio={expanded ? 3 / 4 : 1 / 1}>
                      <div className="w-full h-full border border-color-light rounded-lg flex items-center justify-center bg-color-primary/50">
                        <BookOpen className="w-12 h-12 text-primary-on-dark/30" />
                      </div>
                    </AspectRatio>
                  )}
                </div>

                {/* Right column: Title → Role → Dates → Description → Source */}
                <div className="flex flex-col">
                  <DebugLabel type="typography-h3-on-dark" debugMode={debugMode}>
                    <p className="typography-h3-on-dark font-semibold">
                      {resource.name}
                    </p>
                  </DebugLabel>

                  {resource.role && (
                    <DebugLabel type="typography-label-on-dark" debugMode={debugMode}>
                      <p className="typography-label-on-dark label tracking-wider name-role-spacing">
                        {resource.role}
                      </p>
                    </DebugLabel>
                  )}

                  {resource.dates && (
                    <DebugLabel type="typography-meta-on-dark" debugMode={debugMode}>
                      <p className="typography-meta-on-dark role-date-spacing">
                        {resource.dates}
                      </p>
                    </DebugLabel>
                  )}

                  <DebugLabel type="typography-body-narrative" debugMode={debugMode}>
                    <p className="typography-body-narrative text-on-dark leading-relaxed heading-body-spacing whitespace-pre-line">
                      {resource.description}
                    </p>
                  </DebugLabel>

                  <DebugLabel type="typography-meta-on-dark" debugMode={debugMode}>
                    <a
                      href={resource.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="typography-meta-on-dark hover:text-primary-on-dark transition-colors"
                    >
                      {resource.sourceLabel} →
                    </a>
                  </DebugLabel>
                </div>

                {/* Divider with Mehr anzeigen button */}
                <ExpandToggleButton
                  isExpanded={expanded}
                  onToggle={handleToggle}
                  labelMore={ui.showMore}
                  labelLess={ui.showLess}
                  debugMode={debugMode}
                  className="md:col-span-2 pt-[36px]"
                />
              </div>
            ))}

            {/* Remaining references - expandable */}
            {expanded && references.items.slice(1).map((resource, index) => (
              <div key={resource.type} data-testid={`reference-item-${index}`} className={index === references.items.slice(1).length - 1 ? 'grid md:grid-cols-[240px_1fr] card-grid-gap-sm md:card-grid-gap-lg items-start mb-16' : 'grid md:grid-cols-[240px_1fr] card-grid-gap-sm md:card-grid-gap-lg items-start mb-12'}>
                {/* Photo - Left column */}
                <div className="md:max-w-[240px]">
                  {resource.portrait && resource.portrait.trim() !== '' ? (
                    <LazyImage
                      src={resource.portrait}
                      alt={resource.name}
                      className="w-full h-auto rounded-lg"
                    />
                  ) : (
                    <AspectRatio ratio={3 / 4}>
                      <div className="w-full h-full border border-color-light rounded-lg flex items-center justify-center bg-color-primary/50">
                        <BookOpen className="w-12 h-12 text-primary-on-dark/30" />
                      </div>
                    </AspectRatio>
                  )}
                </div>

                {/* Right column: Title → Role → Dates → Description → Source */}
                <div className="flex flex-col">
                  <DebugLabel type="typography-h3-on-dark" debugMode={debugMode}>
                    <p className="typography-h3-on-dark font-semibold">
                      {resource.name}
                    </p>
                  </DebugLabel>

                  {resource.role && (
                    <DebugLabel type="typography-label-on-dark" debugMode={debugMode}>
                      <p className="typography-label-on-dark label tracking-wider name-role-spacing">
                        {resource.role}
                      </p>
                    </DebugLabel>
                  )}

                  {resource.dates && (
                    <DebugLabel type="typography-meta-on-dark" debugMode={debugMode}>
                      <p className="typography-meta-on-dark role-date-spacing">
                        {resource.dates}
                      </p>
                    </DebugLabel>
                  )}

                  <DebugLabel type="typography-body-narrative" debugMode={debugMode}>
                    <p className="typography-body-narrative text-on-dark leading-relaxed heading-body-spacing whitespace-pre-line">
                      {resource.description}
                    </p>
                  </DebugLabel>

                  <DebugLabel type="typography-meta-on-dark" debugMode={debugMode}>
                    <a
                      href={resource.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="typography-meta-on-dark hover:text-primary-on-dark transition-colors"
                    >
                      {resource.sourceLabel} →
                    </a>
                  </DebugLabel>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Scroll to CTA section */}
        <div className="text-center margin-top-lg">
          <button
            onClick={() => document.getElementById('simple-cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-3 mx-auto hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Weiter zum CTA"
          >
            <DebugLabel type="typography-h2-on-dark" debugMode={debugMode}>
              <p className="typography-h2-on-dark">Bereit deine eigenen Erfahrungen zu machen?</p>
            </DebugLabel>
            <ChevronDown className="next-arrow-button-on-dark animate-pulse-down" />
          </button>
        </div>
      </div>
    </section>
  )
}
