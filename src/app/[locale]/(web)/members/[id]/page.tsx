import MemberContainer from "@/components/member/member-container/MemberContainer";
import { Member } from "@/types/memberSchema";
import MemberHeader from "@/components/member/member-header/MemberHeader";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

// Fetch all member IDs for static generation
export async function generateStaticParams() {
  const members = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/members`,
    {
      cache: "force-cache", // Use static caching for SSG
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching members for static params:", error);
      return []; // Return empty array on error
    });

  return members.map((member: Member) => ({
    id: member._id,
  }));
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    // Resolve the params Promise to get the id
    const { id } = await params;

    // Fetch members data
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/members`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const members: Member[] = await res.json();
    const member = members.find((m: Member) => m._id === id);

    if (!member) {
      return {
        title: "Member Not Found",
        description: "The requested member could not be found.",
      };
    }

    // Access parent metadata
    const previousImages = (await parent).openGraph?.images || [];
    const memberImage = member.profile_photo_url || "";

    return {
      title: `${member.first_name}'s Profile`,
      description: member.bio,
      openGraph: {
        title: member.first_name,
        description: member.bio,
        images: [memberImage, ...previousImages].filter(Boolean),
      },
      twitter: {
        card: "summary_large_image",
        title: member.first_name,
        description: member.bio,
        images: [memberImage].filter(Boolean),
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while generating metadata.",
    };
  }
}

export default async function MemberPage({ params }: Props) {
  setRequestLocale("en"); // Adjust based on your locale strategy
  const { id } = await params;

  const members = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/members`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());

  const member = members.find((m: Member) => m._id === id);

  if (!member) {
    return notFound();
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
