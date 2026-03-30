import React from 'react'
import { testimonials } from '../../content/plr-de'
import { TESTIMONIALS_LIST } from '../../content/testimonials.list'
import SectionLabel from '../ui/SectionLabel'
import LazyImage from '../ui/LazyImage'
import DebugLabel from '../ui/DebugLabel'

/**
 * TestimonialsSectionCopy - Client testimonials grid layout with typography tokens
 *
 * MIGRATED to design tokens (Single Source of Truth):
 * - Font-family: font-secondary (headlines), font-primary (body/labels)
 * - Label: text-label (15px) + color-label + .label plugin (uppercase)
 * - H2: text-h2 (36px) + color-heading
 * - Quote (italic): text-body-lg (20px) + color-body + .quote-featured-italic plugin
 * - Name: text-h5 (20px) + color-heading + font-semibold
 * - Context: text-label (15px) + color-label + .role plugin (uppercase)
 * - Background cards: bg-color-card-overlay (white/50)
 * - Borders: border-color-light (black/10)
 * - Spacing: section-padding, content-spacing-lg, content-spacing-md, name-role-spacing
 *
 * Layout:
 * - First testimonial (index 0): Left column, full height
 * - Remaining testimonials: Distributed in 2-column grid
 * - Uses TESTIMONIALS_LIST for dynamic testimonials
 *
 * @param {Object} props
 * @param {boolean} props.debugMode - Show debug labels for typography tokens
 */
export default function TestimonialsSectionCopy({ debugMode = false }) {
  // Dynamic testimonials from list
  const [featured, ...others] = TESTIMONIALS_LIST
  // featured = Anna (first), others = [Alexander, Arthur, Hernan, ...]

  return (
    <div id="testimonials" data-testid="testimonials-section">
      {/* Client Testimonials */}
      <div className="section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="font-primary text-label label text-color-secondary content-spacing-lg">
            <DebugLabel token="text-label (15px) + color-label + .label" show={debugMode}>
              WALL OF LOVE
            </DebugLabel>
          </h2>
          <SectionLabel text={testimonials.clientLabel} />

          {/*
            Layout:
            Desktop — 3 columns:
              Col 1: Featured (row-span-2, tall)
              Col 2+3: Remaining testimonials in 2-column grid
            Mobile — single column stack
          */}
          <div className="content-spacing-lg grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">

            {/* Featured testimonial — left, full height */}
            {featured && (
              <div
                className="md:row-span-2 bg-color-card-overlay rounded-2xl p-8 border border-color-light flex flex-col justify-between"
                data-testid="testimonial-card-featured"
              >
                <blockquote className="font-secondary text-body-lg quote-featured-italic text-color-text leading-relaxed mb-8">
                  <DebugLabel token="text-body-lg (20px) + color-body + .quote-featured-italic" show={debugMode}>
                    "{featured.quote}"
                  </DebugLabel>
                </blockquote>
                <div className="flex items-center gap-4 mt-auto">
                  {featured.image && (
                    <LazyImage
                      src={featured.image}
                      alt={featured.name}
                      className="w-12 h-12 rounded-full object-cover object-top border border-color-light shrink-0"
                    />
                  )}
                  <div>
                    <div className="font-primary text-h5 font-semibold text-color-primary">
                      <DebugLabel token="text-h5 (20px) + color-heading + font-semibold" show={debugMode}>
                        {featured.name}
                      </DebugLabel>
                    </div>
                    <div className="font-primary text-label role text-color-secondary name-role-spacing">
                      <DebugLabel token="text-label (15px) + color-label + .role" show={debugMode}>
                        {featured.context}
                      </DebugLabel>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Remaining testimonials — 2-column grid */}
            {others.map((testimonial, index) => (
              <TestimonialCard key={index} c={testimonial} index={index} debugMode={debugMode} />
            ))}

            {/* Empty slot(s) if needed to maintain grid layout */}
            {others.length < 4 && (
              <div className="hidden md:block rounded-2xl border border-dashed border-color-light" />
            )}

          </div>
        </div>
      </div>

    </div>
  )
}

function TestimonialCard({ c, index, debugMode = false }) {
  return (
    <div
      className="bg-color-card-overlay rounded-2xl p-8 border border-color-light flex flex-col justify-between"
      data-testid={`testimonial-card-${index}`}
    >
      <blockquote className="font-secondary text-body-lg quote-featured-italic text-color-text leading-relaxed mb-8">
        <DebugLabel token="text-body-lg (20px) + color-body + .quote-featured-italic" show={debugMode}>
          "{c.quote}"
        </DebugLabel>
      </blockquote>
      <div className="flex items-center gap-4 mt-auto">
        {c.image && (
          <LazyImage
            src={c.image}
            alt={c.name}
            className="w-12 h-12 rounded-full object-cover border border-color-light shrink-0"
          />
        )}
        <div>
          <div className="font-primary text-h5 font-semibold text-color-primary">
            <DebugLabel token="text-h5 (20px) + color-heading + font-semibold" show={debugMode}>
              {c.name}
            </DebugLabel>
          </div>
          <div className="font-primary text-label role text-color-secondary name-role-spacing">
            <DebugLabel token="text-label (15px) + color-label + .role" show={debugMode}>
              {c.context}
            </DebugLabel>
          </div>
        </div>
      </div>
    </div>
  )
}
