/**
 * Format seconds as M:SS or H:MM:SS
 *
 * @param {number} seconds - Time in seconds
 * @param {boolean} showHours - Always show hours format (H:MM:SS)
 * @returns {string} Formatted time string
 *
 * @example
 * formatTime(65) // "1:05"
 * formatTime(3665) // "61:05" (no hours unless showHours=true)
 * formatTime(3665, true) // "1:01:05"
 * formatTime(NaN) // "0:00"
 */
export function formatTime(seconds, showHours = false) {
  if (!seconds || isNaN(seconds)) return '0:00'

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  if (showHours && h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${m}:${String(s).padStart(2, '0')}`
}
