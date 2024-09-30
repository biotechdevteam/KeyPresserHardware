import { createAsyncThunk } from "@reduxjs/toolkit";
import { Events } from "@/types/eventsSchema";
import { fetchData } from "@/lib/fetchUtils";
import {
  setEventsData,
  setError,
  setLoading,
} from "@/lib/features/events/eventSlice";

// Thunk for fetching the "Events" data
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { dispatch }) => {
    dispatch(setLoading(true)); // Set loading state to true before fetch
    try {
      const response = await fetchData("/events", "GET"); // Fetch the data
      dispatch(setEventsData(response.data)); // Dispatch the data to the store
    } catch (error) {
      const message = (error as Error).message || "An error occurred";
      dispatch(setError(message)); // Dispatch error message
    } finally {
      dispatch(setLoading(false)); // Reset loading state
    }
  }
);

// Thunk for creating new "Events" data
export const createEvents = createAsyncThunk(
  "events/createEvents",
  async (eventsData: Events, { dispatch }) => {
    try {
      const response = await fetchData("/events", "POST", eventsData); // Post the data
      dispatch(setEventsData(response.data)); // Dispatch the new data
      return response.data;
    } catch (error) {
      const message = (error as Error).message || "An error occurred";
      dispatch(setError(message)); // Dispatch error message
      throw error;
    }
  }
);

// Thunk for updating "Events" data
export const updateEvents = createAsyncThunk(
  "events/updateEvents",
  async (
    { id, eventsData }: { id: string; eventsData: Partial<Events> },
    { dispatch }
  ) => {
    try {
      const response = await fetchData(`/events/${id}`, "PUT", eventsData); // Update the data
      dispatch(setEventsData(response.data)); // Dispatch updated data
      return response.data;
    } catch (error) {
      const message = (error as Error).message || "An error occurred";
      dispatch(setError(message)); // Dispatch error message
      throw error;
    }
  }
);
