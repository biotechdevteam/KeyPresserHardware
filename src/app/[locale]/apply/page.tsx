"use client";
import React from "react";
import ApplicationForm from "@/components/application-form/ApplicationForm";
import SignUpForm from "@/components/application-form/SignUpForm";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutData, fetchMembers } from "@/lib/utils/fetchUtils";
import { useStep } from "@/contexts/ApplicationStepContext";
import Terms from "@/components/application-form/Terms";
import Loader from "@/components/loader/Loader";
import { About } from "@/types/aboutSchema";
import { Button } from "@/components/ui/button";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/utils/pageTransitions";

export default function ApplyPage() {
  const { currentStep, setCurrentStep } = useStep();
  const router = useTransitionRouter();

  // Fetch about and members data using react-query
  const { data: aboutData, isLoading: aboutLoading } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const { data: membersData, isLoading: membersLoading } = useQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const handleCancel = () =>
    router.push("/membership-tiers", { onTransitionReady: slideInOut });
  const handleTermsAccepted = () => setCurrentStep(1);
  const handleBackToTerms = () => setCurrentStep(0);
  const handleSignUpComplete = () => setCurrentStep(2);
  const handleBackToSignUp = () => setCurrentStep(1);
  const handleApplicationComplete = () => setCurrentStep(3);
  const handleBackToApplication = () => setCurrentStep(2);
  const handleFinalComplete = () =>
    router.push("/profile", { onTransitionReady: slideInOut });

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
        <SignUpForm
          onComplete={handleSignUpComplete}
          onBack={handleBackToTerms}
        />
      ) : currentStep === 2 ? (
        <ApplicationForm
          onComplete={handleApplicationComplete}
          onBack={handleBackToSignUp}
          members={membersData || []}
        />
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Application Successful!
          </h2>
          <p className="text-base mb-8">
            Thank you for completing your application. Your information has been
            submitted, and our team will review your application shortly. You’ll
            receive an email confirmation soon. In the meantime, you can access
            your profile for further updates.
          </p>
          <div className="flex justify-center space-x-4 mt-8">
            <Button variant="outline" onClick={handleBackToApplication}>
              Back
            </Button>
            <Button onClick={handleFinalComplete}>Finish</Button>
          </div>
        </div>
      )}
    </main>
  );
}
