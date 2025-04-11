"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectHeaderProps {
  title?: string;
  summary?: string;
  backgroundImageUrl?: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  summary,
  backgroundImageUrl,
}) => {
  return (
    <div className="relative mb-8 h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
      {/* Background Image */}
      {backgroundImageUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={backgroundImageUrl}
            alt={title || "Project featured image"}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Header Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-20 h-full flex items-center justify-center px-4 md:px-8"
      >
        <div className="text-center max-w-3xl mx-auto text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md text-white/80">
            {summary}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectHeader;
