import { Metadata } from "next";
import EventsContainer from "@/components/events/events-container/EventsContainer";
import Error from "@/app/[locale]/error";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const eventsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    const currentDate = new Date(); // Current date per your context
    const upcomingEvents = eventsData.filter(
      (e: any) => new Date(e.startTime) > currentDate
    );
    const eventCount = upcomingEvents.length || 0;
    const eventTypes = [
      ...new Set(upcomingEvents.map((e: any) => e.eventType)),
    ].join(", ");
    const title = "Upcoming Events ~ BioTec Universe";
    const description = eventTypes
      ? `Join ${eventCount} upcoming ${eventTypes} events by BioTec Universe.`
      : `Discover ${eventCount} upcoming biotechnology events by BioTec Universe in Cameroon.`;

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "upcoming events",
        "biotechnology",
        "Cameroon",
        "Buea",
        "future events",
        ...(upcomingEvents.map((e: any) => e.eventType) || []).slice(0, 5),
        ...(upcomingEvents.map((e: any) => e.title) || []).slice(0, 5),
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/upcoming-events",
        languages: {
          "en-US": "/en-US/upcoming-events",
          "fr-FR": "/fr-FR/upcoming-events",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/upcoming-events",
        title,
        description,
        siteName: "BioTec Universe",
        images:
          upcomingEvents.length > 0 && upcomingEvents[0].eventImageUrl
            ? [
                {
                  url: upcomingEvents[0].eventImageUrl,
                  width: 1200,
                  height: 630,
                  alt: upcomingEvents[0].title,
                },
              ]
            : [
                {
                  url: "/images/logo.png",
                  width: 1200,
                  height: 630,
                  alt: "BioTec Universe Upcoming Events",
                },
              ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images:
          upcomingEvents.length > 0 && upcomingEvents[0].eventImageUrl
            ? [upcomingEvents[0].eventImageUrl]
            : ["/images/logo.png"],
        creator: "@BioTecUniverse",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Failed to fetch eventsData for metadata:", error);
    return {
      title: "Upcoming Events ~ BioTec Universe",
      description:
        "Discover upcoming biotechnology events by BioTec Universe in Cameroon.",
      keywords: [
        "BioTec Universe",
        "upcoming events",
        "biotechnology",
        "Cameroon",
        "Buea",
        "future events",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/upcoming-events",
        languages: {
          "en-US": "/en-US/upcoming-events",
          "fr-FR": "/fr-FR/upcoming-events",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/upcoming-events",
        title: "Upcoming Events ~ BioTec Universe",
        description:
          "Discover upcoming biotechnology events by BioTec Universe in Cameroon.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe Upcoming Events",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Upcoming Events ~ BioTec Universe",
        description:
          "Discover upcoming biotechnology events by BioTec Universe in Cameroon.",
        images: ["/images/logo.png"],
        creator: "@BioTecUniverse",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }
}

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
