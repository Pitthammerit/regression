import React, { useState } from 'react'

/**
 * LazyImage — progressive loading without image optimization
 *
 * Features:
 * - Native loading="lazy" + decoding="async"
 * - Opacity 0 → 1 transition on load
 * - Direct R2 URLs (no optimization - images are served as-is)
 * - Error handling with optional fallback
 *
 * Note: Images should be optimized before uploading to R2 using tools like:
 * - TinyPNG (https://tinypng.com/)
 * - Squoosh (https://squoosh.app/)
 *
 * @param {Object} props
 * @param {string} props.src - Image URL (R2 or external)
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.className - CSS classes
 * @param {Object} props.style - Inline styles
 * @param {React.ReactNode} props.fallback - Fallback content on error
 * @param {string} props.sizes - Responsive sizes attribute (e.g., "(max-width: 768px) 100vw, 50vw")
 */
export default function LazyImage({
  src,
  alt = '',
  className = '',
  style = {},
  fallback = null,
  sizes = '(max-width: 768px) 100vw, 50vw',
  ...props
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (error && fallback) return fallback

  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading="lazy"
      decoding="async"
      className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={style}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      {...props}
    />
  )
}
