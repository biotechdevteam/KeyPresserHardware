import React from "react";
import { Project } from "@/types/projectSchema"; // Assuming you have a Project type definition
import { Button } from "@/components/ui/button"; // Using shadcn button component
import { Progress } from "@/components/ui/progress"; // Using shadcn progress component
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"; // Using shadcn card components
import { Carousel } from "@/components/ui/carousel"; // Carousel for images/videos (using your preferred library)

// Dummy data for demonstration purposes
interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <div className="container mx-auto p-6">
      {/* Project Description Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Project Description</h2>
        {/* Render the HTML content safely */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
      </section>

      {/* Multimedia Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Project Media</h2>
        {project.multimedia && project.multimedia.length > 0 ? (
          <Carousel className="mb-6">
            {project.multimedia.map((mediaItem, index) => (
              <div key={index} className="relative w-full h-60">
                {mediaItem.type === "image" ? (
                  <img
                    src={mediaItem.url}
                    alt={`Project Media ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={mediaItem.url}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </Carousel>
        ) : (
          <p>No media available for this project.</p>
        )}
      </section>

      {/* Project Goals and Progress */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Project Progress</h2>
        {project.milestones && (
          <ul className="list-disc list-inside">
            {project.milestones.map((goal, index) => (
              <li key={index}>
                {goal.title} - {goal.completed ? "Completed" : "In Progress"}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4">
          <Progress value={project.progress} className="w-full" />
          <p className="text-right text-sm">{project.progress}% completed</p>
        </div>
      </section>

      {/* Team Members */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Project Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.members.map((member, index) => (
            <Card key={index}>
              <CardHeader>
                <img
                  src={member.memberId.user_id.profile_photo_url}
                  alt={member.memberId.user_id.first_name}
                  className="w-24 h-24 rounded-full mx-auto"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-center">
                  {member.memberId.user_id.first_name +
                    " " +
                    member.memberId.user_id.last_name}
                </CardTitle>
                <p className="text-center text-sm">{member.roleInProject}</p>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  {member.memberId.bio}
                </p>
                <div className="text-center mt-4">
                  <a
                    href={`/members/${member.memberId._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                  >
                    View Profile
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Collaboration Opportunities */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Collaboration Opportunities
        </h2>

        {project.collaborationOpportunities &&
        project.collaborationOpportunities.length > 0 ? (
          <ul className="list-disc list-inside mb-6">
            {project.collaborationOpportunities.map((opportunity) => (
              <li key={opportunity._id} className="mb-4">
                <h3 className="font-semibold">{opportunity.expertise}</h3>
                <p>{opportunity.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-6">
            No collaboration opportunities available at the moment.
          </p>
        )}

        {/* Collaborate Button */}
        <Button className="bg-primary w-full">Collaborate</Button>
      </section>

      {/* Project Partners and Sponsors */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Project Partners & Sponsors
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {project.partners &&
            project.partners.map((partner, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="w-32 h-32 object-contain mb-2"
                />
                <span className="text-center text-sm font-medium">
                  {partner.name}
                </span>
              </div>
            ))}
        </div>
      </section>

      {/* Documents and Resources */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Documents and Resources</h2>
        {project.documents && (
          <ul>
            {project.documents.map((doc, index) => (
              <li key={index}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Calls to Action (CTAs) */}
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button className="bg-primary w-full">Support This Project</Button>
          <Button className="bg-primary w-full">Share</Button>
        </div>
      </section>

      {/* Comments and Feedback */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Comments and Feedback</h2>
        {/* Comments Section - You can replace this with your comment system */}
        <p>Comment functionality will go here.</p>
      </section>
    </div>
  );
};

export default ProjectDetails;
