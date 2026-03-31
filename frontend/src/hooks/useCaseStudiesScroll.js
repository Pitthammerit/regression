import { useCallback, useRef } from 'react'

/**
 * Case Studies-specific scroll hook with section-level stability monitoring
 *
 * Unlike useAccordionScroll (designed for portrait sections with transition-all),
 * this hook is designed for Case Studies' structure:
 * - Targets case accordion button (not portrait container)
 * - Monitors SECTION height (not button height)
 * - Waits for full layout stability (previous case collapse + new case expand)
 * - Compensates for collapsing content height
 *
 * Case Studies uses small 24x24 avatars (no transition-all portrait containers),
 * so useAccordionScroll falls back to button targeting which doesn't account for
 * layout shifts from collapsing cases above.
 *
 * @param {number} openIndex - Currently expanded case index (-1 if none)
 * @param {Function} setOpenIndex - Setter for open index
 * @returns {Function} Enhanced toggle function with scroll behavior
 */
export function useCaseStudiesScroll(openIndex, setOpenIndex) {
  const userScrolledRef = useRef(false)
  const scrollStartYRef = useRef(0)

  const toggleWithScroll = useCallback((index, event) => {
    const wasOpen = openIndex === index
    const clickedElement = event?.target.closest('[data-testid^="case-accordion-"]')

    if (!clickedElement) return

    // Track scroll position to detect user scroll during animation
    scrollStartYRef.current = window.scrollY
    userScrolledRef.current = false

    const handleUserScroll = () => {
      if (Math.abs(window.scrollY - scrollStartYRef.current) > 10) {
        userScrolledRef.current = true
      }
    }
    window.addEventListener('scroll', handleUserScroll, { passive: true })

    // Toggle case state
    setOpenIndex(wasOpen ? -1 : index)

    // Wait for transitions, then scroll
    if (!wasOpen) {
      // Find the Cases section (for stability monitoring)
      const casesSection = document.querySelector('[data-testid="cases-section"]')
      if (!casesSection) {
        window.removeEventListener('scroll', handleUserScroll)
        return
      }

      // Find the case accordion button (our scroll target)
      const caseButton = clickedElement

      /**
       * Wait for SECTION-LEVEL stability
       *
       * Case Studies has two transitions:
       * 1. Previous case collapsing (500ms)
       * 2. New case expanding (500ms)
       *
       * Total: up to 1000ms for complete stability.
       * We monitor the SECTION height (not button height) to detect when all animations complete.
       */
      const waitForSectionStability = () => {
        return new Promise(resolve => {
          let stableFrames = 0
          let lastHeight = 0
          let frameCount = 0
          const maxFrames = 120 // ~2 seconds at 60fps (same as FAQ)

          const checkHeight = () => {
            frameCount++

            // Monitor SECTION height (changes as cases collapse/expand)
            const currentHeight = casesSection.getBoundingClientRect().height

            // Check if section height is stable (within 1px tolerance)
            if (Math.abs(currentHeight - lastHeight) < 1) {
              stableFrames++
              // Require 8 stable frames (~133ms) — more tolerance for layout shifts
              if (stableFrames > 8) {
                resolve()
                return
              }
            } else {
              // Section height changed, reset stability counter
              stableFrames = 0
            }

            lastHeight = currentHeight

            // Continue polling if not at max frames
            if (frameCount < maxFrames) {
              requestAnimationFrame(checkHeight)
            } else {
              // Timeout fallback after ~2 seconds
              resolve()
            }
          }

          // Start polling after transitions begin
          requestAnimationFrame(checkHeight)
        })
      }

      // Execute scroll after section stabilizes
      waitForSectionStability().then(() => {
        // Clean up scroll listener
        window.removeEventListener('scroll', handleUserScroll)

        // Skip if user scrolled manually during animation
        if (userScrolledRef.current) {
          return
        }

        if (caseButton) {
          // Bypass scroll-snap during programmatic scroll
          const originalSnapType = document.documentElement.style.scrollSnapType
          document.documentElement.style.scrollSnapType = 'none'

          const rect = caseButton.getBoundingClientRect()
          const buffer = 100 // 100px offset from top
          const scrollTop = window.scrollY + rect.top - buffer

          window.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          })

          // Re-enable scroll-snap after scroll completes (plus buffer)
          setTimeout(() => {
            document.documentElement.style.scrollSnapType = originalSnapType || 'y proximity'
          }, 800)
        }
      })
    } else {
      // Clean up scroll listener if closing
      setTimeout(() => {
        window.removeEventListener('scroll', handleUserScroll)
      }, 100)
    }
  }, [openIndex, setOpenIndex])

  return toggleWithScroll
}
