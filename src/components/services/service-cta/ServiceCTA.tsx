"use client"
import React from "react";
import { Button } from "@/components/ui/button";

interface ServiceCTAProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  secondaryText?: string;
  secondaryAction?: () => void;
}

const ServiceCTA: React.FC<ServiceCTAProps> = ({
  title,
  description,
  buttonText,
  onClick,
  secondaryText,
  secondaryAction,
}) => {
  return (
    <div className="p-6 space-y-4 bg-background text-foreground rounded-lg shadow-md">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-lg">{description}</p>
      <div className="flex flex-col md:flex-row gap-4">
        <Button onClick={onClick} className="animate-beep">
          {buttonText}
        </Button>
        {secondaryText && secondaryAction && (
          <Button variant="outline" onClick={secondaryAction}>
            {secondaryText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ServiceCTA;
