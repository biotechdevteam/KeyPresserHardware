import React from "react";
import {
  UserIcon,
  FileTextIcon,
  CheckCircleIcon,
  Handshake,
} from "lucide-react";
import { useStep } from "@/contexts/ApplicationStepContext";

const steps = [
  { label: "Agreement", icon: Handshake },
  { label: "Personal Info", icon: UserIcon },
  { label: "Motivation", icon: FileTextIcon },
  { label: "Finale", icon: CheckCircleIcon },
];

const ProgressBar: React.FC = () => {
  const { currentStep } = useStep();
  return (
    <div className="w-full grid grid-cols-4 gap-4 mb-2">
      {steps.map((step, index) => (
        <div
          key={index}
          className="grid grid-rows-2 justify-items-center items-center"
        >
          {/* Step Icon */}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border ${
              index <= currentStep
                ? "bg-primary border-none text-card"
                : "bg-muted text-foreground"
            }`}
          >
            <step.icon size={24} />
          </div>

          {/* Step Label */}
          <div className="text-center">
            <p
              className={`text-sm ${
                index <= currentStep
                  ? "text-primary font-bold"
                  : "text-border"
              }`}
            >
              {step.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
