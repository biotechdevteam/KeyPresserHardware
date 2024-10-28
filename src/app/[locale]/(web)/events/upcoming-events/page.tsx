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
// UpcomingEventsPage component to fetch and display upcoming events
const UpcomingEventsPage: React.FC = async () => {
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
    return <div>Error loading events...</div>;
  }

  // Get today's date
  const today = new Date();

  // Filter upcoming events
  const upcomingEvents = (eventsData as Event[]).filter((event) => {
    const endDate = event.endTime;
    return endDate ? new Date(endDate) >= today : false;
  });

  return (
    <section className="grid min-h-screen place-items-center p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Upcoming Events</h1>
          <p className="text-lg mt-4">
            Stay updated on our upcoming events and activities.
          </p>
        </header>
        {upcomingEvents.length > 0 ? (
          <EventsContainer
            initialData={{
              events: upcomingEvents,
              feedbacks: feedbacksData as Feedback[],
            }}
          />
        ) : (
          <div className="text-center">No upcoming events</div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEventsPage;
