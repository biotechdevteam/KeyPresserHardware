import React from "react";
import { Blog } from "@/types/blogSchema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import PostCard from "../post-card/PostCard";

interface RelatedPostsProps {
  relatedPosts: Blog[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ relatedPosts }) => {
  return (
    <section className="max-w-4xl mx-auto mt-6 shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <PostCard
            key={post._id}
            blog={post}
            onClick={() => {
              // Navigate to the full post when clicked
              window.location.href = `/post/${post._id}`;
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
