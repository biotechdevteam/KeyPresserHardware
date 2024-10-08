import React from "react";
import EventsContainer from "@/components/events/events-container/EventsContainer"; // Main container component
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchFeedbacks, fetchEvents } from "@/lib/fetchUtils";

const EventsPage: React.FC = async () => {
  const { events, feedbacks } = await getEventsAndFeedbacks();

  return (
    <div className="">
      <EventsContainer initialData={{ events, feedbacks }} />
    </div>
  );
};

async function getEventsAndFeedbacks() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
  await queryClient.prefetchQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
  });

  const [events, feedbacks] = await Promise.all([
    fetchEvents(),
    fetchFeedbacks(),
  ]);

  return {
    dehydratedState: dehydrate(queryClient),
    events,
    feedbacks,
  };
}

export default EventsPage;
