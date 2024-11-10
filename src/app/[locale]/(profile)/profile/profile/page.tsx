"use client";

import React, { useEffect } from "react";
import HeadingDashboard from "@/components/profile/Header";
import ComingSoon from "@/app/[locale]/coming-soon";
import Profile from "@/components/profile/Profile";
import Personal from "@/components/profile/Personal";
import useAuth from "@/lib/useAuth";
import Loader from "@/components/loader/Loader";

const ProfilePage = () => {
  // Use the useAuth hook to get profile data
  const { profile, getMemberProfile, user, loading } = useAuth();

  // Fetch profile when the component mounts if the user is authenticated
  useEffect(() => {
    if (user) {
      getMemberProfile();
    }
  }, [user, getMemberProfile]);

  // Handle loading state
  if (loading) {
    return <Loader />;
  }

  // Handle case where profile is not yet loaded
  if (!profile) {
    return <ComingSoon />;
  }

  // Define tabs with profile data passed to components
  const tabs = [
    {
      label: "Personal Info",
      content: (
        <div className="m-8">
          <Personal user={profile.user_id} />
        </div>
      ),
    },
    {
      label: "My Profile",
      content: (
        <div className="m-8">
          <Profile profile={profile} />
        </div>
      ),
    },
  ];

  return (
    <>
      <HeadingDashboard tabs={tabs}>Profile</HeadingDashboard>
    </>
  );
};

export default ProfilePage;
