import { fetchMembers } from "@/lib/utils/fetchUtils";
import MemberContainer from "@/components/member/member-container/MemberContainer";
import { Member } from "@/types/memberSchema";
import MemberHeader from "@/components/member/member-header/MemberHeader";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

// Fetch all member IDs for static generation
export async function generateStaticParams() {
  const members = await fetchMembers(); // Fetch all members
  return members.map((member: Member) => ({
    id: member._id, // Map each member ID
  }));
}

// Dynamic Metadata Generation
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch all member data
  const members = await fetchMembers();
  const member = members.find((m) => m._id === params.id);

  // Handle case where member is not found
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
      images: [memberImage],
    },
  };
}

export default async function MemberPage({
  params,
}: {
  params: { id: string };
}) {
  const members = await fetchMembers(); // Fetch all members
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
