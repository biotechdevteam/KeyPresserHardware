"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Quote,
  CornerDownRight,
  Star,
  ClipboardCheck,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface TestimonialCardProps {
  name: string;
  role: string;
  serviceName?: string;
  imageUrl: string;
  comment: string;
  rating: number;
  date?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  serviceName,
  imageUrl,
  comment,
  rating,
  date,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(comment);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to handle empty or default names
  const displayName = name.trim() ? name : "Anonymous";

  // Truncate long comments
  const MAX_CHARS = 150;
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongComment = comment.length > MAX_CHARS;
  const displayComment = isExpanded ? comment : comment.slice(0, MAX_CHARS);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-card dark:bg-slate-800/80 rounded-lg shadow-md border border-border overflow-hidden"
    >
      {/* Header with rating */}
      <div className="bg-primary/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
            <Image
              src={imageUrl}
              alt={displayName}
              fill
              sizes="48px"
              className="object-cover"
              onError={(e) => {
                // Fallback for broken images
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
              }}
            />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{displayName}</h3>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>

        <div className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Service name if provided */}
      {serviceName && (
        <div className="px-4 py-2 bg-accent/10">
          <p className="text-xs text-muted-foreground flex items-center">
            <CornerDownRight className="w-3 h-3 mr-1" />
            Review for <span className="font-medium ml-1">{serviceName}</span>
          </p>
        </div>
      )}

      {/* Comment body */}
      <div className="flex-grow flex flex-col p-5 relative">
        <Quote className="text-primary/20 absolute top-3 left-3" size={24} />

        <div className="ml-6 mt-2">
          <p className="text-foreground">
            {displayComment}
            {isLongComment && !isExpanded && "..."}
          </p>

          {isLongComment && (
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto text-primary mt-2"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show less" : "Read more"}
            </Button>
          )}
        </div>

        {/* Date if available */}
        {date && (
          <div className="flex items-center text-xs text-muted-foreground mt-4">
            <Calendar className="w-3 h-3 mr-1" />
            {format(new Date(date), "MMM d, yyyy")}
          </div>
        )}
      </div>

      {/* Footer with copy button */}
      <div className="p-3 bg-muted/30 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
          onClick={copyToClipboard}
        >
          {copied ? (
            <>
              <ClipboardCheck className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Quote className="w-3 h-3" />
              Copy
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
