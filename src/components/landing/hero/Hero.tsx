"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // shadcn button
import { About } from "@/types/aboutSchema";
import AnimeBg from "../../../../public/animations/biologist-animate.svg";
import { Link } from "next-view-transitions";
import { ArrowRight, Users } from "lucide-react";

interface HeroProps {
  aboutData: About;
}

const Hero: React.FC<HeroProps> = ({ aboutData }) => {
  return (
    <div className="relative overflow-hidden min-h-[36rem] bg-card pt-8">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-blue-100" />

      {/* Hero Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 min-h-full px-8 lg:px-16 py-16">
        {/* Right Side: Animation */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <Image
            src={AnimeBg}
            alt="Biologist Animation"
            className="object-contain w-3/4 lg:w-full animate-fadeIn"
            priority
          />
        </div>

        {/* Left Side: Text and Actions */}
        <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
          {/* Headline */}
          <div className="text-4xl lg:text-6xl font-bold tracking-tight">
            <h1 className="animate-fadeInUp">{aboutData.slogan}</h1>
          </div>

          {/* Sub-headline */}
          <p className="text-lg lg:text-2xl text-muted-foreground animate-fadeIn delay-200">
            We are pioneers in biotechnology, driving innovative research and
            solutions to solve today's challenges and shape tomorrow's future.
            Join us in exploring the power of science to improve lives.
          </p>

          {/* Call-to-Actions */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mt-8">
            {/* Explore Innovations Button */}
            <Link href="/services">
              <Button className="px-6 py-6 text-xl transition-all transform hover:scale-105">
                Explore{" "}
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </Link>

            {/* Join Us Button */}
            <Link href="/apply">
              <Button
                variant={"secondary"}
                className="px-6 py-6 text-xl transition-all transform hover:scale-105"
              >
                Join Us <Users className="w-5 h-5 ml-2 inline" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
