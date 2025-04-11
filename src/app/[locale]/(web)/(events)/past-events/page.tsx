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
    const pastEvents = eventsData.filter(
      (e: any) => new Date(e.endTime) < currentDate
    );
    const eventCount = pastEvents.length || 0;
    const eventTypes = [
      ...new Set(pastEvents.map((e: any) => e.eventType)),
    ].join(", ");
    const title = "Past Events ~ BioTec Universe";
    const description = eventTypes
      ? `Review ${eventCount} past ${eventTypes} events by BioTec Universe.`
      : `Explore ${eventCount} past biotechnology events by BioTec Universe in Cameroon.`;

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "past events",
        "biotechnology",
        "Cameroon",
        "Buea",
        "previous events",
        ...(pastEvents.map((e: any) => e.eventType) || []).slice(0, 5),
        ...(pastEvents.map((e: any) => e.title) || []).slice(0, 5),
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/past-events",
        languages: {
          "en-US": "/en-US/past-events",
          "fr-FR": "/fr-FR/past-events",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/past-events",
        title,
        description,
        siteName: "BioTec Universe",
        images:
          pastEvents.length > 0 && pastEvents[0].eventImageUrl
            ? [
                {
                  url: pastEvents[0].eventImageUrl,
                  width: 1200,
                  height: 630,
                  alt: pastEvents[0].title,
                },
              ]
            : [
                {
                  url: "/images/logo.png",
                  width: 1200,
                  height: 630,
                  alt: "BioTec Universe Past Events",
                },
              ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images:
          pastEvents.length > 0 && pastEvents[0].eventImageUrl
            ? [pastEvents[0].eventImageUrl]
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
      title: "Past Events ~ BioTec Universe",
      description:
        "Explore past biotechnology events by BioTec Universe in Cameroon.",
      keywords: [
        "BioTec Universe",
        "past events",
        "biotechnology",
        "Cameroon",
        "Buea",
        "previous events",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/past-events",
        languages: {
          "en-US": "/en-US/past-events",
          "fr-FR": "/fr-FR/past-events",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/past-events",
        title: "Past Events ~ BioTec Universe",
        description:
          "Explore past biotechnology events by BioTec Universe in Cameroon.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe Past Events",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Past Events ~ BioTec Universe",
        description:
          "Explore past biotechnology events by BioTec Universe in Cameroon.",
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

export default async function PastEventsPage() {
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
              Past Events
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our previous events and see what you might have missed.
            </p>
          </header>

          <EventsContainer
            eventsData={eventsData}
            feedbacksData={feedbacks}
            pastEvents
          />
        </div>
      </section>
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load past events. Please try again."}
      />
    );
  }
}
