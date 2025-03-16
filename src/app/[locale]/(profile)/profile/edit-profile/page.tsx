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
  const { profile, getProfile, user, loading } = useAuth();

  // Fetch profile when the component mounts if the user is authenticated
  useEffect(() => {
    if (user && (user.user_type === "member" || user.user_type === "applicant")) {
      getProfile();
    }
  }, [user, getProfile]);

  // Handle loading state
  if (loading) {
    return <Loader />;
  }

  // Handle case where profile is not yet loaded
  if (!profile || !user) {
    return <ComingSoon />;
  }

  // Define tabs with profile data passed to components
  const tabs = [
    {
      label: "Personal Info",
      content: (
        <div className="m-8">
          <Personal user={user} />
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
    </>
  );
};

export default ProfilePage;
