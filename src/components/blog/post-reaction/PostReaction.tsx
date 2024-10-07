import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"; // Using icons for reactions

interface ReactionsSectionProps {
  initialLikes: number;
  initialDislikes: number;
  commentsCount?: number;
}

const ReactionsSection: React.FC<ReactionsSectionProps> = ({
  initialLikes,
  initialDislikes,
  commentsCount,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // Handle Like action
  const handleLike = () => {
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
  };

  // Handle Dislike action
  const handleDislike = () => {
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
  };

  return (
    <div className="flex items-center space-x-4 mt-6">
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
      {commentsCount && (
        <Button variant="ghost" className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5" />
          <span>{commentsCount} Comments</span>
        </Button>
      )}
    </div>
  );
};

export default ReactionsSection;
