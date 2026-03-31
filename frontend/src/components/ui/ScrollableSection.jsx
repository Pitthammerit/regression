import React from 'react'

/**
 * ScrollableSection — Section wrapper with selective scroll-snap
 *
 * Provides two modes:
 * 1. hasAccordion=false: Standard section wrapper with scroll-snap (snap-section)
 * 2. hasAccordion=true: Section without scroll-snap (snap-none) for accordions
 *
 * Props:
 * - id: Section ID for anchor linking
 * - hasAccordion: Boolean - if true, disables scroll-snap for this section
 * - dark: Boolean - if true, applies dark background
 * - className: Additional CSS classes for section element
 * - children: Section content
 * - ...rest: Any other props passed to section element
 *
 * Usage:
 *   <ScrollableSection id="researchers" hasAccordion={true}>
 *     {/* Accordion content *\/}
 *   </ScrollableSection>
 */
export default function ScrollableSection({ id, hasAccordion = false, dark = false, className = '', children, ...rest }) {
  return (
    <section
      id={id}
      className={`py-16 md:py-20 ${hasAccordion ? 'snap-none' : 'snap-section'} ${dark ? 'bg-color-primary text-primary-on-dark' : ''} ${className}`}
      {...rest}
    >
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
        {children}
      </div>
    </section>
  )
}
