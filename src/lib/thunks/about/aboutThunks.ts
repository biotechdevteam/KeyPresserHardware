import { createAsyncThunk } from "@reduxjs/toolkit";
import { About } from "@/types/aboutSchema";
import { fetchData } from "@/lib/utils/fetchUtils";
import {
  setAboutData,
  setError,
  setLoading,
} from "@/lib/features/about/aboutSlice";

// Thunk for fetching the "About" data
export const fetchAbout = createAsyncThunk(
  "about/fetchAbout",
  async (_, { dispatch }) => {
    dispatch(setLoading(true)); // Set loading state to true before fetch
    try {
      const response = await fetchData("/about", "GET"); // Fetch the data
      dispatch(setAboutData(response?.data)); // Dispatch the data to the store
    } catch (error) {
      const message = (error as Error).message || "An error occurred";
      dispatch(setError(message)); // Dispatch error message
    } finally {
      dispatch(setLoading(false)); // Reset loading state
    }
  }
);

// Thunk for creating new "About" data
export const createAbout = createAsyncThunk(
  "about/createAbout",
  async (aboutData: About, { dispatch }) => {
    try {
      const response = await fetchData("/about", "POST", aboutData); // Post the data
      dispatch(setAboutData(response?.data)); // Dispatch the new data
      return response?.data;
    } catch (error) {
      const message = (error as Error).message || "An error occurred";
      dispatch(setError(message)); // Dispatch error message
      throw error;
    }
  }
);

// Thunk for updating "About" data
export const updateAbout = createAsyncThunk(
  "about/updateAbout",
  async (
    { id, aboutData }: { id: string; aboutData: Partial<About> },
    { dispatch }
  ) => {
    try {
      const response = await fetchData(`/about/${id}`, "PUT", aboutData); // Update the data
      dispatch(setAboutData(response?.data)); // Dispatch updated data
      return response?.data;
    } catch (error) {
      const message = (error as Error).message || "An error occurred";
      dispatch(setError(message)); // Dispatch error message
      throw error;
    }
  }
);
