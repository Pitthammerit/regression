const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      utilities: {
        // ============================================
        // LABEL UTILITY — Multi-Site-Ready
        // ============================================
        // Use: className="label" (contains: size + spacing + case)
        // For new site: Change values here - all components update automatically
        // ============================================
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
        // ============================================
        // COLOR TOKENS — Single Source of Truth
        // ============================================
        // Für neue Landing Page: Nur diese Werte ändern!
        // Alle Components verwenden diese Tokens automatisch.
        //
        // Light Backgrounds (weiß, creme, sand):
        //   text-color-heading → Headlines H1-H4 (#224160)
        //   text-color-body    → Body text (#5A5550)
        //   text-color-label   → Labels, Metadata (#7696AD)
        //   text-color-accent  → CTAs, Links (#2DAD71)
        //
        // Dark Backgrounds:
        //   text-on-dark          → Headlines (100% weiß)
        //   text-on-dark-muted    → Body (80% weiß)
        //   text-on-dark-faded    → Labels (60% weiß)
        // ============================================

        color: {
          heading: '#224160',  // Headlines H1-H4
          body:    '#5A5550',  // Body text
          label:   '#7696AD',  // Labels, Metadata
          accent:  '#2DAD71',  // CTAs, Links
        },

        // ============================================
        // ⚠️ TEMPORARY - LEGACY BRAND TOKENS
        // ============================================
        // LIVE sections (AboutSection, TestimonialsSection, etc.) use these
        // Copy sections use color.* tokens above
        //
        // ⚠️ MUST BE DELETED after complete migration to color.* tokens!
        // This is a temporary solution to keep LIVE sections working
        // while Copy sections are being migrated to the new token system.
        // ============================================
        brand: {
          deep:  '#224160',  // Headlines (same as color.heading)
          body:  '#5A5550',  // Body text (same as color.body)
          steel: '#7696AD',  // Labels (same as color.label)
          green: '#2DAD71',  // Accent (same as color.accent)
          muted: '#5A5550',  // Alias für body
          dark:  '#1A2433',  // Dunkle Hintergründe
          cream: '#F0EBE1',  // Creme Hintergründe
          sand:  '#EDE7DC',  // Sand Hintergründe
        },

        'on-dark': {
          DEFAULT: '#FFFFFF',              // Headlines (100%)
          muted: 'rgba(255, 255, 255, 0.8)',  // Body (80%)
          faded: 'rgba(255, 255, 255, 0.6)',  // Labels (60%)
          dim: 'rgba(255, 255, 255, 0.4)',    // Very dim (40%)
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
        // ============================================
        // DEPRECATED: Use fontSize tokens instead!
        // ============================================
        // Font-Familien sind jetzt in fontSize Tokens integriert
        // Components nutzen nur noch Typography-Tokens (text-h2, text-body, etc.)
        // Diese Aliases bleiben nur für Abwärtskompatibilität
        primary: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        // Legacy aliases (deprecated — use primary/display instead)
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // ============================================
        // HERO HEADLINES — Font + Größe (keine Farbe!)
        // ============================================
        'hero-large': ['clamp(2.4rem, 6.6vw, 5.4rem)', {
          lineHeight: '1',
          letterSpacing: '-0.02em',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],
        'hero': ['clamp(1.44rem, 3.84vw, 3.36rem)', {
          lineHeight: '1.1',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],

        // ============================================
        // HEADLINES (H1-H4) — Font + Größe (keine Farbe!)
        // ============================================
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

        // ============================================
        // BODY TEXT — Font + Größe (keine Farbe!)
        // ============================================
        'body': ['1.125rem', {
          lineHeight: '1.75',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
        'body-lg': ['1.25rem', {
          lineHeight: '1.625',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],

        // ============================================
        // LABELS — Font + Größe (keine Farbe!)
        // ============================================
        // NOTE: textTransform wird in fontSize nicht unterstützt!
        // Verwende className="label" utility (enthält uppercase)
        'label': ['0.8125rem', {
          lineHeight: '1.5',
          letterSpacing: '0.2em',
          // textTransform: 'uppercase', ← wird ignoriert!
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],

        // ============================================
        // SUBLINES & LISTS — Font + Größe (keine Farbe!)
        // ============================================
        'subline': ['1rem', {
          lineHeight: '1.5',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
        'list': ['1rem', {
          lineHeight: '1.5',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],

        // ============================================
        // QUOTES — Font + Größe (keine Farbe!)
        // ============================================
        'quote-featured': ['2.25rem', {
          lineHeight: '1.1',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],
        'quote': ['1.5rem', {
          lineHeight: '1.2',
          fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
        }],

        // ============================================
        // AUTHOR-SPECIFIC — Font + Größe (keine Farbe!)
        // ============================================
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
        'role': ['0.875rem', {
          lineHeight: '1.5',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],
        'date': ['0.875rem', {
          lineHeight: '1.5',
          fontFamily: ['DM Sans', 'system-ui', 'sans-serif'],
        }],

        // ============================================
        // METADATA — Font + Größe (keine Farbe!)
        // ============================================
        'disclaimer': ['0.75rem', {
          lineHeight: '1.5',
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
      })
    }),
  ],
}
