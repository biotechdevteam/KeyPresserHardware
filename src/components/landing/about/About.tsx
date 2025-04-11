"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { About } from "@/types/aboutSchema";
import AboutTeam from "@/components/about/about-team/AboutTeam";
import { Separator } from "@/components/ui/separator";
import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";
import { Member } from "@/types/memberSchema";
import { motion } from "framer-motion";
import HistoryTimeline from "@/components/about/about-history/AboutHistory";
import { YouTubeVideo } from "@/components/ui/video";

interface AboutSectionProps {
  aboutData: About;
  members: Member[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutData, members }) => {
  const handleScrollToContent = () => {
    const contentElement = document.getElementById("about-cta");
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative">
      <div className="container mx-auto py-16 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold">Who we are</h2>
          <Separator className="w-20 h-1 mx-auto mt-4 mb-8 bg-primary" />
        </motion.div>

        {/* Intro Video Section */}
        <div className="relative mx-auto max-w-4xl overflow-hidden flex justify-center items-center">
          <YouTubeVideo
            videoId="v-MLGYuWLBo"
            title="BioTec Universe - Who we are"
            controls
            size="full"
          />
        </div>

        {/* Timeline Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <HistoryTimeline />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/about">
            <Button size="lg">
              More About Us
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {/* Team Section */}
        {/* {members.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AboutTeam members={members} isExecutiveBoard />
          </motion.div>
        )} */}
      </div>
    </section>
  );
};

export default AboutSection;
