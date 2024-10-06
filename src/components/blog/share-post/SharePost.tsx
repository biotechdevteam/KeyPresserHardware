import React from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react"; // Icons for social platforms

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  // Social media share URLs
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const mailUrl = `mailto:?subject=${encodedTitle}&body=Check out this post: ${encodedUrl}`;

  return (
    <div className="flex space-x-4 mt-6">
      {/* Facebook Button */}
      <Button variant="outline">
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <Facebook className="w-5 h-5" />
          <span>Share on Facebook</span>
        </a>
      </Button>

      {/* Twitter Button */}
      <Button variant="outline">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <Twitter className="w-5 h-5" />
          <span>Share on Twitter</span>
        </a>
      </Button>

      {/* LinkedIn Button */}
      <Button variant="outline">
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <Linkedin className="w-5 h-5" />
          <span>Share on LinkedIn</span>
        </a>
      </Button>

      {/* Email Button */}
      <Button variant="outline">
        <a
          href={mailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <Mail className="w-5 h-5" />
          <span>Share via Email</span>
        </a>
      </Button>
    </div>
  );
};

export default ShareButtons;
