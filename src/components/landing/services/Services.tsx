import ServiceOverview from "@/components/services/service-overview/ServiceOverview";
import React from "react";
import { redirect, useRouter } from "next/navigation"; // Import redirect from next/navigation
import { Service } from "@/types/ServiceSchema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
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
    <HeartPulse className="w-8 h-8 transition-colors duration-300 group-hover:text-foreground text-primary" />
  ),
  education: (
    <BookOpen className="w-8 h-8 transition-colors duration-300 group-hover:text-foreground text-primary" />
  ),
  technology: (
    <Cpu className="w-8 h-8 transition-colors duration-300 group-hover:text-foreground text-primary" />
  ),
  business: (
    <Briefcase className="w-8 h-8 transition-colors duration-300 group-hover:text-foreground text-primary" />
  ),
  microbiology: (
    <FlaskConical className="w-8 h-8 transition-colors duration-300 group-hover:text-foreground text-primary" />
  ),
  telemedicine: (
    <Stethoscope className="w-8 h-8 transition-colors duration-300 group-hover:text-foreground text-primary" />
  ),
  other: (
    <MoreHorizontal className="w-8 h-8 transition-colors duration-300 group-hover:text-foreground text-primary" />
  ), // Default for 'other'
};

interface ServiceProps {
  services: Service[]; // Define the type of services prop
}

const ServicesSection: React.FC<ServiceProps> = ({ services }) => {
  const router = useRouter();
  // Handle the category click event
  const onCategoryClick = () => {
    // Redirect to the services page
    router.push(`/services`);
  };
  // Extract unique categories from the services
  const uniqueCategories = Array.from(
    new Set(services.map((service) => service.service_category))
  ).sort((a, b) => (a === "other" ? 1 : b === "other" ? -1 : 0));

  return (
    <section className="bg-muted text-center text-foreground py-12 p-3 w-full">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Explore Our Expertise
      </h2>
      <p className="text-base text-background">
        Explore our wide range of services tailored to meet your needs, we've got you covered.
      </p>

      {/* Categories Grid */}
      <div className="overflow-hidden">
        <div className="grid grid-flow-col gap-4 auto-cols-[minmax(150px,1fr)] animate-slide whitespace-nowrap">
          {uniqueCategories.concat(uniqueCategories).map((category) => (
            <Card
              key={category}
              className="group cursor-pointer hover:scale-105 transition-transform duration-300 p-4 flex flex-col items-center justify-center bg-card text-center hover:bg-primary"
              onClick={onCategoryClick}
            >
              {/* Category Icon */}
              <CardHeader className="p-0">
                {categoryIcons[category] || (
                  <Globe className="w-8 h-8 transition-colors duration-300 group-hover:text-foreground text-primary" />
                )}
              </CardHeader>

              {/* Category Title */}
              <CardContent className="mt-3">
                <h3 className="text-sm font-medium transition-colors duration-300 text-card-foreground group-hover:text-background">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* View More Button */}
      <div className="mt-10 text-center">
        <Button
          variant="default"
          className="px-4 py-2 text-sm font-semibold transition-transform hover:scale-105 animate-pulse"
          onClick={onCategoryClick}
        >
          Explore More Services
        </Button>
      </div>
    </section>
  );
};

export default ServicesSection;
