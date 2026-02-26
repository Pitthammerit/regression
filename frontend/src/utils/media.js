import React from 'react'

const R2_BASE = process.env.REACT_APP_R2_BASE_URL || 'https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev'

export const r2 = (path) => `${R2_BASE}/${path.replace(/ /g, '%20')}`

export const logos = {
  dark:    'RTR2/logos/BK Academy 300 px black.png',
  light:   'RTR2/logos/BK Academy 500 px white .png',
  hero:    'RTR2/logos/BK Academy 1000 px white .png',
  favicon: 'RTR2/logos/BK aca favicon solo 512 px black.png',
}

export function ImgPlaceholder({ label = '[ Foto ]', className = '' }) {
  return (
    <div className={`bg-brand-sand flex items-center justify-center text-brand-muted font-sans text-sm ${className}`}>
      {label}
    </div>
  )
}
