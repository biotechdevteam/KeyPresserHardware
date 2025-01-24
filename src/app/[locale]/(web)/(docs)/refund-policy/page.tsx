import RefundPolicy from "@/components/Policies/RefundPolicy";
import Error from "@/app/[locale]/error";

export default async function RefundPolicyPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());
    return <RefundPolicy aboutData={aboutData} />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
