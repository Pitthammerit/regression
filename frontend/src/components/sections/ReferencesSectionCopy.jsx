import { useState } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { references } from '../../content/plr-de'
import LazyImage from '../ui/LazyImage'
import DebugLabel from '../ui/DebugLabel'
import { BookOpen, ChevronDown } from 'lucide-react'

/**
 * ReferencesSectionCopy — References section with typography tokens
 *
 * MIGRATED to design tokens (Single Source of Truth):
 * - Font-family: font-display (headlines), font-primary (body)
 * - Label: text-label (15px) + on-dark-label
 * - Headline: text-h2 (36px) + on-dark-heading
 * - Resource name: text-h3 (30px) + on-dark-heading
 * - Role: text-label (15px) uppercase + on-dark-role
 * - Dates: text-label (15px) + on-dark-date
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

  return (
    <section
      id="references"
      data-testid="references-section"
      className="py-20 md:py-28 bg-color-bg-dark text-on-dark-heading relative overflow-hidden"
    >
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 bg-paper opacity-20 pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="max-w-centered-header mb-16">
          <DebugLabel type="label" debugMode={debugMode}>
            <div className="font-primary text-label label tracking-widest text-on-dark-label label-heading-spacing">
              {references.bigLabel}
            </div>
          </DebugLabel>

          <DebugLabel type="h2" debugMode={debugMode}>
            <h2 className="font-display text-h2 text-on-dark-heading leading-tight">
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
                        <BookOpen className="w-12 h-12 text-on-dark-heading/30" />
                      </div>
                    </AspectRatio>
                  )}
                </div>

                {/* Right column: Title → Role → Dates → Description → Source */}
                <div className="flex flex-col">
                  <DebugLabel type="h3" debugMode={debugMode}>
                    <p className="font-display text-h3 text-on-dark-heading font-semibold name-role-spacing">
                      {resource.name}
                    </p>
                  </DebugLabel>

                  {resource.role && (
                    <DebugLabel type="role" debugMode={debugMode}>
                      <p className="font-primary text-label text-on-dark-role label tracking-wider role-date-spacing">
                        {resource.role}
                      </p>
                    </DebugLabel>
                  )}

                  {resource.dates && (
                    <DebugLabel type="date" debugMode={debugMode}>
                      <p className="font-primary text-label text-on-dark-date content-spacing-md">
                        {resource.dates}
                      </p>
                    </DebugLabel>
                  )}

                  <DebugLabel type="body-narrative" debugMode={debugMode}>
                    <p className="font-display text-body-narrative text-on-dark-body leading-relaxed content-spacing whitespace-pre-line">
                      {resource.description}
                    </p>
                  </DebugLabel>

                  <DebugLabel type="source-link" debugMode={debugMode}>
                    <a
                      href={resource.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-primary text-label text-on-dark-label hover:text-on-dark-accent transition-colors"
                    >
                      {resource.sourceLabel} →
                    </a>
                  </DebugLabel>
                </div>

                {/* Divider with Mehr anzeigen button */}
                <div className="md:col-span-2 pt-[36px]">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-on-dark-divider"></div>
                    <DebugLabel type="button-text" debugMode={debugMode}>
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center gap-2 font-primary text-button-text button-text text-on-dark-label hover:text-on-dark-heading transition-colors cursor-pointer"
                      >
                        {expanded ? 'Weniger anzeigen' : 'Mehr anzeigen'}
                        <ChevronDown className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                      </button>
                    </DebugLabel>
                    <div className="flex-1 h-px bg-on-dark-divider"></div>
                  </div>
                </div>
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
                        <BookOpen className="w-12 h-12 text-on-dark-heading/30" />
                      </div>
                    </AspectRatio>
                  )}
                </div>

                {/* Right column: Title → Role → Dates → Description → Source */}
                <div className="flex flex-col">
                  <DebugLabel type="h3" debugMode={debugMode}>
                    <p className="font-display text-h3 text-on-dark-heading font-semibold name-role-spacing">
                      {resource.name}
                    </p>
                  </DebugLabel>

                  {resource.role && (
                    <DebugLabel type="role" debugMode={debugMode}>
                      <p className="font-primary text-label text-on-dark-role label tracking-wider role-date-spacing">
                        {resource.role}
                      </p>
                    </DebugLabel>
                  )}

                  {resource.dates && (
                    <DebugLabel type="date" debugMode={debugMode}>
                      <p className="font-primary text-label text-on-dark-date content-spacing-md">
                        {resource.dates}
                      </p>
                    </DebugLabel>
                  )}

                  <DebugLabel type="body-narrative" debugMode={debugMode}>
                    <p className="font-display text-body-narrative text-on-dark-body leading-relaxed content-spacing whitespace-pre-line">
                      {resource.description}
                    </p>
                  </DebugLabel>

                  <DebugLabel type="source-link" debugMode={debugMode}>
                    <a
                      href={resource.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-primary text-label text-on-dark-label hover:text-on-dark-accent transition-colors"
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
    </section>
  )
}
