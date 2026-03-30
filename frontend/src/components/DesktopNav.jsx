import { useState } from 'react'
import { menu } from '../content/menu'
import { useNavigation } from '../contexts/NavigationContext'
import DebugLabel from './ui/DebugLabel'

export default function DesktopNav({ debugMode = false }) {
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
            <DebugLabel type="menu-text" debugMode={debugMode}>
              <button
                className="px-3 py-2 font-primary text-menu-text text-color-text rounded hover:bg-color-bg-light transition-colors"
                onClick={() => !item.hasSubmenu && handleNavClick(item.anchor)}
              >
                {item.label}
              </button>
            </DebugLabel>

            {item.hasSubmenu && openIndex === index && (
              <ul className="absolute top-full left-0 min-w-[200px] bg-color-card-overlay backdrop-blur-[16px] rounded-lg shadow-xl border border-color-light py-1 z-50">
                {menu.items
                  .find(cat => cat.label === item.label)
                  ?.children.map((child) => (
                    <li key={child.id}>
                      <DebugLabel type="menu-text" debugMode={debugMode}>
                        <button
                          onClick={() => handleNavClick(child.anchor)}
                          className="block w-full text-left px-4 py-2 font-primary text-menu-text text-color-text hover:font-bold transition-all"
                        >
                          {child.label}
                        </button>
                      </DebugLabel>
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
