import React from "react";
import {
  UserIcon,
  FileTextIcon,
  CheckCircleIcon,
  Handshake,
} from "lucide-react";
import { useStep } from "@/contexts/ApplicationStepContext";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Agreement", icon: Handshake },
  { label: "Personal Info", icon: UserIcon },
  { label: "Motivation", icon: FileTextIcon },
  { label: "Finale", icon: CheckCircleIcon },
];

const ProgressBar: React.FC = () => {
  const { currentStep } = useStep();

  return (
    <div className="w-full px-4 py-6">
      <div className="relative flex items-center justify-between">
        {/* Connector Lines */}
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative z-10 flex flex-col items-center gap-2"
          >
            {/* Step Icon */}
            <div
              className={cn(
                "w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300",
                index <= currentStep
                  ? "bg-primary border-primary text-primary-foreground shadow-md"
                  : index === currentStep + 1
                  ? "bg-muted border-muted-foreground text-foreground"
                  : "bg-muted border-muted text-muted-foreground"
              )}
            >
              <step.icon size={20} />
            </div>

            {/* Step Label */}
            <p
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                index <= currentStep ? "text-primary" : "text-muted-foreground"
              )}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
