"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/useAuth";
import HelpForm from "@/components/profile/Help";
import { useTranslations } from "next-intl";

export default function HelpPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const t = useTranslations("Help");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        {t("pageTitle")}
      </h1>
      <HelpForm />
    </div>
  );
}
