import { Metadata } from "next";
import EventExhibitions from "@/components/events/event-exhibitions/EventExhibitions";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    const title = aboutData?.name
      ? `Exhibitions & Sponsorship ~ ${aboutData.name}`
      : "Exhibitions & Sponsorship ~ BioTec Universe";
    const description = aboutData?.mission_statement
      ? `Join ${
          aboutData.name
        }’s events and sponsorship opportunities: ${aboutData.mission_statement.slice(
          0,
          80
        )}...`
      : "Join BioTec Universe’s exhibitions and sponsorship opportunities in biotechnology.";

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "exhibitions",
        "sponsorship",
        "events",
        "biotechnology",
        "Cameroon",
        "Buea",
        "support",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/exhibitions-&-sponsorship",
        languages: {
          "en-US": "/en-US/exhibitions-&-sponsorship",
          "fr-FR": "/fr-FR/exhibitions-&-sponsorship",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/exhibitions-&-sponsorship",
        title,
        description,
        siteName: "BioTec Universe",
        images: [
          {
            url: aboutData?.logo_url || "/images/logo.png",
            width: 1200,
            height: 630,
            alt: `Exhibitions & Sponsorship by ${
              aboutData?.name || "BioTec Universe"
            }`,
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [aboutData?.logo_url || "/images/logo.png"],
        creator: aboutData?.social_links?.twitter
          ? aboutData.social_links.twitter.split("/").pop()
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
    console.error("Failed to fetch aboutData for metadata:", error);
    return {
      title: "Exhibitions & Sponsorship ~ BioTec Universe",
      description:
        "Join BioTec Universe’s exhibitions and sponsorship opportunities in biotechnology.",
      keywords: [
        "BioTec Universe",
        "exhibitions",
        "sponsorship",
        "events",
        "biotechnology",
        "Cameroon",
        "Buea",
        "support",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/exhibitions-&-sponsorship",
        languages: {
          "en-US": "/en-US/exhibitions-&-sponsorship",
          "fr-FR": "/fr-FR/exhibitions-&-sponsorship",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/exhibitions-&-sponsorship",
        title: "Exhibitions & Sponsorship ~ BioTec Universe",
        description:
          "Join BioTec Universe’s exhibitions and sponsorship opportunities in biotechnology.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "Exhibitions & Sponsorship by BioTec Universe",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Exhibitions & Sponsorship ~ BioTec Universe",
        description:
          "Join BioTec Universe’s exhibitions and sponsorship opportunities in biotechnology.",
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

const ExhibitionsSponsorshipPage = () => {
  return <EventExhibitions />;
};

export default ExhibitionsSponsorshipPage;
