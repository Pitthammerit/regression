import React from 'react'

export default function CtaButton({ label, variant = 'primary', className = '', onClick, 'data-testid': testId, ...rest }) {
  const handleClick = onClick || (() => {
    // Scroll to booking section
    const bookingEl = document.getElementById('booking')
    if (bookingEl) bookingEl.scrollIntoView({ behavior: 'smooth' })
    // Dispatch event to auto-open calendar accordion
    window.dispatchEvent(new CustomEvent('booking:open'))
  })

  const base = 'inline-block font-primary text-button-text button-text py-3 px-8 rounded-full transition-colors duration-200 cursor-pointer'
  const styles = {
    primary:   `${base} bg-color-primary text-white hover:bg-color-secondary`,
    secondary: `${base} border border-color-primary text-color-primary hover:bg-color-primary hover:text-white`,
    ghost:     `${base} text-color-secondary hover:text-color-primary`,
    inverted:  `${base} bg-on-dark text-color-primary hover:bg-color-secondary hover:text-white`,
  }

  return (
    <button onClick={handleClick} className={`${styles[variant]} ${className}`} data-testid={testId || `cta-button-${variant}`} {...rest}>
      {label}
    </button>
  )
}
