"use client";
import React, { useState } from "react";
import SearchContainer from "@/components/events/search-event/SearchContainer";
import { Feedback } from "@/types/feedbackSchema";
import { Event } from "@/types/eventsSchema";
import RegisterDialog from "@/components/register-dialog/RegisterDialog";
import EnrollEventForm from "../events-enroll/EnrollForm";
import EventCard from "../events-card/EventsCard";

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
  const filteredEvents = initialData.events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="text-center">No events found</div>
        )}
      </div>
    </div>
  );
};

export default EventsContainer;