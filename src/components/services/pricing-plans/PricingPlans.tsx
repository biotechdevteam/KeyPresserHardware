import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Assuming ShadCN components
import { Badge } from "@/components/ui/badge"; // For highlighting billing cycle or status

// Define the structure of a pricing plan
interface PricingPlanProps {
  plans: {
    name: string;
    price: number;
    billing_cycle?: string;
    description?: string;
  }[];
}

const PricingPlan: React.FC<PricingPlanProps> = ({ plans }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
        <Card
          key={index}
          className="hover:shadow-lg transition-shadow duration-200"
        >
          <CardHeader className="flex items-center justify-between p-4 border-b">
            <h4 className="text-lg font-semibold">{plan.name}</h4>
            <div className="flex items-center">
              <span className="text-2xl font-bold">${plan.price}</span>
              {plan.billing_cycle && (
                <Badge className="ml-2 text-sm">{plan.billing_cycle}</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {plan.description && (
              <p className="text-sm text-muted-foreground">
                {plan.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PricingPlan;
