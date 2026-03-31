import { useState } from 'react'
import { useContent } from '../../contexts/ContentContext'
import SectionLabel from '../ui/SectionLabel'
import DebugLabel from '../ui/DebugLabel'
import LazyImage from '../ui/LazyImage'
import ExpandToggleButton from '../ui/ExpandToggleButton'
import AccordionWrap from '../ui/AccordionWrap'
import AnimatedAspectRatio from '../ui/AnimatedAspectRatio'
import { useAccordionScroll } from '../../hooks/useAccordionScroll'

export default function ResearchersSection({ debugMode = false }) {
  const { researchers, ui } = useContent()
  const authors = researchers.authors
  const featuredAuthor = authors.find(author => author.featured)
  const [expandedId, setExpandedId] = useState(null)
  const toggleExpand = useAccordionScroll(expandedId, setExpandedId)

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
      id="science"
      data-testid="science-section"
      className="section-padding bg-color-primary text-primary-on-dark relative overflow-hidden"
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
            <h2 className="typography-h2-on-dark leading-tight">
              {researchers.authorHeadline}
            </h2>
          </DebugLabel>
        </div>

        {/* Featured Researcher */}
        {featuredAuthor && (
          <div className="flex flex-col md:grid md:grid-cols-[255px_1fr] md:gap-12 section-block-spacing">
            {/* Mobile: Photo first (full width, 16:9) */}
            <div className="md:hidden content-spacing">
              <AnimatedAspectRatio ratio={16 / 9}>
                <LazyImage
                  src={featuredAuthor.portrait}
                  alt={featuredAuthor.name}
                  className="w-full h-full object-cover rounded-lg"
                  objectPosition={getPortraitPosition(featuredAuthor.portraitFocus)}
                />
              </AnimatedAspectRatio>
            </div>

            {/* Desktop: Photo - Left column */}
            <div className="hidden md:block md:max-w-[255px]">
              <AnimatedAspectRatio ratio={1 / 1}>
                <LazyImage
                  src={featuredAuthor.portrait}
                  alt={featuredAuthor.name}
                  className="w-full h-full object-cover rounded-lg"
                  objectPosition={getPortraitPosition(featuredAuthor.portraitFocus)}
                />
              </AnimatedAspectRatio>
            </div>

            {/* Right column: Quote + Name + Title */}
            <div className="flex flex-col text-on-dark">
              {/* Quote - Top of right column */}
              <DebugLabel type="typography-quote-featured" debugMode={debugMode}>
                <blockquote className="typography-quote-featured-on-dark">
                  "{featuredAuthor.featuredQuote}"
                </blockquote>
              </DebugLabel>

              {/* Name + Title - Below quote */}
              <div className="mt-8 -mt-2">
                <DebugLabel type="typography-author-name" debugMode={debugMode}>
                  <div className="typography-author-name-on-dark">{featuredAuthor.name}</div>
                </DebugLabel>
                <DebugLabel type="typography-label" debugMode={debugMode}>
                  <div className="typography-label-on-dark mt-1">{featuredAuthor.role}</div>
                </DebugLabel>
                <DebugLabel type="typography-meta" debugMode={debugMode}>
                  <div className="typography-meta-on-dark mt-1">{featuredAuthor.lifeDates}</div>
                </DebugLabel>
              </div>
            </div>

            {/* Divider - Full width, more spacing below */}
            <div className="md:col-span-2 divider-spacing">
              <div className="h-px bg-color-border-light"></div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ACCORDION CARDS SECTION — Phase 2: All Authors Dynamic */}
        {/* ═══════════════════════════════════════════════════════════ */}

        {authors.map((author, index) => (
          <div key={author.id} className={index === authors.length - 1 ? 'mb-10' : 'mb-12'} data-testid={`researcher-${author.id}`}>
            {/* Row 1: Portrait + Name/Title/Year/ShortText + Button */}
            <div className="flex flex-col md:grid md:grid-cols-[255px_1fr] md:gap-12 md:items-start">
              {/* Mobile: Portrait first (full width, 16:9) */}
              {author.portrait && (
                <div className="md:hidden content-spacing">
                  <AnimatedAspectRatio ratio={16 / 9}>
                    <LazyImage
                      src={author.portrait}
                      alt={author.name}
                      className="w-full h-full object-cover rounded-lg"
                      objectPosition={getPortraitPosition(author.portraitFocus)}
                    />
                  </AnimatedAspectRatio>
                </div>
              )}

              {/* Desktop: Portrait - Left column */}
              {author.portrait && (
                <div className="hidden md:block md:max-w-[255px] transition-all duration-[500ms] ease-in-out">
                  <AnimatedAspectRatio ratio={expandedId === author.id ? 3 / 4 : 1 / 1} duration="500ms">
                    <LazyImage
                      src={author.portrait}
                      alt={author.name}
                      className="w-full h-full object-cover rounded-lg"
                      objectPosition={getPortraitPosition(author.portraitFocus)}
                    />
                  </AnimatedAspectRatio>
                </div>
              )}

              {/* Right column: Name/Title/Year/ShortText + Button */}
              <div className="flex flex-col">
                {/* Mobile: Name/Role/Date above portrait */}
                <div className="md:hidden content-spacing-md">
                  <DebugLabel type="typography-author-name" debugMode={debugMode}>
                    <h3 className="typography-author-name-on-dark">
                      {author.name}
                    </h3>
                  </DebugLabel>
                  <DebugLabel type="typography-label-on-dark" debugMode={debugMode}>
                    <p className="typography-label-on-dark mt-1">
                      {author.role}
                    </p>
                  </DebugLabel>
                  <DebugLabel type="typography-meta" debugMode={debugMode}>
                    <p className="typography-meta-on-dark mt-1">{author.lifeDates}</p>
                  </DebugLabel>
                </div>

                {/* Desktop: Name/Title/Year */}
                <div className="hidden md:block -mt-2">
                  <DebugLabel type="typography-author-name" debugMode={debugMode}>
                    <h3 className="typography-author-name-on-dark">
                      {author.name}
                    </h3>
                  </DebugLabel>
                  <DebugLabel type="typography-label-on-dark" debugMode={debugMode}>
                    <p className="typography-label-on-dark mt-1">
                      {author.role}
                    </p>
                  </DebugLabel>
                  <DebugLabel type="typography-meta" debugMode={debugMode}>
                    <p className="typography-meta-on-dark mt-1">{author.lifeDates}</p>
                  </DebugLabel>
                </div>

                {/* Short text */}
                <DebugLabel type="typography-summary-large-on-dark" debugMode={debugMode}>
                  <p className="typography-summary-large-on-dark md:mt-4 content-spacing-md">
                    {author.shortVersion}
                  </p>
                </DebugLabel>

                {/* Read more button - centered with divider lines */}
                <ExpandToggleButton
                  isExpanded={expandedId === author.id}
                  onToggle={(e) => toggleExpand(author.id, e)}
                  labelMore={ui.showMore}
                  labelLess={ui.showLess}
                  debugMode={debugMode}
                  className="element-spacing-xs"
                />
              </div>
            </div>

            {/* Row 2: Expanded content (full width) with smooth animation */}
            <AccordionWrap isOpen={expandedId === author.id}>
              <div className="md:col-span-2">
                <div className="expanded-content-spacing">
                  <DebugLabel type="typography-body-narrative" debugMode={debugMode}>
                    <p className="typography-body-narrative-on-dark leading-relaxed content-spacing whitespace-pre-line">
                      {author.longVersion}
                    </p>
                  </DebugLabel>
                  {author.sourceUrl && (
                    <DebugLabel type="typography-meta" debugMode={debugMode}>
                      <a
                        href={author.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="typography-meta-on-dark hover:text-primary-on-dark transition-colors"
                      >
                        {author.sourceLabel} →
                      </a>
                    </DebugLabel>
                  )}
                </div>
                {/* Divider - Full width, less spacing before */}
                <div className="md:col-span-2 pt-3">
                  <div className="h-px bg-color-border-light"></div>
                </div>
              </div>
            </AccordionWrap>
          </div>
        ))}
      </div>
    </section>
  )
}
