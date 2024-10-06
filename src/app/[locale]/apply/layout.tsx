"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import authBG1 from "@/assets/images/auth-bg-t.png"; // Ensure the path is correct
import authBG2 from "@/assets/images/auth-bg-p.png"; // Ensure the path is correct
import authBG3 from "@/assets/images/auth-bg.png"; // Ensure the path is correct
import ProgressBar from "@/components/progress-bar/ProgressBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import localforage from "localforage";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { StepProvider, useStep } from "@/contexts/ApplicationStepContext"; // Make sure this is imported correctly

interface ApplyLayoutProps {
  children: ReactNode;
}

const ApplyLayout: React.FC<ApplyLayoutProps> = ({ children }) => {
  // State to control if persistence should be set up
  const [isClient, setIsClient] = useState(false);

  // Only run persistence setup on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true); // We are on the client-side
    }
  }, []);

  // Create the QueryClient once and persist it across renders
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
        },
      },
    });

    // Set up cache persistence only on the client
    if (isClient) {
      const persister = createAsyncStoragePersister({
        storage: localforage,
      });

      persistQueryClient({
        queryClient: client,
        persister,
        maxAge: 1000 * 60 * 60 * 24, // Only persist cache for 24 hours
      });
    }

    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <StepProvider>
        {" "}
        {/* Ensure StepProvider is applied here */}
        <ApplyContent>{children}</ApplyContent>{" "}
        {/* Moved content to separate component */}
      </StepProvider>
    </QueryClientProvider>
  );
};

// Separate out the content part that depends on `useStep`
const ApplyContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentStep } = useStep(); // Now useStep has the proper context

  // Choose background image based on the current step
  const getBackgroundImage = () => {
    switch (currentStep) {
      case 0:
        return authBG1.src;
      case 1:
        return authBG2.src;
      case 2:
        return authBG3.src;
      default:
        return authBG1.src;
    }
  };

  // Set subtitle based on the current step
  const getSubtitle = () => {
    switch (currentStep) {
      case 0:
        return "Step 1: Review Our Terms and Policies";
      case 1:
        return "Step 2: Provide Personal Information";
      case 2:
        return "Step 3: Finalize Application";
      default:
        return "";
    }
  };

  return (
    <div className={cn("min-h-screen overflow-hidden")}>
      {/* Main Content */}
      <div className="flex flex-1 relative">
        {/* Left Side - Background with Title Overlay */}
        <div className="hidden md:block w-1/2 relative">
          <Image
            src={getBackgroundImage()}
            alt="Background Illustration"
            fill
            className="object-cover"
            quality={100}
          />
          {/* Title on top of the image */}
          <div className="absolute inset-0 flex flex-col items-center justify-around">
            <h1 className="text-4xl font-bold text-primary drop-shadow-lg">
              Apply to Join the Team
            </h1>
            <h2 className="text-2xl font-semibold text-foreground drop-shadow-sm mt-2">
              {getSubtitle()}
            </h2>
          </div>
        </div>

        {/* Right Side - Progress Bar and Form Section */}
        <div className="w-full h-screen md:w-1/2 bg-white p-10 flex flex-col justify-center items-center relative">
          {/* Progress Bar at the Top */}
          <ProgressBar />

          {/* Form Section */}
          <div className="relative w-full h-full mt-5">
            <div className="w-full max-w-lg absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLayout;
