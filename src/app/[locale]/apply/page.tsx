"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ApplicationForm from "@/components/application-form/ApplicationForm";
import SignUpForm from "@/components/application-form/SignUpForm";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutData, fetchMembers } from "@/lib/utils/fetchUtils"; // Fetch both about data and members
import TermsCard from "@/components/about/terms-modal/TermsCard";
import { useStep } from "@/contexts/ApplicationStepContext";

const ApplyPage: React.FC = () => {
  const { currentStep, setCurrentStep } = useStep(); // Default to step 0 (Terms and Conditions)
  const router = useRouter();

  // Fetch about data using react-query
  const { data: aboutData, isLoading: aboutLoading } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
  });

  // Fetch members data using react-query
  const { data: membersData, isLoading: membersLoading } = useQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });

  const handleTermsAccepted = () => {
    setCurrentStep(1); // Move to Step 1: Sign Up after accepting Terms
  };

  const handleSignUpComplete = () => {
    setCurrentStep(2); // Move to Step 2: Applicant Information
  };

  const handleApplicationComplete = () => {
    router.push("/"); // Redirect to home page or confirmation page after submitting the application
  };

  const handleCancel = () => {
    router.push("/"); // Redirect to home page on cancel
  };

  // Show a loading state while the data is being fetched
  if (aboutLoading || membersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto p-6 bg-card rounded-lg shadow-md text-foreground">
      {/* Show Terms and Conditions Modal first */}
      {currentStep === 0 ? (
        <TermsCard
          privacyPolicy={aboutData?.privacy_policy || "Loading..."}
          termsAndConditions={aboutData?.terms_and_conditions || "Loading..."}
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
};

export default ApplyPage;
