import React, { useState } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { references } from "../../content"
import LazyImage from '../ui/LazyImage'
import { BookOpen, ChevronDown } from 'lucide-react'

export default function ReferencesSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section
      id="references"
      data-testid="references-section"
      className="py-20 md:py-28 bg-brand-deep text-white relative overflow-hidden"
    >
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 bg-paper opacity-20 pointer-events-none" />

      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-primary text-xs uppercase tracking-[0.2em] text-label/80 mb-4">
            {references.bigLabel}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
            {references.headline}
          </h2>
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
                      <div className="w-full h-full border border-on-dark-divider rounded-lg flex items-center justify-center bg-brand-dark/50">
                        <BookOpen className="w-12 h-12 text-white/30" />
                      </div>
                    </AspectRatio>
                  )}
                </div>

                {/* Right column: Title → Subtitle → Dates → Description → Source */}
                <div className="flex flex-col">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-block"
                  >
                    <p className="font-serif text-xl md:text-2xl text-white font-semibold mb-1 group-hover:text-accent">
                      {resource.name}
                    </p>
                  </a>
                  <p className="font-primary text-white/70 text-sm uppercase tracking-wider mb-1">
                    {resource.role}
                  </p>
                  {resource.dates && (
                    <p className="font-primary text-white/50 text-sm mb-4">
                      {resource.dates}
                    </p>
                  )}
                  <p className="font-serif text-lg md:text-xl text-white/80 leading-relaxed mb-4 whitespace-pre-line">
                    {resource.description}
                  </p>
                  <a
                    href={resource.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-primary text-sm text-label hover:text-accent transition-colors"
                  >
                    {resource.sourceLabel} →
                  </a>
                </div>

                {/* Divider with Mehr anzeigen button */}
                <div className="md:col-span-2 pt-[36px]">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/20"></div>
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      {expanded ? 'Weniger anzeigen' : 'Mehr anzeigen'}
                      <ChevronDown className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                    </button>
                    <div className="flex-1 h-px bg-white/20"></div>
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
                      <div className="w-full h-full border border-on-dark-divider rounded-lg flex items-center justify-center bg-brand-dark/50">
                        <BookOpen className="w-12 h-12 text-white/30" />
                      </div>
                    </AspectRatio>
                  )}
                </div>

                {/* Right column: Title → Subtitle → Dates → Description → Source */}
                <div className="flex flex-col">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-block"
                  >
                    <p className="font-serif text-xl md:text-2xl text-white font-semibold mb-1 group-hover:text-accent">
                      {resource.name}
                    </p>
                  </a>
                  <p className="font-primary text-white/70 text-sm uppercase tracking-wider mb-1">
                    {resource.role}
                  </p>
                  {resource.dates && (
                    <p className="font-primary text-white/50 text-sm mb-4">
                      {resource.dates}
                    </p>
                  )}
                  <p className="font-serif text-lg md:text-xl text-white/80 leading-relaxed mb-4 whitespace-pre-line">
                    {resource.description}
                  </p>
                  <a
                    href={resource.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-primary text-sm text-label hover:text-accent transition-colors"
                  >
                    {resource.sourceLabel} →
                  </a>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  )
}
