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
    // Booking action logic
    console.log("Booking Service");
    setIsRegisterDialogOpen(false);
  };

  const handleLearnMore = () => {
    // Learn more logic
    console.log("Learning more about the service");
  };

  // Open register dialog before booking
  const handleOpenRegisterDialog = () => {
    setIsRegisterDialogOpen(true); // Show register dialog when user tries to book
  };

  // After registration, open booking form
  const handleRegisterComplete = () => {
    setIsRegisterDialogOpen(false); // Close registration dialog
    setIsBookingFormOpen(true); // Open booking form
  };

  return (
    <div className="space-y-6">
      {/* Register Dialog for service booking */}
      {isRegisterDialogOpen && (
        <RegisterDialog
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

      <ServiceHeader
        title={service.title}
        summary={service.summary}
        backgroundImageUrl={
          service.portfolio_urls ? service.portfolio_urls[0] : ""
        }
      />

      {/* Service Title and Description */}
      <Card>
        <CardHeader>
          <h1 className="text-4xl font-bold">{service.title}</h1>
        </CardHeader>
        <CardContent>
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(service.description),
            }}
          />
        </CardContent>
      </Card>

      {/* Call to Action after portfolio */}
      <ServiceCTA
        title="Interested in this service?"
        description="Check out our pricing plans and book this service today!"
        buttonText="Book Now"
        onClick={handleOpenRegisterDialog}
        secondaryAction={handleLearnMore}
      />

      {/* Pricing Plans */}
      {service.pricing_plans && service.pricing_plans.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-2xl font-semibold">Pricing Plans</h3>
          </CardHeader>
          <CardContent>
            <PricingPlan plans={service.pricing_plans} />{" "}
          </CardContent>
        </Card>
      )}

      {/* Portfolio URLs */}
      {service.portfolio_urls && service.portfolio_urls.length > 0 && (
        <Card>
          <Gallery
            services={[service]}
            selectedCategory={service.service_category}
          />
        </Card>
      )}

      {/* Final Call to Action */}
      <ServiceCTA
        title="Have you made your decision?"
        description="Click below to book this service or reach out to us for more information."
        buttonText="Book This Service"
        onClick={handleOpenRegisterDialog}
      />

      {/* Testimonials Section */}
      <Testimonials
        feedbacks={feedbacks}
        selectedCategory={service.service_category}
        title={"What others are saying"}
      />
    </div>
  );
};

export default ServiceDetails;
