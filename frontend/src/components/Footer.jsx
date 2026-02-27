import React from 'react'

export default function Footer({ data }) {
  return (
    <footer className="bg-brand-dark text-white py-16 md:py-20" data-testid="site-footer">
      <div className="max-w-content mx-auto px-6">

        {/* Three-column grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">

          {/* Column 1 — Navigation */}
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/30 mb-5">Navigation</p>
            <div className="flex flex-col gap-3">
              {data.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.anchor || link.url}
                  className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                  data-testid={`footer-nav-${link.label.toLowerCase().replace(/ /g, '-')}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Legal */}
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/30 mb-5">Rechtliches</p>
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

          {/* Column 3 — Social */}
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/30 mb-5">Folgen</p>
            <div className="flex flex-col gap-3">
              {data.social.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                  data-testid={`footer-social-${s.label.toLowerCase()}`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <p className="font-serif text-base text-white/70 mb-1">{data.copyright}</p>
          <p className="font-sans text-xs text-white/40 italic">{data.tagline}</p>
        </div>

      </div>
    </footer>
  )
}
