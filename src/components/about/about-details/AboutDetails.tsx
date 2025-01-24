"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { About } from "@/types/aboutSchema";
import CTASection from "@/components/about/about-cta/CTASection";
import { useTransitionRouter } from "next-view-transitions";
import { slideFadeInOut } from "@/lib/utils/pageTransitions";

const AboutDetails: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const router = useTransitionRouter();
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
    <div className="py-12 lg:px-24 space-y-12" ref={detailsRef}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 m-8 width-auto">
        <div className="col-span-1 lg:col-span-2">
          {/* Mission Section */}
          <Card
            className={`shadow-lg rounded-lg transition-all duration-700 ease-in-out transform ${
              isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-10"
            }`}
          >
            <CardHeader>
              <h2 className="text-2xl font-bold text-center">Our Mission</h2>
              <Separator className="w-16 mx-auto" />
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-center px-1 lg:px-12">
                {aboutData.mission_statement}
              </p>
            </CardContent>
          </Card>

          {/* Vision Section */}
          <Card
            className={`shadow-lg rounded-lg transition-all duration-700 ease-in-out transform ${
              isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-10"
            }`}
          >
            <CardHeader>
              <h2 className="text-2xl font-bold text-center">Our Vision</h2>
              <Separator className="w-16 mx-auto" />
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-center px-1 lg:px-12">
                {aboutData.vision_statement}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="col-span-1 lg:col-span-2">
        <CTASection
          title="Support Our Mission"
          action={() =>
            router.push("/donate", { onTransitionReady: slideFadeInOut })
          }
          description="Help us achieve our goals through your contributions."
        />
      </div>
    </div>
  );
};

export default AboutDetails;
