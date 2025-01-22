"use client";
import UpcomingProjects from "@/components/projects/upcoming-projects/UpcomingProjects";
import Error from "@/app/[locale]/error";

export default async function UpcomingProjectsPage() {
  try {
    const projectsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
      {
        cache: "no-store",
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());
    return <UpcomingProjects projectsData={projectsData} />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
