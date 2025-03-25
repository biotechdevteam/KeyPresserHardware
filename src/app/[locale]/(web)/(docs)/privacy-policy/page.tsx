import PrivacyPolicy from "@/components/Policies/PrivacyPolicy";
import Error from "@/app/[locale]/error";
import { About } from "@/types/aboutSchema";

export default async function PrivacyPolicyPage() {
  try {
    const aboutData: About = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());
    return <PrivacyPolicy aboutData={aboutData} />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
