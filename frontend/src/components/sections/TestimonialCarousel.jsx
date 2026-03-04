import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * TestimonialCarousel - Carousel for client testimonials
 *
 * Features:
 * - Auto-advancing with progress indicator inside active dot
 * - Manual navigation (arrows, dots)
 * - Pauses on hover
 * - Direct R2 URLs (no image optimization)
 *
 * @param {Object} props
 * @param {Array} props.clients - Array of client objects with { name, context, quote, image, rating? }
 * @param {string} props.label - Section label (e.g., "KUNDENSTIMMEN")
 * @param {string} props.subtitle - Section subtitle/h2
 */
export const TestimonialCarousel = ({ clients, label, subtitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(0);
  const intervalRef = useRef(null);

  // 7 seconds per card (5s + 2s longer)
  const CARD_DURATION = 7000;
  const PROGRESS_UPDATE = 100;
  const PROGRESS_INCREMENT = (PROGRESS_UPDATE / CARD_DURATION) * 100;

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        progressRef.current += PROGRESS_INCREMENT;

        if (progressRef.current >= 100) {
          progressRef.current = 0;
          setCurrentIndex((prev) => (prev + 1) % clients.length);
        }

        // Force re-render
        setCurrentIndex(prev => prev);
      }, PROGRESS_UPDATE);
    }

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, clients.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % clients.length);
    progressRef.current = 0;
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + clients.length) % clients.length);
    progressRef.current = 0;
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    progressRef.current = 0;
  };

  if (!clients || clients.length === 0) {
    return null;
  }

  // Direct R2 URL
  const getOptimizedImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev${url}`;
  };

  return (
    <section
      className="py-16 md:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-content mx-auto px-6">
        {/* Section Label */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-steel mb-3">
            {label}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-deep leading-tight">
            {subtitle}
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 text-brand-deep/40 hover:text-brand-deep transition-colors hidden md:block"
            aria-label="Previous testimonial">
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 lg:translate-x-12 text-brand-deep/40 hover:text-brand-deep transition-colors hidden md:block"
            aria-label="Next testimonial">
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden px-4 md:px-16">
            <div
              className="flex transition-transform duration-600 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {clients.map((c, idx) => (
                <div key={`${c.name}-${idx}`} className="min-w-full px-2">
                  <div className="bg-white/50 rounded-2xl p-8 border border-brand-sand flex flex-col md:flex-row gap-6 items-center">
                    {/* Avatar */}
                    {c.image && (
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 overflow-hidden rounded-full border-2 border-brand-sand shadow-md mx-auto md:mx-0">
                          <img
                            src={getOptimizedImageUrl(c.image)}
                            width="80"
                            height="80"
                            alt={`${c.name}`}
                            loading="lazy"
                            className="h-full w-full scale-110 object-cover object-center"
                          />
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <p className="font-serif text-lg md:text-xl italic leading-relaxed text-brand-body mb-6">
                        "{c.quote}"
                      </p>

                      {/* Author + Rating Row */}
                      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
                        <div>
                          <p className="font-serif text-lg font-semibold text-brand-deep">
                            {c.name}
                          </p>
                          <p className="font-sans text-sm text-brand-steel">
                            {c.context}
                          </p>
                        </div>

                        {/* 5 Stars Rating */}
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-brand-deep/60 text-brand-deep/60"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Dots with Progress Indicator */}
        <div className="mt-12 flex justify-center gap-3">
          {clients.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`relative h-2.5 rounded-full transition-all overflow-hidden ${
                idx === currentIndex
                  ? "w-8 bg-brand-deep"
                  : "w-2.5 bg-brand-sand hover:bg-brand-steel/30"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            >
              {/* Progress indicator inside active dot */}
              {idx === currentIndex && (
                <div
                  className="absolute inset-0 bg-white/40"
                  style={{
                    transform: `translateX(${progressRef.current - 100}%)`,
                    transition: 'transform 0.1s linear'
                  }}
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
