import React from 'react'
import { statement } from '../../content'
import SectionWrapper from '../ui/SectionWrapper'
import DebugLabel from '../ui/DebugLabel'

/**
 * StatementSectionCopy — Statement section with typography tokens
 *
 * MIGRATED to design tokens (Single Source of Truth):
 * - Font-family: font-secondary (Cormorant Garamond, serif)
 * - All lines: text-h2 (36px) + italic + color-heading (blue)
 * - Consistent styling across all statement lines
 *
 * CRITICAL PRESERVED:
 * - SectionWrapper with id="statement" (scroll target)
 * - Map over statement.lines from content layer
 * - Border styling (border-black/10)
 */
export default function StatementSectionCopy({ debugMode = false }) {
  return (
    <SectionWrapper id="statement" data-testid="statement-section">
      <div className="max-w-centered-header mx-auto text-center border-t border-b border-color-light py-10">
        {statement.lines.map((line, i) => (
          <DebugLabel type={i === 1 ? 'h2' : 'h3'} debugMode={debugMode} key={i}>
            <p
              className={`font-secondary leading-relaxed ${i > 0 ? 'mt-5' : ''
                } ${i === 1
                  ? 'text-h2 italic text-color-primary'
                  : 'text-h3 italic text-color-primary'
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
