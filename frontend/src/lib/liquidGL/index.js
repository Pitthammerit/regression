/**
 * liquidGL – Ultra-light glassmorphism for the web
 * @see https://liquidgl.naughtyduk.com
 *
 * NOTE: Requires html2canvas CDN to be loaded before use (see index.html)
 *
 * @param {Object} userOptions - Configuration options
 * @param {string} userOptions.target - CSS selector for target elements (default: ".liquidGL")
 * @param {string} userOptions.snapshot - Element to snapshot for refraction (default: "body")
 * @param {number} userOptions.resolution - Snapshot resolution scale (default: 2.0)
 * @param {number} userOptions.refraction - Refraction intensity (default: 0.01)
 * @param {number} userOptions.bevelDepth - Bevel depth effect (default: 0.08)
 * @param {number} userOptions.bevelWidth - Bevel width (default: 0.15)
 * @param {number} userOptions.frost - Frost blur intensity (default: 0)
 * @param {boolean} userOptions.shadow - Enable shadow (default: true)
 * @param {boolean} userOptions.specular - Enable specular highlights (default: true)
 * @param {string} userOptions.reveal - Reveal animation: "fade" or "instant" (default: "fade")
 * @param {boolean} userOptions.tilt - Enable tilt effect (default: false)
 * @returns {Object|Object[]} - LiquidGL instance(s)
 *
 * @example
 * const instance = liquidGL({
 *   target: '.glass-player-target',
 *   snapshot: 'body',
 *   resolution: 2.0,
 *   refraction: 0.047,
 *   bevelDepth: 0.136,
 *   bevelWidth: 0.076,
 *   frost: 2,
 *   shadow: true,
 *   specular: false,
 *   tilt: false
 * })
 */
// Re-export from window global (liquidGL is a UMD/IIFE module)
export const liquidGL = window.liquidGL
