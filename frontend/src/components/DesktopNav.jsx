import { useState } from 'react'
import { menu } from '../content/menu'
import { useNavigation } from '../contexts/NavigationContext'

export default function DesktopNav() {
  const { navigateTo } = useNavigation()
  const [openIndex, setOpenIndex] = useState(null)

  const handleNavClick = (anchor) => {
    navigateTo(anchor)
    setOpenIndex(null)
  }

  return (
    <nav className="flex items-center justify-center flex-1">
      <ul className="flex items-center gap-1">
        {menu.header.mainNav.map((item, index) => (
          <li
            key={item.label}
            className="relative"
            onMouseEnter={() => item.hasSubmenu && setOpenIndex(index)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            <button
              className="px-3 py-2 text-sm font-medium text-brand-body rounded hover:bg-brand-cream transition-colors"
              onClick={() => !item.hasSubmenu && handleNavClick(item.anchor)}
            >
              {item.label}
            </button>

            {item.hasSubmenu && openIndex === index && (
              <ul className="absolute top-full left-0 min-w-[200px] bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-black/5 py-1 z-50">
                {menu.items
                  .find(cat => cat.label === item.label)
                  ?.children.map((child) => (
                    <li key={child.id}>
                      <button
                        onClick={() => handleNavClick(child.anchor)}
                        className="block w-full text-left px-4 py-2 text-sm text-brand-body hover:bg-brand-cream transition-colors"
                      >
                        {child.label}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
