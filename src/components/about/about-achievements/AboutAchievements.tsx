import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Calendar, Projector, Star } from "lucide-react";
import { About } from "@/types/aboutSchema";
import { Separator } from "@/components/ui/separator";

interface Achievement {
  title: string;
  description?: string;
  date?: string;
}

interface AboutAchievementsProps {
  achievements: Achievement[];
  aboutData: About;
}

const iconMap: Record<string, JSX.Element> = {
  project: <Projector className="h-10 w-10 text-primary" />,
  partners: <Users className="h-10 w-10 text-secondary" />,
  event: <Calendar className="h-10 w-10 text-accent" />,
  mentorship: <Star className="h-10 w-10 text-yellow-500" />,
};

const getIconForTitle = (title: string): JSX.Element => {
  const lowerCaseTitle = title.toLowerCase();
  for (const keyword in iconMap) {
    if (lowerCaseTitle.includes(keyword)) {
      return iconMap[keyword];
    }
  }
  return <CheckCircle className="h-10 w-10 text-muted-foreground" />;
};

const AchievementCard: React.FC<{
  achievement: Achievement;
  isVisible: Boolean;
}> = ({ achievement, isVisible }) => {
  const icon = getIconForTitle(achievement.title);

  return (
    <Card
      className={`flex items-start p-2 shadow-lg rounded-lg 
        ${isVisible ? "animate-spinCard" : "opacity-0"} 
        hover:scale-105 hover:shadow-2xl`}
      style={{
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-center mb-4">{icon}</div>
        <div className="text-center">
          <strong className="text-xl text-foreground">
            {achievement.title}
          </strong>
          {achievement.description && (
            <p className="mt-2">{achievement.description}</p>
          )}
          {achievement.date && (
            <p className="mt-2 text-sm">
              {new Date(achievement.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

const AboutAchievements: React.FC<AboutAchievementsProps> = ({
  achievements,
  aboutData,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const achievementRef = useRef<HTMLDivElement | null>(null);

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

    if (achievementRef.current) {
      observer.observe(achievementRef.current);
    }

    return () => {
      if (achievementRef.current) {
        observer.unobserve(achievementRef.current);
      }
    };
  }, []);

  return (
    <Card
      className="lg:p-8 bg-transparent shadow-none border-none rounded-lg"
      ref={achievementRef}
    >
      <CardHeader className="text-center mb-8">
        <h2 className="text-2xl font-bold">Achievements</h2>
        <Separator className="w-16 mx-auto my-4" />
        <p className="text-base px-4">
          Over the years, {aboutData.name} has made significant strides in
          advancing biotechnology in Cameroon and beyond. From groundbreaking
          research to impactful collaborations, these milestones reflect our
          commitment to innovation, excellence, and the promotion of scientific
          knowledge. Explore some of our proudest achievements and see how we
          continue to drive change in the biotechnology landscape.
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              achievement={achievement}
              isVisible={isVisible}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutAchievements;
