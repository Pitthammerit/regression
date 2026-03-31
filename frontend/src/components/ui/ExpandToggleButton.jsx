import React from 'react'
import { ChevronDown } from 'lucide-react'
import DebugLabel from './DebugLabel'

/**
 * ExpandToggleButton - Reusable "Mehr/Weniger" toggle button
 *
 * Used in sections with expandable content to show/hide additional items.
 * Includes divider lines on both sides, rotating chevron icon, and DebugLabel.
 *
 * @param {boolean} isExpanded - Current expanded state
 * @param {function} onToggle - Toggle callback
 * @param {string} labelMore - Text to show when collapsed (e.g., "Mehr")
 * @param {string} labelLess - Text to show when expanded (e.g., "Weniger")
 * @param {boolean} debugMode - Enable debug labels
 * @param {string} className - Additional classes for spacing/layout
 */
export default function ExpandToggleButton({
  isExpanded = false,
  onToggle,
  labelMore,
  labelLess,
  debugMode = false,
  className = '',
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-color-border-light"></div>
      <DebugLabel type="typography-meta-on-dark" debugMode={debugMode}>
        <button
          onClick={onToggle}
          className="flex items-center gap-2 typography-meta-on-dark uppercase hover:text-primary-on-dark transition-colors cursor-pointer"
        >
          {isExpanded ? labelLess : labelMore}
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </DebugLabel>
      <div className="flex-1 h-px bg-color-border-light"></div>
    </div>
  )
}
