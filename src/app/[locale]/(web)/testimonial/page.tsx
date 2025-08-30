import { Metadata } from "next";
import TestimonialForm from "@/components/testimonial/testimonial-form/TestimonialForm";
import Error from "@/app/[locale]/error";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    const title = aboutData?.name
      ? `Share Your Experience ~ ${aboutData.name}`
      : "Share Your Experience ~ BioTec Universe";
    const description = aboutData?.name
      ? `Share your testimonial or review with ${aboutData.name}. Help others learn about our services and community.`
      : "Share your testimonial or review with BioTec Universe. Help others learn about our services and community.";

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "testimonial",
        "review",
        "feedback",
        "biotechnology",
        "Cameroon",
        "Buea",
        "experience",
        "University of Buea",
        aboutData?.name || "association",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/testimonial",
        languages: {
          "en-US": "/en-US/testimonial",
          "fr-FR": "/fr-FR/testimonial",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/testimonial",
        title,
        description,
        siteName: "BioTec Universe",
        images: [
          {
            url: aboutData?.logo_url || "/images/logo.png",
            width: 1200,
            height: 630,
            alt: `${aboutData?.name || "BioTec Universe"} Testimonial Page`,
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [aboutData?.logo_url || "/images/logo.png"],
        creator: aboutData?.social_links?.twitter
          ? aboutData.social_links.twitter.split("/").pop()
          : "@BioTecUniverse",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Failed to fetch aboutData for metadata:", error);
    return {
      title: "Share Your Experience ~ BioTec Universe",
      description:
        "Share your testimonial or review with BioTec Universe. Help others learn about our services and community.",
      keywords: [
        "BioTec Universe",
        "testimonial",
        "review",
        "feedback",
        "biotechnology",
        "Cameroon",
        "experience",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/testimonial",
        languages: {
          "en-US": "/en-US/testimonial",
          "fr-FR": "/fr-FR/testimonial",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/testimonial",
        title: "Share Your Experience ~ BioTec Universe",
        description:
          "Share your testimonial or review with BioTec Universe. Help others learn about our services and community.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe Testimonial Page",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Share Your Experience ~ BioTec Universe",
        description:
          "Share your testimonial or review with BioTec Universe. Help others learn about our services and community.",
        images: ["/images/logo.png"],
        creator: "@BioTecUniverse",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }
}

export default async function TestimonialPage() {
  try {
    const [services, events] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
    ]);

    return (
      <section className="container min-h-screen mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Share Your Experience
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
              We value your feedback! Share your testimonial or review to help
              others learn about our services and community. Your experience
              matters to us.
            </p>
          </div>

          <TestimonialForm events={events} services={services} />

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Your feedback helps us improve our services and assists others in
              making informed decisions.
            </p>
          </div>
        </div>
      </section>
    );
  } catch (error: any) {
    return (
      <Error
        error={
          error.message ||
          "Failed to load events and services. Please try again."
        }
      />
    );
  }
}
