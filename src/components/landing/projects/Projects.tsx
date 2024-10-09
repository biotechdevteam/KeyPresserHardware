import ProjectCard from "@/components/projects/project-card/ProjectCard";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/projectSchema";
import React, { useRef, useEffect, useState } from "react";

interface ProjectPortfolioSectionProps {
  projects: Project[]; // Expecting an array of projects
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
      className="py-16 bg-background min-h-screen text-foreground"
    >
      <div className="container mx-auto px-4 sm:px-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Current Ongoing Projects to Explore
        </h2>

        {/* Project List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 place-items-stretch">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className={`transition-transform duration-500 ease-in-out transform ${
                  isVisible ? "animate-spinCard" : "opacity-0"
                } h-full flex flex-col`} // Ensure each project card has a full height and uses flexbox for content layout
              >
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <p className="text-center text-lg">No projects available.</p>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Button className="px-6 py-3 text-lg" variant="default">
            Explore Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectPortfolioSection;
