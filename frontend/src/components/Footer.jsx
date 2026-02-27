import React from 'react'

export default function Footer({ data }) {
  return (
    <footer className="bg-brand-dark text-white pt-14 pb-10 md:pt-16 md:pb-12" data-testid="site-footer">
      <div className="max-w-content mx-auto px-6">

        {/* Brand — above navigation */}
        <div className="mb-12 pb-10 border-b border-white/10">
          <p className="font-serif text-xl text-white/80 mb-1">{data.brand}</p>
          <p className="font-sans text-xs text-white/40 italic">{data.tagline}</p>
        </div>

        {/* Three-column grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-14">

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

        {/* Disclaimer + Copyright — centered */}
        <div className="border-t border-white/10 pt-8 text-center space-y-3">
          <p className="font-sans text-xs text-white/35 max-w-xl mx-auto leading-relaxed">
            {data.disclaimer}
          </p>
          <p className="font-sans text-xs text-white/30">{data.copyright}</p>
          <p className="font-sans text-xs text-white/25">{data.copyrightAddress}</p>
        </div>

      </div>
    </footer>
  )
}
