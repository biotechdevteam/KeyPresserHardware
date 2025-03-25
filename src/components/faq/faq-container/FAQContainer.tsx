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
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/utils/pageTransitions";

interface FAQContainerProps {
  faqData: FAQs;
  general?: boolean;
  membership?: boolean;
}

interface CategoryIconMap {
  [key: string]: React.ReactNode;
}

const FAQContainer: React.FC<FAQContainerProps> = ({
  faqData,
  general = false,
  membership = false,
}) => {
  const router = useTransitionRouter();
  // Filter FAQs based on category props
  const filteredFAQs = React.useMemo(() => {
    if (general) {
      return faqData.filter((faq: FAQ) => faq.category === "General");
    } else if (membership) {
      return faqData.filter((faq: FAQ) => faq.category === "Membership");
    }
    return faqData;
  }, [faqData, general, membership]);

  // Group FAQs by their category
  const groupedFAQs = React.useMemo(() => {
    return filteredFAQs.reduce((acc: Record<string, FAQ[]>, faq: FAQ) => {
      const { category } = faq;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(faq);
      return acc;
    }, {});
  }, [filteredFAQs]);

  // Category icons mapping
  const categoryIcons: CategoryIconMap = {
    General: <HelpCircle className="w-5 h-5 text-indigo-500" />,
    Membership: <MessageCircle className="w-5 h-5 text-purple-500" />,
    // Add more category icons as needed
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const renderSingleCategory = (category: string, faqs: FAQ[]) => (
    <motion.div key={category} variants={itemVariants}>
      <Card className="border border-border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <CardHeader className="bg-background border-b border-border pb-4">
          <div className="flex justify-center gap-2">
            {categoryIcons[category] || (
              <HelpCircle className="w-5 h-5 text-gray-500" />
            )}
            <CardTitle className="text-xl font-medium">
              {category} FAQs
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <FAQList faqs={faqs} />
        </CardContent>
        {(general || membership) && (
          <CardFooter className="flex justify-center py-6 bg-card">
            <Button
              onClick={() =>
                router.push("/contact", { onTransitionReady: slideInOut })
              }
              className="font-medium shadow-md hover:shadow-lg flex items-center gap-2"
            >
              Contact Us For More Questions
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );

  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <Separator className="w-24 mx-auto mb-6 rounded-full" />
          <p className="max-w-2xl mx-auto">
            Find answers to common questions about our organization, membership
            benefits, and more.
          </p>
        </motion.div>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {general &&
            groupedFAQs["General"] &&
            renderSingleCategory("General", groupedFAQs["General"])}

          {membership &&
            groupedFAQs["Membership"] &&
            renderSingleCategory("Membership", groupedFAQs["Membership"])}

          {!general &&
            !membership &&
            Object.keys(groupedFAQs).map((category) =>
              renderSingleCategory(category, groupedFAQs[category])
            )}

          {Object.keys(groupedFAQs).length === 0 && (
            <motion.div variants={itemVariants}>
              <Card className="text-center p-8 border border-border">
                <p>No FAQs available at this time.</p>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQContainer;
