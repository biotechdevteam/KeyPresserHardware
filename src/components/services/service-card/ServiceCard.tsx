import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Service } from "@/types/ServiceSchema";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

import {
  HeartPulse,
  BookOpen,
  Cpu,
  Briefcase,
  FlaskConical,
  Stethoscope,
  Globe,
  Calendar,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react";

// Define category icons mapping with consistent styling function
const getCategoryIcon = (category: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    health: <HeartPulse className="w-5 h-5" />,
    education: <BookOpen className="w-5 h-5" />,
    technology: <Cpu className="w-5 h-5" />,
    business: <Briefcase className="w-5 h-5" />,
    microbiology: <FlaskConical className="w-5 h-5" />,
    telemedicine: <Stethoscope className="w-5 h-5" />,
    it_and_design: <Cpu className="w-5 h-5" />,
    laboratory_and_scientific: <FlaskConical className="w-5 h-5" />,
    training_and_workshops: <BookOpen className="w-5 h-5" />,
    other: <Globe className="w-5 h-5" />,
  };

  return iconMap[category] || <Globe className="w-5 h-5" />;
};

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300">
      <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-full bg-primary text-primary-foreground`}
          >
            {getCategoryIcon(service.service_category)}
          </div>
          <h3 className="text-lg font-semibold line-clamp-2">
            {service.title}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="px-5 py-2 flex-grow space-y-4">
        {/* Summary */}
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {service.summary}
        </p>
      </CardContent>

      <CardFooter className="p-5 pt-3 flex justify-between items-center">
        {service.pricing_plans.length > 0 && (
          <Badge
            variant="outline"
            className="flex items-center gap-1 text-xs font-normal"
          >
            <CheckCircle2 className="w-3 h-3" />
            From ${service.pricing_plans[0].price}
          </Badge>
        )}
        <Button size="sm" onClick={onClick}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
