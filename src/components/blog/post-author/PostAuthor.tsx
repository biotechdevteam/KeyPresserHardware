import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Member } from "@/types/memberSchema";

interface AuthorInformationProps {
  author: Member;
}

const AuthorInformation: React.FC<AuthorInformationProps> = ({ author }) => {
  return (
    <Card className="max-w-4xl mx-auto mt-6 p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
        About Author
      </h2>

      <div className="p-6">
        <CardHeader className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 items-center">
          {/* Author Avatar */}
          <Avatar className="w-16 h-16 mx-auto sm:mx-0">
            <AvatarImage
              src={author.user_id.profile_photo_url}
              alt={author.user_id.first_name}
            />
            <AvatarFallback>
              {author.user_id.first_name.charAt(0)}
              {author.user_id.last_name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* Author Information */}
          <div className="text-center sm:text-left">
            <CardTitle className="text-xl font-semibold">
              {author.user_id.first_name} {author.user_id.last_name}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {author.bio}
            </CardDescription>

            {/* Link to More Articles */}
            <a href="/blogs" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="mt-2">
                Read more articles
              </Button>
            </a>
          </div>
        </CardHeader>
      </div>
    </Card>
  );
};

export default AuthorInformation;
