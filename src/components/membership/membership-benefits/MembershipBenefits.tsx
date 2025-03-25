"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { About } from "@/types/aboutSchema";
import {
  BadgeCheck,
  Users,
  BookOpen,
  Ticket,
  Award,
  Briefcase,
  Hand,
  LucideIcon,
  Lightbulb,
} from "lucide-react";

// Define a type for our benefits
interface Benefit {
  title: string;
  description: string;
  icon: React.ElementType;
}

const MembershipBenefits: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  // Create an array of benefits for easier management
  const benefits: Benefit[] = [
    {
      title: "Networking Opportunities",
      description:
        "As a member, you'll gain exclusive access to a network of professionals, industry leaders, and like-minded individuals. You can attend events, participate in forums, and build meaningful connections that can open doors for collaboration and career growth.",
      icon: Users,
    },
    {
      title: "Professional Development",
      description:
        "Our members have the opportunity to participate in workshops, webinars, and training sessions aimed at enhancing your skills and knowledge in biotechnology and related fields.",
      icon: BookOpen,
    },
    {
      title: "Exclusive Access to Resources",
      description:
        "Members receive access to our extensive library of research papers, whitepapers, guidelines, and industry reports. Stay ahead of trends with the latest updates and valuable resources.",
      icon: BadgeCheck,
    },
    {
      title: "Discounts on Events and Services",
      description:
        "Enjoy discounted or even free access to our association's events, including conferences, exhibitions, and seminars. You'll also benefit from special deals on professional services provided by our partners.",
      icon: Ticket,
    },
    {
      title: "Recognition and Awards",
      description:
        "Be recognized for your achievements and contributions to the field of biotechnology. Members are eligible for prestigious awards, grants, and fellowships, promoting your work to a wider audience.",
      icon: Award,
    },
    {
      title: "Career Advancement",
      description:
        "As a member, you'll have access to job boards, career advice, and mentorship programs, helping you navigate your career and find opportunities in your area of expertise.",
      icon: Briefcase,
    },
    {
      title: "Collaboration Opportunities",
      description:
        "Engage with other members on collaborative research projects, product development, or community initiatives. We provide a platform for cooperation that fosters innovation and progress.",
      icon: Hand,
    },
    {
      title: "Leadership Opportunities",
      description:
        "Members can take on leadership roles within the association, from serving on committees to organizing events, helping to shape the future direction of the organization.",
      icon: Lightbulb,
    },
  ];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="container mx-auto py-16 px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto mb-12"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6 text-foreground">
          Membership Benefits
        </h1>
        <Separator className="mb-8 mx-auto w-24 rounded-full" />
        <p className="text-lg text-center">
          Joining {aboutData?.name} offers numerous advantages designed to
          enhance both your professional journey and the collective efforts of
          our community in advancing biotechnology.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {benefits.map((benefit, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full transition-all duration-300 hover:shadow-lg border-0 shadow-md overflow-hidden">
              <div className="absolute w-32 h-32 -right-16 -top-16 rounded-full" />
              <CardHeader className="pb-2 flex flex-row items-center space-x-4">
                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl font-semibold">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mt-4">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default MembershipBenefits;
