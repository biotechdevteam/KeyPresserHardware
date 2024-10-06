import React from "react";
import ServiceHeader from "@/components/services/service-header/ServiceHeader";

// Layout component for the service details page
export default async function ServiceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string }; // Accept the params with service id
}) {
  const { service } = await getServiceHeaderData(params.id); // Get the service data using the id from params

  // Fallback in case the service is not found
  const serviceHeaderData = service || {
    title: "Service Title",
    summary: "This is a summary for the service.",
    portfolio_urls: [
      "https://via.placeholder.com/1200x400?text=Service+Image+Not+Available",
    ],
  };

  // Use the first image from portfolio_urls if available, otherwise use a placeholder
  const backgroundImageUrl =
    serviceHeaderData.portfolio_urls?.[0] ||
    "https://via.placeholder.com/1200x400?text=Service+Image+Not+Available";

  return (
    <div>
      {/* Render the ServiceHeader component */}
      <ServiceHeader
        title={serviceHeaderData.title}
        summary={serviceHeaderData.summary}
        backgroundImageUrl={backgroundImageUrl}
      />

      {/* Render the children (page content) below the header */}
      <main className="p-6">{children}</main>
    </div>
  );
}

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchServices as fetchServicesData } from "@/lib/fetchUtils"; // Assuming a fetch utility for fetching services

// Fetch data for the specific service using its ID
async function getServiceHeaderData(id: string) {
  const queryClient = new QueryClient();

  // Prefetch the service data
  await queryClient.prefetchQuery({
    queryKey: ["services"],
    queryFn: fetchServicesData,
  });

  const servicesData = await fetchServicesData();

  // Find the specific service by ID
  const service = servicesData.find((s: any) => s._id === id);

  return {
    dehydratedState: dehydrate(queryClient),
    service,
  };
}
