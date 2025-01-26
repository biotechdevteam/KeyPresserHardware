"use client";
import Image from "next/image";
import React from "react";

interface ProjectHeaderProps {
  title?: string;
  summary?: string;
  backgroundImageUrl?: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  summary,
  backgroundImageUrl,
}) => {
  return (
    <div className="w-full text-center space-y-4 p-6">
      {/* Title and Summary */}
      <div className="text-foreground">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg">{summary}</p>
      </div>

      {/* Image below the title and summary */}
      {backgroundImageUrl && (
        <Image
          src={backgroundImageUrl}
          alt="Project background"
          width={100}
          height={100}
          className="w-full h-auto max-h-96 object-cover mt-4 rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default ProjectHeader;
