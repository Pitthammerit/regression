import React, { useState } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { researchers } from '../../content/plr-de'
import LazyImage from '../ui/LazyImage'
import { ChevronDown } from 'lucide-react'

export default function ResearchersSection() {
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
      id="science"
      data-testid="science-section"
      className="py-20 md:py-28 bg-brand-deep text-white relative overflow-hidden"
    >
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 bg-paper opacity-20 pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-label text-tertiary mb-4">
            {researchers.authorBigLabel}
          </div>
          <h2 className="text-h2 md:text-h1 text-on-dark leading-tight">
            {researchers.authorHeadline}
          </h2>
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
            <div className="flex flex-col">
              {/* Quote - Top of right column */}
              <blockquote className="font-display text-quote-featured italic leading-tight text-on-dark-muted mb-6">
                "{featuredAuthor.featuredQuote}"
              </blockquote>

              {/* Name + Title - Below quote */}
              <div className="text-on-dark-muted">
                <div className="font-display text-author-name">{featuredAuthor.name}</div>
                <div className="text-role text-on-dark-faded">{featuredAuthor.role}</div>
              </div>
            </div>

            {/* Divider - Full width, more spacing below */}
            <div className="md:col-span-2 pt-[36px]">
              <div className="h-px bg-dim-dark"></div>
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
                  <h3 className="font-display text-author-name text-on-dark mb-1">
                    {author.name}
                  </h3>
                  <p className="text-role text-on-dark-muted uppercase tracking-wider mb-3">
                    {author.role}
                  </p>
                  <p className="text-date text-on-dark-faded mb-4">{author.lifeDates}</p>
                </div>

                {/* Desktop: Name/Title/Year */}
                <div className="hidden md:block mb-4">
                  <h3 className="font-display text-author-name text-on-dark mb-1">
                    {author.name}
                  </h3>
                  <p className="text-role text-on-dark-muted uppercase tracking-wider mb-3">
                    {author.role}
                  </p>
                  <p className="text-date text-on-dark-faded mb-4">{author.lifeDates}</p>
                </div>

                {/* Short text */}
                <p className="font-display text-description text-on-dark-muted leading-relaxed mb-6">
                  {author.shortVersion}
                </p>

                {/* Read more button - centered with divider lines */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex-1 h-px bg-dim-dark"></div>
                  <button
                    onClick={() => toggleExpand(author.id)}
                    className="text-read-more text-tertiary hover:text-brand-green transition-colors flex items-center gap-2"
                  >
                    {expandedId === author.id ? researchers.accordion.readLess : researchers.accordion.readMore}
                    <ChevronDown className={`transition-transform duration-200 ${expandedId === author.id ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="flex-1 h-px bg-dim-dark"></div>
                </div>
              </div>
            </div>

            {/* Row 2: Expanded content (full width) */}
            {expandedId === author.id && (
              <>
                <div className="mt-4 pt-8 md:col-span-2">
                  <p className="font-display text-body-narrative text-on-dark-muted leading-relaxed mb-6 whitespace-pre-line">
                    {author.longVersion}
                  </p>
                  {author.sourceUrl && (
                    <a
                      href={author.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-source-link text-tertiary hover:text-brand-green transition-colors"
                    >
                      {author.sourceLabel} →
                    </a>
                  )}
                </div>
                {/* Divider - Full width, same spacing as featured section */}
                <div className="md:col-span-2 pt-[36px]">
                  <div className="h-px bg-dim-dark"></div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
