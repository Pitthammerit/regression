import { useCallback } from 'react'

/**
 * Reusable hook for accordion scroll behavior
 * Scrolls to target with 100px offset after 600ms (accordion animation duration)
 *
 * @param {number|null} openIndex - Currently open accordion index
 * @param {Function} setOpenIndex - Setter for open index
 * @param {string} testIdPrefix - Prefix for data-testid attributes (e.g., "case-accordion", "faq")
 * @returns {Function} Enhanced toggle function with scroll behavior
 */
export function useAccordionScroll(openIndex, setOpenIndex, testIdPrefix) {
  const toggleWithScroll = useCallback((index) => {
    const wasOpen = openIndex === index
    const targetIndex = wasOpen ? 0 : index // Scroll to first (0) when closing, or current when opening

    setOpenIndex(wasOpen ? -1 : index)

    // Wait for accordion animation (600ms), then scroll
    setTimeout(() => {
      const target = document.querySelector(`[data-testid="${testIdPrefix}-${targetIndex}"]`)
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }, 600)
  }, [openIndex, setOpenIndex, testIdPrefix])

  return toggleWithScroll
}
