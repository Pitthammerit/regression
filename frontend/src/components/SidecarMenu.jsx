import React, { useEffect, useRef } from 'react'
import { menu } from '../content/menu'
import CtaButton from './ui/CtaButton'
import DebugLabel from './ui/DebugLabel'
import { useNavigation } from '../contexts/NavigationContext'

export default function SidecarMenu({ isOpen, onClose, debugMode = false }) {
  const [isClosing, setIsClosing] = React.useState(false)
  const closeTimeoutRef = useRef(null)
  const { navigateTo, isBurgerClosing } = useNavigation()

  // Animation wird von beiden Close-Wegen gesteuert
  const shouldAnimateOut = isClosing || isBurgerClosing

  // Backdrop wird während Animation gerendert
  const isBackdropVisible = isOpen || shouldAnimateOut

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
    navigateTo(anchor) // Use centralized navigation
  }

  if (!isOpen && !isClosing && !isBurgerClosing) return null

  return (
    <>
      {/* Backdrop mit Blur (16px) - animation (fade-in) + transition (fade-out) */}
      {isBackdropVisible && (
        <div
          className={`fixed inset-0 bg-black/20 backdrop-blur z-[60] ${
            shouldAnimateOut
              ? 'opacity-0 transition-opacity duration-[400ms] md:duration-[900ms] ease-out'  // Fade-Out: 400ms mobile, 900ms desktop
              : 'opacity-100 animate-[fadeIn_250ms_ease-in]'              // Fade-In: 250ms ease-in (keyframe animation)
          }`}
          onClick={handleClose}
        />
      )}

      {/* Sidecar Panel - slide in/out animation - schmaler wie Transcript */}
      <div
        className="fixed top-0 right-0 h-full w-full 900:w-[380px] bg-color-bg-light shadow-2xl z-[70] flex flex-col"
        style={{
          animation: shouldAnimateOut
            ? 'slideOutToRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
            : 'slideInFromRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
        }}
      >
        {/* Header - Floating Burger übernimmt Schließen */}
        <div className="flex items-center px-8 py-2">
          <DebugLabel type="h2" debugMode={debugMode}>
            <h2 className="font-secondary text-h2 text-color-primary leading-tight">
              Überblick
            </h2>
          </DebugLabel>
        </div>

        {/* Navigation - Alle Kategorien immer aufgeklappt, minimale Abstände */}
        <nav className="flex-1 overflow-y-auto px-5 py-2">
          <div className="grid grid-cols-2 900:grid-cols-1 gap-x-6 gap-y-0">
            {menu.items.map((item, index) => (
              <div key={item.id} className={index > 0 ? 'mt-4' : ''}>
                {item.children ? (
                  <>
                    <DebugLabel type="menu-text" debugMode={debugMode}>
                      <div className="font-primary text-menu-text text-color-primary leading-[1.6] py-0.5">
                        {item.label}
                      </div>
                    </DebugLabel>
                    <div className="pl-3 pb-1 space-y-0">
                      {item.children.map((child) => (
                        <DebugLabel key={child.id} type="menu-text" debugMode={debugMode}>
                          <button
                            onClick={() => handleNavClick(child.anchor)}
                            className="block w-full text-left font-primary text-menu-text text-color-text hover:text-color-primary leading-[1.6] py-0.5 px-2 rounded hover:bg-black/5 transition-colors"
                          >
                            {child.label}
                          </button>
                        </DebugLabel>
                      ))}
                    </div>
                  </>
                ) : (
                  <DebugLabel type="menu-text" debugMode={debugMode}>
                    <button
                      onClick={() => handleNavClick(item.anchor)}
                      className="w-full text-left font-primary text-menu-text text-color-primary hover:text-color-secondary leading-[1.6] py-0.5 transition-colors"
                    >
                      {item.label}
                    </button>
                  </DebugLabel>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Footer - CTA Button */}
        <div className="px-8 py-4">
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
