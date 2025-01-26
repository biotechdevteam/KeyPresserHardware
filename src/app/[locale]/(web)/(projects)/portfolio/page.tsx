import PastProjects from "@/components/projects/past-projects/PastProjects";
import Error from "@/app/[locale]/error";

export default async function PortfolioPage() {
  try {
    const projectsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());
    return <PastProjects projectsData={projectsData} />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
