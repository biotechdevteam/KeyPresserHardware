"use client";

import React from "react";
import CounterDashboard from "@/components/profile/Counter";
import HeadingDashboard from "@/components/profile/Header";

const ProfilePage = () => {
  return (
    <>
      <HeadingDashboard>Dashboard</HeadingDashboard>
      <div className="m-8">
        <CounterDashboard />
      </div>
    </>
  );
};

export default ProfilePage;
