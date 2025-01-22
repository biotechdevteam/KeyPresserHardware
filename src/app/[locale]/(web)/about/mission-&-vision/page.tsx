"use client";
import CTASection from "@/components/about/about-cta/CTASection";
import AboutDetails from "@/components/about/about-details/AboutDetails";
import { useTransitionRouter } from "next-view-transitions";
import Error from "@/app/[locale]/error";
import { slideFadeInOut } from "../../../../../lib/utils/pageTransitions";

export default async function MissionVisionPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    const router = useTransitionRouter();
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 m-8 width-auto">
        {/* Mission, Vision */}
        <div className="col-span-1 lg:col-span-2">
          <AboutDetails aboutData={aboutData} />
        </div>

        {/* CTA Section */}
        <div className="col-span-1 lg:col-span-2">
          <CTASection
            title="Support Our Mission"
            action={() =>
              router.push("/donate", { onTransitionReady: slideFadeInOut })
            }
            description="Help us achieve our goals through your contributions."
          />
        </div>
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
