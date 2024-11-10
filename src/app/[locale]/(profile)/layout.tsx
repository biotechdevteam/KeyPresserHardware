"use client";

import React, { useEffect, useState } from "react";
import AuthModal from "@/components/auth/modal";
import HeroDashboard from "@/components/profile/Hero";
import SidebarDashboard from "@/components/profile/Sidebar";
import ScrollToTopButton from "@/components/ScrollToTop/ScrollToTopButton";
import Loader from "@/components/loader/Loader";
import useAuth from "@/lib/useAuth";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, profile, getMemberProfile, loading, signOut } =
    useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);

  // Fetch the profile data if the user is authenticated
  useEffect(() => {
    if (isAuthenticated && user && !profile) {
      getMemberProfile();
    }
  }, [isAuthenticated, user, profile, getMemberProfile]);

  // Show authentication modal if user is not logged in or not a member
  useEffect(() => {
    if (!isAuthenticated || user?.user_type !== "member") {
      setShowAuthModal(true);
    }
  }, [isAuthenticated, user?.user_type]);

  // Handle showing AuthModal
  if (showAuthModal) {
    return (
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    );
  }

  // Handle loading state
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 lg:px-8 py-6 flex-grow">
        <HeroDashboard />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          <div className="lg:col-span-3">
            <SidebarDashboard />
          </div>
          <div className="lg:col-span-9 bg-white shadow-lg rounded-lg p-6">
            {children}
          </div>
        </div>
        <ScrollToTopButton />
      </main>
    </div>
  );
}
