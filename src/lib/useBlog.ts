import { useState } from "react";
import { createComment, ReactionType, reactToBlogPost, reactToComment } from "./fetchUtils"; // Assuming you have these in fetchUtils
import { handleApiError } from "./apiErrorHandler"; // Assuming handleApiError handles errors

export const useBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null); // Adjust based on your response structure

  // Handle comment creation on blog post
  const handleCreateComment = async (
    postId: string,
    userId: string,
    commentText: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const result = await createComment(postId, userId, commentText);
      setResponse(result); // You can set a response if needed
      return true; // Indicating success
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return false; // Indicating failure
    } finally {
      setLoading(false);
    }
  };

  // Handle reaction on blog post
  const handleReactToBlogPost = async (
    postId: string,
    userId: string,
    reactionType: ReactionType, // Using enum as suggested
    remove: boolean = false
  ) => {
    console.log("reacting to post")
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await reactToBlogPost(
        postId,
        userId,
        reactionType,
        remove
      );
      setResponse(result);
      setSuccessMessage(
        remove
          ? "Reaction removed successfully."
          : "Reaction added/updated successfully."
      );
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle reaction on comment
  const handleReactToComment = async (
    commentId: string,
    userId: string,
    reactionType: ReactionType, // Using enum as suggested
    remove: boolean = false
  ) => {
    console.log("reacting to comment")
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await reactToComment(
        commentId,
        userId,
        reactionType,
        remove
      );
      setResponse(result);
      setSuccessMessage(
        remove
          ? "Reaction removed successfully."
          : "Reaction added/updated successfully."
      );
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    successMessage,
    response,
    handleCreateComment,
    handleReactToBlogPost,
    handleReactToComment,
  };
};
