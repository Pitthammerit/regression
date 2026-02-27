import React from 'react'

// Simple read-only progress slider for prototype use
export function Slider({ defaultValue = [0], max = 100, className = '' }) {
  const percent = ((defaultValue[0] ?? 0) / max) * 100
  return (
    <div className={`relative flex items-center w-full h-4 select-none ${className}`}>
      <div className="relative h-1 w-full rounded-full bg-white/20">
        <div
          className="absolute h-full rounded-full bg-white"
          style={{ width: `${percent}%` }}
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow"
          style={{ left: `${percent}%`, transform: 'translate(-50%, -50%)' }}
        />
      </div>
    </div>
  )
}
