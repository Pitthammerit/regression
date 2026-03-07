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
          body:  '#1A1814',
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
        'hero-xl': ['clamp(2.4rem, 6.6vw, 5.4rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'hero-lg': ['clamp(1.44rem, 3.84vw, 3.36rem)', { lineHeight: '1.1' }],
        // Section Headlines
        'section-h2': ['1.875rem', { lineHeight: '1.2' }],     // 30px
        'section-h2-md': ['2.25rem', { lineHeight: '1.2' }],  // 36px
        'section-h2-lg': ['3rem', { lineHeight: '1.1' }],      // 48px
        // Body Text
        'body-base': ['1.125rem', { lineHeight: '1.75' }],    // 18px
        'body-lg': ['1.25rem', { lineHeight: '1.625' }],      // 20px
        // Metadata
        'label-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.2em', textTransform: 'uppercase' }],
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
