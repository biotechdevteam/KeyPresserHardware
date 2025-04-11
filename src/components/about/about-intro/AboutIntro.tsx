"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { About } from "@/types/aboutSchema";
import CTASection from "@/components/about/about-cta/CTASection";
import { useTransitionRouter } from "next-view-transitions";
import { slideFadeInOut } from "@/lib/utils/pageTransitions";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

// Importing images
import img1 from "../../../../public/images/img-6.jpg";
import img2 from "../../../../public/images/unenhanced/img-11.jpg";
import img3 from "../../../../public/images/img-5.jpg";

const Gallery = {
  img1,
  img2,
  img3,
};

const AboutIntro: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const router = useTransitionRouter();
  const introRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (introRef.current) {
      observer.observe(introRef.current);
    }

    return () => {
      if (introRef.current) {
        observer.unobserve(introRef.current);
      }
    };
  }, []);

  // Animation variants for framer-motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Gallery data derived from history
  const galleryItems = [
    {
      src: Gallery.img1,
      alt: "Students founding BioTec Universe at the University of Buea",
      title: "The Beginning",
      description:
        "A group of dedicated students ignited a vision to blend science and technology for global change.",
    },
    {
      src: Gallery.img2,
      alt: "BioTec Universe team launching pioneering projects",
      title: "Innovation in Action",
      description:
        "Launching projects like plastic-to-fuel recycling to tackle environmental and societal challenges.",
    },
    {
      src: Gallery.img3,
      alt: "Community training session by BioTec Universe Group",
      title: "Empowering Lives",
      description:
        "Empowering Cameroonians through hands-on training and community health programs.",
    },
  ];

  return (
    <div
      ref={introRef}
      className="container mx-auto max-w-6xl py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Our Story/Bio Section */}
      {aboutData.history && (
        <motion.div
          className="flex flex-col items-center mb-20"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center mb-12 text-foreground"
            custom={1}
            variants={fadeInUp}
          >
            Our Story
          </motion.h2>

          <motion.div
            className="max-w-4xl mx-auto bg-background/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-primary/10"
            variants={textVariants}
          >
            <div
              className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: aboutData.history.replace(/\n\n/g, "<br><br>"),
              }}
            />
            <Separator className="mt-8 bg-primary/30" />
            <p className="text-center text-sm text-muted-foreground/70 italic mt-4">
              A journey of resilience, innovation, and impact
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Additional images gallery */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-20"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Our Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-md"
            >
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-medium text-lg">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </AspectRatio>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section with improved visual appeal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-primary/5 rounded-2xl p-8 shadow-lg border border-primary/10 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

        <CTASection
          title="Join Our Mission"
          description="Become a part of our journey and help us make a difference in communities around the world."
          action={() =>
            router.push("/apply", { onTransitionReady: slideFadeInOut })
          }
        />
      </motion.div>
    </div>
  );
};

export default AboutIntro;
