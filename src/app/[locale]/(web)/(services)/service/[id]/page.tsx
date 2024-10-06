// app/services/[id]/page.tsx
import React from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchFeedbacks, fetchServices as fetchServicesData } from "@/lib/fetchUtils"; // Fetch function for services
import { notFound } from "next/navigation";
import ServiceDetails from "@/components/services/service-details/ServiceDetails";

// Helper function to fetch service data
async function getServiceData() {
  const queryClient = new QueryClient();

  // Prefetch the service data on the server
  await queryClient.prefetchQuery({
    queryKey: ["services"],
    queryFn: fetchServicesData,
  });
  await queryClient.prefetchQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
  });

  // Return the prefetched data and the dehydrated state
  return {
    dehydratedState: dehydrate(queryClient),
    servicesData: await fetchServicesData(),
    feedbacks: await fetchFeedbacks(),
  };
}

// Page component
export default async function ServicePage({
  params,
}: {
  params: { id: string };
}) {
  const { servicesData, feedbacks } = await getServiceData(); // Fetch the data server-side

  // Find the service with the matching ID
  const service = servicesData.find((s: any) => s._id === params.id);
  const filteredFeedbacks = feedbacks.filter((f) => f.serviceId?._id === params.id)

  // If the service is not found, show a 404 page
  if (!service) {
    return notFound();
  }

  return (
    <div>
      {/* Render the ServiceDetails component and pass the service */}
      <ServiceDetails service={service} feedbacks={filteredFeedbacks} />
    </div>
  );
}
