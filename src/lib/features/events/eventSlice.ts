import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Events } from "@/types/eventsSchema";
import { RootState } from "@/lib/store";

interface EventsState {
  data: Events;
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  data: {
    _id: "",
    title: "",
    description: "",
    // details: "",
    startTime: "",
    endTime: "",
    location: "",
    eventType: "",
    eventImageUrl: "",
    registrationDeadline: "",
    createdAt: "",
    updatedAt: "",
    // isRegistrationOpen: false,
  },
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEventsData(state, action: PayloadAction<Events>) {
      state.data = action.payload;
    },
    updateEventsField(
      state,
      action: PayloadAction<{ key: keyof Events; value: never }> // rough work, you will probably need to edit in future
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

export default eventsSlice.reducer;
