import React, { useState, useEffect } from 'react'
import CtaButton from './ui/CtaButton'
import LazyImage from './ui/LazyImage'
import { branding } from '../content/branding'
import { Menu, X } from 'lucide-react'

export default function Header({ nav, cta }) {
  const [scrolled, setScrolled] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      setCtaVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
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
      className={`fixed top-0 left-0 right-0 z-50 bg-brand-cream transition-all duration-300 ${
        scrolled ? 'border-b border-black/8 py-3' : 'py-4'
      }`}
    >
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        <div className="flex items-center justify-between">

          {/* Logo — responsive version */}
          <a href="/" data-testid="site-logo" className="hover:opacity-70 transition-opacity">
            {/* Desktop: Wordmark */}
            <img
              src={branding.logo.wordmarkDark}
              alt={branding.logo.alt}
              className="hidden sm:block h-6 md:h-7 w-auto object-contain"
            />
            {/* Mobile: Circular logo */}
            <img
              src={branding.logo.circularDark}
              alt={branding.logo.alt}
              className="sm:hidden h-9 w-9 object-contain"
            />
          </a>

          {/* Desktop Nav + CTA */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <nav className="flex items-center gap-6 lg:gap-8">
              {nav.map((item) => (
                <a
                  key={item.anchor}
                  href={item.anchor}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.anchor) }}
                  className="font-sans text-sm text-brand-body/60 hover:text-brand-deep transition-colors tracking-wide whitespace-nowrap"
                  data-testid={`nav-link-${item.anchor.replace('#', '')}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            {/* Desktop CTA — scroll-triggered */}
            <div className={`transition-opacity duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <CtaButton label={cta} variant="primary" className="!py-2 !px-6 !text-xs" />
            </div>
          </div>

          {/* Mobile: Burger Menu */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile wordmark (visible next to burger on small screens) */}
            <img
              src={branding.logo.wordmarkDark}
              alt={branding.logo.alt}
              className="max-w-[100px] h-5 object-contain"
            />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 -mr-2 hover:bg-black/5 rounded-lg transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              data-testid="mobile-menu-toggle"
            >
              {menuOpen ? <X size={20} className="text-brand-deep" /> : <Menu size={20} className="text-brand-deep" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden border-t border-black/8 bg-brand-cream">
          <nav className="px-6 py-4 flex flex-col gap-4">
            {nav.map((item) => (
              <a
                key={item.anchor}
                href={item.anchor}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.anchor) }}
                className="font-sans text-base text-brand-body/70 hover:text-brand-deep transition-colors py-2"
                data-testid={`mobile-nav-link-${item.anchor.replace('#', '')}`}
              >
                {item.label}
              </a>
            ))}
            {/* Mobile CTA in menu */}
            <div className="pt-2 border-t border-black/6">
              <CtaButton label={cta} variant="primary" className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
