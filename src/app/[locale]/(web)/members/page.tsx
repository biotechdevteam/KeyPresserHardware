import { Metadata } from "next";
import Members from "@/components/about/about-team/AboutTeam";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Error from "../../error";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [aboutData, members] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/about`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/members`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
    ]);

    const memberCount = members?.length || 0;
    const orgName = aboutData?.name || "BioTec Universe";
    const specializations = [
      ...new Set(members?.map((m: any) => m.specialization).filter(Boolean)),
    ].join(", ");
    const title = `${orgName} Members ~ Bio-Technology Experts`;
    const description = specializations
      ? `Meet ${memberCount} ${orgName} members specializing in ${specializations}.`
      : `Meet ${memberCount} dedicated members of ${orgName}, advancing biotechnology in Cameroon.`;

    return {
      title,
      description,
      keywords: [
        orgName,
        "members",
        "team",
        "biotechnology",
        "Cameroon",
        "Buea",
        "biochemistry",
        "University of Buea",
        "experts",
        ...(members?.map((m: any) => m.specialization).filter(Boolean) || []), // Add specializations
        ...(members?.flatMap((m: any) => m.skills || []).slice(0, 5) || []), // Add top skills
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/members",
        languages: {
          "en-US": "/en-US/members",
          "fr-FR": "/fr-FR/members",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/members",
        title,
        description,
        siteName: "BioTec Universe",
        images: [
          {
            url: aboutData?.logo_url || "/images/logo.png",
            width: 1200,
            height: 630,
            alt: `${orgName} Members`,
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
    console.error("Failed to fetch data for metadata:", error);
    return {
      title: "Members ~ BioTec Universe ~ Biotechnology Experts",
      description:
        "Meet the dedicated members of BioTec Universe, advancing biotechnology in Cameroon.",
      keywords: [
        "BioTec Universe",
        "members",
        "team",
        "biotechnology",
        "Cameroon",
        "Buea",
        "biochemistry",
        "University of Buea",
        "experts",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/members",
        languages: {
          "en-US": "/en-US/members",
          "fr-FR": "/fr-FR/members",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/members",
        title: "Members ~ BioTec Universe ~ Biotechnology Experts",
        description:
          "Meet the dedicated members of BioTec Universe, advancing biotechnology in Cameroon.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe Members",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Members ~ BioTec Universe ~ Biotechnology Experts",
        description:
          "Meet the dedicated members of BioTec Universe, advancing biotechnology in Cameroon.",
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

export default async function MembersPage() {
  try {
    const [aboutData, members] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/about`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/members`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
    ]);

    const orgName = aboutData?.name || "BioTec Universe";

    return (
      <div className="col-span-1 lg:col-span-2 m-8 text-center">
        <h2 className="text-3xl font-bold">Our Members</h2>
        <Separator className="w-24 mx-auto mt-4" />
        <p className="text-base py-8 px-4 max-w-3xl mx-auto">
          Meet the dedicated members of {orgName} who contribute their expertise
          and passion towards advancing biotechnology. Each member brings unique
          skills and experience, working together to shape the future of the
          industry and foster innovation.
        </p>
        <Members members={members} isExecutiveBoard={false} />
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
