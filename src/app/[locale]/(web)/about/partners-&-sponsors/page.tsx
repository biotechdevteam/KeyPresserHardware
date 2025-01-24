import AboutPartnerships from "@/components/about/about-partnerships/AboutPartnerships";
import Error from "@/app/[locale]/error";

export default async function PartnersSponsorsPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    return (
      <div className="col-span-1 lg:col-span-2 my-8">
        <AboutPartnerships aboutData={aboutData} />
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
