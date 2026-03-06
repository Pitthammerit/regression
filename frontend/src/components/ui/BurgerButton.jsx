import React from 'react'

/**
 * BurgerButton - Animated hamburger menu button
 * Transforms from 3-line burger to X when open
 * High z-index to stay above sidecar menu
 */
export default function BurgerButton({ isOpen, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 flex flex-col justify-center items-center gap-1.5 hover:bg-black/5 rounded-lg transition-colors relative z-[60] ${className}`}
      aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
      style={{ minWidth: '40px', minHeight: '40px' }}
    >
      <span
        className="block w-6 h-0.5 bg-brand-deep transition-all duration-300 ease-in-out absolute"
        style={{
          transform: isOpen ? 'rotate(45deg)' : 'translateY(-6px)',
        }}
      />
      <span
        className="block w-6 h-0.5 bg-brand-deep transition-all duration-300 ease-in-out absolute"
        style={{
          opacity: isOpen ? 0 : 1,
        }}
      />
      <span
        className="block w-6 h-0.5 bg-brand-deep transition-all duration-300 ease-in-out absolute"
        style={{
          transform: isOpen ? 'rotate(-45deg)' : 'translateY(6px)',
        }}
      />
    </button>
  )
}
