import { podcasts } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'
import PodcastPlayer from '../ui/PodcastPlayer'
import DebugLabel from '../ui/DebugLabel'

const SECTION_BG = "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/images/podcast%20bg%20blur.jpg"

/**
 * PodcastSectionCopy — Podcast section with typography tokens
 *
 * MIGRATED to design tokens (Single Source of Truth):
 * - Font-family: font-secondary (headlines), font-primary (body)
 * - Label: text-label (15px) + color-label
 * - Headline: podcast-headline (clamp 2.8-5rem, line-height 0.95) + color-heading
 * - Body: text-body-lg (20px) + color-body
 * - Links: text-label (15px) + color-heading
 *
 * CRITICAL PRESERVED:
 * - Background image with cream tint overlay
 * - Grid layout with copy on left, player on right
 * - PodcastPlayer component
 * - Map over podcast.podcastLinks
 */
export default function PodcastSection({ debugMode = false }) {
  // Get first podcast (for backwards compatibility)
  const podcast = podcasts[0]
  return (
    <div id="podcast" className="relative overflow-hidden" data-testid="podcast-player-section">
      {/* Background photo — visible, no dark overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${SECTION_BG})` }} />
      {/* Very light cream tint for text readability */}
      <div className="absolute inset-0 bg-color-bg-light/30" />

      <div className="relative z-10 max-w-content mx-auto px-8 md:px-14 lg:px-20 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left: Copy */}
          <div>
            <DebugLabel type="label" debugMode={debugMode}>
              <SectionLabel text={podcast.label} />
            </DebugLabel>

            <DebugLabel type="podcast-headline" debugMode={debugMode}>
              <h2 className="font-secondary text-podcast-headline text-color-heading content-spacing-md">
                {podcast.sectionHeadline.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>
            </DebugLabel>

            <DebugLabel type="body-lg" debugMode={debugMode}>
              <p className="font-primary text-body-lg text-color-body leading-relaxed">
                {podcast.sectionBody}
              </p>
            </DebugLabel>

            <div className="flex flex-wrap gap-3 margin-top-md">
              {podcast.podcastLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-primary text-button-text button-text text-color-heading border border-color-heading/30 rounded-sm px-5 py-2.5 hover:bg-color-heading hover:text-white transition-colors"
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
      </div>
    </div>
  )
}
