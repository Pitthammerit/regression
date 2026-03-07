// Variante 4: Anchor Strip (Slim Nav + Scroll Indicator)
import React from 'react'
import { X, Menu } from 'lucide-react'
import { menu } from '../../content/menu'

export default function AnchorStripMenu({ isOpen, onClose, activeSection }) {
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

      {/* Navigation - Simple List */}
      <nav className="max-w-content mx-auto px-6 py-12">
        <h2 className="font-serif text-2xl text-white/60 mb-8">Navigation</h2>
        <div className="grid md:grid-cols-2 gap-2">
          {menu.items.map((item) => (
            <React.Fragment key={item.id}>
              {/* Hauptkategorie */}
              <button
                onClick={() => handleNavClick(item.anchor)}
                className={`text-left font-serif text-xl md:text-2xl py-3 px-4 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-brand-green text-brand-deep'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>

              {/* Unterpunkte inline */}
              {item.children &&
                item.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => handleNavClick(child.anchor)}
                    className={`text-left font-sans text-base py-2 px-4 ml-4 rounded-lg transition-colors ${
                      activeSection === child.id
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {child.label}
                  </button>
                ))}
            </React.Fragment>
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
      `}</style>
    </div>
  )
}
