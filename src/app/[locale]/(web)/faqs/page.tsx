"use client";
import FAQContainer from "@/components/faq/faq-container/FAQContainer";

export default async function FAQPage() {
  return (
    <section className="grid min-h-screen place-items-center p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">FAQs</h1>
          <p className="text-lg mt-4">
            Find answers to frequently asked questions about our services and
            projects.
          </p>
        </header>
        <FAQContainer />
      </div>
    </section>
  );
}
