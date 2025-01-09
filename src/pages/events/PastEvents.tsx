"use client";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { fetchEvents, fetchFeedbacks } from "@/lib/utils/fetchUtils";
import { Event } from "@/types/eventsSchema";
import EventsContainer from "@/components/events/events-container/EventsContainer";
import Error from "@/app/[locale]/error";
import Loader from "@/components/loader/Loader";

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch events and feedbacks data
    const events = await fetchEvents();
    const feedbacks = await fetchFeedbacks();

    // Return data as props with ISR enabled
    return {
      props: {
        events,
        feedbacks,
        isError: false,
      },
      revalidate: 60, // Revalidate data every 60 seconds
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        events: [],
        feedbacks: [],
        isError: true,
      },
      revalidate: 60,
    };
  }
};

const PastEvents = ({
  events,
  feedbacks,
  isError,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // Handle loading state (Client-side simulation)
  const isLoading = events.length === 0 && feedbacks.length === 0 && !isError;

  if (isLoading) {
    return <Loader />;
  }

  // Handle error state
  if (isError) {
    return <Error error="Error in loading past events and feedbacks." />;
  }

  // Get today's date
  const today = new Date();

  // Filter past events
  const pastEvents = events.filter((event: Event) => {
    const endDate = event.endTime;
    return endDate ? new Date(endDate) < today : false;
  });

  return (
    <section className="grid min-h-screen place-items-center p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Past Events</h1>
          <p className="text-lg mt-4">
            Take a look at our previous events and activities.
          </p>
        </header>
        {pastEvents.length > 0 ? (
          <EventsContainer
            initialData={{
              events: pastEvents,
              feedbacks,
            }}
          />
        ) : (
          <div className="text-center">No past events.</div>
        )}
      </div>
    </section>
  );
};

export default PastEvents;
