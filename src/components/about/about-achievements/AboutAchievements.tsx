"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Calendar, Projector, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { About } from "@/types/aboutSchema";

interface Achievement {
  title: string;
  description?: string;
  date?: string;
}

// Icon mapping for achievement categories
const iconMap: Record<string, JSX.Element> = {
  project: <Projector className="h-10 w-10 text-muted-foreground" />,
  partners: <Users className="h-10 w-10 text-muted-foreground" />,
  event: <Calendar className="h-10 w-10 text-muted-foreground" />,
  mentorship: <Star className="h-10 w-10 text-muted-foreground" />,
};

// Function to match icons based on keywords in title
const getIconForTitle = (title: string): JSX.Element => {
  const lowerCaseTitle = title.toLowerCase();
  for (const keyword in iconMap) {
    if (lowerCaseTitle.includes(keyword)) {
      return iconMap[keyword];
    }
  }
  return <CheckCircle className="h-10 w-10 text-muted-foreground" />;
};

// Card for individual achievements
const AchievementCard: React.FC<{
  achievement: Achievement;
  isVisible: boolean;
}> = ({ achievement, isVisible }) => {
  const icon = getIconForTitle(achievement.title);

  return (
    <Card
      className={`flex items-start p-4 shadow-lg rounded-lg transition-transform duration-300 
        ${isVisible ? "animate-fadeIn scale-100" : "scale-90 opacity-0"}`}
    >
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-center mb-4">{icon}</div>
        <div className="text-center">
          <strong className="text-xl text-foreground">
            {achievement.title}
          </strong>
          {achievement.description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {achievement.description}
            </p>
          )}
          {achievement.date && (
            <p className="mt-2 text-xs text-muted-foreground">
              {new Date(achievement.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

const AboutAchievements: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const achievementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
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
          leveraging biotechnology, technology, and health initiatives for the
          betterment of our communities in Cameroon and beyond. From innovative
          research and strategic collaborations to impactful health programs,
          our milestones reflect our unwavering commitment to personal
          development, business growth, and humanitarian efforts. Explore some
          of our proudest achievements and see how we continue to drive positive
          change and foster sustainable growth through science, technology, and
          health advancements.
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aboutData.achievements?.map(
            (achievement: Achievement, index: number) => (
              <AchievementCard
                key={index}
                achievement={achievement}
                isVisible={isVisible}
              />
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutAchievements;
