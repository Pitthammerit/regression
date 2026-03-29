import { useCallback } from 'react'

/**
 * Reusable hook for accordion scroll behavior
 * Scrolls to target with 100px offset after 600ms (accordion animation duration)
 *
 * @param {number|string|null} openId - Currently open accordion ID (index or string ID)
 * @param {Function} setOpenId - Setter for open ID
 * @param {string} testIdPrefix - Prefix for data-testid attributes (e.g., "case-accordion", "faq", "researcher")
 * @param {Array} items - Items array to get first item ID when closing
 * @returns {Function} Enhanced toggle function with scroll behavior
 */
export function useAccordionScroll(openId, setOpenId, testIdPrefix, items) {
  const toggleWithScroll = useCallback((id) => {
    const wasOpen = openId === id
    const targetId = wasOpen ? (items?.[0]?.id || 0) : id // Scroll to first item when closing, or current when opening

    setOpenId(wasOpen ? (typeof openId === 'number' ? -1 : null) : id)

    // Start scroll immediately for smoother transition
    // Scroll happens during accordion animation for more fluid feel
    setTimeout(() => {
      const target = document.querySelector(`[data-testid="${testIdPrefix}-${targetId}"]`)
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }, 50)
  }, [openId, setOpenId, testIdPrefix, items])

  return toggleWithScroll
}
