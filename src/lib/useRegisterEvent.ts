import { useState } from "react";
import { registerForEvent } from "./utils/fetchUtils";
import { handleApiError } from "./apiErrorHandler";

export const useRegisterEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Handle success message if needed
  const [response, setResponse] = useState<any>(null); // Adjust type based on response structure

  const handleRegisterEvent = async (
    userId: string,
    eventId: string,
    notes: string
  ) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const result = await registerForEvent(userId, eventId, notes);
      setResponse(result);
      setSuccessMessage("You have successfully registered for the event.");
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, successMessage, response, handleRegisterEvent };
};
