import React from "react";
import { Card } from "@/components/ui/card";

interface Video {
  url: string;
  description?: string;
}

interface AboutVideosProps {
  videos: Video[];
}

const AboutVideos: React.FC<AboutVideosProps> = ({ videos }) => {
  return (
    <Card className="p-4 lg:w-[18cm] mx-auto text-center">
      <h2 className="text-xl font-semibold m-2">Videos</h2>
      <div className="grid grid-cols-1 gap-4">
        {videos.map((video, index) => (
          <div key={index} className="w-full">
            <video controls className="w-full h-auto rounded-lg">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {video.description && (
              <p className="text-sm text-gray-600 mt-2">{video.description}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AboutVideos;
