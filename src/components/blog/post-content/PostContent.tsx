import React from "react";
import DOMPurify from "dompurify";
import { Card } from "@/components/ui/card"; // Using Shadcn's card component for content layout

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  // Sanitize the content using DOMPurify before injecting it into the DOM
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <Card className="max-w-4xl mx-auto mt-6 shadow-lg border border-border p-6">
      <section className="blog-content">
        {/* Render the sanitized HTML */}
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </section>
    </Card>
  );
};

export default PostContent;
