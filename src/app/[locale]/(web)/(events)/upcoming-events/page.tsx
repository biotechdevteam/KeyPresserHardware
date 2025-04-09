import EventsContainer from "@/components/events/events-container/EventsContainer";
import Error from "@/app/[locale]/error";

export default async function UpcomingEventsPage() {
  try {
    const [eventsData, feedbacks] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/feedback`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
    ]);

    return (
      <section className="bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Upcoming Events
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Join us for these exciting future events and expand your network.
            </p>
          </header>

          <EventsContainer
            eventsData={eventsData}
            feedbacksData={feedbacks}
            upcomingEvents
          />
        </div>
      </section>
    );
  } catch (error: any) {
    return (
      <Error
        error={
          error.message || "Failed to load upcoming events. Please try again."
        }
      />
    );
  }
}
