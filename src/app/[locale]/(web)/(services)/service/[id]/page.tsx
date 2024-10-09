// app/services/[id]/page.tsx
"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import ServiceDetails from "@/components/services/service-details/ServiceDetails";
import { fetchFeedbacks, fetchServices } from "@/lib/fetchUtils";
import { Service } from "@/types/ServiceSchema";
import { Feedback } from "@/types/feedbackSchema";

// Page component
export default function ServicePage({ params }: { params: { id: string } }) {
  // Fetch services using useQuery
  const {
    data: servicesData,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Fetch feedbacks using useQuery
  const {
    data: feedbacks,
    isLoading: feedbacksLoading,
    isError: feedbacksError,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Handle loading state
  if (servicesLoading || feedbacksLoading) {
    return <div>Loading...</div>; // Or you can use your Loader component
  }

  // Handle error state
  if (servicesError || feedbacksError) {
    return <div>Error loading data...</div>;
  }

  // Find the service with the matching ID
  const service = servicesData?.find((s: any) => s._id === params.id);
  const filteredFeedbacks = feedbacks?.filter(
    (f: any) => f.serviceId?._id === params.id
  );

  // If the service is not found, show a 404 page
  if (!service) {
    return notFound();
  }

  // Render the ServiceDetails component
  return (
    <div>
      <ServiceDetails service={service as Service} feedbacks={filteredFeedbacks as Feedback[]} />
    </div>
  );
}
