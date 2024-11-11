"use client";
import React, { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import authBG1 from "../../../../public/animations/agreement-animate.svg";
import authBG2 from "../../../../public/animations/personal-data-animate.svg";
import authBG3 from "../../../../public/animations/new-team-members-animate.svg";
import authBG4 from "../../../../public/animations/completed-animate.svg";
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
      case 3:
        return authBG3.src;
      default:
        return authBG1.src;
    }
  };

  const getSubtitle = () => {
    switch (currentStep) {
      case 0:
        return "Step 1: Review Our Membership Terms";
      case 1:
        return "Step 2: Provide Your Personal Info";
      case 2:
        return "Step 3: Write Your Motivation";
      case 3:
        return "Step 4: Finalize The Application";
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Left Side - Background with Title Overlay */}
      <div className="hidden lg:flex relative max-h-screen w-full bg-cover bg-center p-8">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-background opacity-90 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center p-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary-light text-muted-foreground drop-shadow-lg">
            Apply to Join the Team
          </h1>
          <h2 className="text-xl lg:text-2xl font-medium text-secondary drop-shadow-md">
            {getSubtitle()}
          </h2>
        </div>

        {/* Background Image */}
        <Image
          src={getBackgroundImage()}
          alt="Background Illustration"
          layout="fill"
          objectFit="cover"
          className="object-cover opacity-90"
          quality={100}
          priority // Optional for faster loading
        />
      </div>

      {/* Right Side - Progress Bar and Form Section */}
      <div className="bg-card py-12 px-4 flex flex-col justify-center">
        <ProgressBar />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ApplyLayout;
