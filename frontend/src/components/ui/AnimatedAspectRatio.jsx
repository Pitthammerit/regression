/**
 * AnimatedAspectRatio - Smooth aspect ratio transitions
 *
 * Uses CSS aspect-ratio property with transitions for smooth animations.
 * Better than Radix AspectRatio for animated expansions.
 *
 * @param {number} ratio - Aspect ratio (width/height), e.g., 1/1 for square, 3/4 for portrait
 * @param {string} duration - Transition duration (default: 500ms)
 * @param {string} className - Additional classes
 * @param {React.ReactNode} children - Content (usually LazyImage)
 */
export default function AnimatedAspectRatio({
  ratio = 1,
  duration = '500ms',
  className = '',
  children
}) {
  // Convert ratio to CSS aspect-ratio format (e.g., 1/1 → "1 / 1", 3/4 → "3 / 4")
  const aspectRatioCSS = typeof ratio === 'number'
    ? `${ratio}`
    : ratio

  return (
    <div
      className={`w-full ${className}`}
      style={{
        aspectRatio: aspectRatioCSS,
        transition: `aspect-ratio ${duration} ease-in-out`
      }}
    >
      {children}
    </div>
  )
}
