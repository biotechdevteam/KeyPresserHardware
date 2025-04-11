import { Metadata } from "next";
import FAQContainer from "@/components/faq/faq-container/FAQContainer";
import Error from "@/app/[locale]/error";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const faqData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about/faqs`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    // Use faqData (array of FAQs) to customize metadata
    const firstQuestion = faqData?.[0]?.question;
    const categories = [
      ...new Set(faqData?.map((faq: any) => faq.category)),
    ].join(", ");
    const title = firstQuestion
      ? `FAQs: ${firstQuestion.slice(0, 30)}... ~ BioTec Universe`
      : "FAQs ~ BioTec Universe ~ Bio-Technology Association Cameroon";
    const description = categories
      ? `Explore FAQs on ${categories} at BioTec Universe, a Bio-Technology association in Cameroon.`
      : "Find answers to frequently asked questions about BioTec Universe, a Bio-Technology association in Buea, Cameroon.";

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "FAQ",
        "frequently asked questions",
        "biotechnology",
        "Cameroon",
        "Buea",
        "biochemistry",
        "University of Buea",
        ...(categories ? categories.split(", ") : []),
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/faqs",
        languages: {
          "en-US": "/en-US/faqs",
          "fr-FR": "/fr-FR/faqs",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/faqs",
        title,
        description,
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe FAQ Page",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
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
  } catch (error) {
    console.error("Failed to fetch faqData for metadata:", error);
    // Fallback metadata
    return {
      title: "FAQs ~ BioTec Universe ~ Bio-Technology Association Cameroon",
      description:
        "Find answers to frequently asked questions about BioTec Universe, a Bio-Technology association in Buea, Cameroon.",
      keywords: [
        "BioTec Universe",
        "FAQ",
        "frequently asked questions",
        "biotechnology",
        "Cameroon",
        "Buea",
        "biochemistry",
        "University of Buea",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/faqs",
        languages: {
          "en-US": "/en-US/faqs",
          "fr-FR": "/fr-FR/faqs",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/faqs",
        title: "FAQs ~ BioTec Universe ~ Bio-Technology Association Cameroon",
        description:
          "Find answers to frequently asked questions about BioTec Universe, a Bio-Technology association in Buea, Cameroon.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe FAQ Page",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "FAQs ~ BioTec Universe ~ Bio-Technology Association Cameroon",
        description:
          "Find answers to frequently asked questions about BioTec Universe, a Bio-Technology association in Buea, Cameroon.",
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

export default async function FAQPage() {
  try {
    const faqData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about/faqs`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    return (
      <section className="min-h-screen w-full mx-auto">
        <FAQContainer faqData={faqData} />
      </section>
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
