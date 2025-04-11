import { Metadata } from "next";
import ActivitiesCalendarPage from "@/components/events/calender/Calender";
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
    const firstEventTitle = eventsData?.[0]?.title;
    const title = firstEventTitle
      ? `Events Calendar: ${firstEventTitle.slice(0, 20)}... ~ BioTec Universe`
      : "Events Calendar ~ BioTec Universe";
    const description = eventCount
      ? `Discover ${eventCount} upcoming events at BioTec Universe, a biotechnology association in Cameroon.`
      : "Discover upcoming events at BioTec Universe, a biotechnology association in Buea, Cameroon.";

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "events",
        "calendar",
        "biotechnology",
        "Cameroon",
        "Buea",
        "activities",
        "schedule",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/calendar-of-activities",
        languages: {
          "en-US": "/en-US/calendar-of-activities",
          "fr-FR": "/fr-FR/calendar-of-activities",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/calendar-of-activities",
        title,
        description,
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png", // No image in eventsData; use fallback
            width: 1200,
            height: 630,
            alt: "BioTec Universe Events Calendar",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/images/logo.png"],
        creator: "@BioTecUniverse", // Update with actual handle
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
      title: "Events Calendar ~ BioTec Universe",
      description:
        "Discover upcoming events at BioTec Universe, a biotechnology association in Buea, Cameroon.",
      keywords: [
        "BioTec Universe",
        "events",
        "calendar",
        "biotechnology",
        "Cameroon",
        "Buea",
        "activities",
        "schedule",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/calendar-of-activities",
        languages: {
          "en-US": "/en-US/calendar-of-activities",
          "fr-FR": "/fr-FR/calendar-of-activities",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/calendar-of-activities",
        title: "Events Calendar ~ BioTec Universe",
        description:
          "Discover upcoming events at BioTec Universe, a biotechnology association in Buea, Cameroon.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe Events Calendar",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Events Calendar ~ BioTec Universe",
        description:
          "Discover upcoming events at BioTec Universe, a biotechnology association in Buea, Cameroon.",
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

export default async function CalenderPage() {
  try {
    const eventsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());
    return <ActivitiesCalendarPage eventsData={eventsData} />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
