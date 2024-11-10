"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "@/types/userSchema";
import {
  applyRequest,
  signInRequest,
  signUpRequest,
  fetchData,
} from "./utils/fetchUtils";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "../../pageTransitions";
import { Member } from "@/types/memberSchema";

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  profile: null | Member;
}

interface ApiErrorResponse {
  statusCode: number;
  error: string;
  messages: string[];
  method: string;
  path: string;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    profile: null, // Initialize profile to null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useTransitionRouter();

  useEffect(() => {
    const access_token = Cookies.get("token");

    if (access_token) {
      const user = Cookies.get("user");
      setAuthState({
        isAuthenticated: true,
        user: user ? JSON.parse(user) : null,
        profile: null, // Set profile to null initially
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        user: null,
        profile: null,
      });
    }
  }, []);

  const handleApiError = (errorResponse: any) => {
    console.log("error during request", errorResponse);
    if (errorResponse.response && errorResponse.response.data) {
      const errorData: ApiErrorResponse = errorResponse.response.data;
      if (errorData.messages && errorData.messages.length > 0) {
        return errorData.messages.join(", ");
      }
      return errorData.error || "An error occurred. Please try again.";
    }
    return "An unexpected error occurred. Please try again.";
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await signInRequest(email, password);
      const { access_token, user } = data;

      Cookies.set("token", access_token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });

      setAuthState({
        isAuthenticated: true,
        user,
        profile: null, // Profile will be fetched separately
      });

      return true;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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

      Cookies.set("token", access_token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });

      setAuthState({
        isAuthenticated: true,
        user,
        profile: null,
      });

      return true;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getMemberProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      // Ensure user is authenticated and has an ID
      if (!authState.user || !authState.user._id) {
        throw new Error("User is not authenticated.");
      }

      const userId = authState.user._id;
      const response = await fetchData(`/auth/members/${userId}`, "GET");
      const profileData: Member = response?.data;

      // Update the profile in auth state
      setAuthState((prevState) => ({
        ...prevState,
        profile: profileData,
      }));
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const apply = async (
    motivationLetter: string,
    specializationArea: string,
    resumeUrl: string,
    referredByMemberId?: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      if (!authState.user || !authState.user._id) {
        throw new Error("User is not authenticated.");
      }

      const userId = authState.user._id;

      await applyRequest(
        userId,
        motivationLetter,
        specializationArea,
        resumeUrl,
        referredByMemberId
      );

      return true;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setAuthState({ isAuthenticated: false, user: null, profile: null });
    router.push("/auth/signin", { onTransitionReady: slideInOut });
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    apply,
    getMemberProfile,
    loading,
    error,
  };
};
