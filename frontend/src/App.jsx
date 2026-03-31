import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { NavigationProvider, useNavigation } from './contexts/NavigationContext'
import { SiteProvider } from './contexts/SiteContext'
import { ContentProvider } from './contexts/ContentContext'
import Header from './components/Header'
import Footer from './components/Footer'
import BurgerButton from './components/ui/BurgerButton'
import CtaButton from './components/ui/CtaButton'
import HeroV3Section from './components/sections/HeroV3Section'
import ServicesSection from './components/sections/ServicesSection'
import WelcomeSection from './components/sections/WelcomeSection'
import StatementSection from './components/sections/StatementSection'
import WhatIsSection from './components/sections/WhatIsSection'
import ResearchersSection from './components/sections/ResearchersSection'
import ReferencesSection from './components/sections/ReferencesSection'
import FAQSection from './components/sections/FAQSection'
import ResearcherQuotesSection from './components/sections/ResearcherQuotesSection'
import PodcastVideoSection from './components/sections/PodcastVideoSection'
import PodcastSection from './components/sections/PodcastSection'
import ForWhomSection from './components/sections/ForWhomSection'
import AboutSection from './components/sections/AboutSection'
import ProcessSection from './components/sections/ProcessSection'
import CaseStudiesSection from './components/sections/CaseStudiesSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import TestimonialCarousel from './components/sections/TestimonialCarousel'
import { BookingSectionDark } from './components/sections/BookingSection'
import CtaImageSection from './components/sections/CtaImageSection'
import TranscriptPage from './pages/TranscriptPage'
import MenuDemoPage from './pages/demos/MenuDemoPage'
import TypographyDemoPage from './pages/demos/TypographyDemoPage'
import NotFound from './components/NotFound'
import { getContent } from './content'
import { menu } from './content/menu'
import { SECTIONS_ORDER } from './config/sections.config'

// Load content for current site (default: regression/de)
// In Phase 3, this will be dynamic based on URL routing
const content = getContent('regression', 'de')
const { footer, testimonials } = content

function FloatingBurger() {
  const { sidecarOpen, setSidecarOpen, setIsBurgerClosing, isBurgerClosing, navigateTo } = useNavigation()
  const [ctaVisible, setCtaVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setCtaVisible(window.scrollY > 1200)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleBurgerClick = () => {
    if (sidecarOpen) {
      setIsBurgerClosing(true)
      setTimeout(() => {
        setSidecarOpen(false)
        setIsBurgerClosing(false)
      }, 500)
    } else {
      setSidecarOpen(true)
    }
  }

  // CTA visible when scrolled + (sidecar closed OR closing in progress)
  const showCta = ctaVisible && (!sidecarOpen || isBurgerClosing)

  return (
    <div className="fixed top-2 right-8 z-[100] flex items-center gap-4">
      <div
        className={`transition-opacity ${
          sidecarOpen && !isBurgerClosing ? 'duration-[100ms]' : 'delay-[200ms] duration-[800ms]'
        } ${showCta ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <CtaButton label={menu.header.cta.label} variant="primary" className="!py-2 !px-6 !text-xs" onClick={() => navigateTo('#booking')} />
      </div>
      <BurgerButton isOpen={sidecarOpen} onClick={handleBurgerClick} />
    </div>
  )
}

function MainPage() {
  const [debugMode, setDebugMode] = useState(false)

  // Section mapping with props
  const sectionMap = {
    'HeroV3Section': <HeroV3Section debugMode={debugMode} />,
    'ServicesSection': <ServicesSection debugMode={debugMode} />,
    'WelcomeSection': <WelcomeSection debugMode={debugMode} />,
    'WhatIsSection': <WhatIsSection debugMode={debugMode} />,
    'ResearchersSection': <ResearchersSection debugMode={debugMode} />,
    'ResearcherQuotesSection': <ResearcherQuotesSection debugMode={debugMode} />,
    'PodcastVideoSection': <PodcastVideoSection debugMode={debugMode} />,
    'StatementSection': <StatementSection debugMode={debugMode} />,
    'ForWhomSection': <ForWhomSection debugMode={debugMode} />,
    'AboutSection': <AboutSection debugMode={debugMode} />,
    'ProcessSection': <ProcessSection debugMode={debugMode} />,
    'PodcastSection': <PodcastSection debugMode={debugMode} />,
    'CaseStudiesSection': <CaseStudiesSection debugMode={debugMode} />,
    'TestimonialsSection': <TestimonialsSection debugMode={debugMode} />,
    'TestimonialCarousel': (
      <TestimonialCarousel
        clients={testimonials.clients}
        label={testimonials.clientLabel}
        subtitle={testimonials.clientSubtitle}
        debugMode={debugMode}
      />
    ),
    'BookingSection': <BookingSectionDark debugMode={debugMode} />,
    'FAQSection': <FAQSection debugMode={debugMode} />,
    'ReferencesSection': <ReferencesSection debugMode={debugMode} />,
    'CtaImageSection': <CtaImageSection debugMode={debugMode} />,
  }

  return (
    <div className="bg-color-bg-light bg-paper min-h-screen font-primary text-color-text">
      {/* Debug Toggle */}
      <div className="fixed top-4 left-4 z-[100] bg-white p-3 rounded-lg shadow-lg border border-black/10">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={debugMode}
            onChange={(e) => setDebugMode(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="font-primary text-sm">🔍 Debug Mode</span>
        </label>
      </div>

      <FloatingBurger />
      <Header debugMode={debugMode} />
      <main>
        {SECTIONS_ORDER.map((sectionName) => (
          <React.Fragment key={sectionName}>{sectionMap[sectionName]}</React.Fragment>
        ))}
      </main>
      <Footer data={footer} debugMode={debugMode} />
    </div>
  )
}

export default function App() {
  return (
    <NavigationProvider>
      <BrowserRouter>
        <Routes>
          {/* Legacy routes (backwards compatibility) */}
          <Route path="/" element={<MainPage />} />
          <Route path="/transkript" element={<TranscriptPage />} />
          <Route path="/menu-demo" element={<MenuDemoPage />} />
          <Route path="/typo-demo" element={<TypographyDemoPage />} />

          {/* New multi-site routes (Phase 2 preparation) */}
          {/* ContentProvider will be activated in Phase 3 */}
          <Route path="/:site/:lang" element={
            <SiteProvider>
              <MainPage />
            </SiteProvider>
          } />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </NavigationProvider>
  )
}
