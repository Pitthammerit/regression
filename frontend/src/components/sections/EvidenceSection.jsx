import React, { useState } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { evidence } from '../../content/plr-de'
import LazyImage from '../ui/LazyImage'
import { ChevronDown } from 'lucide-react'

export default function EvidenceSection() {
  const authors = evidence.authors
  const featuredAuthor = authors.find(author => author.featured)
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
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
          <div className="font-sans text-xs uppercase tracking-[0.2em] text-brand-steel/80 mb-4">
            {evidence.authorBigLabel}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
            {evidence.authorHeadline}
          </h2>
        </div>

        {/* Featured Researcher */}
        {featuredAuthor && (
          <div className="grid md:grid-cols-[240px_1fr] gap-6 md:gap-8 mb-16 items-start">
            {/* Photo - Left column */}
            <div className="max-w-[240px]">
              <AspectRatio ratio={1 / 1}>
                <LazyImage
                  src={featuredAuthor.portrait}
                  alt={featuredAuthor.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </AspectRatio>
            </div>

            {/* Right column: Quote + Name + Title */}
            <div className="flex flex-col">
              {/* Quote - Top of right column */}
              <blockquote className="font-serif text-[38px] md:text-[44px] italic leading-tight text-white/90 mb-6">
                "{featuredAuthor.quote}"
              </blockquote>

              {/* Name + Title - Below quote */}
              <div className="font-sans text-white/80">
                <div className="font-semibold text-lg">{featuredAuthor.name}</div>
                <div className="text-sm text-white/60">{featuredAuthor.role}</div>
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
            <div className="grid md:grid-cols-[240px_1fr] gap-6 md:gap-8 items-start">
              {/* Portrait - Left column */}
              {author.portrait && (
                <div className="max-w-[240px]">
                  <AspectRatio ratio={2 / 3}>
                    <LazyImage
                      src={author.portrait}
                      alt={author.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </AspectRatio>
                </div>
              )}

              {/* Right column: Name/Title/Year/ShortText + Button */}
              <div className="flex flex-col">
                {/* Mobile: Name/Role/Date above portrait */}
                <div className="md:hidden mb-4">
                  <h3 className="font-serif text-2xl text-white font-bold mb-1">
                    {author.name}
                  </h3>
                  <p className="font-sans text-sm text-white/50 mb-3">{author.lifeDates}</p>
                  <p className="font-sans text-sm text-white/70 uppercase tracking-wider mb-4">
                    {author.role}
                  </p>
                </div>

                {/* Desktop: Name/Title/Year */}
                <div className="hidden md:block mb-4">
                  <h3 className="font-serif text-2xl md:text-3xl text-white font-bold mb-1">
                    {author.name}
                  </h3>
                  <p className="font-sans text-sm text-white/50 mb-3">{author.lifeDates}</p>
                  <p className="font-sans text-sm text-white/70 uppercase tracking-wider mb-4">
                    {author.role}
                  </p>
                </div>

                {/* Short text */}
                <p className="font-serif text-base md:text-lg text-white/80 leading-relaxed mb-6">
                  {author.shortVersion}
                </p>

                {/* Read more button */}
                <button
                  onClick={() => toggleExpand(author.id)}
                  className="font-sans text-sm text-brand-steel hover:text-brand-green transition-colors flex items-center gap-2 self-start"
                >
                  {expandedId === author.id ? evidence.accordion.readLess : evidence.accordion.readMore}
                  <ChevronDown className={`transition-transform duration-200 ${expandedId === author.id ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Row 2: Expanded content (full width) */}
            {expandedId === author.id && (
              <div className="mt-8 pt-8 border-t border-white/10 md:col-span-2">
                <p className="font-serif text-base md:text-lg text-white/80 leading-relaxed mb-6 whitespace-pre-line">
                  {author.longVersion}
                </p>
                {author.sourceUrl && (
                  <a
                    href={author.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-brand-steel hover:text-brand-green transition-colors"
                  >
                    {author.sourceLabel} →
                  </a>
                )}
              </div>
            )}
          </div>
        ))}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* Resources (Journals, Books, Audiobooks, etc.) */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {evidence.resources && (
          <div className="max-w-4xl mx-auto">
            {evidence.resources.map((resource) => (
              <div key={resource.type} className="flex flex-col md:flex-row gap-6 md:gap-10 items-start max-w-4xl mb-12">
                {/* Resource Image */}
                <div className="w-full md:w-auto md:max-w-[240px] overflow-hidden rounded-sm bg-brand-dark/50 shrink-0">
                  <LazyImage
                    src={resource.portrait}
                    alt={resource.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Resource Text */}
                <div className="flex-1">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-block"
                  >
                    <p className="font-serif text-xl md:text-2xl text-white font-semibold mb-3 group-hover:text-brand-green transition-colors">
                      {resource.name}
                    </p>
                  </a>
                  {resource.dates && (
                    <p className="font-sans text-white/50 text-sm mb-2">
                      {resource.dates}
                    </p>
                  )}
                  <p className="font-sans text-white/70 text-sm uppercase tracking-wider mb-4">
                    {resource.role}
                  </p>
                  <p className="font-serif text-lg md:text-xl text-white/80 leading-relaxed mb-4 whitespace-pre-line">
                    {resource.description}
                  </p>
                  <a
                    href={resource.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-brand-steel hover:text-brand-green transition-colors"
                  >
                    {resource.sourceLabel} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
