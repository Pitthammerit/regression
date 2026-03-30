import { useCallback, useRef } from 'react'

/**
 * Check if element is visible in viewport with buffer
 * @param {Element} element - Element to check
 * @param {number} buffer - Buffer in pixels (default: 100px for offset)
 * @returns {boolean} True if element is in viewport
 */
function isElementInViewport(element, buffer = 100) {
  if (!element) return false
  const rect = element.getBoundingClientRect()
  // Element is visible if its top is within viewport (with buffer)
  return rect.top >= 0 && rect.top <= window.innerHeight - buffer
}

/**
 * Reusable hook for accordion scroll behavior with fresh position calculation
 *
 * Features:
 * - Uses clicked element as scroll target (no data-testid lookup needed)
 * - Calculates FRESH position AFTER transition (not before)
 * - Uses scrollIntoView with block='nearest' for intelligent positioning
 * - Only scrolls if element is outside viewport
 * - Uses CSS scrollMarginTop for 100px offset
 * - Waits for accordion animation to complete (transitionend event)
 * - Respects user scroll during animation (skips if user scrolled manually)
 *
 * @param {number|string|null} openId - Currently open accordion ID (index or string ID)
 * @param {Function} setOpenId - Setter for open ID
 * @returns {Function} Enhanced toggle function with scroll behavior
 *
 * @example
 * ```jsx
 * const toggleExpand = useAccordionScroll(expandedId, setExpandedId)
 *
 * // In your onClick handler:
 * onClick={(e) => toggleExpand(id, e)}
 * ```
 */
export function useAccordionScroll(openId, setOpenId) {
  const userScrolledRef = useRef(false)
  const scrollStartYRef = useRef(0)

  const toggleWithScroll = useCallback((id, event) => {
    const wasOpen = openId === id
    const clickedElement = event?.target.closest('[data-testid]')

    // Track scroll position to detect user scroll during animation
    scrollStartYRef.current = window.scrollY
    userScrolledRef.current = false

    // Listen for user scroll during animation
    const handleUserScroll = () => {
      if (Math.abs(window.scrollY - scrollStartYRef.current) > 10) {
        userScrolledRef.current = true
      }
    }
    window.addEventListener('scroll', handleUserScroll, { passive: true })

    // Toggle accordion state
    setOpenId(wasOpen ? (typeof openId === 'number' ? -1 : null) : id)

    // Wait for transition, then scroll with FRESH position calculation
    if (clickedElement && !wasOpen) {
      const handleTransitionEnd = () => {
        // Clean up scroll listener
        window.removeEventListener('scroll', handleUserScroll)

        // Skip if user scrolled manually during animation
        if (userScrolledRef.current) {
          return
        }

        // Calculate FRESH position AFTER transition (not before)
        // This fixes the edge case where user scrolls between actions
        const isInViewport = isElementInViewport(clickedElement, 100)

        if (!isInViewport) {
          // Use CSS scrollMarginTop for 100px offset
          const originalScrollMarginTop = clickedElement.style.scrollMarginTop
          clickedElement.style.scrollMarginTop = '100px'

          // Use scrollIntoView with 'nearest' for intelligent positioning
          clickedElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest'
          })

          // Restore original scrollMarginTop after scroll completes
          setTimeout(() => {
            clickedElement.style.scrollMarginTop = originalScrollMarginTop
          }, 1000)
        }

        clickedElement.removeEventListener('transitionend', handleTransitionEnd)
      }

      // Add timeout fallback in case transitionend doesn't fire
      setTimeout(() => {
        window.removeEventListener('scroll', handleUserScroll)
        clickedElement.removeEventListener('transitionend', handleTransitionEnd)
      }, 1000) // 500ms transition + 500ms buffer

      clickedElement.addEventListener('transitionend', handleTransitionEnd, { once: true })
    }
  }, [openId, setOpenId])

  return toggleWithScroll
}
