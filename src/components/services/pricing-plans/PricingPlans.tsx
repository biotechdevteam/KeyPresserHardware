import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { motion } from "framer-motion";

// Define the structure of a pricing plan
interface PricingPlanProps {
  plans: {
    name: string;
    price: number;
    billing_cycle?: string;
    description?: string;
    features?: string[];
    isPopular?: boolean;
  }[];
  onSelectPlan?: (planName: string) => void;
}

const PricingPlan: React.FC<PricingPlanProps> = ({ plans, onSelectPlan }) => {
  // Find if there's a popular plan (for highlighting)
  const hasPopularPlan = plans.some((plan) => plan.isPopular);

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

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {plans.map((plan, index) => (
        <motion.div key={index} variants={item}>
          <Card
            className={`h-full flex flex-col transition-all duration-300 hover:shadow-xl ${
              plan.isPopular
                ? "border-primary shadow-md relative"
                : "border-border hover:border-primary/50"
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 right-4">
                <Badge className="bg-primary text-primary-foreground px-3 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Popular
                </Badge>
              </div>
            )}
            <CardHeader
              className={`pb-2 ${plan.isPopular ? "bg-primary/5" : ""}`}
            >
              <h4 className="text-xl font-bold mb-1">{plan.name}</h4>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${plan.price}</span>
                {plan.billing_cycle && (
                  <span className="text-sm text-muted-foreground ml-1">
                    /{plan.billing_cycle}
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="py-4 flex-grow">
              {plan.description && (
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>
              )}
              {plan.features && (
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="text-primary h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${
                  plan.isPopular ? "bg-primary hover:bg-primary/90" : ""
                }`}
                variant={plan.isPopular ? "default" : "outline"}
                onClick={() => onSelectPlan && onSelectPlan(plan.name)}
              >
                Select Plan
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PricingPlan;
