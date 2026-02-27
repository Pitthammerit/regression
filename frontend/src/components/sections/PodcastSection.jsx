import React from 'react'
import { podcast } from '../../content/plr-de'
import SectionWrapper from '../ui/SectionWrapper'
import SectionLabel from '../ui/SectionLabel'
import CtaButton from '../ui/CtaButton'
import CustomVideoPlayer from '../ui/CustomVideoPlayer'

export default function PodcastSection() {
  return (
    <SectionWrapper id="podcast" data-testid="podcast-section">
      <div className="max-w-3xl">
        <SectionLabel text={podcast.label} />
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-deep mb-6 leading-tight">
          {podcast.headline}
        </h2>
        <p className="font-sans text-brand-muted text-lg leading-relaxed mb-12">
          {podcast.subline}
        </p>
      </div>

      {/* YouTube — custom glass player (hides YouTube controls & branding) */}
      <div className="max-w-4xl mb-12">
        <CustomVideoPlayer
          type="youtube"
          src={podcast.youtubeEmbedUrl}
          data-testid="podcast-video-embed"
        />
      </div>

      {/* Podcast Links */}
      <div className="flex flex-wrap gap-4 mb-14">
        {podcast.podcastLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="font-sans text-xs uppercase tracking-widest text-brand-steel border border-brand-steel/40 rounded-sm px-5 py-2.5 hover:text-brand-deep hover:border-brand-deep transition-colors"
            data-testid={`podcast-link-${link.label.toLowerCase().replace(/ /g, '-')}`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <CtaButton label={podcast.ctaBelow} variant="primary" />
    </SectionWrapper>
  )
}
