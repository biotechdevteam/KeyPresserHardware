import { Metadata } from "next";
import PrivacyPolicy from "@/components/Policies/PrivacyPolicy";
import Error from "@/app/[locale]/error";
import { About } from "@/types/aboutSchema";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutData: About = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    const title = aboutData?.name
      ? `Privacy Policy ~ ${aboutData.name}`
      : "Privacy Policy ~ BioTec Universe";
    const description = aboutData?.contact_email
      ? `Read ${aboutData.name}’s privacy policy. Contact us at ${aboutData.contact_email} for inquiries.`
      : "Read BioTec Universe’s privacy policy, a biotechnology association in Buea, Cameroon.";

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "privacy policy",
        "data protection",
        "biotechnology",
        "Cameroon",
        "Buea",
        "privacy",
        "legal",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/privacy-policy",
        languages: {
          "en-US": "/en-US/privacy-policy",
          "fr-FR": "/fr-FR/privacy-policy",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/privacy-policy",
        title,
        description,
        siteName: "BioTec Universe",
        images: [
          {
            url: aboutData?.logo_url || "/images/logo.png",
            width: 1200,
            height: 630,
            alt: `Privacy Policy by ${aboutData?.name || "BioTec Universe"}`,
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
      title: "Privacy Policy ~ BioTec Universe",
      description:
        "Read BioTec Universe’s privacy policy, a biotechnology association in Buea, Cameroon.",
      keywords: [
        "BioTec Universe",
        "privacy policy",
        "data protection",
        "biotechnology",
        "Cameroon",
        "Buea",
        "privacy",
        "legal",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/privacy-policy",
        languages: {
          "en-US": "/en-US/privacy-policy",
          "fr-FR": "/fr-FR/privacy-policy",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/privacy-policy",
        title: "Privacy Policy ~ BioTec Universe",
        description:
          "Read BioTec Universe’s privacy policy, a biotechnology association in Buea, Cameroon.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "Privacy Policy by BioTec Universe",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Privacy Policy ~ BioTec Universe",
        description:
          "Read BioTec Universe’s privacy policy, a biotechnology association in Buea, Cameroon.",
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

export default async function PrivacyPolicyPage() {
  try {
    const aboutData: About = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());
    return <PrivacyPolicy aboutData={aboutData} />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
