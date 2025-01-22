"use client";
import AboutFooter from "@/components/about/about-footer/AboutFooter";
import Error from "@/app/[locale]/error";

export default async function ContactPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    return (
      <section className="grid min-h-screen place-items-center p-8">
        <div className="w-full max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-lg mt-4">
              Get in touch with us for inquiries and support.
            </p>
          </header>
          {/* About Footer Section */}
          <div className="col-span-1 lg:col-span-2">
            <AboutFooter aboutData={aboutData} />
          </div>
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
