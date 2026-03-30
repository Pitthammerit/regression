import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'
import SectionLabel from './ui/SectionLabel'
import { notFound } from '../content/plr-de'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-color-bg-light bg-paper font-primary text-color-body">
      {/* Header with navigation */}
      <header className="pt-8 px-6 md:px-14 lg:px-20">
        <div className="max-w-content mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="font-secondary text-h3 text-color-heading hover:text-color-label transition-fast"
            aria-label={notFound.homeAriaLabel}
          >
            {notFound.brandName}
          </button>
        </div>
      </header>

      {/* 404 Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 md:py-32">
        <div className="max-w-content mx-auto text-center w-full">
          <SectionLabel text="404" />

          <h1 className="font-secondary text-hero-large text-color-heading mb-6 leading-tight">
            {notFound.title}
          </h1>

          <p className="font-primary text-color-label text-body-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            {notFound.message}
          </p>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-3 label button-text font-primary py-4 px-12 rounded-full bg-color-bg-dark text-on-dark hover:bg-color-heading transition-fast"
            aria-label={notFound.homeButtonAriaLabel}
          >
            <Home size={18} />
            {notFound.homeButtonLabel}
          </button>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-8 px-6 border-t border-color-border">
        <div className="max-w-content mx-auto text-center">
          <p className="font-primary text-meta text-color-label/60 uppercase tracking-wider">
            © {new Date().getFullYear()} Benjamin Kurtz Academy LLC
          </p>
        </div>
      </footer>
    </div>
  )
}
