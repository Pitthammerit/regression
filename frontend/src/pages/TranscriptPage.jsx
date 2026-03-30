import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { transcriptPage } from '../content/plr-de'
import { episode52 } from '../content/transcripts/episode52.de'

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
          <div className={`flex items-center gap-1 rounded-full px-2 py-1 border ${isDark ? 'border-on-dark-divider' : 'border-color-light'}`}>
            <button
              onClick={() => setFontSize(s => Math.max(13, s - 1))}
              className="px-2 py-0.5 font-primary text-label hover:opacity-60 transition-opacity"
              style={{ fontSize: '13px' }}
              data-testid="font-decrease"
              aria-label={transcriptPage.toolbar.fontSizeDecreaseLabel}
            >
              A
            </button>
            <span className={isDark ? 'text-on-dark-divider' : 'text-color-text'} style={{ fontSize: '12px' }}>|</span>
            <button
              onClick={() => setFontSize(s => Math.min(28, s + 1))}
              className="px-2 py-0.5 font-primary hover:opacity-60 transition-opacity"
              style={{ fontSize: '17px' }}
              data-testid="font-increase"
              aria-label={transcriptPage.toolbar.fontSizeIncreaseLabel}
            >
              A
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(t => t === 'dark' ? 'beige' : 'dark')}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-primary text-label label tracking-widest hover:opacity-70 transition-opacity border ${isDark ? 'border-on-dark-divider' : 'border-color-light'}`}
            data-testid="theme-toggle"
            aria-label={transcriptPage.toolbar.themeToggleLabel}
          >
            {isDark ? (
              <>
                <span style={{ fontSize: '14px' }}>◑</span>
                <span>{transcriptPage.toolbar.themeToggleLight}</span>
              </>
            ) : (
              <>
                <span style={{ fontSize: '14px' }}>●</span>
                <span>{transcriptPage.toolbar.themeToggleDark}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">

        {/* Episode header */}
        <div className={`mb-12 pb-10 border-b ${isDark ? 'border-on-dark-divider' : 'border-color-light'}`}>
          <p className={`font-primary text-label label tracking-widest mb-4 ${isDark ? 'text-on-dark/45' : 'text-color-text/45'}`}>
            Episode {episode52.meta.episodeNumber} · {episode52.meta.podcastName} · {episode52.meta.host} · {episode52.meta.duration}
          </p>
          <h1
            className="font-secondary leading-tight"
            style={{ fontSize: `${Math.round(fontSize * 1.9)}px` }}
          >
            {episode52.meta.title}
          </h1>
          <p
            className="font-primary mt-4 leading-relaxed"
            style={{ fontSize: `${fontSize - 2}px` }}
          >
            <span className={isDark ? 'text-on-dark/55' : 'text-color-text/55'}>
              {episode52.meta.description}
            </span>
          </p>
        </div>

        {/* Transcript blocks */}
        <div className="space-y-8">
          {episode52.transcript.map((block, i) => (
            <div key={i}>
              <p
                className="font-primary text-label label tracking-widest mb-2"
                style={{ fontSize: `${fontSize - 6}px` }}
              >
                <span className={isDark ? 'text-on-dark/40' : 'text-color-text/40'}>
                  {block.speaker}
                </span>
              </p>
              <p
                className="font-primary leading-[1.85]"
                style={{ fontSize: `${fontSize}px` }}
              >
                {block.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className={`mt-16 pt-8 border-t ${isDark ? 'border-on-dark-divider' : 'border-color-light'}`}>
          <p className={`font-primary text-label text-center ${isDark ? 'text-on-dark/30' : 'text-color-text/30'}`}>
            {transcriptPage.footer.copyright}
          </p>
        </div>
      </div>
    </div>
  )
}
