import React from 'react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { menu } from '../content/menu'

export default function DesktopNav() {
  const handleNavClick = (anchor) => {
    if (!anchor) return // Hauptkategorien ohne direkten anchor
    const el = document.querySelector(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <NavigationMenu.Root className="relative z-10 flex items-center justify-center flex-1">
      <NavigationMenu.List className="flex items-center gap-6 m-0 list-none">
        {menu.header.mainNav.map((item) => (
          <NavigationMenu.Item key={item.label}>
            {item.hasSubmenu ? (
              <>
                {/* Trigger mit Dropdown */}
                <NavigationMenu.Trigger className="group flex items-center gap-1 font-sans text-sm text-brand-body/60 hover:text-brand-deep transition-colors outline-none cursor-pointer">
                  {item.label}
                  <CaretDownIcon
                    className="text-brand-steel transition-transform duration-[250] ease-in group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>

                <NavigationMenu.Content className="absolute left-0 top-full mt-2 w-auto bg-white rounded-md shadow-[0_2px_10px] shadow-black/10 p-4 data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft">
                  <ul className="m-0 grid list-none gap-1 p-0 w-48">
                    {menu.items
                      .find(cat => cat.label === item.label)
                      ?.children.map((child) => (
                        <li key={child.id}>
                          <NavigationMenu.Link asChild>
                            <a
                              href={child.anchor}
                              onClick={(e) => {
                                e.preventDefault()
                                handleNavClick(child.anchor)
                              }}
                              className="block select-none rounded-md px-3 py-2 text-sm leading-none text-brand-body no-underline outline-none hover:bg-brand-cream hover:text-brand-deep transition-colors"
                            >
                              {child.label}
                            </a>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                  </ul>
                </NavigationMenu.Content>
              </>
            ) : (
              /* Direkter Link ohne Dropdown */
              <NavigationMenu.Link asChild>
                <a
                  href={item.anchor}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.anchor)
                  }}
                  className="font-sans text-sm text-brand-body/60 hover:text-brand-deep transition-colors no-underline outline-none"
                >
                  {item.label}
                </a>
              </NavigationMenu.Link>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      {/* Viewport für Radix UI Animation */}
      <div className="absolute left-0 top-full flex justify-center w-full">
        <NavigationMenu.Viewport className="relative overflow-hidden rounded-md bg-white shadow-[0_2px_10px] shadow-black/10 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn" />
      </div>
    </NavigationMenu.Root>
  )
}
