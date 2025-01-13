import React from "react";
import { Member } from "@/types/memberSchema";
import { Card, CardContent } from "@/components/ui/card";

interface MemberActivitiesProps {
  member: Member;
}

const MemberActivities: React.FC<MemberActivitiesProps> = ({ member }) => {
  return (
    <Card className="w-full bg-card shadow-lg rounded-lg p-6 mb-8">
      <CardContent>
        <h2 className="text-xl font-semibold text-primary">Activities</h2>
        <p className="text-accent mt-2">
          {/* Placeholder for activities. Replace with actual activities */}
          {member.first_name} has not logged any activities yet.
        </p>
      </CardContent>
    </Card>
  );
};

export default MemberActivities;
