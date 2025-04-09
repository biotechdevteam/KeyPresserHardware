"use client";
import React, { useState } from "react";
import { Member } from "@/types/memberSchema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemberDetails from "../member-details/MemberDetails";
import MemberActivities from "../member-activities/MemberActivities";
import { motion } from "framer-motion";
import { FileText, Activity, Briefcase, Users } from "lucide-react";

interface MemberContainerProps {
  member: Member;
}

const MemberContainer: React.FC<MemberContainerProps> = ({ member }) => {
  const [activeTab, setActiveTab] = useState("details");

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="w-full max-w-4xl"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-card/50 backdrop-blur-sm mb-6 flex justify-between border border-primary/10">
          <TabsTrigger
            value="details"
            className="flex items-center gap-2 flex-1"
          >
            <FileText size={16} />
            <span className="hidden sm:inline">Details</span>
          </TabsTrigger>
          <TabsTrigger
            value="articles"
            className="flex items-center gap-2 flex-1"
          >
            <Activity size={16} />
            <span className="hidden sm:inline">Articles</span>
          </TabsTrigger>
          <TabsTrigger
            value="services"
            className="flex items-center gap-2 flex-1"
          >
            <Briefcase size={16} />
            <span className="hidden sm:inline">Services</span>
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="flex items-center gap-2 flex-1"
          >
            <Users size={16} />
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-0">
          <MemberDetails member={member} />
        </TabsContent>

        <TabsContent value="articles" className="mt-0">
          <MemberActivities member={member} activityType="articles" />
        </TabsContent>

        <TabsContent value="services" className="mt-0">
          <MemberActivities member={member} activityType="services" />
        </TabsContent>

        <TabsContent value="projects" className="mt-0">
          <MemberActivities member={member} activityType="projects" />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default MemberContainer;
