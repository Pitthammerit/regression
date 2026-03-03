import React from 'react'
import { Instagram, Youtube, Music2, Headphones, Mail } from 'lucide-react'
import { header as siteHeader } from '../content/plr-de'

/* ── Icon maps ── */
const SOCIAL_ICONS = {
  Spotify:          <Music2     size={24} strokeWidth={1.5} />,
  'Apple Podcasts': <Headphones size={24} strokeWidth={1.5} />,
  YouTube:          <Youtube    size={24} strokeWidth={1.5} />,
}

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

const LOGO_WHITE = "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/logos/BK%20Academy%20500%20px%20white%20.png"

export default function Footer({ data }) {
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

          {/* 1 — Navigation horizontal */}
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

          {/* 2 — Contact icons with label */}
          <div className="mb-10 flex justify-center items-center gap-4">
            <span className="font-sans text-xs text-white/50 uppercase tracking-widest">Kontaktiere uns:</span>
            <div className="flex gap-4">
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
          </div>

          {/* — Divider — */}
          <div className="border-t border-white/10 pt-10 mb-10">

            {/* 3 — Three columns: Branding | Rechtliches | Folgen — centered as a group */}
            <div className="flex justify-center gap-16 flex-wrap">

              {/* Col 1 — Branding (left-aligned within col) */}
              <div className="min-w-[220px] max-w-[260px]">
                <img
                  src={LOGO_WHITE}
                  alt="Benjamin Kurtz Academy"
                  className="h-7 w-auto object-contain mb-3"
                />
                <p className="font-sans text-xs text-white/45 italic leading-relaxed">
                  {data.tagline}
                </p>
              </div>

              {/* Col 2 — Rechtliches */}
              <div className="min-w-[120px]">
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
                      data-testid={`footer-legal-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Col 3 — Folgen */}
              <div className="min-w-[120px]">
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
          </div>

          {/* — Divider + Disclaimer — */}
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

          {/* — Divider + Copyright — */}
          <div className="border-t border-white/10 pt-6 text-center text-xs text-white/50">
            © {year} Benjamin Kurtz Academy LLC. Alle Rechte vorbehalten. Home:{' '}
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
