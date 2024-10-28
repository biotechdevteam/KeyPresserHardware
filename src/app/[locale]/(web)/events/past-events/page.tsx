"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents, fetchFeedbacks } from "@/lib/utils/fetchUtils";
import PastEventsCarousel from "@/components/events/past-events/PastEventsCarousel";
import Loader from "@/components/loader/Loader";
import { Event } from "@/types/eventsSchema";

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

// PastEventsPage component to fetch and display past events
const PastEventsPage: React.FC = async () => {
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

  // Filter past events
  const pastEvents = (eventsData as Event[]).filter((event) => {
    const endDate = event.endTime;
    return endDate ? new Date(endDate) < today : false;
  });

  return (
    <section className="grid min-h-screen place-items-center p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Past Events</h1>
          <p className="text-lg mt-4">
            Take a look at our past events and activities.
          </p>
        </header>
        {pastEvents.length > 0 ? (
          <PastEventsCarousel events={pastEvents} />
        ) : (
          <div className="text-center">No past events</div>
        )}
      </div>
    </section>
  );
};

export default PastEventsPage;
