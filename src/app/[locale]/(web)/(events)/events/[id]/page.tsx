import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Event } from "@/types/eventsSchema";
import EventDetails from "@/components/events/event-details/EventDetails";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

// Fetch all event IDs for static generation
export async function generateStaticParams() {
  const events = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`, {
    cache: "force-cache",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching events for static params:", error);
      return [];
    });

  return events.map((event: Event) => ({
    id: event._id,
  }));
}

type Props = {
  params: Promise<{ id: string; locale?: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { id } = await params;
    const events = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events`,
      {
        next: { revalidate: 60 }, // Dynamic revalidation instead of static cache
      }
    ).then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch events: ${res.status}`);
      return res.json();
    });

    const event = events.find((e: Event) => e._id === id);

    if (!event) {
      return {
        title: "Event Not Found ~ BioTec Universe",
        description: "The requested event could not be found.",
        robots: { index: false, follow: false }, // Prevent indexing of 404
      };
    }

    const previousImages = (await parent).openGraph?.images || [];
    const eventImage = event.eventImageUrl || "/images/logo.png";

    return {
      title: `${event.title} ~ BioTec Universe`,
      description:
        event.summary ||
        `Join ${event.title}, a ${event.eventType} event on ${new Date(
          event.startTime
        ).toLocaleDateString()} at ${event.location} by BioTec Universe.`,
      keywords: [
        event.title,
        event.eventType,
        event.location,
        "BioTec Universe",
        "event",
        "biotechnology",
        "Cameroon",
        "Buea",
        ...(event.speakers?.map((s: any) => s.speakerRole).filter(Boolean) ||
          []),
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: `/events/${id}`,
        languages: {
          "en-US": `/en-US/events/${id}`,
          "fr-FR": `/fr-FR/events/${id}`,
        },
      },
      openGraph: {
        type: "article",
        url: `https://biotecuniverse.org/events/${id}`,
        title: `${event.title} ~ BioTec Universe`,
        description:
          event.summary ||
          `Join ${event.title}, a ${event.eventType} event on ${new Date(
            event.startTime
          ).toLocaleDateString()} at ${event.location}.`,
        siteName: "BioTec Universe",
        images: eventImage
          ? [{ url: eventImage, width: 1200, height: 630, alt: event.title }]
          : [
              {
                url: "/images/logo.png",
                width: 1200,
                height: 630,
                alt: event.title,
              },
            ],
        locale: "en_US",
        // event: {
        //   start_date: event.startTime,
        //   end_date: event.endTime,
        //   location: event.location,
        // },
      },
      twitter: {
        card: "summary_large_image",
        title: `${event.title} ~ BioTec Universe`,
        description:
          event.summary ||
          `Join ${event.title}, a ${event.eventType} event on ${new Date(
            event.startTime
          ).toLocaleDateString()} at ${event.location}.`,
        images: [eventImage],
        creator: event.speakers?.[0]?.memberId?.social_links?.find(
          (link: string) => link.includes("twitter.com")
        )
          ? `@${(link: string) =>
              link.replace("https://twitter.com/", "").split("/").pop()}`
          : "@BioTecUniverse",
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
    console.error("Error generating metadata:", error);
    return {
      title: "Error ~ Event Details ~ BioTec Universe",
      description: "An error occurred while loading this event.",
      metadataBase: new URL("https://biotecuniverse.org"),
      robots: { index: false, follow: false }, // Prevent indexing of errors
    };
  }
}

export default async function EventPage({ params }: Props) {
  const { id, locale } = await params;
  setRequestLocale(locale || "en");

  const events = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`, {
    next: { revalidate: 60 }, // Dynamic revalidation for fresh data
  }).then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch events: ${res.status}`);
    return res.json();
  });

  const event = events.find((e: Event) => e._id === id);

  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <Button
          variant="link"
          size="sm"
          asChild
          className="flex items-center text-muted-foreground hover:text-foreground"
        >
          <Link href="/events">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Events
          </Link>
        </Button>
      </div>

      <EventDetails event={event} />
    </div>
  );
}
