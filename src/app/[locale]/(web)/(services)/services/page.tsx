"use client";
import ServicesContainer from "@/components/services/services-container/ServiceContainer";
import Error from "@/app/[locale]/error";

export default async function ServicesPage() {
  try {
    const [services, feedbacks] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services`, {
        cache: "no-store",
        next: { revalidate: 60 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/feedback`, {
        cache: "no-store",
        next: { revalidate: 60 },
      }).then((res) => res.json()),
    ]);

    return (
      <div className="grid min-h-screen">
        <div className="w-full max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold">Our Services</h1>
            <p className="text-lg mt-4">
              Discover the services we offer to our clients.
            </p>
          </header>
        </div>
        <ServicesContainer servicesData={services} feedbacksData={feedbacks} />
      </div>
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
