import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface AboutIntroProps {
  name: string;
  slogan?: string;
  coverPhotoUrl?: string;
  story?: string;
}

const AboutIntro: React.FC<AboutIntroProps> = ({
  name,
  slogan,
  coverPhotoUrl,
  story,
}) => {
  const introRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (introRef.current) {
      observer.observe(introRef.current);
    }

    return () => {
      if (introRef.current) {
        observer.unobserve(introRef.current);
      }
    };
  }, []);

  return (
    <div ref={introRef}>
      {/* Name and Slogan Section */}
      <div className="text-center">
        <h1
          className={`text-2xl xl:text-4xl font-bold transition-all duration-500 ease-in-out ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          {name}
        </h1>
        {slogan && (
          <p
            className={`xl:text-lg transition-all duration-500 ease-in-out ${
              isVisible ? "animate-fadeInUp delay-100" : "opacity-0"
            }`}
          >
            {slogan}
          </p>
        )}
      </div>

      {/* Cover Photo Section */}
      <div className="relative mt-16">
        {coverPhotoUrl && (
          <AspectRatio ratio={16 / 7}>
            <Image
              src={coverPhotoUrl}
              alt={name}
              className={`w-auto h-auto mx-auto object-cover rounded-lg transition-all duration-500 ease-in-out ${
                isVisible ? "animate-fadeIn" : "opacity-0"
              }`}
            />
          </AspectRatio>
        )}
      </div>

      {/* Story/Bio Section */}
      <div className="p-8 mt-2 text-center">
        {story && (
          <>
            <h3
              className={`text-lg xl:text-4lg font-bold transition-all duration-500 ease-in-out ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              Who We Are
            </h3>
            <p className="mt-2">{story}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutIntro;
