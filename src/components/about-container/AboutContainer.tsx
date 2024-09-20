"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store"; // Import AppDispatch
import AboutHeader from "../about-header/AboutHeader";
import AboutDetails from "../about-details/AboutDetails";
import AboutAchievements from "../about-achievements/AboutAchievements";
import AboutTeam from "../about-team/AboutTeam";
import { fetchAbout } from "@/lib/thunks/about/aboutThunks";

const AboutContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Use typed dispatch
  const aboutData = useSelector((state: RootState) => state.about.data);
  const loading = useSelector((state: RootState) => state.about.loading);
  const error = useSelector((state: RootState) => state.about.error);

  React.useEffect(() => {
    dispatch(fetchAbout());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="col-span-1">
        <AboutHeader
          name={aboutData.name}
          slogan={aboutData.slogan}
          logoUrl={aboutData.logo_url}
        />
      </div>
      <div className="col-span-1">
        <AboutDetails
          mission={aboutData.mission_statement}
          vision={aboutData.vision_statement}
          history={aboutData.history}
        />
      </div>
      <div className="col-span-1 md:col-span-2">
        <AboutTeam leadershipTeam={aboutData.leadership_team} />
      </div>
      <div className="col-span-1 md:col-span-2">
        <AboutAchievements achievements={aboutData.achievements} />
      </div>
    </div>
  );
};

export default AboutContainer;
