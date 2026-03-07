import React, { useState, useEffect } from 'react'
import { r2, logos } from '../utils/media'
import DesktopNav from './DesktopNav'
import SidecarMenu from './SidecarMenu'
import { useNavigation } from '../contexts/NavigationContext'

export default function Header() {
  const { sidecarOpen, setSidecarOpen } = useNavigation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        data-testid="site-header"
        className={`fixed top-0 left-0 right-0 z-50 bg-brand-cream transition-[padding,border] duration-300 ${
          scrolled ? 'border-b border-black/8 py-3' : 'py-4'
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-8 xl:px-8">
          <div className="flex items-center justify-between">

            {/* Logo — responsive version */}
            <a href="/" data-testid="site-logo" className="hover:opacity-70 transition-opacity h-7 min-w-[160px]">
              {/* Mobile & Tablet (<1024px): Circular logo */}
              <img
                src={r2('logos/BKA logo 500 px black.png')}
                alt="Benjamin Kurtz Academy"
                className="lg:hidden h-full w-auto object-contain"
              />
              {/* Desktop (>=1024px): Wordmark logo */}
              <img
                src={r2(logos.dark)}
                alt="Benjamin Kurtz Academy"
                className="hidden lg:block h-full w-auto object-contain"
              />
            </a>

            {/* Desktop Nav - horizontal zentriert */}
            <div className="hidden 900:flex items-center flex-1 justify-center -ml-[10%]">
              <DesktopNav />
            </div>
          </div>
        </div>
      </header>

      {/* Sidecar Menu - alle Breakpoints */}
      <SidecarMenu isOpen={sidecarOpen} onClose={() => setSidecarOpen(false)} />
    </>
  )
}
