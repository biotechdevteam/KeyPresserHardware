import ProjectCard from "@/components/projects/project-card/ProjectCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/types/projectSchema";
import { ArrowRight } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";

interface ProjectPortfolioSectionProps {
  projects: Project[];
}

const ProjectPortfolioSection: React.FC<ProjectPortfolioSectionProps> = ({
  projects,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null); // Reference for the section
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the component is visible
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

  return (
    <section
      ref={sectionRef} // Attach the ref to the section
      className="py-16"
    >
      <div className="container mx-auto px-8">
        <h2 className="text-xl lg:text-3xl font-bold text-center">
          Discover Our Projects
        </h2>
        <Separator className="w-24 mx-auto" />
        <p className="text-base py-8 px-4 lg:mx-64 text-center">
          From groundbreaking research to impactful real-world applications, our
          projects are at the forefront of biotechnology innovation. Explore our
          portfolio to see how we're shaping the future.
        </p>

        {/* Project List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 py-8 px-4 lg:px-16 place-items-center mx-auto">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className={`transition-transform duration-500 ease-in-out transform ${
                  isVisible ? "animate-spinCard" : "opacity-0"
                } h-full flex flex-col`}
              >
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <p className="text-center text-lg">No projects available yet.</p>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Button variant="default" className="animate-beep">
            Discover More Projects
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectPortfolioSection;
