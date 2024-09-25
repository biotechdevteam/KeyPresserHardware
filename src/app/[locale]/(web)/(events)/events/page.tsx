import React from "react";
import EventsContainer from "@/components/events/events-container/EventsContainer"; // Main container component

const EventsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto bg-background text-foreground shadow-md rounded-lg p-6">
      <EventsContainer />
    </div>
  );
};

export default EventsPage;
