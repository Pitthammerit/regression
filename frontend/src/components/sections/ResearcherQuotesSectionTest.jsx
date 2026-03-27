import React, { useState } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { researchers } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'
import Container from '../ui/Container'

/**
 * ResearcherQuotesSectionTest — RAW Tailwind spacing test
 *
 * NO custom spacing utilities - only raw Tailwind classes
 */
export default function ResearcherQuotesSectionTest() {
  const authorsWithPortraits = researchers.authors.filter(author => author.portrait !== null)

  return (
    <section className="py-12 bg-color-bg-dark text-on-dark-heading">
      <Container>
        <SectionLabel text={researchers.authorBigLabel} light />

        <h2 className="font-display text-h2 leading-tight text-on-dark-heading mb-4">
          {researchers.authorHeadline}
        </h2>

        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {authorsWithPortraits.slice(0, 3).map((author) => (
            <div key={author.id}>
              <AspectRatio ratio={1 / 1} className="mb-4">
                <LazyImage
                  src={author.portrait}
                  alt={author.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </AspectRatio>
              <p className="font-display text-quote-featured italic leading-tight text-on-dark-quote mb-4">
                "{author.quote}"
              </p>
              <p className="font-display text-author-name text-on-dark-heading mb-1">
                {author.name}
              </p>
              <p className="text-sm text-on-dark-role">
                {author.role}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
