import React, { useState } from "react"
import { podcasts, podcastVideo } from "../../content/plr-de"
import SectionWrapper from "../ui/SectionWrapper"
import SectionLabel from "../ui/SectionLabel"
import CustomVideoPlayer from "../ui/CustomVideoPlayer"
import CtaButton from "../ui/CtaButton"
import DebugLabel from "../ui/DebugLabel"
import { X, Send } from "lucide-react"

/**
 * PodcastVideoSection — Video section with transcript panel
 *
 * MIGRATED to design tokens (Single Source of Truth):
 * - Font-family: font-secondary (headlines), font-primary (body)
 * - Label: text-label (15px) + color-label (uppercase via .label plugin)
 * - H2: text-h2 (36px) + color-heading
 * - Subline: text-body-lg (20px) + color-body
 * - Panel H3: text-h3 (30px) + color-heading
 * - Form labels: text-label (15px) + color-label (uppercase via .label plugin)
 * - Body: text-body (18px) + color-body
 * - Backgrounds: color-bg-light, color-card-overlay
 * - Borders: color-border
 *
 * FEATURES:
 * - YouTube video embed
 * - Slide-in transcript panel with smooth animation
 * - Email form or Fluent Forms iframe
 * - Transitions via Tailwind (no inline styles)
 *
 * @param {Object} props
 * @param {boolean} props.debugMode - Show debug labels
 */
export default function PodcastVideoSection({ debugMode = false }) {
  const [panelOpen, setPanelOpen] = useState(false)
  // Get first podcast (for backwards compatibility)
  const podcast = podcasts[0]
  const fluentTranscriptUrl = process.env.REACT_APP_FLUENT_FORMS_TRANSCRIPT_URL

  return (
    <>
      <SectionWrapper id="podcast-video" data-testid="podcast-video-section">
        {/* Centered heading */}
        <div className="text-center max-w-centered-header mx-auto content-spacing-lg">
          <DebugLabel type="label" debugMode={debugMode}>
            <SectionLabel text={podcast.label} />
          </DebugLabel>

          <DebugLabel type="h2" debugMode={debugMode}>
            <h2 className="font-secondary text-h2 text-color-heading leading-tight content-spacing-md">
              {podcast.headline}
            </h2>
          </DebugLabel>

          <DebugLabel type="body-lg" debugMode={debugMode}>
            <p className="font-primary text-body-lg text-color-body leading-relaxed">
              {podcast.subline}
            </p>
          </DebugLabel>
        </div>

        {/* YouTube Video — centered */}
        <div className="max-w-4xl mx-auto w-full" data-testid="podcast-video-embed">
          <CustomVideoPlayer type="youtube" src={podcast.youtubeEmbedUrl} />
        </div>

        {/* Transcript download button — centered */}
        <div className="margin-top-md flex justify-center">
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
          className="fixed inset-0 bg-color-overlay-dark z-40 backdrop-blur-sm"
          onClick={() => setPanelOpen(false)}
          data-testid="transcript-panel-backdrop"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-color-bg-light shadow-2xl z-50 flex flex-col transition-slower ${
          panelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        data-testid="transcript-panel"
      >
        <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-color-border">
          <div>
            <DebugLabel type="label" debugMode={debugMode}>
              <p className="font-primary text-label label text-color-label name-role-spacing">
                {podcastVideo.panelLabel}
              </p>
            </DebugLabel>

            <DebugLabel type="h3" debugMode={debugMode}>
              <h3 className="font-secondary text-h3 text-color-heading leading-tight">
                {podcastVideo.panelTitleLine1}<br />{podcastVideo.panelTitleLine2}
              </h3>
            </DebugLabel>
          </div>

          <button
            onClick={() => setPanelOpen(false)}
            className="p-1.5 hover:opacity-50 transition-opacity"
            aria-label={podcastVideo.closeButtonLabel}
            data-testid="transcript-panel-close"
          >
            <X className="w-icon-md h-icon-md text-color-heading" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <p className="font-primary text-body text-color-body leading-relaxed content-spacing-lg">
            {podcastVideo.emailPrompt}
          </p>

          {fluentTranscriptUrl ? (
            <iframe
              src={fluentTranscriptUrl}
              className="w-full min-h-[320px] border-0"
              title="Transkript anfordern"
              data-testid="transcript-fluent-iframe"
            />
          ) : (
            <div className="space-y-4" data-testid="transcript-placeholder-form">
              <div>
                <DebugLabel type="label" debugMode={debugMode}>
                  <label className="font-primary text-label label text-color-label block block-label-spacing">
                    {podcastVideo.nameLabel}
                  </label>
                </DebugLabel>

                <input
                  type="text"
                  placeholder={podcastVideo.namePlaceholder}
                  className="w-full bg-color-card-overlay border border-color-border rounded-lg px-4 py-3 font-primary text-body text-color-body placeholder:text-color-label/50 focus:outline-none focus:border-color-heading/40 transition-colors"
                  data-testid="transcript-name-input"
                />
              </div>

              <div>
                <DebugLabel type="label" debugMode={debugMode}>
                  <label className="font-primary text-label label text-color-label block block-label-spacing">
                    {podcastVideo.emailLabel}
                  </label>
                </DebugLabel>

                <input
                  type="email"
                  placeholder={podcastVideo.emailPlaceholder}
                  className="w-full bg-color-card-overlay border border-color-border rounded-lg px-4 py-3 font-primary text-body text-color-body placeholder:text-color-label/50 focus:outline-none focus:border-color-heading/40 transition-colors"
                  data-testid="transcript-email-input"
                />
              </div>

              <button
                className="w-full flex items-center justify-center gap-2.5 bg-color-heading font-primary text-label label text-on-dark py-4 rounded-full hover:bg-color-label transition-colors transition-normal element-spacing-sm"
                data-testid="transcript-submit-btn"
              >
                <Send className="w-icon-sm h-icon-sm" />
                {podcastVideo.submitButtonLabel}
              </button>

              <p className="font-primary text-hint text-color-label/60 text-center pt-2">
                {podcastVideo.fluentFormsNote}
              </p>
            </div>
          )}
        </div>

        <div className="px-8 py-5 border-t border-color-border">
          <p className="font-primary text-hint text-color-label/50 text-center leading-relaxed">
            {podcastVideo.privacyNoteLine1}<br />{podcastVideo.privacyNoteLine2}
          </p>
        </div>
      </div>
    </>
  )
}
