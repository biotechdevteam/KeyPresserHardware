import { useState } from "react";
import { createReview } from "./utils/fetchUtils";
import { handleApiError } from "./apiErrorHandler";
import { Feedback } from "@/types/feedbackSchema";

export const useFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [response, setResponse] = useState<Feedback | null>(null);

  const handleCreateReview = async (
    userId: string,
    type: "testimonial" | "review",
    rating: number,
    comment: string,
    serviceId?: string,
    eventId?: string
  ) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await createReview(
        userId,
        type,
        rating,
        comment,
        serviceId,
        eventId
      );
      setResponse(result);
      setSuccessMessage(
        type === "testimonial"
          ? "Your testimonial has been submitted successfully!"
          : "Your review has been submitted successfully!"
      );
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, successMessage, response, handleCreateReview };
};
