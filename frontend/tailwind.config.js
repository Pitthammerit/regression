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
        color: {
          heading: '#224160',
          body:    '#5A5550',
          label:   '#7696AD',
          accent:  '#2DAD71',
        },
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
        'on-dark': {
          DEFAULT: '#FFFFFF',
          muted: 'rgba(255, 255, 255, 0.8)',
          faded: 'rgba(255, 255, 255, 0.6)',
          dim: 'rgba(255, 255, 255, 0.4)',
        },
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
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
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
      })
    }),
  ],
}
