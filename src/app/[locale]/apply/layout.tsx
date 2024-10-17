"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import authBG1 from "../../../../public/images/auth-bg-t.png";
import authBG2 from "../../../../public/images/auth-bg-p.png";
import authBG3 from "../../../../public/images/auth-bg.png";
import ProgressBar from "@/components/progress-bar/ProgressBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import localforage from "localforage";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { StepProvider, useStep } from "@/contexts/ApplicationStepContext";

interface ApplyLayoutProps {
  children: ReactNode;
}

const ApplyLayout: React.FC<ApplyLayoutProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
        },
      },
    });

    if (isClient) {
      const persister = createAsyncStoragePersister({
        storage: localforage,
      });

      persistQueryClient({
        queryClient: client,
        persister,
        maxAge: 1000 * 60 * 60 * 24,
      });
    }

    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <StepProvider>
        <ApplyContent>{children}</ApplyContent>
      </StepProvider>
    </QueryClientProvider>
  );
};

const ApplyContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentStep } = useStep();

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
    <div className={cn("min-h-screen")}>
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Left Side - Background with Title Overlay */}
        <div className="hidden md:block relative">
          <Image
            src={getBackgroundImage()}
            alt="Background Illustration"
            fill
            className="object-cover"
            quality={100}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold text-primary drop-shadow-lg">
              Apply to Join the Team
            </h1>
            <h2 className="text-2xl font-semibold text-foreground drop-shadow-sm">
              {getSubtitle()}
            </h2>
          </div>
        </div>

        {/* Right Side - Progress Bar and Form Section */}
        <div className="w-full min-h-screen max-h-screen bg-white p-5 md:p-15 flex flex-col justify-center">
          <ProgressBar />

          <div className="mt-5 w-full max-w-lg mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLayout;
