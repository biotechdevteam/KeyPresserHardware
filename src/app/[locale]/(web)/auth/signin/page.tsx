"use client";
import SignIn from "@/components/auth/SignIn";
import Loader from "@/components/loader/Loader";
import useAuth from "@/lib/useAuth";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

// Function to fetch about data on the client side
async function fetchAboutDataClient() {
  const data = await fetchAboutData();
  return data;
}

export default function SignInPage() {
  // Fetch about data
  const {
    data: aboutData,
    isLoading: loading,
    isFetching: fetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Get user info from useAuth hook
  const { user } = useAuth();
  const router = useRouter();

  // Handle loading state
  if (loading || fetching) {
    return <Loader />;
  }

  // Handle error state
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  // Use useEffect to handle routing based on user type
  useEffect(() => {
    if (user) {
      if (user?.user_type === "admin") {
        router.push("/admin");
      } else if (
        user?.user_type === "member" ||
        user?.user_type === "applicant"
      ) {
        router.push("/profile");
      }
    }
  }, [user, router]);

  return (
    <div>
      <SignIn aboutData={aboutData as About} />
    </div>
  );
}
