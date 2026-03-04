import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * TestimonialCarousel - Carousel for client testimonials
 * Based on Journey Within Retreats implementation
 *
 * Features:
 * - Auto-advancing every 5 seconds + 2s (7s total)
 * - Progress bar inside active dot showing time remaining
 * - Manual navigation (arrows, dots)
 * - Pauses on hover
 *
 * @param {Object} props
 * @param {Array} props.clients - Array of client objects with { name, context, quote, image }
 * @param {string} props.label - Section label (e.g., "KUNDENSTIMMEN")
 * @param {string} props.subtitle - Section subtitle/h2
 */
export const TestimonialCarousel = ({ clients, label, subtitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance every 5 seconds + 2s = 7 seconds total
  // Progress updates every 100ms
  useEffect(() => {
    if (!isPaused) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + (100 / 70); // 7000ms total, updated every 100ms
        });
      }, 100);

      return () => clearInterval(progressInterval);
    }
  }, [isPaused]);

  // When progress completes, move to next slide
  useEffect(() => {
    if (progress >= 100 && clients.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % clients.length);
      setProgress(0);
    }
  }, [progress, clients.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % clients.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + clients.length) % clients.length);
    setProgress(0);
  };

  const handleDotClick = (index) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    setProgress(0);
  };

  if (!clients || clients.length === 0) {
    return null;
  }

  // Direct R2 URL (no transformation - images served as-is)
  const getOptimizedImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev${url}`;
  };

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-content mx-auto px-6">
        {/* Section Title - centered */}
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-steel">
            {label}
          </p>
          <h2 className="mt-2 font-serif text-3xl text-brand-deep sm:text-4xl text-center">
            {subtitle}
          </h2>
        </div>

        {/* Main Carousel Container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-[-70px] top-1/2 z-10 hidden -translate-y-1/2 text-brand-steel transition-opacity hover:opacity-70 xl:block"
            aria-label="Previous testimonial">
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Sliding Cards Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-600 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {clients.map((t, idx) => (
                <div key={`${t.name}-${idx}`} className="min-w-full">
                  <div className="flex flex-col gap-3 rounded-2xl bg-white/50 p-6 border border-brand-sand shadow-sm backdrop-blur-sm">
                    {/* Top Row: Avatar + Name/Role + Stars */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {t.image && (
                          <div className="h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                            <img
                              src={getOptimizedImageUrl(t.image)}
                              width="60"
                              height="60"
                              alt={`${t.name}`}
                              loading="lazy"
                              className="h-full w-full scale-110 object-cover object-center"
                            />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-brand-deep">{t.name}</p>
                          <p className="text-xs text-brand-steel">
                            {t.context}
                          </p>
                        </div>
                      </div>
                      {/* 5 Stars - yellow/gold */}
                      <div className="flex items-center gap-0.5" style={{ color: '#D4AF37' }}>
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <Star key={starIdx} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Quote - below stars */}
                    <div className="text-sm text-brand-body">
                      <p className="italic text-center sm:text-left">
                        "{t.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-[-70px] top-1/2 z-10 hidden -translate-y-1/2 text-brand-steel transition-opacity hover:opacity-70 xl:block"
            aria-label="Next testimonial">
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>

        {/* Navigation Dots with Progress Bar inside active dot */}
        <div className="mt-8 flex justify-center gap-2">
          {clients.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="relative h-3 overflow-hidden rounded-full transition-all duration-300"
              style={{
                width: index === currentIndex ? "48px" : "12px",
                backgroundColor: index === currentIndex ? "#2D3F4E" : "#D1C5B0",
              }}
              aria-label={`Go to testimonial ${index + 1}`}>
              {/* Progress bar inside active dot */}
              {index === currentIndex && (
                <div
                  className="absolute left-0 top-0 h-full bg-white/40 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
