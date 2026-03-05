import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
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
import MenuDemoPage from './pages/MenuDemoPage'
import NotFound from './components/NotFound'
import { header, footer, testimonials } from './content/plr-de'
import { SECTIONS_ORDER } from './config/sections.config'

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
      <Header nav={header.nav} cta={header.cta} />
      <main>
        {SECTIONS_ORDER.map((sectionName) => sectionMap[sectionName])}
      </main>
      <Footer data={footer} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/transkript" element={<TranscriptPage />} />
        <Route path="/menu-demo" element={<MenuDemoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
