"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Cpu, BookOpen, Microscope, Layers } from "lucide-react";

interface ServiceOverviewProps {
  onCategoryClick: (category: string | null) => void;
}

// Updated category-to-icon mapping with new categories
const categories = [
  {
    name: "core_services",
    display: "Trending",
    icon: (
      <Layers className="w-8 h-8 transition-colors duration-300 group-hover:text-foreground text-primary" />
    ),
  },
  {
    name: "it_and_design",
    display: "Technology",
    icon: (
      <Cpu className="w-8 h-8 transition-colors duration-300 group-hover:text-foreground text-primary" />
    ),
  },
  {
    name: "laboratory_and_scientific",
    display: "Science",
    icon: (
      <Microscope className="w-8 h-8 transition-colors duration-300 group-hover:text-foreground text-primary" />
    ),
  },
  {
    name: "training_and_workshops",
    display: "Workshops",
    icon: (
      <BookOpen className="w-8 h-8 transition-colors duration-300 group-hover:text-foreground text-primary" />
    ),
  },
];

const ServiceOverview: React.FC<ServiceOverviewProps> = ({
  onCategoryClick,
}) => {
  return (
    <section className="bg-background py-12 px-3 max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Explore Our Expertise
        </h2>
        <p className="text-base text-muted-foreground">
          Discover our expertise in core services, IT & design, laboratory &
          scientific solutions, and hands-on training programs. We provide
          services tailored to achieve your goals and exceed expectations.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(({ name, display, icon }) => (
            <Card
              key={name}
              className="group cursor-pointer hover:scale-105 transition-transform duration-300 p-4 flex flex-col items-center justify-center bg-card text-center hover:bg-primary"
              onClick={() => onCategoryClick(name)}
            >
              {/* Category Icon */}
              <CardHeader className="p-0">{icon}</CardHeader>

              {/* Category Title */}
              <CardContent className="mt-3">
                <h3 className="text-sm font-medium transition-colors duration-300 text-card-foreground group-hover:text-background">
                  {display}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
