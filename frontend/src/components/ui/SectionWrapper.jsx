import React from 'react'

export default function SectionWrapper({ id, dark = false, children, className = '' }) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${dark ? 'bg-brand-dark text-white' : 'bg-transparent'} ${className}`}
    >
      <div className="max-w-content mx-auto px-6">
        {children}
      </div>
    </section>
  )
}
