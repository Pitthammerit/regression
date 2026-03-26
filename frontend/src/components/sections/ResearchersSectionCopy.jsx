import React, { useState } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { researchers } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'
import DebugLabel from '../ui/DebugLabel'
import LazyImage from '../ui/LazyImage'
import { ChevronDown } from 'lucide-react'

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
      className="py-20 md:py-28 bg-brand-deep text-white relative overflow-hidden"
    >
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 bg-paper opacity-20 pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <DebugLabel type="label" debugMode={debugMode}>
            <SectionLabel text={researchers.authorBigLabel} light={true} />
          </DebugLabel>
          <DebugLabel type="h3" debugMode={debugMode}>
            <h2 className="text-h3 leading-tight">
              {researchers.authorHeadline}
            </h2>
          </DebugLabel>
        </div>

        {/* Featured Researcher */}
        {featuredAuthor && (
          <div className="flex flex-col md:grid md:grid-cols-[240px_1fr] md:gap-8 mb-16">
            {/* Mobile: Photo first (full width, 16:9) */}
            <div className="md:hidden mb-6">
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
            <div className="flex flex-col text-white/80">
              {/* Quote - Top of right column */}
              <DebugLabel type="quote-featured" debugMode={debugMode}>
                <blockquote className="text-quote-featured italic leading-tight text-white/90 mb-6">
                  "{featuredAuthor.featuredQuote}"
                </blockquote>
              </DebugLabel>

              {/* Name + Title - Below quote */}
              <div>
                <DebugLabel type="author-name" debugMode={debugMode}>
                  <div className="text-author-name">{featuredAuthor.name}</div>
                </DebugLabel>
                <DebugLabel type="role" debugMode={debugMode}>
                  <div className="role text-white/60">{featuredAuthor.role}</div>
                </DebugLabel>
              </div>
            </div>

            {/* Divider - Full width, more spacing below */}
            <div className="md:col-span-2 pt-[36px]">
              <div className="h-px bg-white/20"></div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ACCORDION CARDS SECTION — Phase 2: All Authors Dynamic */}
        {/* ═══════════════════════════════════════════════════════════ */}

        {authors.map((author) => (
          <div key={author.id} className="mb-16">
            {/* Row 1: Portrait + Name/Title/Year/ShortText + Button */}
            <div className="flex flex-col md:grid md:grid-cols-[240px_1fr] md:gap-8 md:items-start">
              {/* Mobile: Portrait first (full width, 16:9) */}
              {author.portrait && (
                <div className="md:hidden mb-6">
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
                <div className="md:hidden mb-4">
                  <DebugLabel type="author-name" debugMode={debugMode}>
                    <h3 className="text-author-name text-white mb-1">
                      {author.name}
                    </h3>
                  </DebugLabel>
                  <DebugLabel type="role" debugMode={debugMode}>
                    <p className="text-role text-white/70 mb-3">
                      {author.role}
                    </p>
                  </DebugLabel>
                  <DebugLabel type="date" debugMode={debugMode}>
                    <p className="text-date text-white/50 mb-4">{author.lifeDates}</p>
                  </DebugLabel>
                </div>

                {/* Desktop: Name/Title/Year */}
                <div className="hidden md:block mb-4">
                  <DebugLabel type="author-name" debugMode={debugMode}>
                    <h3 className="text-author-name text-white mb-1">
                      {author.name}
                    </h3>
                  </DebugLabel>
                  <DebugLabel type="role" debugMode={debugMode}>
                    <p className="text-role text-white/70 mb-3">
                      {author.role}
                    </p>
                  </DebugLabel>
                  <DebugLabel type="date" debugMode={debugMode}>
                    <p className="text-date text-white/50 mb-4">{author.lifeDates}</p>
                  </DebugLabel>
                </div>

                {/* Short text */}
                <DebugLabel type="summary-large" debugMode={debugMode}>
                  <p className="text-summary-large text-white/80 leading-relaxed mb-6">
                    {author.shortVersion}
                  </p>
                </DebugLabel>

                {/* Read more button - centered with divider lines */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex-1 h-px bg-white/20"></div>
                  <DebugLabel type="read-more" debugMode={debugMode}>
                    <button
                      onClick={() => toggleExpand(author.id)}
                      className="text-read-more hover:text-color-accent transition-colors flex items-center gap-2"
                    >
                      {expandedId === author.id ? researchers.accordion.readLess : researchers.accordion.readMore}
                      <ChevronDown className={`transition-transform duration-200 ${expandedId === author.id ? 'rotate-180' : ''}`} />
                    </button>
                  </DebugLabel>
                  <div className="flex-1 h-px bg-white/20"></div>
                </div>
              </div>
            </div>

            {/* Row 2: Expanded content (full width) */}
            {expandedId === author.id && (
              <>
                <div className="mt-4 pt-8 md:col-span-2">
                  <DebugLabel type="body-narrative" debugMode={debugMode}>
                    <p className="text-body-narrative text-white/80 leading-relaxed mb-6 whitespace-pre-line">
                      {author.longVersion}
                    </p>
                  </DebugLabel>
                  {author.sourceUrl && (
                    <DebugLabel type="source-link" debugMode={debugMode}>
                      <a
                        href={author.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-source-link hover:text-color-accent transition-colors"
                      >
                        {author.sourceLabel} →
                      </a>
                    </DebugLabel>
                  )}
                </div>
                {/* Divider - Full width, same spacing as featured section */}
                <div className="md:col-span-2 pt-[36px]">
                  <div className="h-px bg-white/20"></div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
