"use client";
import Head from "next/head";
import Error from "@/app/[locale]/error";
import SignUp from "@/components/auth/SignUp";
import Loader from "@/components/loader/Loader";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function SignUpPage() {
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

  // Handle loading state
  if (loading || fetching) {
    return <Loader />;
  }

  // Handle error state
  if (isError) {
    return <Error error={error} />;
  }

  // Client-side metadata
  const title = aboutData?.name
    ? `Sign Up ~ ${aboutData.name}`
    : "Sign Up ~ BioTec Universe";
  const description = aboutData?.name
    ? `Join ${aboutData.name} to become part of our biotechnology community in Cameroon.`
    : "Join BioTec Universe to become part of our biotechnology community in Cameroon.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://biotecuniverse.org/auth/signup" />
        <link
          rel="alternate"
          href="https://biotecuniverse.org/en-US/auth/signup"
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href="https://biotecuniverse.org/fr-FR/auth/signup"
          hrefLang="fr-FR"
        />
      </Head>
      <div>
        <SignUp aboutData={aboutData as About} />
      </div>
    </>
  );
}
