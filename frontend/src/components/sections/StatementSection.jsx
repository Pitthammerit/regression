import React from 'react'
import { useContent } from '../../contexts/ContentContext'
import FullHeightSection from '../ui/FullHeightSection'
import DebugLabel from '../ui/DebugLabel'

/**
 * StatementSection — Statement section with composite typography utilities
 *
 * MIGRATED to composite typography utilities:
 * - Hero: typography-hero (first line - main statement)
 * - H2: typography-h2 italic (remaining lines)
 *
 * CRITICAL PRESERVED:
 * - FullHeightSection for 100vh with id="statement" (scroll target)
 * - Map over statement.lines from content layer
 * - Border styling (border-black/10)
 */
export default function StatementSection({ debugMode = false }) {
  const { statement } = useContent()

  return (
    <FullHeightSection id="statement" data-testid="statement-section">
      <div className="max-w-centered-header mx-auto text-center border-t border-b border-color-light py-10">
        {statement.lines.map((line, i) => (
          <DebugLabel type={i === 0 ? 'hero' : 'h2'} debugMode={debugMode} key={i}>
            <p
              className={`leading-relaxed italic ${i > 0 ? 'mt-5' : ''
                } ${i === 0
                  ? 'typography-hero'
                  : 'typography-h2'
                }`}
            >
              {line}
            </p>
          </DebugLabel>
        ))}
      </div>
    </FullHeightSection>
  )
}
