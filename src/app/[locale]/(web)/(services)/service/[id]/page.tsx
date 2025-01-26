import { notFound } from "next/navigation";
import ServiceDetails from "@/components/services/service-details/ServiceDetails";
import { Service } from "@/types/ServiceSchema";
import { Feedback } from "@/types/feedbackSchema";
import { Metadata, ResolvingMetadata } from "next";

// Fetch all service IDs for static generation
export async function generateStaticParams() {
  const services = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/services`,
    {
      cache: "force-cache",
    }
  ).then((res) => res.json());
  return services.map((service: Service) => ({
    id: service._id, // Map each service ID
  }));
}

// Dynamic Metadata Generation
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const services = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/services`,
    {
      cache: "force-cache",
    }
  ).then((res) => res.json());
  const service = services.find((s: Service) => s._id === params.id);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: service.title,
    description: service.summary,
    openGraph: {
      title: service.title,
      description: service.summary,
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.summary,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch services and feedbacks
  const [services, feedbacks] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services`, {
      cache: "force-cache",
    }).then((res) => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/feedback`, {
      cache: "force-cache",
    }).then((res) => res.json()),
  ]);
  // Find the service with the matching ID
  const service = services.find((s: Service) => s._id === params.id);
  // Filter feedbacks related to this service
  const filteredFeedbacks = feedbacks?.filter(
    (f: Feedback) => f.serviceId?._id === params.id
  );

  // Handle not found service
  if (!service) {
    return notFound();
  }

  return (
    <div className="max-w-4xl grid place-items-center mx-auto">
      <ServiceDetails service={service} feedbacks={filteredFeedbacks} />
    </div>
  );
}
