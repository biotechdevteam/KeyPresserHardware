import React from "react";
import ContactForm from "./form";

const ContactSection: React.FC = () => {
  return (
    <div className="container py-12 mx-auto">
      <h2 className="text-2xl text-center mb-4 font-bold">Get in Touch</h2>
      <p className="text-center text-base mb-8 px-4 lg:mx-64">
        Have any questions or need assistance? Reach out to us, and we'll get
        back to you as soon as possible.
      </p>
      <div className="mx-auto max-w-4xl">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactSection;
