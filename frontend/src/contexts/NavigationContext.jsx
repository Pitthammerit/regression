import { createContext, useContext, useState, useCallback } from 'react'

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
      // FAQ: Accordion öffnen + scrollen (verzögert für Sidecar Close Animation)
      const index = parseInt(anchor.replace('#faq-', ''), 10)
      if (!isNaN(index) && index >= 0) {
        setExpandedFAQIndex(index)
        // Scroll nach Sidecar Close (500ms)
        setTimeout(() => {
          const el = document.querySelector(anchor)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 500)
      }
    } else if (anchor === '#faq') {
      // "Mehr Antworten": Accordions schließen + scrollen (verzögert für Sidecar Close)
      setExpandedFAQIndex(null)
      setTimeout(() => {
        const el = document.querySelector(anchor)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 500)
    } else {
      // Alle anderen: Scroll nach Sidecar Close (500ms)
      setTimeout(() => {
        const el = document.querySelector(anchor)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 500)
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
