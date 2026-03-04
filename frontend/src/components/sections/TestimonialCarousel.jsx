import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LazyImage from "../ui/LazyImage";

/**
 * TestimonialCarousel - A simple, accessible carousel component
 *
 * Features:
 * - Auto-advance with progress indicator (5s per slide)
 * - Manual navigation via arrows and dots
 * - CSS transitions (no framer-motion)
 * - Cloudflare R2 image optimization
 * - Responsive design
 * - Keyboard navigation (arrow keys)
 * - Pauses on hover
 */

const AUTO_ADVANCE_DURATION = 5000; // 5 seconds
const PROGRESS_UPDATE_INTERVAL = 100; // Update every 100ms

export const TestimonialCarousel = ({
  testimonials,
  label,
  subtitle,
  language = "de"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  }, [testimonials?.length]);

  const handlePrev = useCallback(() => {
    if (!testimonials?.length) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  }, [testimonials?.length]);

  const handleDotClick = useCallback((index) => {
    if (index === currentIndex || !testimonials?.length) return;
    setCurrentIndex(index);
    setProgress(0);
  }, [currentIndex, testimonials?.length]);

  // When progress completes, move to next slide
  useEffect(() => {
    if (progress >= 100 && testimonials?.length > 0) {
      handleNext();
    }
  }, [progress, testimonials?.length, handleNext]);

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

  return (
    <section
      className="bg-white py-16 md:py-20 border-t border-b border-brand-sand"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-content px-6">
        {/* Section Title */}
        <div className="mb-10 text-center">
          {label && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-steel">
              {label}
            </p>
          )}
          {subtitle && (
            <h2 className="mt-3 font-serif text-2xl md:text-3xl lg:text-4xl text-brand-deep">
              {subtitle}
            </h2>
          )}
        </div>

        {/* Main Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - positioned outside on desktop */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-0 md:-translate-x-12 lg:-translate-x-16 text-brand-deep hover:text-brand-steel transition-colors p-2 rounded-full hover:bg-brand-cream/50"
            aria-label="Vorheriges Testimonial"
          >
            <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" strokeWidth={1.5} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-0 md:translate-x-12 lg:translate-x-16 text-brand-deep hover:text-brand-steel transition-colors p-2 rounded-full hover:bg-brand-cream/50"
            aria-label="Nächstes Testimonial"
          >
            <ChevronRight className="h-8 w-8 md:h-10 md:w-10" strokeWidth={1.5} />
          </button>

          {/* Sliding Cards Container */}
          <div className="overflow-hidden rounded-2xl mx-8 md:mx-16">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((t, idx) => (
                <div
                  key={`${t.name}-${idx}`}
                  className="min-w-full px-2"
                >
                  <div className="flex flex-col gap-4 rounded-2xl bg-brand-cream/50 p-6 md:p-8 shadow-sm border border-brand-sand backdrop-blur-sm">
                    {/* Header: Avatar + Info */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {t.image && (
                          <div className="h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-full border-2 border-brand-sand shadow-sm">
                            <LazyImage
                              src={getR2ImageUrl(t.image, 200)}
                              alt={`${t.name} Profilfoto`}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        )}
                        <div>
                          <p className="text-base font-semibold text-brand-deep font-sans">
                            {t.name}
                          </p>
                          {t.context && (
                            <p className="text-sm text-brand-muted mt-0.5">
                              {t.context}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="text-brand-body">
                      <p className="font-serif text-lg md:text-xl leading-relaxed italic">
                        {t.quote || (language === "de" && t.quoteDe ? t.quoteDe : "")}
                      </p>
                    </div>

                    {/* Optional highlight */}
                    {t.highlight && (
                      <p className="text-sm text-brand-steel italic border-t border-brand-sand/50 pt-3 mt-auto">
                        {t.highlight}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Dots with Progress Bar */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="relative h-2 overflow-hidden rounded-full transition-all duration-300"
              style={{
                width: index === currentIndex ? "48px" : "8px",
                backgroundColor: index === currentIndex ? "#224160" : "#7696AD",
                opacity: index === currentIndex ? 1 : 0.5,
              }}
              aria-label={`Gehe zu Testimonial ${index + 1}`}
            >
              {index === currentIndex && (
                <div
                  className="absolute left-0 top-0 h-full bg-white/60 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Pause indicator - shown when paused */}
        {isPaused && (
          <div className="mt-4 text-center">
            <span className="text-xs text-brand-steel uppercase tracking-wider">
              Pausiert
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialCarousel;
