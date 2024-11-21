"use client";

import React from "react";
import Review from "@/components/profile/Review";
import HeadingDashboard from "@/components/profile/Header";

const ReviewPage = () => {
  return (
    <div>
      <HeadingDashboard>Review Application</HeadingDashboard>
      <Review />
    </div>
  );
};

export default ReviewPage;
