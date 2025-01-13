"use client";
import ServicesContainer from "@/components/services/services-container/ServiceContainer";

const ServicesPage: React.FC = () => {
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
      <ServicesContainer />
    </div>
  );
};

export default ServicesPage;
