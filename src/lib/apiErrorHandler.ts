export interface ApiErrorResponse {
  statusCode: number;
  error: string;
  messages: string[]; // This will handle validation errors or other message arrays from the backend
  method: string;
  path: string;
}
// Improved handleApiError function
export const handleApiError = (errorResponse: any) => {
  console.log("error during request", errorResponse);
  if (errorResponse.response && errorResponse.response.data) {
    const errorData: ApiErrorResponse = errorResponse.response.data;

    // If the error has messages, return them joined as a string
    if (errorData.messages && errorData.messages.length > 0) {
      return errorData.messages.join(", ");
    }

    // If there are no messages, return the error field or a default message
    return errorData.error || "An error occurred. Please try again.";
  }

  // Fallback for when there's no response data
  return "An unexpected error occurred. Please try again.";
};
