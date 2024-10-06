import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const applicantSlice = createSlice({
  name: "applicant",
  initialState,
  reducers: {
    setApplicantData(state, action) {
      state.data = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setApplicantData, setLoading, setError } =
  applicantSlice.actions;
export default applicantSlice.reducer;
