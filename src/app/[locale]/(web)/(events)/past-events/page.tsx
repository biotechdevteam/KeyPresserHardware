"use client";
import EventsContainer from "@/components/events/events-container/EventsContainer";

export default async function PastEventsPage() {
  return (
    <section className="grid min-h-screen place-items-center p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Past Events</h1>
          <p className="text-lg mt-4">
            Take a look at our previous events and activities.
          </p>
        </header>
        <EventsContainer pastEvents />
      </div>
    </section>
  );
}
