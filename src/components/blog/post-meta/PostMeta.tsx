import React from "react";
import { Blog } from "@/types/blogSchema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Function to calculate reading time based on content length
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200; // Average reading speed
  const words = content.trim().split(/\s+/).length; // Count words
  const readingTime = Math.ceil(words / wordsPerMinute); // Calculate reading time
  return readingTime;
};

// Function to generate tags from title and author name
const generateTags = (title: string, authorName: string): string[] => {
  const titleWords = title.split(" ").map((word) => word.toLowerCase());
  return [...new Set([...titleWords, authorName.toLowerCase()])]; // Remove duplicates
};

interface PostTitleAndMetadataProps {
  post: Blog;
}

const PostTitleAndMetadata: React.FC<PostTitleAndMetadataProps> = ({
  post,
}) => {
  const readingTime = calculateReadingTime(post.content);
  const tags = generateTags(post.title, post.authorId.user_id.first_name);

  return (
    <Card className="max-w-4xl mx-auto mt-6">
      <CardHeader>
        {/* Title Section */}
        <CardTitle className="text-3xl font-bold mb-2">{post.title}</CardTitle>

        {/* Author and Metadata */}
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage
              src={post.authorId.user_id.profile_photo_url}
              alt={post.authorId.user_id.first_name}
            />
            <AvatarFallback>
              {post.authorId.user_id.first_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted">
              By{" "}
              <span className="font-medium">
                {post.authorId.user_id.first_name}
              </span>
            </p>
            <p className="text-xs">
              {new Date(post.createdAt).toLocaleDateString()} • {readingTime}{" "}
              min read
            </p>
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} className="bg-gray-100 text-gray-600">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
};

export default PostTitleAndMetadata;
