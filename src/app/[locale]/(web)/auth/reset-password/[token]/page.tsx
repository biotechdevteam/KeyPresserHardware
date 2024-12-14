"use client";
import ResetPassword from "@/components/auth/ResetPassword";
import React from "react";

interface ForgotPasswordPageProps {
  params: { token: string };
}

export default function ForgotPasswordPage({
  params,
}: ForgotPasswordPageProps) {
  const { token } = params;

  return (
    <div>
      <ResetPassword token={token} />
    </div>
  );
}
