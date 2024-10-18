import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Blog } from "@/types/blogSchema";
import React from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";

const BlogSection: React.FC<{ blogs: Blog[] }> = ({ blogs }) => {
  const router = useRouter();

  return (
    <section className="my-12 px-6 grid place-items-center">
      <h2 className="text-xl lg:text-3xl font-bold text-center">
        Latest News & Insights
      </h2>
      <Separator className="w-24 mx-auto" />
      <p className="text-base text-center py-8 px-4 lg:mx-64">
        Discover the latest insights, research findings, and industry updates
        from the world of biotechnology. Stay informed with our curated articles
        and expert opinions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 justify-center mx-auto p-4 lg:px-16">
        {blogs.slice(0, 3).map((blog, index) => (
          <Card
            key={index}
            className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => router.push(`/post/${blog._id}`)}
          >
            <CardHeader className="p-0 overflow-hidden rounded-t-lg">
              <Image
                src={blog.featuredImageUrl || ""}
                alt={blog.title}
                width={500}
                height={100}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </CardHeader>

            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{blog.title}</CardTitle>
              <CardDescription className="line-clamp-3 text-md">
                {blog.summary}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-10 text-center">
        <Button
          variant="default"
          className="animate-beep"
          onClick={() => router.push("/blogs")}
        >
          More Insightful Articles <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default BlogSection;
