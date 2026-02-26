import React from 'react'

export default function Footer({ data }) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark text-white py-16 md:py-20" data-testid="site-footer">
      <div className="max-w-content mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <div>
            <div className="font-serif text-xl tracking-wide mb-4">Benjamin Kurtz Academy</div>
            <p className="font-sans text-xs text-white/50 leading-relaxed">{data.tagline}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/30 mb-2">Navigation</p>
            {data.links.map((link) => (
              <a
                key={link.label}
                href={link.anchor || link.url}
                target={link.url ? '_blank' : undefined}
                rel={link.url ? 'noreferrer' : undefined}
                className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                data-testid={`footer-link-${link.label.toLowerCase().replace(/ /g, '-')}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/30 mb-2">Folgen</p>
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

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="font-sans text-xs text-white/30">© {year} {data.copyright}</p>
          <p className="font-sans text-xs text-white/30 max-w-lg leading-relaxed">{data.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
