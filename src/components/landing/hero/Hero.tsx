"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { About } from "@/types/aboutSchema";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Background images
import Img1 from "../../../../public/images/img-1.jpg";
import Img2 from "../../../../public/images/img-2.jpg";
import Img3 from "../../../../public/images/img-3.jpg";
import Img4 from "../../../../public/images/img-4.jpg";
import Img5 from "../../../../public/images/img-5.jpg";
import Img6 from "../../../../public/images/img-6.jpg";
import Img7 from "../../../../public/images/img-7.jpg";
import Img8 from "../../../../public/images/img-8.jpg";

interface HeroProps {
  aboutData: About;
  cta: string;
}

// Background images
const backgroundImages = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8];

// Utility function to shuffle an array
const shuffleArray = (array: StaticImageData[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Hero: React.FC<HeroProps> = ({ aboutData, cta }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState(
    shuffleArray(backgroundImages)
  );

  useEffect(() => {
    // Shuffle images on initial load
    setShuffledImages(shuffleArray(backgroundImages));

    // Set up interval for switching images
    const imageSwitchInterval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 15000); // Switch image every 15 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(imageSwitchInterval);
  }, [backgroundImages.length]);

  let heading = [
    "Welcome to BioTec Universe!",
    `${aboutData.slogan}`,
    "Join the Future of Science.",
  ];
  let paragraph =
    "We harness biology and technology to drive personal, business, and humanitarian development. Our mission is to eradicate poverty and hunger, increase disease awareness, promote academic excellence, and enhance skill acquisition. Join us in using science to foster growth and improve lives.";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % heading.length);
    }, 15000); // Sync text change with background image switch

    return () => clearTimeout(timeout);
  }, [heading.length]);

  const handleScrollToContent = (id: string) => {
    const contentElement = document.getElementById(id);
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen">
      {/* Background Image with Smooth Crossfade Transition */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={shuffledImages[currentImageIndex]}
            alt={`Background Image ${currentImageIndex}`}
            fill
            className="object-cover w-full h-full"
            sizes="100vw"
            priority={currentImageIndex === 0}
            quality={85}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60 w-full h-full pointer-events-none" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center px-8 lg:px-16 py-16">
        <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-5xl mx-auto">
          <div className="space-y-12 text-center">
            {/* Heading Animation */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={index}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
              >
                {heading[index]}
              </motion.h1>
            </AnimatePresence>

            {/* Paragraph Animation */}
            <motion.p
              className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {paragraph}
            </motion.p>
          </div>

          {/* Call-to-Actions */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="bg-transparent hover:shadow-none">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => handleScrollToContent(cta)}
                  >
                    <ChevronDown className="h-10 w-10 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Learn More About Us</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
