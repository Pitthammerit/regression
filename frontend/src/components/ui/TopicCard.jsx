import React from 'react'
import DebugLabel from './DebugLabel'

/**
 * TopicCard — Reusable card component for topic/items display
 *
 * Props:
 * - title: Heading text (h4)
 * - body: Body text (optional, for cards with description)
 * - children: Alternative to body, allows custom content
 * - debugMode: Show debug labels
 *
 * Used in:
 * - ForWhomSection (title + body)
 * - BookingSection (title only)
 */
export default function TopicCard({ title, body, children, dark = false, debugMode = false }) {
  return (
    <div className={`rounded-2xl p-5 md:p-6 flex flex-col gap-2 border transition-colors ${
      dark
        ? 'bg-white/5 border-divider-on-dark hover:border-secondary-on-dark'
        : 'bg-color-card-overlay border-color-bg-light hover:border-color-secondary'
    }`}>
      <DebugLabel type="h4" debugMode={debugMode}>
        <h3 className={`font-secondary text-h4 leading-snug ${
          dark ? 'text-primary-on-dark' : 'text-color-primary'
        }`}>{title}</h3>
      </DebugLabel>
      {(body || children) && (
        <DebugLabel type="body" debugMode={debugMode}>
          {body ? (
            <p className={`font-primary text-body leading-relaxed ${
              dark ? 'text-on-dark' : 'text-color-text'
            }`}>{body}</p>
          ) : (
            children
          )}
        </DebugLabel>
      )}
    </div>
  )
}
