"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // shadcn button
import { About } from "@/types/aboutSchema";
import AboutPic from "@/assets/images/about-header.jpg";
import { Link } from "next-view-transitions";

interface HeroProps {
  aboutData: About;
}

const Hero: React.FC<HeroProps> = ({ aboutData }) => {
  const backgroundImage = aboutData.cover_photo_url || AboutPic.src;

  return (
    <div
      className="relative overflow-hidden bg-background text-foreground min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: "0.7", // Adjust opacity as needed
      }}
    >
      {/* Hero Content */}
      <div className="relative z-10 grid place-items-center min-h-screen text-center px-4 sm:px-8">
        <div className="space-y-6">
          {/* Headline with fadeInUp Animation */}
          <h1 className="text-4xl sm:text-6xl font-bold animate-fadeInUp text-primary-foreground">
            {aboutData.slogan}
          </h1>

          {/* Subheadline with fadeIn Animation */}
          <p className="text-lg sm:text-2xl animate-fadeIn delay-200 text-muted-foreground">
            Showcase your projects, join events, and access exclusive{" "}
            {aboutData.name} services.
          </p>

          {/* CTA Buttons with zoomIn Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center mt-6 animate-zoomIn delay-400">
            <Link href={"/projects"}>
              <Button className="px-6 py-3 text-lg" variant="default">
                Explore Projects
              </Button>
            </Link>
            <Link href={"/events"}>
              <Button
                className="px-6 py-3 text-lg text-foreground"
                variant="outline"
              >
                Join Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
