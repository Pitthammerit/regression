import React from 'react'

const R2_BASE = process.env.REACT_APP_R2_BASE_URL || 'https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev'

export const r2 = (path) => `${R2_BASE}/${path.replace(/ /g, '%20')}`

// Confirmed paths in R2 bucket (folder: logos/)
export const logos = {
  dark:    'logos/BK Academy 300 px black.png',
  light:   'logos/BK Academy 500 px white .png',
  hero:    'logos/BK Academy 1000 px white .png',
}

export function ImgPlaceholder({ label = '[ Foto ]', className = '' }) {
  return (
    <div className={`bg-brand-sand flex items-center justify-center text-brand-muted font-sans text-sm ${className}`}>
      {label}
    </div>
  )
}
