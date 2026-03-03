import React, { useState } from 'react'
import { podcast } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import CustomVideoPlayer from '../ui/CustomVideoPlayer'
import CtaButton from '../ui/CtaButton'
import { X, Send } from 'lucide-react'

export default function PodcastVideoSection() {
  const [panelOpen, setPanelOpen] = useState(false)
  const fluentTranscriptUrl = process.env.REACT_APP_FLUENT_FORMS_TRANSCRIPT_URL

  return (
    <>
      <SectionWrapper id="podcast-video" data-testid="podcast-video-section">
        {/* Centered heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionLabel text={podcast.label} />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-deep leading-tight mb-6">
            {podcast.headline}
          </h2>
          <p className="font-sans text-brand-muted text-lg leading-relaxed">
            {podcast.subline}
          </p>
        </div>

        {/* YouTube Video — centered */}
        <div className="max-w-4xl mx-auto w-full" data-testid="podcast-video-embed">
          <CustomVideoPlayer type="youtube" src={podcast.youtubeEmbedUrl} />
        </div>

        {/* Transcript download button — centered */}
        <div className="mt-6 flex justify-center">
          <CtaButton
            label="Transkript herunterladen"
            variant="secondary"
            onClick={() => setPanelOpen(true)}
            className="animate-pulse-soft"
            data-testid="transcript-download-btn"
          />
        </div>
      </SectionWrapper>

      {/* ── Transcript Slide-in Panel ── */}
      {panelOpen && (
        <div
          className="fixed inset-0 bg-black/25 z-40 backdrop-blur-[2px]"
          onClick={() => setPanelOpen(false)}
          data-testid="transcript-panel-backdrop"
        />
      )}

      <div
        className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#F0EBE1] shadow-2xl z-50 flex flex-col"
        style={{ transform: panelOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.4s ease-in-out' }}
        data-testid="transcript-panel"
      >
        <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-black/8">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-brand-steel mb-1">Transkript</p>
            <h3 className="font-serif text-2xl text-brand-deep leading-tight">Jetzt kostenlos<br />herunterladen</h3>
          </div>
          <button onClick={() => setPanelOpen(false)} className="p-1.5 hover:opacity-50 transition-opacity" aria-label="Schließen" data-testid="transcript-panel-close">
            <X size={18} className="text-brand-deep" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <p className="font-sans text-sm text-brand-muted leading-relaxed mb-8">
            Trag deine E-Mail-Adresse ein und erhalte das vollständige Transkript der Podcast-Episode direkt in dein Postfach.
          </p>
          {fluentTranscriptUrl ? (
            <iframe src={fluentTranscriptUrl} className="w-full min-h-[320px] border-0" title="Transkript anfordern" data-testid="transcript-fluent-iframe" />
          ) : (
            <div className="space-y-4" data-testid="transcript-placeholder-form">
              <div>
                <label className="font-sans text-xs uppercase tracking-widest text-brand-steel block mb-2">Name</label>
                <input type="text" placeholder="Dein Vorname" className="w-full bg-white/60 border border-black/12 rounded-lg px-4 py-3 font-sans text-sm text-brand-body placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-deep/40 transition-colors" data-testid="transcript-name-input" />
              </div>
              <div>
                <label className="font-sans text-xs uppercase tracking-widest text-brand-steel block mb-2">E-Mail-Adresse</label>
                <input type="email" placeholder="deine@email.de" className="w-full bg-white/60 border border-black/12 rounded-lg px-4 py-3 font-sans text-sm text-brand-body placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-deep/40 transition-colors" data-testid="transcript-email-input" />
              </div>
              <button className="w-full flex items-center justify-center gap-2.5 bg-brand-deep text-white font-sans text-sm uppercase tracking-widest py-4 rounded-full hover:bg-brand-steel transition-colors duration-200 mt-2" data-testid="transcript-submit-btn">
                <Send size={14} />
                Transkript anfordern
              </button>
              <p className="font-sans text-xs text-brand-muted/60 text-center pt-2">[ Fluent Forms Embed wird hier eingesetzt ]</p>
            </div>
          )}
        </div>

        <div className="px-8 py-5 border-t border-black/8">
          <p className="font-sans text-xs text-brand-muted/50 text-center leading-relaxed">
            Kein Spam. Du erhältst nur den Link zum Transkript.<br />Du kannst dich jederzeit abmelden.
          </p>
        </div>
      </div>
    </>
  )
}
