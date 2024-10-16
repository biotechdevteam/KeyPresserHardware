"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // shadcn button
import { About } from "@/types/aboutSchema";
import AboutPic from "../../../../public/images/about-header.jpg";
import AnimeBg from "../../../../public/animations/biologist-animate.svg";
import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  aboutData: About;
}

const Hero: React.FC<HeroProps> = ({ aboutData }) => {
  const backgroundImage = aboutData.cover_photo_url || AboutPic.src;

  return (
    <div className="relative overflow-hidden min-h-[36rem] bg-card">
      {/* Hero Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 min-h-full p-16 lg:px-16 sm:px-8">
        {/* Right Side: GIF Image on mobile first */}
        <div className="flex justify-center lg:justify-end lg:end-32 order-1 lg:order-2">
          <Image
            src={AnimeBg}
            alt="Biologist Animation"
            className="object-contain animate-fadeIn"
            priority
          />
        </div>

        {/* Left Side: Text and CTA */}
        <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
          {/* Headline */}
          <div className="text-3xl lg:text-6xl font-bold space-y-2">
            <h1 className="animate-fadeInUp">Welcome to Our World</h1>

            {/* <h3 className="lg:text-4xl text-accent animate-fadeInUp">
              {aboutData.name}
            </h3> */}
          </div>

          {/* Sub-headline */}
          <p className="text-lg lg:text-2xl animate-fadeIn delay-200">
            Empowering Biotechnology Innovations. Discover Our Latest Research
            and Solutions.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center lg:justify-start mt-6 animate-zoomIn delay-400">
            <Link href="/projects">
              <Button variant="default">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
