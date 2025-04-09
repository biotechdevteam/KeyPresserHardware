"use client";

import React, { useState, useEffect } from "react";
import { Feedback } from "@/types/feedbackSchema";
import TestimonialCard from "../testimonial-card/TestimonialCard";
import CustomCarousel from "./customcarousel";
import PlaceholderImg from "../../../../public/images/Profile_placeholder.png";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessagesSquare, Star, UserRound, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TestimonialsProps {
  feedbacks: Feedback[];
  selectedCategory?: string | null;
  title: string;
  categories?: string[];
  isHomepage?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  feedbacks,
  selectedCategory: initialCategory = "all",
  title,
  categories = [],
  isHomepage = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "all"
  );
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const allCategories = ["all", ...categories];

  // Get unique ratings from feedbacks
  const uniqueRatings = Array.from(
    new Set(feedbacks.map((feedback) => feedback.rating))
  ).sort((a, b) => b - a); // Sort in descending order

  // Filter feedbacks based on selected category and rating
  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      // Category filter
      (selectedCategory === "all" ||
        (feedback.serviceId &&
          feedback.serviceId.service_category === selectedCategory)) &&
      // Rating filter (if applied)
      (filterRating === null || feedback.rating === filterRating)
  );

  // Count feedbacks per category for the badges
  const categoryCountMap = feedbacks.reduce((acc, feedback) => {
    const category = feedback.serviceId?.service_category || "uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate average rating
  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
          feedbacks.length
        ).toFixed(1)
      : "0.0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-muted/30 py-16 px-4 rounded-lg"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex flex-col mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <MessagesSquare className="h-6 w-6 text-primary" />
              <h2 className="text-2xl lg:text-3xl font-bold">{title}</h2>
            </div>

            {!isHomepage && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <UserRound className="h-4 w-4 mr-1" />
                  <span>{feedbacks.length} testimonials</span>
                </div>

                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span>{averageRating} average rating</span>
                </div>
              </div>
            )}
          </div>

          {!isHomepage && (
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Category filter */}
              <div className="flex-1 sm:max-w-xs">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Filter by category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {allCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        <div className="flex items-center justify-between w-full">
                          <span className="capitalize">{category}</span>
                          <Badge variant="outline" className="ml-2">
                            {category === "all"
                              ? feedbacks.length
                              : categoryCountMap[category] || 0}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rating filter */}
              <div className="flex items-center gap-2">
                {uniqueRatings.map((rating) => (
                  <Button
                    key={rating}
                    variant={filterRating === rating ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setFilterRating(filterRating === rating ? null : rating)
                    }
                    className="flex items-center gap-1 min-w-9 h-9"
                  >
                    {rating} <Star className="h-3 w-3 fill-current" />
                  </Button>
                ))}
                {filterRating !== null && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilterRating(null)}
                    className="text-xs"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {filteredFeedbacks.length > 0 ? (
          <CustomCarousel showDots={true} pauseOnHover={true}>
            {filteredFeedbacks.map((feedback) => (
              <TestimonialCard
                key={feedback._id}
                name={`${feedback.userId?.first_name || ""} ${
                  feedback.userId?.last_name || ""
                }`}
                role={feedback.userId?.user_type || "Client"}
                serviceName={feedback.serviceId?.title || "Service"}
                imageUrl={
                  feedback.userId?.profile_photo_url || PlaceholderImg.src
                }
                comment={feedback.comment}
                rating={feedback.rating}
              />
            ))}
          </CustomCarousel>
        ) : (
          <div className="flex flex-col items-center justify-center bg-background p-12 rounded-lg shadow-sm">
            <MessagesSquare className="h-16 w-16 text-muted mb-4" />
            <h3 className="text-xl font-medium mb-2">No testimonials found</h3>
            {!isHomepage && (
              <p className="text-muted-foreground text-center max-w-md">
                {filterRating
                  ? `No ${filterRating}-star reviews found in this category.`
                  : `No testimonials available for ${
                      selectedCategory !== "all"
                        ? `"${selectedCategory}"`
                        : "this selection"
                    }.`}
              </p>
            )}
            {(selectedCategory !== "all" || filterRating !== null) && (
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSelectedCategory("all");
                  setFilterRating(null);
                }}
              >
                View all testimonials
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Testimonials;
