import React from 'react'
import { statement } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import DebugLabel from '../ui/DebugLabel'

/**
 * StatementSection — Statement section with composite typography utilities
 *
 * MIGRATED to composite typography utilities:
 * - H2: typography-h2 italic (replaces font-secondary text-h2 italic text-color-primary)
 * - H3: typography-h3 italic (replaces font-secondary text-h3 italic text-color-primary)
 *
 * CRITICAL PRESERVED:
 * - SectionWrapper with id="statement" (scroll target)
 * - Map over statement.lines from content layer
 * - Border styling (border-black/10)
 */
export default function StatementSection({ debugMode = false }) {
  return (
    <SectionWrapper id="statement" data-testid="statement-section">
      <div className="max-w-centered-header mx-auto text-center border-t border-b border-color-light py-10">
        {statement.lines.map((line, i) => (
          <DebugLabel type={i === 1 ? 'h2' : 'h3'} debugMode={debugMode} key={i}>
            <p
              className={`leading-relaxed italic ${i > 0 ? 'mt-5' : ''
                } ${i === 1
                  ? 'typography-h2'
                  : 'typography-h3'
                }`}
            >
              {line}
            </p>
          </DebugLabel>
        ))}
      </div>
    </SectionWrapper>
  )
}
