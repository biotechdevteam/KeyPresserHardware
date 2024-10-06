import React from "react";

interface PostHeaderProps {
  title: string;
  summary: string;
  backgroundImageUrl: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  summary,
  backgroundImageUrl,
}) => {
  return (
    <header
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-4 text-lg">{summary}</p>
      </div>
    </header>
  );
};

export default PostHeader;
