"use client"
import ApplicationForm from "@/components/application-form/ApplicationForm";
import React from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

const ApplyPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    redirect("/auth/signin");
  }
  return (
    <main className="container mx-auto my-10 p-6 bg-card rounded-lg shadow-md text-foreground">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-lg text-muted-foreground">
          Fill out the application form below to apply for a position on our
          team.
        </p>
      </section>

      <ApplicationForm />
    </main>
  );
};

export default ApplyPage;
