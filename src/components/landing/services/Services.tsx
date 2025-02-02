import ServiceOverview from "@/components/services/service-overview/ServiceOverview";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/utils/pageTransitions";

const ServicesSection: React.FC = () => {
  const router = useTransitionRouter();
  // Handle the category click event
  const onCategoryClick = () => {
    router.push(`/services`, { onTransitionReady: slideInOut });
  };

  return (
    <section className="text-center py-16 w-full mx-auto grid place-items-center">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-xl lg:text-3xl font-bold">Our Expertise</h2>
        <Separator className="w-16 mx-auto" />
        <p className="mt-6">
          Discover our expertise in personal development, business growth, and
          humanitarian initiatives. We provide tailored services to achieve your
          goals and exceed expectations. Our{" "}
          <strong>
            <em>personal development</em>
          </strong>{" "}
          services include: hands-on training programs, skill acquisition
          workshops, and the promotion of academic excellence. For{" "}
          <strong>
            <em>business development</em>
          </strong>
          , we offer IT and design services, business growth consultations, and
          laboratory and scientific solutions for commercial ventures. Our{" "}
          <strong>
            <em>humanitarian initiatives</em>
          </strong>{" "}
          focus on disease awareness campaigns, poverty and hunger eradication
          programs, and community health projects.
        </p>
        <p>
          Join us in using science and technology to foster growth, innovation,
          and positive change.
        </p>
      </div>

      <ServiceOverview
        onCategoryClick={() =>
          router.push("/services", { onTransitionReady: slideInOut })
        }
      />

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
