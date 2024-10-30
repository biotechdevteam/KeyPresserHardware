import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ReactionType } from "@/lib/utils/fetchUtils";

interface ReactionsSectionProps {
  postId?: string; // Optional postId
  commentId?: string; // Optional commentId
  currentUserId: string; // Add currentUserId to verify the user
  initialLikes: number;
  hasliked?: boolean;
  hasdisliked?: boolean;
  initialDislikes: number;
  commentsCount?: number;
  handleReact: (
    postIdOrCommentId: string,
    userId: string,
    reactionType: ReactionType
  ) => void; // Reaction handler
}

const ReactionsSection: React.FC<ReactionsSectionProps> = ({
  postId,
  commentId,
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

  // Ensure that at least one of postId or commentId is provided
  const reactId = postId || commentId;
  if (!reactId) {
    console.error("Either postId or commentId must be provided.");
    return null;
  }

  // Handle Like action with optimistic update
  const handleLike = async () => {
    if (!currentUserId) return;

    // Optimistic update
    const newLikes = liked ? likes - 1 : likes + 1;
    const newDislikes = disliked ? dislikes - 1 : dislikes;
    setLikes(newLikes);
    setDislikes(newDislikes);
    setLiked(!liked);
    if (disliked) setDisliked(false);

    try {
      await handleReact(reactId, currentUserId, ReactionType.Like);
    } catch (err) {
      // Revert optimistic update on failure
      setLikes(likes);
      setDislikes(dislikes);
      setLiked(liked);
      setDisliked(disliked);
      console.error("Failed to like the post/comment", err);
    }
  };

  // Handle Dislike action with optimistic update
  const handleDislike = async () => {
    if (!currentUserId) return;

    // Optimistic update
    const newDislikes = disliked ? dislikes - 1 : dislikes + 1;
    const newLikes = liked ? likes - 1 : likes; // Remove like if it was liked before
    setDislikes(newDislikes);
    setLikes(newLikes);
    setDisliked(!disliked);
    if (liked) setLiked(false); // Remove like if disliked

    try {
      await handleReact(reactId, currentUserId, ReactionType.Dislike);
    } catch (err) {
      // Revert optimistic update on failure
      setDislikes(dislikes);
      setLikes(likes);
      setDisliked(disliked);
      setLiked(liked);
      console.error("Failed to dislike the post/comment", err);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto mt-6 p-3 flex">
      {/* Like Button */}
      <Button
        variant={liked ? "default" : "outline"}
        className={`flex items-center space-x-2 ${
          liked ? "bg-primary text-primary-foreground" : ""
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
          disliked ? "bg-destructive text-destructive-foreground" : ""
        }`}
        onClick={handleDislike}
      >
        <ThumbsDown className="w-5 h-5" />
        <span>{dislikes}</span>
      </Button>

      {/* Comments Button */}
      {commentsCount !== undefined && (
        <Button variant="ghost" className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5" />
          <span>{commentsCount} Comments</span>
        </Button>
      )}
    </Card>
  );
};

export default ReactionsSection;
