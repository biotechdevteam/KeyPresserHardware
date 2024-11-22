"use client";

import React, { useEffect, useState } from "react";
import useAuth from "@/lib/useAuth";
import AuthModal from "@/components/auth/modal";
import HeroDashboard from "@/components/profile/Hero";
import SidebarDashboard from "@/components/profile/Sidebar";
import CounterDashboard from "@/components/profile/Counter";
import HeadingDashboard from "@/components/profile/Header";

const MembersDirectoryPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Open modal if user is not authenticated or not a "member"
  useEffect(() => {
    if (!isAuthenticated || user?.user_type !== "member") {
      setShowAuthModal(true);
    }
  }, [isAuthenticated, user?.user_type]);

  return (
    <div className="m-8">
      {isAuthenticated && user?.user_type === "member" ? (
        <>
          <HeroDashboard />
          <div className="container-fluid-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-30px pt-30px pb-100px">
              <SidebarDashboard />
              <div className="lg:col-start-4 lg:col-span-9">
                <HeadingDashboard>Dashboard</HeadingDashboard>
                <CounterDashboard />
              </div>
            </div>
          </div>
        </>
      ) : (
        <AuthModal
          open={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
};

export default MembersDirectoryPage;
