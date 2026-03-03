import React from 'react'
import { Instagram, Youtube, Music2, Headphones, Mail } from 'lucide-react'
import { header as siteHeader } from '../content/plr-de'

/* ── Social & contact icon maps ── */
const SOCIAL_ICONS = {
  Instagram:        <Instagram  size={20} strokeWidth={1.5} />,
  Spotify:          <Music2     size={20} strokeWidth={1.5} />,
  'Apple Podcasts': <Headphones size={20} strokeWidth={1.5} />,
  YouTube:          <Youtube    size={20} strokeWidth={1.5} />,
}

/* WhatsApp SVG (lucide has no WhatsApp) */
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
)

const CONTACT_ICONS = {
  whatsapp:  <WhatsAppIcon />,
  mail:      <Mail      size={20} strokeWidth={1.5} />,
  instagram: <Instagram size={20} strokeWidth={1.5} />,
}

export default function Footer({ data }) {
  /* Navigation shared with Header — one source of truth in plr-de.js */
  const nav = siteHeader.nav
  const year = new Date().getFullYear()

  const scrollToBooking = (e) => {
    e.preventDefault()
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-brand-deep text-white" data-testid="site-footer">
      <div className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* 1 — Navigation horizontal (one row) */}
          <div className="mb-8 flex flex-wrap justify-center gap-6 text-sm text-white/70">
            {nav.map((item) => (
              <a
                key={item.anchor}
                href={item.anchor}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(item.anchor)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="hover:text-white transition-colors"
                data-testid={`footer-nav-${item.anchor.replace('#', '')}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* 2 — Contact icons (WhatsApp | Mail | Instagram) */}
          <div className="mb-8 flex justify-center gap-5">
            {data.contact.map((c) => (
              <a
                key={c.label}
                href={c.url}
                target={c.url.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label={c.label}
                data-testid={`footer-contact-${c.icon}`}
              >
                {CONTACT_ICONS[c.icon]}
              </a>
            ))}
          </div>

          {/* 3 — Brand + tagline */}
          <div className="mb-10 text-center">
            <p className="font-serif text-base text-white/80">{data.brand}</p>
            <p className="font-sans text-xs text-white/45 italic mt-1">{data.tagline}</p>
          </div>

          {/* 4 — Two columns: Rechtliches | Folgen */}
          <div className="mb-10 grid grid-cols-2 gap-8 sm:gap-16">
            {/* Left — Rechtliches */}
            <div>
              <p className="font-sans text-xs tracking-[0.18em] uppercase text-white/30 mb-5">
                Rechtliches
              </p>
              <div className="flex flex-col gap-3">
                {data.legalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                    data-testid={`footer-legal-${link.label.toLowerCase().replace(/ /g, '-')}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — Folgen */}
            <div>
              <p className="font-sans text-xs tracking-[0.18em] uppercase text-white/30 mb-5">
                Folgen
              </p>
              <div className="flex flex-col gap-3">
                {data.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                    data-testid={`footer-social-${s.label.toLowerCase().replace(/ /g, '-')}`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 5 — Divider + Disclaimer + Divider */}
          <div className="border-t border-white/10 pt-6 pb-6 text-center">
            <h3 className="text-sm font-semibold text-white/80 mb-3">Rechtlicher Hinweis</h3>
            <p className="text-xs text-white/50 leading-relaxed max-w-3xl mx-auto">
              Regression Sessions und Hypnose sind kein Ersatz für medizinische oder
              psychiatrische Behandlung. Bei psychischen Erkrankungen wende dich bitte an
              einen approbierten Arzt oder Psychotherapeuten. Bei Unklarheiten wähle gern
              dennoch ein{' '}
              <a
                href="#booking"
                onClick={scrollToBooking}
                className="underline text-white/70 hover:text-white transition-colors"
                data-testid="footer-erstgespraech-link"
              >
                Erstgespräch
              </a>
              , in dem ich dich dazu kompetent beraten kann.
            </p>
          </div>

          {/* 6 — Copyright (no legal links below — those are in the grid above) */}
          <div className="border-t border-white/10 pt-6 text-center text-xs text-white/50">
            © {year} Benjamin Kurtz Academy LLC. Alle Rechte vorbehalten. Web:{' '}
            <a
              href="https://benjaminkurtz.de"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-white underline transition-colors"
            >
              benjaminkurtz.de
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}
