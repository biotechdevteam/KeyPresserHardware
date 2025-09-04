"use client";
import { fetchMembers, fetchApplicant } from "@/lib/utils/fetchUtils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "@/lib/useAuth";
import { Member } from "@/types/memberSchema";
import Loader from "@/components/loader/Loader";
import Error from "@/app/[locale]/error";
import ApplicationDetails from "@/components/profile/ApplicationDetails";
import { Button } from "@/components/ui/button";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/utils/pageTransitions";

export default function ApplicationPage() {
  const { user } = useAuth();
  const router = useTransitionRouter();

  // Fetch application data using react-query
  const {
    data: application,
    isLoading: applicationLoading,
    error: applicationError,
  } = useQuery({
    queryKey: ["applicant", user?._id],
    queryFn: () => fetchApplicant(user?._id || ""),
    enabled: !!user?._id, // Only fetch if user is authenticated
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Fetch members data using react-query only if there's a referred member ID
  const {
    data: membersData,
    isLoading: membersLoading,
    error: membersError,
  } = useQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
    enabled: !!application?.referred_by_member_id, // Only fetch if there's a referred member
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Find referred member if application has referred_by_member_id
  const referredMember: Member | undefined = application?.referred_by_member_id
    ? membersData?.find(
        (member: Member) => member._id === application.referred_by_member_id
      )
    : undefined;

  // Determine if the user can reapply
  const canReapply = application?.application_status === "rejected";

  // Handle loading and error states
  if (
    applicationLoading ||
    (membersLoading && application?.referred_by_member_id)
  ) {
    return <Loader />;
  }

  if (
    applicationError ||
    (membersError && application?.referred_by_member_id)
  ) {
    return (
      <Error
        error={
          applicationError?.message ||
          membersError?.message ||
          "Failed to load data."
        }
      />
    );
  }

  if (!application) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-lg font-semibold text-muted-foreground mb-2">
          No application found
        </div>
        <div className="text-sm text-muted-foreground mb-4">
          It seems you have not applied yet. Please fill out the application
          form to get started.
        </div>
        <Button
          className="mt-4"
          onClick={() =>
            router.push("/apply", { onTransitionReady: slideInOut })
          }
        >
          Go to Application Form
        </Button>
      </div>
    );
  }

  return (
    <ApplicationDetails
      application={{
        ...application,
        status: application.application_status,
        submitted_at: application.applied_at,
        application_number: application._id,
        profile_photo_url: application.profile_photo_url ?? "",
        specialization_area: application.specialization_area ?? "",
        resume_url: application.resume_url ?? "",
        motivation_letter: application.motivation_letter ?? "",
        referred_by_member_id: application.referred_by_member_id ?? "",
      }}
      referredMember={referredMember ? referredMember : undefined}
      canReapply={canReapply}
    />
  );
}
