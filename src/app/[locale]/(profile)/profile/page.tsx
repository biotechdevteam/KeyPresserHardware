"use client";

import React from "react";
import CounterDashboard from "@/components/profile/Counter";
import { Helmet } from "react-helmet";
import useAuth from "@/lib/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div>
      <Helmet>
        <title>
          {user?.first_name} {user?.last_name}'s Profile
        </title>
        <meta
          name="description"
          content="View and manage your profile details, including personal information and account settings."
        />
      </Helmet>
      <CounterDashboard />;
    </div>
  );
};

export default ProfilePage;
