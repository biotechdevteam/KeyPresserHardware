import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "@/lib/fetchUtils";
import { setApplicantData, setError, setLoading } from "@/lib/features/users/applicantSlice";

// Thunk for submitting an application (Apply as an applicant)
export const applyApplicant = createAsyncThunk(
  "applicant/apply",
  async (
    {
      userId,
      motivationLetter,
      specializationArea,
      resumeUrl,
      referredByMemberId,
    }: {
      userId: string;
      motivationLetter: string;
      specializationArea: string;
      resumeUrl: string;
      referredByMemberId?: string;
    },
    { dispatch }
  ) => {
    dispatch(setLoading(true)); // Set loading state to true before applying
    try {
      const response = await fetchData("/auth/apply", "POST", {
        user_id: userId,
        motivation_letter: motivationLetter,
        specialization_area: specializationArea,
        resume_url: resumeUrl,
        referred_by_member_id: referredByMemberId,
      }); // Submit application data
      dispatch(setApplicantData(response?.data)); // Dispatch the application data to the store
      return response?.data;
    } catch (error) {
      const message =
        (error as Error).message || "An error occurred while applying.";
      dispatch(setError(message)); // Dispatch error message
      throw error; // Re-throw error for potential UI handling
    } finally {
      dispatch(setLoading(false)); // Reset loading state
    }
  }
);
