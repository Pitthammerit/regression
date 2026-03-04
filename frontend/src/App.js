import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HeroV3Section from './components/sections/HeroV3Section'
import ServicesSection from './components/sections/ServicesSection'
import WelcomeSection from './components/sections/WelcomeSection'
import StatementSection from './components/sections/StatementSection'
import WhatIsSection from './components/sections/WhatIsSection'
import PodcastVideoSection from './components/sections/PodcastVideoSection'
import PodcastSection from './components/sections/PodcastSection'
import ForWhomSection from './components/sections/ForWhomSection'
import AboutSection from './components/sections/AboutSection'
import ProcessSection from './components/sections/ProcessSection'
import CaseStudiesSection from './components/sections/CaseStudiesSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import { TestimonialCarousel } from './components/sections/TestimonialCarousel'
import BookingSection from './components/sections/BookingSection'
import TranscriptPage from './pages/TranscriptPage'
import NotFound from './components/NotFound'
import { header, footer, testimonials } from './content/plr-de'

// Prepare carousel data from existing testimonials - mapped to JWR format
const carouselTestimonials = testimonials.clients.map((client) => {
  // Parse context to extract role and location
  const contextParts = client.context ? client.context.split(', ') : []
  const role = contextParts[0] || 'Klient'
  const location = contextParts[1] || ''

  return {
    name: client.name,
    role: role,
    location: location,
    avatar: client.image,
    quote: client.quote,
    quoteDe: client.quote,
    highlight: extractHighlight(client.quote)
  }
})

// Extract a meaningful short phrase from the quote for the highlight
function extractHighlight(quote) {
  // Try to find a complete first sentence
  const firstSentence = quote.split(/[.!?]/)[0]?.trim()
  if (firstSentence && firstSentence.length > 20 && firstSentence.length < 100) {
    return firstSentence + '.'
  }
  // Fallback: truncate if too long
  return quote.length > 80 ? quote.substring(0, 80).trim() + '...' : null
}

function MainPage() {
  return (
    <div className="bg-[#F0EBE1] bg-paper min-h-screen font-sans text-brand-body">
      <Header nav={header.nav} cta={header.cta} />
      <main>
        <HeroV3Section />
        <ServicesSection />
        <WelcomeSection />
        <WhatIsSection />
        <PodcastVideoSection />
        <StatementSection />
        <ForWhomSection />
        <AboutSection />
        <ProcessSection />
        <PodcastSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        {/* Carousel variant - demonstrates alternative testimonial presentation */}
        <TestimonialCarousel
          testimonials={carouselTestimonials}
          label="ERFAHRUNGEN"
          subtitle="Was Klienten sagen"
          language="de"
        />
        <BookingSection />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
