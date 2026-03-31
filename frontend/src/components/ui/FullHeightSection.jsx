import React from 'react'

/**
 * FullHeightSection — Utility component for 100vh sections
 *
 * A reusable section wrapper that provides:
 * - Full viewport height (h-screen = 100vh)
 * - Vertical centering (flex items-center)
 * - Scroll snap support (snap-section)
 * - Max-width container with standard padding
 *
 * Use this for sections that should take the full viewport height:
 * - Hero sections
 * - Welcome/CTA sections
 * - Podcast section
 * - Any section that benefits from "one screen per section" UX
 *
 * @param {Object} props
 * @param {string} props.id - Section ID for navigation anchors
 * @param {React.ReactNode} props.children - Section content
 * @param {string} props.className - Additional classes to apply
 * @param {Object} props.rest - Other props to pass to section element
 *
 * @example
 * ```jsx
 * <FullHeightSection id="welcome">
 *   <div className="grid md:grid-cols-2 gap-6 items-center">
 *     <div>Content...</div>
 *   </div>
 * </FullHeightSection>
 * ```
 */
export default function FullHeightSection({ id, children, className = '', ...rest }) {
  return (
    <section
      id={id}
      className={`h-screen flex items-center snap-section ${className}`}
      {...rest}
    >
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
        {children}
      </div>
    </section>
  )
}
