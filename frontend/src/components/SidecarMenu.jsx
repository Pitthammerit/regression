import React, { useState } from 'react'
import { X, ChevronRight } from 'lucide-react'
import { menu } from '../content/menu'
import CtaButton from './ui/CtaButton'

export default function SidecarMenu({ isOpen, onClose }) {
  const [expandedCategory, setExpandedCategory] = useState(null)

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id)
  }

  const handleNavClick = (anchor) => {
    onClose()
    const el = document.querySelector(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop with blur - fade in */}
      <div
        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-md"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      />

      {/* Sidecar Panel - slide in from right (slower, smooth) */}
      <div
        className="fixed top-0 right-0 h-full w-full md:w-1/2 bg-brand-cream shadow-2xl z-50 flex flex-col"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-black/8">
          <h2 className="font-serif text-2xl text-brand-deep leading-tight">
            Menü
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:opacity-50 transition-opacity"
            aria-label="Menü schließen"
          >
            <X size={20} className="text-brand-deep" />
          </button>
        </div>

        {/* Navigation - Accordion */}
        <nav className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-1">
            {menu.items.map((item) => (
              <div key={item.id}>
                {/* Hauptkategorie */}
                <button
                  onClick={() => {
                    if (item.children) {
                      toggleCategory(item.id)
                    } else {
                      handleNavClick(item.anchor)
                    }
                  }}
                  className="w-full flex items-center justify-between text-left font-serif text-xl text-brand-deep hover:text-brand-steel py-4 transition-colors"
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <ChevronRight
                      size={18}
                      className={`transition-transform duration-300 ${
                        expandedCategory === item.id ? 'rotate-90' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Unterpunkte (Accordion) - mit slideDown Animation */}
                {item.children && expandedCategory === item.id && (
                  <div
                    className="pl-4 pt-1 pb-3 space-y-1"
                    style={{ animation: 'slideDown 0.3s ease-out' }}
                  >
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => handleNavClick(child.anchor)}
                        className="block w-full text-left font-sans text-base text-brand-muted hover:text-brand-deep py-2 px-3 rounded-md hover:bg-black/5 transition-colors"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}

                <div className="h-px bg-black/8 mt-1" />
              </div>
            ))}
          </div>
        </nav>

        {/* Footer - CTA Button */}
        <div className="px-8 py-6 border-t border-black/8">
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
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
