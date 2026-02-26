import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HeroSection from './components/sections/HeroSection'
import HeroV2Section from './components/sections/HeroV2Section'
import StatementSection from './components/sections/StatementSection'
import PodcastSection from './components/sections/PodcastSection'
import WhatIsSection from './components/sections/WhatIsSection'
import ForWhomSection from './components/sections/ForWhomSection'
import AboutSection from './components/sections/AboutSection'
import ProcessSection from './components/sections/ProcessSection'
import CaseStudiesSection from './components/sections/CaseStudiesSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import BookingSection from './components/sections/BookingSection'
import { header, footer } from './content/plr-de'

export default function App() {
  return (
    <div className="bg-[#F0EBE1] bg-paper min-h-screen font-sans text-brand-body">
      <Header nav={header.nav} cta={header.cta} />
      <main>
        {/* ── Hero V1 (Original — 2-column) ── */}
        <HeroSection />

        {/* ── COMPARISON DIVIDER ── */}
        <div className="border-t border-black/10 py-6 text-center">
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-brand-steel bg-[#F0EBE1] px-4">
            Variante V2 — Zentriertes Video
          </span>
        </div>

        {/* ── Hero V2 (New — centered video) ── */}
        <HeroV2Section />

        <StatementSection />
        <PodcastSection />
        <WhatIsSection />
        <ForWhomSection />
        <AboutSection />
        <ProcessSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <BookingSection />
      </main>
      <Footer data={footer} />
    </div>
  )
}
