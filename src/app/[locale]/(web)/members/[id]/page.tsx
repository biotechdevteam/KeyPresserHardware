import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import MemberContainer from "@/components/member/member-container/MemberContainer";
import MemberHeader from "@/components/member/member-header/MemberHeader";
import { Member } from "@/types/memberSchema";

// Fetch all member IDs for static generation
export async function generateStaticParams() {
  const members = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/members`,
    {
      cache: "force-cache",
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching members for static params:", error);
      return [];
    });

  return members.map((member: Member) => ({
    id: member._id,
  }));
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { id } = await params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/members`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch members: ${res.status}`);
    }

    const members: Member[] = await res.json();
    const member = members.find((m: Member) => m._id === id);

    if (!member) {
      return {
        title: "Member Not Found ~ BioTec Universe",
        description: "The requested member could not be found.",
        robots: { index: false, follow: false }, // Prevent indexing of 404
      };
    }

    const previousImages = (await parent).openGraph?.images || [];
    const memberImage = member.resume_url || member.social_links?.[0]; // Fallback to social link if no resume

    return {
      title: `${member.first_name} ~ Member Profile ~ BioTec Universe`,
      description:
        member.bio ||
        `${member.first_name} is a ${
          member.specialization || "biotechnology"
        } expert at BioTec Universe.`,
      keywords: [
        member.first_name,
        member.specialization || "biotechnology",
        "BioTec Universe",
        "member profile",
        "Cameroon",
        "Buea",
        ...(member.skills?.slice(0, 5) || []), // Top 5 skills
        member.role || "member",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: `/members/${id}`,
        languages: {
          "en-US": `/en-US/members/${id}`,
          "fr-FR": `/fr-FR/members/${id}`,
        },
      },
      openGraph: {
        type: "profile",
        url: `https://biotecuniverse.org/members/${id}`,
        title: `${member.first_name} ~ BioTec Universe`,
        description:
          member.bio ||
          `${member.first_name}, ${
            member.specialization || "biotechnology"
          } expert at BioTec Universe.`,
        siteName: "BioTec Universe",
        images: memberImage
          ? [
              {
                url: memberImage,
                width: 1200,
                height: 630,
                alt: `${member.first_name}'s Profile`,
              },
            ]
          : [
              {
                url: "/images/logo.png",
                width: 1200,
                height: 630,
                alt: `${member.first_name}'s Profile`,
              },
            ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: `${member.first_name} ~ BioTec Universe`,
        description:
          member.bio ||
          `${member.first_name}, ${
            member.specialization || "biotechnology"
          } expert at BioTec Universe.`,
        images: memberImage ? [memberImage] : ["/images/logo.png"],
        creator: member.social_links?.find((link: string) =>
          link.includes("twitter.com")
        )
          ? `@${(link: string) =>
              link.replace("https://twitter.com/", "").split("/").pop()}`
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
    console.error("Error generating metadata:", error);
    return {
      title: "Error ~ Member Profile ~ BioTec Universe",
      description: "An error occurred while loading this member profile.",
      metadataBase: new URL("https://biotecuniverse.org"),
      robots: { index: false, follow: false }, // Prevent indexing of errors
    };
  }
}

export default async function MemberPage({ params }: Props) {
  setRequestLocale("en"); // Adjust for dynamic locale if needed
  const { id } = await params;

  const members = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/members`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch members: ${res.status}`);
    return res.json();
  });

  const member = members.find((m: Member) => m._id === id);

  if (!member) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-gradient-to-b from-background to-background/95 py-8 px-4 sm:py-12">
      <MemberHeader member={member} />
      <div className="w-full max-w-4xl">
        <MemberContainer member={member} />
      </div>
    </div>
  );
}
