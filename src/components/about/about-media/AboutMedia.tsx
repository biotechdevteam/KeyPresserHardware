import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Video from "next-video";
import Image from "next/image";
import Link from "next/link";

interface Video {
  url: string;
  description?: string;
}

interface ImageContent {
  src: string;
  alt: string;
  description?: string;
}

interface PressMention {
  title: string;
  url: string;
  source: string;
}

interface MediaPageProps {
  videos: Video[];
  images: ImageContent[];
  pressMentions: PressMention[];
}

const MediaPage: React.FC<MediaPageProps> = ({
  videos,
  images,
  pressMentions,
}) => {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <h1 className="text-3xl font-bold text-center">Media and Press</h1>
      <p className="text-center text-muted-foreground mb-8">
        Explore our latest media content, including videos, images, and press
        mentions that highlight the association's efforts, events, and
        achievements.
      </p>

      <Card className="p-4 bg-transparent shadow-none">
        <Tabs defaultValue="images">
          <TabsList className="justify-center mb-4">
            <TabsTrigger value="images">
              Images
            </TabsTrigger>
            <TabsTrigger value="videos">
              Videos
            </TabsTrigger>
            <TabsTrigger value="press">
              Press Mentions
            </TabsTrigger>
          </TabsList>

          {/* Images Tab */}
          <TabsContent value="images">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-full bg-card p-4 rounded-lg"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={500}
                    height={300}
                    className="w-full h-auto rounded-md"
                  />
                  {image.description && (
                    <p className="text-base mt-2">
                      {image.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos">
            <div className="grid grid-cols-1 gap-6 lg:max-w-xl">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="w-full bg-card p-4 rounded-lg"
                >
                  <Video className="w-full h-auto rounded-md" src={video.url} />
                  {video.description && (
                    <p className="text-base mt-2">
                      {video.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Press Mentions Tab */}
          <TabsContent value="press">
            <div className="space-y-4">
              {pressMentions.map((mention, index) => (
                <div
                  key={index}
                  className="bg-card p-4 rounded-lg border-l-4 border-primary"
                >
                  <Link
                    href={mention.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-primary hover:underline text-lg font-semibold"
                  >
                    {mention.title}
                  </Link>
                  <p className="text-base mt-1">
                    Source: <span className="font-light">{mention.source}</span>
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default MediaPage;
