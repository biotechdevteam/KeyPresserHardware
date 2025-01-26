"use client";
import React, { useState } from "react";
import { Member } from "@/types/memberSchema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemberDetails from "../member-details/MemberDetails";
import MemberActivities from "../member-activities/MemberActivities";

interface MemberContainerProps {
  member: Member;
}

const MemberContainer: React.FC<MemberContainerProps> = ({ member }) => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="w-full max-w-4xl p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <MemberDetails member={member} />
        </TabsContent>

        <TabsContent value="activities">
          <MemberActivities member={member} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberContainer;
