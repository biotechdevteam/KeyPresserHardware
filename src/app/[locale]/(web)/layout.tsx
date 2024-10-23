import Footer from "@/components/footer/Container";
import NavBar from "@/components/nav-bar/NavBar";
import type { Metadata } from "next";
import { About } from "@/types/aboutSchema";
import ScrollToTopButton from "@/components/ScrollToTop/ScrollToTopButton";
import CookieConsent from "@/components/Cookies/CookieConsent";
import Loader from "@/components/loader/Loader";
import { fetchAboutData } from "@/lib/fetchUtils"; // Server-side fetch

// This function runs on the server-side and fetches the about data.
async function getAboutData() {
  try {
    const aboutData = await fetchAboutData();
    return {
      aboutData,
      loading: false,
      fetching: false,
      isError: false,
      error: null,
    };
  } catch (error) {
    return {
      aboutData: null,
      loading: false,
      fetching: false,
      isError: true,
      error,
    };
  }
}

// This function can be used to generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const { aboutData } = await getAboutData();
  return {
    title: aboutData?.name || "Biotech Universe",
    description:
      aboutData?.history ||
      "A biotechnology association based in Buea, Cameroon, founded by the 2024/2025 Master's graduates from the Department of Biochemistry at the University of Buea.",
    icons: {
      icon: "/favicon-48x48.png",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
      other: [
        {
          rel: "icon",
          url: "/favicon.svg",
          type: "image/svg+xml",
        },
      ],
    },
    manifest: "/site.webmanifest",
    // <meta name="apple-mobile-web-app-title" content="BT Verse" />
    // appleMobileWebAppTitle: "BT Verse",
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { aboutData, loading, fetching, isError, error } = await getAboutData();

  // Handle loading state
  if (loading || fetching) {
    return <Loader />;
  }

  // Handle error state
  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <NavBar aboutData={aboutData as About} />
      <main className="mt-24">
        {children}
        <CookieConsent />
        <ScrollToTopButton />
      </main>
      <Footer aboutData={aboutData as About} />
    </div>
  );
}
