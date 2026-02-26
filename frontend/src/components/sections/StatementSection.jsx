import React from 'react'
import { statement } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'

export default function StatementSection() {
  return (
    <SectionWrapper id="statement" data-testid="statement-section">
      <div className="max-w-3xl mx-auto text-center border-t border-b border-black/10 py-20">
        {statement.lines.map((line, i) => (
          <p
            key={i}
            className={`font-serif leading-relaxed ${i > 0 ? 'mt-5' : ''}
              ${i === 1
                ? 'text-2xl md:text-3xl lg:text-4xl italic text-brand-deep'
                : 'text-xl md:text-2xl lg:text-3xl text-brand-body'
              }`}
          >
            {line}
          </p>
        ))}
      </div>
    </SectionWrapper>
  )
}
