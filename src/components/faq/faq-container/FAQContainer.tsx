"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchFAQs } from "@/lib/fetchUtils";
import FAQList from "../faq-list/FAQList";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Import shadcn card components
import { Button } from "@/components/ui/button";

const FAQContainer: React.FC<{ initialData: any; general?: boolean }> = ({
  initialData,
  general,
}) => {
  const {
    data: faqData,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFAQs,
    initialData, // Use pre-fetched data as initial value
    staleTime: Infinity, // Prevent unnecessary refetching
  });

  if (loading && !faqData) {
    return <div className="text-center inset-0">Loading FAQs...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center inset-0">
        Error: {error.message}
      </div>
    );
  }

  // Group FAQs by their category
  const groupedFAQs = faqData?.reduce((acc: any, faq: any) => {
    const { category } = faq;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});

  return (
    <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-content-center items-center">
      {/* Render each category and the corresponding FAQs in a card */}
      <div className="max-w-3xl min-w-3xl space-y-8">
        {groupedFAQs &&
          (general
            ? // If general prop is true, display only FAQs from the general category
              groupedFAQs["General"] && (
                <div key="general">
                  <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                    Frequently Asked Questions
                  </h2>
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl text-center text-secondary font-semibold">
                      General FAQs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FAQList faqs={groupedFAQs["General"]} />
                  </CardContent>
                  {/* CTA Button - Contact Us */}
                  <CardFooter className="flex justify-center mt-12">
                    <Button
                      variant={"secondary"}
                      onClick={() => (window.location.href = "/contact")}
                    >
                      Contact Us if you have more questions
                    </Button>
                  </CardFooter>
                </div>
              )
            : // Otherwise, display all categories
              Object.keys(groupedFAQs).map((category) => (
                <Card key={category} className="border rounded-lg shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl text-center font-bold">
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FAQList faqs={groupedFAQs[category]} />
                  </CardContent>
                </Card>
              )))}
      </div>
    </div>
  );
};

export default FAQContainer;
