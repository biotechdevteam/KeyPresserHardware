"use client";
import Loader from "@/components/loader/Loader";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const DelayedRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <Loader />
    </div>
  );
};

const Page = () => {
  return <DelayedRedirect />;
};

export default Page;
