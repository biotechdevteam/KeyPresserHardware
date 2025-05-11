"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Cpu, BookOpen, Microscope, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ServiceOverviewProps {
  onCategoryClick: (category: string | null) => void;
  activeCategory: string | null;
}

const categories = [
  {
    name: "all",
    display: "All Services",
    icon: (props: any) => <Layers {...props} />,
  },
  {
    name: "it_and_design",
    display: "Technology",
    icon: (props: any) => <Cpu {...props} />,
  },
  {
    name: "laboratory_and_scientific",
    display: "Science",
    icon: (props: any) => <Microscope {...props} />,
  },
  {
    name: "training_and_workshops",
    display: "Workshops",
    icon: (props: any) => <BookOpen {...props} />,
  },
];

const ServiceOverview: React.FC<ServiceOverviewProps> = ({
  onCategoryClick,
  activeCategory,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Services</h1>
        <p className="max-w-2xl mx-auto">
          Discover our range of specialized services designed to meet your needs
        </p>
      </div>

      {/* Categories Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map(({ name, display, icon: Icon }) => {
          const isActive = activeCategory === name;

          return (
            <motion.div key={name} variants={itemVariants}>
              <Card
                className={cn(
                  "cursor-pointer transition-all duration-300 p-4 h-32 flex flex-col items-center justify-center text-center border-2",
                  isActive
                    ? "border-ring bg-primary/10 shadow-lg"
                    : "border-transparent hover:border-primary/30 hover:bg-primary/5"
                )}
                onClick={() => onCategoryClick(name)}
              >
                {/* Category Icon */}
                <CardHeader className="p-0">
                  <Icon
                    className={cn(
                      "w-10 h-10 transition-colors duration-300",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-primary"
                    )}
                  />
                </CardHeader>

                {/* Category Title */}
                <CardContent className="p-0 mt-3">
                  <h3
                    className={cn(
                      "text-sm font-medium",
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    )}
                  >
                    {display}
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ServiceOverview;
