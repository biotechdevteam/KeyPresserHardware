import React from "react";
import { Service } from "@/types/ServiceSchema"; // Assuming the Service type is defined in your types
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Assuming ShadCN components
import { Button } from "@/components/ui/button";

interface ServiceDetailsProps {
  service: Service; // Service passed as a prop
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service }) => {
  return (
    <div className="space-y-6">
      {/* Service Title and Description */}
      <Card>
        <CardHeader>
          <h1 className="text-4xl font-bold">
            {service.title}
          </h1>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            {service.description}
          </p>
        </CardContent>
      </Card>

      {/* Portfolio URLs */}
      {service.portfolio_urls && service.portfolio_urls.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-2xl font-semibold">
              Portfolio
            </h3>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {service.portfolio_urls.map((url, index) => (
                <li key={index}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Pricing Plans */}
      <Card>
        <CardHeader>
          <h3 className="text-2xl font-semibold">
            Pricing Plans
          </h3>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            {service.pricing_plans.map((plan, index) => (
              <li key={index} className="mb-4">
                <span className="font-bold">
                  {plan.name}: ${plan.price}
                </span>
                {plan.billing_cycle && (
                  <span>{` per ${plan.billing_cycle}`}</span>
                )}
                {plan.description && (
                  <p className="text-sm mt-2">
                    {plan.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="flex justify-center">
        <Button variant="default">Book This Service</Button>
      </div>
    </div>
  );
};

export default ServiceDetails;
