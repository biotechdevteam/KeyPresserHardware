"use client";
import React from "react";
import { Service } from "@/types/ServiceSchema";
import ServiceCard from "../service-card/ServiceCard";
import { motion } from "framer-motion";

interface FilteredServicesProps {
  services: Service[];
  selectedCategory: string | null;
  onServiceClick: (serviceId: string) => void;
}

// Category-specific titles and descriptions with more engaging content
const categoryDetails: {
  [key: string]: {
    title: string;
    description: string;
  };
} = {
  all: {
    title: "All Services",
    description:
      "Browse our complete portfolio of professional services tailored to meet your needs.",
  },
  it_and_design: {
    title: "Technology Services",
    description:
      "Cutting-edge solutions to drive your digital transformation and keep you ahead of the curve.",
  },
  laboratory_and_scientific: {
    title: "Scientific Services",
    description:
      "Specialized scientific and laboratory solutions backed by expert research and precision.",
  },
  training_and_workshops: {
    title: "Workshop & Training",
    description:
      "Expert-led training sessions and workshops designed to empower your team with new skills.",
  },
  // Add fallback for other categories
  default: {
    title: "Our Services",
    description:
      "Explore our professional services designed to help you succeed.",
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

  // Fetch the title and description for the selected category with fallback
  const { title, description } =
    categoryDetails[selectedCategory || "all"] || categoryDetails.default;

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
    <section className="py-6">
      <div className="max-w-6xl mx-auto text-center mb-10 px-4">
        <h2 className={"text-3xl font-bold mb-6"}>{title}</h2>
        <p className="text-lg max-w-3xl mx-auto">{description}</p>
      </div>

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <motion.div
              key={service._id}
              className="h-full"
              variants={itemVariants}
            >
              <ServiceCard
                service={service}
                onClick={() => onServiceClick(service._id)}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">
              No services found for this category.
            </p>
            <p className="text-sm text-muted-foreground">
              Please try selecting another category or check back later.
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default FilteredServices;
