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
    <div className="bg-card p-6 rounded-[0%_30%_0_30%] border border-primary text-center shadow-lg relative overflow-hidden">
      {/* Quotation Mark Icon */}
      <Quote
        className="absolute top-4 left-1/2 text-primary font-bold transform -translate-x-1/2"
        width={50}
        height={50}
      />

      {/* Comment */}
      <p className="italic font-medium mt-12 mb-4">"{comment}"</p>

      {/* Rating */}
      <div className="flex justify-center mt-2 mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={`text-xl ${
              index < rating ? "text-secondary" : "text-muted"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Profile Image */}
      <div className="relative mb-4 w-20 h-20 mx-auto">
        <div className="absolute inset-0 border-2 border-primary rounded-[0%_30%_0_30%]"></div>
        <Image
          src={imageUrl}
          alt={name}
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-[0%_30%_0_30%]"
        />
      </div>

      {/* Name */}
      <h3 className="text-xl font-semibold text-primary">{name}</h3>

      {/* Role */}
      <p className="text-sm text-secondary">{role}</p>
    </div>
  );
};

export default TestimonialCard;
