"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { About } from "@/types/aboutSchema";
import CTASection from "@/components/about/about-cta/CTASection";
import { useTransitionRouter } from "next-view-transitions";
import { slideFadeInOut } from "@/lib/utils/pageTransitions";
import { motion } from "framer-motion";
import { Compass, Lightbulb, Sparkles, ArrowRight } from "lucide-react";

const AboutDetails: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const router = useTransitionRouter();
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (detailsRef.current) {
      observer.observe(detailsRef.current);
    }

    return () => {
      if (detailsRef.current) {
        observer.unobserve(detailsRef.current);
      }
    };
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
  };

  return (
    <div
      className="py-12 px-4 lg:px-12 space-y-20 bg-gradient-to-b from-background via-background/95 to-background/90"
      ref={detailsRef}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground"
        >
          About Our Organization
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mission Section */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Card className="shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-primary/10 h-full">
              <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-primary/5 rounded-full blur-2xl"></div>
              <CardHeader className="relative z-10 pb-2">
                <div className="flex flex-col items-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Compass className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                  <Separator className="w-16 my-3 bg-primary/30" />
                </div>
              </CardHeader>
              <CardContent className="pt-2 pb-8 relative z-10">
                <p className="text-lg leading-relaxed text-center px-4 md:px-8">
                  {aboutData.mission_statement}
                </p>

                {/* <div className="flex justify-center mt-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </motion.div>
                </div> */}
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision Section */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Card className="shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-primary/10 h-full">
              <div className="absolute top-0 left-0 w-32 h-32 -mt-10 -ml-10 bg-primary/5 rounded-full blur-2xl"></div>
              <CardHeader className="relative z-10 pb-2">
                <div className="flex flex-col items-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                  <Separator className="w-16 my-3 bg-primary/30" />
                </div>
              </CardHeader>
              <CardContent className="pt-2 pb-8 relative z-10">
                <p className="text-lg leading-relaxed text-center px-4 md:px-8">
                  {aboutData.vision_statement}
                </p>

                {/* <div className="flex justify-center mt-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                  >
                    Discover more <ArrowRight className="ml-1 h-4 w-4" />
                  </motion.div>
                </div> */}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Values Section - Added for completeness */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-8"
        >
          <Card className="shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-primary/10">
            <div className="absolute bottom-0 right-0 w-40 h-40 -mb-16 -mr-16 bg-primary/5 rounded-full blur-3xl"></div>
            <CardHeader className="relative z-10 pb-2">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Our Values</h2>
                <Separator className="w-16 my-3 bg-primary/30" />
              </div>
            </CardHeader>
            <CardContent className="pt-2 pb-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* {aboutData.values?.slice(0, 3).map((value, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-background/50 backdrop-blur-sm p-6 rounded-lg border border-primary/10 text-center"
                  >
                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))} */}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        custom={3}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <CTASection
          title="Support Our Mission"
          action={() =>
            router.push("/donate", { onTransitionReady: slideFadeInOut })
          }
          description="Join us in making a difference. Your contribution helps us achieve our goals and create lasting impact."
        />
      </motion.div>
    </div>
  );
};

export default AboutDetails;
