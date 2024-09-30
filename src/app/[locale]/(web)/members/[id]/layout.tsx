import React from "react";
import { fetchMembers } from "@/lib/fetchUtils"; // Fetch member details
import { notFound } from "next/navigation";
import { Member } from "@/types/memberSchema";
import MemberHeader from "@/components/member/member-header/MemberHeader";

export default async function MemberLayout({
  children, // This will contain the actual content from the `page.tsx`
  params, // Capture the member ID from the URL
}: {
  children: React.ReactNode;
  params: { id: string }; // Define the params structure
}) {
  const members: Member[] = await fetchMembers(); // Fetch all members

  // Find the member with the matching ID
  const member: Member | undefined = members.find(
    (m: any) => m._id === params.id
  );

  if (!member) {
    return notFound(); // Handle case where the member doesn't exist
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 bg-background">
      {/* Profile Header */}
      <MemberHeader member={member} />

      {/* Child content */}
      <div className="w-full max-w-4xl grid grid-cols-1 gap-6">{children}</div>
    </div>
  );
}