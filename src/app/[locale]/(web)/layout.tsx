import Footer from "@/components/footer/Container";
import NavBar from "@/components/nav-bar/NavBar";
import type { Metadata } from "next";
import { About } from "@/types/aboutSchema";
import ScrollToTopButton from "@/components/ScrollToTop/ScrollToTopButton";
import CookieConsent from "@/components/CookieConsent/CookieConsent";

// This function can be used to generate metadata dynamically
export async function generateMetadata({
  aboutData,
}: {
  aboutData: About;
}): Promise<Metadata> {
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
  aboutData,
}: {
  children: React.ReactNode;
  aboutData: About;
}) {
  return (
    <div>
      <NavBar aboutData={aboutData} />
      <main>
        {children}
        <CookieConsent />
        <ScrollToTopButton />
      </main>
      <Footer />
    </div>
  );
}
