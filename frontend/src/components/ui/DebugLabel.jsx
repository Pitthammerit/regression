import React from 'react'

/**
 * DebugLabel — Typography Label for Design Exploration
 *
 * Zeigt den tatsächlichen CSS-Klassennamen als Label (keine Abstraktion).
 *
 * Usage:
 * <DebugLabel type="typography-h3" debugMode={true}>
 *   <h2 className="typography-h3">Überschrift</h2>
 * </DebugLabel>
 *
 * Der Label zeigt genau den Klassennamen, der im Element verwendet wird.
 */
export default function DebugLabel({ children, type = 'typography-text', debugMode = false }) {
  // Zeigt den tatsächlichen CSS-Klassennamen (z.B. "typography-h2")
  const label = type

  // Wenn nicht im Debug-Mode, Kinder ohne Wrapper zurückgeben (kein Layout-Einfluss)
  if (!debugMode) {
    return <>{children}</>
  }

  return (
    <div className="relative inline-block">
      <span className="absolute -top-5 left-0 bg-yellow-300 text-[10px] typography-meta px-1.5 py-0.5 rounded border border-yellow-400 font-medium tracking-wide z-10">
        {label}
      </span>
      {children}
    </div>
  )
}
