import { useCallback, useRef } from 'react'

/**
 * Reusable hook for accordion scroll behavior with robust multi-transition handling
 *
 * Features:
 * - Targets portrait container (not button) for accurate scroll position
 * - Waits for ALL transitions to complete using RAF polling (not unreliable transitionend)
 * - Handles dual transitions: AccordionWrap (0fr→1fr, 500ms) + AnimatedAspectRatio (1:1→3:4, 500ms)
 * - Uses exact scroll calculation with window.scrollTo() instead of scrollIntoView
 * - Only scrolls if element is outside viewport
 * - Waits for DOM stability during state transitions (close one, open another)
 * - Respects user scroll during animation (skips if user scrolled manually)
 *
 * CRITICAL FIXES (March 2026):
 * - Fixed: Race condition from waiting for only one transitionend event
 * - Fixed: Wrong scroll target (button container instead of portrait container)
 * - Fixed: block='nearest' inadequate (now uses exact calculation with 100px offset)
 * - Fixed: State transition chaos when closing one accordion and opening another
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

    // Wait for transitions, then scroll with accurate target
    if (clickedElement && !wasOpen) {
      // Find the ACTUAL scroll target: portrait container with transition-all
      // This is the element that contains the portrait image, not the button
      const portraitContainer = clickedElement.querySelector('[class*="transition-all"]') || clickedElement

      /**
       * Wait for DOM stability using RAF polling
       *
       * Why polling instead of transitionend?
       * - Multiple simultaneous transitions (AccordionWrap + AnimatedAspectRatio)
       * - transitionend fires for EACH transition separately
       * - Race condition: we might catch the first transitionend before the second completes
       * - Polling ensures we wait for ALL animations to finish
       *
       * We check for height stability: if height doesn't change for 5 consecutive frames,
       * we consider the DOM stable and ready for scrolling.
       */
      const waitForStability = () => {
        return new Promise(resolve => {
          let stableFrames = 0
          let lastHeight = 0
          let frameCount = 0
          const maxFrames = 60 // ~1 second at 60fps

          const checkHeight = () => {
            frameCount++

            const currentHeight = portraitContainer.getBoundingClientRect().height

            // Check if height is stable (within 1px tolerance)
            if (Math.abs(currentHeight - lastHeight) < 1) {
              stableFrames++
              // Require 5 consecutive stable frames (约83ms at 60fps)
              if (stableFrames > 5) {
                resolve()
                return
              }
            } else {
              // Height changed, reset stability counter
              stableFrames = 0
            }

            lastHeight = currentHeight

            // Continue polling if not at max frames
            if (frameCount < maxFrames) {
              requestAnimationFrame(checkHeight)
            } else {
              // Timeout fallback after ~1 second
              resolve()
            }
          }

          // Start polling after a brief delay to let transitions begin
          setTimeout(() => {
            requestAnimationFrame(checkHeight)
          }, 50)
        })
      }

      // Execute scroll after DOM stabilizes
      waitForStability().then(() => {
        // Clean up scroll listener
        window.removeEventListener('scroll', handleUserScroll)

        // Skip if user scrolled manually during animation
        if (userScrolledRef.current) {
          return
        }

        // Check if element is already in viewport
        const rect = portraitContainer.getBoundingClientRect()
        const buffer = 100 // 100px offset from top
        const isInViewport = rect.top >= buffer && rect.top <= window.innerHeight - buffer

        if (!isInViewport) {
          /**
           * Use exact scroll calculation instead of scrollIntoView
           *
           * Why not scrollIntoView with block='nearest'?
           * - 'nearest' means "minimum scroll to show element"
           * - If element is already visible, no scroll happens (even if partially off-screen)
           * - 'nearest' doesn't account for our 100px offset properly
           *
           * Exact calculation:
           * - scrollTop = current scrollY + element's top offset - 100px buffer
           * - Guarantees element appears with 100px spacing from top
           */
          const scrollTop = window.scrollY + rect.top - buffer

          window.scrollTo({
            top: Math.max(0, scrollTop), // Ensure we don't scroll to negative position
            behavior: 'smooth'
          })
        }
      })
    } else {
      // Clean up scroll listener if not opening
      setTimeout(() => {
        window.removeEventListener('scroll', handleUserScroll)
      }, 100)
    }
  }, [openId, setOpenId])

  return toggleWithScroll
}
