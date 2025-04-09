"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CustomCarouselProps {
  children: React.ReactNode;
  autoSlideInterval?: number;
  showNavigation?: boolean;
  showDots?: boolean;
  pauseOnHover?: boolean;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  children,
  autoSlideInterval = 8000, // Default to 8 seconds
  showNavigation = true,
  showDots = true,
  pauseOnHover = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive Items per slide
  const itemsPerSlide = useResponsiveItemsPerSlide();
  const childrenArray = React.Children.toArray(children);
  const totalSlides = useMemo(
    () => Math.ceil(childrenArray.length / itemsPerSlide),
    [childrenArray.length, itemsPerSlide]
  );

  // Go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  // Go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle auto sliding
  useEffect(() => {
    if (isPaused) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, autoSlideInterval, isPaused]);

  // Handle mouse/touch swipe start
  const handleSwipeStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    setStartX("touches" in e ? e.touches[0].clientX : e.clientX);

    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  // Handle mouse/touch swipe end
  const handleSwipeEnd = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(false);
    const endX =
      "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const difference = startX - endX;

    if (difference > 50) {
      nextSlide();
    } else if (difference < -50) {
      prevSlide();
    }

    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const x = e.clientX;
    const difference = startX - x;

    if (Math.abs(difference) > 50) {
      setIsDragging(false);
      if (difference > 0) nextSlide();
      else prevSlide();
    }
  };

  // Show controls on small screens only when needed
  const [showControls, setShowControls] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden"
      ref={carouselRef}
      onMouseEnter={() => {
        if (pauseOnHover) setIsPaused(true);
        setShowControls(true);
      }}
      onMouseLeave={() => {
        if (pauseOnHover) setIsPaused(false);
        setShowControls(false);
      }}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onMouseDown={handleSwipeStart}
        onMouseUp={handleSwipeEnd}
        onMouseMove={handleMouseMove}
        onTouchStart={handleSwipeStart}
        onTouchEnd={handleSwipeEnd}
      >
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <div key={slideIndex} className="flex-shrink-0 w-full flex flex-wrap">
            {childrenArray
              .slice(
                slideIndex * itemsPerSlide,
                slideIndex * itemsPerSlide + itemsPerSlide
              )
              .map((child, index) => (
                <div
                  key={slideIndex * itemsPerSlide + index}
                  className={`flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4 transform transition-all duration-300`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {child}
                  </motion.div>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {showNavigation && (
        <AnimatePresence>
          {(showControls || window.innerWidth < 768) && (
            <>
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10"
              >
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-primary hover:text-primary-foreground"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10"
              >
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-primary hover:text-primary-foreground"
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}

      {/* Pagination dots */}
      {showDots && totalSlides > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? "w-6 bg-primary" : "w-2 bg-primary/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Hook to determine the number of items per slide based on screen size
const useResponsiveItemsPerSlide = () => {
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1024) {
        setItemsPerSlide(3); // Large screens
      } else if (screenWidth >= 768) {
        setItemsPerSlide(2); // Medium screens
      } else {
        setItemsPerSlide(1); // Small screens
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);

    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  return itemsPerSlide;
};

export default CustomCarousel;
