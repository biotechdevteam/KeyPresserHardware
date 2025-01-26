import FAQContainer from "@/components/faq/faq-container/FAQContainer";
import Error from "@/app/[locale]/error";

export default async function MembershipFAQsPage() {
  try {
    const faqData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about/faqs`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());
    return <FAQContainer faqData={faqData} membership />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
