"use client";
import CTASection from "@/components/about/about-cta/CTASection";
import AboutIntro from "@/components/about/about-intro/AboutIntro";
import { useTransitionRouter } from "next-view-transitions";
import Error from "@/app/[locale]/error";
import { slideFadeInOut } from "../../../../../lib/utils/pageTransitions";

export default async function StoryPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    const router = useTransitionRouter();
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 width-auto">
        {/* Introduction */}
        <div className="col-span-1 lg:col-span-2">
          <AboutIntro aboutData={aboutData} />
        </div>

        {/* CTA Section */}
        <div className="col-span-1 lg:col-span-2">
          <CTASection
            title="Join Us"
            description="Become a part of our mission!"
            action={() =>
              router.push("/apply", { onTransitionReady: slideFadeInOut })
            }
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
