import React, { useState, useEffect } from 'react'
import CtaButton from './ui/CtaButton'
import { r2, logos } from '../utils/media'

export default function Header({ nav, cta }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (anchor) => {
    setMenuOpen(false)
    const el = document.querySelector(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-cream/95 backdrop-blur-sm shadow-sm py-3 border-b border-black/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-content mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="/" data-testid="site-logo" className="font-serif text-brand-deep text-lg tracking-wide hover:opacity-80 transition-opacity">
          <img
            src={r2(logos.dark)}
            alt="Benjamin Kurtz Academy"
            className="h-9 object-contain"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
          />
          <span className="font-serif text-brand-deep text-lg tracking-wide" style={{ display: 'none' }}>Benjamin Kurtz Academy</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.anchor}
              href={item.anchor}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.anchor) }}
              className="font-sans text-sm text-brand-muted hover:text-brand-deep tracking-wide transition-colors"
              data-testid={`nav-link-${item.anchor.replace('#', '')}`}
            >
              {item.label}
            </a>
          ))}
          <CtaButton label={cta} variant="primary" />
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu öffnen"
          data-testid="mobile-menu-toggle"
        >
          <span className={`block w-6 h-px bg-brand-deep transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-brand-deep transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-4 h-px bg-brand-deep transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2 w-6' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        data-testid="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 border-t border-black/5' : 'max-h-0'
        }`}
      >
        <div className="bg-brand-cream/98 backdrop-blur-sm px-6 py-6 flex flex-col gap-5">
          {nav.map((item) => (
            <a
              key={item.anchor}
              href={item.anchor}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.anchor) }}
              className="font-sans text-brand-body text-base hover:text-brand-deep transition-colors"
            >
              {item.label}
            </a>
          ))}
          <CtaButton label={cta} variant="primary" className="w-full text-center mt-2" />
        </div>
      </div>
    </header>
  )
}
