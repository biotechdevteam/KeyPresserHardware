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
import { motion } from "framer-motion";

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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const videoSwitchInterval = setInterval(() => {
      setCurrentVideoIndex(
        (prevIndex) => (prevIndex + 1) % backgroundVideos.length
      );
    }, 10000); // Switch video every 10 seconds

    return () => clearInterval(videoSwitchInterval);
  }, []);

  let heading = [
    "Welcome to BioTec Universe!",
    `${aboutData.slogan}.`,
    "Join the Future of Science.",
  ];
  let paragraph =
    "We harness biology and technology to drive personal, business, and humanitarian development. Our mission is to eradicate poverty and hunger, increase disease awareness, promote academic excellence, and enhance skill acquisition. Join us in using science to foster growth and improve lives.";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % heading.length);
    }, 10000); // Change text every 10 seconds

    return () => clearTimeout(timeout);
  }, [heading.length]);

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
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center px-8 lg:px-16 py-16">
        <div className="relative z-10 grid grid-cols-1 items-center gap-12 min-h-full">
          <div className="space-y-6 text-center">
            {/* Heading Animation */}
            <motion.h1
              key={index} // Key forces re-animation when index changes
              className="text-4xl lg:text-6xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 1 }}
            >
              {heading[index]}
            </motion.h1>

            {/* Paragraph Animation */}
            <motion.p
              className="text-lg lg:text-2xl text-white opacity-90"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, staggerChildren: 0.1 }}
            >
              {paragraph.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.1 }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </motion.p>
          </div>

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
  );
};

export default Hero;
