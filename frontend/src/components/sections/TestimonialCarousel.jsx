import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LazyImage from "../ui/LazyImage";

/**
 * TestimonialCarousel - An animated carousel component with star ratings
 *
 * Features:
 * - Auto-advance with progress indicator (5s per slide)
 * - Manual navigation via arrows and dots
 * - Framer Motion animations for smooth transitions
 * - 5-star rating display
 * - Cloudflare R2 image optimization
 * - Responsive design
 * - Keyboard navigation (arrow keys)
 * - Pauses on hover
 * - Enhanced title/heading section
 */

const AUTO_ADVANCE_DURATION = 5000; // 5 seconds
const PROGRESS_UPDATE_INTERVAL = 100; // Update every 100ms

// Animation variants
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95
  })
};

const StarRating = ({ rating = 5, size = "h-4 w-4" }) => {
  return (
    <div className="flex items-center gap-0.5 text-[#D4914E]" aria-label={`${rating} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, starIdx) => (
        <Star
          key={starIdx}
          className={`${size} ${starIdx < rating ? 'fill-current' : 'fill-transparent'}`}
        />
      ))}
    </div>
  );
};

export const TestimonialCarousel = ({
  testimonials,
  label,
  subtitle,
  description,
  language = "de"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const progressRef = useRef(null);

  // Format Cloudflare R2 URL with image resizing
  const getR2ImageUrl = useCallback((url, width = 200) => {
    if (!url) return null;
    // Already has CDN? Return as-is
    if (url.includes('/cdn-cgi/image/')) return url;
    // Add Cloudflare Image Resizing parameters
    const baseUrl = url.startsWith('http') ? url : `https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev${url}`;
    return `https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/cdn-cgi/image/width=${width},quality=90,format=auto/${baseUrl.replace('https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/', '')}`;
  }, []);

  // Auto-advance progress
  useEffect(() => {
    if (isPaused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (PROGRESS_UPDATE_INTERVAL / AUTO_ADVANCE_DURATION) * 100;
      });
    }, PROGRESS_UPDATE_INTERVAL);

    return () => clearInterval(progressRef.current);
  }, [isPaused]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (!testimonials?.length) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  }, [testimonials?.length]);

  const handlePrev = useCallback(() => {
    if (!testimonials?.length) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  }, [testimonials?.length]);

  const handleDotClick = useCallback((index) => {
    if (index === currentIndex || !testimonials?.length) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  }, [currentIndex, testimonials?.length]);

  // When progress completes, move to next slide
  useEffect(() => {
    if (progress >= 100 && testimonials?.length > 0) {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setProgress(0);
    }
  }, [progress, testimonials?.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      className="bg-gradient-to-b from-white to-brand-cream/30 py-16 md:py-24 border-t border-b border-brand-sand"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-content px-6">
        {/* Section Title */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {label && (
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-steel mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {label}
            </motion.p>
          )}
          {subtitle && (
            <motion.h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-deep mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {subtitle}
            </motion.h2>
          )}
          {description && (
            <motion.p
              className="max-w-2xl mx-auto text-brand-muted text-base md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {description}
            </motion.p>
          )}
        </motion.div>

        {/* Main Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - positioned outside on desktop */}
          <motion.button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-0 md:-translate-x-12 lg:-translate-x-16 text-brand-deep hover:text-brand-steel transition-colors p-2 rounded-full hover:bg-brand-cream/50 focus:outline-none focus:ring-2 focus:ring-brand-steel/50"
            aria-label="Vorheriges Testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" strokeWidth={1.5} />
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-0 md:translate-x-12 lg:translate-x-16 text-brand-deep hover:text-brand-steel transition-colors p-2 rounded-full hover:bg-brand-cream/50 focus:outline-none focus:ring-2 focus:ring-brand-steel/50"
            aria-label="Nächstes Testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="h-8 w-8 md:h-10 md:w-10" strokeWidth={1.5} />
          </motion.button>

          {/* Animated Slides */}
          <div className="relative mx-8 md:mx-16 min-h-[400px] md:min-h-[350px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                <div className="h-full flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-white to-brand-cream/70 p-8 md:p-12 shadow-lg border border-brand-sand/60 backdrop-blur-sm">
                  {/* Header: Avatar + Info */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-5">
                      {currentTestimonial.image && (
                        <motion.div
                          className="h-[70px] w-[70px] flex-shrink-0 overflow-hidden rounded-full border-2 border-brand-sand shadow-md"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                        >
                          <LazyImage
                            src={getR2ImageUrl(currentTestimonial.image, 200)}
                            alt={`${currentTestimonial.name} Profilfoto`}
                            className="h-full w-full object-cover object-center"
                          />
                        </motion.div>
                      )}
                      <div>
                        <motion.p
                          className="text-lg font-semibold text-brand-deep font-sans"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                        >
                          {currentTestimonial.name}
                        </motion.p>
                        {currentTestimonial.context && (
                          <motion.p
                            className="text-sm text-brand-muted mt-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                          >
                            {currentTestimonial.context}
                          </motion.p>
                        )}
                        {/* Star Rating */}
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.4 }}
                          className="mt-2"
                        >
                          <StarRating rating={currentTestimonial.rating || 5} size="h-4 w-4" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="text-brand-body flex-grow">
                    <motion.p
                      className="font-serif text-xl md:text-2xl leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      "{currentTestimonial.quote || (language === "de" && currentTestimonial.quoteDe ? currentTestimonial.quoteDe : "")}"
                    </motion.p>
                  </div>

                  {/* Optional highlight */}
                  {currentTestimonial.highlight && (
                    <motion.div
                      className="border-t border-brand-sand/50 pt-4 mt-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                    >
                      <p className="text-sm text-brand-steel italic">
                        {currentTestimonial.highlight}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Dots with Progress Bar */}
        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              className="relative h-2 overflow-hidden rounded-full transition-all duration-300"
              style={{
                width: index === currentIndex ? "48px" : "8px",
                backgroundColor: index === currentIndex ? "#224160" : "#7696AD",
                opacity: index === currentIndex ? 1 : 0.5,
              }}
              aria-label={`Gehe zu Testimonial ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute left-0 top-0 h-full bg-white/60"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Pause indicator - shown when paused */}
        <AnimatePresence>
          {isPaused && (
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xs text-brand-steel uppercase tracking-wider bg-brand-cream/50 px-3 py-1 rounded-full">
                Pausiert
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonial counter */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-xs text-brand-muted uppercase tracking-widest">
            {currentIndex + 1} / {testimonials.length}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
