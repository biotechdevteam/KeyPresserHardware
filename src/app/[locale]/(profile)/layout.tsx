"use client";

import React from "react";
import HeroDashboard from "@/components/profile/Hero";
import SidebarDashboard from "@/components/profile/Sidebar";
import ScrollToTopButton from "@/components/ScrollToTop/ScrollToTopButton";
import AuthGuard from "@/components/AuthGuard";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={["member", "applicant", "admin"]}>
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
    </AuthGuard>
  );
}
