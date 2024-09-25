"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axiosInstance"; // Assuming axiosInstance.ts sets up Axios

interface AuthState {
  isAuthenticated: boolean;
  user: null | { email: string; first_name: string; last_name: string }; // Add more fields as needed
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
  const router = useRouter();

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

  // Helper function to handle API errors
  const handleApiError = (errorResponse: any) => {
    if (errorResponse.response && errorResponse.response.data) {
      const errorData: ApiErrorResponse = errorResponse.response.data;
      return (
        errorData.messages.join(", ") || "An error occurred. Please try again."
      );
    }
    return "An error occurred. Please try again.";
  };

  // Sign-in logic
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/auth/signin", {
        email,
        password,
      });

      const { access_token, user } = response.data;

      // Save the token and user data in localStorage
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update the auth state
      setAuthState({
        isAuthenticated: true,
        user,
      });

      // Redirect to a protected route
      router.push("/");
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
      const response = await axios.post("/auth/signup", {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        user_type: userType,
        profile_photo_url: profilePhotoUrl, // Optional
      });

      const { access_token, user } = response.data;

      // Save the token and user data in localStorage
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update the auth state
      setAuthState({
        isAuthenticated: true,
        user,
      });

      // Redirect to a protected route
      router.push("/dashboard");
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Sign-out logic
  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({ isAuthenticated: false, user: null });
    router.push("/auth/signin"); // Redirect to sign-in page after sign-out
  };

  return { ...authState, signIn, signUp, signOut, loading, error };
};
