"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell, Sparkles, Zap, Rocket } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  description = "This feature is currently under development.",
}) => {
  // Floating particles animation variants
  const particleVariants = {
    animate: {
      y: [-20, -80, -20],
      x: [-10, 10, -10],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
    },
  };

  // Magnetic orb animation
  const orbVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      boxShadow: [
        "0 0 20px rgba(99, 102, 241, 0.3)",
        "0 0 60px rgba(99, 102, 241, 0.6)",
        "0 0 20px rgba(99, 102, 241, 0.3)",
      ],
    },
  };

  // Pulsing rings animation
  const ringVariants = {
    animate: (i: number) => ({
      scale: [1, 2.5, 1],
      opacity: [0.8, 0, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        delay: i * 0.5,
        ease: "easeOut",
      },
    }),
  };

  // Text reveal animation
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Button hover animation
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))",
            "linear-gradient(225deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))",
            "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 7}%`,
            top: `${20 + i * 5}%`,
          }}
          variants={particleVariants}
          animate="animate"
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm" />
        </motion.div>
      ))}

      <div
        className={`flex flex-col items-center justify-center py-16 px-4 text-center relative z-10`}
      >
        {/* Animated title */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-muted-foreground mb-12 max-w-md text-lg"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>

        {/* Main attraction - Magnetic orb with pulsing rings */}
        <div className="relative mb-12">
          {/* Pulsing rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-blue-400/30"
              variants={ringVariants}
              animate="animate"
              custom={i}
              style={{
                width: "120px",
                height: "120px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {/* Central magnetic orb */}
          <motion.div
            className="relative w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-2xl"
            variants={orbVariants}
            animate="animate"
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.3,
              rotate: 180,
              transition: { duration: 0.3 },
            }}
          >
            {/* Inner rotating elements */}
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-white/30"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Icon carousel */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Rocket className="w-8 h-8 text-white" />
            </motion.div>

            {/* Orbiting mini elements */}
            {[Sparkles, Zap, Bell].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 2,
                }}
                style={{
                  left: "50%",
                  top: "50%",
                  transformOrigin: `${-15 + i * 10}px ${-30 + i * 15}px`,
                }}
              >
                <Icon className="w-3 h-3 text-white" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating elements around button */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              animate={{
                y: [0, -100, 0],
                x: [0, i % 2 === 0 ? 50 : -50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut",
              }}
              style={{
                left: `${45 + i * 2}%`,
                bottom: "20%",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
