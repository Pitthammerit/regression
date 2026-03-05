import React, { useState } from 'react'
import { evidence } from '../../content/plr-de'
import LazyImage from '../ui/LazyImage'
import { ChevronDown } from 'lucide-react'

export default function EvidenceSection() {
  const authorities = evidence.authorities
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
            {evidence.authorityBigLabel}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
            {evidence.authorityHeadline}
          </h2>
        </div>

        {/* Four Portraits with English Quotes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {authorities.map((authority) => {
            const portraitUrl = authority.portrait
            return (
              <div key={authority.id} className="flex flex-col items-center text-center">
                {/* Portrait - Square or Placeholder */}
                {portraitUrl ? (
                  <div className="aspect-square w-full max-w-[240px] mb-6 overflow-hidden rounded-sm bg-brand-dark/50">
                    <LazyImage
                      src={portraitUrl}
                      alt={authority.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="aspect-square w-full max-w-[240px] mb-6 flex items-center justify-center bg-brand-dark/30 rounded-sm border border-white/10">
                    <p className="font-serif text-xl text-white/90 italic text-center px-4">
                      {authority.name}
                    </p>
                  </div>
                )}

                {/* English Quote */}
                <blockquote className="font-serif text-base md:text-lg text-white/90 leading-snug mb-4 italic">
                  "{authority.quote}"
                </blockquote>

                {/* Name & Role & Dates */}
                <div className="font-sans text-sm text-brand-steel">
                  <span className="font-semibold">— {authority.name}</span>
                  {authority.dates && (
                    <span className="block text-xs text-white/50 italic mt-1">{authority.dates}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ACCORDION CARDS SECTION — Phase 2: All Authorities Dynamic */}
        {/* ═══════════════════════════════════════════════════════════ */}

        {authorities.map((authority) => (
          <div key={authority.id} className="mb-12 md:flex md:items-start md:gap-10">
            {/* Mobile: Name/Datum/Role ÜBER dem Foto */}
            <div className="md:hidden mb-6">
              <h3 className="font-serif text-2xl text-white font-bold mb-1">
                {authority.name}
              </h3>
              <p className="font-sans text-sm text-white/50 mb-3">{authority.dates}</p>
              <p className="font-sans text-sm text-white/70 uppercase tracking-wider mb-4">
                {authority.role}
              </p>
            </div>

            {/* Foto: Mobile 16:9 über Text, Desktop 2:3 links */}
            {authority.portrait && (
              <div className="md:w-1/3 md:max-w-[240px] md:shrink-0">
                {/* Mobile: 16:9 */}
                <div className="md:hidden aspect-video mb-6 overflow-hidden rounded-md bg-brand-dark/50">
                  <LazyImage
                    src={authority.portrait}
                    alt={authority.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Desktop: 2:3 */}
                <div className="hidden md:block aspect-[2/3] overflow-hidden rounded-md bg-brand-dark/50">
                  <LazyImage
                    src={authority.portrait}
                    alt={authority.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Text-Bereich */}
            <div className={authority.portrait ? "md:flex md:flex-1 md:flex-col md:mt-0" : "w-full"}>
              {/* Desktop: Name/Datum/Role RECHTS neben Foto */}
              <div className="hidden md:block mb-6">
                <h3 className="font-serif text-2xl md:text-3xl text-white font-bold mb-1">
                  {authority.name}
                </h3>
                <p className="font-sans text-sm text-white/50 mb-3">{authority.dates}</p>
                <p className="font-sans text-sm text-white/70 uppercase tracking-wider mb-4">
                  {authority.role}
                </p>
              </div>

              {/* Kurztext (immer sichtbar) */}
              <p className="font-serif text-base md:text-lg text-white/80 leading-relaxed mb-6">
                {authority.shortVersion}
              </p>

              {/* Akkordeon-Button */}
              <button
                onClick={() => toggleExpand(authority.id)}
                className="font-sans text-sm text-brand-steel hover:text-brand-green transition-colors flex items-center gap-2"
              >
                {expandedId === authority.id ? evidence.accordion.readLess : evidence.accordion.readMore}
                <ChevronDown className={`transition-transform duration-200 ${expandedId === authority.id ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Aufklapp-Bereich (volle Breite) */}
            {expandedId === authority.id && (
              <div className="mt-6 pt-6 border-t border-white/10 w-full">
                <p className="font-serif text-base md:text-lg text-white/80 leading-relaxed mb-6 whitespace-pre-line">
                  {authority.longVersion}
                </p>
                {authority.sourceUrl && (
                  <a
                    href={authority.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-brand-steel hover:text-brand-green transition-colors"
                  >
                    {authority.sourceLabel} →
                  </a>
                )}
              </div>
            )}
          </div>
        ))}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* Journal of Regression Therapy */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start max-w-4xl">
          {/* Journal Image */}
          <div className="w-full md:w-auto md:max-w-[240px] overflow-hidden rounded-sm bg-brand-dark/50 shrink-0">
            <LazyImage
              src={evidence.journal.portrait}
              alt={evidence.journal.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Journal Text */}
          <div className="flex-1">
            <a
              href={evidence.journal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block"
            >
              <p className="font-serif text-xl md:text-2xl text-white font-semibold mb-3 group-hover:text-brand-green transition-colors">
                {evidence.journal.name}
              </p>
            </a>
            <p className="font-sans text-white/70 text-sm uppercase tracking-wider mb-4">
              {evidence.journal.role}
            </p>
            <p className="font-serif text-lg md:text-xl text-white/80 leading-relaxed mb-4 whitespace-pre-line">
              {evidence.journal.description}
            </p>
            <a
              href={evidence.journal.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-brand-steel hover:text-brand-green transition-colors"
            >
              {evidence.journal.sourceLabel} →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
