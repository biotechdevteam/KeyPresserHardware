import React from "react";
import HeroDashboard from "@/components/profile/Hero";
import SidebarDashboard from "@/components/profile/Sidebar";
import ScrollToTopButton from "@/components/ScrollToTop/ScrollToTopButton";
import AuthGuard from "@/components/AuthGuard";
import NavBar from "@/components/nav-bar/NavBar";
import Error from "@/app/[locale]/error";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    return (
      <AuthGuard allowedRoles={["member", "applicant", "admin"]}>
        <div className="min-h-screen bg-background text-foreground">
          <NavBar aboutData={aboutData} />
          <main className="container mx-auto px-4 lg:px-8 py-6 flex-grow mt-16">
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
  } catch (error: any) {
    return (
      <Error
        error={
          error.message ||
          "Failed to load data at root layout. Please try again."
        }
      />
    );
  }
}
