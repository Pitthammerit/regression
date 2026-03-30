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
export default function TopicCard({ title, body, children, debugMode = false }) {
  return (
    <div className="bg-color-card-overlay rounded-2xl p-5 md:p-6 flex flex-col gap-2 border border-color-bg-light hover:border-color-secondary transition-colors">
      <DebugLabel type="h4" debugMode={debugMode}>
        <h3 className="font-secondary text-h4 text-color-primary leading-snug">{title}</h3>
      </DebugLabel>
      {(body || children) && (
        <DebugLabel type="body" debugMode={debugMode}>
          {body ? (
            <p className="font-primary text-body text-color-text leading-relaxed">{body}</p>
          ) : (
            children
          )}
        </DebugLabel>
      )}
    </div>
  )
}
