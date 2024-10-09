import React from "react";
import { Feedback } from "@/types/feedbackSchema";
import TestimonialCard from "../testimonial-card/TestimonialCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialsProps {
  feedbacks: Feedback[];
  selectedCategory?: string | null;
  title: string
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
    <div className="container mx-auto px-4 py-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <Carousel className="w-full max-w-xs mx-auto">
        {" "}
        {/* Add mx-auto to center */}
        <CarouselContent className="flex justify-center items-center">
          {" "}
          {/* Flex to center items */}
          {filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map((feedback) => (
              <CarouselItem key={feedback._id} className="flex justify-center">
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
              </CarouselItem>
            ))
          ) : (
            <p className="col-span-full text-center text-muted">
              No testimonials available for this category.
            </p>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Testimonials;
