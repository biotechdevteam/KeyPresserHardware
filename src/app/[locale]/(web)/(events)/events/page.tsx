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

    const eventCount = eventsData?.length || 0;
    const eventTypes = [
      ...new Set(eventsData?.map((event: any) => event.eventType)),
    ].join(", ");
    const title = "Events ~ BioTec Universe";
    const description = eventTypes
      ? `Join ${eventCount} ${eventTypes} events hosted by BioTec Universe.`
      : `Discover ${eventCount} exciting biotechnology events by BioTec Universe in Cameroon.`;

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "events",
        "biotechnology",
        "Cameroon",
        "Buea",
        "workshops",
        "conferences",
        ...(eventsData?.map((event: any) => event.eventType) || []).slice(0, 5),
        ...(eventsData?.map((event: any) => event.title) || []).slice(0, 5),
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/events",
        languages: {
          "en-US": "/en-US/events",
          "fr-FR": "/fr-FR/events",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/events",
        title,
        description,
        siteName: "BioTec Universe",
        images:
          eventsData?.length > 0 && eventsData[0].eventImageUrl
            ? [
                {
                  url: eventsData[0].eventImageUrl,
                  width: 1200,
                  height: 630,
                  alt: eventsData[0].title,
                },
              ]
            : [
                {
                  url: "/images/logo.png",
                  width: 1200,
                  height: 630,
                  alt: "BioTec Universe Events",
                },
              ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images:
          eventsData?.length > 0 && eventsData[0].eventImageUrl
            ? [eventsData[0].eventImageUrl]
            : ["/images/logo.png"],
        creator: "@BioTecUniverse", // Could use speakers[0].memberId.social_links if Twitter-specific
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
      title: "Events ~ BioTec Universe",
      description:
        "Discover exciting biotechnology events by BioTec Universe in Cameroon.",
      keywords: [
        "BioTec Universe",
        "events",
        "biotechnology",
        "Cameroon",
        "Buea",
        "workshops",
        "conferences",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/events",
        languages: {
          "en-US": "/en-US/events",
          "fr-FR": "/fr-FR/events",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/events",
        title: "Events ~ BioTec Universe",
        description:
          "Discover exciting biotechnology events by BioTec Universe in Cameroon.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe Events",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Events ~ BioTec Universe",
        description:
          "Discover exciting biotechnology events by BioTec Universe in Cameroon.",
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

export default async function EventsPage() {
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
              Discover Our Events
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Dive into our exciting lineup of events and join us for
              unforgettable experiences.
            </p>
          </header>

          <EventsContainer eventsData={eventsData} feedbacksData={feedbacks} />
        </div>
      </section>
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load events. Please try again."}
      />
    );
  }
}
