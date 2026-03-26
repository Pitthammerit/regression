// MenuDemoPage - Klon der Hauptseite mit verschiedenen Header-Varianten
import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import HeroV3Section from '../../components/sections/HeroV3Section'
import ServicesSection from '../../components/sections/ServicesSection'
import WelcomeSection from '../../components/sections/WelcomeSection'
import StatementSection from '../../components/sections/StatementSection'
import WhatIsSection from '../../components/sections/WhatIsSection'
import ResearchersSection from '../../components/sections/ResearchersSection'
import ReferencesSection from '../../components/sections/ReferencesSection'
import FAQSection from '../../components/sections/FAQSection'
import ResearcherQuotesSection from '../../components/sections/ResearcherQuotesSection'
import PodcastVideoSection from '../../components/sections/PodcastVideoSection'
import PodcastSection from '../../components/sections/PodcastSection'
import ForWhomSection from '../../components/sections/ForWhomSection'
import AboutSection from '../../components/sections/AboutSection'
import ProcessSection from '../../components/sections/ProcessSection'
import CaseStudiesSection from '../../components/sections/CaseStudiesSection'
import TestimonialsSection from '../../components/sections/TestimonialsSection'
import TestimonialCarousel from '../../components/sections/TestimonialCarousel'
import BookingSection from '../../components/sections/BookingSection'
import { header, footer, testimonials } from '../../content/plr-de'
import { SECTIONS_ORDER } from '../../config/sections.config'
import { menu } from '../../content/menu'
import { r2, logos } from '../../utils/media'
import CtaButton from '../../components/ui/CtaButton'
import { Menu, X, ChevronRight } from 'lucide-react'

