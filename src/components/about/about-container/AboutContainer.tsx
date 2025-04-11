"use client";
import React, { useEffect, useState } from "react";
import { About } from "@/types/aboutSchema";
import AboutIntro from "../about-intro/AboutIntro";
import AboutDetails from "../about-details/AboutDetails";
import { Member } from "@/types/memberSchema";
import { motion, useScroll, useSpring } from "framer-motion";
import ExecutiveBoard from "../about-team/ExecutiveBoard";
import CoverImage from "../../../../public/images/img-1.jpg";

const AboutContainer: React.FC<{ aboutData: About; members: Member[] }> = ({
  aboutData,
  members,
}) => {
  // For progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track scroll position for parallax effects
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Progress bar */}
      <motion.div
        className="progress-bar fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Hero Banner */}
      <div
        className="relative h-[60vh] w-full overflow-hidden bg-black/20"
        style={{
          backgroundImage: CoverImage.src
            ? `url(${CoverImage.src})`
            : undefined,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0 bg-black/40"
          style={{
            transform: `translateY(${scrollY * 0.25}px)`,
          }}
        ></div>
        <div className="container mx-auto h-full flex flex-col justify-center items-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white text-center mb-4"
          >
            {aboutData.name}
          </motion.h1>
          {aboutData.slogan && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl text-center"
            >
              {aboutData.slogan}
            </motion.p>
          )}
        </div>
      </div>

      {/* About Intro */}
      <div className="bg-background">
        <AboutIntro aboutData={aboutData} />
      </div>

      {/* About Details */}
      <div className="bg-muted/30">
        <AboutDetails aboutData={aboutData} />
      </div>

      {/* Team Members */}
      <div className="bg-background pt-12">
        <ExecutiveBoard aboutData={aboutData} members={members} />
      </div>
    </div>
  );
};

export default AboutContainer;
