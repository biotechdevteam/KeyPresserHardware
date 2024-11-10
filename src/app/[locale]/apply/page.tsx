"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ApplicationForm from "@/components/application-form/ApplicationForm";
import SignUpForm from "@/components/application-form/SignUpForm";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutData, fetchMembers } from "@/lib/utils/fetchUtils";
import { useStep } from "@/contexts/ApplicationStepContext";
import Terms from "@/components/application-form/Terms";
import Loader from "@/components/loader/Loader";
import { About } from "@/types/aboutSchema";

export default function ApplyPage() {
  const { currentStep, setCurrentStep } = useStep();
  const router = useRouter();

  // Fetch about data using react-query
  const { data: aboutData, isLoading: aboutLoading } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: Infinity, // Prevent unnecessary refetching, keep data fresh
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Fetch members data using react-query
  const { data: membersData, isLoading: membersLoading } = useQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });

  const handleTermsAccepted = () => {
    setCurrentStep(1);
  };

  const handleSignUpComplete = () => {
    setCurrentStep(2);
  };

  const handleApplicationComplete = () => {
    router.push("/profile");
  };

  const handleCancel = () => {
    router.push("/");
  };

  // Handle loading state
  if (aboutLoading || membersLoading) {
    return <Loader />;
  }

  return (
    <main className="container mx-auto p-6 text-foreground">
      {currentStep === 0 ? (
        <Terms
          aboutData={aboutData as About}
          onAccept={handleTermsAccepted}
          onCancel={handleCancel}
        />
      ) : currentStep === 1 ? (
        <SignUpForm onComplete={handleSignUpComplete} onCancel={handleCancel} />
      ) : (
        <ApplicationForm
          onComplete={handleApplicationComplete}
          onCancel={handleCancel}
          members={membersData || []}
        />
      )}
    </main>
  );
}
