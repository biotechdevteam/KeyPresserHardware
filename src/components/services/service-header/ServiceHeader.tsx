import React from "react";

interface ServiceHeaderProps {
  title: string;
  summary: string;
  backgroundImageUrl: string;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  title,
  summary,
  backgroundImageUrl,
}) => {
  return (
    <div
      className="h-64 flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <div className="bg-opacity-75 bg-background px-8 py-6 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-boldn text-primary">{title}</h1>
        <p className="text-lg mt-4">{summary}</p>
      </div>
    </div>
  );
};

export default ServiceHeader;
