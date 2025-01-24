import AboutAchievements from "@/components/about/about-achievements/AboutAchievements";
import Error from "@/app/[locale]/error";

export default async function AchievementsPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    return (
      <div className="col-span-1 lg:col-span-2 m-8">
        <AboutAchievements aboutData={aboutData} />
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
