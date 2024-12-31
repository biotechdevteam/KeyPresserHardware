"use client";

import React from "react";
import Head from "next/head";
import Footer from "@/components/footer/Container";
import NavBar from "@/components/nav-bar/NavBar";
import ScrollToTopButton from "@/components/ScrollToTop/ScrollToTopButton";
import CookieConsent from "@/components/Cookies/CookieConsent";
import Loader from "@/components/loader/Loader";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import { generateMetadata } from "@/lib/utils/generateMetadata";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: aboutData,
    isLoading,
    isError,
    error,
  } = useQuery<About>({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-destructive text-center inset-0">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  const metadata = {
    title: "BioTec Universe",
    description: "BioTec Universe is a biotechnology association based in Buea, Cameroon, founded by the 2024/2025 Master's graduates from the Department of Biochemistry at the University of Buea.",
    ...generateMetadata({ params: { route: "/" } }),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="apple-mobile-web-app-title" content="BT Verse" />
      </Head>
      <header>
        <NavBar aboutData={aboutData as About} />
      </header>

      <main className="flex-grow mt-24">
        {children}
        <CookieConsent />
        <ScrollToTopButton />
      </main>

      <footer>
        <Footer aboutData={aboutData as About} />
      </footer>
    </div>
  );
}
