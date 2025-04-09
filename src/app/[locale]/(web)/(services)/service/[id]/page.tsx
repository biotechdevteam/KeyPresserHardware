import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ServiceDetails from "@/components/services/service-details/ServiceDetails";
import { Service } from "@/types/ServiceSchema";
import { Feedback } from "@/types/feedbackSchema";
import type { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";

// Define Props type for consistency across functions
type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Generate static params
export async function generateStaticParams() {
  try {
    const services = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/services`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    return services.map((service: Service) => ({
      id: service._id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Dynamic Metadata Generation
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { id } = await params;
    const services = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/services`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    const service = services.find((s: Service) => s._id === id);

    if (!service) {
      return {
        title: "Service Not Found",
        description: "The requested service could not be found.",
      };
    }

    const previousImages = (await parent).openGraph?.images || [];
    const serviceImages = service.portfolio_urls || [];
    const featuredImage = serviceImages.length > 0 ? serviceImages[0] : null;

    return {
      title: `${service.title} ~ BioTec Universe`,
      description:
        service.summary ||
        "Learn more about our professional services at BioTec Universe",
      openGraph: {
        title: `${service.title} ~ BioTec Universe`,
        description:
          service.summary || "Professional services by BioTec Universe",
        images: featuredImage
          ? [featuredImage, ...previousImages].filter(Boolean)
          : [...previousImages],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${service.title} ~ BioTec Universe`,
        description:
          service.summary || "Professional services by BioTec Universe",
        images: featuredImage ? [featuredImage] : [],
      },
      alternates: {
        canonical: `/services/${id}`,
      },
      keywords: [
        service.title,
        service.service_category,
        "BioTec Universe",
        "professional services",
      ],
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Service Details - BioTec Universe",
      description: "Explore our professional services",
    };
  }
}

export default async function ServicePage({ params }: Props) {
  setRequestLocale("en");

  try {
    const { id } = await params;

    // Fetch services and feedbacks in parallel for better performance
    const [services, feedbacks] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services`, {
        cache: "force-cache",
        next: { revalidate: 3600 }, // Revalidate every hour
      }).then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch services: ${res.status}`);
        return res.json();
      }),

      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/feedback`, {
        cache: "force-cache",
        next: { revalidate: 3600 }, // Revalidate every hour
      }).then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch feedback: ${res.status}`);
        return res.json();
      }),
    ]);

    const service = services.find((s: Service) => s._id === id);

    if (!service) {
      return notFound();
    }

    // Filter feedbacks for this service
    const filteredFeedbacks = feedbacks?.filter(
      (f: Feedback) => f.serviceId?._id === id
    );

    return (
      <div className="container mx-auto px-4 py-8">
        <ServiceDetails service={service} feedbacks={filteredFeedbacks} />
      </div>
    );
  } catch (error) {
    console.error("Error in service page:", error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-muted-foreground">
          We encountered an error while loading this service. Please try again
          later.
        </p>
      </div>
    );
  }
}
