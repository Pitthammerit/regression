const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '900': '900px',
      },
      colors: {
        // ─────────────────────────────────────────────────────────────
        // 1. GENERAL PURPOSE
        // ─────────────────────────────────────────────────────────────
        'color-bg-light':  '#EDE7DC',
        'color-bg-medium': '#E5DFD5',
        'color-bg-dark':   '#224160',

        // ─────────────────────────────────────────────────────────────
        // 2. SEMANTIC NAMES (für Sections)
        // ─────────────────────────────────────────────────────────────
        'color-heading': '#224160',
        'color-body':    '#5A5550',
        'color-label':   '#7696AD',
        'color-accent':  '#2DAD71',
        'color-star':    '#F59E0B',

        // ─────────────────────────────────────────────────────────────
        // 3. ON-DARK (semantische Namen)
        // ─────────────────────────────────────────────────────────────
        'on-dark':         '#FFFFFF',
        'on-dark-heading': '#ffffff',
        'on-dark-quote':   '#ffffff',
        'on-dark-body':    '#FFFFFFCC',
        'on-dark-role':    '#ffffff9c',
        'on-dark-date':    '#ffffff9c',
        'on-dark-label':   '#ffffff9c',
        'on-dark-accent':  '#ffffff',
        'on-dark-divider': '#ffffff33',

        // ─────────────────────────────────────────────────────────────
        // 4. LEGACY (temporär - werden nach Migration entfernt)
        // ─────────────────────────────────────────────────────────────
        brand: {
          deep:  '#224160',
          body:  '#5A5550',
          steel: '#7696AD',
          green: '#2DAD71',
          muted: '#5A5550',
          dark:  '#1A2433',
          cream: '#F0EBE1',
          sand:  '#EDE7DC',
        },
        transcript: {
          bg:         '#F0EBE1',
          text:       '#2D2A26',
          muted:      '#7D7469',
          darkBg:     '#171614',
          darkText:   '#D9D2C8',
          border:     '#14000000',
          darkBorder: '#14FFFFFF',
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
        'h5': ['1.25rem', {
          lineHeight: '1.3',
        }],
        'body': ['1.125rem', {
          lineHeight: '1.75',
        }],
        'body-lg': ['1.25rem', {
          lineHeight: '1.625',
        }],
        'label': ['0.94rem', {
          lineHeight: '1.5',
          letterSpacing: '0.2em',
        }],
        'subline': ['1.0rem', {
          lineHeight: '1.5',
        }],
        'list': ['1rem', {
          lineHeight: '1.5',
        }],
        'quote-featured': ['2.25rem', {
          lineHeight: '1.1',
        }],
        'quote': ['1.rem', {
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
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
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
        'star': ['1.25rem', {
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
          'line-height': '1.5',
          'letter-spacing': '0.2em',
          'text-transform': 'uppercase',
          'font-weight': '400',
        },
        '.role': {
          'line-height': '1.5',
          'letter-spacing': '0.1em',
          'text-transform': 'uppercase',
        },
        '.subline-italic': {
          'line-height': '1.5',
          'font-style': 'italic',
        },
        '.hint-italic': {
          'line-height': '1.5',
          'font-style': 'italic',
        },
        '.disclaimer-italic': {
          'line-height': '1.5',
          'font-style': 'italic',
        },
        '.divider-spacing': {
          'padding-top': '2.25rem',
        },

        '.section-padding': {
          'padding-top': '5rem',
          'padding-bottom': '7rem',
        },
        '.section-block-spacing': {
          'margin-bottom': '4rem',
        },
        '.grid-gap-lg': {
          'gap': '2rem',
        },
        '.grid-gap-xl': {
          'gap': '4rem',
        },
        '.margin-top-sm': {
          'margin-top': '1.5rem',
        },
        '.margin-top-md': {
          'margin-top': '3rem',
        },
        '.section-padding-sm': {
          'padding-top': '2.5rem',
        },

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

        '.tracking-label-alt': {
          'letter-spacing': '0.15em',
        },

        // Element spacing utilities
        '.label-heading-spacing': {
          'margin-bottom': '0.7rem',
        },
        '.name-role-spacing': {
          'margin-bottom': '0.25rem',
        },
        '.role-date-spacing': {
          'margin-bottom': '0.25rem',
        },
        '.block-label-spacing': {
          'margin-bottom': '0.75rem',
        },
        '.content-spacing': {
          'margin-bottom': '1.5rem',
        },
        '.content-spacing-md': {
          'margin-bottom': '1rem',
        },
        '.content-spacing-lg': {
          'margin-bottom': '2rem',
        },
        '.item-tag-spacing': {
          'margin-bottom': '0.5rem',
        },
        '.element-spacing-xs': {
          'margin-top': '0.5rem',
        },
        '.element-spacing-sm': {
          'margin-top': '0.75rem',
        },
        '.element-spacing-md': {
          'margin-top': '1rem',
        },
        '.expanded-content-spacing': {
          'margin-top': '1rem',
          'padding-top': '2rem',
        },
      })
    }),
  ],
}
