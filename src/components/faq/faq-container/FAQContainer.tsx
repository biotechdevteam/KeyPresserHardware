"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchFAQs } from "@/lib/utils/fetchUtils";
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
import Loader from "@/components/loader/Loader";

const FAQContainer: React.FC<{
  initialData: any;
  general?: boolean;
  membership?: boolean;
}> = ({ initialData, general = false, membership = false }) => {
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
    return (
      <div className="text-center inset-0">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive text-center inset-0">
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
    <div className="py-12">
      <div className="space-y-8 px-4 mx-auto">
        {groupedFAQs &&
          (general
            ? // If general prop is true, display only FAQs from the general category
              groupedFAQs["General"] && (
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
                    {/* CTA Button - Contact Us */}
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
            : // If membership prop is true, display only FAQs from the membership category
            membership
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
                    {/* CTA Button - Contact Us */}
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
            : // Otherwise, display all categories
              Object.keys(groupedFAQs).map((category) => (
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
