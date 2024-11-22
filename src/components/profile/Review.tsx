"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useAuth from "@/lib/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Applicant } from "@/types/applicant";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Loader from "../loader/Loader";

const Review = () => {
  const { applicants, approveApplication, rejectApplication, loading } =
    useAuth();
  const { id } = useParams();
  const router = useRouter();

  const [applicant, setApplicant] = useState<Applicant | null>(null);

  useEffect(() => {
    // Find the applicant by ID
    const selectedApplicant = applicants.find((a) => a._id === id) || null;
    setApplicant(selectedApplicant);
  }, [applicants, id]);

  if (!applicant) {
    return <Loader />;
  }

  const handleApprove = async () => {
    if (applicant) {
      const success = await approveApplication(applicant._id);
      if (success) {
        alert("Application approved successfully!");
        router.back();
      }
    }
  };

  const handleReject = async () => {
    if (applicant) {
      const success = await rejectApplication(applicant._id);
      if (success) {
        alert("Application rejected successfully!");
        router.back();
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={applicant.user.profile_photo_url || ""} />
            <AvatarFallback>
              {applicant.user.first_name[0]}
              {applicant.user.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-semibold">
              {applicant.user.first_name} {applicant.user.last_name}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Badge
                variant={getStatusBadgeVariant(applicant.application_status)}
              >
                {applicant.application_status.toUpperCase()}
              </Badge>
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      {/* Application Details */}
      <Card>
        <CardHeader>
          <CardTitle>Application Details</CardTitle>
          <CardDescription>
            Review the applicant's submission and take necessary action.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">Motivation Letter:</p>
            <p>{applicant.motivation_letter}</p>
          </div>
          <div>
            <p className="font-medium">Specialization:</p>
            <p>{applicant.specialization_area || "Not provided"}</p>
          </div>
          <div>
            <p className="font-medium">Referred By:</p>
            <p>
              {applicant.referredByMember
                ? `${applicant.referredByMember.user_id.first_name} ${applicant.referredByMember.user_id.last_name}`
                : "Not provided"}
            </p>
          </div>
          <div>
            <p className="font-medium">Resume:</p>
            {applicant.resume_url ? (
              <a
                href={applicant.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                View Resume
              </a>
            ) : (
              <p>Not provided</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Admin Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Actions</CardTitle>
          <CardDescription>Take action on the application.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex gap-4 mt-4">
          <Button
            onClick={handleApprove}
            variant={"default"}
            className="w-full"
          >
            Approve
          </Button>
          <Button
            onClick={handleReject}
            variant={"destructive"}
            className="w-full"
          >
            Reject
          </Button>
          <Button
            onClick={() => router.back()}
            variant={"secondary"}
            className="w-full"
          >
            Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// Utility to get badge variant based on status
const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "approved":
      return "default";
    case "pending":
      return "outline";
    case "rejected":
      return "destructive";
    default:
      return "secondary";
  }
};

export default Review;
