"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchMembers } from "@/lib/fetchUtils"; // Fetch member details
import Loader from "@/components/loader/Loader";
import MemberContainer from "@/components/member/member-container/MemberContainer";
import { Member } from "@/types/memberSchema";
import MemberHeader from "@/components/member/member-header/MemberHeader";

// This function fetches member data based on the ID from the params
async function getMemberData(id: string) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Find the specific member based on the ID
  const member = data?.find((m: Member) => m._id === id);

  return {
    member,
    isLoading,
    isFetching,
    isError,
    error,
  };
}

// MemberPage component to fetch and display a specific member based on ID
const MemberPage: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const { member, isLoading, isFetching, isError } = await getMemberData(
    params.id
  );

  // Handle loading state
  if (isLoading || isFetching) {
    return <Loader />;
  }

  // Handle error or missing member state
  if (isError || !member) {
    return <div>Member not found</div>; // You could also use `notFound()` if available in this environment
  }

  // Render the MemberContainer with the found member data
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
};

export default MemberPage;
