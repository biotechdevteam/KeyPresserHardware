"use client";
import React from "react";
import FAQList from "../faq-list/FAQList";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FAQ, FAQs } from "@/types/FAQSchema";

interface FAQContainerProps {
  faqData: FAQs;
  general?: boolean;
  membership?: boolean;
}

const FAQContainer: React.FC<FAQContainerProps> = ({
  faqData,
  general = false,
  membership = false,
}) => {

  // Initialize FAQs with a default value
  let faqs = faqData;

  // Filter FAQs based on category
  if (general) {
    faqs = faqData.filter((faq: FAQ) => faq.category === "General");
  } else if (membership) {
    faqs = faqData.filter((faq: FAQ) => faq.category === "Membership");
  }

  // Group FAQs by their category
  const groupedFAQs = faqs.reduce((acc: Record<string, FAQ[]>, faq: FAQ) => {
    const { category } = faq;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});

  return (
    <div className="py-12">
      <div className="space-y-8 px-4 mx-auto">
        {groupedFAQs &&
          (general
            ? groupedFAQs["General"] && (
                <div key="general">
                  <h2 className="text-xl lg:text-2xl font-bold text-center">
                    Frequently Asked Questions
                  </h2>
                  <Separator className="w-24 mx-auto mb-4" />
                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle className="text-xl text-center">
                        General FAQs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="lg:px-64">
                      <FAQList faqs={groupedFAQs["General"]} />
                    </CardContent>
                    <CardFooter className="flex justify-center mt-12">
                      <Button
                        className="animate-beep"
                        onClick={() => (window.location.href = "/contact")}
                      >
                        Contact Us For More Questions
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )
            : membership
            ? groupedFAQs["Membership"] && (
                <div key="membership">
                  <h2 className="text-xl lg:text-2xl font-bold text-center">
                    Frequently Asked Questions
                  </h2>
                  <Separator className="w-24 mx-auto mb-4" />
                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle className="text-xl text-center">
                        Membership FAQs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="lg:px-64">
                      <FAQList faqs={groupedFAQs["Membership"]} />
                    </CardContent>
                    <CardFooter className="flex justify-center mt-12">
                      <Button
                        className="animate-beep"
                        onClick={() => (window.location.href = "/contact")}
                      >
                        Contact Us For More Questions
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )
            : Object.keys(groupedFAQs).map((category) => (
                <Card key={category} className="border-none shadow-none">
                  <CardHeader>
                    <CardTitle className="text-xl text-center">
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="lg:px-64">
                    <FAQList faqs={groupedFAQs[category]} />
                  </CardContent>
                </Card>
              )))}
      </div>
    </div>
  );
};

export default FAQContainer;
