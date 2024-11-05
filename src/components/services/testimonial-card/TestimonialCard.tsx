import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  imageUrl: string;
  comment: string;
  rating: number; // Out of 5 stars
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  imageUrl,
  comment,
  rating,
}) => {
  return (
    <div className="relative bg-card p-6 rounded-[0%_30%_0_30%] border border-primary text-center shadow-lg overflow-hidden">
      {/* Quotation Mark Icon */}
      <Quote
        className="absolute top-4 left-1/2 text-primary font-bold transform -translate-x-1/2"
        width={50}
        height={50}
      />

      {/* Comment */}
      <p className="italic font-medium mt-12 text-sm">"{comment}"</p>

      {/* Rating */}
      <div className="flex justify-center mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={`text-xl ${
              index < rating ? "text-accent" : "text-muted"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Profile Image */}
      <div className="relative mb-4">
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="object-cover rounded-full mx-auto"
        />
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold">{name}</h3>

      {/* Role */}
      <p className="text-xs">{role}</p>
    </div>
  );
};

export default TestimonialCard;
