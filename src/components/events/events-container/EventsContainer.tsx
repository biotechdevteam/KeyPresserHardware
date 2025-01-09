"use client";
import React, { useState } from "react";
import SearchContainer from "@/components/events/search-event/SearchContainer";
import { Feedback } from "@/types/feedbackSchema";
import { Event } from "@/types/eventsSchema";
import RegisterDialog from "@/components/register-dialog/RegisterDialog";
import EnrollEventForm from "../events-enroll/EnrollForm";
import EventCard from "../events-card/EventsCard";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { fetchEvents, fetchFeedbacks } from "@/lib/utils/fetchUtils";
import Error from "@/app/[locale]/error";
import Loader from "@/components/loader/Loader";

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch events and feedbacks data
    const eventsData = await fetchEvents();
    const feedbacksData = await fetchFeedbacks();

    // Return data as props with ISR enabled
    return {
      props: {
        eventsData,
        feedbacksData,
        isError: false,
      },
      revalidate: 60, // Revalidate data every 60 seconds
    };
  } catch (error) {
    return {
      props: {
        eventsData: [],
        feedbacksData: [],
        isError: true,
        error: error,
      },
      revalidate: 60,
    };
  }
};

interface EventsContainerProps
  extends InferGetStaticPropsType<typeof getStaticProps> {
  pastEvents?: boolean;
  upcomingEvents?: boolean;
}

const EventsContainer: React.FC<EventsContainerProps> = ({
  eventsData,
  feedbacksData, // Not used!
  pastEvents = false,
  upcomingEvents = false,
  isError,
  error,
}) => {
  // Handle loading state (Client-side simulation)
  const isLoading =
    eventsData.length === 0 && feedbacksData.length === 0 && !isError;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>(
    {}
  );
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isEnrollFormOpen, setIsEnrollFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };
  const toggleEventDetails = (id: string) => {
    setExpandedEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  // Open the register dialog before enrolling
  const handleOpenRegisterDialog = (event: Event) => {
    setSelectedEvent(event); // Set the selected event
    setIsRegisterDialogOpen(true); // Open the registration dialog
  };
  // After registration, open enroll form
  const handleRegisterComplete = () => {
    setIsRegisterDialogOpen(false); // Close the registration dialog
    setIsEnrollFormOpen(true); // Open the enrollment form
  };

  // Filter events based on search term
  const filteredEvents: Event[] = eventsData.filter((event: Event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get today's date
  const today = new Date();
  // Initialize events with a default value
  let events = eventsData;
  // Filter events based on past or present
  if (pastEvents) {
    events = eventsData.filter((event: Event) => {
      const endDate = event.endTime;
      return endDate ? new Date(endDate) < today : false;
    });
  } else if (upcomingEvents) {
    events = eventsData.filter((event: Event) => {
      const endDate = event.endTime;
      return endDate ? new Date(endDate) >= today : false;
    });
  }

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error error={error} />;
  }

  return (
    <div className="p-4">
      {/* Register Dialog for event enrollment */}
      {isRegisterDialogOpen && (
        <RegisterDialog
          onComplete={handleRegisterComplete}
          onCancel={() => setIsRegisterDialogOpen(false)}
        />
      )}

      {/* Enrollment Form Modal */}
      {isEnrollFormOpen && selectedEvent && (
        <EnrollEventForm
          eventId={selectedEvent?._id}
          eventTitle={selectedEvent?.title}
          onComplete={() => setIsEnrollFormOpen(false)}
          onCancel={() => setIsEnrollFormOpen(false)}
        />
      )}

      {/* Search and Filter */}
      <SearchContainer
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredData={filteredEvents}
      />

      {/* Render the filtered events */}
      <div className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              expanded={expandedEvents[event._id]}
              toggleEventDetails={toggleEventDetails}
              handleEnrollClick={() => handleOpenRegisterDialog(event)} // Pass event to register dialog
            />
          ))
        ) : (
          <div className="text-center">No events found.</div>
        )}
      </div>
    </div>
  );
};

export default EventsContainer;
