import Contact from "@/components/about/about-footer/AboutFooter";
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
      <section className="container min-h-screen mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-4xl md:text-5xl">Contact Us</h1>
            <p className="text-lg mt-4 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help. Get in
              touch with our team for inquiries and support.
            </p>
          </div>
          <div className="w-full">
            <Contact aboutData={aboutData} />
          </div>

          <div className="mt-8 text-center text-sm">
            <p>We typically respond to inquiries within 24-48 hours.</p>
          </div>
        </div>
      </section>
    );
  } catch (error: any) {
    return (
      <Error
        error={
          error.message ||
          "Failed to load contact information. Please try again later."
        }
      />
    );
  }
}
