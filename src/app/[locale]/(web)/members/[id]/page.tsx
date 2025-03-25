import MemberContainer from "@/components/member/member-container/MemberContainer";
import { Member } from "@/types/memberSchema";
import MemberHeader from "@/components/member/member-header/MemberHeader";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

// Fetch all member IDs for static generation
export async function generateStaticParams() {
  try {
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

    return members.map((member: Member) => ({
      id: member._id, // Map each member ID
    }));
  } catch (error) {
    console.error("Error fetching members:", error);
    return []; // Return an empty array in case of error
  }
}

// Dynamic Metadata Generation
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
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

    const member = members.find((m: Member) => m._id === params.id);

    if (!member) {
      return {
        title: "Member Not Found",
        description: "The requested member could not be found.",
      };
    }

    // Access and extend parent metadata
    const previousImages = (await parent).openGraph?.images || [];
    const memberImage = member.profile_photo_url || "";

    return {
      title: member.first_name + "'s Profile",
      description: member.bio,
      openGraph: {
        title: member.first_name,
        description: member.bio,
        images: [memberImage, ...previousImages].filter(Boolean), // Filter out undefined values
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

export default async function MemberPage({
  params,
}: {
  params: { id: string };
}) {
  // Set locale explicitly for static rendering
  setRequestLocale("en"); // Adjust based on your locale strategy

  const members = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/members`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());
  const member = members.find((m: Member) => m._id === params.id); // Find member by ID

  if (!member) {
    return notFound(); // Return 404 if no member found
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 bg-background">
      {/* Profile Header */}
      <MemberHeader member={member} />
      <div className="w-full max-w-4xl grid grid-cols-1 gap-6">
        <div>
          <MemberContainer member={member} />
        </div>
      </div>
    </div>
  );
}
