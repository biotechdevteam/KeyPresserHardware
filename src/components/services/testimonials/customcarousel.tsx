import React, { useState, useEffect, useRef } from "react";

interface CustomCarouselProps {
  children: React.ReactNode;
  itemsPerSlide: number;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  children,
  itemsPerSlide,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  // Disable swipe if not dragging
  useEffect(() => {
    if (!isDragging) {
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      if (!carouselRef.current) return;
      const x = e.clientX;
      const difference = startX - x;
      if (Math.abs(difference) > 50) {
        setIsDragging(false);
        if (difference > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDragging, startX]);

  return (
    <div className="relative w-full" ref={carouselRef}>
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onMouseDown={handleSwipeStart}
        onMouseUp={handleSwipeEnd}
        onTouchStart={handleSwipeStart}
        onTouchEnd={handleSwipeEnd}
      >
        {childrenArray.map((child, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 p-4 transform transition-transform duration-300 ease-in-out ${
              index % 2 === 0 ? "translate-y-14" : "-translate-y-14"
            }`}
          >
            {child}
          </div>
        ))}
      </div>
      {/* Prev and Next buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
        onClick={prevSlide}
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
};

export default CustomCarousel;
