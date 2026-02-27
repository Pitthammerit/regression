import React from 'react'
import { podcast } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import PodcastPlayer from '../ui/PodcastPlayer'

export default function PodcastSection() {
  return (
    <SectionWrapper id="podcast" data-testid="podcast-player-section">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* Left: Copy */}
        <div>
          <SectionLabel text={podcast.label} />
          <h2
            className="font-serif text-brand-deep leading-none mb-8"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 0.95 }}
          >
            {podcast.sectionHeadline.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>
          <p className="font-sans text-brand-muted text-lg leading-relaxed mb-10">
            {podcast.sectionBody}
          </p>
          <div className="flex flex-wrap gap-3">
            {podcast.podcastLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="font-sans text-xs uppercase tracking-widest text-brand-deep border border-brand-deep/30 rounded-sm px-5 py-2.5 hover:bg-brand-deep hover:text-white transition-colors"
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
            thumbnailUrl="https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/images/spotify-bergesund.jpeg.webp.png.webp"
            audioUrl={podcast.episodeAudioUrl}
          />
        </div>
      </div>
    </SectionWrapper>
  )
}
