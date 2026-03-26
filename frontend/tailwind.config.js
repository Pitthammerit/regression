module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '900': '900px',
      },
      colors: {
        // ============================================
        // SEMANTIC TEXT COLORS — Light Backgrounds
        // ============================================
        'color-heading': '#224160',       // Headlines H1-H4 (brand.deep)
        'color-body': '#5A5550',          // Body text (brand.body/muted)
        'color-label': '#7696AD',         // Labels, Metadata (brand.steel)
        'color-accent': '#2DAD71',        // CTAs, Links (brand.green)

        // ============================================
        // SEMANTIC TEXT COLORS — Dark Backgrounds
        // ============================================
        'color-heading-dark': '#FFFFFF',                  // 100% (text-white, text-white/90)
        'color-body-dark': 'rgba(255, 255, 255, 0.8)',     // 80% (text-white/80, text-white/70)
        'color-label-dark': 'rgba(255, 255, 255, 0.6)',    // 60% (text-white/60, text-white/50)
        'color-dim-dark': 'rgba(255, 255, 255, 0.4)',      // 40% (text-white/40, text-white/30)

        // ============================================
        // BACKGROUND COLORS
        // ============================================
        brand: {
          deep:  '#224160',
          steel: '#7696AD',
          green: '#2DAD71',
          body:  '#5A5550',
          muted: '#5A5550',
          dark:  '#1A2433',
          cream: '#F0EBE1',
          sand:  '#EDE7DC',
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
        'label': ['0.8125rem', {
          lineHeight: '1.5',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
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
  plugins: [],
}
