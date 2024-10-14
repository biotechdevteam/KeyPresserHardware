import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Card } from "@/components/ui/card"; // Assuming you are using Shadcn's card component for layout

interface PostContentProps {
  content: string;
  onHeadingsExtracted: (headings: { id: string; label: string }[]) => void;
}

const PostContent: React.FC<PostContentProps> = ({
  content,
  onHeadingsExtracted,
}) => {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    // Sanitize the content using DOMPurify before injecting it into the DOM
    const sanitizedHTML = DOMPurify.sanitize(content);
    setSanitizedContent(sanitizedHTML);

    // Create a temporary DOM element to extract headings from the HTML
    const tempElement = document.createElement("div");
    tempElement.innerHTML = sanitizedHTML;

    const headings: { id: string; label: string }[] = [];

    // Extract headings (h1, h2, h3, etc.)
    const headingTags = tempElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headingTags.forEach((heading, index) => {
      // Generate a unique ID if the heading doesn't have one
      let id = heading.getAttribute("id");
      if (!id) {
        id = `heading-${index}`;
        heading.setAttribute("id", id); // This should add the ID to the heading
      }

      // Push the heading info to the headings array
      headings.push({
        id,
        label: heading.textContent || `Heading ${index + 1}`,
      });
    });

    // Pass extracted headings to the parent component (PostContainer)
    onHeadingsExtracted(headings);
  }, [content, onHeadingsExtracted]);

  return (
    <Card className="max-w-4xl mx-auto mt-6 p-6">
      <section className="blog-content">
        {/* Render the sanitized HTML */}
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </section>
    </Card>
  );
};

export default PostContent;
