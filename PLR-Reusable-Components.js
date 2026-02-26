// PLR-Reusable-Components.js
// Ready-to-use code extracted from the BKA build brief.
// Copy each block into the corresponding file in src/components/

// ─────────────────────────────────────────────
// src/components/ui/CtaButton.jsx
// ─────────────────────────────────────────────
/*
import React from 'react'

export default function CtaButton({ label, variant = 'primary', className = '' }) {
  const handleClick = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  const base = 'uppercase tracking-widest text-sm font-sans py-3 px-8 rounded-sm transition-colors duration-200 cursor-pointer'
  const styles = {
    primary:   `${base} bg-brand-deep text-white hover:bg-brand-steel`,
    secondary: `${base} border border-brand-deep text-brand-deep hover:bg-brand-deep hover:text-white`,
    ghost:     `${base} text-brand-steel underline underline-offset-4 hover:text-brand-deep`,
  }

  return (
    <button onClick={handleClick} className={`${styles[variant]} ${className}`}>
      {label}
    </button>
  )
}
*/

// ─────────────────────────────────────────────
// src/components/Header.jsx
// ─────────────────────────────────────────────
/*
import React, { useState, useEffect } from 'react'
import CtaButton from './ui/CtaButton'

export default function Header({ nav, cta }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-brand-cream/95 backdrop-blur shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="font-serif text-brand-deep text-lg tracking-wide">
          Benjamin Kurtz Academy
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.anchor}
              href={item.anchor}
              className="font-sans text-sm text-brand-muted hover:text-brand-deep tracking-wide transition-colors"
            >
              {item.label}
            </a>
          ))}
          <CtaButton label={cta} variant="primary" />
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-brand-deep"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-4 h-px bg-current" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-cream px-6 py-6 flex flex-col gap-5 border-t border-brand-sand">
          {nav.map((item) => (
            <a
              key={item.anchor}
              href={item.anchor}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-brand-body text-base"
            >
              {item.label}
            </a>
          ))}
          <CtaButton label={cta} variant="primary" className="w-full text-center" />
        </div>
      )}
    </header>
  )
}
*/

