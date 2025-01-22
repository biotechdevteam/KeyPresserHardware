"use client";
import AboutContainer from "@/components/about/about-container/AboutContainer";
import Error from "@/app/[locale]/error";

export default async function AboutPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "no-store",
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    return (
      <div className="p-6">
        <AboutContainer aboutData={aboutData} />
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

// const {
//   data: aboutData,
//   isLoading,
//   isError,
//   error,
// } = useQuery<About>({
//   queryKey: ["about"],
//   queryFn: fetchAboutData,
//   staleTime: Infinity,
//   refetchOnMount: false,
//   refetchOnWindowFocus: false,
//   refetchOnReconnect: false,
// });
