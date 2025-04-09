"use client";
import React, { useState, useMemo } from "react";
import { Blog } from "@/types/blogSchema";
import { useTransitionRouter } from "next-view-transitions";
import UniversalFilter, {
  FilterGroupConfig,
} from "@/components/filters/universal-filter"; // Update path as needed
import PostCard from "../post-card/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { slideInOut } from "@/lib/utils/pageTransitions";
import { motion, AnimatePresence } from "framer-motion";

const BlogsContainer: React.FC<{ blogsData: Blog[] }> = ({ blogsData }) => {
  const router = useTransitionRouter();

  // Create unique categories and authors
  const categories = useMemo(() => {
    return Array.from(
      new Set(blogsData.map((blog) => blog.category).filter(Boolean))
    );
  }, [blogsData]);

  const authors = useMemo(() => {
    return Array.from(
      new Set(blogsData.map((blog) => blog.authorId).filter(Boolean))
    );
  }, [blogsData]);

  const blogFilterGroups: FilterGroupConfig[] = [
    {
      id: "category",
      label: "Category",
      options: [
        { value: "all", label: "All Categories" },
        ...categories.map((cat) => ({ value: cat, label: cat })),
      ],
      defaultValue: "all",
    },
    {
      id: "author",
      label: "Author",
      options: [
        { value: "all", label: "All Authors" },
        ...authors.map((author) => ({
          value: author.first_name,
          label: author.first_name,
        })),
      ],
      defaultValue: "all",
    },
  ];

  const [filters, setFilters] = useState<{
    category: string;
    author: string;
  }>({
    category: "all",
    author: "all",
  });

  const filteredBlogs = useMemo(() => {
    return blogsData.filter((blog) => {
      const matchesCategory =
        filters.category === "all" || blog.category === filters.category;
      const matchesAuthor =
        filters.author === "all" || blog.authorId.first_name === filters.author;
      return matchesCategory && matchesAuthor;
    });
  }, [filters, blogsData]);

  // Handle blog click for navigation
  const handleBlogClick = (blogId: string) => {
    router.push(`/post/${blogId}`, { onTransitionReady: slideInOut });
  };

  if (blogsData.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-80" />
        ))}
      </div>
    );
  }

  return (
    <section className="relative space-y-8">
      <UniversalFilter
        filterGroups={blogFilterGroups}
        onFilterChange={(newFilters) => {
          setFilters({
            category: newFilters.category as string,
            author: newFilters.author as string,
          });
        }}
        variant="pill"
        className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm p-4 rounded-lg shadow-sm"
      />

      {/* Blog Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <PostCard
                  blog={blog}
                  onClick={() => handleBlogClick(blog._id)}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center"
            >
              <div className="text-muted-foreground">
                No articles found matching your filters.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BlogsContainer;
