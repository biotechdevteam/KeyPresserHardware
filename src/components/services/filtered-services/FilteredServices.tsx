"use client";
import React from "react";
import { Service } from "@/types/ServiceSchema";
import ServiceCard from "../service-card/ServiceCard";

interface FilteredServicesProps {
  services: Service[];
  selectedCategory: string | null;
  onServiceClick: (serviceId: string) => void;
}

// Category-specific titles and descriptions
const categoryDetails: {
  [key: string]: { title: string; description: string };
} = {
  health: {
    title: "Health Services",
    description:
      "Explore our range of health-related services designed to meet your needs.",
  },
  education: {
    title: "Educational Services",
    description:
      "Discover our expert educational services, workshops, and training sessions.",
  },
  technology: {
    title: "Technology Services",
    description:
      "Cutting-edge technological services to keep your business ahead of the curve.",
  },
  business: {
    title: "Business Services",
    description:
      "Our business consulting and development services are tailored to help you grow.",
  },
  microbiology: {
    title: "Microbiology Services",
    description:
      "Specialized microbiology services for research and practical applications.",
  },
  telemedicine: {
    title: "Telemedicine Services",
    description:
      "Get access to our advanced telemedicine solutions for remote health consultations.",
  },
  other: {
    title: "Other Services",
    description:
      "Explore our other miscellaneous services designed to cater to various needs.",
  },
  all: {
    title: "All Services",
    description:
      "Browse all the services we offer across various domains and specialties.",
  },
};

const FilteredServices: React.FC<FilteredServicesProps> = ({
  services,
  selectedCategory,
  onServiceClick,
}) => {
  const filteredServices =
    selectedCategory && selectedCategory !== "all"
      ? services.filter(
          (service) => service.service_category === selectedCategory
        )
      : services;

  // Fetch the title and description for the selected category
  const { title, description } = categoryDetails[selectedCategory || "all"] || {
    title: "Services",
    description: "Explore our services.",
  };

  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto text-center mb-10">
        {/* Dynamic Title and Description (kept for demonstration) */}
        <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div key={service._id} className="h-full w-full">
              <ServiceCard
                service={service}
                onClick={() => onServiceClick(service._id)}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No services found for this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default FilteredServices;
