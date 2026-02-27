import React from 'react'
import { podcast } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'
import PodcastPlayer from '../ui/PodcastPlayer'

// YouTube thumbnail als Sektion-Hintergrund und Player-Thumbnail
const THUMBNAIL = "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/images/apple-bergesund.jpeg.webp.png.webp"
const BG_IMAGE = "https://img.youtube.com/vi/U5L07PmViis/maxresdefault.jpg"

export default function PodcastSection() {
  return (
    <section
      id="podcast"
      data-testid="podcast-section"
      className="relative overflow-hidden"
    >
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 max-w-content mx-auto px-8 md:px-14 lg:px-20 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* LEFT COLUMN — Copy */}
          <div>
            <SectionLabel text={podcast.label} light />

            {/* Multi-line Headline */}
            <h2
              className="font-serif text-white leading-none mb-8"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 0.95 }}
            >
              {podcast.sectionHeadline.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>

            {/* Body text */}
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

          {/* RIGHT COLUMN — PodcastPlayer */}
          <div className="flex justify-center md:justify-end">
            <PodcastPlayer
              title={podcast.youtubeTitle}
              host={podcast.episodeHost}
              episodeLabel={podcast.episodeLabel}
              thumbnailUrl={THUMBNAIL}
              duration={podcast.episodeDuration}
              externalUrl={podcast.podcastLinks[0].url}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
