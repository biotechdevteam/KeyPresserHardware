"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents, fetchFeedbacks } from "@/lib/utils/fetchUtils";
import EventsContainer from "@/components/events/events-container/EventsContainer";
import Loader from "@/components/loader/Loader";
import { Event } from "@/types/eventsSchema";
import { Feedback } from "@/types/feedbackSchema";

// PastEventsPage component to fetch and display upcoming events
const PastEventsPage: React.FC = () => {
  const { 
    data: eventsData, 
    isLoading: eventsLoading, 
    isError: eventsError 
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: Infinity, // Prevent unnecessary refetching, keep data fresh
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { 
    data: feedbacksData, 
    isLoading: feedbacksLoading, 
    isError: feedbacksError 
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Handle loading states
  if (eventsLoading || feedbacksLoading) {
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
            Take a look at our events and activities.
          </p>
        </header>
        {pastEvents.length > 0 ? (
          <EventsContainer 
            initialData={{ 
              events: pastEvents, 
              feedbacks: feedbacksData as Feedback[] 
            }} 
          />
        ) : (
          <div className="text-center">No past events</div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEventsPage;
