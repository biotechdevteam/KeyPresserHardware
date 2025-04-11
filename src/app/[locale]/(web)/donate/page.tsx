import { Metadata } from "next";
import Donation from "@/components/donation/Donation";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    // Use aboutData to customize metadata
    const title = aboutData?.name
      ? `Donate to ${aboutData.name} ~ BioTec Universe`
      : "Donate to BioTec Universe ~ Bio-Technology Association Cameroon";
    const description = aboutData?.mission_statement
      ? `Support ${
          aboutData.name
        }’s mission: ${aboutData.mission_statement.slice(
          0,
          100
        )}... Donate today!`
      : "Support BioTec Universe, a Bio-Technology association in Buea, Cameroon, by donating today!";

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "donate",
        "donation",
        "biotechnology",
        "Cameroon",
        "Buea",
        "biochemistry",
        "University of Buea",
        "support",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/donate",
        languages: {
          "en-US": "/en-US/donate",
          "fr-FR": "/fr-FR/donate",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/donate",
        title,
        description,
        siteName: "BioTec Universe",
        images: [
          {
            url: aboutData?.logo_url || "/images/logo.png", // Dynamic logo or fallback
            width: 1200,
            height: 630,
            alt: `Donate to ${aboutData?.name || "BioTec Universe"}`,
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [aboutData?.logo_url || "/images/logo.png"],
        creator: "@BioTecUniverse", // Update with actual handle if available
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
    // Fallback metadata
    return {
      title: "Donate to BioTec Universe ~ Bio-Technology Association Cameroon",
      description:
        "Support BioTec Universe, a Bio-Technology association in Buea, Cameroon, by donating today!",
      keywords: [
        "BioTec Universe",
        "donate",
        "donation",
        "biotechnology",
        "Cameroon",
        "Buea",
        "biochemistry",
        "University of Buea",
        "support",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/donate",
        languages: {
          "en-US": "/en-US/donate",
          "fr-FR": "/fr-FR/donate",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/donate",
        title:
          "Donate to BioTec Universe ~ Bio-Technology Association Cameroon",
        description:
          "Support BioTec Universe, a Bio-Technology association in Buea, Cameroon, by donating today!",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "Donate to BioTec Universe",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title:
          "Donate to BioTec Universe ~ Bio-Technology Association Cameroon",
        description:
          "Support BioTec Universe, a Bio-Technology association in Buea, Cameroon, by donating today!",
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

const DonatePage = () => {
  return (
    <div>
      <Donation />
    </div>
  );
};

export default DonatePage;
