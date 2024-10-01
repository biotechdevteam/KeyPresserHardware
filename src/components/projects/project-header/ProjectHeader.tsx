import React from "react";

interface ProjectHeaderProps {
  title: string;
  summary: string;
  backgroundImageUrl?: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  summary,
  backgroundImageUrl,
}) => {
  return (
    <div
      className="relative w-full h-64 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background opacity-50"></div>

      <div className="relative z-10 text-center text-foreground p-6">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg">{summary}</p>
      </div>
    </div>
  );
};

export default ProjectHeader;
