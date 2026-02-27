import React from 'react'

export default function CtaButton({ label, variant = 'primary', className = '', onClick }) {
  const handleClick = onClick || (() => {
    // Scroll to booking section
    const bookingEl = document.getElementById('booking')
    if (bookingEl) bookingEl.scrollIntoView({ behavior: 'smooth' })
    // Dispatch event to auto-open calendar accordion
    window.dispatchEvent(new CustomEvent('booking:open'))
  })

  const base = 'inline-block uppercase tracking-widest text-sm font-sans py-3 px-8 rounded-full transition-colors duration-200 cursor-pointer'
  const styles = {
    primary:   `${base} bg-brand-deep text-white hover:bg-brand-steel`,
    secondary: `${base} border border-brand-deep text-brand-deep hover:bg-brand-deep hover:text-white`,
    ghost:     `${base} text-brand-steel hover:text-brand-deep`,
  }

  return (
    <button onClick={handleClick} className={`${styles[variant]} ${className}`} data-testid={`cta-button-${variant}`}>
      {label}
    </button>
  )
}
