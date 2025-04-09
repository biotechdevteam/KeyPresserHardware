import Error from "@/app/[locale]/error";
import FilteredProjects from "@/components/projects/filtered-projects/FilteredProjects";

export default async function PortfolioPage() {
  try {
    const projectsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());
    return (
      <FilteredProjects
        projectsData={projectsData}
        status="past"
        title="Completed Projects"
      />
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
