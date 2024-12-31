import ServiceOverview from "@/components/services/service-overview/ServiceOverview";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ServicesSection: React.FC = () => {
  const router = useRouter();
  // Handle the category click event
  const onCategoryClick = () => {
    router.push(`/services`);
  };

  return (
    <section className="text-center py-16 w-full mx-auto grid place-items-center">
      <ServiceOverview onCategoryClick={() => router.push("/services")} />
      {/* View More Button */}
      <div className="mt-10 text-center">
        <Button
          variant="default"
          className="animate-beep"
          onClick={onCategoryClick}
        >
          View Our Services <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default ServicesSection;
