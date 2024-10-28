"use client";
import { useEffect, useState } from "react";
import { User } from "@/types/userSchema";
import { applyRequest, signInRequest, signUpRequest } from "./utils/fetchUtils";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "../../pageTransitions";

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
}

interface ApiErrorResponse {
  statusCode: number;
  error: string;
  messages: string[]; // This will handle validation errors or other message arrays from the backend
  method: string;
  path: string;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useTransitionRouter();

  // Check authentication on component mount
  useEffect(() => {
    const access_token = localStorage.getItem("token");

    if (access_token) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      setAuthState({
        isAuthenticated: true,
        user: user ? user : null,
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        user: null,
      });
    }
  }, []);

  // Improved handleApiError function
  const handleApiError = (errorResponse: any) => {
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

  // Sign-in logic
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await signInRequest(email, password);
      const { access_token, user } = data;

      // Save the token and user data in localStorage
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update the auth state
      setAuthState({
        isAuthenticated: true,
        user,
      });

      // Redirect to a protected route
      return true;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Sign-up logic
  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userType: string,
    profilePhotoUrl?: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const data = await signUpRequest(
        email,
        password,
        firstName,
        lastName,
        userType,
        profilePhotoUrl
      );
      const { access_token, user } = data;

      // Save the token and user data in localStorage
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update the auth state
      setAuthState({
        isAuthenticated: true,
        user,
      });

      // Redirect to a protected route
      //router.push("/dashboard");
      return true;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Apply function
  const apply = async (
    motivationLetter: string,
    specializationArea: string,
    resumeUrl: string,
    referredByMemberId?: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      // Ensure the user is authenticated and we have their ID
      if (!authState.user || !authState.user._id) {
        throw new Error("User is not authenticated.");
      }

      const userId = authState.user._id;

      // Call the apply request
      await applyRequest(
        userId,
        motivationLetter,
        specializationArea,
        resumeUrl,
        referredByMemberId
      );

      // If application was successful, you can handle further steps, e.g., redirecting
      return true;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Sign-out logic
  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({ isAuthenticated: false, user: null });
    router.push("/auth/signin", { onTransitionReady: slideInOut }); // Redirect to sign-in page after sign-out
  };

  return { ...authState, signIn, signUp, signOut, apply, loading, error };
};
