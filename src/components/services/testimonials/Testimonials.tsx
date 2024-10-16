import React from "react";
import { Feedback } from "@/types/feedbackSchema";
import TestimonialCard from "../testimonial-card/TestimonialCard";
import CustomCarousel from "./customcarousel";

interface TestimonialsProps {
  feedbacks: Feedback[];
  selectedCategory?: string | null;
  title: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  feedbacks,
  selectedCategory,
  title,
}) => {
  // Filter feedbacks based on selected category
  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.serviceId &&
      (!selectedCategory ||
        selectedCategory === "all" ||
        feedback.serviceId.service_category === selectedCategory)
  );

  return (
    <div className="container mx-auto px-4 py-8 my-4">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <CustomCarousel itemsPerSlide={4}>
        {filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map((feedback) => (
            <TestimonialCard
              key={feedback._id}
              name={`${feedback.userId?.first_name} ${feedback.userId?.last_name}`}
              role={feedback.userId?.user_type || "Client"}
              imageUrl={
                feedback.userId?.profile_photo_url || "/default-avatar.png"
              }
              comment={feedback.comment}
              rating={feedback.rating}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-muted">
            No testimonials available for this category.
          </p>
        )}
      </CustomCarousel>
    </div>
  );
};

export default Testimonials;
