import React from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { researchers } from '../../content/plr-de'
import Container from '../ui/Container'
import LazyImage from '../ui/LazyImage'

/**
 * SimpleTestSection — Minimal test section with real images
 *
 * Structure: Label → H2 → 3 columns with images
 * Uses same spacing pattern as ResearchersSectionCopy
 */
export default function SimpleTestSection() {
  // Get first 3 authors with portraits
  const authors = researchers.authors.slice(0, 3)

  return (
    <section className="py-12 bg-color-bg-dark text-on-dark-heading">
      <Container>
        {/* Label */}
        <p className="font-sans text-label label text-on-dark-label mb-2">
          Testlabel
        </p>

        {/* H2 - same spacing as ResearchersSectionCopy */}
        <h2 className="font-display text-h2 leading-tight text-on-dark-heading section-block-spacing">
          Testheader H2
        </h2>

        {/* 3 columns with real images */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {authors.map((author) => (
            <div key={author.id}>
              {/* Image */}
              <div className="mb-4">
                <AspectRatio ratio={1 / 1}>
                  <LazyImage
                    src={author.portrait}
                    alt={author.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </AspectRatio>
              </div>

              {/* Quote - uses content-spacing like ResearchersSectionCopy */}
              <p className="font-display text-quote-featured italic leading-tight text-on-dark-quote content-spacing">
                "{author.quote}"
              </p>

              {/* Name - uses name-role-spacing */}
              <p className="font-display text-author-name text-on-dark-heading name-role-spacing">
                {author.name}
              </p>

              {/* Role - uses role-date-spacing */}
              <p className="text-sm text-on-dark-role role-date-spacing">
                {author.role}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
