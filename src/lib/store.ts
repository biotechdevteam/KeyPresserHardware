import { configureStore } from "@reduxjs/toolkit";
import aboutReducer from "@/lib/features/about/aboutSlice";
import eventsReducer from "@/lib/features/events/eventSlice";

export const store = configureStore({
  reducer: {
    about: aboutReducer,
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
