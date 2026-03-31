/**
 * Reusable smooth scroll animations
 */

/**
 * Smooth scroll to a selector with configurable delay and duration
 * @param {string} selector - CSS selector for target element
 * @param {Object} options - Configuration options
 * @param {number} options.delay - Delay before scroll starts (ms)
 * @param {number} options.duration - Scroll duration (ms)
 * @param {string} options.block - Scroll alignment ('start', 'center', 'end', 'nearest')
 */
export function smoothScrollTo(selector, options = {}) {
  const {
    delay = 0,
    duration = 1000,
    block = 'start',
    offset = 0
  } = options

  setTimeout(() => {
    const target = document.querySelector(selector)
    if (!target) return

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition

    // Cancel any existing scroll animations
    if (window._scrollAnimationId) {
      cancelAnimationFrame(window._scrollAnimationId)
    }

    // Disable scroll-snap during programmatic scroll
    const originalSnapType = document.documentElement.style.scrollSnapType
    document.documentElement.style.scrollSnapType = 'none'

    let startTime = null

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      // Easing function (ease-in-out)
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2

      window.scrollTo(0, startPosition + distance * ease)

      if (progress < 1) {
        window._scrollAnimationId = requestAnimationFrame(animation)
      } else {
        // Re-enable scroll-snap after animation completes (plus buffer)
        setTimeout(() => {
          document.documentElement.style.scrollSnapType = originalSnapType || 'y mandatory'
        }, 100)
      }
    }

    window._scrollAnimationId = requestAnimationFrame(animation)
  }, delay)
}

/**
 * Preset scroll animations
 */
export const scrollPresets = {
  /** Fast scroll (500ms) */
  fast: (selector, options = {}) => smoothScrollTo(selector, { ...options, duration: 500 }),

  /** Normal scroll (1000ms) */
  normal: (selector, options = {}) => smoothScrollTo(selector, { ...options, duration: 1000 }),

  /** Slow scroll (2000ms) - half speed */
  slow: (selector, options = {}) => smoothScrollTo(selector, { ...options, duration: 2000 }),

  /** Very slow scroll (3000ms) */
  verySlow: (selector, options = {}) => smoothScrollTo(selector, { ...options, duration: 3000 }),
}