// ─────────────────────────────────────────────
// src/components/TestimonialCarousel.jsx
// ─────────────────────────────────────────────
/*
import React, { useState, useEffect, useRef } from 'react'

export default function TestimonialCarousel({ items }) {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const DURATION = 5000

  const startTimer = () => {
    setProgress(0)
    clearInterval(intervalRef.current)
    const start = Date.now()
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / DURATION) * 100, 100)
      setProgress(pct)
      if (elapsed >= DURATION) {
        setActive((prev) => (prev + 1) % items.length)
        startTimer()
      }
    }, 50)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(intervalRef.current)
  }, [active])

  const goTo = (index) => {
    setActive(index)
  }

  const current = items[active]

  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      {/* Quote */}
      <blockquote className="font-serif italic text-2xl md:text-3xl text-brand-body leading-relaxed mb-8">
        "{current.quote}"
      </blockquote>

      {/* Avatar + Name */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {current.avatar && (
          <img
            src={current.avatar}
            alt={current.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div className="text-left">
          <div className="font-sans font-medium text-brand-body text-sm">{current.name}</div>
          <div className="font-sans text-brand-muted text-xs">{current.context}</div>
        </div>
      </div>

      {/* Dots with progress */}
      <div className="flex justify-center gap-3">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: i === active ? 40 : 12, background: '#EDE7DC' }}
            aria-label={`Testimonial ${i + 1}`}
          >
            {i === active && (
              <span
                className="absolute inset-y-0 left-0 bg-brand-deep rounded-full"
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Prev / Next arrows (xl screens) */}
      <div className="hidden xl:flex justify-between items-center mt-6">
        <button
          onClick={() => goTo((active - 1 + items.length) % items.length)}
          className="text-brand-steel hover:text-brand-deep transition-colors font-sans text-sm tracking-widest uppercase"
        >
          ← Zurück
        </button>
        <button
          onClick={() => goTo((active + 1) % items.length)}
          className="text-brand-steel hover:text-brand-deep transition-colors font-sans text-sm tracking-widest uppercase"
        >
          Weiter →
        </button>
      </div>
    </div>
  )
}
*/

// ─────────────────────────────────────────────
// src/components/ui/Accordion.jsx
// Reusable — used in WhatIsSection (skeptic toggle) and CaseStudiesSection
// ─────────────────────────────────────────────
/*
import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Accordion({ items }) {
  // items: [{ title, content (string or JSX) }]
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="divide-y divide-brand-sand">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => toggle(i)}
            className="w-full flex justify-between items-center py-4 text-left font-sans text-brand-body text-sm tracking-wide hover:text-brand-deep transition-colors"
          >
            <span>{item.title}</span>
            <ChevronDown
              size={16}
              className={`text-brand-steel transition-transform duration-300 ${
                openIndex === i ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? 'max-h-96 pb-4' : 'max-h-0'
            }`}
          >
            <div className="font-sans text-brand-muted text-sm leading-relaxed pl-0 border-l-2 border-brand-deep pl-4">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
*/

// ─────────────────────────────────────────────
// src/utils/media.js
// Cloudflare R2 image URL helper
// ─────────────────────────────────────────────
/*
const R2_BASE = process.env.REACT_APP_R2_BASE_URL || 'https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev'

export const r2 = (path) => `${R2_BASE}/${path}`

// Logo variants — usage: r2(logos.dark)
export const logos = {
  dark:    'RTR2/logos/BK Academy 300 px black.png',
  light:   'RTR2/logos/BK Academy 500 px white .png',
  hero:    'RTR2/logos/BK Academy 1000 px white .png',
  favicon: 'RTR2/logos/BK aca favicon solo 512 px black.png',
}

// Image placeholder — use while real photos are missing
export function ImgPlaceholder({ label = '[ Foto ]', className = '' }) {
  return (
    <div className={`bg-brand-sand flex items-center justify-center text-brand-muted font-sans text-sm ${className}`}>
      {label}
    </div>
  )
}
*/

// ─────────────────────────────────────────────
// src/i18n/index.js
// i18next setup — ready to drop in
// ─────────────────────────────────────────────
/*
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import de from './locales/de.json'
import en from './locales/en.json'

const savedLang = localStorage.getItem('bka_language')
const browserLang = navigator.language?.startsWith('de') ? 'de' : 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: { de: { translation: de }, en: { translation: en } },
    lng: savedLang || browserLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('bka_language', lng)
})

export default i18n
*/

// ─────────────────────────────────────────────
// Language Toggle — drop into Header
// ─────────────────────────────────────────────
/*
import i18next from 'i18next'

function LanguageToggle() {
  const current = i18next.language
  const other = current === 'de' ? 'en' : 'de'

  return (
    <button
      onClick={() => i18next.changeLanguage(other)}
      className="font-sans text-xs uppercase tracking-widest text-brand-steel hover:text-brand-deep transition-colors"
    >
      {other.toUpperCase()}
    </button>
  )
}
*/

// ─────────────────────────────────────────────
// tailwind.config.js — complete config
// ─────────────────────────────────────────────
/*
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          deep:    '#224160',  // headlines, buttons, nav
          steel:   '#7696AD',  // labels, captions, borders
          green:   '#2DAD71',  // accent, use sparingly
          body:    '#1A1814',  // body text
          muted:   '#5A5550',  // muted text
          dark:    '#1A2433',  // footer only
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
      },
      backgroundImage: {
        // SVG noise texture — simulates textured paper
        // Opacity intentionally very low (0.035) — just enough to feel physical
        'paper': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
}
*/

// ─────────────────────────────────────────────
// src/App.jsx — shell with all sections assembled
// ─────────────────────────────────────────────
/*
import React from 'react'
import Header             from './components/Header'
import Footer             from './components/Footer'
import HeroSection        from './components/sections/HeroSection'
import StatementSection   from './components/sections/StatementSection'
import PodcastSection     from './components/sections/PodcastSection'
import WhatIsSection      from './components/sections/WhatIsSection'
import ForWhomSection     from './components/sections/ForWhomSection'
import AboutSection       from './components/sections/AboutSection'
import ProcessSection     from './components/sections/ProcessSection'
import CaseStudiesSection from './components/sections/CaseStudiesSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import BookingSection     from './components/sections/BookingSection'
import { header, footer } from './content/plr-de'

export default function App() {
  return (
    <div className="bg-[#F0EBE1] bg-paper min-h-screen font-sans text-brand-body">
      <Header nav={header.nav} cta={header.cta} />
      <main>
        <HeroSection />
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
*/

// ─────────────────────────────────────────────
// src/components/ui/SectionWrapper.jsx
// Outer wrapper for every section — handles bg + anchor ID
// Usage: <SectionWrapper id="was-ist" bg="sand">...</SectionWrapper>
// ─────────────────────────────────────────────
/*
import React from 'react'

// No background variants — entire page is one unified texture.
// Only exception: Footer passes dark=true for the dark footer surface.
export default function SectionWrapper({ id, dark = false, children, className = '' }) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${dark ? 'bg-brand-dark text-white' : 'bg-transparent'} ${className}`}
    >
      <div className="max-w-content mx-auto px-6">
        {children}
      </div>
    </section>
  )
}
*/

// Background: single unified parchment texture throughout.
// Sections separated by spacing and typography only — never by background color.
// Footer is the only dark surface: <SectionWrapper dark={true}>

// ─────────────────────────────────────────────
// src/components/ui/SectionLabel.jsx
// Small uppercase tracked label above every headline
// Usage: <SectionLabel text="ÜBER BENJAMIN KURTZ" />
// ─────────────────────────────────────────────
/*
import React from 'react'

export default function SectionLabel({ text, light = false }) {
  return (
    <p className={`font-sans text-xs tracking-[0.2em] uppercase mb-4 ${
      light ? 'text-white/50' : 'text-brand-steel'
    }`}>
      {text}
    </p>
  )
}
*/

// ─────────────────────────────────────────────
// src/components/ui/Card.jsx
// Generic card — used in ForWhomSection (topic cards)
// and TestimonialsSection (client quote cards)
// ─────────────────────────────────────────────
/*
import React from 'react'

export default function Card({ title, body, icon: Icon, className = '' }) {
  return (
    <div className={`bg-white rounded p-6 flex flex-col gap-3 ${className}`}>
      {Icon && <Icon size={20} className="text-brand-steel" />}
      <h3 className="font-serif text-lg text-brand-deep leading-snug">{title}</h3>
      {body && (
        <p className="font-sans text-sm text-brand-muted leading-relaxed">{body}</p>
      )}
    </div>
  )
}
*/

// ─────────────────────────────────────────────
// src/components/ui/CaseAccordion.jsx
// Specific accordion for Case Studies — 3-part layout
// Extends Accordion pattern — do not rebuild from scratch
// ─────────────────────────────────────────────
/*
import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function CaseAccordion({ items, labels }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="divide-y divide-brand-sand">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-start py-6 text-left group"
          >
            <div>
              <span className="font-sans text-xs tracking-[0.15em] uppercase text-brand-steel block mb-1">
                {item.tag}
              </span>
              <span className="font-serif text-xl text-brand-deep group-hover:text-brand-steel transition-colors">
                {item.name} — {item.title}
              </span>
              <span className="font-sans text-sm text-brand-muted italic block mt-1">
                {item.teaser}
              </span>
            </div>
            <ChevronDown
              size={18}
              className={`text-brand-steel mt-2 shrink-0 transition-transform duration-300 ${
                openIndex === i ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div className={`overflow-hidden transition-all duration-500 ${
            openIndex === i ? 'max-h-[1200px] pb-8' : 'max-h-0'
          }`}>
            <div className="grid md:grid-cols-3 gap-6 pt-2">
              {[
                { label: labels.situation, text: item.situation },
                { label: labels.session,   text: item.session },
                { label: labels.result,    text: item.result },
              ].map((block) => (
                <div key={block.label} className="border-l-2 border-brand-deep pl-4">
                  <span className="font-sans text-xs tracking-[0.15em] uppercase text-brand-steel block mb-2">
                    {block.label}
                  </span>
                  <p className="font-sans text-sm text-brand-muted leading-relaxed">
                    {block.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
*/

// ─────────────────────────────────────────────
// src/components/Footer.jsx
// ─────────────────────────────────────────────
/*
import React from 'react'

export default function Footer({ data }) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark text-white py-16">
      <div className="max-w-content mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          <div>
            <div className="font-serif text-lg tracking-wide mb-3">Benjamin Kurtz Academy</div>
            <p className="font-sans text-xs text-white/50 leading-relaxed">{data.tagline}</p>
          </div>

          <div className="flex flex-col gap-3">
            {data.links.map((link) => (
              <a key={link.label} href={link.anchor || link.url}
                className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {data.social.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="font-sans text-xs text-white/30">© {year} {data.copyright}</p>
          <p className="font-sans text-xs text-white/30 max-w-lg">{data.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
*/

// ─────────────────────────────────────────────
// src/components/VerticalScrollingTestimonials.jsx
// Continuous vertical scroll, two columns, opposite directions
// Secondary testimonial display — used below carousel
// ─────────────────────────────────────────────
/*
import React, { useRef, useEffect } from 'react'

export default function VerticalScrollingTestimonials({ items }) {
  const col1Ref = useRef(null)
  const col2Ref = useRef(null)
  const half = Math.ceil(items.length / 2)
  const col1 = [...items.slice(0, half), ...items.slice(0, half)]
  const col2 = [...items.slice(half),    ...items.slice(half)]

  useEffect(() => {
    let frame, pos1 = 0, pos2 = 0
    const speed = 0.4
    const animate = () => {
      if (col1Ref.current) {
        pos1 += speed
        if (pos1 >= col1Ref.current.scrollHeight / 2) pos1 = 0
        col1Ref.current.style.transform = `translateY(-${pos1}px)`
      }
      if (col2Ref.current) {
        pos2 -= speed
        if (Math.abs(pos2) >= col2Ref.current.scrollHeight / 2) pos2 = 0
        col2Ref.current.style.transform = `translateY(${pos2}px)`
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  const Card = ({ item }) => (
    <div className="bg-white rounded p-5 mb-4">
      <p className="font-serif italic text-brand-body text-sm leading-relaxed mb-3">"{item.quote}"</p>
      <div className="font-sans text-xs font-medium text-brand-deep">{item.name}</div>
      <div className="font-sans text-xs text-brand-muted">{item.context}</div>
    </div>
  )

  return (
    <div className="grid grid-cols-2 gap-4 h-[560px] overflow-hidden">
      <div ref={col1Ref} className="will-change-transform">
        {col1.map((item, i) => <Card key={i} item={item} />)}
      </div>
      <div ref={col2Ref} className="will-change-transform mt-10">
        {col2.map((item, i) => <Card key={i} item={item} />)}
      </div>
    </div>
  )
}
*/

// ─────────────────────────────────────────────
// src/mock/bkaTestimonials.js
// All testimonial data lives here — never in components
// ─────────────────────────────────────────────
/*
export const plrTestimonials = [
  {
    quote: '[Testimonial-Text — wird ergänzt]',
    name: 'Sabine Hinkel',
    context: 'Regression Session, online',
    avatar: null,
    stars: 5,
  },
  {
    quote: '[Weiteres Testimonial — wird ergänzt]',
    name: '[Name]',
    context: '[Kontext]',
    avatar: null,
    stars: 5,
  },
]

export const authorityQuotes = [
  {
    quote: 'The evidence suggesting reincarnation is real is so strong that it is difficult to understand why it is not more widely accepted.',
    name: 'Ian Stevenson MD',
    role: 'University of Virginia, DOPS',
  },
  {
    quote: 'I had not spent years in training learning to facilitate past-life regressions. The evidence simply made it impossible to ignore.',
    name: 'Brian Weiss MD',
    role: 'Ehem. Chefarzt Psychiatrie, Mount Sinai',
  },
  {
    quote: 'The body never lies about what the soul has carried across lifetimes.',
    name: 'Roger Woolger PhD',
    role: 'Jungianischer Analytiker, Deep Memory Process',
  },
]
*/
