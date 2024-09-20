import { configureStore } from "@reduxjs/toolkit";
import aboutReducer from "@/lib/features/about/aboutSlice";

export const store = configureStore({
  reducer: {
    about: aboutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
