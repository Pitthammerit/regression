import React from 'react'
import { podcast } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import CustomVideoPlayer from '../ui/CustomVideoPlayer'
import PodcastPlayer from '../ui/PodcastPlayer'

const THUMBNAIL = "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/images/spotify-bergesund.jpeg.webp.png.webp"
const SECTION_BG = "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/images/podcast%20bg%20blur.jpg"

export default function PodcastSection() {
  return (
    <div id="podcast">
      {/* ── PART 1: Light section — Label + Headline + YouTube Video ── */}
      <SectionWrapper data-testid="podcast-section">
        <div className="max-w-3xl">
          <SectionLabel text={podcast.label} />
          <h2
            className="font-serif text-brand-deep leading-tight mb-6"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3.5rem)' }}
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
  )
}
