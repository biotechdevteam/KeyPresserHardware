import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchFAQs } from "@/lib/fetchUtils"; // Assuming fetchFAQs is in fetchUtils
import FAQContainer from "@/components/faq/faq-container/FAQContainer";

// This function runs on the server-side and fetches the FAQs data.
async function getFAQData() {
  const queryClient = new QueryClient();

  // Prefetch the FAQs data on the server
  await queryClient.prefetchQuery({ queryKey: ["faqs"], queryFn: fetchFAQs });

  // Return the prefetched data and the dehydrated state
  return {
    dehydratedState: dehydrate(queryClient),
    faqData: await fetchFAQs(),
  };
}

// Page component
export default async function FAQPage() {
  const { faqData } = await getFAQData(); // Fetch the data server-side

  return (
    <div>
      {/* Pass the prefetched data as props to the FAQContainer */}
      <FAQContainer initialData={faqData} />
    </div>
  );
}
