"use client"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import AboutHeader from "../about-header/AboutHeader";
import AboutDetails from "../about-details/AboutDetails";
import AboutAchievements from "../about-achievements/AboutAchievements";
import AboutTeam from "../about-team/AboutTeam";
import { fetchAbout } from "@/lib/thunks/about/aboutThunks";
import AboutPartnerships from "../about-partnerships/AboutPartnerships";
import AboutVideos from "../about-videos/AboutVideos";

const AboutContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      {/* Main Details Section */}
      <div className="col-span-1 lg:col-span-2">
        <AboutHeader
          name={aboutData.name}
          slogan={aboutData.slogan}
          logoUrl={aboutData.logo_url}
          coverPhotoUrl={aboutData.cover_photo_url}
        />
      </div>

      {/* Mission, Vision, and History */}
      <div className="col-span-1">
        <AboutDetails
          mission={aboutData.mission_statement}
          vision={aboutData.vision_statement}
          history={aboutData.history}
        />
      </div>

      {/* Leadership Team
      <div className="col-span-1">
        <AboutTeam leadershipTeam={aboutData.leadership_team} />
      </div>

      {/* Achievements Section
      <div className="col-span-1 lg:col-span-2">
        <AboutAchievements achievements={aboutData.achievements} />
      </div>

      {/* Partnerships Section
      <div className="col-span-1 lg:col-span-2">
        <AboutPartnerships partnerships={aboutData.partnerships} />
      </div>

      {/* Videos and Media
      <div className="col-span-1 lg:col-span-2">
        <AboutVideos videos={aboutData.videos} />
      </div> 
      */}
    </div>
  );
};

export default AboutContainer;
