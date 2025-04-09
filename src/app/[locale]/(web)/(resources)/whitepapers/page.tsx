import Error from "@/app/[locale]/error";
import WhitePapers from "@/components/resources/whitepapers/Whitepapers";

export default async function WhitePapersPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    return <WhitePapers aboutData={aboutData} />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
