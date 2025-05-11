"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

// Importing images
import VisionIgnitedImg from "../../../../public/images/unenhanced/img-10.jpg";
import RegistrationImg from "../../../../public/images/unenhanced/img-12.jpg";
import ProjectsImg from "../../../../public/images/unenhanced/img-14.jpg";
import GrowthImg from "../../../../public/images/unenhanced/img-17.jpg";

const HistoryTimeline: React.FC = () => {
  const history = [
    {
      year: "Early 2023",
      title: "Vision Ignited",
      description:
        "BioTec Universe Group was founded by passionate students from the University of Buea, driven by a belief that biology and technology could address global challenges.",
      image: {
        src: VisionIgnitedImg,
        alt: "Students from the University of Buea collaborating on the founding of BioTec Universe Group",
        title: "Vision Ignited - Founding of BioTec Universe",
        width: 1920,
        height: 1080,
        sizes: "(max-width: 768px) 100vw, 50vw",
      },
    },
    {
      year: "2023",
      title: "Official Registration",
      description:
        "Overcame initial challenges to officially register as an association in Cameroon, solidifying our commitment to personal, business, and humanitarian growth.",
      image: {
        src: RegistrationImg,
        alt: "Official registration ceremony of BioTec Universe Group in Cameroon",
        title: "Official Registration - Association Milestone",
        width: 1920,
        height: 1080,
        sizes: "(max-width: 768px) 100vw, 50vw",
      },
    },
    {
      year: "2024",
      title: "Pioneering Projects",
      description:
        "Launched innovative projects like recycling plastics into fuel and raising awareness on GMOs, showcasing our mission to harness science for societal good.",
      image: {
        src: ProjectsImg,
        alt: "BioTec Universe team working on plastic recycling and GMO awareness projects",
        title: "Pioneering Projects - Innovative Science Initiatives",
        width: 1920,
        height: 1080,
        sizes: "(max-width: 768px) 100vw, 50vw",
      },
    },
    {
      year: "2025",
      title: "Transformative Growth",
      description:
        "Continues to empower individuals through training, sustainability initiatives, and health programs, building a brighter future for Cameroon.",
      image: {
        src: GrowthImg,
        alt: "Community training session by BioTec Universe Group in Cameroon",
        title: "Transformative Growth - Empowering Communities",
        width: 1920,
        height: 1080,
        sizes: "(max-width: 768px) 100vw, 50vw",
      },
    },
  ];

  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold">Our Journey</h2>
        <Separator className="w-20 h-1 mx-auto mt-4 mb-6 bg-primary/80" />
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tracing our evolution from a student-led vision to a transformative
          force for science and society in Cameroon
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border rounded-full hidden md:block" />

        <div className="space-y-24">
          {history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Date marker for larger screens */}
              <div className="hidden md:flex absolute left-1/2 top-12 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-16 h-16  items-center justify-center z-10 shadow-lg">
                <span className="font-bold absolute inset-0 flex items-center justify-center">
                  {item.year}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left column */}
                <div
                  className={`${index % 2 === 0 ? "block" : "hidden md:block"}`}
                >
                  {index % 2 === 0 && (
                    <div className="flex justify-end pr-12">
                      <Card className="overflow-hidden shadow-md border border-border/70 hover:shadow-lg transition-shadow duration-300 w-full max-w-md">
                        <div className="aspect-video relative bg-muted">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            title={item.image.title}
                            width={item.image.width}
                            height={item.image.height}
                            sizes={item.image.sizes}
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="md:hidden mb-2 text-sm font-medium text-primary">
                            {item.year}
                          </div>
                          <h3 className="text-xl font-semibold mb-2">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>

                {/* Right column */}
                <div
                  className={`${index % 2 === 1 ? "block" : "hidden md:block"}`}
                >
                  {index % 2 === 1 && (
                    <div className="flex justify-start pl-12">
                      <Card className="overflow-hidden shadow-md border border-border/70 hover:shadow-lg transition-shadow duration-300 w-full max-w-md">
                        <div className="aspect-video relative bg-muted">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            title={item.image.title}
                            width={item.image.width}
                            height={item.image.height}
                            sizes={item.image.sizes}
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="md:hidden mb-2 text-sm font-medium text-primary">
                            {item.year}
                          </div>
                          <h3 className="text-xl font-semibold mb-2">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryTimeline;
