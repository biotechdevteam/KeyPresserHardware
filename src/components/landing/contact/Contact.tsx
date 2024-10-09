import React, { useRef, useEffect, useState } from "react";
import ContactForm from "./form";

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        root: null, // Observe relative to the viewport
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    const section = sectionRef.current;

    if (section) {
      observer.observe(section);
    }

    // Cleanup observer on component unmount
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`bg-background text-foreground ${
        isVisible ? "animate-spinCard" : ""
      } transition-all duration-700`}
    >
      <div className="container mx-auto py-12">
        {/* Section Header */}
        <h2 className="text-4xl font-bold text-center mb-8 text-primary">
          Get in Touch
        </h2>

        {/* Contact Form */}
        <div className="mx-5">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
