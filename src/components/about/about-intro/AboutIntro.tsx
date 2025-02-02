"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { About } from "@/types/aboutSchema";
import CTASection from "@/components/about/about-cta/CTASection";
import { useTransitionRouter } from "next-view-transitions";
import { slideFadeInOut } from "@/lib/utils/pageTransitions";

const AboutIntro: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const router = useTransitionRouter();
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
    <div
      ref={introRef}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 width-auto"
    >
      <div className="col-span-1 lg:col-span-2">
        {/* Name and Slogan Section */}
        <div className="text-center">
          <h1
            className={`text-2xl xl:text-4xl font-bold transition-all duration-500 ease-in-out ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            {aboutData.name}
          </h1>
          {aboutData.slogan && (
            <p
              className={`xl:text-lg transition-all duration-500 ease-in-out ${
                isVisible ? "animate-fadeInUp delay-100" : "opacity-0"
              }`}
            >
              {aboutData.slogan}
            </p>
          )}
        </div>

        {/* Cover Photo Section */}
        <div className="mt-16">
          {aboutData.cover_photo_url && (
            <AspectRatio ratio={16/9} className="mx-auto rounded-lg">
              <Image
                src={aboutData.cover_photo_url}
                alt={aboutData.name}
                width={100}
                height={100}
                priority={true}
                className={`w-auto h-auto object-cover rounded-lg transition-all duration-500 ease-in-out ${
                  isVisible ? "animate-fadeIn" : "opacity-0"
                }`}
              />
            </AspectRatio>
          )}
        </div>

        {/* Story/Bio Section */}
        <div className="p-8 mt-2 text-center">
          {aboutData.history && (
            <>
              <h3
                className={`text-lg xl:text-4lg font-bold transition-all duration-500 ease-in-out ${
                  isVisible ? "animate-fadeInUp" : "opacity-0"
                }`}
              >
                Our Story
              </h3>
              <p className="mt-2 whitespace-pre-line">{aboutData.history}</p>
              {/* <p dangerouslySetInnerHTML={{ __html: history.replace(/\n\n/g, "<br /><br />") }} /> */}
            </>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="col-span-1 lg:col-span-2">
        <CTASection
          title="Join Us"
          description="Become a part of our mission!"
          action={() =>
            router.push("/apply", { onTransitionReady: slideFadeInOut })
          }
        />
      </div>
    </div>
  );
};

export default AboutIntro;
