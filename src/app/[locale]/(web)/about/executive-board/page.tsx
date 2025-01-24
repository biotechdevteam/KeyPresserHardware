import AboutTeam from "@/components/about/about-team/AboutTeam";
import { Separator } from "@/components/ui/separator";
import Error from "@/app/[locale]/error";

export default async function ExecutiveBoardPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    return (
      <div className="col-span-1 lg:col-span-2 m-8 text-center">
        <h2 className="text-xl lg:text-2xl font-bold">Our Leadership Team</h2>
        <Separator className="w-24 mx-auto mt-4" />
        <p className="text-base py-8 px-4">
          Our board members are seasoned professionals dedicated to driving
          innovation and excellence in biotechnology. With diverse expertise and
          a shared vision for the future, they lead Biotech Universe towards
          groundbreaking discoveries and impactful solutions.
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
