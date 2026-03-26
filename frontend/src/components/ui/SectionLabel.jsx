import React from 'react'

export default function SectionLabel({ text, light = false }) {
  return (
    <p className={`font-sans text-label tracking-[0.2em] uppercase mb-4 ${
      light ? 'text-white/50' : 'text-brand-steel'
    }`}>
      {text}
    </p>
  )
}
