import React from 'react'

/**
 * DebugLabel — Typography Label for Design Exploration
 *
 * Zeigt den Token-Namen direkt als Label (keine Abstraktion).
 *
 * Usage:
 * <DebugLabel type="h3" debugMode={true}>
 *   <h2 className="text-h3">Überschrift</h2>
 * </DebugLabel>
 *
 * Der Label zeigt genau den Token-Namen, der im Tailwind verwendet wird.
 */
export default function DebugLabel({ children, type = 'text', debugMode = false }) {
  // Zeigt den Token-Namen direkt als Label (keine Abstraktion)
  const label = type.toUpperCase()

  // Wenn nicht im Debug-Mode, Kinder ohne Wrapper zurückgeben (kein Layout-Einfluss)
  if (!debugMode) {
    return <>{children}</>
  }

  return (
    <div className="relative inline-block">
      <span className="absolute -top-5 left-0 bg-yellow-300 text-[10px] font-primary px-1.5 py-0.5 rounded border border-yellow-400 font-medium tracking-wide z-10">
        {label}
      </span>
      {children}
    </div>
  )
}
