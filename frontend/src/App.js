import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HeroSection from './components/sections/HeroSection'
import HeroV2Section from './components/sections/HeroV2Section'
import HeroV3Section from './components/sections/HeroV3Section'
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

function CompareDivider({ label }) {
  return (
    <div className="border-t border-b border-brand-sand py-4 text-center bg-brand-sand/40">
      <span className="font-sans text-xs tracking-[0.25em] uppercase text-brand-steel">
        {label}
      </span>
    </div>
  )
}

export default function App() {
  return (
    <div className="bg-[#F0EBE1] bg-paper min-h-screen font-sans text-brand-body">
      <Header nav={header.nav} cta={header.cta} />
      <main>
        {/* ── V1: 2-Spalten (Headline links, Video rechts) ── */}
        <CompareDivider label="Variante 1 — Zweispaltig" />
        <HeroSection />

        {/* ── V2: Zentriert (Headline oben, Video mittig) ── */}
        <CompareDivider label="Variante 2 — Zentriert" />
        <HeroV2Section />

        {/* ── V3: Editorial (Elementra-Stil, große Headline, versetzte Bilder) ── */}
        <CompareDivider label="Variante 3 — Editorial" />
        <HeroV3Section />

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
