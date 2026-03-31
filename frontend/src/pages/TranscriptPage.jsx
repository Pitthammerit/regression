import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getContent } from '../content'
import { episode52 } from '../content/transcripts/episode52.de'

// Load content (default: regression/de)
const content = getContent('regression', 'de')
const { transcriptPage } = content

const TOKEN = import.meta.env.VITE_TRANSCRIPT_TOKEN

export default function TranscriptPage() {
  const [searchParams] = useSearchParams()
  const [theme, setTheme] = useState('beige')
  const [fontSize, setFontSize] = useState(18)

  const token = searchParams.get('token')

  if (token !== TOKEN) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-color-bg-light">
        <p className="font-secondary text-h2 text-color-primary mb-4">
          {transcriptPage.accessDenied.title}
        </p>
        <p className="font-primary text-body text-color-text">
          {transcriptPage.accessDenied.message}
        </p>
      </div>
    )
  }

  const isDark = theme === 'dark'

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-color-bg-dark text-on-dark' : 'bg-color-bg-light text-color-text'}`}
      data-testid="transcript-page"
    >
      {/* Toolbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-4 backdrop-blur-md border-b ${isDark ? 'bg-color-bg-dark/92 border-on-dark-divider' : 'bg-color-bg-light/92 border-color-light'}`}
        data-testid="transcript-toolbar"
      >
        <div className="flex items-center gap-3">
          <span className="font-secondary text-h4 tracking-wide">
            {transcriptPage.toolbar.title}
          </span>
          <span className={`font-primary text-label label tracking-widest ml-2 ${isDark ? 'text-on-dark/40' : 'text-color-text/40'}`}>
            Episode {episode52.meta.episodeNumber} · {episode52.meta.podcastName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Font size controls */}
          <button
            onClick={() => setFontSize(Math.max(14, fontSize - 2))}
            className={`px-3 py-1 text-sm border ${isDark ? 'border-on-dark-divider hover:bg-on-dark/10' : 'border-color-light hover:bg-color-light'} transition-colors`}
            aria-label={transcriptPage.toolbar.fontSizeDecreaseLabel}
            data-testid="font-decrease"
          >
            A-
          </button>
          <span className={`text-sm ${isDark ? 'text-on-dark/60' : 'text-color-text/60'}`}>
            {fontSize}px
          </span>
          <button
            onClick={() => setFontSize(Math.min(24, fontSize + 2))}
            className={`px-3 py-1 text-sm border ${isDark ? 'border-on-dark-divider hover:bg-on-dark/10' : 'border-color-light hover:bg-color-light'} transition-colors`}
            aria-label={transcriptPage.toolbar.fontSizeIncreaseLabel}
            data-testid="font-increase"
          >
            A+
          </button>

          <div className="w-px h-6 bg-current opacity-20 mx-2"></div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(isDark ? 'beige' : 'dark')}
            className={`px-3 py-1 text-sm border ${isDark ? 'border-on-dark-divider hover:bg-on-dark/10' : 'border-color-light hover:bg-color-light'} transition-colors`}
            aria-label={transcriptPage.toolbar.themeToggleLabel}
            data-testid="theme-toggle"
          >
            {isDark ? transcriptPage.toolbar.themeToggleLight : transcriptPage.toolbar.themeToggleDark}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 pb-16 px-8">
        <div className="max-w-3xl mx-auto">
          <article
            className="prose prose-lg max-w-none"
            style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
            data-testid="transcript-content"
          >
            {episode52.transcript.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </div>

      {/* Footer */}
      <footer className={`text-center py-6 border-t ${isDark ? 'border-on-dark-divider' : 'border-color-light'}`}>
        <p className={`text-sm ${isDark ? 'text-on-dark/60' : 'text-color-text/60'}`}>
          {transcriptPage.footer.copyright}
        </p>
      </footer>
    </div>
  )
}
