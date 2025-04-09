import ServicesContainer from "@/components/services/services-container/ServiceContainer";
import Error from "@/app/[locale]/error";
import { Skeleton } from "@/components/ui/skeleton";

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

// Add this loading component in the same file or a separate file
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
