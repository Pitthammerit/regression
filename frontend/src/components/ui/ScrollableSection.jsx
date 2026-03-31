import React from 'react'

/**
 * ScrollableSection — Section wrapper with scroll-snap
 *
 * All sections now use snap-section for consistent scroll behavior.
 * The hasAccordion prop is kept for backward compatibility but no longer
 * affects scroll-snap (removed due to skipping issues with snap-none).
 *
 * Props:
 * - id: Section ID for anchor linking
 * - hasAccordion: Boolean - kept for compatibility, no longer affects scroll
 * - dark: Boolean - if true, applies dark background
 * - className: Additional CSS classes for section element
 * - children: Section content
 * - ...rest: Any other props passed to section element
 */
export default function ScrollableSection({ id, hasAccordion = false, dark = false, className = '', children, ...rest }) {
  return (
    <section
      id={id}
      className={`py-16 md:py-20 snap-section ${dark ? 'bg-color-primary text-primary-on-dark' : ''} ${className}`}
      {...rest}
    >
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
        {children}
      </div>
    </section>
  )
}
