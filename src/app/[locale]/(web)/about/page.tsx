import { Metadata } from "next";
import AboutContainer from "@/components/about/about-container/AboutContainer";
import Error from "@/app/[locale]/error";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    // Use aboutData fields from schema
    const title = aboutData?.name
      ? `About ${aboutData.name} ~ BioTec Universe`
      : "About BioTec Universe ~ Bio-Technology Association Cameroon";
    const description = aboutData?.mission_statement
      ? `${aboutData.mission_statement.slice(0, 157)}...`
      : "Learn about BioTec Universe, a Bio-Technology association in Buea, Cameroon, founded by 2024/2025 Master's graduates from the University of Buea.";
    const image = aboutData?.logo_url || "/images/logo.png";

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "about",
        "biotechnology",
        "Cameroon",
        "Buea",
        "biochemistry",
        "University of Buea",
        aboutData?.name || "association",
        aboutData?.slogan ? aboutData.slogan.toLowerCase() : "science",
      ],
      metadataBase: new URL("https://biotecuniverse.com"),
      alternates: {
        canonical: "/about",
        languages: {
          "en-US": "/en-US/about",
          "fr-FR": "/fr-FR/about",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.com/about",
        title,
        description,
        siteName: "BioTec Universe",
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: `${aboutData?.name || "BioTec Universe"} Logo`,
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
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
      title: "About BioTec Universe ~ Bio-Technology Association Cameroon",
      description:
        "Learn about BioTec Universe, a Bio-Technology association in Buea, Cameroon, founded by 2024/2025 Master's graduates from the University of Buea.",
      keywords: [
        "BioTec Universe",
        "about",
        "biotechnology",
        "Cameroon",
        "Buea",
        "biochemistry",
        "University of Buea",
        "association",
        "science",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/about",
        languages: {
          "en-US": "/en-US/about",
          "fr-FR": "/fr-FR/about",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/about",
        title: "About BioTec Universe ~ Bio-Technology Association Cameroon",
        description:
          "Learn about BioTec Universe, a Bio-Technology association in Buea, Cameroon, founded by 2024/2025 Master's graduates from the University of Buea.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe Logo",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "About BioTec Universe ~ Bio-Technology Association Cameroon",
        description:
          "Learn about BioTec Universe, a Bio-Technology association in Buea, Cameroon, founded by University of Buea graduates.",
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

export default async function AboutPage() {
  try {
    const [aboutData, members] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/about`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/members`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
    ]);

    return (
      <div className="p-6">
        <AboutContainer aboutData={aboutData} members={members} />
      </div>
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
