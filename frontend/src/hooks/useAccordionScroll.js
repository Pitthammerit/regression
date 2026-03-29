import { useCallback, useRef } from 'react'

/**
 * Check if element is visible in viewport
 * @param {Element} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isElementInViewport(element) {
  if (!element) return false
  const rect = element.getBoundingClientRect()
  // Element is visible if its top is within viewport (with small buffer)
  return rect.top >= 0 && rect.top <= window.innerHeight
}

/**
 * Reusable hook for accordion scroll behavior with robust visibility checking
 *
 * Features:
 * - Uses clicked element as scroll target (no data-testid lookup needed)
 * - Only scrolls if target is outside viewport
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

    // Wait for transition on clicked element, then scroll if needed
    if (clickedElement && !wasOpen) {
      const handleTransitionEnd = () => {
        // Clean up scroll listener
        window.removeEventListener('scroll', handleUserScroll)

        // Skip if user scrolled manually during animation
        if (userScrolledRef.current) {
          return
        }

        // Only scroll if element is not already visible
        if (!isElementInViewport(clickedElement)) {
          clickedElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          })
        }

        clickedElement.removeEventListener('transitionend', handleTransitionEnd)
      }

      // Add timeout fallback in case transitionend doesn't fire
      const timeoutId = setTimeout(() => {
        window.removeEventListener('scroll', handleUserScroll)
        clickedElement.removeEventListener('transitionend', handleTransitionEnd)
      }, 1000) // 500ms transition + 500ms buffer

      clickedElement.addEventListener('transitionend', handleTransitionEnd, { once: true })
    }
  }, [openId, setOpenId])

  return toggleWithScroll
}
