import React from 'react'
import { Play } from 'lucide-react'

/**
 * GlassButton – Proper glassmorphism button without CSS loading delay
 *
 * Built following Apple/Spotify best practices:
 * 1. Blur on pseudo-element (separate layer, no CSS delay)
 * 2. GPU acceleration from initial render (transform3d)
 * 3. Inline critical styles (no external CSS dependency)
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.size - Size: 'sm' | 'md' | 'lg'
 * @param {string} props.blur - Blur strength: 'light' | 'medium' | 'strong'
 * @param {Function} props.onClick - Click handler
 */
export default function GlassButton({
  children = <Play size={24} className="text-white ml-1" fill="white" />,
  size = 'lg',
  blur = 'strong',
  onClick,
}) {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  }

  const blurValues = {
    light: 20,
    medium: 40,
    strong: 50,
  }

  return (
    <button
      onClick={onClick}
      className={`glass-button ${sizes[size]}`}
      style={{
        /* Critical inline styles – no CSS loading delay */
        '--glass-blur': `${blurValues[blur]}px`,
        '--glass-bg': 'rgba(255, 255, 255, 0.1)',
        '--glass-border': 'rgba(255, 255, 255, 0.2)',
        '--glass-hover': 'rgba(255, 255, 255, 0.2)',
      } as React.CSSProperties}
    >
      {/* Pseudo-element does the blur work */}
      <style>{`
        .glass-button {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background-color: var(--glass-bg);
          border: 1px solid var(--glass-border);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          transition: background-color 0.3s, transform 0.3s;
          /* GPU acceleration from first paint */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          will-change: transform;
        }

        /* Pseudo-element with blur – separate layer, no delay */
        .glass-button::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 9999px;
          background: inherit;
          backdrop-filter: blur(var(--glass-blur));
          -webkit-backdrop-filter: blur(var(--glass-blur));
          z-index: -1;
          /* Promote to GPU layer immediately */
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }

        .glass-button:hover {
          background-color: var(--glass-hover);
          transform: translateZ(0) scale(1.05);
          -webkit-transform: translateZ(0) scale(1.05);
        }

        .glass-button:active {
          transform: translateZ(0) scale(0.98);
          -webkit-transform: translateZ(0) scale(0.98);
        }
      `}</style>
      {children}
    </button>
  )
}
