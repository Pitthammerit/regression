import React, { useState } from 'react'
import { podcast } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import CustomVideoPlayer from '../ui/CustomVideoPlayer'
import PodcastPlayer from '../ui/PodcastPlayer'
import CtaButton from '../ui/CtaButton'
import { X, Send } from 'lucide-react'

const THUMBNAIL = "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/images/spotify-bergesund.jpeg.webp.png.webp"
const SECTION_BG = "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/images/podcast%20bg%20blur.jpg"

export default function PodcastSection() {
  const [panelOpen, setPanelOpen] = useState(false)
  const fluentTranscriptUrl = process.env.REACT_APP_FLUENT_FORMS_TRANSCRIPT_URL

  return (
    <>
      <div id="podcast">
        {/* ── PART 1: Light section — Label + Headline + YouTube Video ── */}
        <SectionWrapper data-testid="podcast-section">
          <div className="max-w-3xl">
            <SectionLabel text={podcast.label} />
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-deep leading-tight mb-6"
            >
              {podcast.headline}
            </h2>
            <p className="font-sans text-brand-muted text-lg leading-relaxed mb-12">
              {podcast.subline}
            </p>
          </div>

          {/* YouTube Video */}
          <div className="max-w-4xl" data-testid="podcast-video-embed">
            <CustomVideoPlayer
              type="youtube"
              src={podcast.youtubeEmbedUrl}
            />
          </div>

          {/* Transcript download button — uses global CtaButton */}
          <div className="max-w-content mt-6 flex items-center gap-4">
            <CtaButton
              label="Transkript herunterladen"
              variant="secondary"
              onClick={() => setPanelOpen(true)}
              data-testid="transcript-download-btn"
            />
          </div>
        </SectionWrapper>

        {/* ── PART 2: Podcast Player section with bg image ── */}
        <div
          className="relative overflow-hidden"
          data-testid="podcast-player-section"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SECTION_BG})` }}
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 max-w-content mx-auto px-8 md:px-14 lg:px-20 py-16 md:py-20">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

              {/* Left: Copy */}
              <div>
                <SectionLabel text={podcast.label} light />
                <h2
                  className="font-serif text-white leading-none mb-8"
                  style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 0.95 }}
                >
                  {podcast.sectionHeadline.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </h2>
                <p className="font-sans text-white/70 text-lg leading-relaxed mb-10">
                  {podcast.sectionBody}
                </p>
                {/* Platform Buttons */}
                <div className="flex flex-wrap gap-3">
                  {podcast.podcastLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-sans text-xs uppercase tracking-widest text-white border border-white/40 rounded-sm px-5 py-2.5 hover:bg-white/10 hover:border-white transition-colors"
                      data-testid={`podcast-link-${link.label.toLowerCase().replace(/ /g, '-')}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: PodcastPlayer */}
              <div className="flex justify-center md:justify-end">
                <PodcastPlayer
                  title={podcast.youtubeTitle}
                  host={podcast.episodeHost}
                  episodeLabel={podcast.episodeLabel}
                  thumbnailUrl={THUMBNAIL}
                  audioUrl={podcast.episodeAudioUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Transcript Slide-in Panel (Right Drawer) ── */}
      {/* Backdrop */}
      {panelOpen && (
        <div
          className="fixed inset-0 bg-black/25 z-40 backdrop-blur-[2px] transition-opacity duration-300"
          onClick={() => setPanelOpen(false)}
          data-testid="transcript-panel-backdrop"
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#F0EBE1] shadow-2xl z-50 flex flex-col transition-transform duration-400 ease-in-out`}
        style={{ transform: panelOpen ? 'translateX(0)' : 'translateX(100%)' }}
        data-testid="transcript-panel"
      >
        {/* Panel header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-black/8">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-brand-steel mb-1">
              Transkript
            </p>
            <h3 className="font-serif text-2xl text-brand-deep leading-tight">
              Jetzt kostenlos<br />herunterladen
            </h3>
          </div>
          <button
            onClick={() => setPanelOpen(false)}
            className="p-1.5 hover:opacity-50 transition-opacity"
            aria-label="Schließen"
            data-testid="transcript-panel-close"
          >
            <X size={18} className="text-brand-deep" />
          </button>
        </div>

        {/* Panel body */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <p className="font-sans text-sm text-brand-muted leading-relaxed mb-8">
            Trag deine E-Mail-Adresse ein und erhalte das vollständige Transkript der Podcast-Episode direkt in dein Postfach.
          </p>

          {fluentTranscriptUrl ? (
            /* Fluent Forms Embed */
            <iframe
              src={fluentTranscriptUrl}
              className="w-full min-h-[320px] border-0"
              title="Transkript anfordern"
              data-testid="transcript-fluent-iframe"
            />
          ) : (
            /* Placeholder form */
            <div className="space-y-4" data-testid="transcript-placeholder-form">
              <div>
                <label className="font-sans text-xs uppercase tracking-widest text-brand-steel block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Dein Vorname"
                  className="w-full bg-white/60 border border-black/12 rounded-lg px-4 py-3 font-sans text-sm text-brand-body placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-deep/40 transition-colors"
                  data-testid="transcript-name-input"
                />
              </div>
              <div>
                <label className="font-sans text-xs uppercase tracking-widest text-brand-steel block mb-2">
                  E-Mail-Adresse
                </label>
                <input
                  type="email"
                  placeholder="deine@email.de"
                  className="w-full bg-white/60 border border-black/12 rounded-lg px-4 py-3 font-sans text-sm text-brand-body placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-deep/40 transition-colors"
                  data-testid="transcript-email-input"
                />
              </div>
              <button
                className="w-full flex items-center justify-center gap-2.5 bg-brand-deep text-white font-sans text-sm uppercase tracking-widest py-4 rounded-full hover:bg-brand-steel transition-colors duration-200 mt-2"
                data-testid="transcript-submit-btn"
              >
                <Send size={14} />
                Transkript anfordern
              </button>
              <p className="font-sans text-xs text-brand-muted/60 text-center pt-2">
                [ Fluent Forms Embed wird hier eingesetzt ]
              </p>
            </div>
          )}
        </div>

        {/* Panel footer */}
        <div className="px-8 py-5 border-t border-black/8">
          <p className="font-sans text-xs text-brand-muted/50 text-center leading-relaxed">
            Kein Spam. Du erhältst nur den Link zum Transkript.<br />
            Du kannst dich jederzeit abmelden.
          </p>
        </div>
      </div>
    </>
  )
}
