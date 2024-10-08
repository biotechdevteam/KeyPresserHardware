"use client";
import React, { useState } from "react";
import EventCard from "@/components/events/events-card/EventsCard";
import PastEventsCarousel from "@/components/events/past-events/PastEventsCarousel";
import SearchContainer from "@/components/events/search-event/SearchContainer";
import EventDetailsModal from "@/components/events/events-details/EventsDetails";
import { Event } from "@/types/eventsSchema";
import { Feedback } from "@/types/feedbackSchema";
import { fetchEvents } from "@/lib/fetchUtils";
import { useQuery } from "@tanstack/react-query";

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
  const [openEnrollModal, setOpenEnrollModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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

  const handleEnrollClick = (event: Event) => {
    setSelectedEvent(event);
    setOpenEnrollModal(true);
  };

  return (
    <div className="p-4">
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
              handleEnrollClick={handleEnrollClick}
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

      {/* Enroll Modal */}
      {selectedEvent && (
        <EventDetailsModal
          open={openEnrollModal}
          event={selectedEvent}
          onClose={() => setOpenEnrollModal(false)}
        />
      )}
    </div>
  );
};

export default EventsContainer;
