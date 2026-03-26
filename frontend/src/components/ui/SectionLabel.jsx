import React from 'react'

export default function SectionLabel({ text, light = false }) {
  return (
    <p className={`font-sans label text-color-label mb-4 ${
      light ? 'text-white/50' : ''
    }`}>
      {text}
    </p>
  )
}
