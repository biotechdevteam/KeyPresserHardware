import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Service } from "@/types/ServiceSchema";

import {
  HeartPulse,
  BookOpen,
  Cpu,
  Briefcase,
  FlaskConical,
  Stethoscope,
  Globe
} from "lucide-react"; // Import your icons

// Define category icons mapping
const categoryIcons: { [key: string]: React.ReactNode } = {
  health: <HeartPulse className="w-6 h-6 text-primary mr-2" />,
  education: <BookOpen className="w-6 h-6 text-primary mr-2" />,
  technology: <Cpu className="w-6 h-6 text-primary mr-2" />,
  business: <Briefcase className="w-6 h-6 text-primary mr-2" />,
  microbiology: <FlaskConical className="w-6 h-6 text-primary mr-2" />,
  telemedicine: <Stethoscope className="w-6 h-6 text-primary mr-2" />,
  other: <Globe className="w-6 h-6 text-primary mr-2" />,
};

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <div className="transform transition-transform hover:scale-105 h-full w-full">
      <Card className="h-full w-full shadow-lg rounded-lg overflow-hidden hover:shadow-xl bg-card text-card-foreground">
        <CardHeader className="p-4 flex items-center">
          {/* Add the category icon */}
          {categoryIcons[service.service_category] || (
            <Globe className="w-6 h-6 text-primary mr-2" />
          )}
          <h3 className="text-xl font-semibold text-primary text-center">
            {service.title}
          </h3>
        </CardHeader>
        <CardContent className="px-4 py-2 flex-grow">
          <p className="text-muted-foreground">{service.summary}</p>
          {service.pricing_plans.length > 0 && (
            <p className="mt-4 text-muted-foreground">
              Starting at:{" "}
              <span className="font-bold text-accent">
                ${service.pricing_plans[0].price}
              </span>
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end p-4">
          <Button
            variant="default"
            onClick={onClick}
            className="transition-transform hover:scale-105"
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ServiceCard;