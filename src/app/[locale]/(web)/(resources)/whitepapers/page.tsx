import { Metadata } from "next";
import Error from "@/app/[locale]/error";
import WhitePapers from "@/components/resources/whitepapers/Whitepapers";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    // Use aboutData to customize metadata
    const title = aboutData?.name
      ? `White Papers ~ ${aboutData.name}`
      : "White Papers ~ BioTec Universe ~ Bio-Technology Association Cameroon";
    const description = aboutData?.mission_statement
      ? `Explore white papers from ${
          aboutData.name
        }, advancing ${aboutData.mission_statement.slice(0, 80)}...`
      : "Explore white papers from BioTec Universe, a Bio-Technology association in Buea, Cameroon.";

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "white papers",
        "biotechnology",
        "Cameroon",
        "Buea",
        "biochemistry",
        "University of Buea",
        "research",
        "resources",
        "technology",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/whitepapers",
        languages: {
          "en-US": "/en-US/whitepapers",
          "fr-FR": "/fr-FR/whitepapers",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/whitepapers",
        title,
        description,
        siteName: "BioTec Universe",
        images: [
          {
            url: aboutData?.logo_url || "/images/logo.png", // Dynamic logo or fallback
            width: 1200,
            height: 630,
            alt: `White Papers by ${aboutData?.name || "BioTec Universe"}`,
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
          : "@BioTecUniverse", // Dynamic handle if available
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
      title:
        "White Papers ~ BioTec Universe ~ Bio-Technology Association Cameroon",
      description:
        "Explore white papers from BioTec Universe, a Bio-Technology association in Buea, Cameroon.",
      keywords: [
        "BioTec Universe",
        "white papers",
        "biotechnology",
        "Cameroon",
        "Buea",
        "biochemistry",
        "University of Buea",
        "research",
        "resources",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/whitepapers",
        languages: {
          "en-US": "/en-US/whitepapers",
          "fr-FR": "/fr-FR/whitepapers",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/whitepapers",
        title:
          "White Papers ~ BioTec Universe ~ Bio-Technology Association Cameroon",
        description:
          "Explore white papers from BioTec Universe, a Bio-Technology association in Buea, Cameroon.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "White Papers by BioTec Universe",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title:
          "White Papers ~ BioTec Universe ~ Bio-Technology Association Cameroon",
        description:
          "Explore white papers from BioTec Universe, a Bio-Technology association in Buea, Cameroon.",
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

export default async function WhitePapersPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    return <WhitePapers aboutData={aboutData} />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
