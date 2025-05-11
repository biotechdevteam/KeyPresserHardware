import { Metadata } from "next";
import ServicesContainer from "@/components/services/services-container/ServiceContainer";
import Error from "@/app/[locale]/error";
import { Skeleton } from "@/components/ui/skeleton";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const services = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/services`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    // Use services (aligned with ServiceSchema) to customize metadata
    const serviceCount = services?.length || 0;
    const firstServiceTitle = services?.[0]?.title;
    const firstServiceSummary = services?.[0]?.summary;
    const categories = [
      ...new Set(services?.map((s: any) => s.service_category)),
    ].join(", ");

    const title = firstServiceTitle
      ? `Services: ${firstServiceTitle.slice(0, 20)}... ~ BioTec Universe`
      : "Services ~ BioTec Universe ~ Bio-Technology Association Cameroon";
    const description = firstServiceSummary
      ? `${firstServiceSummary.slice(
          0,
          140
        )}... Explore more at BioTec Universe.`
      : serviceCount
      ? `Explore ${serviceCount} services from BioTec Universe, a biotechnology leader in Cameroon.`
      : "Explore services offered by BioTec Universe, a Bio-Technology association in Buea, Cameroon.";

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "services",
        "biotechnology",
        "Cameroon",
        "Buea",
        "biochemistry",
        "University of Buea",
        "support",
        "resources",
        ...(services?.map((s: any) => s.title) || []).slice(0, 5), // Add service titles
        ...(categories ? categories.split(", ") : []), // Add unique categories
      ],
      metadataBase: new URL("https://biotecuniverse.org"), // Updated to .org per your code
      alternates: {
        canonical: "/services",
        languages: {
          "en-US": "/en-US/services",
          "fr-FR": "/fr-FR/services",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/services",
        title,
        description,
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png", // No image field in ServiceSchema; using your fallback
            width: 1200,
            height: 630,
            alt: `Services by BioTec Universe`,
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/images/logo.png"], // Consistent with your fallback
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
    console.error("Failed to fetch data for metadata:", error);
    // Fallback metadata
    return {
      title: "Services ~ BioTec Universe ~ Bio-Technology Association Cameroon",
      description:
        "Explore services offered by BioTec Universe, a Bio-Technology association in Buea, Cameroon.",
      keywords: [
        "BioTec Universe",
        "services",
        "biotechnology",
        "Cameroon",
        "Buea",
        "biochemistry",
        "University of Buea",
        "support",
        "resources",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/services",
        languages: {
          "en-US": "/en-US/services",
          "fr-FR": "/fr-FR/services",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/services",
        title:
          "Services ~ BioTec Universe ~ Bio-Technology Association Cameroon",
        description:
          "Explore services offered by BioTec Universe, a Bio-Technology association in Buea, Cameroon.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "Services by BioTec Universe",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title:
          "Services ~ BioTec Universe ~ Bio-Technology Association Cameroon",
        description:
          "Explore services offered by BioTec Universe, a Bio-Technology association in Buea, Cameroon.",
        images: ["/images/services.png"],
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

export default async function ServicesPage() {
  try {
    const [services, feedbacks] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/feedback`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
    ]);

    return (
      <ServicesContainer servicesData={services} feedbacksData={feedbacks} />
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}

// Loading component
export function ServicesLoading() {
  return (
    <div className="p-3 space-y-10">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-60 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
