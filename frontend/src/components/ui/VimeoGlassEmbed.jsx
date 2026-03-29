import React, { useState } from 'react'
import { Play } from 'lucide-react'

/**
 * VimeoGlassEmbed
 *
 * A reusable Vimeo embed component with a glassmorphism play button overlay.
 * The iframe only loads when the user clicks play, avoiding Vimeo privacy restrictions
 * and improving initial page load performance.
 *
 * @param {Object} props
 * @param {string} props.src - The Vimeo embed URL (without query parameters)
 * @param {string} props.title - Video title for accessibility and iframe title attribute
 * @param {string} [props.variant='default'] - Visual variant: 'default' (larger button) or 'compact' (smaller button)
 * @param {boolean} [props.showTitleOverlay=false] - Show title overlay at the top of the poster
 * @param {string} [props.shadowSize='lg'] - Tailwind shadow size: 'lg' or '2xl'
 * @param {string} [props.testId] - Test ID for the play button click area
 */
export default function VimeoGlassEmbed({
  src,
  title,
  variant = 'default',
  showTitleOverlay = false,
  shadowSize = 'lg',
  testId,
}) {
  const [started, setStarted] = useState(false)

  const embedSrc = `${src}?badge=0&autopause=0&player_id=0&app_id=58479${started ? '&autoplay=1' : ''}`

  // Variant-specific configurations
  const buttonConfig = variant === 'compact' ? {
    size: 'w-20 h-20',
    iconSize: 28,
  } : {
    size: 'w-24 h-24',
    iconSize: 32,
  }

  // Gradient variant
  const gradientClass = variant === 'compact'
    ? 'from-brand-deep/50 to-brand-dark/70'
    : 'from-brand-deep/40 to-brand-dark/60'

  return (
    <div className={`relative rounded overflow-hidden shadow-${shadowSize} bg-brand-dark`}>
      <div style={{ paddingTop: '56.25%', position: 'relative' }}>
        {started && (
          <iframe
            src={embedSrc}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title={title}
          />
        )}

        {/* Glass play button — shown before video starts */}
        {!started && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-brand-dark/80"
            onClick={() => setStarted(true)}
            data-testid={testId || 'vimeo-glass-play'}
          >
            {/* Atmospheric background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />

            {/* Optional title placeholder */}
            {showTitleOverlay && (
              <div className="absolute top-6 left-6 right-6">
                <p className="font-primary text-xs tracking-[0.2em] uppercase text-white/40">
                  {title}
                </p>
              </div>
            )}

            {/* Glass play button */}
            <button
              className={`relative z-10 ${buttonConfig.size} rounded-full
                bg-white/15 backdrop-blur-md border border-white/35
                flex items-center justify-center
                hover:bg-white/25 hover:scale-105
                transition-all duration-300 shadow-2xl`}
              aria-label="Video abspielen"
            >
              <Play size={buttonConfig.iconSize} className="text-white ml-1" fill="white" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
