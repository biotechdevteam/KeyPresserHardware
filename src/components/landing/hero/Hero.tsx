"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";
import BackgroundVideo from "next-video/background-video";
import CattleRanging from "../../../../videos/cattle-ranging.mp4";
import DataScience from "../../../../videos/data-science.mp4";
import Farming from "../../../../videos/farming.mp4";
import LabScience from "../../../../videos/lab-science.mp4";
import WebDev from "../../../../videos/web-development.mp4";
import { About } from "@/types/aboutSchema";

interface HeroProps {
  aboutData: About;
}

const backgroundVideos: any[] = [
  CattleRanging,
  DataScience,
  Farming,
  LabScience,
  WebDev,
];

const Hero: React.FC<HeroProps> = ({ aboutData }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const videoSwitchInterval = setInterval(() => {
      setCurrentVideoIndex(
        (prevIndex) => (prevIndex + 1) % backgroundVideos.length
      );
    }, 10000); // Switch video every 10 seconds

    return () => clearInterval(videoSwitchInterval);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <BackgroundVideo
          src={backgroundVideos[currentVideoIndex]}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center px-8 lg:px-16 py-16">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 min-h-full">
          <div className="space-y-6 text-center lg:text-left">
            <div className="text-4xl lg:text-6xl font-bold tracking-tight text-white">
              <h1>Building a Better World</h1>
            </div>

            <p className="text-lg lg:text-2xl text-white opacity-90">
              We harness biology and technology to drive personal, business, and
              humanitarian development. Our mission is to eradicate poverty and
              hunger, increase disease awareness, promote academic excellence,
              and enhance skill acquisition. Join us in using science to foster
              growth and improve lives.
            </p>

            {/* Call-to-Actions */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center">
              <Link href="/ongoing-projects">
                <Button className="px-6 py-6 text-lg animate-beep">
                  Explore Our Work <ArrowRight className="w-5 h-5 ml-2 inline" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .text-4xl {
            font-size: 2rem;
          }
          .text-lg {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
