import React from "react";
import { Member } from "@/types/memberSchema";
import { fetchMembers } from "@/lib/fetchUtils"; // Fetch member details
import { notFound } from "next/navigation";
import MemberContainer from "@/components/member/member-container/MemberContainer";

export default async function MemberPage({
  params,
}: {
  params: { id: string };
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
    <div>
      <MemberContainer member={member} /> {/* Render the MemberContainer */}
    </div>
  );
}
