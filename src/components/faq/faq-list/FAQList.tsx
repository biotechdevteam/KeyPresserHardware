import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQList: React.FC<{ faqs: any[] }> = ({ faqs }) => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {faqs?.map((faq) => (
        <AccordionItem key={faq._id} value={`faq-${faq._id}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQList;
