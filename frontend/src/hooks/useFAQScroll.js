import { useCallback, useRef } from 'react'

/**
 * FAQ-specific scroll hook with section-level stability monitoring
 *
 * Unlike useAccordionScroll (designed for portrait sections with transition-all),
 * this hook is designed for FAQ's structure:
 * - Targets question container (not button)
 * - Monitors SECTION height (not button height)
 * - Waits for full layout stability (previous answer collapse + new answer expand)
 * - Compensates for collapsing content height
 *
 * @param {number} expandedIndex - Currently expanded FAQ index (null if none)
 * @param {Function} setExpandedIndex - Setter for expanded index
 * @returns {Function} Enhanced toggle function with scroll behavior
 */
export function useFAQScroll(expandedIndex, setExpandedIndex) {
  const userScrolledRef = useRef(false)
  const scrollStartYRef = useRef(0)

  const toggleWithScroll = useCallback((index, event) => {
    const wasOpen = expandedIndex === index
    const clickedElement = event?.target.closest('[data-testid^="faq-"]')

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

    // Toggle FAQ state
    setExpandedIndex(wasOpen ? null : index)

    // Wait for transitions, then scroll
    if (!wasOpen) {
      // Find the FAQ section (for stability monitoring)
      const faqSection = document.querySelector('[data-testid="faq-section"]')
      if (!faqSection) {
        window.removeEventListener('scroll', handleUserScroll)
        return
      }

      // Find the question container (the div with id="faq-{index}")
      const questionContainer = clickedElement.closest('[id^="faq-"]')

      /**
       * Wait for SECTION-LEVEL stability
       *
       * FAQ has two transitions:
       * 1. Previous answer collapsing (500ms)
       * 2. New answer expanding (500ms)
       *
       * Total: up to 1000ms for complete stability.
       * We monitor the SECTION height (not button height) to detect when all animations complete.
       */
      const waitForSectionStability = () => {
        return new Promise(resolve => {
          let stableFrames = 0
          let lastHeight = 0
          let frameCount = 0
          const maxFrames = 120 // ~2 seconds at 60fps (longer than portrait sections)

          const checkHeight = () => {
            frameCount++

            // Monitor SECTION height (changes as answers collapse/expand)
            const currentHeight = faqSection.getBoundingClientRect().height

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

        if (questionContainer) {
          const rect = questionContainer.getBoundingClientRect()
          const buffer = 100 // 100px offset from top
          const scrollTop = window.scrollY + rect.top - buffer

          window.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          })
        }
      })
    } else {
      // Clean up scroll listener if closing
      setTimeout(() => {
        window.removeEventListener('scroll', handleUserScroll)
      }, 100)
    }
  }, [expandedIndex, setExpandedIndex])

  return toggleWithScroll
}
