import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * TestimonialCarousel - Carousel for client testimonials
 *
 * Features:
 * - Auto-advancing with progress bar
 * - Manual navigation (arrows, dots)
 * - Direct R2 URLs (no image optimization)
 *
 * @param {Object} props
 * @param {Array} props.clients - Array of client objects with { name, context, quote, image, rating? }
 * @param {string} props.label - Section label (e.g., "KUNDENSTIMMEN")
 * @param {string} props.subtitle - Section subtitle/h2
 */
export const TestimonialCarousel = ({ clients, label, subtitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

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

  // Direct R2 URL - no transformation (images are optimized at build time by Vite Image Optimizer)
  const getOptimizedImageUrl = (url) => {
    if (!url) return '';
    // If URL is already full, return as-is
    if (url.startsWith('http')) return url;
    // Handle relative R2 paths
    return `https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev${url}`;
  };

  return (
    <section className="bg-[#F7F1EB] py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9B7461]">
            {label}
          </p>
          <h2 className="mt-2 font-serif text-3xl text-slate-900 sm:text-4xl">
            {subtitle}
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <button
            onClick={handlePrev}
            className="absolute left-[-70px] top-1/2 z-10 hidden -translate-y-1/2 text-[#9B7461] transition-opacity hover:opacity-70 xl:block"
            aria-label="Previous testimonial">
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-600 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {clients.map((c, idx) => (
                <div key={`${c.name}-${idx}`} className="min-w-full">
                  <div className="flex flex-col gap-3 rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {c.image && (
                          <div className="h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                            <img
                              src={getOptimizedImageUrl(c.image)}
                              width="60"
                              height="60"
                              alt={`${c.name}`}
                              loading="lazy"
                              className="h-full w-full scale-110 object-cover object-center"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-serif text-lg font-semibold text-slate-900">
                            {c.name}
                          </p>
                          <p className="text-sm text-slate-600">
                            {c.context}
                          </p>
                        </div>
                      </div>
                      {c.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(c.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-[#9B7461] text-[#9B7461]"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="font-serif text-lg italic leading-relaxed text-slate-800">
                      "{c.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-[-70px] top-1/2 z-10 hidden -translate-y-1/2 text-[#9B7461] transition-opacity hover:opacity-70 xl:block"
            aria-label="Next testimonial">
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 h-1 overflow-hidden rounded-full bg-[#9B7461]/20">
          <div
            className="h-full bg-[#9B7461] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Navigation Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {clients.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? "w-8 bg-[#9B7461]"
                  : "w-2 bg-[#9B7461]/30 hover:bg-[#9B7461]/50"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
