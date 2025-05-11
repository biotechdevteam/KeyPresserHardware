"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUp } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Initial check for when component mounts on a page that's already scrolled
    toggleVisibility();

    // Use passive event listener for better performance
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed bottom-8 right-8 shadow-md rounded-full z-50 animate-fade-in"
      aria-label="Scroll to top"
    >
      <ChevronsUp className="h-5 w-5" />
    </Button>
  );
};

export default ScrollToTopButton;
