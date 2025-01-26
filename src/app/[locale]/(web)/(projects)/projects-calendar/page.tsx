import ProjectsCalendarPage from "@/components/projects/calendar/Calendar";
import Error from "@/app/[locale]/error";

export default async function CalenderPage() {
  try {
    const projectsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());
    return <ProjectsCalendarPage projectsData={projectsData} />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
