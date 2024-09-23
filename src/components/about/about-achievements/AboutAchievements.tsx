import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Calendar, Projector, Star } from "lucide-react";

interface Achievement {
  title: string;
  description?: string;
  date?: string;
}

interface AboutAchievementsProps {
  achievements: Achievement[];
}

const iconMap: Record<string, JSX.Element> = {
  project: <Projector className="h-8 w-8 text-blue-600" />,
  partners: <Users className="h-8 w-8 text-green-600" />,
  event: <Calendar className="h-8 w-8 text-yellow-600" />,
  mentorship: <Star className="h-8 w-8 text-purple-600" />,
};

const getIconForTitle = (title: string): JSX.Element => {
  const lowerCaseTitle = title.toLowerCase();
  for (const keyword in iconMap) {
    if (lowerCaseTitle.includes(keyword)) {
      return iconMap[keyword];
    }
  }
  return <CheckCircle className="h-5 w-5 text-gray-600" />;
};

const AchievementCard: React.FC<{ achievement: Achievement }> = ({
  achievement,
}) => {
  const icon = getIconForTitle(achievement.title);

  return (
    <Card className="flex items-start bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
      {icon}
      <div className="ml-3">
        <strong className="text-lg">{achievement.title}</strong>
        {achievement.description && (
          <p className="text-gray-500">{achievement.description}</p>
        )}
        {achievement.date && (
          <p className="text-sm text-gray-400">
            {new Date(achievement.date).toLocaleDateString()}
          </p>
        )}
      </div>
    </Card>
  );
};

const AboutAchievements: React.FC<AboutAchievementsProps> = ({
  achievements,
}) => {
  return (
    <Card className="p-6 bg-white shadow-md rounded-lg">
      <CardHeader>
        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutAchievements;
