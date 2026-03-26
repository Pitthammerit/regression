module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '900': '900px',
      },
      colors: {
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
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Hero Headlines (Fluid Scaling)
        'hero-large': ['clamp(2.4rem, 6.6vw, 5.4rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'hero': ['clamp(1.44rem, 3.84vw, 3.36rem)', { lineHeight: '1.1' }],
        // Headlines (H1-H4 System)
        'h1': ['3rem', { lineHeight: '1.1' }],           // 48px - Main headline
        'h2': ['2.25rem', { lineHeight: '1.2' }],        // 36px - Section headline
        'h3': ['1.875rem', { lineHeight: '1.2' }],       // 30px - Subsection headline
        'h4': ['1.5rem', { lineHeight: '1.2' }],         // 24px - Small headline
        // Body Text
        'body': ['1.125rem', { lineHeight: '1.75' }],    // 18px - Base body text
        'body-lg': ['1.25rem', { lineHeight: '1.625' }], // 20px - Large body text
        // Labels
        'label': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.2em', textTransform: 'uppercase' }], // 13px - Labels
        // Sublines
        'subline': ['1rem', { lineHeight: '1.5' }],     // 16px - Sublines (italic)
        // List Items
        'list': ['1rem', { lineHeight: '1.5' }],        // 16px - List items (credentials, bullets)
        // Quotes
        'quote-featured': ['2.25rem', { lineHeight: '1.1' }], // 36px - Featured/large quotes
        'quote': ['1.5rem', { lineHeight: '1.2' }],            // 24px - Standard quotes
        // Author-specific (Researchers)
        'author-name': ['2rem', { lineHeight: '1.2' }],        // 32px - Author names
        'description': ['1.625rem', { lineHeight: '1.6' }],    // 26px - Descriptions
        'summary-large': ['1.625rem', { lineHeight: '1.6' }],  // 26px - Summary (Sans-Serif)
        'body-narrative': ['1.125rem', { lineHeight: '1.75' }], // 18px - Narrative (Serif)
        'role': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.1em', textTransform: 'uppercase' }], // 14px - Role (UNIVERSITY OF VIRGINIA, DOPS)
        'date': ['0.875rem', { lineHeight: '1.5' }],          // 14px - Date (*1918–2007)
        // Metadata
        'disclaimer': ['0.75rem', { lineHeight: '1.5' }],      // 12px - Disclaimer text
        'read-more': ['0.875rem', { lineHeight: '1.5' }],      // 14px - Read More/Less buttons
        'button-text': ['0.875rem', { lineHeight: '1.5' }],    // 14px - Button text (general)
        'source-link': ['0.875rem', { lineHeight: '1.5' }],    // 14px - Source links
        'hint': ['0.875rem', { lineHeight: '1.5' }],          // 14px - Hint/helper text
        'icon': ['1rem', { lineHeight: '1' }],               // 16px - Icons/symbols
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
