"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchServices, fetchFeedbacks } from "@/lib/fetchUtils";
import ServicesContainer from "@/components/services/services-container/ServiceContainer";
import Loader from "@/components/loader/Loader";
import { Service } from "@/types/ServiceSchema";
import { Feedback } from "@/types/feedbackSchema";

// This function runs on the server-side and fetches both services and feedbacks data.
async function getServicesAndFeedbacksData() {
  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: Infinity, // Prevent unnecessary refetching, keep data fresh
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const feedbacksQuery = useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    servicesData: servicesQuery.data,
    servicesLoading: servicesQuery.isLoading,
    servicesFetching: servicesQuery.isFetching,
    servicesError: servicesQuery.isError,
    feedbacksData: feedbacksQuery.data,
    feedbacksLoading: feedbacksQuery.isLoading,
    feedbacksFetching: feedbacksQuery.isFetching,
    feedbacksError: feedbacksQuery.isError,
  };
}

// ServicesPage component to fetch and display services and feedbacks data
const ServicesPage: React.FC = async () => {
  // Fetch services and feedbacks data
  const {
    servicesData,
    servicesLoading,
    servicesFetching,
    servicesError,
    feedbacksData,
    feedbacksLoading,
    feedbacksFetching,
    feedbacksError,
  } = await getServicesAndFeedbacksData();

  // Handle loading states
  if (
    servicesLoading ||
    servicesFetching ||
    feedbacksLoading ||
    feedbacksFetching
  ) {
    return <Loader />;
  }

  // Handle error states
  if (servicesError || feedbacksError) {
    return <div>Error loading services or feedback data...</div>;
  }

  // Render the ServicesContainer with the prefetched data
  return (
    <div className="grid min-h-screen">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Our Services</h1>
          <p className="text-lg mt-4">Discover the services we offer to our clients.</p>
        </header>
        <ServicesContainer
          initialData={{
            services: servicesData as Service[],
            feedbacks: feedbacksData as Feedback[],
          }}
        />
      </div>
    </div>
  );
};

export default ServicesPage;
