import Members from "@/components/about/about-team/AboutTeam";
import { Separator } from "@/components/ui/separator";
import Error from "@/app/[locale]/error";

export default async function ExecutiveBoardPage() {
  try {
    const [aboutData, members] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/about`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/members`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
    ]);

    return (
      <div className="col-span-1 lg:col-span-2 m-8 text-center min-h-screen">
        <h2 className="text-3xl font-bold">Our Leadership Team</h2>
        <Separator className="w-24 mx-auto mt-4" />
        <p className="text-base py-8 px-4 max-w-3xl mx-auto">
          Our board members are seasoned professionals dedicated to driving
          innovation and excellence in biotechnology. With diverse expertise and
          a shared vision for the future, they lead{" "}
          {aboutData?.name || "our organization"} towards groundbreaking
          discoveries and impactful solutions.
        </p>

        <Members members={members} isExecutiveBoard={true} />
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
