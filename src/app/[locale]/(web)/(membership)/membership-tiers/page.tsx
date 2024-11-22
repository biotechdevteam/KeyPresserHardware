"use client";

import MembershipSection from "@/components/landing/tiers/MemberShipTier";
import React from "react";

const membershipTiers = [
  {
    id: "1",
    name: "Standard",
    description:
      "A unified membership for all members of the biotechnology space.",
    benefits: [
      "Equal access to all resources",
      "Monthly community updates",
      "Participation in exclusive biotech events",
      "Access to the biotechnology research hub",
    ],
  },
];

const MembershipTiersPage = () => {
  return (
    <div>
      <MembershipSection membershipTiers={membershipTiers} />
    </div>
  );
};

export default MembershipTiersPage;
