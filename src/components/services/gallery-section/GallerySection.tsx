import React, { useState } from "react";
import { Service } from "@/types/ServiceSchema";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ExternalLink, Info } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

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
  // State for lightbox
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Filter services based on the selected category
  const filteredServices =
    selectedCategory && selectedCategory !== "all"
      ? services.filter(
          (service) => service.service_category === selectedCategory
        )
      : services;

  // Open lightbox with the selected image
  const openLightbox = (service: Service, imageUrl: string, index: number) => {
    setIsImageLoading(true);
    setSelectedService(service);
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
  };

  // Navigate to the next image in the lightbox
  const nextImage = () => {
    if (!selectedService?.portfolio_urls?.length) return;
    setIsImageLoading(true);
    const newIndex =
      (currentImageIndex + 1) % selectedService.portfolio_urls.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(selectedService.portfolio_urls[newIndex]);
  };

  // Navigate to the previous image in the lightbox
  const prevImage = () => {
    if (!selectedService?.portfolio_urls?.length) return;
    setIsImageLoading(true);
    const newIndex =
      (currentImageIndex - 1 + selectedService.portfolio_urls.length) %
      selectedService.portfolio_urls.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(selectedService.portfolio_urls[newIndex]);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentImageIndex, selectedService]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Get current image count display
  const imageCountDisplay = selectedService?.portfolio_urls?.length
    ? `${currentImageIndex + 1}/${selectedService.portfolio_urls.length}`
    : "";

  return (
    <div className="p-6">
      {/* Loop through each service and display its images in a grid */}
      {filteredServices.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {filteredServices.map((service) => (
            <motion.div
              key={service._id}
              className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={item}
            >
              {/* Service title with category badge */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <h3 className="text-2xl font-semibold">{service.title}</h3>
                {service.service_category && (
                  <span>
                    <Badge variant="secondary">
                      {service.service_category}
                    </Badge>
                  </span>
                )}
              </div>

              {/* Responsive grid for portfolio images */}
              {service.portfolio_urls && service.portfolio_urls.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {service.portfolio_urls.map((url, index) => (
                    <motion.div
                      key={index}
                      className="relative overflow-hidden rounded-lg shadow-md group"
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div
                        className="aspect-w-16 aspect-h-12 cursor-pointer"
                        onClick={() => openLightbox(service, url, index)}
                      >
                        <img
                          src={url}
                          alt={`Portfolio image ${index + 1} for ${
                            service.title
                          }`}
                          className="w-full h-64 object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-sm font-medium px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm">
                            View Image
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center p-8 border border-dashed rounded-lg bg-muted/30">
                  <p className="text-muted-foreground italic flex items-center gap-2">
                    <Info size={16} />
                    No images available for this service
                  </p>
                </div>
              )}

              {/* View Details Button */}
              {onServiceClick && (
                <div className="flex justify-end mt-6">
                  <Button
                    variant="default"
                    onClick={() => onServiceClick(service._id)}
                    className="group transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md"
                  >
                    View Details
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center p-12 border border-dashed rounded-lg bg-muted/20">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <Info size={18} />
            No services found for this category
          </p>
        </div>
      )}

      {/* Image Lightbox */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="sm:max-w-4xl p-0 bg-black/90 border-none shadow-xl rounded-xl overflow-hidden">
          <div className="relative">
            {/* Image with loading state */}
            <div className="flex items-center justify-center min-h-[50vh] max-h-[80vh]">
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={selectedImage || ""}
                alt={`Portfolio image for ${
                  selectedService?.title || "service"
                }`}
                className="max-h-[80vh] max-w-full object-contain"
                onLoad={() => setIsImageLoading(false)}
              />
            </div>

            {/* Navigation buttons */}
            {selectedService?.portfolio_urls &&
              selectedService.portfolio_urls.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 border-none text-white transition-all duration-200"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 border-none text-white transition-all duration-200"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-sm text-white">
                    {imageCountDisplay}
                  </div>
                </>
              )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
