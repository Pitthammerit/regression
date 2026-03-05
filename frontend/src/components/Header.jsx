import React, { useState, useEffect } from 'react'
import CtaButton from './ui/CtaButton'
import { r2, logos } from '../utils/media'
import { Menu } from 'lucide-react'
import DesktopNav from './DesktopNav'
import SidecarMenu from './SidecarMenu'
import { menu } from '../content/menu'

export default function Header({ nav, cta }) {
  const [scrolled, setScrolled] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const [sidecarOpen, setSidecarOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      setCtaVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
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
              {/* Mobile & Tablet (<1024px): Circular logo */}
              <img
                src={r2('logos/BKA logo 500 px black.png')}
                alt="Benjamin Kurtz Academy"
                className="lg:hidden h-10 w-10 object-contain"
              />
              {/* Desktop (>=1024px): Wordmark logo */}
              <img
                src={r2(logos.dark)}
                alt="Benjamin Kurtz Academy"
                className="hidden lg:block h-7 w-auto object-contain"
              />
            </a>

            {/* Desktop Nav + CTA + Burger (>=1024px) */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-10">
              {/* Radix UI Desktop Nav */}
              <DesktopNav onSidecarOpen={() => setSidecarOpen(true)} />

              {/* Desktop CTA — scroll-triggered */}
              <div className={`transition-opacity duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <CtaButton label={menu.header.cta.label} variant="primary" className="!py-2 !px-6 !text-xs" />
              </div>

              {/* Desktop Burger für Sidecar Menu */}
              <button
                onClick={() => setSidecarOpen(!sidecarOpen)}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                aria-label={sidecarOpen ? 'Close menu' : 'Open menu'}
              >
                <Menu size={20} className="text-brand-deep" />
              </button>
            </div>

            {/* Mobile & Tablet: CTA + Burger Menu */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Mobile CTA — scroll-triggered */}
              <div className={`transition-opacity duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <CtaButton label={menu.header.cta.label} variant="primary" className="!py-2 !px-4 !text-xs" />
              </div>

              {/* Burger Menu Toggle */}
              <button
                onClick={() => setSidecarOpen(!sidecarOpen)}
                className="p-2 -mr-2 hover:bg-black/5 rounded-lg transition-colors"
                aria-label={sidecarOpen ? 'Close menu' : 'Open menu'}
                data-testid="mobile-menu-toggle"
              >
                <Menu size={20} className="text-brand-deep" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidecar Menu - alle Breakpoints */}
      <SidecarMenu isOpen={sidecarOpen} onClose={() => setSidecarOpen(false)} />
    </>
  )
}
