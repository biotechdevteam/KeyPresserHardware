"use client";

import React, { useState, useEffect } from "react";
import ScrollToTopButton from "@/components/ScrollToTop/ScrollToTopButton";
import AuthGuard from "@/components/AuthGuard";
import { usePathname } from "next/navigation";
import Header from "@/components/profile/Header";
import Sidebar from "@/components/profile/Sidebar";
import NotificationBanner from "@/components/notification-banner/NotificationBanner";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on path change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <AuthGuard allowedRoles={["member", "applicant", "customer", "client"]}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="fixed top-0 w-full">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="md:ml-64">
            <NotificationBanner />
          </div>
        </div>
        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />
        <main className="md:ml-64 mt-[100px]">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">{children}</div>
          <ScrollToTopButton />
        </main>
      </div>
    </AuthGuard>
  );
}
