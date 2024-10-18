import React from "react";
import ContactForm from "./form";

const ContactSection: React.FC = () => {
  return (
    <div className="container py-12">
      <h2 className="text-2xl text-center mb-8">Get in Touch</h2>
      <div className="mx-auto">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactSection;
