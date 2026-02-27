import React, { useState } from 'react'

/**
 * LazyImage — progressive loading with fade-in
 * - Native loading="lazy" + decoding="async"
 * - Opacity 0 → 1 transition on load
 * - Prevents layout shift (set width/height or aspectRatio via className)
 */
export default function LazyImage({ src, alt = '', className = '', style = {}, fallback = null, ...props }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (error && fallback) return fallback

  return (
    <img
      src={src}
      alt={alt}
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
