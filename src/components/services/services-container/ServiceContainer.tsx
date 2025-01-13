"use client";
import React, { useState } from "react";
import { Service } from "@/types/ServiceSchema";
import { fetchFeedbacks, fetchServices } from "@/lib/utils/fetchUtils";
import ServiceOverview from "../service-overview/ServiceOverview";
import FilteredServices from "../filtered-services/FilteredServices";
import { Feedback } from "@/types/feedbackSchema";
import Gallery from "../gallery-section/GallerySection";
import Testimonials from "../testimonials/Testimonials";
import { useTransitionRouter } from "next-view-transitions";
import Loader from "@/components/loader/Loader";
import Error from "@/app/[locale]/error";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { slideInOut } from "@/lib/utils/pageTransitions";

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch services and feedbacks data
    const servicesData = await fetchServices();
    const feedbacksData = await fetchFeedbacks();

    // Return data as props with ISR enabled
    return {
      props: {
        servicesData,
        feedbacksData,
        isError: false,
        error: null,
      },
      revalidate: 60, // Revalidate data every 60 seconds
    };
  } catch (error) {
    return {
      props: {
        servicesData: [],
        feedbacksData: [],
        isError: true,
        error: error,
      },
      revalidate: 60,
    };
  }
};

const ServicesContainer = ({
  servicesData,
  feedbacksData,
  isError,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

  // Handle loading state (Client-side simulation)
  const isLoading =
    servicesData.length === 0 && feedbacksData.length === 0 && !isError;
  if (isLoading) return <Loader />;
  if (isError) return <Error error={error} />;

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
