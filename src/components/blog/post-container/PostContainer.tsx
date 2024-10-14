import React, { useMemo, useState } from "react";
import { Blog, NewComment } from "@/types/blogSchema";
import PostTitleAndMetadata from "../post-meta/PostMeta";
import PostContent from "../post-content/PostContent";
import AuthorInformation from "../post-author/PostAuthor";
import ReactionsSection from "../post-reaction/PostReaction";
import CommentsSection from "../post-comments/PostComment";
import RelatedPosts from "../related-post/RelatedPost";
import ShareButtons from "../share-post/SharePost";
import PostHeader from "../post-header/PostHeader";
import TableOfContents from "../post-table-contents/TableOfContents";
import Contents from "../post-table-contents/Contents";
import FollowUs from "@/components/speed-dial/FollowUs";
import SubscribeDialog from "@/components/speed-dial/SubscribeDialogue";
import RegisterDialog from "@/components/register-dialog/RegisterDialog";
import { useBlog } from "@/lib/useBlog";
import { useAuth } from "@/lib/useAuth";
import { ReactionType } from "@/lib/fetchUtils";

interface PostContainerProps {
  post: Blog;
  relatedPosts: Blog[];
}

const PostContainer: React.FC<PostContainerProps> = ({
  post,
  relatedPosts,
}) => {
  const [comments, setComments] = useState(post.comments || []);
  const [contentHeadings, setContentHeadings] = useState<
    { id: string; label: string }[]
  >([]);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false); // To control the registration dialog visibility

  const { loading, error, handleCreateComment, handleReactToBlogPost } =
    useBlog();
  const { user, isAuthenticated } = useAuth();

  // Function to be called after registration is completed
  const handleRegistrationComplete = () => {
    setShowRegisterDialog(false);
  };

  // Calculate likes, dislikes, and comments count
  const likes = useMemo(
    () => post.reactions?.filter((r) => r.reactionType === "like").length || 0,
    [post.reactions]
  );
  const dislikes = useMemo(
    () =>
      post.reactions?.filter((r) => r.reactionType === "dislike").length || 0,
    [post.reactions]
  );

  const commentsCount = post.comments?.length || 0;

  // Determine if the current user has liked or disliked the post
  const liked = post.reactions?.some(
    (reaction) =>
      reaction.reactionType === "like" && reaction.userId._id === user?._id
  );
  const disliked = post.reactions?.some(
    (reaction) =>
      reaction.reactionType === "dislike" && reaction.userId._id === user?._id
  );

  // Handler for adding a new comment
  const handleAddComment = async (newComment: NewComment) => {
    if (!user || !user._id) {
      setShowRegisterDialog(true);
      return;
    }

    try {
      const success = await handleCreateComment(
        newComment.postId,
        newComment.userId,
        newComment.commentText
      );
      if (success) {
        const completeComment = {
          _id: Math.random().toString(36).substring(7), // Generate a temporary ID
          postId: newComment.postId,
          userId: {
            _id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            user_type: user.user_type,
            profile_photo_url: user.profile_photo_url || "",
          },
          commentText: newComment.commentText,
          createdAt: new Date(),
          updatedAt: new Date(),
          reactions: [], // Initialize reactions if necessary
        };
        setComments((prevComments) => [...prevComments, completeComment]);
      }
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  // Handler for reacting to a post
  const handleReact = async (
    postId: string,
    userId: string,
    reactionType: ReactionType
  ) => {
    if (!isAuthenticated || !user || !user._id) {
      setShowRegisterDialog(true);
      return;
    }

    try {
      await handleReactToBlogPost(postId, userId, reactionType);
    } catch (err) {
      console.error("Failed to react:", err);
    }
  };

  // Define sections for the table of contents
  const tocSections = [
    { id: "post-header", label: "Post Header" },
    { id: "table-of-contents", label: "Table Of Contents" },
    { id: "post-meta", label: "Post Metadata" },
    {
      id: "post-content",
      label: "Post Content",
      subSections: contentHeadings,
    },
    { id: "post-author", label: "Author Information" },
    { id: "post-reactions", label: "Reactions" },
    { id: "post-comments", label: "Comments" },
    { id: "related-posts", label: "Related Posts" },
    { id: "share-buttons", label: "Share" },
  ];

  const handleHeadingsExtracted = React.useCallback(
    (headings: { id: string; label: string }[]) => {
      setContentHeadings(headings);
    },
    []
  );

  return (
    <article className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Desktop view: Table of Contents in a separate column */}
      <aside className="hidden lg:block lg:col-span-1">
        <TableOfContents sections={tocSections} />
      </aside>

      {/* Main content: span 3 columns in desktop, full width in mobile */}
      <div className="lg:col-span-3">
        {/* Render the PostHeader component */}
        <section id="post-header">
          <PostHeader
            title={post.title}
            summary={post.summary}
            backgroundImageUrl={post.featuredImageUrl || ""}
          />
        </section>

        {/* Mobile Table of Contents */}
        <section id="table-of-contents">
          <div className="block max-w-4xl mx-auto shadow-xl rounded-xl">
            <Contents sections={tocSections} />
          </div>
        </section>

        {/* Render Post Metadata */}
        <section id="post-meta">
          <PostTitleAndMetadata post={post} />
        </section>

        {/* Render Post Content and extract headings */}
        <section id="post-content">
          <PostContent
            content={post.content}
            onHeadingsExtracted={handleHeadingsExtracted}
          />
        </section>

        {/* Render Author Information */}
        <section id="post-author">
          <AuthorInformation author={post.authorId} />
        </section>

        {/* Render Reactions Section */}
        <section id="post-reactions">
          <ReactionsSection
            postId={post._id}
            currentUserId={user?._id || ""}
            initialLikes={likes}
            initialDislikes={dislikes}
            commentsCount={commentsCount}
            handleReact={handleReact}
            hasliked={liked}
            hasdisliked={disliked}
          />
        </section>

        {/* Render Comments Section */}
        <section id="post-comments">
          <CommentsSection
            comments={comments.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )}
            postId={post._id}
            currentUserId={user?._id || ""}
            onAddComment={handleAddComment}
            setShowRegisterDialog={setShowRegisterDialog}
          />
        </section>

        {/* Render Related Posts */}
        <section id="related-posts">
          <RelatedPosts relatedPosts={relatedPosts} />
        </section>

        {/* Render Share Buttons */}
        <section id="share-buttons">
          <ShareButtons title={post.title} url={window.location.href} />
        </section>

        {/* Subscribe Section */}
        <section id="subscribe">
          <SubscribeDialog />
        </section>

        {/* Render Share Buttons */}
        <section id="follow-us" className="max-w-4xl mx-auto mt-6">
          <FollowUs />
        </section>
      </div>

      {showRegisterDialog && (
        <RegisterDialog
          onComplete={handleRegistrationComplete}
          onCancel={() => setShowRegisterDialog(false)}
        />
      )}
    </article>
  );
};

export default PostContainer;
