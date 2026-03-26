const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      utilities: {
        label: {
          fontSize: '0.8125rem',
          lineHeight: '1.5',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: '400',
        },
      },
      screens: {
        '900': '900px',
      },
      colors: {
        // ─────────────────────────────────────────────────────────────
        // TEXT AUF HELLEM HINTERGRUND (bestehend - bereits in use)
        // ─────────────────────────────────────────────────────────────
        color: {
          heading: '#224160',
          body:    '#5A5550',
          label:   '#7696AD',
          accent:  '#2DAD71',
        },

        // ─────────────────────────────────────────────────────────────
        // HINTERGRUND-FARBEN (neu - beschreibende Namen)
        // ─────────────────────────────────────────────────────────────
        background: {
          light: '#EDE7DC',  // brand-sand
          dark:  '#224160',  // brand-deep
        },

        // ─────────────────────────────────────────────────────────────
        // TEXT AUF DUNKELM HINTERGRUND (neu - semantische Namen)
        // ─────────────────────────────────────────────────────────────
        'on-dark': {
          DEFAULT: '#FFFFFF',                     // Fallback
          heading: '#FFFFFF',                      // Headlines
          quote:   '#FFFFFF',                      // Zitate
          body:    'rgba(255, 255, 255, 0.8)',     // Fließtext
          role:    'rgba(255, 255, 255, 0.6)',     // Rolle/Funktion
          date:    'rgba(255, 255, 255, 0.5)',     // Lebensdaten
          label:   'rgba(255, 255, 255, 0.8)',     // Labels
          accent:  '#2DAD71',                      // Akzent (grün)
          divider: 'rgba(255, 255, 255, 0.2)',     // Trennlinien
        },

        // ─────────────────────────────────────────────────────────────
        // LEGACY - BRAND COLORS (temporär - noch für Live-Site benötigt)
        // ─────────────────────────────────────────────────────────────
        brand: {
          deep:  '#224160',  // → background.dark
          body:  '#5A5550',  // → color.body
          steel: '#7696AD',  // → color.label
          green: '#2DAD71',  // → color.accent
          muted: '#5A5550',  // → color.body
          dark:  '#1A2433',
          cream: '#F0EBE1',  // → wird background.light ähneln
          sand:  '#EDE7DC',  // → background.light
        },

        // ─────────────────────────────────────────────────────────────
        // LEGACY - OLD ON-DARK (temporär - wird durch on-dark ersetzt)
        // ─────────────────────────────────────────────────────────────
        'on-dark-legacy': {
          DEFAULT: '#FFFFFF',
          muted: 'rgba(255, 255, 255, 0.8)',
          faded: 'rgba(255, 255, 255, 0.6)',
          dim: 'rgba(255, 255, 255, 0.4)',
        },

        // ─────────────────────────────────────────────────────────────
        // LEGACY - TRANSCRIPT (temporär - noch für TranscriptPage)
        // ─────────────────────────────────────────────────────────────
        transcript: {
          bg:       '#F0EBE1',
          text:     '#2D2A26',
          muted:    '#7D7469',
          darkBg:   '#171614',
          darkText: '#D9D2C8',
          border:   'rgba(0,0,0,0.08)',
          darkBorder: 'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        primary: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero-large': ['clamp(2.4rem, 6.6vw, 5.4rem)', {
          lineHeight: '1',
          letterSpacing: '-0.02em',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],
        'hero': ['clamp(1.44rem, 3.84vw, 3.36rem)', {
          lineHeight: '1.1',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],
        'h1': ['3rem', {
          lineHeight: '1.1',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],
        'h2': ['2.25rem', {
          lineHeight: '1.2',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],
        'h3': ['1.875rem', {
          lineHeight: '1.2',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],
        'h4': ['1.5rem', {
          lineHeight: '1.2',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],
        'body': ['1.125rem', {
          lineHeight: '1.75',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
        'body-lg': ['1.25rem', {
          lineHeight: '1.625',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
        'label': ['0.8125rem', {
          lineHeight: '1.5',
          letterSpacing: '0.2em',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
        'subline': ['1rem', {
          lineHeight: '1.5',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
        'list': ['1rem', {
          lineHeight: '1.5',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
        'quote-featured': ['2.25rem', {
          lineHeight: '1.1',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],
        'quote': ['1.5rem', {
          lineHeight: '1.2',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],
        'author-name': ['2rem', {
          lineHeight: '1.2',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],
        'description': ['1.625rem', {
          lineHeight: '1.6',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],
        'summary-large': ['1.625rem', {
          lineHeight: '1.6',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],
        'body-narrative': ['1.125rem', {
          lineHeight: '1.75',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],
        'date': ['0.875rem', {
          lineHeight: '1.5',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
        'disclaimer': ['0.75rem', {
          lineHeight: '1.5',
          fontStyle: 'italic',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
        'read-more': ['0.875rem', {
          lineHeight: '1.5',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
        'button-text': ['0.875rem', {
          lineHeight: '1.5',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
        'source-link': ['0.875rem', {
          lineHeight: '1.5',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
        'hint': ['0.875rem', {
          lineHeight: '1.5',
          fontStyle: 'italic',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
        'icon': ['1rem', {
          lineHeight: '1',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
      },
      letterSpacing: {
        'heading-tight': '-0.02em',
        'label-wide': '0.2em',
      },
      maxWidth: {
        content: '72rem',
      },
      backgroundImage: {
        paper: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.label': {
          'font-size': '0.8125rem',
          'line-height': '1.5',
          'letter-spacing': '0.2em',
          'text-transform': 'uppercase',
          'font-weight': '400',
        },
        '.role': {
          'font-size': '0.875rem',
          'line-height': '1.5',
          'letter-spacing': '0.1em',
          'text-transform': 'uppercase',
          'font-family': 'DM Sans, system-ui, sans-serif',
        },
        '.subline-italic': {
          'font-size': '1rem',
          'line-height': '1.5',
          'font-style': 'italic',
          'font-family': 'DM Sans, system-ui, sans-serif',
        },
        '.hint-italic': {
          'font-size': '0.875rem',
          'line-height': '1.5',
          'font-style': 'italic',
          'font-family': 'DM Sans, system-ui, sans-serif',
        },
        '.disclaimer-italic': {
          'font-size': '0.75rem',
          'line-height': '1.5',
          'font-style': 'italic',
          'font-family': 'DM Sans, system-ui, sans-serif',
        },
        '.divider-spacing': {
          'padding-top': '2.25rem',  // 36px
        },

        // ─────────────────────────────────────────────────────────────
        // SPACING UTILITIES (semantic names)
        // ─────────────────────────────────────────────────────────────
        '.section-padding': {
          'padding-top': '5rem',     // py-20
          'padding-bottom': '7rem',   // md:py-28
        },
        '.heading-margin': {
          'margin-bottom': '4rem',    // mb-16
        },
        '.heading-margin-sm': {
          'margin-bottom': '2rem',    // mb-8
        },
        '.heading-margin-md': {
          'margin-bottom': '2.5rem',  // mb-10
        },
        '.grid-gap-lg': {
          'gap': '2rem',              // gap-8
        },
        '.grid-gap-xl': {
          'gap': '4rem',              // gap-16
        },
        '.margin-top-sm': {
          'margin-top': '1.5rem',     // mt-6
        },
        '.margin-top-md': {
          'margin-top': '3rem',       // mt-12
        },
        '.section-padding-sm': {
          'padding-top': '2.5rem',    // pt-10
        },

        // ─────────────────────────────────────────────────────────────
        // TRANSITION DURATIONS (descriptive names)
        // ─────────────────────────────────────────────────────────────
        '.transition-fast': {
          'transition-duration': '200ms',
        },
        '.transition-normal': {
          'transition-duration': '300ms',
        },
        '.transition-slow': {
          'transition-duration': '500ms',
        },
        '.transition-slower': {
          'transition-duration': '700ms',
        },

        // ─────────────────────────────────────────────────────────────
        // LETTER-SPACING
        // ─────────────────────────────────────────────────────────────
        '.tracking-label-alt': {
          'letter-spacing': '0.15em',  // für CaseStudiesSectionCopy
        },
      })
    }),
  ],
}
