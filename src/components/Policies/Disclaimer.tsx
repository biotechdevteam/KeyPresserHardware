import React from "react";
import { Separator } from "../ui/separator";
import { About } from "@/types/aboutSchema";
import Link from "next/link";
import Error from "@/app/[locale]/error";
import Loader from "@/components/loader/Loader";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { useQuery } from "@tanstack/react-query";

const Disclaimer: React.FC = () => {
  const lastUpdated = "8th November 2024";
  const {
    data: aboutData,
    isLoading: loading,
    error,
    isError,
  } = useQuery<About>({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Handle loading state
  if (loading) {
    return <Loader />;
  }

  // Handle error state
  if (isError) {
    return <Error error={error} />;
  }

  return (
    <div className="min-h-screen px-8 lg:px-16 py-12">
      <div className="container mx-auto max-w-4xl">
        <section className="mb-6">
          <h1 className="text-3xl font-bold mb-4 text-center">Disclaimer</h1>
          <Separator className="mx-auto w-16 mb-8" />
          <h3 className="text-sm mb-2">
            Last updated:{" "}
            <span className="italic font-semibold">{lastUpdated}</span>
          </h3>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">General Information</h2>
          <p className="text-muted-foreground">
            The information provided by {aboutData?.name} on{" "}
            <Link
              href="https://www.biotecuniverse.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.biotecuniverse.org
            </Link>{" "}
            is intended for general informational and educational purposes only.
            While we strive to keep the information accurate and up-to-date, we
            make no warranties, express or implied, about the completeness,
            accuracy, reliability, suitability, or availability of the
            information on the website. Any reliance you place on such
            information is therefore strictly at your own risk.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            External Links Disclaimer
          </h2>
          <p className="text-muted-foreground">
            Our website may contain links to external sites or resources for
            informational purposes. These links are provided for your
            convenience; however, {aboutData?.name} does not control or guarantee
            the accuracy, relevance, timeliness, or completeness of information
            on these external websites. The inclusion of such links does not
            imply endorsement or recommendation. Users are advised to review the
            terms of use and privacy policies of any linked third-party sites.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Professional Disclaimer
          </h2>
          <p className="text-muted-foreground">
            The content on this website does not constitute professional advice,
            including but not limited to medical, scientific, or financial
            advice. For specific professional concerns, always consult with a
            qualified expert in the relevant field. Information shared on this
            site is not intended to substitute for professional consultation or
            services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Testimonials Disclaimer
          </h2>
          <p className="text-muted-foreground">
            Testimonials or user experiences featured on this website reflect
            the opinions of individual users and are shared for informational
            purposes only. These opinions and experiences may not necessarily
            represent all users, and results may vary. Biotech Universe does not
            guarantee similar outcomes for all users.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Limitation of Liability
          </h2>
          <p className="text-muted-foreground">
            Biotech Universe shall not be liable for any loss or damage,
            including without limitation indirect or consequential loss or
            damage, arising from the use of this website or the reliance on
            information available on it. This includes but is not limited to
            decisions made based on our content, links to external websites, or
            other resources featured on our site.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this disclaimer or our website,
            please contact us at:
          </p>
          <ul className="mt-2 text-muted-foreground">
            <li>
              Email:{" "}
              <Link href={`mailto:${aboutData?.contact_email}`}>
                {aboutData?.contact_email}
              </Link>
            </li>
            <li>
              Phone:{" "}
              <Link href={`tel:${aboutData?.contact_phone}`}>
                {aboutData?.contact_phone}
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;
