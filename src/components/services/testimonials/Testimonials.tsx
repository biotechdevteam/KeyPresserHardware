import React from "react";
import { Feedback } from "@/types/feedbackSchema";
import TestimonialCard from "../testimonial-card/TestimonialCard";
import CustomCarousel from "./customcarousel";
import { Separator } from "@/components/ui/separator";

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
    <div className="container px-4 lg:px-16 py-12">
      <h2 className="text-xl lg:text-2xl font-bold text-center">{title}</h2>
      <Separator className="w-32 mx-auto mb-8" />
      <CustomCarousel>
        {filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map((feedback) => (
            <TestimonialCard
              key={feedback._id}
              name={`${feedback.userId?.first_name} ${feedback.userId?.last_name}`}
              role={feedback.userId?.user_type || "Client"}
              imageUrl={
                feedback.userId?.profile_photo_url || ""
              }
              comment={feedback.comment}
              rating={feedback.rating}
            />
          ))
        ) : (
          <p className="col-span-full text-center">
            No testimonials available for this service.
          </p>
        )}
      </CustomCarousel>
    </div>
  );
};

export default Testimonials;
