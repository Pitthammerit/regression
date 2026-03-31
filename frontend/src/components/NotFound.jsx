import React from 'react'
import { useNavigate } from 'react-router-dom'
import SectionLabel from './ui/SectionLabel'
import CtaButton from './ui/CtaButton'
import { getContent } from '../content'
import Header from './Header'
import Footer from './Footer'

// Load content (default: regression/de)
const content = getContent('regression', 'de')
const { notFound, footer: footerContent } = content

export default function NotFound() {
  const navigate = useNavigate()

  // Prepare data for Footer component
  const footerData = {
    contact: footerContent.contact,
    legalLinks: footerContent.legalLinks,
    social: footerContent.social,
  }

  return (
    <div className="min-h-screen bg-color-bg-light bg-paper font-primary text-color-text">
      {/* Use shared Header for consistent navigation */}
      <Header />

      {/* 404 Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 md:py-32">
        <div className="max-w-content mx-auto text-center w-full">
          <SectionLabel text="404" />

          <h1 className="typography-hero-large mb-6">
            {notFound.title}
          </h1>

          <p className="typography-body-lg mb-12 max-w-2xl mx-auto">
            {notFound.message}
          </p>

          <CtaButton
            label={notFound.homeButtonLabel}
            onClick={() => navigate('/')}
            aria-label={notFound.homeButtonAriaLabel}
          />
        </div>
      </main>

      {/* Use shared Footer for consistent navigation */}
      <Footer data={footerData} />
    </div>
  )
}
