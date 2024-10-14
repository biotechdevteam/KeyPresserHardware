"use client";
import React, { useState } from "react";
import EventCard from "@/components/events/events-card/EventsCard";
import PastEventsCarousel from "@/components/events/past-events/PastEventsCarousel";
import SearchContainer from "@/components/events/search-event/SearchContainer";
import { Event } from "@/types/eventsSchema";
import { Feedback } from "@/types/feedbackSchema";
import { fetchEvents } from "@/lib/fetchUtils";
import { useQuery } from "@tanstack/react-query";
import RegisterDialog from "@/components/register-dialog/RegisterDialog";
import EnrollEventForm from "../events-enroll/EnrollForm";

interface EventsContainerProps {
  initialData: {
    events: Event[];
    feedbacks: Feedback[];
  };
}

const EventsContainer: React.FC<EventsContainerProps> = ({ initialData }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>(
    {}
  );
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isEnrollFormOpen, setIsEnrollFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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

  // Use `useQuery` to fetch events, with initial data from props
  const { data: eventsData = initialData.events } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    initialData: initialData.events,
  });

  // Get today's date
  const today = new Date();

  // Filter upcoming and past events
  const upcomingEvents = eventsData.filter((event: Event) => {
    const endDate = event.endTime; // TypeScript infers that endDate could be undefined
    return endDate ? new Date(endDate) >= today : false; // Check if endDate is defined
  });

  const pastEvents = eventsData.filter((event: Event) => {
    const endDate = event.endTime; // TypeScript infers that endDate could be undefined
    return endDate ? new Date(endDate) < today : false; // Check if endDate is defined
  });

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const toggleEventDetails = (id: string) => {
    setExpandedEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
          eventId={selectedEvent._id}
          eventTitle={selectedEvent.title}
          onComplete={() => setIsEnrollFormOpen(false)}
          onCancel={() => setIsEnrollFormOpen(false)}
        />
      )}

      {/* Search and Filter */}
      <SearchContainer
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredData={eventsData}
      />

      <h2 className="text-2xl text-center mb-4">Join Us In Our Events</h2>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 ? (
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              expanded={expandedEvents[event._id]}
              toggleEventDetails={toggleEventDetails}
              handleEnrollClick={() => handleOpenRegisterDialog(event)} // Pass event to register dialog
            />
          ))}
        </div>
      ) : (
        <div className="text-center">No upcoming events</div>
      )}

      {/* Past Events Carousel Section */}
      <div className="mt-10">
        <h3 className="text-xl text-center">Our Past Events</h3>
        {pastEvents.length > 0 ? (
          <PastEventsCarousel events={pastEvents} />
        ) : (
          <div className="text-center">No past events</div>
        )}
      </div>
    </div>
  );
};

export default EventsContainer;
