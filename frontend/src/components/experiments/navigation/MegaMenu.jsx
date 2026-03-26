// Variante 3: Mega Menu (Hover Dropdown)
import React, { useState, useRef, useEffect } from 'react'
import { X, ChevronDown, Menu } from 'lucide-react'
import { menu } from '../../content/menu'

export default function MegaMenu({ isOpen, onClose }) {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownRefs = useRef({})

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      Object.values(dropdownRefs.current).forEach(ref => {
        if (ref && !ref.contains(e.target)) {
          setActiveDropdown(null)
        }
      })
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavClick = (anchor) => {
    onClose()
    const el = document.querySelector(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-brand-deep"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      {/* Header: Close Button */}
      <div className="flex justify-end p-6">
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Menü schließen"
        >
          <X size={32} className="text-white" />
        </button>
      </div>

      {/* Navigation - Mobile Stacked */}
      <nav className="max-w-content mx-auto px-6 py-12">
        <div className="space-y-2">
          {menu.items.map((item) => (
            <div key={item.id}>
              {/* Hauptkategorie */}
              <button
                onClick={() => {
                  if (item.children) {
                    setActiveDropdown(activeDropdown === item.id ? null : item.id)
                  } else {
                    handleNavClick(item.anchor)
                  }
                }}
                className="w-full flex items-center justify-between py-4 text-left font-serif text-3xl md:text-5xl text-white hover:text-color-accent transition-colors"
              >
                <span>{item.label}</span>
                {item.children && (
                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      activeDropdown === item.id ? 'rotate-180' : ''
                    }`}
                    size={28}
                  />
                )}
              </button>

              {/* Mega Menu Content */}
              {item.children && activeDropdown === item.id && (
                <div
                  className="pl-8 md:pl-12 pt-2 pb-4 grid md:grid-cols-3 gap-6"
                  style={{ animation: 'slideDown 0.3s ease-out' }}
                >
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => handleNavClick(child.anchor)}
                      className="text-left p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="font-sans text-lg text-white mb-1">{child.label}</div>
                      <div className="font-sans text-sm text-white/40">{child.anchor}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-white/10 mt-2" />
            </div>
          ))}
        </div>
      </nav>

      {/* Footer: CTA im Menu */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
        <a
          href={menu.header.cta.anchor}
          onClick={(e) => {
            e.preventDefault()
            handleNavClick(menu.header.cta.anchor)
          }}
          className="block w-full bg-brand-green text-brand-deep font-sans text-sm uppercase tracking-widest py-4 rounded-full text-center hover:opacity-90 transition-opacity"
        >
          {menu.header.cta.label}
        </a>
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
    </div>
  )
}
