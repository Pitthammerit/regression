import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { TESTIMONIALS_LIST } from "../../content/testimonials.list"
import DebugLabel from "../ui/DebugLabel"

/**
 * TestimonialCarousel- Carousel with typography tokens
 *
 * MIGRATED to design tokens (Single Source of Truth):
 * - Font-family: font-secondary (headlines), font-primary (body)
 * - Label: text-label (15px) + color-label
 * - H2: text-h2 (36px) + color-heading
 * - Name: text-h5 (20px) + color-heading (semibold)
 * - Context: text-label (15px) + color-label
 * - Quote: text-body-narrative (18px) + color-body
 *
 * FEATURES:
 * - Auto-advancing every 5 seconds + 2s (7s total)
 * - Progress bar inside active dot
 * - Manual navigation (arrows, dots)
 * - Pauses on hover
 *
 * @param {Object} props
 * @param {Array} props.clients - Array of client objects
 * @param {string} props.label - Section label
 * @param {string} props.subtitle - Section subtitle/h2
 */
export const TestimonialCarousel = ({ clients, label, subtitle, debugMode = false }) => {
  const carouselClients = clients || TESTIMONIALS_LIST

  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-advance every 5 seconds + 2s = 7 seconds total
  // Progress updates every 100ms
  useEffect(() => {
    if (!isPaused) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0
          }
          return prev + (100 / 70) // 7000ms total, updated every 100ms
        })
      }, 100)

      return () => clearInterval(progressInterval)
    }
  }, [isPaused])

  // When progress completes, move to next slide
  useEffect(() => {
    if (progress >= 100 && carouselClients.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % carouselClients.length)
      setProgress(0)
    }
  }, [progress, carouselClients.length])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselClients.length)
    setProgress(0)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselClients.length) % carouselClients.length)
    setProgress(0)
  }

  const handleDotClick = (index) => {
    if (index === currentIndex) return
    setCurrentIndex(index)
    setProgress(0)
  }

  if (!carouselClients || carouselClients.length === 0) {
    return null
  }

  // Direct R2 URL (no transformation - images served as-is)
  const getOptimizedImageUrl = (url) => {
    if (!url) return ''
    if (url.startsWith('http')) return url
    return `https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev${url}`
  }

  // Adaptive font size based on text length (16px min, 24px max)
  const getQuoteFontSize = (text) => {
    const len = text.length
    if (len < 250) return 'text-[24px]' // 24px for short to medium quotes
    if (len < 350) return 'text-xl' // 20px for medium quotes
    if (len < 450) return 'text-lg' // 18px for longer quotes
    return 'text-base' // 16px for very long quotes
  }

  return (
    <section id="wall-of-love" className="py-16 md:py-20">
      <div className="max-w-content mx-auto px-6">
        {/* Section Title - centered */}
        <div className="content-spacing-lg text-center">
          <DebugLabel type="label" debugMode={debugMode}>
            <p className="font-primary text-label label text-color-secondary">
              {label}
            </p>
          </DebugLabel>
          <DebugLabel type="h2" debugMode={debugMode}>
            <h2 className="font-secondary text-h2 text-color-primary text-center label-heading-spacing">
              {subtitle}
            </h2>
          </DebugLabel>
        </div>

        {/* Main Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-[-70px] top-1/2 z-10 hidden -translate-y-1/2 text-color-secondary transition-opacity hover:opacity-70 xl:block"
            aria-label="Previous testimonial">
            <ChevronLeft className="w-icon h-icon" />
          </button>

          {/* Card Wrapper with border/background */}
          <div className="overflow-x-hidden rounded-2xl bg-color-card-overlay border border-color-light shadow-sm backdrop-blur-sm">
            {/* Sliding Cards Container */}
            <div
              className="flex transition-transform duration-[600ms] ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselClients.map((t, idx) => (
                <div key={`${t.name}-${idx}`} className="min-w-full p-[34px]">
                  {/* Top Row: Avatar + Name/Role + Stars */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {t.image && (
                        <div className="h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-full border border-color-primary shadow-md">
                          <img
                            src={getOptimizedImageUrl(t.image)}
                            width="60"
                            height="60"
                            alt={`${t.name}`}
                            loading="lazy"
                            className="h-full w-full scale-[1.03] object-cover object-center"
                          />
                        </div>
                      )}
                      <div>
                        <DebugLabel type="h5" debugMode={debugMode}>
                          <p className="font-primary text-h5 font-semibold text-color-primary">{t.name}</p>
                        </DebugLabel>
                        <DebugLabel type="role" debugMode={debugMode}>
                          <p className="font-primary text-label text-color-secondary label tracking-wider">
                            {t.context}
                          </p>
                        </DebugLabel>
                      </div>
                    </div>
                    {/* 5 Stars - semantic star color (yellow) */}
                    <div className="flex items-center gap-0.5 text-color-star mr-4">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star key={starIdx} className="w-[19px] h-[19px] fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Quote - below stars */}
                  <DebugLabel type="body-narrative" debugMode={debugMode}>
                    <div className="text-color-text mt-3">
                      <p className={`font-secondary body-narrative-italic text-center sm:text-left ${getQuoteFontSize(t.quote)}`}>
                        "{t.quote}"
                      </p>
                    </div>
                  </DebugLabel>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-[-70px] top-1/2 z-10 hidden -translate-y-1/2 text-color-secondary transition-opacity hover:opacity-70 xl:block"
            aria-label="Next testimonial">
            <ChevronRight className="w-icon h-icon" />
          </button>
        </div>

        {/* Navigation Dots with Progress Bar inside active dot */}
        <div className="mt-4 flex justify-center gap-2">
          {carouselClients.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`relative h-3 overflow-hidden rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-12 bg-color-primary' : 'w-3 bg-color-secondary'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}>
              {/* Progress bar inside active dot */}
              {index === currentIndex && (
                <div
                  className="absolute left-0 top-0 h-full bg-divider-on-dark transition-all duration-[100ms] ease-linear"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialCarousel
