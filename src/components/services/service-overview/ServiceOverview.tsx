"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Import Button component
import { Service } from "@/types/ServiceSchema";
import {
  Code,
  HeartPulse,
  Globe,
  BookOpen,
  FlaskConical,
  Cpu,
  Stethoscope,
  MoreHorizontal,
  Briefcase,
} from "lucide-react";

// Mapping of service categories to icons from lucide-react
const categoryIcons: { [key: string]: React.ReactNode } = {
  health: (
    <HeartPulse className="w-12 h-12 transition-colors duration-300 group-hover:text-foreground text-primary" />
  ),
  education: (
    <BookOpen className="w-12 h-12 transition-colors duration-300 group-hover:text-foreground text-primary" />
  ),
  technology: (
    <Cpu className="w-12 h-12 transition-colors duration-300 group-hover:text-foreground text-primary" />
  ),
  business: (
    <Briefcase className="w-12 h-12 transition-colors duration-300 group-hover:text-foreground text-primary" />
  ),
  microbiology: (
    <FlaskConical className="w-12 h-12 transition-colors duration-300 group-hover:text-foreground text-primary" />
  ),
  telemedicine: (
    <Stethoscope className="w-12 h-12 transition-colors duration-300 group-hover:text-foreground text-primary" />
  ),
  other: (
    <MoreHorizontal className="w-12 h-12 transition-colors duration-300 group-hover:text-foreground text-primary" />
  ), // Default for 'other'
};

interface ServiceOverviewProps {
  services: Service[];
  onCategoryClick: (category: string | null) => void;
}

const ServiceOverview: React.FC<ServiceOverviewProps> = ({
  services,
  onCategoryClick,
}) => {
  // Extract unique categories from the services
  const uniqueCategories = Array.from(
    new Set(services.map((service) => service.service_category))
  ).sort((a, b) => (a === "other" ? 1 : b === "other" ? -1 : 0));

  return (
    <section className="bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Explore Our Expertise
        </h2>
        <p className="text-lg text-muted-foreground">
          Explore our wide range of services tailored to meet your needs.
          Whether you're looking for expert consulting, educational workshops,
          or technological innovations, we’ve got you covered.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols--1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {uniqueCategories.map((category) => (
          <Card
            key={category}
            className="group cursor-pointer hover:scale-105 transition-transform duration-300 p-6 flex flex-col items-center justify-center bg-card text-center hover:bg-primary"
            onClick={() => onCategoryClick(category)}
          >
            {/* Category Icon */}
            <CardHeader className="p-0">
              {categoryIcons[category] || (
                <Globe className="w-12 h-12 transition-colors duration-300 group-hover:text-foreground text-primary" />
              )}{" "}
              {/* Fallback to Globe icon */}
            </CardHeader>

            {/* Category Title */}
            <CardContent className="mt-4">
              <h3 className="text-xl font-semibold transition-colors duration-300 text-card-foreground group-hover:text-background">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-12 text-center">
        <Button
          variant="default"
          className="px-6 py-3 text-lg font-semibold transition-transform hover:scale-105 animate-pulse"
          onClick={() => onCategoryClick('all')}
        >
          Explore More Services
        </Button>
      </div>
    </section>
  );
};

export default ServiceOverview;
