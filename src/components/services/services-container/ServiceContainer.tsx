"use client";
import React, { useState } from "react";
import { Service } from "@/types/ServiceSchema";
import ServiceOverview from "../service-overview/ServiceOverview";
import FilteredServices from "../filtered-services/FilteredServices";
import { Feedback } from "@/types/feedbackSchema";
import Gallery from "../gallery-section/GallerySection";
import Testimonials from "../testimonials/Testimonials";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/utils/pageTransitions";

const ServicesContainer: React.FC<{
  servicesData: Service[];
  feedbacksData: Feedback[];
}> = ({ servicesData, feedbacksData }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "all"
  );
  const router = useTransitionRouter();

  const handleServiceClick = (serviceId: string) => {
    router.push(`/service/${serviceId}`, { onTransitionReady: slideInOut });
  };
  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  const testimonialsTitle = "What Our Clients Say";

  return (
    <section className="relative p-3 grid place-items-center">
      {/* Service Overview Section with categories */}
      <ServiceOverview onCategoryClick={handleCategoryClick} />

      {/* Conditionally Render Filtered Services Section */}
      {selectedCategory !== null && (
        <FilteredServices
          services={servicesData}
          selectedCategory={selectedCategory}
          onServiceClick={handleServiceClick}
        />
      )}

      {/* Gallery Section */}
      {/* {selectedCategory !== null && (
        <Gallery
          services={servicesData}
          selectedCategory={selectedCategory}
          onServiceClick={handleServiceClick}
        />
      )} */}

      {/* Testimonials Section */}
      {selectedCategory !== null && (
        <Testimonials
          feedbacks={feedbacksData.filter(
            (f: Feedback) => f.type === "testimonial"
          )}
          selectedCategory={selectedCategory}
          title={testimonialsTitle}
        />
      )}
    </section>
  );
};

export default ServicesContainer;
