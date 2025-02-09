import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server"; // Import this
import ServiceDetails from "@/components/services/service-details/ServiceDetails";
import { Service } from "@/types/ServiceSchema";
import { Feedback } from "@/types/feedbackSchema";

export default async function ServicePage({
  params,
}: {
  params: { id: string };
}) {
  // Set locale explicitly for static rendering
  setRequestLocale("en"); // Adjust based on your locale strategy

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
