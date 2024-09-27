import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchAboutData } from "@/lib/fetchUtils";
import AboutContainer from "@/components/about/about-container/AboutContainer";

// This function runs on the server-side and fetches the about data.
async function getAboutData() {
  const queryClient = new QueryClient();

  // Prefetch the about data on the server
  await queryClient.prefetchQuery({ queryKey: ["about"], queryFn: fetchAboutData });

  // Return the prefetched data and the dehydrated state
  return {
    dehydratedState: dehydrate(queryClient),
    aboutData: await fetchAboutData(),
  };
}

// Page component
export default async function AboutPage() {
  const { aboutData } = await getAboutData(); // Fetch the data server-side

  return (
    <div>
      {/* Pass the prefetched data as props to the AboutContainer */}
      <AboutContainer initialData={aboutData} />
    </div>
  );
}
