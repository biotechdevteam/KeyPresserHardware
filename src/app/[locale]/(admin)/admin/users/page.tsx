"use client";

import React, { useEffect, useState } from "react";
import HeadingDashboard from "@/components/profile/Header";
import Loader from "@/components/loader/Loader";
import useAuth from "@/lib/useAuth";
import Applicants from "@/components/profile/Applicant";
import Members from "@/components/profile/Members";

const UsersPage = () => {
  // Use the useAuth hook to fetch applicants and members
  const {
    getAllApplicants,
    getAllMembers,
    members,
    applicants,
    loading,
    error,
  } = useAuth();


  // Fetch applicants and members when the component mounts
  useEffect(() => {
    getAllApplicants();
    getAllMembers();
  }, [getAllApplicants, getAllMembers]);

  // Handle loading state
  if (loading) {
    return <Loader />;
  }

  // Define tabs with applicants and members data
  const tabs = [
    {
      label: "Applicants",
      content: (
        <div className="m-8">
          <Applicants applicants={applicants} />
        </div>
      ),
    },
    {
      label: "Members",
      content: (
        <div className="m-8">
          <Members members={members} />
        </div>
      ),
    },
  ];

  return (
    <>
    </>
  );
};

export default UsersPage;
