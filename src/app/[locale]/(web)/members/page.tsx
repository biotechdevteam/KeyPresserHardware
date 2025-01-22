"use client";
import AboutTeam from "@/components/about/about-team/AboutTeam";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Error from "../../error";

export default async function MembersPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "no-store",
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    return (
      <div className="col-span-1 lg:col-span-2 m-8 text-center">
        <h2 className="text-xl lg:text-2xl font-bold">Our Members</h2>
        <Separator className="w-24 mx-auto mt-4" />
        <p className="text-base py-8 px-4">
          Meet the dedicated members of {aboutData?.name} who contribute their
          expertise and passion towards advancing biotechnology. Each member
          brings unique skills and experience, working together to shape the
          future of the industry and foster innovation.
        </p>
        <AboutTeam aboutData={aboutData} />
      </div>
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
