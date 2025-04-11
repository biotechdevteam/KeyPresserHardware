import React from "react";
import { motion } from "framer-motion";

interface ServiceHeaderProps {
  title: string;
  summary: string;
  backgroundImageUrl: string;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  title,
  summary,
  backgroundImageUrl,
}) => {
  return (
    <div className="w-full relative mb-12">
      {/* Hero image with overlay */}
      <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 bg-black/40 z-10"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        />

        {/* Content overlay */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-white">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center text-white drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mt-4 text-center max-w-xl text-white/90 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {summary}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default ServiceHeader;
