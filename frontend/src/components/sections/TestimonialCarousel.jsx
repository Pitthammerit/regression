import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export const TestimonialCarousel = ({ testimonials, label, subtitle, language = "en" }) => {
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
    if (progress >= 100 && testimonials.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setProgress(0);
    }
  }, [progress, testimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  };

  const handleDotClick = (index) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    setProgress(0);
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Format R2 URL with image optimization for current bucket
  const getOptimizedImageUrl = (url, width = 200) => {
    if (!url) return '';
    // Already has CDN optimization? Return as-is
    if (url.includes('/cdn-cgi/image/')) return url;
    // Handle current R2 bucket format
    const baseUrl = url.startsWith('http') ? url : `https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev${url}`;
    return `https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/cdn-cgi/image/width=${width},quality=90,format=auto/${baseUrl.replace('https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/', '')}`;
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
              {testimonials.map((t, idx) => (
                <div key={`${t.name}-${idx}`} className="min-w-full">
                  <div className="flex flex-col gap-3 rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                          <img
                            src={getOptimizedImageUrl(t.avatar, 200)}
                            srcSet={`
                              ${getOptimizedImageUrl(t.avatar, 120)} 1x,
                              ${getOptimizedImageUrl(t.avatar, 240)} 2x
                            `}
                            width="60"
                            height="60"
                            alt={`${t.name}`}
                            loading="lazy"
                            className="h-full w-full scale-110 object-cover object-center"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                          <p className="text-xs text-slate-700">
                            {t.role} · {t.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-[#D4914E]">
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <Star key={starIdx} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-slate-800">
                      <p className="italic">
                        "{language === "de" && t.quoteDe ? t.quoteDe : t.quote}"
                      </p>
                    </div>
                    {t.highlight && (
                      <p className="text-xs italic text-slate-500">{t.highlight}</p>
                    )}
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

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="relative h-3 overflow-hidden rounded-full transition-all duration-300"
              style={{
                width: index === currentIndex ? "48px" : "12px",
                backgroundColor: "#9CA3AF",
                opacity: index === currentIndex ? 1 : 0.4,
              }}
              aria-label={`Go to testimonial ${index + 1}`}>
              {index === currentIndex && (
                <div
                  className="absolute left-0 top-0 h-full bg-[#374151] transition-all duration-100 ease-linear"
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
