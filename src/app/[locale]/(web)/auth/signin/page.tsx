"use client";
import Error from "@/app/[locale]/error";
import SignIn from "@/components/auth/SignIn";
import Loader from "@/components/loader/Loader";
import useAuth from "@/lib/useAuth";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Head from "next/head";
import React, { useEffect } from "react";

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

  // Handle loading state
  if (loading || fetching) {
    return <Loader />;
  }

  // Handle error state
  if (isError) {
    return <Error error={error} />;
  }

  const title = aboutData?.name
    ? `Sign In ~ ${aboutData.name}`
    : "Sign In ~ BioTec Universe";
  const description = aboutData?.name
    ? `Sign in to ${aboutData.name} to access your account and explore biotechnology resources.`
    : "Sign in to BioTec Universe to access your account and explore biotechnology resources.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://biotecuniverse.org/auth/signin" />
        <link
          rel="alternate"
          href="https://biotecuniverse.org/en-US/auth/signin"
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href="https://biotecuniverse.org/fr-FR/auth/signin"
          hrefLang="fr-FR"
        />
      </Head>
      <div>
        <SignIn aboutData={aboutData as About} />
      </div>
    </>
  );
}
