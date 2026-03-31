import React from 'react'
import { Instagram, Mail } from 'lucide-react'
import { useContent } from '../contexts/ContentContext'
import { branding } from '../content/branding'
import LazyImage from './ui/LazyImage'
import DebugLabel from './ui/DebugLabel'
import { useNavigation } from '../contexts/NavigationContext'

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
)

const CONTACT_ICONS = {
  whatsapp:  <WhatsAppIcon />,
  mail:      <Mail      size={24} strokeWidth={1.5} />,
  instagram: <Instagram size={24} strokeWidth={1.5} />,
}

export default function Footer({ debugMode = false }) {
  const content = useContent()
  const { header: siteHeader, footer: footerContent } = content
  const data = footerContent
  const nav = siteHeader.nav
  const year = new Date().getFullYear()
  const { navigateTo } = useNavigation()

  const scrollToBooking = (e) => {
    e.preventDefault()
    navigateTo('#booking')
    setTimeout(() => window.dispatchEvent(new Event('booking:open')), 500)
  }

  return (
    <footer className="bg-color-primary text-white" data-testid="site-footer">
      <div className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* 1 — Navigation horizontal */}
          <div className="mb-6 flex flex-wrap justify-center gap-6 text-sm text-white/70">
            {nav.map((item, index) => (
              <DebugLabel key={item.anchor} type="typography-menu-text" debugMode={debugMode}>
                <a
                  href={item.anchor}
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo(item.anchor)
                  }}
                  className="hover:text-white transition-colors"
                  data-testid={`footer-nav-${item.anchor.replace('#', '')}`}
                >
                  {item.label}
                </a>
              </DebugLabel>
            ))}
          </div>

          <div className="pt-10 mb-10">

            {/*
              4 — Four columns: Branding | Rechtliches | Folgen | Reach Out
              Desktop: all four in one row
              Mobile:  Branding centered (full row), then Rechtliches+Folgen+ReachOut side-by-side below
            */}
            <div className="flex flex-col items-center gap-10 md:flex-row md:justify-center md:items-start md:gap-16">

              {/* Col 1 — Branding */}
              <div className="text-center md:text-left w-full md:min-w-[220px] md:max-w-[260px]">
                <LazyImage
                  src={branding.logo.white}
                  alt={branding.logo.alt}
                  className="h-[34px] w-auto object-contain mb-3 mx-auto md:mx-0"
                />
                <DebugLabel type="typography-subline" debugMode={debugMode}>
                  <p className="text-white/45 italic text-subline whitespace-pre-line">
                    {data.tagline}
                  </p>
                </DebugLabel>
              </div>

              {/* Cols 2+3 — side-by-side on mobile AND desktop */}
              <div className="flex justify-center gap-16 md:contents">

                {/* Col 2 — Rechtliches */}
                <div className="min-w-[120px]">
                  <DebugLabel type="typography-label" debugMode={debugMode}>
                    <p className="text-white/30 uppercase text-sm tracking-wider mb-5">
                      {footerContent.legalLabel}
                    </p>
                  </DebugLabel>
                  <div className="flex flex-col gap-3">
                    {data.legalLinks.map((link) => (
                      <DebugLabel key={link.label} type="typography-menu-text" debugMode={debugMode}>
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white/60 text-sm hover:text-white transition-colors"
                          data-testid={`footer-legal-${link.label.toLowerCase()}`}
                        >
                          {link.label}
                        </a>
                      </DebugLabel>
                    ))}
                  </div>
                </div>

                {/* Col 3 — Folgen */}
                <div className="min-w-[120px]">
                  <DebugLabel type="typography-label" debugMode={debugMode}>
                    <p className="text-white/30 uppercase text-sm tracking-wider mb-5">
                      {footerContent.followLabel}
                    </p>
                  </DebugLabel>
                  <div className="flex flex-col gap-3">
                    {data.social.map((s) => (
                      <DebugLabel key={s.label} type="typography-menu-text" debugMode={debugMode}>
                        <a
                          key={s.label}
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white/60 text-sm hover:text-white transition-colors"
                          data-testid={`footer-social-${s.label.toLowerCase().replace(/ /g, '-')}`}
                        >
                          {s.label}
                        </a>
                      </DebugLabel>
                    ))}
                  </div>
                </div>

                {/* Col 4 — Reach Out */}
                <div className="min-w-[120px]">
                  <DebugLabel type="typography-label" debugMode={debugMode}>
                    <p className="text-white/30 uppercase text-sm tracking-wider mb-5">
                      REACH OUT
                    </p>
                  </DebugLabel>
                  <div className="flex flex-col gap-3">
                    {data.contact.map((c) => (
                      <DebugLabel key={c.label} type="typography-menu-text" debugMode={debugMode}>
                        <a
                          key={c.label}
                          href={c.url}
                          target={c.url.startsWith('mailto') ? undefined : '_blank'}
                          rel="noreferrer"
                          className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                          aria-label={c.label}
                          data-testid={`footer-contact-${c.icon}`}
                        >
                          {CONTACT_ICONS[c.icon]}
                          <span>{c.label}</span>
                        </a>
                      </DebugLabel>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* — Divider + Disclaimer — */}
          <div className="pt-6 pb-6 text-center">
            <div className="h-px bg-color-border-light mb-6"></div>
            <DebugLabel type="typography-label" debugMode={debugMode}>
              <h3 className="uppercase text-sm tracking-wider font-semibold text-white/80 mb-3">{footerContent.disclaimerTitle}</h3>
            </DebugLabel>
            <DebugLabel type="typography-disclaimer" debugMode={debugMode}>
              <p className="text-xs text-white/50 max-w-3xl mx-auto">
                {footerContent.disclaimer.split('. ').map((sentence, index, array) => {
                if (sentence.includes('Erstgespräch')) {
                  const [before, after] = sentence.split('Erstgespräch')
                  return (
                    <React.Fragment key={index}>
                      {before}
                      <a
                        href="#booking"
                        onClick={scrollToBooking}
                        className="underline text-white/70 hover:text-white transition-colors"
                        data-testid="footer-erstgespraech-link"
                      >
                        {footerContent.introCallLabel}
                      </a>
                      {after}
                      {index < array.length - 1 && '. '}
                    </React.Fragment>
                  )
                }
                return (
                  <React.Fragment key={index}>
                    {sentence}
                    {index < array.length - 1 ? '. ' : '.'}
                  </React.Fragment>
                )
                })}
              </p>
            </DebugLabel>
          </div>

          {/* — Divider + Copyright — */}
          <div className="h-px bg-color-border-light mb-6 mt-6"></div>

          <DebugLabel type="typography-hint" debugMode={debugMode}>
            <div className="text-xs text-white/50 text-center">
              {`© ${year} Benjamin Kurtz Academy LLC. ${footerContent.copyright.prefix} `}
              <a
                href={footerContent.copyright.homeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white underline transition-colors"
              >
                {footerContent.copyright.homeLabel}
              </a>
            </div>
          </DebugLabel>

        </div>
      </div>
    </footer>
  )
}
