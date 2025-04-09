import AboutContainer from "@/components/about/about-container/AboutContainer";
import Error from "@/app/[locale]/error";

export default async function AboutPage() {
  try {
    const [aboutData, members] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/about`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/members`, {
        next: { revalidate: 60 },
      }).then((res) => res.json()),
    ]);

    return (
      <div className="p-6">
        <AboutContainer aboutData={aboutData} members={members} />
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
