import { useState } from "react";
import { bookService } from "./utils/fetchUtils";
import { handleApiError } from "./apiErrorHandler";

export const useBookService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null); // Adjust type based on the actual response
  const [success, setSuccess] = useState<string | null>(null); // New success state

  const handleBookService = async (
    userId: string,
    serviceId: string,
    bookingDate: string,
    description: string
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(null); // Reset success message before new booking attempt
    try {
      const result = await bookService(
        userId,
        serviceId,
        bookingDate,
        description
      );
      setResponse(result);

      // Set success message if booking is successful
      setSuccess("Your service booking was successful!");
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, response, handleBookService };
};
