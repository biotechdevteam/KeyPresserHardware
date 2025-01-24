import LandingContainer from "@/components/landing/container/LandingContainer";
import Error from "@/app/[locale]/error";

export default async function LandingPage() {
  try {
    const [aboutData, feedbacks, projects, faqData] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/about`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/feedback`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/about/faqs`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
    ]);

    return (
      <div className="-mt-24">
        <LandingContainer
          aboutData={aboutData}
          feedbacks={feedbacks}
          projects={projects}
          faqData={faqData}
        />
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
