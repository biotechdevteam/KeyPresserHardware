import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Blog } from "@/types/blogSchema";
import React from "react";
import { useRouter } from "next/navigation";

const BlogSection: React.FC<{ blogs: Blog[] }> = ({ blogs }) => {
  const router = useRouter();

  return (
    <section className="my-12 px-6 grid place-items-center">
      <h2 className="text-4xl font-bold text-primary mb-8">Latest Blogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.slice(0, 3).map((blog, index) => (
          <Card
            key={index}
            className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader className="p-0">
              <div className="overflow-hidden rounded-t-lg">
                {/* Blog Image */}
                <img
                  src={blog.featuredImageUrl || "/placeholder-image.jpg"}
                  alt={blog.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </CardHeader>

            <CardContent className="p-4">
              {/* Blog Title */}
              <CardTitle className="text-xl font-semibold mb-2">
                {blog.title}
              </CardTitle>
              {/* Blog Summary */}
              <p className="text-muted line-clamp-3">{blog.summary}</p>
            </CardContent>

            <CardFooter className="p-4 flex justify-end">
              {/* Read More Button */}
              <Button
                variant="secondary"
                onClick={() => router.push(`/blogs/${blog._id}`)}
                className="text-sm font-medium px-4 py-2"
              >
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
