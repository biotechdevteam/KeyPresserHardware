"use client";

import React from "react";
import HeadingDashboard from "@/components/profile/Header";
import ComingSoon from "@/app/[locale]/coming-soon";
import ProfileForm from "@/components/profile/form";

const ProfilePage = () => {
  const tabs = [
    {
      label: "My Profile",
      content: (
        <div className="m-8">
          <ProfileForm />
        </div>
      ),
    },
    {
      label: "Preferences",
      content: (
        <div className="m-8">
          <ComingSoon />
        </div>
      ),
    },
  ];

  return (
    <>
    </>
  );
};

export default ProfilePage;
