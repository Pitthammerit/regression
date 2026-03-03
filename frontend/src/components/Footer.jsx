import React from 'react'
import { Instagram, Youtube, Music2, Headphones } from 'lucide-react'
import { header as siteHeader } from '../content/plr-de'

/* Social icon map — icon-only display like reference */
const SOCIAL_ICONS = {
  Instagram:       <Instagram size={20} strokeWidth={1.5} />,
  Spotify:         <Music2    size={20} strokeWidth={1.5} />,
  'Apple Podcasts':<Headphones size={20} strokeWidth={1.5} />,
  YouTube:         <Youtube   size={20} strokeWidth={1.5} />,
}

export default function Footer({ data }) {
  /* Navigation is shared with Header — one source of truth in plr-de.js */
  const nav = siteHeader.nav
  const year = new Date().getFullYear()

  const scrollToBooking = (e) => {
    e.preventDefault()
    const el = document.querySelector('#booking')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-brand-deep text-white" data-testid="site-footer">
      <div className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* A — Navigation (horizontal, one row) */}
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

          {/* E — Brand + tagline (centered, under nav) */}
          <div className="mb-8 text-center">
            <p className="font-serif text-base text-white/80">{data.brand}</p>
            <p className="font-sans text-xs text-white/45 italic mt-1">{data.tagline}</p>
          </div>

          {/* Social icons */}
          <div className="mb-8 flex justify-center gap-5">
            {data.social.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label={s.label}
                data-testid={`footer-social-${s.label.toLowerCase().replace(/ /g, '-')}`}
              >
                {SOCIAL_ICONS[s.label] ?? <span className="text-xs">{s.label}</span>}
              </a>
            ))}
          </div>

          {/* B — Disclaimer */}
          <div className="mb-6 border-t border-white/10 pt-6 text-center">
            <h3 className="text-sm font-semibold text-white/80 mb-3">Rechtlicher Hinweis</h3>
            <p className="text-xs text-white/50 leading-relaxed max-w-3xl mx-auto">
              Regression Sessions und Hypnose sind kein Ersatz für medizinische oder psychiatrische
              Behandlung. Bei psychischen Erkrankungen wende dich bitte an einen approbierten Arzt
              oder Psychotherapeuten. Bei Unklarheiten wähle gern dennoch ein{' '}
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

          {/* C — Web link */}
          <div className="mb-6 text-center text-xs text-white/50">
            Web:{' '}
            <a
              href="https://benjaminkurtz.de"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-white underline transition-colors"
            >
              benjaminkurtz.de
            </a>
          </div>

          {/* D + Last line — Copyright + Legal links */}
          <div className="border-t border-white/10 pt-6 text-center text-xs text-white/50">
            <p className="mb-3">© {year} The Journey Within · Alle Rechte vorbehalten.</p>

            {/* E — Terms | Imprint | Privacy */}
            <div className="flex justify-center gap-4 flex-wrap">
              {data.legalLinks.map((link, i) => (
                <React.Fragment key={link.label}>
                  {i > 0 && <span className="text-white/25">|</span>}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/50 hover:text-white transition-colors"
                    data-testid={`footer-legal-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
