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
  const { isAuthenticated, user } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);

  // Show authentication modal if user is not logged in or not a member
  useEffect(() => {
    if (!isAuthenticated) {
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
      <div className="flex items-center justify-center min-h-screen bg-muted">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 lg:px-8 py-6 flex-grow">
        <HeroDashboard />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <SidebarDashboard />
          </div>
          {/* Main Content */}
          <div className="lg:col-span-9 bg-card text-card-foreground shadow-lg rounded-lg p-6">
            {children}
          </div>
        </div>
        <ScrollToTopButton />
      </main>
    </div>
  );
}
