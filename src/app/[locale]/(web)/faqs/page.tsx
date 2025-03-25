import FAQContainer from "@/components/faq/faq-container/FAQContainer";
import Error from "@/app/[locale]/error";

export default async function FAQPage() {
  try {
    const faqData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about/faqs`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    return (
      <section className="min-h-screen w-full  mx-auto">
        <FAQContainer faqData={faqData} />
      </section>
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
