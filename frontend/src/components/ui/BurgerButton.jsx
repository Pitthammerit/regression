import React from 'react'

/**
 * BurgerButton - Animated hamburger menu button
 * Transforms from 3-line burger to X when open
 */
export default function BurgerButton({ isOpen, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 flex flex-col justify-center items-center gap-1.5 hover:bg-black/5 rounded-lg transition-colors ${className}`}
      aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
    >
      <span
        className="block w-5 h-0.5 bg-brand-deep transition-all duration-300 ease-in-out"
        style={{
          transform: isOpen ? 'rotate(45deg) translate(4px, 4px)' : 'rotate(0) translate(0)',
        }}
      />
      <span
        className="block w-5 h-0.5 bg-brand-deep transition-all duration-300 ease-in-out"
        style={{
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? 'translateX(-10px)' : 'translateX(0)',
        }}
      />
      <span
        className="block w-5 h-0.5 bg-brand-deep transition-all duration-300 ease-in-out"
        style={{
          transform: isOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'rotate(0) translate(0)',
        }}
      />
    </button>
  )
}
