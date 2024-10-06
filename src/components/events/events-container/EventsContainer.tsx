"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import EventCard from "@/components/events/events-card/EventsCard";
import PastEventsCarousel from "@/components/events/past-events/PastEventsCarousel";
import SearchContainer from "@/components/events/search-event/SearchContainer";
import EventDetailsModal from "@/components/events/events-details/EventsDetails";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchEvents } from "@/lib/thunks/events/eventThunks";

const EventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>(
    {}
  );
  const [openEnrollModal, setOpenEnrollModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const dispatch: AppDispatch = useDispatch();
  const eventsData = useSelector((state: RootState) => state.events.data);
  const loading = useSelector((state: RootState) => state.events.loading);
  const error = useSelector((state: RootState) => state.events.error);

  React.useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">Error: {error}</div>;
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const toggleEventDetails = (id: string) => {
    setExpandedEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEnrollClick = (event: any) => {
    setSelectedEvent(event);
    setOpenEnrollModal(true);
  };

  return (
    <div className="p-4">
      {/* Search and Filter */}
      {/* <SearchContainer
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredData={eventsData}
      /> */}

      <h2 className="text-2xl text-center mb-4">Join Us In Our Events</h2>

      {/* Upcoming Events */}
      <div className="space-y-4">
        {/* {eventsData.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            expanded={expandedEvents[event._id]}
            toggleEventDetails={toggleEventDetails}
            handleEnrollClick={handleEnrollClick}
          />
        ))} */}
      </div>

      {/* Past Events Carousel */}
      <div className="mt-10">
        <h3 className="text-xl text-center">Our Past Events</h3>
        {/* {pastEvents.length > 0 && <PastEventsCarousel events={pastEvents} />} */}
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

export default EventsPage;
