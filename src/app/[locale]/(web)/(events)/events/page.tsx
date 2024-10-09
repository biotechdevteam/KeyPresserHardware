"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents, fetchFeedbacks } from "@/lib/fetchUtils";
import EventsContainer from "@/components/events/events-container/EventsContainer";
import Loader from "@/components/loader/Loader";
import { Event } from "@/types/eventsSchema";
import { Feedback } from "@/types/feedbackSchema";

// This function runs on the server-side and fetches both events and feedbacks data.
async function getEventsAndFeedbacksData() {
  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: Infinity, // Prevent unnecessary refetching, keep data fresh
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const feedbacksQuery = useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    eventsData: eventsQuery.data,
    eventsLoading: eventsQuery.isLoading,
    eventsFetching: eventsQuery.isFetching,
    eventsError: eventsQuery.isError,
    feedbacksData: feedbacksQuery.data,
    feedbacksLoading: feedbacksQuery.isLoading,
    feedbacksFetching: feedbacksQuery.isFetching,
    feedbacksError: feedbacksQuery.isError,
  };
}

// EventsPage component to fetch and display events and feedbacks data
const EventsPage: React.FC = async () => {
  // Fetch events and feedbacks data
  const {
    eventsData,
    eventsLoading,
    eventsFetching,
    eventsError,
    feedbacksData,
    feedbacksLoading,
    feedbacksFetching,
    feedbacksError,
  } = await getEventsAndFeedbacksData();

  // Handle loading states
  if (
    eventsLoading ||
    eventsFetching ||
    feedbacksLoading ||
    feedbacksFetching
  ) {
    return <Loader />;
  }

  // Handle error states
  if (eventsError || feedbacksError) {
    return <div>Error loading events or feedback data...</div>;
  }

  // Render the EventsContainer with the prefetched data
  return (
    <div>
      <EventsContainer
        initialData={{
          events: eventsData as Event[],
          feedbacks: feedbacksData as Feedback[],
        }}
      />
    </div>
  );
};

export default EventsPage;
