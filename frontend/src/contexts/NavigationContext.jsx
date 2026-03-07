import { createContext, useContext, useState, useCallback } from 'react'

/**
 * Custom smooth scroll with configurable duration (700ms)
 * Easing: ease-in-out for smooth acceleration/deceleration
 */
const smoothScrollTo = (element, options = {}) => {
  const { duration = 700, block = 'start' } = options

  if (!element) return

  const targetPosition = block === 'center'
    ? element.getBoundingClientRect().top + window.pageYOffset - (window.innerHeight / 2) + (element.offsetHeight / 2)
    : element.getBoundingClientRect().top + window.pageYOffset - 20

  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime = null

  // Ease-in-out cubic function
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)

    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress))

    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

const NavigationContext = createContext(null)

/**
 * NavigationProvider - Zentrale Navigation-Logic für die gesamte App
 *
 * Single Source of Truth für:
 * - FAQ Accordion State (expandedFAQIndex)
 * - Navigation-Logik (scroll + accordions öffnen/schließen)
 *
 * Wird von DesktopNav und SidecarMenu genutzt (keine Duplizierung mehr)
 */
export function NavigationProvider({ children }) {
  const [expandedFAQIndex, setExpandedFAQIndex] = useState(null)
  const [sidecarOpen, setSidecarOpen] = useState(false)
  const [isBurgerClosing, setIsBurgerClosing] = useState(false)

  const navigateTo = useCallback((anchor) => {
    if (!anchor) return

    if (anchor.startsWith('#faq-')) {
      // FAQ: Accordion öffnen + scrollen (sofort)
      const index = parseInt(anchor.replace('#faq-', ''), 10)
      if (!isNaN(index) && index >= 0) {
        setExpandedFAQIndex(index)
        // Scroll sofort mit 700ms Dauer
        const el = document.querySelector(anchor)
        if (el) smoothScrollTo(el, { duration: 700, block: 'center' })
      }
    } else if (anchor === '#faq') {
      // "Mehr Antworten": Accordions schließen + scrollen (sofort)
      setExpandedFAQIndex(null)
      const el = document.querySelector(anchor)
      if (el) smoothScrollTo(el, { duration: 700, block: 'start' })
    } else {
      // Alle anderen: Scroll sofort mit 700ms Dauer
      const el = document.querySelector(anchor)
      if (el) smoothScrollTo(el, { duration: 700 })
    }
  }, [])

  return (
    <NavigationContext.Provider value={{ navigateTo, expandedFAQIndex, setExpandedFAQIndex, sidecarOpen, setSidecarOpen, isBurgerClosing, setIsBurgerClosing }}>
      {children}
    </NavigationContext.Provider>
  )
}

/**
 * useNavigation Hook
 *
 * Gibt Zugriff auf die Navigation-Funktionen, FAQ-Index und Sidecar State
 *
 * @returns {Object} { navigateTo, expandedFAQIndex, setExpandedFAQIndex, sidecarOpen, setSidecarOpen, isBurgerClosing, setIsBurgerClosing }
 */
export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider')
  }
  return context
}
