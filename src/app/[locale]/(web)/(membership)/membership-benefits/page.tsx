"use client";
import MembershipBenefits from "@/components/membership/membership-benefits/MembershipBenefits";
import Error from "@/app/[locale]/error";

export default async function MembershipBenefitsPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());
    return <MembershipBenefits aboutData={aboutData} />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
