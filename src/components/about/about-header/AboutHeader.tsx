import React, { useEffect, useRef, useState } from "react";

interface AboutHeaderProps {
  name: string;
  slogan?: string;
  logoUrl?: string;
  coverPhotoUrl?: string;
}

const AboutHeader: React.FC<AboutHeaderProps> = ({
  name,
  slogan,
  logoUrl,
  coverPhotoUrl,
}) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false)
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <div className="p-4 mb-4" ref={headerRef}>
      {/* Cover Photo and Logo Section */}
      <div className="relative">
        {coverPhotoUrl && (
          <img
            src={coverPhotoUrl}
            alt="Cover Photo"
            className={`w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg transition-all duration-500 ease-in-out ${
              isVisible ? "animate-fadeIn" : "opacity-0"
            }`}
          />
        )}
        {logoUrl && (
          <img
            src={logoUrl}
            alt={`${name} Logo`}
            className={`w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full border-4 border-border -mt-16 relative z-10 shadow-lg transition-all duration-500 ease-in-out ${
              isVisible ? "animate-zoomIn" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Name and Slogan Section */}
      <div className="text-center mt-6">
        <h1
          className={`text-4xl md:text-5xl font-bold text-primary transition-all duration-500 ease-in-out ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          {name}
        </h1>
        {slogan && (
          <p
            className={`text-lg md:text-xl text-secondary mt-2 transition-all duration-500 ease-in-out ${
              isVisible ? "animate-fadeInUp delay-100" : "opacity-0"
            }`}
          >
            {slogan}
          </p>
        )}
      </div>
    </div>
  );
};

export default AboutHeader;
