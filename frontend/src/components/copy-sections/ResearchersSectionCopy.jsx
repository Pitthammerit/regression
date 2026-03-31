import { useState } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { researchers, ui } from '../../content'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'
import DebugLabel from '../ui/DebugLabel'
import ExpandToggleButton from '../ui/ExpandToggleButton'
import AccordionWrap from '../ui/AccordionWrap'

export default function ResearchersSectionCopy({ debugMode = false }) {
  const authors = researchers.authors
  const featuredAuthor = authors.find(author => author.featured)
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Map portraitFocus presets to CSS object-position values
  const getPortraitPosition = (focus) => {
    const focusMap = {
      center: 'center',
      top: 'center top',
      bottom: 'center bottom',
      left: 'left center',
      right: 'right center',
      'top-left': 'left top',
      'top-right': 'right top',
      'bottom-left': 'left bottom',
      'bottom-right': 'right bottom',
    }
    return focusMap[focus] || 'center'
  }

  return (
    <section
      id="science-copy"
      data-testid="science-section-copy"
      className="section-padding bg-color-primary text-on-dark relative overflow-hidden"
    >
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 bg-paper opacity-20 pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="max-w-3xl section-block-spacing">
          <DebugLabel type="typography-label" debugMode={debugMode}>
            <SectionLabel text={researchers.authorBigLabel} light={true} />
          </DebugLabel>
          <DebugLabel type="typography-h2" debugMode={debugMode}>
            <h2 className="font-secondary text-h2 leading-tight text-on-dark">
              {researchers.authorHeadline}
            </h2>
          </DebugLabel>
        </div>

        {/* Featured Researcher */}
        {featuredAuthor && (
          <div className="flex flex-col md:grid md:grid-cols-[240px_1fr] md:gap-8 section-block-spacing">
            {/* Mobile: Photo first (full width, 16:9) */}
            <div className="md:hidden content-spacing">
              <AspectRatio ratio={16 / 9}>
                <LazyImage
                  src={featuredAuthor.portrait}
                  alt={featuredAuthor.name}
                  className="w-full h-full object-cover rounded-lg"
                  objectPosition={getPortraitPosition(featuredAuthor.portraitFocus)}
                />
              </AspectRatio>
            </div>

            {/* Desktop: Photo - Left column */}
            <div className="hidden md:block md:max-w-[240px]">
              <AspectRatio ratio={1 / 1}>
                <LazyImage
                  src={featuredAuthor.portrait}
                  alt={featuredAuthor.name}
                  className="w-full h-full object-cover rounded-lg"
                  objectPosition={getPortraitPosition(featuredAuthor.portraitFocus)}
                />
              </AspectRatio>
            </div>

            {/* Right column: Quote + Name + Title */}
            <div className="flex flex-col text-on-dark-body">
              {/* Quote - Top of right column */}
              <DebugLabel type="typography-quote-featured" debugMode={debugMode}>
                <blockquote className="font-secondary text-quote-featured quote-featured-italic leading-tight text-on-dark content-spacing">
                  "{featuredAuthor.featuredQuote}"
                </blockquote>
              </DebugLabel>

              {/* Name + Title - Below quote */}
              <div>
                <DebugLabel type="typography-author-name" debugMode={debugMode}>
                  <div className="font-secondary text-author-name text-on-dark name-role-spacing">{featuredAuthor.name}</div>
                </DebugLabel>
                <DebugLabel type="typography-label" debugMode={debugMode}>
                  <div className="font-primary text-label label text-on-dark-meta name-role-spacing">{featuredAuthor.role}</div>
                </DebugLabel>
              </div>
            </div>

            {/* Divider - Full width, more spacing below */}
            <div className="md:col-span-2 divider-spacing">
              <div className="h-px bg-on-dark-divider"></div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ACCORDION CARDS SECTION — Phase 2: All Authors Dynamic */}
        {/* ═══════════════════════════════════════════════════════════ */}

        {authors.map((author) => (
          <div key={author.id} className="section-block-spacing">
            {/* Row 1: Portrait + Name/Title/Year/ShortText + Button */}
            <div className="flex flex-col md:grid md:grid-cols-[240px_1fr] md:gap-8 md:items-start">
              {/* Mobile: Portrait first (full width, 16:9) */}
              {author.portrait && (
                <div className="md:hidden content-spacing">
                  <AspectRatio ratio={16 / 9}>
                    <LazyImage
                      src={author.portrait}
                      alt={author.name}
                      className="w-full h-full object-cover rounded-lg"
                      objectPosition={getPortraitPosition(author.portraitFocus)}
                    />
                  </AspectRatio>
                </div>
              )}

              {/* Desktop: Portrait - Left column */}
              {author.portrait && (
                <div className="hidden md:block md:max-w-[240px]">
                  <AspectRatio ratio={3 / 4}>
                    <LazyImage
                      src={author.portrait}
                      alt={author.name}
                      className="w-full h-full object-cover rounded-lg"
                      objectPosition={getPortraitPosition(author.portraitFocus)}
                    />
                  </AspectRatio>
                </div>
              )}

              {/* Right column: Name/Title/Year/ShortText + Button */}
              <div className="flex flex-col">
                {/* Mobile: Name/Role/Date above portrait */}
                <div className="md:hidden content-spacing-md">
                  <DebugLabel type="typography-author-name" debugMode={debugMode}>
                    <h3 className="font-secondary text-author-name text-on-dark name-role-spacing">
                      {author.name}
                    </h3>
                  </DebugLabel>
                  <DebugLabel type="typography-label" debugMode={debugMode}>
                    <p className="font-primary text-label label text-on-dark-meta role-date-spacing">
                      {author.role}
                    </p>
                  </DebugLabel>
                  <DebugLabel type="typography-meta" debugMode={debugMode}>
                    <p className="font-primary text-meta text-on-dark-meta block-label-spacing">{author.lifeDates}</p>
                  </DebugLabel>
                </div>

                {/* Desktop: Name/Title/Year */}
                <div className="hidden md:block content-spacing-md">
                  <DebugLabel type="typography-author-name" debugMode={debugMode}>
                    <h3 className="font-secondary text-author-name text-on-dark name-role-spacing">
                      {author.name}
                    </h3>
                  </DebugLabel>
                  <DebugLabel type="typography-label" debugMode={debugMode}>
                    <p className="font-primary text-label label text-on-dark-meta role-date-spacing">
                      {author.role}
                    </p>
                  </DebugLabel>
                  <DebugLabel type="typography-meta" debugMode={debugMode}>
                    <p className="font-primary text-meta text-on-dark-meta block-label-spacing">{author.lifeDates}</p>
                  </DebugLabel>
                </div>

                {/* Short text */}
                <DebugLabel type="typography-summary-large" debugMode={debugMode}>
                  <p className="font-secondary text-summary-large text-on-dark-body leading-relaxed content-spacing">
                    {author.shortVersion}
                  </p>
                </DebugLabel>

                {/* Read more button - centered with divider lines */}
                <ExpandToggleButton
                  isExpanded={expandedId === author.id}
                  onToggle={() => toggleExpand(author.id)}
                  labelMore={ui.showMore}
                  labelLess={ui.showLess}
                  debugMode={debugMode}
                  className="element-spacing-md"
                />
              </div>
            </div>

            {/* Row 2: Expanded content (full width) */}
            {expandedId === author.id && (
              <>
                <div className="expanded-content-spacing md:col-span-2">
                  <DebugLabel type="typography-body-narrative" debugMode={debugMode}>
                    <p className="font-secondary text-body-narrative text-on-dark-body leading-relaxed content-spacing whitespace-pre-line">
                      {author.longVersion}
                    </p>
                  </DebugLabel>
                  {author.sourceUrl && (
                    <DebugLabel type="typography-meta" debugMode={debugMode}>
                      <a
                        href={author.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-primary text-meta text-on-dark-meta hover:text-on-dark-accent transition-colors"
                      >
                        {author.sourceLabel} →
                      </a>
                    </DebugLabel>
                  )}
                </div>
                {/* Divider - Full width, same spacing as featured section */}
                <div className="md:col-span-2 divider-spacing">
                  <div className="h-px bg-on-dark-divider"></div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
