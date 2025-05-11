"use client";
import React, { useState } from "react";
import { Service } from "@/types/ServiceSchema";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Gallery from "../gallery-section/GallerySection";
import PricingPlan from "../pricing-plans/PricingPlans";
import Testimonials from "../testimonials/Testimonials";
import { Feedback } from "@/types/feedbackSchema";
import ServiceCTA from "../service-cta/ServiceCTA";
import DOMPurify from "dompurify";
import ServiceHeader from "../service-header/ServiceHeader";
import RegisterDialog from "@/components/register-dialog/RegisterDialog";
import BookServiceForm from "../book-service/BookService";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ServiceDetailsProps {
  service: Service;
  feedbacks: Feedback[];
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  service,
  feedbacks,
}) => {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  const handleBookService = () => {
    console.log("Booking Service");
    setIsRegisterDialogOpen(false);
  };

  const handleLearnMore = () => {
    // Scroll to pricing plans section
    const pricingElement = document.getElementById("pricing-plans");
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenRegisterDialog = () => {
    setIsRegisterDialogOpen(true);
  };

  const handleRegisterComplete = () => {
    setIsRegisterDialogOpen(false);
    setIsBookingFormOpen(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="space-y-8 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Register Dialog for service booking */}
      {isRegisterDialogOpen && (
        <RegisterDialog
          open={isRegisterDialogOpen}
          onComplete={handleRegisterComplete}
          onCancel={() => setIsRegisterDialogOpen(false)}
        />
      )}

      {/* Booking Form Modal */}
      {isBookingFormOpen && (
        <BookServiceForm
          serviceId={service._id}
          serviceTitle={service.title}
          onComplete={() => setIsBookingFormOpen(false)}
          onCancel={() => setIsBookingFormOpen(false)}
        />
      )}

      <motion.div variants={itemVariants}>
        <ServiceHeader
          title={service.title}
          summary={service.summary}
          backgroundImageUrl={
            service.portfolio_urls ? service.portfolio_urls[0] : ""
          }
        />
      </motion.div>

      {/* Tabbed Content for better organization */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="overview" className="w-full mb-8">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="mb-6 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-8 text-center">
              <div>
                <h1 className="text-4xl font-bold">{service.title}</h1>
              </div>
              <div className="pt-6">
                <div
                  className="text-lg prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(service.description),
                  }}
                />
              </div>
            </div>

            {/* Pricing Plans */}
            {service.pricing_plans && service.pricing_plans.length > 0 && (
              <div
                className="mb-6 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                id="pricing-plans"
              >
                <div>
                  <h3 className="text-2xl font-semibold">
                    Pricing Plans
                  </h3>
                </div>
                <div className="pt-6">
                  <PricingPlan plans={service.pricing_plans} />
                </div>
              </div>
            )}

            {/* Call to Action */}
            <ServiceCTA
              title="Ready to get started?"
              description="Book this service now or contact us for more information."
              buttonText="Book Now"
              onClick={handleOpenRegisterDialog}
              secondaryText="Learn More"
              secondaryAction={handleLearnMore}
            />
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            {service.portfolio_urls && service.portfolio_urls.length > 0 ? (
              <div className="overflow-hidden shadow-md">
                <Gallery
                  services={[service]}
                  selectedCategory={service.service_category}
                />
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">
                  No gallery images available for this service.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <Testimonials
              feedbacks={feedbacks}
              selectedCategory={service.service_category}
              title="Client Testimonials"
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default ServiceDetails;
