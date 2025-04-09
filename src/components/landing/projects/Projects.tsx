import ProjectCard from "@/components/projects/project-card/ProjectCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { slideInOut } from "@/lib/utils/pageTransitions";
import { Project } from "@/types/projectSchema";
import { ArrowRight, Layers } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ProjectPortfolioSectionProps {
  projects: Project[];
}

const ProjectPortfolioSection: React.FC<ProjectPortfolioSectionProps> = ({
  projects,
}) => {
  const router = useTransitionRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
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

  // Set up staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gradient-to-b from-background to-background/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Layers className="w-6 h-6 text-primary" />
            <h2 className="text-2xl lg:text-4xl font-bold">
              Discover Our Projects
            </h2>
          </div>
          <Separator className="w-24 mx-auto my-4 bg-primary/30" />
          <p className="text-base sm:text-lg max-w-3xl mx-auto text-muted-foreground">
            From groundbreaking research to impactful real-world applications,
            our projects are at the forefront of biotechnology innovation.
            Explore our portfolio to see how we're shaping the future.
          </p>
        </motion.div>

        {/* Project List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 py-8 place-items-center mx-auto"
        >
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                className="h-full w-full"
                custom={index}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-8 rounded-lg border border-dashed flex flex-col items-center"
              >
                <Layers className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                <p className="text-lg text-muted-foreground">
                  No projects available yet.
                </p>
                <p className="text-sm text-muted-foreground/80 mt-2">
                  Check back soon for updates.
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Button
            variant="default"
            size="lg"
            className="group relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() =>
              router.push("/upcoming-projects", {
                onTransitionReady: slideInOut,
              })
            }
          >
            <span className="relative z-10 flex items-center">
              Discover More Projects
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectPortfolioSection;
