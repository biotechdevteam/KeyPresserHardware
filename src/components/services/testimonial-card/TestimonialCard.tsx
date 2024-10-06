import React from "react";
import Image from "next/image";

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
    <div className="bg-card p-6 rounded-lg text-center">
      {/* Profile Image */}
      <div className="mb-4">
        <Image
          src={imageUrl}
          alt={name}
          width={80}
          height={80}
          className="rounded-full mx-auto"
        />
      </div>

      {/* Name and Role */}
      <h3 className="text-lg font-semibold text-foreground">{name}</h3>
      <p className="text-muted">{role}</p>

      {/* Rating */}
      <div className="flex justify-center mt-2 mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={`text-xl ${
              index < rating ? "text-primary" : "text-muted"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Comment */}
      <p className="text-muted italic">"{comment}"</p>
    </div>
  );
};

export default TestimonialCard;
