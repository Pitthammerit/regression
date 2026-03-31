import { podcasts } from '../../content/plr-de'
import SectionLabel from '../ui/SectionLabel'
import PodcastPlayer from '../ui/PodcastPlayer'
import DebugLabel from '../ui/DebugLabel'

const SECTION_BG = "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/images/podcast%20bg%20blur.jpg"

/**
 * PodcastSection — Podcast section with composite typography utilities
 *
 * MIGRATED to composite typography utilities:
 * - Podcast headline: font-secondary text-podcast-headline (kept as-is - no composite utility yet)
 * - Body-lg: typography-body-lg (replaces font-primary text-body-lg text-color-text)
 * - Button text: typography-menu-text (replaces font-primary text-button-text button-text)
 *
 * CRITICAL PRESERVED:
 * - Background image with cream tint overlay
 * - Grid layout with player on right
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

          {/* Left: Content */}
          <div>
            <DebugLabel type="typography-label" debugMode={debugMode}>
              <SectionLabel text={podcast.label} />
            </DebugLabel>

            <DebugLabel type="typography-h2" debugMode={debugMode}>
              <h2 className="font-secondary text-podcast-headline text-color-primary content-spacing-md">
                {podcast.sectionHeadline.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>
            </DebugLabel>

            <DebugLabel type="typography-body-lg" debugMode={debugMode}>
              <p className="typography-body-lg leading-relaxed">
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
                  className="typography-menu-text text-color-primary border border-color-primary/30 rounded-sm px-5 py-2.5 hover:bg-color-primary hover:text-white transition-colors"
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
