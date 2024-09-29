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
        <AccordionItem
          key={faq._id}
          value={`faq-${faq._id}`}
          className="border rounded-md"
        >
          <AccordionTrigger className="text-lg md:text-xl font-semibold bg-transparent hover:bg-gray-100 focus:bg-gray-200 transition-all">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-gray-50">
            <p className="text-base md:text-lg">{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQList;
