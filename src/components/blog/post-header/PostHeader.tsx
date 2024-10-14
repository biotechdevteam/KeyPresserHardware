import React from "react";
import Image from "next/image";

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
    <header className="max-w-4xl mx-auto mt-6 shadow-lg p-6 rounded-xl text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-4 text-lg">{summary}</p>
      <div className="relative mt-4" style={{ height: "300px" }}>
        <Image
          src={backgroundImageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </header>
  );
};

export default PostHeader;
