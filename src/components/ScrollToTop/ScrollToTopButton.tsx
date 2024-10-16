"use client"; // This ensures the component is client-side only

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Shadcn Button component
import { ChevronsUp } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled beyond a certain distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8">
      {isVisible && (
        <Button
          onClick={scrollToTop}
        >
          <ChevronsUp/> Top
        </Button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
