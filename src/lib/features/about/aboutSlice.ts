import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { About } from "@/types/aboutSchema";
import { RootState } from "@/lib/store";

interface AboutState {
  data: About;
  loading: boolean;
  error: string | null;
}

const initialState: AboutState = {
  data: {
    name: "",
    slogan: "",
    logo_url: "",
    cover_photo_url: "",
    mission_statement: "",
    vision_statement: "",
    history: "",
    contact_email: "",
    contact_phone: "",
    address: "",
    achievements: [],
    partnerships: [],
    social_links: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
    appendices: [],
    videos: [],
    images: [],
    documents: [],
  },
  loading: false,
  error: null,
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setAboutData(state, action: PayloadAction<About>) {
      state.data = action.payload;
    },
    updateAboutField(
      state,
      action: PayloadAction<{ key: keyof About; value: any }>
    ) {
      state.data[action.payload.key] = action.payload.value;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setAboutData, updateAboutField, setLoading, setError } =
  aboutSlice.actions;

export const selectAbout = (state: RootState) => state.about;

export default aboutSlice.reducer;
