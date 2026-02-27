import React, { useState, useEffect } from 'react'
import CtaButton from './ui/CtaButton'
import LazyImage from './ui/LazyImage'
import { r2, logos } from '../utils/media'

export default function Header({ nav, cta }) {
  const [scrolled, setScrolled] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      setCtaVisible(window.scrollY > 300)
    }
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-brand-cream/96 backdrop-blur-sm border-b border-black/6 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-content mx-auto px-8 flex items-center justify-between">

        {/* Logo */}
        <a href="/" data-testid="site-logo" className="hover:opacity-75 transition-opacity">
          <LazyImage
            src={r2(logos.dark)}
            alt="Benjamin Kurtz Academy"
            className="h-9 object-contain"
            fallback={
              <span className="font-serif text-brand-deep text-base tracking-wide">
                Benjamin Kurtz Academy
              </span>
            }
          />
        </a>

        {/* Desktop Nav — larger font, clean */}
        <nav className="hidden md:flex items-center gap-10">
          {nav.map((item) => (
            <a
              key={item.anchor}
              href={item.anchor}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.anchor) }}
              className="font-sans text-base text-brand-body/70 hover:text-brand-deep transition-colors tracking-wide"
              data-testid={`nav-link-${item.anchor.replace('#', '')}`}
            >
              {item.label}
            </a>
          ))}
          <div className={`transition-all duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <CtaButton label={cta} variant="primary" />
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          data-testid="mobile-menu-toggle"
        >
          <span className={`block w-6 h-px bg-brand-deep transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-px bg-brand-deep transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-4 h-px bg-brand-deep transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px] w-6' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        data-testid="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 border-t border-black/6' : 'max-h-0'}`}
      >
        <div className="bg-brand-cream/98 backdrop-blur-sm px-8 py-6 flex flex-col gap-6">
          {nav.map((item) => (
            <a
              key={item.anchor}
              href={item.anchor}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.anchor) }}
              className="font-sans text-lg text-brand-body hover:text-brand-deep transition-colors"
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
