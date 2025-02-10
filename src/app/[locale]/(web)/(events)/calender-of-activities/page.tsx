import ActivitiesCalendarPage from "@/components/events/calender/Calender";
import Error from "@/app/[locale]/error";

export default async function CalenderPage() {
  try {
    const eventsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/events`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());
    return <ActivitiesCalendarPage eventsData={eventsData} />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
