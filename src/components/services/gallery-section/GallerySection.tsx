import React from "react";
import { Service } from "@/types/ServiceSchema";
import { Button } from "@/components/ui/button";

// Category-specific titles and descriptions
const categoryDescriptions: {
  [key: string]: { title: string; description: string };
} = {
  health: {
    title: "Health Services Portfolio",
    description:
      "Showcasing our previous work in healthcare, from medical solutions to health tech innovations.",
  },
  education: {
    title: "Educational Services Portfolio",
    description:
      "Explore our projects in the educational sector, including workshops, online platforms, and training programs.",
  },
  technology: {
    title: "Technology Services Portfolio",
    description:
      "Dive into our past technology projects, from software development to cloud solutions and AI integrations.",
  },
  business: {
    title: "Business Services Portfolio",
    description:
      "Discover our business services portfolio, featuring consulting, strategy development, and growth solutions.",
  },
  microbiology: {
    title: "Microbiology Services Portfolio",
    description:
      "Showcasing our expertise in microbiology, including research, diagnostics, and laboratory services.",
  },
  telemedicine: {
    title: "Telemedicine Services Portfolio",
    description:
      "Explore our telemedicine projects, enabling remote health consultations and innovative health solutions.",
  },
  other: {
    title: "Miscellaneous Services Portfolio",
    description:
      "A showcase of various services we offer across multiple domains to meet a wide range of client needs.",
  },
  all: {
    title: "All Services Portfolio",
    description:
      "Browse through our entire portfolio of work across all categories, showcasing our expertise and diverse offerings.",
  },
};

interface GalleryProps {
  services: Service[];
  selectedCategory: string | null;
  onServiceClick?: (serviceId: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({
  services,
  selectedCategory,
  onServiceClick,
}) => {
  // Filter services based on the selected category
  const filteredServices =
    selectedCategory && selectedCategory !== "all"
      ? services.filter(
          (service) => service.service_category === selectedCategory
        )
      : services;

  // Dynamic title and description based on selected category
  const { title, description } = categoryDescriptions[
    selectedCategory || "all"
  ] || {
    title: "Service Portfolio",
    description: "Explore our portfolio of services and see our past work.",
  };

  return (
    <div className="p-6">
      {/* Dynamic title and description */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-foreground">{description}</p>
      </div>

      {/* Loop through each service and display its images in a grid */}
      {filteredServices.length > 0 ? (
        filteredServices.map((service) => (
          <div key={service._id} className="mb-12">
            {/* Service title and description */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              {/* Responsive grid for portfolio images */}
              {service.portfolio_urls && service.portfolio_urls.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {service.portfolio_urls.map((url, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden shadow-lg"
                    >
                      <img
                        src={url}
                        alt={`Portfolio image ${index + 1} for ${
                          service.title
                        }`}
                        className="w-full h-64 object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No images available for this service.
                </p>
              )}
            </div>

            {/* View Details Button */}
            {onServiceClick && (
              <div className="flex justify-end mt-4">
                <Button
                  variant="default"
                  onClick={() => onServiceClick(service._id)}
                  className="transition-transform hover:scale-105"
                >
                  View Details
                </Button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-muted-foreground">
          No services found for this category.
        </p>
      )}
    </div>
  );
};

export default Gallery;
