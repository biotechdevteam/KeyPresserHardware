import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AboutDetailsProps {
  mission: string;
  vision: string;
}

const AboutDetails: React.FC<AboutDetailsProps> = ({ mission, vision }) => {
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false); // Reset to allow re-triggering animation
          }
        });
      },
      { threshold: 0.1 }
    );

    if (detailsRef.current) {
      observer.observe(detailsRef.current);
    }

    return () => {
      if (detailsRef.current) {
        observer.unobserve(detailsRef.current);
      }
    };
  }, []);

  return (
    <div className="py-12 px-6 lg:px-24 space-y-12" ref={detailsRef}>
      {/* Mission Section */}
      <Card
        className={`shadow-lg rounded-lg transition-all duration-700 ease-in-out transform ${
          isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-10"
        }`}
      >
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            Our Mission
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed text-center px-4 lg:px-12">
            {mission}
          </p>
        </CardContent>
      </Card>

      {/* Separator for Mission and Vision */}
      <Separator className="my-6" />

      {/* Vision Section */}
      <Card
        className={`shadow-lg rounded-lg transition-all duration-700 ease-in-out transform ${
          isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-10"
        }`}
      >
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            Our Vision
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed text-center px-4 lg:px-12">
            {vision}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutDetails;
