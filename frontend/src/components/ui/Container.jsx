import React from 'react'

/**
 * Container — Central layout component
 *
 * Best Practice: Sections handle layout/spacing, Container handles width/centering
 * All sections use this instead of inline max-w-content mx-auto px-6
 */
export default function Container({ children, className = '' }) {
  return (
    <div className={`max-w-content mx-auto px-6 ${className}`}>
      {children}
    </div>
  )
}
