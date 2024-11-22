import React from "react";
import { Blog } from "@/types/blogSchema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Twitter,
  Facebook,
  Linkedin,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
} from "lucide-react"; // Importing Lucid icons
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component
import { Link } from "next-view-transitions";

interface PostCardProps {
  blog: Blog;
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ blog, onClick }) => {
  // Calculate total likes, dislikes, and comments
  const totalLikes =
    blog.reactions?.filter((reaction) => reaction.reactionType === "like")
      .length || 0;
  const totalDislikes =
    blog.reactions?.filter((reaction) => reaction.reactionType === "dislike")
      .length || 0;
  const totalComments = blog.comments?.length || 0;

  return (
    <Card className="flex flex-col sm:flex-row items-start p-4 hover:shadow-lg transition-shadow cursor-pointer">
      {/* Left Side: Image (full height on both mobile and desktop) */}
      <div className="lg:w-1/3 w-full h-full">
        <Image
          src={blog.featuredImageUrl || "https://via.placeholder.com/400x200"}
          alt={blog.title}
          width={400}
          height={400}
          className="rounded-lg mb-4 sm:mb-0 w-full h-full object-cover"
          style={{ height: "100%", maxHeight: "300px" }}
        />
      </div>

      {/* Right Side: Content */}
      <div className="sm:w-2/3 w-full sm:pl-4 flex flex-col justify-between">
        <div>
          <CardHeader className="flex flex-col items-start">
            <CardTitle className="text-xl font-semibold text-primary">
              {blog.title}
            </CardTitle>
            <CardDescription className="text-sm mt-2">
              {blog.summary}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted mt-4">
            <Link href={`/members/${blog.authorId._id}`} legacyBehavior>
              <a className="text-primary underline hover:text-secondary">
                By {blog.authorId.user_id.last_name}
              </a>
            </Link>
            {" | "}
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </CardContent>
        </div>

        {/* Add likes, dislikes, and comments badges */}
        <CardFooter className="mt-4 flex flex-col sm:flex-row w-full justify-between">
          <div className="flex space-x-4 mb-2 text-center">
            <Button variant="secondary" size="sm" onClick={onClick}>
              Read more
            </Button>
          </div>

          {/* Action Badges for Likes, Dislikes, and Comments */}
          <div className="flex space-x-2 text-sm mt-2">
            <Badge variant="outline">
              <ThumbsUp className="w-4 h-4 mr-1" />
              {totalLikes}
            </Badge>
            <Badge variant="outline">
              <ThumbsDown className="w-4 h-4 mr-1" />
              {totalDislikes}
            </Badge>
            <Badge variant="outline">
              <MessageCircle className="w-4 h-4 mr-1" />
              {totalComments}
            </Badge>
          </div>

          {/* Share badges separated from action badges */}
          <div className="flex space-x-2 text-sm mt-2 sm:mt-0">
            <Badge variant="outline">
              <a href="#" aria-label="Share on Twitter">
                <Twitter className="w-4 h-4 text-secondary" />
              </a>
            </Badge>
            <Badge variant="outline">
              <a href="#" aria-label="Share on Facebook">
                <Facebook className="w-4 h-4 text-secondary" />
              </a>
            </Badge>
            <Badge variant="outline">
              <a href="#" aria-label="Share on LinkedIn">
                <Linkedin className="w-4 h-4 text-secondary" />
              </a>
            </Badge>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostCard;
