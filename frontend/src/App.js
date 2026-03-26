import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavigationProvider, useNavigation } from './contexts/NavigationContext'
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
import BookingSection from './components/sections/BookingSection'
import TranscriptPage from './pages/TranscriptPage'
import MenuDemoPage from './pages/demos/MenuDemoPage'
import TypographyDemoPage from './pages/demos/TypographyDemoPage'
import NotFound from './components/NotFound'
import { footer, testimonials } from './content/plr-de'
import { menu } from './content/menu'
import { SECTIONS_ORDER } from './config/sections.config'

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
  // Section mapping with props
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
      <FloatingBurger />
      <Header />
      <main>
        {SECTIONS_ORDER.map((sectionName) => (
          <React.Fragment key={sectionName}>{sectionMap[sectionName]}</React.Fragment>
        ))}
      </main>
      <Footer data={footer} />
    </div>
  )
}

export default function App() {
  return (
    <NavigationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/transkript" element={<TranscriptPage />} />
          <Route path="/menu-demo" element={<MenuDemoPage />} />
          <Route path="/typo-demo" element={<TypographyDemoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </NavigationProvider>
  )
}
