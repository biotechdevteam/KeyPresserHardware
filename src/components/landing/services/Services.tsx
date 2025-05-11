import ServiceOverview from "@/components/services/service-overview/ServiceOverview";
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/utils/pageTransitions";
import { motion } from "framer-motion";

const ServicesSection: React.FC = () => {
  const router = useTransitionRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "all"
  );

  // Handle the category click event
  const onCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    router.push(`/services`, { onTransitionReady: slideInOut });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 w-full mx-auto relative overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-96 opacity-5 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.2)_0%,transparent_50%)]"></div>
      <div className="absolute bottom-0 right-0 w-full h-96 opacity-5 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.2)_0%,transparent_50%)]"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container mx-auto px-4"
      >
        <motion.div
          variants={itemVariants}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-2xl lg:text-4xl font-bold mb-4">Our Expertise</h2>
          <Separator className="w-16 h-1 mx-auto rounded-full my-4" />
          <p className="mt-6 text-base lg:text-lg leading-relaxed">
            Discover our expertise in personal development, business growth, and
            humanitarian initiatives. We provide tailored services to achieve
            your goals and exceed expectations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-sm">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/20 transition-all duration-300">
              <h3 className="font-bold text-primary mb-2">
                Personal Development
              </h3>
              <p>
                Hands-on training programs, skill acquisition workshops, and
                promotion of academic excellence.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/20 transition-all duration-300">
              <h3 className="font-bold text-primary mb-2">
                Business Development
              </h3>
              <p>
                IT and design services, business growth consultations, and
                laboratory and scientific solutions.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/20 transition-all duration-300">
              <h3 className="font-bold text-primary mb-2">
                Humanitarian Initiatives
              </h3>
              <p>
                Disease awareness campaigns, poverty and hunger eradication
                programs, and community health projects.
              </p>
            </div>
          </div>
          <p className="mt-6 text-foreground/80 italic">
            Join us in using science and technology to foster growth,
            innovation, and positive change.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ServiceOverview
            onCategoryClick={(selectedCategory) =>
              onCategoryClick(selectedCategory)
            }
            activeCategory={null}
          />
        </motion.div>

        {/* View More Button */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <Button
            variant="default"
            onClick={() => {
              router.push("/services", { onTransitionReady: slideInOut });
            }}
          >
            View Our Services{" "}
            <ArrowRight className="w-4 h-4 ml-2 animate-pulse" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
