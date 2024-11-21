"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/useAuth";
import Loader from "./loader/Loader";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles: string[]; // Array of roles allowed to access the route
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.user_type)) {
      // Redirect unauthorized users to the sign-in page
      router.push("/auth/signin");
    }
  }, [user, allowedRoles]);

  // Render children when the user is authorized
  return user && allowedRoles.includes(user?.user_type) ? (
    <>{children}</>
  ) : (
    <Loader />
  );
};

export default AuthGuard;
