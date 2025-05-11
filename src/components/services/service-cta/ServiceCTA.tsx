"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
    <motion.div
      className="p-8 space-y-4 rounded-xl shadow-lg border border-primary"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-lg">{description}</p>
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button onClick={onClick} size="lg" animation="scale">
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
        {secondaryText && secondaryAction && (
          <Button variant="outline" onClick={secondaryAction} size="lg">
            {secondaryText}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceCTA;
