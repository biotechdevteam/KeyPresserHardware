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
      <section className="grid min-h-screen place-items-center my-8">
        <div className="w-full mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold">FAQs</h1>
            <p className="text-lg mt-4">
              Find answers to frequently asked questions about our services and
              projects.
            </p>
          </header>
          <FAQContainer faqData={faqData} />
        </div>
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
