"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import Loader from "@/components/loader/Loader";
import AboutFooter from "@/components/about/about-footer/AboutFooter";
import { About } from "@/types/aboutSchema";
import { extractDomain } from "@/lib/helpers";

// This function runs on the server-side and fetches the about data.
async function getAboutData() {
  const {
    data,
    isLoading: loading,
    isFetching: fetching,
    error,
    isError,
  } = useQuery<About>({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Return the prefetched data, loading, and error state
  return {
    aboutData: data,
    loading,
    fetching,
    isError,
    error,
  };
}

// ContactPage component to fetch and display about data
const ContactPage: React.FC = async () => {
  // Get the about data
  const { aboutData, loading, fetching, isError, error } = await getAboutData();

  // Handle loading state
  if (loading || fetching) {
    return <Loader />;
  }

  // Handle error state
  if (isError || !aboutData) {
    return <div>Error loading contact page data...</div>;
  }

  const websiteURL = extractDomain();

  return (
    <section className="grid min-h-screen place-items-center p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-lg mt-4">
            Get in touch with us for inquiries and support.
          </p>
        </header>
        {/* About Footer Section */}
        <div className="col-span-1 lg:col-span-2">
          <AboutFooter
            contactPhone={aboutData.contact_phone}
            socialLinks={aboutData.social_links}
            contactEmail={aboutData.contact_email}
            address={aboutData.address}
            website={websiteURL}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
