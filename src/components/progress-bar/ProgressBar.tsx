import React from "react";
import { UserIcon, FileTextIcon, CheckCircleIcon } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
}

const steps = [
  { label: "Personal Information", icon: UserIcon },
  { label: "Applicant Details", icon: FileTextIcon },
  { label: "Review Policies", icon: CheckCircleIcon },
];

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-4 mb-8">
      {steps.map((step, index) => (
        <div
          key={index}
          className="grid grid-rows-2 justify-items-center items-center"
        >
          {/* Step Icon */}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              index <= currentStep
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            <step.icon size={24} />
          </div>

          {/* Step Label */}
          <div className="text-center mt-2">
            <p
              className={`text-sm ${
                index <= currentStep
                  ? "text-primary font-bold"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </p>
          </div>

          {/* Line between steps */}
          {index < steps.length - 1 && (
            <div className="absolute top-1/2 transform translate-y-1/2 left-full w-16 h-1 bg-gray-300">
              <div
                className={`h-full ${
                  index < currentStep ? "bg-primary" : "bg-gray-300"
                }`}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
