"use client";
import EventsContainer from "@/components/events/events-container/EventsContainer";

export default async function UpcomingEventsPage() {
  return (
    <section className="grid min-h-screen place-items-center p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Upcoming Events</h1>
          <p className="text-lg mt-4">
            Stay updated on our future events and activities.
          </p>
        </header>
        <EventsContainer upcomingEvents />
      </div>
    </section>
  );
}
