"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { About } from "@/types/aboutSchema";
import CTASection from "@/components/about/about-cta/CTASection";
import { useTransitionRouter } from "next-view-transitions";
import { slideFadeInOut } from "@/lib/utils/pageTransitions";
import { motion } from "framer-motion";
import {
  Compass,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Users,
  Globe,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import CoverImage from "../../../../public/images/unenhanced/img-18.jpg";

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

  // Enhanced values with icons
  const values = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Empowerment through Knowledge",
      description:
        "We believe in equipping individuals with the skills, training, and academic excellence needed to unlock their potential and drive personal and communal growth.",
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Innovation for Impact",
      description:
        "We harness cutting-edge science and technology to create solutions that address poverty, health, and environmental challenges, transforming lives and communities.",
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Collaboration and Unity",
      description:
        "We unite diverse individuals and organizations in a shared commitment to sustainability, solidarity, and collective progress for Cameroon and beyond.",
    },
  ];

  return (
    <div
      className="py-24 px-4 lg:px-12 space-y-24 bg-gradient-to-b from-background/70 via-background/80 to-background"
      ref={detailsRef}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold text-center mb-20 text-foreground"
        >
          What Drives Us
        </motion.h1>

        {/* Mission & Vision with image in between */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Mission Section */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-1"
          >
            <Card className="shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-primary/10 h-full">
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
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision Section */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-1"
          >
            <Card className="shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-primary/10 h-full">
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
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Image showcase */}
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-24"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <AspectRatio ratio={21 / 9}>
              <Image
                src={CoverImage.src}
                alt="BioTec Universe Group empowering communities through science and technology"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                  Transforming Lives Through Innovation
                </h3>
                <p className="text-white/80 text-lg max-w-2xl">
                  From recycling plastics into fuel to empowering individuals
                  through training and health programs, BioTec Universe
                  harnesses biology and technology to foster sustainable growth
                  and eradicate poverty in Cameroon and beyond.
                </p>
              </div>
            </AspectRatio>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          custom={4}
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Card className="shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-primary/10">
            <div className="absolute bottom-0 right-0 w-40 h-40 -mb-16 -mr-16 bg-primary/5 rounded-full blur-3xl"></div>
            <CardHeader className="relative z-10 pb-2">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Our Core Values</h2>
                <Separator className="w-16 my-3 bg-primary/30" />
              </div>
            </CardHeader>
            <CardContent className="pt-6 pb-12 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-primary/10 flex flex-col items-center text-center shadow-md"
                  >
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      {value.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        custom={5}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"></div>

        <div className="relative z-10 p-12 md:p-16">
          <CTASection
            title="Support Our Mission"
            action={() =>
              router.push("/donate", { onTransitionReady: slideFadeInOut })
            }
            description="Join us in making a difference. Your contribution helps us achieve our goals and create lasting impact."
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AboutDetails;
