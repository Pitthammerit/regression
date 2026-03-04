import React, { useState, useMemo } from 'react'

const R2_HOSTNAME = 'pub-d53492a253b841429ca6f2f9281daf17.r2.dev'
const DEFAULT_QUALITY = 80

/**
 * Generate a Cloudflare Image Resizing URL for R2-hosted images.
 * Non-R2 URLs are returned unchanged.
 *
 * @param {string} url - Original image URL
 * @param {number} width - Desired width
 * @param {number} quality - Image quality (1-100, default 80)
 * @returns {string} Optimized URL
 */
function getOptimizedUrl(url, width, quality = DEFAULT_QUALITY) {
  try {
    const urlObj = new URL(url)

    // Only apply to R2-hosted images
    if (urlObj.hostname === R2_HOSTNAME) {
      const params = `width=${width},quality=${quality},format=auto`
      urlObj.pathname = `/cdn-cgi/image/${params}${urlObj.pathname}`
    }

    return urlObj.toString()
  } catch {
    // If URL parsing fails, return original
    return url
  }
}

/**
 * Generate srcset with multiple widths for responsive images.
 * Only applies to R2 URLs; external URLs return null.
 *
 * @param {string} src - Image source URL
 * @param {number[]} widths - Array of widths to generate
 * @returns {string|null} Srcset string or null (for external URLs)
 */
function generateSrcSet(src, widths) {
  if (!src) return null

  try {
    const urlObj = new URL(src)

    // Don't generate srcset for non-R2 URLs
    if (urlObj.hostname !== R2_HOSTNAME) {
      return null
    }

    return widths
      .map(width => `${getOptimizedUrl(src, width)} ${width}w`)
      .join(', ')
  } catch {
    return null
  }
}

/**
 * Default width presets based on common use cases
 */
const WIDTH_PRESETS = {
  avatar: [48, 96, 200],
  thumbnail: [200, 400],
  card: [400, 800, 1200],
  full: [1200, 1600, 2000],
}

/**
 * LazyImage — progressive loading with Cloudflare Image Resizing
 *
 * Features:
 * - Native loading="lazy" + decoding="async"
 * - Opacity 0 → 1 transition on load
 * - Automatic Cloudflare Image Resizing for R2-hosted images
 * - Responsive srcset for optimal loading at any viewport
 * - Prevents layout shift (set width/height or aspectRatio via className)
 *
 * @param {Object} props
 * @param {string} props.src - Image URL (R2 or external)
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.className - CSS classes
 * @param {Object} props.style - Inline styles
 * @param {React.ReactNode} props.fallback - Fallback content on error
 * @param {number[]} props.widths - Custom widths for srcset (overrides preset)
 * @param {string} props.preset - Use 'avatar', 'thumbnail', 'card', or 'full'
 * @param {number} props.quality - Image quality (1-100, default 80)
 * @param {number} props.width - Intrinsic width for the sizes attribute
 * @param {string} props.sizes - Responsive sizes attribute (e.g., "(max-width: 768px) 100vw, 50vw")
 */
export default function LazyImage({
  src,
  alt = '',
  className = '',
  style = {},
  fallback = null,
  widths = null,
  preset = 'card',
  quality = DEFAULT_QUALITY,
  width = null,
  sizes: sizesProp = null,
  ...props
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Determine which widths to use
  const srcSetWidths = widths || WIDTH_PRESETS[preset] || WIDTH_PRESETS.card

  // Generate srcset and optimized src
  const { srcSet, optimizedSrc, sizes } = useMemo(() => {
    const generatedSrcSet = generateSrcSet(src, srcSetWidths)

    // Calculate sizes attribute based on width prop
    let calculatedSizes = sizesProp
    if (!calculatedSizes && width) {
      // If width is provided, create a simple sizes attribute
      calculatedSizes = `(max-width: ${width}px) 100vw, ${width}px`
    } else if (!calculatedSizes) {
      // Default: assume full width on mobile, 50% on larger screens
      calculatedSizes = '(max-width: 768px) 100vw, 50vw'
    }

    return {
      srcSet: generatedSrcSet,
      optimizedSrc: getOptimizedUrl(src, srcSetWidths[Math.floor(srcSetWidths.length / 2)], quality),
      sizes: calculatedSizes,
    }
  }, [src, srcSetWidths, quality, width, sizesProp])

  if (error && fallback) return fallback

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet || undefined}
      sizes={srcSet ? sizes : undefined}
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
