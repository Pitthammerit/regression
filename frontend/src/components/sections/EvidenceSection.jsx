import React, { useState } from 'react'
import { evidence } from '../../content/plr-de'
import LazyImage from '../ui/LazyImage'

function AuthorityCard({ authority, index }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="flex flex-col" data-testid={`authority-${authority.id}`}>
      {/* Portrait or Quote Card */}
      {authority.portrait ? (
        <div
          className="aspect-square w-full mb-6 overflow-hidden rounded-sm bg-brand-dark/50 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <LazyImage
            src={authority.portrait}
            alt={authority.name}
            className="w-full h-full object-cover object-top"
            fallback={
              <div className="w-full h-full flex items-center justify-center text-white/50 font-serif text-sm">
                {authority.name}
              </div>
            }
          />
        </div>
      ) : (
        <div
          className="p-6 bg-brand-dark/30 rounded-sm mb-6 cursor-pointer hover:bg-brand-dark/40 transition-colors min-h-[200px] flex items-center justify-center border border-white/10"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <blockquote className="font-serif text-lg md:text-xl text-white/90 leading-snug text-center italic">
            {isExpanded ? (
              <span className="text-brand-green">{authority.name}</span>
            ) : (
              '"The evidence simply made it impossible to ignore."'
            )}
          </blockquote>
        </div>
      )}

      {/* Short Quote - Always Visible */}
      <p className="font-serif text-base md:text-lg text-white/80 leading-relaxed mb-4 px-2">
        {authority.shortQuote}
      </p>

      {/* Name & Role & Dates */}
      <div className="mb-4 px-2">
        <p className="font-sans text-sm font-semibold text-white mb-1">{authority.name}</p>
        <p className="font-sans text-xs text-brand-steel uppercase tracking-wider">{authority.role}</p>
        {authority.dates && (
          <p className="font-sans text-xs text-white/50 italic mt-1">{authority.dates}</p>
        )}
      </div>

      {/* Expand Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex items-center gap-2 px-4 py-2 mx-2 text-sm font-sans text-white/70 hover:text-white transition-colors"
        aria-expanded={isExpanded}
      >
        <span>{isExpanded ? 'Weniger lesen' : 'Mehr erfahren'}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Accordion Content - Expands Below */}
      {isExpanded && (
        <div className="mt-6 px-6 py-6 bg-brand-dark/30 rounded-sm border border-white/10 animate-fadeIn">
          <div className="prose prose-invert prose-lg max-w-none">
            {authority.longVersion.split('\n\n').map((paragraph, i) => (
              <p key={i} className="font-serif text-base md:text-lg text-white/80 leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function EvidenceSection() {
  const authorities = evidence.authorities

  return (
    <section
      id="evidence"
      data-testid="evidence-section"
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

        {/* Three Portraits with Quotes & Accordions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16">
          {authorities.map((authority, index) => (
            <AuthorityCard key={authority.id} authority={authority} index={index} />
          ))}
        </div>

        {/* Journal of Regression Therapy */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start max-w-4xl">
          {/* Journal Image */}
          <div className="w-full md:w-1/3 aspect-[3/4] max-w-[200px] overflow-hidden rounded-sm bg-brand-dark/50 shrink-0">
            <LazyImage
              src={evidence.journal.portrait}
              alt={evidence.journal.name}
              className="w-full h-full object-cover"
              fallback={
                <div className="w-full h-full flex items-center justify-center text-white/50 font-serif text-sm">
                  {evidence.journal.name}
                </div>
              }
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
            <p className="font-serif text-lg md:text-xl text-white/80 leading-relaxed">
              {evidence.journal.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
