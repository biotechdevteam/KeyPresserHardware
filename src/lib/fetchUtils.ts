import axiosInstance from "@/lib/axiosInstance";
import { About } from "@/types/aboutSchema";
import { Member } from "@/types/memberSchema";
import { AxiosError } from "axios";

export const fetchData = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  body?: any
) => {
  try {
    switch (method) {
      case "POST":
        return await axiosInstance.post(url, body);
      case "PUT":
        return await axiosInstance.put(url, body);
      case "PATCH":
        return await axiosInstance.patch(url, body);
      case "DELETE":
        return await axiosInstance.delete(url);
      default:
        return await axiosInstance.get(url);
    }
  } catch (error) {
    // Log the real error for debugging
    console.error(`Error during fetch (${method}) for ${url}:`, error);

    // If it's an AxiosError, throw it as is, so it can be handled downstream
    if (error instanceof AxiosError) {
      throw error; // Re-throw the real Axios error so the calling function can handle it
    }

    // Otherwise, throw a generic error for unknown cases
    throw new Error("Network error occurred.");
  }
};


// Fetch About Data
export const fetchAboutData = async (): Promise<About> => {
  try {
    const response = await fetchData("/about", "GET");
    return response?.data;
  } catch (error) {
    console.error("Error during fetchAboutData:", error);
    throw new Error("Network request failed.");
  }
};

// Fetch Members Function
export const fetchMembers = async (): Promise<Member[]> => {
  try {
    const response = await fetchData("/auth/members", "GET");
    return response?.data;
  } catch (error) {
    console.error("Error during fetchMembers:", error);
    throw new Error("Failed to fetch members.");
  }
};

// Sign Up Function
export const signUpRequest = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  userType: string,
  profilePhotoUrl?: string
) => {
  try {
    const response = await fetchData("/auth/signup", "POST", {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      user_type: userType,
      profile_photo_url: profilePhotoUrl,
    });
    return response?.data;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error;
  }
};

// Sign In Function
export const signInRequest = async (email: string, password: string) => {
  try {
    const response = await fetchData("/auth/signin", "POST", {
      email,
      password,
    });
    return response?.data;
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
};

// Apply Function
export const applyRequest = async (
  userId: string,
  motivationLetter: string,
  specializationArea: string,
  resumeUrl: string,
  referredByMemberId?: string
) => {
  try {
    const response = await fetchData("/auth/apply", "POST", {
      user_id: userId,
      motivation_letter: motivationLetter,
      specialization_area: specializationArea,
      resume_url: resumeUrl,
      referred_by_member_id: referredByMemberId,
    });
    return response?.data;
  } catch (error) {
    console.error("Error during application:", error);
    throw error;
  }
};