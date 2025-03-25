import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context
interface StepContextProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number; // Added totalSteps
}

// Create the context
const StepContext = createContext<StepContextProps | undefined>(undefined);

// Provider component to wrap the layout
export const StepProvider: React.FC<{
  children: ReactNode;
  totalSteps?: number;
}> = ({
  children,
  totalSteps = 4, // Default total steps
}) => {
  const [currentStep, setCurrentStep] = useState(0); // Default to step 0

  return (
    <StepContext.Provider value={{ currentStep, setCurrentStep, totalSteps }}>
      {children}
    </StepContext.Provider>
  );
};

// Hook to use the StepContext
export const useStep = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return context;
};
