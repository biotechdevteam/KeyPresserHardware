"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface CustomCarouselProps {
  children: React.ReactNode;
  autoSlideInterval?: number;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  children,
  autoSlideInterval = 10000, // Default to 10 seconds
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Responsive Items per slide
  const itemsPerSlide = useResponsiveItemsPerSlide();
  const childrenArray = React.Children.toArray(children);
  const totalSlides = Math.ceil(childrenArray.length / itemsPerSlide);

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

  // Handle auto sliding
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoSlideInterval]);

  // Handle mouse/touch swipe start
  const handleSwipeStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    setStartX("touches" in e ? e.touches[0].clientX : e.clientX);
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
  };

  // Handle mouse dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const difference = startX - x;
      if (Math.abs(difference) > 50) {
        setIsDragging(false);
        if (difference > 0) nextSlide();
        else prevSlide();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDragging, startX]);

  return (
    <div className="relative w-full overflow-hidden" ref={carouselRef}>
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex * 100) / itemsPerSlide}%)`,
        }}
        onMouseDown={handleSwipeStart}
        onMouseUp={handleSwipeEnd}
        onTouchStart={handleSwipeStart}
        onTouchEnd={handleSwipeEnd}
      >
        {childrenArray.map((child, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4 transform transition-transform duration-300 ease-in-out`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Prev and Next buttons */}
      <Button
        variant="default"
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 h-auto rounded-full bg-muted-primary hover:bg-primary"
        onClick={prevSlide}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </Button>
      <Button
        variant="default"
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-4 h-auto rounded-full bg-muted-primary hover:bg-primary"
        onClick={nextSlide}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </Button>
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
