"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@/types/ServiceSchema";
import { fetchFeedbacks, fetchServices } from "@/lib/fetchUtils";
import { useTransitionRouter } from "next-view-transitions";
import ServiceOverview from "../service-overview/ServiceOverview";
import FilteredServices from "../filtered-services/FilteredServices";
import { Feedback } from "@/types/feedbackSchema";
import Gallery from "../gallery-section/GallerySection";
import Testimonials from "../testimonials/Testimonials";

interface ServicesContainerProps {
  initialData: {
    services: Service[];
    feedbacks: Feedback[];
  };
}

const ServicesContainer: React.FC<ServicesContainerProps> = ({
  initialData,
}) => {
  const {
    data: services,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    initialData: initialData.services,
  });

  const {
    data: feedbacks,
    isLoading: feedbacksLoading,
    isError: feedbacksError,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
    initialData: initialData.feedbacks,
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useTransitionRouter();

  const handleServiceClick = (serviceId: string) => {
    router.push(`/services/${serviceId}`);
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  const testimonialsTitle = selectedCategory
    ? `What Our Clients Say About ${selectedCategory} Solutions`
    : "What Our Clients Say";

  if (servicesLoading || feedbacksLoading) return <div>Loading...</div>;
  if (servicesError || feedbacksError) return <div>Error loading data...</div>;

  return (
    <section className="relative p-6">
      {/* Service Overview Section with categories */}
      <ServiceOverview
        services={services}
        onCategoryClick={handleCategoryClick}
      />

      {/* Conditionally Render Filtered Services Section */}
      {selectedCategory !== null && (
        <FilteredServices
          services={services}
          selectedCategory={selectedCategory}
          onServiceClick={handleServiceClick}
        />
      )}

      {/* Gallery Section */}
      {selectedCategory !== null && (
        <Gallery
          services={services}
          selectedCategory={selectedCategory}
          onServiceClick={handleServiceClick}
        />
      )}

      {/* Testimonials Section */}
      {selectedCategory !== null && (
        <Testimonials
          feedbacks={feedbacks}
          selectedCategory={selectedCategory}
          title={testimonialsTitle}
        />
      )}
    </section>
  );
};

export default ServicesContainer;
