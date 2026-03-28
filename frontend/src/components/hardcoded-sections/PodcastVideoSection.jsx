import React, { useState } from 'react'
import { podcasts, podcastVideo } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import CustomVideoPlayer from '../ui/CustomVideoPlayer'
import CtaButton from '../ui/CtaButton'
import { X, Send } from 'lucide-react'

export default function PodcastVideoSection() {
  const [panelOpen, setPanelOpen] = useState(false)
  // Get first podcast (for backwards compatibility)
  const podcast = podcasts[0]
  const fluentTranscriptUrl = process.env.REACT_APP_FLUENT_FORMS_TRANSCRIPT_URL

  return (
    <>
      <SectionWrapper id="podcast-video" data-testid="podcast-video-section">
        {/* Centered heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionLabel text={podcast.label} />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-color-heading leading-tight mb-6">
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
            label={podcastVideo.downloadButtonLabel}
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
        className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-brand-cream shadow-2xl z-50 flex flex-col"
        style={{ transform: panelOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.4s ease-in-out' }}
        data-testid="transcript-panel"
      >
        <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-color-border">
          <div>
            <p className="font-sans text-label text-color-label mb-1">{podcastVideo.panelLabel}</p>
            <h3 className="font-serif text-2xl text-color-heading leading-tight">
              {podcastVideo.panelTitleLine1}<br />{podcastVideo.panelTitleLine2}
            </h3>
          </div>
          <button onClick={() => setPanelOpen(false)} className="p-1.5 hover:opacity-50 transition-opacity" aria-label={podcastVideo.closeButtonLabel} data-testid="transcript-panel-close">
            <X size={18} className="text-color-heading" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <p className="font-sans text-sm text-brand-muted leading-relaxed mb-8">
            {podcastVideo.emailPrompt}
          </p>
          {fluentTranscriptUrl ? (
            <iframe src={fluentTranscriptUrl} className="w-full min-h-[320px] border-0" title="Transkript anfordern" data-testid="transcript-fluent-iframe" />
          ) : (
            <div className="space-y-4" data-testid="transcript-placeholder-form">
              <div>
                <label className="font-sans text-label text-color-label block mb-2">{podcastVideo.nameLabel}</label>
                <input type="text" placeholder={podcastVideo.namePlaceholder} className="w-full bg-white/60 border border-color-border rounded-lg px-4 py-3 font-sans text-sm text-color-body placeholder:text-brand-muted/50 focus:outline-none focus:border-color-heading/40 transition-colors" data-testid="transcript-name-input" />
              </div>
              <div>
                <label className="font-sans text-label text-color-label block mb-2">{podcastVideo.emailLabel}</label>
                <input type="email" placeholder={podcastVideo.emailPlaceholder} className="w-full bg-white/60 border border-color-border rounded-lg px-4 py-3 font-sans text-sm text-color-body placeholder:text-brand-muted/50 focus:outline-none focus:border-color-heading/40 transition-colors" data-testid="transcript-email-input" />
              </div>
              <button className="w-full flex items-center justify-center gap-2.5 bg-color-heading text-white font-sans text-label text-color-label py-4 rounded-full hover:bg-brand-steel transition-colors duration-200 mt-2" data-testid="transcript-submit-btn">
                <Send size={14} />
                {podcastVideo.submitButtonLabel}
              </button>
              <p className="font-sans text-xs text-brand-muted/60 text-center pt-2">{podcastVideo.fluentFormsNote}</p>
            </div>
          )}
        </div>

        <div className="px-8 py-5 border-t border-color-border">
          <p className="font-sans text-xs text-brand-muted/50 text-center leading-relaxed">
            {podcastVideo.privacyNoteLine1}<br />{podcastVideo.privacyNoteLine2}
          </p>
        </div>
      </div>
    </>
  )
}
