import axiosInstance from "@/lib/axiosInstance";
import { About } from "@/types/aboutSchema";
import { Blog, blogSchema } from "@/types/blogSchema";
import { Event } from "@/types/eventsSchema";
import { FAQs, FAQsSchema } from "@/types/FAQSchema";
import FeedbackSchema, { Feedback } from "@/types/feedbackSchema";
import { Member } from "@/types/memberSchema";
import { Project } from "@/types/projectSchema";
import { Service } from "@/types/ServiceSchema";
import { AxiosError } from "axios";
import { z } from "zod";

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

// Fetch About Data
export const fetchServices = async (): Promise<Service[]> => {
  try {
    const response = await fetchData("/services", "GET");
    return response?.data;
  } catch (error) {
    console.error("Error during fetcServices:", error);
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

// Fetch FAQ Data
export const fetchFAQs = async (): Promise<FAQs> => {
  try {
    const response = await fetchData("/about/faqs", "GET");
    return FAQsSchema.parse(response?.data);
  } catch (error) {
    console.error("Error during fetchFAQs:", error);
    throw new Error("Failed to fetch FAQs.");
  }
};

// Fetch Feedbacks Data
export const fetchFeedbacks = async (): Promise<Feedback[]> => {
  try {
    const response = await fetchData("/feedback", "GET");
    return response?.data;
  } catch (error) {
    console.error("Error during fetchFeedbacks:", error);
    throw new Error("Failed to fetch feedbacks.");
  }
};

// Fetch Projects Data
export const fetchProjectsData = async (): Promise<Project[]> => {
  try {
    const response = await fetchData("/projects", "GET"); // Adjust the URL if necessary
    return response?.data;
  } catch (error) {
    console.error("Error during fetchProjectsData:", error);
    throw new Error("Failed to fetch projects.");
  }
};

// Fetch Blogs Function
export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await fetchData("/blog/posts", "GET");
    return response?.data;
  } catch (error) {
    console.error("Error during fetchBlogs:", error);
    throw new Error("Failed to fetch blogs.");
  }
};

// Fetch Blogs Function
export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetchData("/events", "GET");
    return response?.data;
  } catch (error) {
    console.error("Error during fetchEvents:", error);
    throw new Error("Failed to fetch events.");
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

// Book Service Function
export const bookService = async (
  userId: string,
  serviceId: string,
  bookingDate: string,
  description: string
) => {
  try {
    const response = await fetchData("/services/book", "POST", {
      user_id: userId,
      service_id: serviceId,
      booking_date: bookingDate,
      description,
    });
    return response?.data;
  } catch (error) {
    console.error("Error during bookService:", error);
    throw error;
  }
};

// Register for Event Function
export const registerForEvent = async (
  userId: string,
  eventId: string,
  notes: string
) => {
  try {
    const response = await fetchData("/events/register", "POST", {
      userId: userId,
      eventId: eventId,
      notes,
    });
    return response?.data;
  } catch (error) {
    console.error("Error during registerForEvent:", error);
    throw error;
  }
};

// Create Comment Function
export const createComment = async (
  postId: string,
  userId: string,
  commentText: string
) => {
  try {
    const response = await fetchData("/blog/comments", "POST", {
      postId,
      userId,
      commentText,
    });
    return response?.data;
  } catch (error) {
    console.error("Error during comment creation:", error);
    throw error;
  }
};

// Enum for reaction types
export enum ReactionType {
  Like = "like",
  Dislike = "dislike"
}

// React to Blog Post Function
export const reactToBlogPost = async (
  postId: string,
  userId: string,
  reactionType: ReactionType,  // Use the enum here
  remove: boolean = false
) => {
  try {
    const response = await fetchData("/blog/posts/reactions", "POST", {
      postId,
      userId,
      reactionType,
      remove,
    });
    return response?.data;
  } catch (error) {
    console.error("Error during reaction to blog post:", error);
    throw error;
  }
};

// React to Comment Function
export const reactToComment = async (
  commentId: string,
  userId: string,
  reactionType: ReactionType,  // Use the enum here
  remove: boolean = false
) => {
  try {
    const response = await fetchData("/blog/comments/reactions", "POST", {
      commentId,
      userId,
      reactionType,
      remove,
    });
    return response?.data;
  } catch (error) {
    console.error("Error during reaction to comment:", error);
    throw error;
  }
};
