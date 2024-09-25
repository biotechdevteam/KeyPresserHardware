import React from "react";
import EventsHeader from "@/components/events/events-header/EventsHeader";

const EventLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <section className="">
      {/* Header */}
      <header>
        <EventsHeader />
      </header>

      {/* Page Content */}
      <main className="flex-grow container mx-auto py-8">{children}</main>

      {/* Footer */}
      <footer></footer>
    </section>
  );
};

export default EventLayout;
