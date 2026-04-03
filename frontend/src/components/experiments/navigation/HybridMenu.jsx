// Variante 2: Hybrid (Desktop Inline + Mobile Vollbild)
import React, { useState, useRef, useEffect } from 'react'
import { X, ChevronDown, ChevronRight, Menu } from 'lucide-react'
import { menu } from '../../content'

export default function HybridMenu({ isOpen, onClose }) {
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [desktopDropdown, setDesktopDropdown] = useState(null)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDesktopDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(categoryId)
    }
  }

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

      {/* Navigation */}
      <nav className="max-w-content mx-auto px-6 py-12">
        <div className="space-y-2">
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
                className="w-full flex items-center justify-between py-4 text-left font-serif text-3xl md:text-5xl text-white hover:text-color-accent transition-colors"
              >
                <span>{item.label}</span>
                {item.children && (
                  <ChevronRight
                    className={`transition-transform duration-300 ${
                      expandedCategory === item.id ? 'rotate-90' : ''
                    }`}
                    size={28}
                  />
                )}
              </button>

              {/* Unterpunkte (Accordion) */}
              {item.children && expandedCategory === item.id && (
                <div
                  className="pl-8 md:pl-12 pt-2 pb-4 space-y-3"
                  style={{ animation: 'slideDown 0.3s ease-out' }}
                >
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => handleNavClick(child.anchor)}
                      className="block w-full text-left font-primary text-lg md:text-xl text-white/60 hover:text-white transition-colors py-2"
                    >
                      {child.label}
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
          className="block w-full bg-brand-green text-brand-deep font-primary text-sm uppercase tracking-widest py-4 rounded-full text-center hover:opacity-90 transition-opacity"
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
