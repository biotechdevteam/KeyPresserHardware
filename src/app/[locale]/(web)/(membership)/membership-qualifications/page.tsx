import MembershipQualifications from "@/components/membership/membership-qualifications/MembershipQualifications";
import Error from "@/app/[locale]/error";

export default async function MembershipQualificationsPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());
    return <MembershipQualifications aboutData={aboutData} />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
