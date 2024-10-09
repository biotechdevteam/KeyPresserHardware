import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "@/types/eventsSchema"; // assuming you renamed it to Event
import { RootState } from "@/lib/store";

interface EventsState {
  data: Event;
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  data: {
    _id: "",
    title: "",
    summary: "",
    description: "",
    startTime: "",
    endTime: "",
    location: "",
    eventType: "online", // default value
    eventImageUrl: "",
    registrationDeadline: "",
    createdAt: "",
    updatedAt: "",
    isRegistrationOpen: false,
    speakers: [], // empty array as initial value
    attendees: [], // empty array as initial value
  },
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEventsData(state, action: PayloadAction<Event>) {
      state.data = action.payload;
    },
    updateEventsField<K extends keyof Event>(
      state,
      action: PayloadAction<{ key: K; value: Event[K] }>
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

export const { setEventsData, updateEventsField, setLoading, setError } =
  eventsSlice.actions;

export const selectEvents = (state: RootState) => state.events;
export const selectEventsLoading = (state: RootState) => state.events.loading;
export const selectEventsError = (state: RootState) => state.events.error;

export default eventsSlice.reducer;

export default eventsSlice.reducer;
