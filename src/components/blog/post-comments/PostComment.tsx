import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns"; // For formatting dates
import { NewComment, Comment } from "@/types/blogSchema";
import ReactionsSection from "../post-reaction/PostReaction"; // Import the ReactionsSection

interface CommentsSectionProps {
  comments: Comment[];
  postId: string;
  currentUserId: string;
  onAddComment?: (newComment: NewComment) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  postId,
  currentUserId,
  onAddComment,
}) => {
  const [newCommentText, setNewCommentText] = useState<string>("");

  // Handle new comment submission
  const handleAddComment = () => {
    if (newCommentText.trim() === "") return;

    const newComment: NewComment = {
      postId,
      userId: currentUserId, // Assume current user's ID is available
      commentText: newCommentText.trim(),
    };

    if (onAddComment) {
      onAddComment(newComment); // Call the passed handler
    }

    setNewCommentText(""); // Clear input after adding comment
  };

  return (
    <section className="mt-8">
      {/* Comments List */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">Comments</CardTitle>
        </CardHeader>
        <div className="p-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {comments.length > 0 ? (
            comments.map((comment) => {
              // Calculate likes and dislikes for each comment
              const likes =
                comment.reactions?.filter(
                  (reaction) => reaction.reactionType === "like"
                ).length || 0;
              const dislikes =
                comment.reactions?.filter(
                  (reaction) => reaction.reactionType === "dislike"
                ).length || 0;

              return (
                <div
                  key={comment._id}
                  className="border p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div>
                      <Avatar>
                        <AvatarImage
                          src={comment.userId.profile_photo_url}
                          alt={comment.userId.last_name}
                        />
                        <AvatarFallback>
                          {comment.userId.first_name.charAt(0)}
                          {comment.userId.last_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        {/* Author Name and Date */}
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-semibold">
                            {comment.userId.first_name}{" "}
                            {comment.userId.last_name}
                          </p>
                          <p className="text-xs text-muted">
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>

                        {/* Comment Text */}
                        <p className="text-gray-700 mb-2">
                          {comment.commentText}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Reactions Section for the comment */}
                  <ReactionsSection
                    initialLikes={likes}
                    initialDislikes={dislikes}
                  />
                </div>
              );
            })
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </Card>

      {/* Add New Comment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Leave a Comment</CardTitle>
          <CardDescription className="text-sm">
            Your feedback is valuable to us
          </CardDescription>
        </CardHeader>
        <div className="p-6">
          <Textarea
            placeholder="Write your comment here..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleAddComment} disabled={!newCommentText.trim()}>
            Post Comment
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default CommentsSection;
