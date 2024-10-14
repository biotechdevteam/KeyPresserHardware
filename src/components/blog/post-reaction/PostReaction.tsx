import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ReactionType } from "@/lib/fetchUtils";

interface ReactionsSectionProps {
  postId: string; // Add postId to pass it to the reaction handler
  currentUserId: string; // Add currentUserId to verify the user
  initialLikes: number;
  hasliked?: boolean;
  hasdisliked?: boolean;
  initialDislikes: number;
  commentsCount?: number;
  handleReact: (
    postId: string,
    userId: string,
    reactionType: ReactionType
  ) => void; // Reaction handler
}

const ReactionsSection: React.FC<ReactionsSectionProps> = ({
  postId,
  currentUserId,
  initialLikes,
  hasdisliked,
  hasliked,
  initialDislikes,
  commentsCount,
  handleReact,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [liked, setLiked] = useState(hasliked);
  const [disliked, setDisliked] = useState(hasdisliked);

  // Handle Like action
  const handleLike = () => {
    if (!currentUserId) return; // Ensure user is logged in
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
      if (disliked) {
        setDisliked(false);
        setDislikes(dislikes - 1); // Remove dislike if it's active
      }
    }
    setLiked(!liked);
    handleReact(postId, currentUserId, ReactionType.Like);
  };

  // Handle Dislike action
  const handleDislike = () => {
    if (!currentUserId) return; // Ensure user is logged in
    if (disliked) {
      setDislikes(dislikes - 1);
    } else {
      setDislikes(dislikes + 1);
      if (liked) {
        setLiked(false);
        setLikes(likes - 1); // Remove like if it's active
      }
    }
    setDisliked(!disliked);
    handleReact(postId, currentUserId, ReactionType.Dislike);
  };

  return (
    <Card className="max-w-4xl mx-auto mt-6 p-3 flex">
      {/* Like Button */}
      <Button
        variant={liked ? "default" : "outline"}
        className={`flex items-center space-x-2 ${
          hasliked || liked ? "bg-primary text-primary-foreground" : ""
        }`}
        onClick={handleLike}
      >
        <ThumbsUp className="w-5 h-5" />
        <span>{likes}</span>
      </Button>

      {/* Dislike Button */}
      <Button
        variant={disliked ? "default" : "outline"}
        className={`flex items-center space-x-2 ${
          hasdisliked || disliked ? "bg-destructive text-destructive-foreground" : ""
        }`}
        onClick={handleDislike}
      >
        <ThumbsDown className="w-5 h-5" />
        <span>{dislikes}</span>
      </Button>

      {/* Comments Button */}
      {commentsCount && (
        <Button variant="ghost" className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5" />
          <span>{commentsCount} Comments</span>
        </Button>
      )}
    </Card>
  );
};

export default ReactionsSection;
