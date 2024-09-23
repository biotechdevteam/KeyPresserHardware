import React from "react";
import { Card } from "@/components/ui/card";

interface Achievement {
  title: string;
  description?: string;
  date?: string;
}

interface AboutAchievementsProps {
  achievements: Achievement[];
}

const AboutAchievements: React.FC<AboutAchievementsProps> = ({
  achievements,
}) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold">Achievements</h2>
      <ul className="list-disc list-inside">
        {achievements.map((achievement, index) => (
          <li key={index} className="mt-2">
            <strong>{achievement.title}</strong>
            {achievement.description && (
              <p className="text-gray-600">{achievement.description}</p>
            )}
            {achievement.date && (
              <p className="text-sm text-gray-500">
                {new Date(achievement.date).toLocaleDateString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default AboutAchievements;
