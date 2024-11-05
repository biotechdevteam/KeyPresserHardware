import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "@/lib/utils/fetchUtils";
import { setMembersData, setError, setLoading } from "@/lib/features/users/memberSlice";

// Thunk for fetching all members
export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async (_, { dispatch }) => {
    dispatch(setLoading(true)); // Set loading state to true before fetch
    try {
      const response = await fetchData("/auth/members", "GET"); // Fetch members data
      dispatch(setMembersData(response?.data)); // Dispatch the data to the store
    } catch (error) {
      const message =
        (error as Error).message || "An error occurred while fetching members.";
      dispatch(setError(message)); // Dispatch error message
    } finally {
      dispatch(setLoading(false)); // Reset loading state
    }
  }
);
