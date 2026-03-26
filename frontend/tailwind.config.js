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
        // COLOR TOKENS (Single Source of Truth)
        // ─────────────────────────────────────────────────────────────
        color: {
          // 1. GENERAL PURPOSE
          'bg-light':  '#EDE7DC',  // Sand
          'bg-medium': '#E5DFD5',  // Sand Muted
          'bg-dark':   '#224160',  // Dunkelblau

          // 2. SEMANTIC NAMES (für Sections)
          'heading': '#224160',  // Dunkelblau
          'body':    '#5A5550',  // Dunkles Grau
          'label':   '#7696AD',  // Helles Graublau
          'accent':  '#2DAD71',  // Grün

          // 3. ON-DARK (semantische Namen - Siehe auch legacy 'on-dark' Block)
          'heading': '#FFFFFF',    // 100% (Headlines)
          'quote':   '#FFFFFF',    // 100% (Zitate)
          'body':    '#FFFFFFCC',  // 80% (Fließtext, Labels)
          'role':    '#FFFFFFCC',  // 80% (= label)
          'date':    '#FFFFFFCC',  // 80% (= label)
          'label':   '#FFFFFFCC',  // 80% (= role)
          'accent':  '#2DAD71',    // Grün
          'divider': '#FFFFFF33',  // 20%
        },

        // ─────────────────────────────────────────────────────────────
        // LEGACY - Alle temporären Farben (werden nach Migration entfernt)
        // ─────────────────────────────────────────────────────────────
        brand: {
          deep:  '#224160',  // → heading
          body:  '#5A5550',  // → body
          steel: '#7696AD',  // → label
          green: '#2DAD71',  // → accent
          muted: '#5A5550',  // → body
          dark:  '#1A2433',
          cream: '#F0EBE1',
          sand:  '#EDE7DC',  // → bg-light
        },

        'on-dark': {
          DEFAULT: '#FFFFFF',
          heading: '#FFFFFF',
          quote:   '#FFFFFF',
          body:    '#FFFFFFCC',
          role:    '#FFFFFFCC',  // = label
          date:    '#FFFFFFCC',  // = label
          label:   '#FFFFFFCC',
          accent:  '#2DAD71',
          divider: '#FFFFFF33',
        },

        transcript: {
          bg:       '#F0EBE1',
          text:     '#2D2A26',
          muted:    '#7D7469',
          darkBg:   '#171614',
          darkText: '#D9D2C8',
          border:   '#00000014',
          darkBorder: '#FFFFFF14',
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
        }],
        'hero': ['clamp(1.44rem, 3.84vw, 3.36rem)', {
          lineHeight: '1.1',
        }],
        'h1': ['3rem', {
          lineHeight: '1.1',
        }],
        'h2': ['2.25rem', {
          lineHeight: '1.2',
        }],
        'h3': ['1.875rem', {
          lineHeight: '1.2',
        }],
        'h4': ['1.5rem', {
          lineHeight: '1.2',
        }],
        'body': ['1.125rem', {
          lineHeight: '1.75',
        }],
        'body-lg': ['1.25rem', {
          lineHeight: '1.625',
        }],
        'label': ['0.8125rem', {
          lineHeight: '1.5',
          letterSpacing: '0.2em',
        }],
        'subline': ['1rem', {
          lineHeight: '1.5',
        }],
        'list': ['1rem', {
          lineHeight: '1.5',
        }],
        'quote-featured': ['2.25rem', {
          lineHeight: '1.1',
        }],
        'quote': ['1.5rem', {
          lineHeight: '1.2',
        }],
        'author-name': ['2rem', {
          lineHeight: '1.2',
        }],
        'description': ['1.625rem', {
          lineHeight: '1.6',
        }],
        'summary-large': ['1.625rem', {
          lineHeight: '1.6',
        }],
        'body-narrative': ['1.125rem', {
          lineHeight: '1.75',
        }],
        'date': ['0.875rem', {
          lineHeight: '1.5',
        }],
        'disclaimer': ['0.75rem', {
          lineHeight: '1.5',
          fontStyle: 'italic',
        }],
        'read-more': ['0.875rem', {
          lineHeight: '1.5',
        }],
        'button-text': ['0.875rem', {
          lineHeight: '1.5',
        }],
        'source-link': ['0.875rem', {
          lineHeight: '1.5',
        }],
        'hint': ['0.875rem', {
          lineHeight: '1.5',
          fontStyle: 'italic',
        }],
        'icon': ['1rem', {
          lineHeight: '1',
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
