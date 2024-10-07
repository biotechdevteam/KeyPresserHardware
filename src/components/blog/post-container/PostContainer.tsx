import React, { useState } from "react";
import { Blog, NewComment } from "@/types/blogSchema";
import PostTitleAndMetadata from "../post-meta/PostMeta";
import PostContent from "../post-content/PostContent";
import AuthorInformation from "../post-author/PostAuthor";
import ReactionsSection from "../post-reaction/PostReaction";
import CommentsSection from "../post-comments/PostComment";
import RelatedPosts from "../related-post/RelatedPost";
import ShareButtons from "../share-post/SharePost";
import PostHeader from "../post-header/PostHeader";

interface PostContainerProps {
  post: Blog;
  relatedPosts: Blog[];
}

const PostContainer: React.FC<PostContainerProps> = ({
  post,
  relatedPosts,
}) => {
  const [comments, setComments] = useState(post.comments || []);

  // Calculate likes, dislikes, and comments count
  const likes =
    post.reactions?.filter((reaction) => reaction.reactionType === "like")
      .length || 0;
  const dislikes =
    post.reactions?.filter((reaction) => reaction.reactionType === "dislike")
      .length || 0;
  const commentsCount = post.comments?.length || 0;

  // Handler for adding a new comment
  const handleAddComment = (newComment: NewComment) => {
    // Add the new comment to the state
  };
  return (
    <article>
      {/* Render the PostHeader component */}
      <PostHeader
        title={post.title}
        summary={post.summary}
        backgroundImageUrl={post.featuredImageUrl || ""}
      />
      <PostTitleAndMetadata post={post} />
      <PostContent content={post.content} />
      <AuthorInformation author={post.authorId} />
      <ReactionsSection
        initialLikes={likes}
        initialDislikes={dislikes}
        commentsCount={commentsCount}
      />
      <CommentsSection
        comments={post.comments || []}
        postId={post._id}
        currentUserId={post.authorId.user_id._id || ""}
        onAddComment={handleAddComment}
      />
      
      <RelatedPosts relatedPosts={relatedPosts} />
      <ShareButtons title={post.title} url={window.location.href} />
      </article>
  );
};

export default PostContainer;
