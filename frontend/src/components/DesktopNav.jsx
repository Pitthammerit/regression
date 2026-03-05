import React from 'react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { menu } from '../content/menu'

const ListItem = ({ anchor, className = '', children }) => {
  const handleNavClick = (e) => {
    e.preventDefault()
    const el = document.querySelector(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <li>
      <NavigationMenu.Link asChild>
        <a
          href={anchor}
          onClick={handleNavClick}
          className={`block select-none rounded-md p-3 text-sm leading-none text-brand-body no-underline outline-none hover:bg-brand-cream hover:text-brand-deep transition-colors cursor-pointer ${className}`}
        >
          {children}
        </a>
      </NavigationMenu.Link>
    </li>
  )
}

export default function DesktopNav({ onSidecarOpen }) {
  const handleNavClick = (anchor) => {
    if (!anchor) return
    const el = document.querySelector(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <NavigationMenu.Root className="relative z-10 flex items-center justify-center flex-1">
      <NavigationMenu.List className="center m-0 flex list-none">
        {menu.header.mainNav.map((item) => (
          <NavigationMenu.Item key={item.label}>
            {item.hasSubmenu ? (
              <>
                {/* Trigger mit Dropdown */}
                <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-sm font-medium leading-none text-brand-body outline-none hover:bg-brand-cream focus:shadow-[0_0_0_2px] focus:shadow-brand-deep/20">
                  {item.label}
                  <CaretDownIcon
                    className="relative top-px text-brand-steel transition-transform duration-[250] ease-in group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>

                <NavigationMenu.Content className="absolute left-0 top-0 data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft md:w-auto">
                  <ul className="one m-0 grid list-none gap-x-2.5 p-[22px] sm:w-[400px]">
                    {menu.items
                      .find(cat => cat.label === item.label)
                      ?.children.map((child) => (
                        <ListItem key={child.id} anchor={child.anchor}>
                          {child.label}
                        </ListItem>
                      ))}
                  </ul>
                </NavigationMenu.Content>
              </>
            ) : (
              /* Direkter Link ohne Dropdown */
              <NavigationMenu.Link
                className="block select-none rounded px-3 py-2 text-sm font-medium leading-none text-brand-body no-underline outline-none hover:bg-brand-cream focus:shadow-[0_0_0_2px] focus:shadow-brand-deep/20"
                href={item.anchor}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.anchor)
                }}
              >
                {item.label}
              </NavigationMenu.Link>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      {/* Viewport mit Perspective */}
      <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
        <NavigationMenu.Viewport className="relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md bg-white shadow-[0_2px_10px] shadow-black/10 transition-[width,_height] duration-300 data-[state=cipped]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  )
}
