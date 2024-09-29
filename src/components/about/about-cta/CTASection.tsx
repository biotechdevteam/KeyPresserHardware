import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface CTASectionProps {
  title: string;
  description: string;
  action: () => void
}

const CTASection: React.FC<CTASectionProps> = ({ title, description, action }) => {
  return (
    <div
      className={cn(
        "bg-card p-6 text-center rounded-lg shadow-lg",
      )}
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="mb-4 text-base">{description}</p>
      <Button
        className="animate-pulse"
        size="lg"
        onClick={action}
      >
        Take Action
      </Button>
    </div>
  );
};

export default CTASection;
