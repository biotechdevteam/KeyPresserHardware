"use client";
import Head from "next/head";
import ForgotPassword from "@/components/auth/ForgotPassword";
import React from "react";

export default function ForgotPasswordPage() {
  // Client-side metadata
  const title = "Forgot Password ~ BioTec Universe";
  const description =
    "Recover your BioTec Universe account by requesting a password reset.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://biotecuniverse.org/auth/forgot-password"
        />
        <link
          rel="alternate"
          href="https://biotecuniverse.org/en-US/auth/forgot-password"
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href="https://biotecuniverse.org/fr-FR/auth/forgot-password"
          hrefLang="fr-FR"
        />
      </Head>
      <div>
        <ForgotPassword />
      </div>
    </>
  );
}
