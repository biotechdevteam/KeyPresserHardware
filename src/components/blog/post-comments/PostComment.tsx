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
import { useBlog } from "@/lib/useBlog";
import useAuth from "@/lib/useAuth";
import { ReactionType } from "@/lib/utils/fetchUtils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface CommentsSectionProps {
  comments: Comment[];
  postId: string;
  currentUserId: string;
  onAddComment?: (newComment: NewComment) => void;
  setShowRegisterDialog: (visible: boolean) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  postId,
  currentUserId,
  onAddComment,
  setShowRegisterDialog,
}) => {
  const [newCommentText, setNewCommentText] = useState<string>("");
  const { handleReactToComment } = useBlog();
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false); // State to handle collapsible section

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

  const toggleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  const handleReact = async (
    commentId: string,
    userId: string,
    reactionType: ReactionType
  ) => {
    if (!isAuthenticated || !user || !user._id) {
      setShowRegisterDialog(true);
      return;
    }

    try {
      await handleReactToComment(commentId, userId, reactionType);
    } catch (err) {
      console.error("Failed to react:", err);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto mt-6">
      {/* Comments List */}
      <div>
        <CardHeader>
          <CardTitle className="text-xl">Comments</CardTitle>
        </CardHeader>
        <div className="p-6 grid gap-6">
          {comments.length > 0 ? (
            <>
              {/* First comment shown by default */}
              {comments.slice(0, 1).map((comment) => {
                // Calculate likes and dislikes for each comment
                const likes =
                  comment.reactions?.filter(
                    (reaction) => reaction.reactionType === "like"
                  ).length || 0;
                const dislikes =
                  comment.reactions?.filter(
                    (reaction) => reaction.reactionType === "dislike"
                  ).length || 0;

                const liked = comment.reactions?.some(
                  (reaction) =>
                    reaction.reactionType === "like" &&
                    reaction.userId._id === user?._id
                );
                const disliked = comment.reactions?.some(
                  (reaction) =>
                    reaction.reactionType === "dislike" &&
                    reaction.userId._id === user?._id
                );

                const handleReact = async (
                  commentId: string,
                  userId: string,
                  reactionType: ReactionType
                ) => {
                  if (!isAuthenticated || !user || !user._id) {
                    setShowRegisterDialog(true);
                    return;
                  }

                  try {
                    await handleReactToComment(commentId, userId, reactionType);
                  } catch (err) {
                    console.error("Failed to react:", err);
                  }
                };

                return (
                  <div
                    key={comment._id}
                    className="border p-4 rounded-lg shadow-md flex flex-col space-y-2"
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
                      </div>
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
                        <p className="mb-2">
                          {comment.commentText}
                        </p>
                      </div>
                    </div>

                    {/* Reactions Section for the comment */}
                    <ReactionsSection
                      initialLikes={likes}
                      commentId={comment._id}
                      initialDislikes={dislikes}
                      currentUserId={user?._id as string}
                      hasliked={liked}
                      hasdisliked={disliked}
                      handleReact={handleReact}
                    />
                  </div>
                );
              })}

              {/* Collapsible Section */}
              {comments.length > 1 && (
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                  <CollapsibleTrigger asChild>
                    <Button onClick={toggleCollapse} className="mt-4">
                      {isOpen ? "Hide Comments" : "View All Comments"}
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    {comments.slice(1).map((comment) => {
                      const likes =
                        comment.reactions?.filter(
                          (reaction) => reaction.reactionType === "like"
                        ).length || 0;
                      const dislikes =
                        comment.reactions?.filter(
                          (reaction) => reaction.reactionType === "dislike"
                        ).length || 0;

                      const liked = comment.reactions?.some(
                        (reaction) =>
                          reaction.reactionType === "like" &&
                          reaction.userId._id === user?._id
                      );
                      const disliked = comment.reactions?.some(
                        (reaction) =>
                          reaction.reactionType === "dislike" &&
                          reaction.userId._id === user?._id
                      );

                      return (
                        <div
                          key={comment._id}
                          className="border p-4 rounded-lg shadow-md flex flex-col space-y-2 mt-4"
                        >
                          <div className="flex items-start space-x-4">
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
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <p className="font-semibold">
                                  {comment.userId.first_name}{" "}
                                  {comment.userId.last_name}
                                </p>
                                <p className="text-xs text-muted">
                                  {formatDistanceToNow(
                                    new Date(comment.createdAt),
                                    { addSuffix: true }
                                  )}
                                </p>
                              </div>
                              <p className="mb-2">
                                {comment.commentText}
                              </p>
                            </div>
                          </div>

                          <ReactionsSection
                            initialLikes={likes}
                            commentId={comment._id}
                            initialDislikes={dislikes}
                            currentUserId={user?._id as string}
                            hasliked={liked}
                            hasdisliked={disliked}
                            handleReact={handleReact}
                          />
                        </div>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </>
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>

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
    </Card>
  );
};

export default CommentsSection;
