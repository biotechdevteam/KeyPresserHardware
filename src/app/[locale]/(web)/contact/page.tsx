import { Metadata } from "next";
import Contact from "@/components/about/about-footer/AboutFooter";
import Error from "@/app/[locale]/error";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    // Use aboutData fields from schema
    const title = aboutData?.name
      ? `Contact ${aboutData.name} ~ BioTec Universe`
      : "Contact BioTec Universe ~ Bio-Technology Association Cameroon";
    const description = aboutData?.contact_email
      ? `Reach out to ${aboutData.name || "BioTec Universe"} at ${
          aboutData.contact_email
        } for inquiries, support, or collaboration opportunities in biotechnology.`
      : "Contact BioTec Universe, a Bio-Technology association in Buea, Cameroon, for inquiries, support, or collaboration.";

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "contact",
        "biotechnology",
        "Cameroon",
        "Buea",
        "biochemistry",
        "University of Buea",
        "support",
        aboutData?.name || "association",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/contact",
        languages: {
          "en-US": "/en-US/contact",
          "fr-FR": "/fr-FR/contact",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/contact",
        title,
        description,
        siteName: "BioTec Universe",
        images: [
          {
            url: aboutData?.logo_url || "/images/logo.png",
            width: 1200,
            height: 630,
            alt: `${aboutData?.name || "BioTec Universe"} Contact Page`,
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
          : "@BioTecUniverse", // Use dynamic Twitter handle if available
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
      title: "Contact BioTec Universe ~ Bio-Technology Association Cameroon",
      description:
        "Contact BioTec Universe, a Bio-Technology association in Buea, Cameroon, for inquiries, support, or collaboration.",
      keywords: [
        "BioTec Universe",
        "contact",
        "biotechnology",
        "Cameroon",
        "Buea",
        "biochemistry",
        "University of Buea",
        "support",
        "association",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/contact",
        languages: {
          "en-US": "/en-US/contact",
          "fr-FR": "/fr-FR/contact",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/contact",
        title: "Contact BioTec Universe ~ Bio-Technology Association Cameroon",
        description:
          "Contact BioTec Universe, a Bio-Technology association in Buea, Cameroon, for inquiries, support, or collaboration.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe Contact Page",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Contact BioTec Universe ~ Bio-Technology Association Cameroon",
        description:
          "Contact BioTec Universe, a Bio-Technology association in Buea, Cameroon, for inquiries, support, or collaboration.",
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

export default async function ContactPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    return (
      <section className="container min-h-screen mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-4xl md:text-5xl">Contact Us</h1>
            <p className="text-lg mt-4 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help. Get in
              touch with our team for inquiries and support.
            </p>
          </div>
          <div className="w-full">
            <Contact aboutData={aboutData} />
          </div>

          <div className="mt-8 text-center text-sm">
            <p>We typically respond to inquiries within 24-48 hours.</p>
          </div>
        </div>
      </section>
    );
  } catch (error: any) {
    return (
      <Error
        error={
          error.message ||
          "Failed to load contact information. Please try again later."
        }
      />
    );
  }
}
