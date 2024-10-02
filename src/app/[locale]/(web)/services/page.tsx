import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchFeedbacks, fetchServices } from "@/lib/fetchUtils";
import ServicesContainer from "@/components/services/services-container/ServiceContainer";

// This function runs on the server-side and fetches the services and feedbacks
async function getServicesAndFeedbacks() {
  const queryClient = new QueryClient();

  // Prefetch the services and feedbacks on the server
  await queryClient.prefetchQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });
  await queryClient.prefetchQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
  });

  // Fetch services and feedbacks data
  const [services, feedbacks] = await Promise.all([
    fetchServices(),
    fetchFeedbacks(),
  ]);

  // Return the prefetched data and the dehydrated state
  return {
    dehydratedState: dehydrate(queryClient),
    services,
    feedbacks,
  };
}

// Page component
export default async function ServicesPage() {
  const { services, feedbacks } = await getServicesAndFeedbacks(); // Fetch the data server-side

  return (
    <div>
      {/* Pass both services and feedbacks data to the ServicesContainer */}
      <ServicesContainer initialData={{ services, feedbacks }} />
    </div>
  );
}
