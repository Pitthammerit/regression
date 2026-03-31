import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import AccordionWrap from './AccordionWrap'
import DebugLabel from './DebugLabel'

/**
 * TopicAccordionCard - Accordion-style topic card with expand/collapse
 *
 * Reusable accordion card that combines TopicCard styling with accordion functionality.
 * Each topic is clickable and expands to show more content.
 *
 * Props:
 * - title: Topic name (required)
 * - dark: Dark theme variant (default: false)
 * - description: Optional description to show when expanded
 * - debugMode: Show debug labels
 */
export default function TopicAccordionCard({
  title,
  dark = false,
  description = '',
  debugMode = false
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        dark
          ? 'bg-white/5 border-divider-on-dark hover:border-secondary-on-dark'
          : 'bg-color-card-overlay border-color-bg-light hover:border-color-secondary'
      }`}
    >
      {/* Clickable header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left"
        aria-expanded={isExpanded}
      >
        <DebugLabel type="typography-h4" debugMode={debugMode}>
          <h3 className={`typography-h4 ${
            dark ? 'text-primary-on-dark' : 'text-color-primary'
          }`}>
            {title}
          </h3>
        </DebugLabel>

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 shrink-0 ${
            dark ? 'text-secondary-on-dark' : 'text-color-secondary'
          } ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expandable content */}
      <AccordionWrap isOpen={isExpanded} duration="300ms">
        <div className="px-5 pb-5 md:px-6 md:pb-6">
          {description ? (
            <DebugLabel type="typography-body" debugMode={debugMode}>
              <p className={`typography-body ${
                dark ? 'text-on-dark' : 'text-color-text'
              }`}>
                {description}
              </p>
            </DebugLabel>
          ) : (
            <DebugLabel type="typography-body" debugMode={debugMode}>
              <p className={`typography-body italic ${
                dark ? 'text-secondary-on-dark' : 'text-color-secondary/60'
              }`}>
                Klicke für mehr Informationen
              </p>
            </DebugLabel>
          )}
        </div>
      </AccordionWrap>
    </div>
  )
}
