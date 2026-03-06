import React, { useEffect, useRef } from 'react'
import { menu } from '../content/menu'
import CtaButton from './ui/CtaButton'
import BurgerButton from './ui/BurgerButton'

export default function SidecarMenu({ isOpen, onClose }) {
  const [isClosing, setIsClosing] = React.useState(false)
  const closeTimeoutRef = useRef(null)

  // Handle close with animation
  const handleClose = () => {
    setIsClosing(true)
    // Wait for animation to complete, then actually close
    closeTimeoutRef.current = setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 500) // Match animation duration
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const handleNavClick = (anchor) => {
    handleClose() // Animate close
    const el = document.querySelector(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  if (!isOpen && !isClosing) return null

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-md"
        onClick={handleClose}
        style={{
          animation: isClosing ? 'fadeOut 0.3s ease-out forwards' : 'fadeIn 0.3s ease-out forwards'
        }}
      />

      {/* Sidecar Panel - slide in/out animation - schmaler wie Transcript */}
      <div
        className="fixed top-0 right-0 h-full w-full md:w-[380px] bg-brand-cream shadow-2xl z-50 flex flex-col"
        style={{
          animation: isClosing
            ? 'slideOutToRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
            : 'slideInFromRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
        }}
      >
        {/* Header - py-4 wie im Header für konsistente vertikale Position */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-black/8">
          <h2 className="font-serif text-xl text-brand-deep leading-tight">
            Menü
          </h2>
          <BurgerButton isOpen={true} onClick={handleClose} />
        </div>

        {/* Navigation - Alle Kategorien immer aufgeklappt, minimale Abstände */}
        <nav className="flex-1 overflow-y-auto px-5 py-3">
          <div className="space-y-0.5">
            {menu.items.map((item) => (
              <div key={item.id}>
                {/* Hauptkategorie */}
                {item.children ? (
                  // Kategorie mit Unterpunkten
                  <>
                    <div className="font-serif text-base text-brand-deep py-1">
                      {item.label}
                    </div>
                    {/* Unterpunkte - immer sichtbar, minimaler Abstand */}
                    <div className="pl-3 pb-1 space-y-0">
                      {item.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => handleNavClick(child.anchor)}
                          className="block w-full text-left font-sans text-sm text-brand-muted hover:text-brand-deep py-1 px-2 rounded hover:bg-black/5 transition-colors"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  // Kategorie ohne Unterpunkte - direkt klickbar
                  <button
                    onClick={() => handleNavClick(item.anchor)}
                    className="w-full text-left font-serif text-base text-brand-deep hover:text-brand-steel py-1 transition-colors"
                  >
                    {item.label}
                  </button>
                )}

                <div className="h-px bg-black/8" />
              </div>
            ))}
          </div>
        </nav>

        {/* Footer - CTA Button */}
        <div className="px-8 py-4 border-t border-black/8">
          <CtaButton
            label={menu.header.cta.label}
            variant="primary"
            onClick={() => handleNavClick(menu.header.cta.anchor)}
            className="w-full"
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes slideInFromRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideOutToRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
      `}</style>
    </>
  )
}
