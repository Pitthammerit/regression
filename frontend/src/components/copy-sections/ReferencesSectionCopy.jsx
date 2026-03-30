import { useState } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { references, ui } from '../../content/plr-de'
import LazyImage from '../ui/LazyImage'
import DebugLabel from '../ui/DebugLabel'
import ExpandToggleButton from '../ui/ExpandToggleButton'
import CtaButton from '../ui/CtaButton'
import { BookOpen } from 'lucide-react'

/**
 * ReferencesSectionCopy — References section with typography tokens
 *
 * MIGRATED to design tokens (Single Source of Truth):
 * - Font-family: font-secondary (headlines), font-primary (body)
 * - Label: text-label (15px) + on-dark-meta
 * - Headline: text-h2 (36px) + on-dark
 * - Resource name: text-h3 (30px) + on-dark
 * - Role: text-label (15px) uppercase + on-dark-meta
 * - Dates: text-label (15px) + on-dark-meta
 * - Description: text-body-lg (20px) + on-dark-body
 * - Source link: text-label (15px) + on-dark-accent
 *
 * CRITICAL PRESERVED:
 * - Section with id="references" (scroll target)
 * - Dark background (bg-color-bg-dark)
 * - Expandable "Mehr anzeigen" for additional references
 * - Map over references.items
 */
export default function ReferencesSectionCopy({ debugMode = false }) {
  const [expanded, setExpanded] = useState(false)

  const handleToggle = () => {
    const willExpand = !expanded
    setExpanded(willExpand)

    // When opening, scroll to section after animation
    if (willExpand) {
      setTimeout(() => {
        const section = document.querySelector('[data-testid="references-section"]')
        if (section) {
          const y = section.getBoundingClientRect().top + window.scrollY - 100
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 50)
    }
  }

  return (
    <section
      id="references"
      data-testid="references-section"
      className="py-20 md:py-28 bg-color-bg-dark text-on-dark relative overflow-hidden"
    >
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 bg-paper opacity-20 pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="max-w-centered-header mb-16">
          <DebugLabel type="label" debugMode={debugMode}>
            <div className="font-primary text-label label tracking-widest text-on-dark-meta label-heading-spacing">
              {references.bigLabel}
            </div>
          </DebugLabel>

          <DebugLabel type="h2" debugMode={debugMode}>
            <h2 className="font-secondary text-h2 text-on-dark leading-tight">
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
              <div key={resource.type} className="grid md:grid-cols-[240px_1fr] gap-6 md:gap-8 items-start mb-16">
                {/* Photo - Left column */}
                <div className="md:max-w-[240px]">
                  {resource.portrait && resource.portrait.trim() !== '' ? (
                    <LazyImage
                      src={resource.portrait}
                      alt={resource.name}
                      className="w-full h-auto rounded-lg"
                    />
                  ) : (
                    <AspectRatio ratio={2 / 3}>
                      <div className="w-full h-full border border-on-dark-divider rounded-lg flex items-center justify-center bg-color-bg-dark/50">
                        <BookOpen className="w-12 h-12 text-on-dark/30" />
                      </div>
                    </AspectRatio>
                  )}
                </div>

                {/* Right column: Title → Role → Dates → Description → Source */}
                <div className="flex flex-col">
                  <DebugLabel type="h3" debugMode={debugMode}>
                    <p className="font-secondary text-h3 text-on-dark font-semibold name-role-spacing">
                      {resource.name}
                    </p>
                  </DebugLabel>

                  {resource.role && (
                    <DebugLabel type="role" debugMode={debugMode}>
                      <p className="font-primary text-label text-on-dark-meta label tracking-wider role-date-spacing">
                        {resource.role}
                      </p>
                    </DebugLabel>
                  )}

                  {resource.dates && (
                    <DebugLabel type="date" debugMode={debugMode}>
                      <p className="font-primary text-label text-on-dark-meta content-spacing-md">
                        {resource.dates}
                      </p>
                    </DebugLabel>
                  )}

                  <DebugLabel type="body-narrative" debugMode={debugMode}>
                    <p className="font-secondary text-body-narrative text-on-dark-body leading-relaxed content-spacing whitespace-pre-line">
                      {resource.description}
                    </p>
                  </DebugLabel>

                  <DebugLabel type="source-link" debugMode={debugMode}>
                    <a
                      href={resource.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-primary text-label text-on-dark-meta hover:text-on-dark-accent transition-colors"
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
            {expanded && references.items.slice(1).map((resource) => (
              <div key={resource.type} className="grid md:grid-cols-[240px_1fr] gap-6 md:gap-8 items-start mb-16">
                {/* Photo - Left column */}
                <div className="md:max-w-[240px]">
                  {resource.portrait && resource.portrait.trim() !== '' ? (
                    <LazyImage
                      src={resource.portrait}
                      alt={resource.name}
                      className="w-full h-auto rounded-lg"
                    />
                  ) : (
                    <AspectRatio ratio={2 / 3}>
                      <div className="w-full h-full border border-on-dark-divider rounded-lg flex items-center justify-center bg-color-bg-dark/50">
                        <BookOpen className="w-12 h-12 text-on-dark/30" />
                      </div>
                    </AspectRatio>
                  )}
                </div>

                {/* Right column: Title → Role → Dates → Description → Source */}
                <div className="flex flex-col">
                  <DebugLabel type="h3" debugMode={debugMode}>
                    <p className="font-secondary text-h3 text-on-dark font-semibold name-role-spacing">
                      {resource.name}
                    </p>
                  </DebugLabel>

                  {resource.role && (
                    <DebugLabel type="role" debugMode={debugMode}>
                      <p className="font-primary text-label text-on-dark-meta label tracking-wider role-date-spacing">
                        {resource.role}
                      </p>
                    </DebugLabel>
                  )}

                  {resource.dates && (
                    <DebugLabel type="date" debugMode={debugMode}>
                      <p className="font-primary text-label text-on-dark-meta content-spacing-md">
                        {resource.dates}
                      </p>
                    </DebugLabel>
                  )}

                  <DebugLabel type="body-narrative" debugMode={debugMode}>
                    <p className="font-secondary text-body-narrative text-on-dark-body leading-relaxed content-spacing whitespace-pre-line">
                      {resource.description}
                    </p>
                  </DebugLabel>

                  <DebugLabel type="source-link" debugMode={debugMode}>
                    <a
                      href={resource.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-primary text-label text-on-dark-meta hover:text-on-dark-accent transition-colors"
                    >
                      {resource.sourceLabel} →
                    </a>
                  </DebugLabel>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* CTA - Fills gap before footer */}
      <div className="flex justify-center pt-16">
        <DebugLabel type="button-text" debugMode={debugMode}>
          <CtaButton
            label={references.cta}
            variant="inverted"
          />
        </DebugLabel>
      </div>
    </section>
  )
}
