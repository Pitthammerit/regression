import React from 'react'

export default function SectionWrapper({ id, dark = false, children, className = '', ...rest }) {
  return (
    <section
      id={id}
      className={`py-16 md:py-20 ${dark ? 'bg-color-bg-dark text-white' : ''} ${className}`}
      {...rest}
    >
      <div className="max-w-content mx-auto px-6">
        {children}
      </div>
    </section>
  )
}
