import React from 'react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { menu } from '../content/menu'

const ListItem = React.forwardRef(({ className, children, anchor, ...props }, ref) => {
  const handleNavClick = (e) => {
    e.preventDefault()
    const el = document.querySelector(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <li>
      <NavigationMenu.Link asChild>
        <a
          ref={ref}
          href={anchor}
          onClick={handleNavClick}
          className={`block select-none rounded-md p-3 text-sm leading-none text-brand-body no-underline outline-none transition-colors hover:bg-brand-cream hover:text-brand-deep focus:shadow-[0_0_0_2px] focus:shadow-brand-deep/20 ${className}`}
          {...props}
        >
          {children}
        </a>
      </NavigationMenu.Link>
    </li>
  )
})

ListItem.displayName = 'ListItem'

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
                    className="relative top-px text-brand-steel transition-transform duration-[250ms] ease-in group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>

                {/* Content mit Advanced Animation */}
                <NavigationMenu.Content className="NavigationMenuContent">
                  <ul className="m-0 grid list-none gap-x-2.5 p-[22px] min-w-[200px] w-auto">
                    {menu.items
                      .find(cat => cat.label === item.label)
                      ?.children.map((child) => (
                        <ListItem key={child.id} anchor={child.anchor}>
                          <div className="mb-1 font-medium leading-[1.2] text-brand-deep">
                            {child.label}
                          </div>
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

        {/* Indicator - zeigt Position des Dropdowns an */}
        <NavigationMenu.Indicator className="top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
          <div className="relative top-[70%] h-[10px] w-[10px] rotate-45 rounded-tl-sm bg-white shadow-[0_2px_10px] shadow-black/10" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      {/* Viewport mit Advanced Animation */}
      <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  )
}
