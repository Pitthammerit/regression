import React, { useState } from 'react'
import { evidence } from '../../content/plr-de'
import LazyImage from '../ui/LazyImage'
import { ChevronDown } from 'lucide-react'

export default function EvidenceSection() {
  const authors = evidence.authors
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

        {/* Four Portraits with English Quotes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {authors.map((author) => {
            const portraitUrl = author.portrait
            return (
              <div key={author.id} className="flex flex-col items-center text-center">
                {/* Portrait - Square or Placeholder */}
                {portraitUrl ? (
                  <div className="aspect-square w-full max-w-[240px] mb-6 overflow-hidden rounded-sm bg-brand-dark/50">
                    <LazyImage
                      src={portraitUrl}
                      alt={author.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="aspect-square w-full max-w-[240px] mb-6 flex items-center justify-center bg-brand-dark/30 rounded-sm border border-white/10">
                    <p className="font-serif text-xl text-white/90 italic text-center px-4">
                      {author.name}
                    </p>
                  </div>
                )}

                {/* English Quote */}
                <blockquote className="font-serif text-base md:text-lg text-white/90 leading-snug mb-4 italic">
                  "{author.quote}"
                </blockquote>

                {/* Name & Role & Dates */}
                <div className="font-sans text-sm text-brand-steel">
                  <span className="font-semibold">— {author.name}</span>
                  {author.lifeDates && (
                    <span className="block text-xs text-white/50 italic mt-1">{author.lifeDates}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ACCORDION CARDS SECTION — Phase 2: All Authors Dynamic */}
        {/* ═══════════════════════════════════════════════════════════ */}

        {authors.map((author) => (
          <div key={author.id} className="mb-12 md:flex md:items-start md:gap-10">
            {/* Mobile: Name/Datum/Role ÜBER dem Foto */}
            <div className="md:hidden mb-6">
              <h3 className="font-serif text-2xl text-white font-bold mb-1">
                {author.name}
              </h3>
              <p className="font-sans text-sm text-white/50 mb-3">{author.lifeDates}</p>
              <p className="font-sans text-sm text-white/70 uppercase tracking-wider mb-4">
                {author.role}
              </p>
            </div>

            {/* Foto: Mobile 16:9 über Text, Desktop 2:3 links */}
            {author.portrait && (
              <div className="md:w-1/3 md:max-w-[240px] md:shrink-0">
                {/* Mobile: 16:9 */}
                <div className="md:hidden aspect-video mb-6 overflow-hidden rounded-md bg-brand-dark/50">
                  <LazyImage
                    src={author.portrait}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Desktop: 2:3 */}
                <div className="hidden md:block aspect-[2/3] overflow-hidden rounded-md bg-brand-dark/50">
                  <LazyImage
                    src={author.portrait}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Text-Bereich */}
            <div className={author.portrait ? "md:flex md:flex-1 md:flex-col md:mt-0" : "w-full"}>
              {/* Desktop: Name/Datum/Role RECHTS neben Foto */}
              <div className="hidden md:block mb-6">
                <h3 className="font-serif text-2xl md:text-3xl text-white font-bold mb-1">
                  {author.name}
                </h3>
                <p className="font-sans text-sm text-white/50 mb-3">{author.lifeDates}</p>
                <p className="font-sans text-sm text-white/70 uppercase tracking-wider mb-4">
                  {author.role}
                </p>
              </div>

              {/* Kurztext (immer sichtbar) */}
              <p className="font-serif text-base md:text-lg text-white/80 leading-relaxed mb-6">
                {author.shortVersion}
              </p>

              {/* Akkordeon-Button */}
              <button
                onClick={() => toggleExpand(author.id)}
                className="font-sans text-sm text-brand-steel hover:text-brand-green transition-colors flex items-center gap-2"
              >
                {expandedId === author.id ? evidence.accordion.readLess : evidence.accordion.readMore}
                <ChevronDown className={`transition-transform duration-200 ${expandedId === author.id ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Aufklapp-Bereich (volle Breite) */}
            {expandedId === author.id && (
              <div className="mt-6 pt-6 border-t border-white/10 w-full">
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
