"use client";
import BlogsContainer from "@/components/blog/blogs-container/BlogsContainer";

export default async function ArticlesPage() {
  return (
    <div>
      <section className="grid min-h-screen p-8 my-8">
        <div className="w-full max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold">News and Insights</h1>
            <p className="text-lg mt-4">
              Read our latest articles and insights.
            </p>
          </header>
          <BlogsContainer />
        </div>
      </section>
    </div>
  );
}
