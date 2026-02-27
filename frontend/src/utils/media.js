import React from 'react'

const R2_BASE = process.env.REACT_APP_R2_BASE_URL || 'https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev'

export const r2 = (path) => `${R2_BASE}/${path.replace(/ /g, '%20')}`

// Confirmed paths in R2 bucket
export const logos = {
  dark:  'logos/BK Academy 300 px black.png',
  light: 'logos/BK Academy 500 px white .png',
  hero:  'logos/BK Academy 1000 px white .png',
}

// Benjamin Kurtz portraits — confirmed in images/ folder
export const portraits = {
  p18: 'images/Benjamin Kurtz Portraits 2024-18.jpg',
  p20: 'images/Benjamin Kurtz Portraits 2024-20.jpg',
  p23: 'images/Benjamin Kurtz Portraits 2024-23.jpg',
  p24: 'images/Benjamin Kurtz Portraits 2024-24.jpg',
  p36: 'images/Benjamin Kurtz Portraits 2024-36.jpg',
  p37: 'images/Benjamin Kurtz Portraits 2024-37.jpg',
}
