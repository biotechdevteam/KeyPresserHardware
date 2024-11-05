import ServiceOverview from "@/components/services/service-overview/ServiceOverview";
import React from "react";
import { redirect, useRouter } from "next/navigation"; // Import redirect from next/navigation
import { Service } from "@/types/ServiceSchema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HeartPulse,
  BookOpen,
  FlaskConical,
  Cpu,
  Stethoscope,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { About } from "@/types/aboutSchema";

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
};

interface ServiceProps {
  services: Service[];
  aboutData: About
}

const ServicesSection: React.FC<ServiceProps> = ({ services, aboutData }) => {
  const router = useRouter();
  // Handle the category click event
  const onCategoryClick = () => {
    // Redirect to the services page
    router.push(`/services`);
  };

  // Extract unique categories from the services, excluding 'other'
  const uniqueCategories = Array.from(
    new Set(
      services
        .map((service) => service.service_category) // Get all service categories
        .filter((category) => category !== "other") // Exclude 'other' category
    )
  ).sort();

  return (
    <section className="text-center py-16 p-8 w-auto">
      <h2 className="text-xl lg:text-3xl font-bold">Our Expertise</h2>
      <Separator className="w-16 mx-auto" />
      <p className="text-base py-8 px-4 lg:mx-64">
        At {aboutData?.name}, we specialize in delivering innovative
        biotechnology solutions that address today's challenges. From
        cutting-edge research to industry-tailored applications, we offer a
        range of services designed to push the boundaries of science and help
        you achieve your goals.
      </p>

      {/* Categories Grid */}
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-4 lg:px-24">
          {uniqueCategories.map((category) => (
            <Card
              key={category}
              className="group cursor-pointer hover:scale-105 transition-transform duration-300 p-4 flex flex-col items-center justify-center bg-card text-center hover:bg-primary"
              onClick={onCategoryClick}
            >
              {/* Category Icon */}
              <CardHeader className="p-0">{categoryIcons[category]}</CardHeader>

              {/* Category Title */}
              <CardContent className="mt-3">
                <h3 className="font-medium transition-colors duration-300">
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
          className="animate-beep"
          onClick={onCategoryClick}
        >
          Explore Our Services <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default ServicesSection;
