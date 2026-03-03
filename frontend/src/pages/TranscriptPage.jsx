import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { transcriptPage } from '../content/plr-de'
import { episode52 } from '../content/transcripts/episode52.de'

const TOKEN = process.env.REACT_APP_TRANSCRIPT_TOKEN

export default function TranscriptPage() {
  const [searchParams] = useSearchParams()
  const [theme, setTheme] = useState('beige')
  const [fontSize, setFontSize] = useState(18)

  const token = searchParams.get('token')

  if (token !== TOKEN) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0EBE1]">
        <p className="font-serif text-4xl text-[#2D3F4E] mb-4">
          {transcriptPage.accessDenied.title}
        </p>
        <p className="font-sans text-sm text-[#7D7469]">
          {transcriptPage.accessDenied.message}
        </p>
      </div>
    )
  }

  const isDark = theme === 'dark'
  const bg = isDark ? '#171614' : '#F0EBE1'
  const text = isDark ? '#D9D2C8' : '#2D2A26'
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const toolbarBg = isDark ? 'rgba(23,22,20,0.92)' : 'rgba(240,235,225,0.92)'

  return (
    <div
      style={{ backgroundColor: bg, color: text, minHeight: '100vh' }}
      className="transition-colors duration-300"
      data-testid="transcript-page"
    >
      {/* Toolbar */}
      <div
        className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-4 backdrop-blur-md"
        style={{ backgroundColor: toolbarBg, borderBottom: `1px solid ${border}` }}
        data-testid="transcript-toolbar"
      >
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg tracking-wide" style={{ color: text }}>
            {transcriptPage.toolbar.title}
          </span>
          <span
            className="font-sans text-xs uppercase tracking-widest ml-2"
            style={{ color: isDark ? 'rgba(217,210,200,0.4)' : 'rgba(45,42,38,0.4)' }}
          >
            Episode {episode52.meta.episodeNumber} · {episode52.meta.podcastName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Font size controls */}
          <div
            className="flex items-center gap-1 rounded-full px-2 py-1"
            style={{ border: `1px solid ${border}` }}
          >
            <button
              onClick={() => setFontSize(s => Math.max(13, s - 1))}
              className="px-2 py-0.5 font-sans text-xs hover:opacity-60 transition-opacity"
              style={{ color: text, fontSize: '13px' }}
              data-testid="font-decrease"
              aria-label={transcriptPage.toolbar.fontSizeDecreaseLabel}
            >
              A
            </button>
            <span style={{ color: border, fontSize: '12px' }}>|</span>
            <button
              onClick={() => setFontSize(s => Math.min(28, s + 1))}
              className="px-2 py-0.5 font-sans hover:opacity-60 transition-opacity"
              style={{ color: text, fontSize: '17px' }}
              data-testid="font-increase"
              aria-label={transcriptPage.toolbar.fontSizeIncreaseLabel}
            >
              A
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(t => t === 'dark' ? 'beige' : 'dark')}
            className="flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
            style={{ border: `1px solid ${border}`, color: text }}
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
        <div
          className="mb-12 pb-10"
          style={{ borderBottom: `1px solid ${border}` }}
        >
          <p
            className="font-sans text-xs uppercase tracking-[0.2em] mb-4"
            style={{ color: isDark ? 'rgba(217,210,200,0.45)' : 'rgba(45,42,38,0.45)' }}
          >
            Episode {episode52.meta.episodeNumber} · {episode52.meta.podcastName} · {episode52.meta.host} · {episode52.meta.duration}
          </p>
          <h1
            className="font-serif leading-tight"
            style={{ fontSize: `${Math.round(fontSize * 1.9)}px`, color: text }}
          >
            {episode52.meta.title}
          </h1>
          <p
            className="font-sans mt-4 leading-relaxed"
            style={{ fontSize: `${fontSize - 2}px`, color: isDark ? 'rgba(217,210,200,0.55)' : 'rgba(45,42,38,0.55)' }}
          >
            {episode52.meta.description}
          </p>
        </div>

        {/* Transcript blocks */}
        <div className="space-y-8">
          {episode52.transcript.map((block, i) => (
            <div key={i}>
              <p
                className="font-sans text-xs uppercase tracking-widest mb-2"
                style={{
                  color: isDark ? 'rgba(217,210,200,0.4)' : 'rgba(45,42,38,0.4)',
                  fontSize: `${fontSize - 6}px`
                }}
              >
                {block.speaker}
              </p>
              <p
                className="font-sans leading-[1.85]"
                style={{ fontSize: `${fontSize}px`, color: text }}
              >
                {block.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div
          className="mt-16 pt-8"
          style={{ borderTop: `1px solid ${border}` }}
        >
          <p
            className="font-sans text-xs text-center"
            style={{ color: isDark ? 'rgba(217,210,200,0.3)' : 'rgba(45,42,38,0.3)' }}
          >
            {transcriptPage.footer.copyright}
          </p>
        </div>
      </div>
    </div>
  )
}
