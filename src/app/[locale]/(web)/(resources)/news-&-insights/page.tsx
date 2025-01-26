import BlogsContainer from "@/components/blog/blogs-container/BlogsContainer";
import Error from "@/app/[locale]/error";

export default async function ArticlesPage() {
  try {
    const blogsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/posts`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

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
            <BlogsContainer blogsData={blogsData} />
          </div>
        </section>
      </div>
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
