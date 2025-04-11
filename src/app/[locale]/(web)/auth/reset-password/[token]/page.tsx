"use client";
import Head from "next/head";
import ResetPassword from "@/components/auth/ResetPassword";
import React from "react";

interface ResetPasswordPageProps {
  params: { token: string };
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { token } = params;

  // Client-side metadata
  const title = "Reset Password ~ BioTec Universe";
  const description =
    "Reset your BioTec Universe account password to regain access.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://biotecuniverse.org/auth/reset-password"
        />
        <link
          rel="alternate"
          href="https://biotecuniverse.org/en-US/auth/reset-password"
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href="https://biotecuniverse.org/fr-FR/auth/reset-password"
          hrefLang="fr-FR"
        />
      </Head>
      <div>
        <ResetPassword token={token} />
      </div>
    </>
  );
}
