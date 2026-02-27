import React from 'react'

/**
 * Slider — interactive seek/progress bar
 * Uses invisible range input for full drag support, visual track underneath
 */
export function Slider({ value = [0], max = 100, onChange, className = '' }) {
  const percent = max > 0 ? (value[0] / max) * 100 : 0

  const handleChange = (e) => {
    if (onChange) onChange([Number(e.target.value)])
  }

  return (
    <div className={`relative flex items-center w-full h-5 select-none ${className}`}>
      {/* Visual Track */}
      <div className="relative h-1 w-full rounded-full bg-white/20 pointer-events-none">
        <div
          className="absolute h-full rounded-full bg-white transition-none"
          style={{ width: `${percent}%` }}
        />
        <div
          className="absolute top-1/2 w-3 h-3 rounded-full bg-white shadow"
          style={{ left: `${percent}%`, transform: 'translate(-50%, -50%)' }}
        />
      </div>
      {/* Invisible range input for interaction */}
      <input
        type="range"
        min={0}
        max={max}
        step={0.5}
        value={value[0]}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  )
}
