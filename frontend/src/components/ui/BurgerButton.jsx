import React from 'react'

/**
 * BurgerButton - Animated hamburger menu button
 * Transforms from 3-line burger to X when open
 * Mini hover animation: lines rotate slightly (preview of X animation)
 */
export default function BurgerButton({ isOpen, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 flex flex-col justify-center items-center gap-1.5 group ${className}`}
      style={{ zIndex: 100, minWidth: '40px', minHeight: '40px' }}
      aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
    >
      <span
        className="block w-6 h-0.5 bg-brand-deep transition-all duration-300 ease-in-out absolute group-hover:-rotate-12"
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
        className="block w-6 h-0.5 bg-brand-deep transition-all duration-300 ease-in-out absolute group-hover:rotate-12"
        style={{
          transform: isOpen ? 'rotate(-45deg)' : 'translateY(6px)',
        }}
      />
    </button>
  )
}
