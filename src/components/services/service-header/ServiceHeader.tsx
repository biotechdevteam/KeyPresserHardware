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
    <div className="w-full flex flex-col items-center space-y-4 p-6">
      {/* Title and Summary */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary">{title}</h1>
        <p className="text-lg mt-2">{summary}</p>
      </div>

      {/* Image below the title and summary */}
      <img
        src={backgroundImageUrl}
        alt="Service Background"
        className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md"
      />
    </div>
  );
};

export default ServiceHeader;
