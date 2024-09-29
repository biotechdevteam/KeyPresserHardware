import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context
interface StepContextProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

// Create the context
const StepContext = createContext<StepContextProps | undefined>(undefined);

// Provider component to wrap the layout
export const StepProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(0); // Default to step 0

  return (
    <StepContext.Provider value={{ currentStep, setCurrentStep }}>
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