// ═══════════════════════════════════════════════════════════
// VARIANTE 1: Original Header (aus Header.jsx)
// ═══════════════════════════════════════════════════════════
function HeaderV1({ nav, cta }) {
  const [scrolled, setScrolled] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  React.useEffect(() => {
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
      className={`fixed top-0 left-0 right-0 z-50 bg-brand-cream transition-all duration-300 ${
        scrolled ? 'border-b border-black/8 py-3' : 'py-4'
      }`}
    >
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        <div className="flex items-center justify-between">

          {/* Logo — responsive version */}
          <a href="#hero" className="hover:opacity-70 transition-opacity">
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

          {/* Desktop Nav + CTA (>=1024px) */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            <nav className="flex items-center gap-6 lg:gap-8">
              {nav.map((item) => (
                <a
                  key={item.anchor}
                  href={item.anchor}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.anchor) }}
                  className="font-sans text-sm text-brand-body/60 hover:text-brand-deep transition-colors tracking-wide whitespace-nowrap"
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

          {/* Mobile & Tablet (<1024px): CTA + Burger Menu */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile CTA — scroll-triggered, OUTSIDE menu */}
            <div className={`transition-opacity duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <CtaButton label={cta} variant="primary" className="!py-2 !px-4 !text-xs" />
            </div>

            {/* Burger Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 -mr-2 hover:bg-black/5 rounded-lg transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} className="text-brand-deep" /> : <Menu size={20} className="text-brand-deep" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay (<1024px) — Nav links ONLY, no CTA */}
      {menuOpen && (
        <div className="lg:hidden border-t border-black/8 bg-brand-cream">
          <nav className="px-6 py-4 flex flex-col gap-4">
            {nav.map((item) => (
              <a
                key={item.anchor}
                href={item.anchor}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.anchor) }}
                className="font-sans text-base text-brand-body/70 hover:text-brand-deep transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 2: Burger mit 3-Spalten Layout + zentrierte Inline-Nav
// ═══════════════════════════════════════════════════════════
function HeaderV2({ cta }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const mainNav = menu.header.mainNav || []

  React.useEffect(() => {
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

  // Menu-Items in 3 Spalten aufteilen
  const renderMenuItem = (item) => (
    <div key={item.id} className="mb-8">
      <button onClick={() => handleNavClick(item.anchor)} className="font-serif text-2xl md:text-3xl text-white hover:text-color-accent transition-colors text-left">
        {item.label}
      </button>
      {item.children && (
        <div className="mt-3 space-y-2">
          {item.children.map((child) => (
            <button key={child.id} onClick={() => handleNavClick(child.anchor)} className="block w-full text-left font-sans text-base text-white/60 hover:text-white transition-colors">
              {child.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  // Spalten aufteilen
  const column1Items = menu.items.slice(0, 2)  // Regression, Science
  const column2Items = menu.items.slice(2, 4)  // Podcast, Erfahrungen
  const column3Items = menu.items.slice(4)     // Über, FAQ

  return (
    <>
      <header className={`fixed top-12 left-0 right-0 z-50 bg-brand-cream transition-all duration-300 ${scrolled ? 'border-b border-black/8 py-3' : 'py-4'}`}>
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center justify-between">
            <a href="#hero" className="hover:opacity-70 transition-opacity">
              <img src={r2(logos.dark)} alt="Benjamin Kurtz Academy" className="h-7 w-auto object-contain" />
            </a>

            {/* Desktop: Zentrierte Nav + CTA + Burger */}
            <div className="hidden lg:flex items-center flex-1 ml-12">
              <nav className="flex items-center justify-center gap-6 flex-1">
                {mainNav.map((item) => (
                  <a key={item.anchor} href={item.anchor} onClick={(e) => { e.preventDefault(); handleNavClick(item.anchor) }} className="font-sans text-sm text-brand-body/60 hover:text-brand-deep transition-colors tracking-wide">
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="flex items-center gap-4">
                <div className={`transition-opacity duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <CtaButton label={cta.label} variant="primary" className="!py-2 !px-6 !text-xs" />
                </div>
                <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-black/5 rounded-lg" aria-label="Menü">
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile: Burger + CTA */}
            <div className="lg:hidden flex items-center gap-3">
              <div className="flex items-center gap-4">
                <div className={`transition-opacity duration-500 ${ctaVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <CtaButton label={cta.label} variant="primary" className="!py-2 !px-4 !text-xs" />
                </div>
                <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-black/5 rounded-lg">
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-deep pt-32 overflow-y-auto">
          <button onClick={() => setMenuOpen(false)} className="absolute top-16 right-6 p-2 hover:bg-white/10 rounded-lg z-10">
            <X size={32} className="text-white" />
          </button>

          <div className="max-w-content mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Spalte 1 */}
              <div>
                {column1Items.map(renderMenuItem)}
              </div>
              {/* Spalte 2 */}
              <div>
                {column2Items.map(renderMenuItem)}
              </div>
              {/* Spalte 3 */}
              <div>
                {column3Items.map(renderMenuItem)}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-brand-deep">
            <button onClick={() => handleNavClick(cta.anchor)} className="w-full bg-brand-green text-brand-deep font-sans text-sm uppercase tracking-widest py-4 rounded-full">
              {cta.label}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

// ═══════════════════════════════════════════════════════════
// VARIANTE 3: Burger mit Nested Navigation
// ═══════════════════════════════════════════════════════════
function HeaderV3({ cta }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState(null)

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id)
  }

  const handleNavClick = (anchor) => {
    setMenuOpen(false)
    const el = document.querySelector(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="fixed top-12 left-0 right-0 z-50 bg-brand-cream py-4">
        <div className="w-full px-6 flex items-center justify-between">
          <a href="#hero" className="hover:opacity-70 transition-opacity">
            <img src={r2(logos.dark)} alt="Benjamin Kurtz Academy" className="h-7 w-auto object-contain" />
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-black/5 rounded-lg">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-deep pt-32">
          <button onClick={() => setMenuOpen(false)} className="absolute top-16 right-6 p-2 hover:bg-white/10 rounded-lg">
            <X size={32} className="text-white" />
          </button>

          <div className="max-w-content mx-auto px-6 py-12">
            <div className="space-y-2">
              {menu.items.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (item.children) {
                        toggleCategory(item.id)
                      } else {
                        handleNavClick(item.anchor)
                      }
                    }}
                    className="w-full flex items-center justify-between text-left font-serif text-4xl text-white hover:text-color-accent py-4"
                  >
                    <span>{item.label}</span>
                    {item.children && <ChevronRight size={28} className={expandedCategory === item.id ? 'rotate-90' : ''} />}
                  </button>

                  {item.children && expandedCategory === item.id && (
                    <div className="pl-8 pt-2 pb-4 space-y-2">
                      {item.children.map((child) => (
                        <button key={child.id} onClick={() => handleNavClick(child.anchor)} className="block w-full text-left font-sans text-lg text-white/60 hover:text-white py-2">
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="h-px bg-white/10" />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
            <button onClick={() => handleNavClick(cta.anchor)} className="w-full bg-brand-green text-brand-deep font-sans text-sm uppercase tracking-widest py-4 rounded-full">
              {cta.label}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

// ═══════════════════════════════════════════════════════════
// DEMO PAGE - Klon der Hauptseite
// ═══════════════════════════════════════════════════════════
export default function MenuDemoPage() {
  const [variant, setVariant] = useState(1)

  const sectionMap = {
    'HeroV3Section': <HeroV3Section />,
    'ServicesSection': <ServicesSection />,
    'WelcomeSection': <WelcomeSection />,
    'WhatIsSection': <WhatIsSection />,
    'ResearchersSection': <ResearchersSection />,
    'ResearcherQuotesSection': <ResearcherQuotesSection />,
    'PodcastVideoSection': <PodcastVideoSection />,
    'StatementSection': <StatementSection />,
    'ForWhomSection': <ForWhomSection />,
    'AboutSection': <AboutSection />,
    'ProcessSection': <ProcessSection />,
    'PodcastSection': <PodcastSection />,
    'CaseStudiesSection': <CaseStudiesSection />,
    'TestimonialsSection': <TestimonialsSection />,
    'TestimonialCarousel': (
      <TestimonialCarousel
        clients={testimonials.clients}
        label={testimonials.clientLabel}
        subtitle="Kundenstimmen"
      />
    ),
    'BookingSection': <BookingSection />,
    'FAQSection': <FAQSection />,
    'ReferencesSection': <ReferencesSection />,
  }

  return (
    <div className="bg-brand-cream bg-paper min-h-screen font-sans text-brand-body">
      {/* Variant Switcher */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-brand-deep text-white py-2 px-6 shadow-lg">
        <div className="max-w-content mx-auto flex items-center justify-between">
          <span className="font-sans text-sm">🔧 Header-Variante:</span>
          <div className="flex gap-2">
            {[1, 2, 3].map((v) => (
              <button key={v} onClick={() => setVariant(v)} className={`px-4 py-1 rounded-full font-sans text-sm transition-colors ${variant === v ? 'bg-brand-green text-brand-deep font-semibold' : 'bg-white/10 hover:bg-white/20'}`}>
                V{v} {v === 1 ? '(Original)' : v === 2 ? '(Burger)' : '(Nested)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      {variant === 1 && <HeaderV1 nav={header.nav} cta={header.cta} />}
      {variant === 2 && <HeaderV2 cta={{ label: header.cta, anchor: '#booking' }} />}
      {variant === 3 && <HeaderV3 cta={{ label: header.cta, anchor: '#booking' }} />}

      {/* Main Content - alle echten Sections */}
      <main>
        {SECTIONS_ORDER.map((sectionName) => sectionMap[sectionName])}
      </main>

      {/* Footer */}
      <Footer data={footer} />
    </div>
  )
}
