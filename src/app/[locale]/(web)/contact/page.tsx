"use client";
import AboutFooter from "@/components/about/about-footer/AboutFooter";

const ContactPage: React.FC = () => {
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
          <AboutFooter />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
