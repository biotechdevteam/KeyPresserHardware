"use client";

import React from "react";
import { Applicant } from "@/types/applicant";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface ApplicantsProps {
  applicants: Applicant[];
}

const Applicants: React.FC<ApplicantsProps> = ({ applicants }) => {
  const router = useRouter();

  const handleReviewClick = (applicantId: string) => {
    router.push(`/admin/review/${applicantId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {applicants.map((applicant) => (
        <Card
          key={applicant._id}
          className="shadow-md hover:shadow-lg transition"
        >
          <CardHeader className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={applicant.user.profile_photo_url || ""} />
              <AvatarFallback>
                {applicant.user.first_name[0]}
                {applicant.user.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>
                {applicant.user.first_name} {applicant.user.last_name}
              </CardTitle>
              <p className="text-sm">{applicant.application_status}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {applicant.motivation_letter.slice(0, 100)}...
            </p>
            <p className="text-xs mt-2">
              Specialization: {applicant.specialization_area}
            </p>
          </CardContent>
          <CardFooter>
            <div className="p-4">
              <Button
                onClick={() => handleReviewClick(applicant._id)}
                className="w-full"
              >
                Review Application
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Applicants;
