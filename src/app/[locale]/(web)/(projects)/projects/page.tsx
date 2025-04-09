"use client";
import ProjectsContainer from "@/components/projects/projects-container/ProjectsContainer";
import Error from "@/app/[locale]/error";
import { motion } from "framer-motion";

export default async function ProjectsPage() {
  try {
    const projectsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    return (
      <section className="min-h-screen p-4 md:p-8">
        <div className="w-full max-w-5xl mx-auto">
          <motion.header
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Our Projects
            </h1>
            <p className="text-lg mt-4 max-w-2xl mx-auto">
              Explore the various projects we are currently working on and
              discover our innovative solutions.
            </p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <ProjectsContainer projectsData={projectsData} />
          </motion.div>
        </div>
      </section>
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
