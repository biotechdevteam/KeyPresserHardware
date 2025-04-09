"use client";
import React, { useState } from "react";
import { Service } from "@/types/ServiceSchema";
import ServiceOverview from "../service-overview/ServiceOverview";
import FilteredServices from "../filtered-services/FilteredServices";
import { Feedback } from "@/types/feedbackSchema";
import Testimonials from "../testimonials/Testimonials";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/utils/pageTransitions";
import { motion } from "framer-motion";

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
    <section className="relative py-6 px-4 min-h-screen bg-gradient-to-b from-background to-background/90">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* Service Overview Section with categories */}
        <ServiceOverview
          onCategoryClick={handleCategoryClick}
          activeCategory={selectedCategory}
        />

        {/* Conditionally Render Filtered Services Section */}
        {selectedCategory !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FilteredServices
              services={servicesData}
              selectedCategory={selectedCategory}
              onServiceClick={handleServiceClick}
            />
          </motion.div>
        )}

        {/* Testimonials Section */}
        {selectedCategory !== null &&
          feedbacksData.filter((f: Feedback) => f.type === "testimonial")
            .length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Testimonials
                feedbacks={feedbacksData.filter(
                  (f: Feedback) => f.type === "testimonial"
                )}
                selectedCategory={selectedCategory}
                title={testimonialsTitle}
              />
            </motion.div>
          )}
      </motion.div>
    </section>
  );
};

export default ServicesContainer;
